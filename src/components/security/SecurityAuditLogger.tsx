import { useEffect } from 'react';
import { useAuth } from '@/contexts/AuthContext';
import { useUserRole } from '@/hooks/useUserRole';
import { supabase } from '@/integrations/supabase/client';

/**
 * Security audit logger component that logs important security events
 * This component should be mounted at the app level to monitor security activities
 */
export const SecurityAuditLogger = () => {
  const { user } = useAuth();
  const { roles } = useUserRole();

  useEffect(() => {
    if (!user) return;

    // Log role changes for security monitoring
    const logRoleActivity = async () => {
      try {
        // Only log if user has roles (to avoid spam)
        if (roles.length > 0) {
          await supabase
            .from('security_audit_log')
            .insert({
              user_id: user.id,
              action_type: 'ROLE_CHECK',
              table_name: 'user_roles',
              new_values: { roles: roles },
              ip_address: null, // Client-side cannot get real IP
              user_agent: navigator.userAgent
            });
        }
      } catch (error) {
        // Fail silently to not disrupt user experience
        console.debug('Security audit log failed:', error);
      }
    };

    // Log role activity on mount and when roles change
    logRoleActivity();
  }, [user, roles]);

  useEffect(() => {
    if (!user) return;

    // Monitor for suspicious test-taking patterns
    const monitorTestActivity = () => {
      let testPageViews = 0;
      let rapidTestClicks = 0;
      
      const trackTestActivity = (event: Event) => {
        const target = event.target as HTMLElement;
        
        // Track clicks on test-related elements
        if (target.closest('[data-testid]') || target.closest('.test-question')) {
          rapidTestClicks++;
          
          // If more than 20 rapid clicks in test context, log suspicious activity
          if (rapidTestClicks > 20) {
            (async () => {
              try {
                await supabase
                  .from('security_audit_log')
                  .insert({
                    user_id: user.id,
                    action_type: 'SUSPICIOUS_TEST_ACTIVITY',
                    table_name: 'test_results',
                    new_values: { rapid_clicks: rapidTestClicks },
                    user_agent: navigator.userAgent
                  });
              } catch (error) {
                // Fail silently
              }
            })();
              
            rapidTestClicks = 0; // Reset counter
          }
        }
      };

      // Track test page navigation
      const trackPageChange = () => {
        if (window.location.pathname.includes('/test')) {
          testPageViews++;
          
          // If more than 50 test page views in one session, log suspicious activity
          if (testPageViews > 50) {
            (async () => {
              try {
                await supabase
                  .from('security_audit_log')
                  .insert({
                    user_id: user.id,
                    action_type: 'EXCESSIVE_TEST_NAVIGATION',
                    table_name: 'test_results',
                    new_values: { page_views: testPageViews },
                    user_agent: navigator.userAgent
                  });
              } catch (error) {
                // Fail silently
              }
            })();
          }
        }
      };

      document.addEventListener('click', trackTestActivity);
      window.addEventListener('popstate', trackPageChange);
      
      // Reset counters periodically
      const resetInterval = setInterval(() => {
        rapidTestClicks = Math.max(0, rapidTestClicks - 5);
        testPageViews = Math.max(0, testPageViews - 10);
      }, 60000); // Every minute

      return () => {
        document.removeEventListener('click', trackTestActivity);
        window.removeEventListener('popstate', trackPageChange);
        clearInterval(resetInterval);
      };
    };

    const cleanup = monitorTestActivity();
    return cleanup;
  }, [user]);

  return null; // This component doesn't render anything
};