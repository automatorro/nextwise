
import React, { useState } from 'react';
import { StandardizedScore } from '@/types/tests';
import { supabase } from '@/integrations/supabase/client';
import { Button } from '@/components/ui/button';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { useToast } from '@/hooks/use-toast';
import { Loader2, Copy, Save, StickyNote, Lightbulb } from 'lucide-react';
import SaveToCareerPlanModal from '@/components/career/SaveToCareerPlanModal';
import { useUserNotes } from '@/hooks/useUserNotes';
import { useAIRecommendations } from '@/hooks/useAIRecommendations';
import { useLanguage } from '@/hooks/useLanguage';

interface AiAnalysisCardProps {
  score: StandardizedScore | null;
  testName?: string;
  resultId?: string;
}

export const AiAnalysisCard: React.FC<AiAnalysisCardProps> = ({ score, testName, resultId }) => {
  const [isLoading, setIsLoading] = useState(false);
  const [analysis, setAnalysis] = useState<string | null>(null);
  const [isSaveModalOpen, setIsSaveModalOpen] = useState(false);
  const { toast } = useToast();
  const { createNote } = useUserNotes();
  const { generateRecommendations } = useAIRecommendations();
  const { t } = useLanguage();

  // Funcție de fallback pentru traduceri
  const getTranslation = (key: string, fallback: string) => {
    const translation = t(key);
    return translation === key ? fallback : translation;
  };

  const handleAnalyze = async () => {
    if (!score || !testName) {
      toast({
        title: "Eroare",
        description: "Datele testului sunt incomplete pentru a genera o analiză.",
        variant: "destructive",
      });
      return;
    }

    // Validare specifică pentru tipul de test
    const hasValidData = score.type === 'dimensional' ? score.dimensions?.length > 0 :
                        score.type === 'scale' ? (score.raw_score !== undefined || score.scale_level || score.overall !== undefined) :
                        score.type === 'profile' ? score.dominant_profile :
                        false;

    if (!hasValidData) {
      toast({
        title: "Eroare", 
        description: "Datele testului sunt incomplete pentru tipul de test specificat.",
        variant: "destructive",
      });
      return;
    }

    setIsLoading(true);
    setAnalysis(null);

    try {
      // Construim payload-ul în funcție de tipul testului
      const payload = {
        testName: testName,
        testType: score.type,
        ...score // Trimitem toate datele scorului pentru flexibilitate
      };

      const { data, error } = await supabase.functions.invoke('analyze-test-result', {
        body: payload,
      });

      if (error) throw error;
      
      setAnalysis(data.analysis);

      // Auto-generate recommendations based on the analysis
      if (data.analysis) {
        generateRecommendations.mutate({
          analysisText: data.analysis,
          sourceType: 'ai_analysis',
          sourceId: resultId,
          testType: testName
        });
      }

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
    if (analysis && testName) {
      const formattedText = `📊 ANALIZĂ AI - ${testName.toUpperCase()}
📅 Data: ${new Date().toLocaleDateString('ro-RO')}

${analysis}

---
💡 Această analiză poate fi folosită pentru:
• Crearea unui plan de carieră personalizat
• Înțelegerea profilului tău profesional
• Identificarea punctelor forte și a ariilor de dezvoltare
• Luarea de decizii informate în carieră

Salvează această analiză în "Notele mele personale" din aplicație pentru referințe ulterioare.`;

      navigator.clipboard.writeText(formattedText);
      toast({
        title: "Succes - Analiză copiată!",
        description: (
          <div className="space-y-2">
            <p>Analiza a fost copiată cu format îmbunătățit.</p>
            <div className="text-xs space-y-1">
              <p>💡 Poți să o folosești pentru:</p>
              <p>• Salvare în documentele tale personale</p>
              <p>• Discuții cu mentori sau consilieri</p>
              <p>• Planificarea dezvoltării profesionale</p>
            </div>
          </div>
        ),
      });
    }
  };

  const handleSaveToPersonalNotes = () => {
    if (analysis && testName) {
      const noteTitle = `Analiză ${testName} - ${new Date().toLocaleDateString('ro-RO')}`;
      
      createNote.mutate({
        title: noteTitle,
        content: analysis,
        note_type: 'ai_analysis',
        test_type: testName,
        test_result_id: resultId,
        tags: ['analiză-ai', testName.toLowerCase()]
      });
    }
  };
  
  const handleSaveToPlan = () => {
    setIsSaveModalOpen(true);
  }

  return (
    <Card>
      <CardHeader>
        <CardTitle>
          {getTranslation('aiAnalysis.title', 'AI Analysis & Insights')}
        </CardTitle>
        <p className="text-muted-foreground">
          {getTranslation('aiAnalysis.description', 'Get detailed AI-powered analysis of your test results with personalized recommendations for your career development.')}
        </p>
      </CardHeader>
      <CardContent className="space-y-4">
        {!analysis && (
          <Button onClick={handleAnalyze} disabled={isLoading}>
            {isLoading ? (
              <>
                <Loader2 className="mr-2 h-4 w-4 animate-spin" />
                {getTranslation('aiAnalysis.generating', 'Generating analysis...')}
              </>
            ) : (
              getTranslation('aiAnalysis.analyzeButton', 'Generate AI Analysis')
            )}
          </Button>
        )}

        {analysis && (
          <div className="p-4 border rounded-md bg-secondary/50 space-y-4">
            <div className="prose prose-sm dark:prose-invert max-w-none whitespace-pre-wrap" dangerouslySetInnerHTML={{ __html: analysis }} />
            <div className="flex flex-wrap items-center gap-2 pt-4">
               <Button variant="outline" size="sm" onClick={handleCopyToClipboard}>
                 <Copy className="mr-2 h-4 w-4" /> Copiază
               </Button>
               <Button variant="outline" size="sm" onClick={handleSaveToPersonalNotes}>
                 <StickyNote className="mr-2 h-4 w-4" /> Salvează în Note
               </Button>
               <Button variant="outline" size="sm" onClick={handleSaveToPlan}>
                 <Save className="mr-2 h-4 w-4" /> Salvează în Plan
               </Button>
               {generateRecommendations.isSuccess && (
                 <Button variant="outline" size="sm" disabled>
                   <Lightbulb className="mr-2 h-4 w-4" /> Recomandări generate
                 </Button>
               )}
            </div>
          </div>
        )}

        <SaveToCareerPlanModal
          isOpen={isSaveModalOpen}
          onClose={() => setIsSaveModalOpen(false)}
          analysisText={analysis || ''}
          testName={testName}
          testType={score?.type}
        />
      </CardContent>
    </Card>
  );
};
