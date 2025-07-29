
import { serve } from "https://deno.land/std@0.168.0/http/server.ts"
import { createClient } from 'https://esm.sh/@supabase/supabase-js@2'

const corsHeaders = {
  'Access-Control-Allow-Origin': '*',
  'Access-Control-Allow-Headers': 'authorization, x-client-info, apikey, content-type',
}

serve(async (req) => {
  if (req.method === 'OPTIONS') {
    return new Response(null, { headers: corsHeaders });
  }

  try {
    const SUPABASE_URL = Deno.env.get('SUPABASE_URL');
    const SUPABASE_SERVICE_ROLE_KEY = Deno.env.get('SUPABASE_SERVICE_ROLE_KEY');

    if (!SUPABASE_URL || !SUPABASE_SERVICE_ROLE_KEY) {
      throw new Error('Missing required environment variables');
    }

    const supabase = createClient(SUPABASE_URL, SUPABASE_SERVICE_ROLE_KEY);

    // Get all milestones with their resources
    const { data: milestones, error: milestonesError } = await supabase
      .from('career_milestones')
      .select('id, title, resources')
      .not('resources', 'is', null);

    if (milestonesError) {
      console.error('Error fetching milestones:', milestonesError);
      throw milestonesError;
    }

    let totalChecked = 0;
    let totalFailed = 0;

    // Process each milestone
    for (const milestone of milestones || []) {
      if (!milestone.resources || !Array.isArray(milestone.resources)) {
        continue;
      }

      // Process each resource in the milestone
      for (const resource of milestone.resources) {
        if (!resource.url) {
          continue;
        }

        totalChecked++;
        let isActive = true;
        let statusCode = null;
        let errorMessage = null;

        try {
          // Make HEAD request to check if resource is active
          const response = await fetch(resource.url, {
            method: 'HEAD',
            headers: {
              'User-Agent': 'Mozilla/5.0 (compatible; ResourceValidator/1.0)',
            },
            // Set timeout to 10 seconds
            signal: AbortSignal.timeout(10000),
          });

          statusCode = response.status;
          isActive = response.ok; // true for 200-299 status codes

          if (!response.ok) {
            errorMessage = `HTTP ${response.status}: ${response.statusText}`;
            totalFailed++;
          }

          console.log(`Checked ${resource.url}: ${statusCode} (${isActive ? 'active' : 'inactive'})`);

        } catch (error) {
          isActive = false;
          totalFailed++;
          
          if (error.name === 'TimeoutError') {
            errorMessage = 'Request timeout after 10 seconds';
          } else if (error.name === 'TypeError' && error.message.includes('fetch')) {
            errorMessage = 'Network error or invalid URL';
          } else {
            errorMessage = error.message || 'Unknown error';
          }
          
          console.error(`Error checking ${resource.url}:`, error);
        }

        // Log the validation result
        const { error: logError } = await supabase
          .from('resource_validation_logs')
          .insert({
            resource_url: resource.url,
            status_code: statusCode,
            is_active: isActive,
            error_message: errorMessage,
            milestone_id: milestone.id,
            checked_at: new Date().toISOString(),
          });

        if (logError) {
          console.error('Error logging validation result:', logError);
        }

        // Add a small delay to avoid overwhelming servers
        await new Promise(resolve => setTimeout(resolve, 100));
      }
    }

    // Update milestone validation status
    const validationSummary = {
      last_checked: new Date().toISOString(),
      total_resources: totalChecked,
      failed_resources: totalFailed,
      success_rate: totalChecked > 0 ? ((totalChecked - totalFailed) / totalChecked * 100).toFixed(1) : 0
    };

    // Update all processed milestones with validation timestamp
    for (const milestone of milestones || []) {
      if (milestone.resources && Array.isArray(milestone.resources) && milestone.resources.length > 0) {
        await supabase
          .from('career_milestones')
          .update({
            last_validation_check: new Date().toISOString(),
            validation_status: validationSummary
          })
          .eq('id', milestone.id);
      }
    }

    const result = {
      success: true,
      checked: totalChecked,
      failed: totalFailed,
      success_rate: validationSummary.success_rate + '%',
      timestamp: new Date().toISOString()
    };

    console.log('Validation completed:', result);

    return new Response(
      JSON.stringify(result),
      { 
        headers: { 
          ...corsHeaders, 
          'Content-Type': 'application/json' 
        } 
      }
    );

  } catch (error) {
    console.error('Error in validate-resource-links function:', error);
    return new Response(
      JSON.stringify({ 
        success: false, 
        error: error.message || 'Failed to validate resource links',
        timestamp: new Date().toISOString()
      }),
      { 
        status: 500,
        headers: { 
          ...corsHeaders, 
          'Content-Type': 'application/json' 
        } 
      }
    );
  }
});
