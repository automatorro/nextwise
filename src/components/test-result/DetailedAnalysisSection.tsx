
import React, { useState } from 'react';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Loader2, Brain } from 'lucide-react';
import { supabase } from '@/integrations/supabase/client';
import { useToast } from '@/hooks/use-toast';

interface DetailedAnalysisSectionProps {
  dimensions: {
    [key: string]: number;
  };
  resultId: string;
}

const DetailedAnalysisSection = ({ dimensions, resultId }: DetailedAnalysisSectionProps) => {
  const [detailedAnalysis, setDetailedAnalysis] = useState<string>('');
  const [isGeneratingAnalysis, setIsGeneratingAnalysis] = useState(false);
  const { toast } = useToast();

  const generateDetailedAnalysis = async () => {
    setIsGeneratingAnalysis(true);
    
    try {
      // Safely extract Big Five dimensions with fallbacks
      const safeDimensions = {
        openness: dimensions.openness || 0,
        conscientiousness: dimensions.conscientiousness || 0,
        extraversion: dimensions.extraversion || 0,
        agreeableness: dimensions.agreeableness || 0,
        neuroticism: dimensions.neuroticism || 0
      };

      const rawScores = {
        openness: Math.round((safeDimensions.openness / 100) * 40),
        conscientiousness: Math.round((safeDimensions.conscientiousness / 100) * 40),
        extraversion: Math.round((safeDimensions.extraversion / 100) * 40),
        agreeableness: Math.round((safeDimensions.agreeableness / 100) * 40),
        neuroticism: Math.round((safeDimensions.neuroticism / 100) * 40)
      };

      const prompt = `Ești un psiholog expert în consiliere vocațională. Un utilizator a finalizat testul de personalitate Big Five. Iată rezultatele sale (scoruri din 40):
- Deschidere: ${rawScores.openness}
- Conștiinciozitate: ${rawScores.conscientiousness}
- Extraversiune: ${rawScores.extraversion}
- Agreabilitate: ${rawScores.agreeableness}
- Nevrotism: ${rawScores.neuroticism}

Sarcina ta este să generezi o analiză completă și personalizată, structurată în 3 secțiuni claire:
1. **Profilul Tău de Personalitate:** Explică pe înțelesul tuturor ce înseamnă scorul obținut la fiecare din cele 5 dimensiuni. Folosește un limbaj pozitiv și încurajator, evitând etichetările negative.
2. **Puncte Forte și Oportunități de Dezvoltare:** Pe baza acestui profil unic, identifică 2-3 puncte forte clare (ex: 'Combinația ta de Conștiinciozitate ridicată și Agreabilitate te face un coechipier de încredere') și 1-2 zone unde utilizatorul ar putea dori să se dezvolte, oferind sugestii concrete și blânde.
3. **Recomandări de Carieră Aliniate Profilului:** Sugerează 3-5 tipuri de roluri sau domenii profesionale care se potrivesc cu acest profil, explicând la fiecare *de ce* este o potrivire bună (ex: 'Un rol în management de proiect ar valorifica la maximum Conștiinciozitatea ta ridicată').

Formatează întregul răspuns folosind Markdown, cu titluri și liste pentru a fi ușor de citit.`;

      const { data, error } = await supabase.functions.invoke('analyze-big-five-result', {
        body: { 
          prompt,
          testResultId: resultId 
        }
      });

      if (error) {
        console.error('Supabase function error:', error);
        throw error;
      }

      if (data && data.analysis) {
        setDetailedAnalysis(data.analysis);
        toast({
          title: "Analiză generată cu succes",
          description: "Analiza detaliată a profilului tău a fost generată."
        });
      } else {
        throw new Error('No analysis returned from function');
      }
    } catch (error) {
      console.error('Error generating analysis:', error);
      toast({
        title: "Eroare",
        description: "Nu am putut genera analiza detaliată. Te rog încearcă din nou.",
        variant: "destructive"
      });
    } finally {
      setIsGeneratingAnalysis(false);
    }
  };

  const formatMarkdownToJSX = (markdown: string) => {
    // Simple markdown to JSX conversion for basic formatting
    const lines = markdown.split('\n');
    const elements: React.ReactNode[] = [];
    
    lines.forEach((line, index) => {
      if (line.startsWith('# ')) {
        elements.push(<h1 key={index} className="text-2xl font-bold mt-6 mb-3 text-gray-900">{line.substring(2)}</h1>);
      } else if (line.startsWith('## ')) {
        elements.push(<h2 key={index} className="text-xl font-semibold mt-5 mb-2 text-gray-800">{line.substring(3)}</h2>);
      } else if (line.startsWith('### ')) {
        elements.push(<h3 key={index} className="text-lg font-medium mt-4 mb-2 text-gray-700">{line.substring(4)}</h3>);
      } else if (line.startsWith('**') && line.endsWith('**')) {
        elements.push(<h3 key={index} className="text-lg font-semibold mt-4 mb-2 text-blue-700">{line.substring(2, line.length - 2)}</h3>);
      } else if (line.startsWith('- ')) {
        elements.push(<li key={index} className="ml-4 mb-1 text-gray-700">{line.substring(2)}</li>);
      } else if (line.trim() !== '') {
        elements.push(<p key={index} className="mb-3 text-gray-700 leading-relaxed">{line}</p>);
      }
    });
    
    return elements;
  };

  return (
    <>
      {/* Generate Analysis Button */}
      <div className="mt-6 text-center border-t pt-6">
        <Button
          onClick={generateDetailedAnalysis}
          disabled={isGeneratingAnalysis}
          size="lg"
          className="bg-gradient-to-r from-blue-600 to-purple-600 hover:from-blue-700 hover:to-purple-700 text-white font-semibold py-4 px-8 rounded-lg shadow-lg transform transition hover:scale-105"
        >
          {isGeneratingAnalysis ? (
            <>
              <Loader2 className="w-5 h-5 mr-2 animate-spin" />
              Se generează analiza cu AI...
            </>
          ) : (
            <>
              <Brain className="w-5 h-5 mr-2" />
              Generează Analiza Detaliată cu AI
            </>
          )}
        </Button>
        <p className="text-sm text-gray-500 mt-2">
          Primește o analiză personalizată și recomandări de carieră bazate pe profilul tău Big Five
        </p>
      </div>

      {/* Detailed Analysis Display */}
      {detailedAnalysis && (
        <Card className="mb-8 mt-6">
          <CardHeader>
            <CardTitle className="flex items-center">
              <Brain className="w-5 h-5 mr-2 text-blue-600" />
              Analiza Detaliată a Profilului Tău
            </CardTitle>
          </CardHeader>
          <CardContent>
            <div className="prose prose-gray max-w-none">
              {formatMarkdownToJSX(detailedAnalysis)}
            </div>
          </CardContent>
        </Card>
      )}
    </>
  );
};

export default DetailedAnalysisSection;
