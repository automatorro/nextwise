
import React, { useState } from 'react';
import { Button } from '@/components/ui/button';
import { useToast } from '@/hooks/use-toast';
import { supabase } from '@/integrations/supabase/client';
import { Loader2, Wand2 } from 'lucide-react';

const TranslationFixButton = () => {
  const [isFixing, setIsFixing] = useState(false);
  const { toast } = useToast();

  const handleFixTranslations = async () => {
    setIsFixing(true);
    
    try {
      const { data, error } = await supabase.functions.invoke('fix-test-translations');
      
      if (error) {
        console.error('Translation fix error:', error);
        throw error;
      }

      if (data?.success) {
        toast({
          title: "Translation Fix Complete",
          description: `Fixed ${data.fixed} questions successfully. ${data.errors} errors encountered.`,
        });
      } else {
        throw new Error(data?.error || 'Unknown error occurred');
      }
    } catch (error) {
      console.error('Error fixing translations:', error);
      toast({
        title: "Error",
        description: "Failed to fix translations. Please try again.",
        variant: "destructive"
      });
    } finally {
      setIsFixing(false);
    }
  };

  return (
    <Button
      onClick={handleFixTranslations}
      disabled={isFixing}
      className="bg-purple-600 hover:bg-purple-700 text-white"
    >
      {isFixing ? (
        <>
          <Loader2 className="w-4 h-4 mr-2 animate-spin" />
          Fixing Translations...
        </>
      ) : (
        <>
          <Wand2 className="w-4 h-4 mr-2" />
          Fix Test Translations
        </>
      )}
    </Button>
  );
};

export default TranslationFixButton;
