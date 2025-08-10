// src/components/test-result/AiAnalysisCard.tsx

import React, { useState } from 'react';
import { StandardizedScore } from '@/types/tests';
import { supabase } from '@/integrations/supabase/client';
import { Button } from '@/components/ui/button';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { useToast } from '@/components/ui/use-toast';
import { Loader2, Copy, Save } from 'lucide-react';

interface AiAnalysisCardProps {
  score: StandardizedScore | null;
  testName?: string;
  resultId?: string;
}

export const AiAnalysisCard: React.FC<AiAnalysisCardProps> = ({ score, testName, resultId }) => {
  const [isLoading, setIsLoading] = useState(false);
  const [analysis, setAnalysis] = useState<string | null>(null);
  const { toast } = useToast();

  const handleAnalyze = async () => {
    if (!score || !testName) {
      toast({
        title: "Eroare",
        description: "Nu se pot genera rezultatele fără datele testului.",
        variant: "destructive",
      });
      return;
    }

    setIsLoading(true);
    setAnalysis(null);

    try {
      const { data, error } = await supabase.functions.invoke('get-ai-test-analysis', {
        body: { score, testName },
      });

      if (error) throw error;
      
      setAnalysis(data.analysis);

    } catch (error) {
      console.error("Eroare la analiza AI:", error);
      toast({
        title: "A apărut o eroare",
        description: "Nu am putut genera analiza AI. Te rugăm să încerci din nou.",
        variant: "destructive",
      });
    } finally {
      setIsLoading(false);
    }
  };

  const handleCopyToClipboard = () => {
    if (analysis) {
      navigator.clipboard.writeText(analysis);
      toast({
        title: "Succes",
        description: "Analiza a fost copiată în clipboard.",
      });
    }
  };
  
  // Funcționalitatea de salvare va fi implementată ulterior
  const handleSaveToPlan = () => {
     toast({
        title: "Funcționalitate în dezvoltare",
        description: "Opțiunea de a salva analiza direct în planul de carieră va fi disponibilă în curând.",
      });
  }

  return (
    <Card>
      <CardHeader>
        <CardTitle>Analiză Detaliată cu AI</CardTitle>
        <p className="text-muted-foreground">
          Obține o interpretare aprofundată a rezultatelor tale, recomandări personalizate și cum se aplică acestea în cariera ta.
        </p>
      </CardHeader>
      <CardContent className="space-y-4">
        {!analysis && (
          <Button onClick={handleAnalyze} disabled={isLoading}>
            {isLoading ? (
              <>
                <Loader2 className="mr-2 h-4 w-4 animate-spin" />
                Se generează...
              </>
            ) : (
              'Analizează cu AI'
            )}
          </Button>
        )}

        {analysis && (
          <div className="p-4 border rounded-md bg-secondary/50 space-y-4">
            <div
              className="prose prose-sm dark:prose-invert max-w-none whitespace-pre-wrap"
              dangerouslySetInnerHTML={{ __html: analysis }}
            />
            <div className="flex items-center space-x-2 pt-4">
               <Button variant="outline" size="sm" onClick={handleCopyToClipboard}>
                  <Copy className="mr-2 h-4 w-4" /> Copiază
               </Button>
               <Button variant="outline" size="sm" onClick={handleSaveToPlan}>
                  <Save className="mr-2 h-4 w-4" /> Salvează în Plan
               </Button>
            </div>
          </div>
        )}
      </CardContent>
    </Card>
  );
};