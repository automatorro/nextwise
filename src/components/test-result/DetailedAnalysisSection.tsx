
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

      // Enhanced, detailed prompt for more comprehensive analysis
      const prompt = `Ești un psiholog expert în consiliere vocațională cu 15+ ani experiență în analiza personalității și dezvoltare de carieră. Un utilizator a finalizat testul de personalitate Big Five și acum ai nevoie să generezi o analiză completă, profundă și extrem de personalizată.

**REZULTATELE TESTULUI (scoruri din 40 de puncte posibile):**
- Deschidere către Experiență: ${rawScores.openness}/40 (${safeDimensions.openness}%)
- Conștiinciozitate: ${rawScores.conscientiousness}/40 (${safeDimensions.conscientiousness}%)
- Extraversiune: ${rawScores.extraversion}/40 (${safeDimensions.extraversion}%)
- Agreabilitate: ${rawScores.agreeableness}/40 (${safeDimensions.agreeableness}%)
- Nevrotism: ${rawScores.neuroticism}/40 (${safeDimensions.neuroticism}%)

**CONTEXT PENTRU INTERPRETARE:**
- Scoruri 0-30%: Scăzute
- Scoruri 31-70%: Moderate
- Scoruri 71-100%: Ridicate

**INSTRUCȚIUNI PENTRU ANALIZA DETALIATĂ:**

Generează o analiză structurată în **5 secțiuni distincte**, fiecare cu minimum 200-300 de cuvinte:

## **1. Profilul Tău Unic de Personalitate**
- Explică pe înțelesul tuturor ce înseamnă fiecare scor obținut
- Analizează interacțiunile între dimensiuni (ex: "Combinația ta de Conștiinciozitate ridicată cu Agreabilitate moderată înseamnă că...")
- Identifică pattern-uri unice în profil și ce îl face special
- Folosește metafore și exemple concrete pentru a face explicația accesibilă
- Evită etichetările negative, transformă tot în oportunități de creștere

## **2. Punctele Tale Forte și Superputerile Naturale**
- Identifică 3-4 puncte forte clare bazate pe scorurile ridicate
- Explică cum se manifestă aceste puncte forte în viața de zi cu zi
- Dă exemple concrete de situații în care aceste trăsături îți aduc avantaje
- Analizează combinațiile unice de trăsături care îți creează "superputeri" distincte
- Oferă sfaturi pentru a valorifica și dezvolta aceste puncte forte

## **3. Zonele de Dezvoltare și Creștere Personală**
- Identifică 2-3 zone unde ai potențial de dezvoltare (nu defecte!)
- Explică cum aceste zone pot fi transformate în oportunități
- Oferă strategii concrete și practice pentru dezvoltare
- Sugerează resurse specifice (cărți, cursuri, exerciții) pentru fiecare zonă
- Încurajează o perspectivă pozitivă asupra dezvoltării continue

## **4. Recomandări Detaliate de Carieră**
- Sugerează 5-7 tipuri de roluri sau domenii profesionale specifice
- Pentru fiecare recomandare, explică în detaliu DE CE este o potrivire perfectă
- Descrie mediul de lucru ideal pentru profilul tău
- Oferă sfaturi pentru dezvoltarea carierei pe termen scurt (6-12 luni) și lung (2-5 ani)
- Identifică tipurile de companii și culturi organizaționale care ți s-ar potrivi
- Menționează ce roluri ar trebui evitate și de ce

## **5. Plan de Acțiune Personalizat**
- Creează 5-7 acțiuni concrete și specifice pe care le poți lua în următoarele 30 de zile
- Pentru fiecare acțiune, explică cum va contribui la dezvoltarea ta
- Sugerează resurse practice: cărți specifice, cursuri online, aplicații, comunități
- Oferă exerciții zilnice sau săptămânale pentru fortificarea punctelor forte
- Propune modalități de monitorizare a progresului
- Înclude sfaturi pentru gestionarea provocărilor specifice profilului tău

**TON ȘI STIL:**
- Folosește un ton cald, empatic și motivațional
- Adresează-te direct utilizatorului cu "tu" și "al tău"
- Folosește exemple concrete și metafore pentru claritate
- Fii specific și acționabil, nu vag
- Încurajează și inspiră încrederea în sine
- Evită jargonul psihologic - explică totul în termeni simpli
- Fii pozitiv dar realist în recomandări

**LUNGIME:** Analiza finală trebuie să aibă minimum 1200-1500 de cuvinte, cu fiecare secțiune având conținut substanțial și detaliat.

Formatează întregul răspuns folosind Markdown cu titluri clare (##) și liste pentru o citire ușoară.`;

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
          title: "Analiză detaliată generată cu succes",
          description: "Analiza personalizată completă a profilului tău a fost generată cu AI."
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
          Primește o analiză personalizată extrem de detaliată și un plan de acțiune complet bazate pe profilul tău Big Five
        </p>
      </div>

      {/* Detailed Analysis Display */}
      {detailedAnalysis && (
        <Card className="mb-8 mt-6">
          <CardHeader>
            <CardTitle className="flex items-center">
              <Brain className="w-5 h-5 mr-2 text-blue-600" />
              Analiza Detaliată Completă a Profilului Tău
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
