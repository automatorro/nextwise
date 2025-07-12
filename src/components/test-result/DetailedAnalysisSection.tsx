
import React, { useState } from 'react';
import { Button } from '@/components/ui/button';
import { Loader2, Brain } from 'lucide-react';
import { supabase } from '@/integrations/supabase/client';
import { useToast } from '@/hooks/use-toast';
import { useLanguage } from '@/hooks/useLanguage';

interface DetailedAnalysisSectionProps {
  dimensions: {
    [key: string]: number;
  };
  resultId: string;
  testType: string;
  score: {
    overall: number;
    raw_score: number;
    max_score: number;
    interpretation: string;
  };
}

const DetailedAnalysisSection = ({ dimensions, resultId, testType, score }: DetailedAnalysisSectionProps) => {
  const [detailedAnalysis, setDetailedAnalysis] = useState<string>('');
  const [isGeneratingAnalysis, setIsGeneratingAnalysis] = useState(false);
  const { toast } = useToast();
  const { t } = useLanguage();

  const generatePromptForTestType = (testType: string, score: any, dimensions: any) => {
    const baseInfo = `
**REZULTATELE TESTULUI:**
- Test: ${testType}
- Scor general: ${score.overall}% (${score.raw_score}/${score.max_score} puncte)
- Interpretare: ${score.interpretation}
`;

    if (testType.includes('Big Five')) {
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

      return `Ești un psiholog expert în consiliere vocațională cu 15+ ani experiență. Analizează aceste rezultate Big Five și generează o analiză completă, profundă și personalizată.

${baseInfo}
- Deschidere către Experiență: ${rawScores.openness}/40 (${safeDimensions.openness}%)
- Conștiinciozitate: ${rawScores.conscientiousness}/40 (${safeDimensions.conscientiousness}%)
- Extraversiune: ${rawScores.extraversion}/40 (${safeDimensions.extraversion}%)
- Agreabilitate: ${rawScores.agreeableness}/40 (${safeDimensions.agreeableness}%)
- Nevrotism: ${rawScores.neuroticism}/40 (${safeDimensions.neuroticism}%)

Generează o analiză structurată în 5 secțiuni: Profilul Unic, Punctele Forte, Zonele de Dezvoltare, Recomandări de Carieră, și Plan de Acțiune. Minimum 1200-1500 cuvinte, ton empatic și motivațional.`;
    }
    
    if (testType.includes('GAD-7') || testType.includes('Anxietate')) {
      return `Ești un psiholog clinician specializat în tulburări de anxietate. Analizează aceste rezultate GAD-7 și oferă o interpretare profesională.

${baseInfo}

Generează o analiză structurată în 4 secțiuni:
1. **Interpretarea Scorului** - Explică ce înseamnă scorul obținut în contextul GAD-7
2. **Manifestări și Simptome** - Descrie cum se poate manifesta anxietatea la acest nivel
3. **Strategii de Gestionare** - Oferă tehnici concrete și practice de coping
4. **Recomandări și Pași Următori** - Ghidează următoarele acțiuni recomandate

Ton profesional dar empatic, evită diagnosticarea, concentrează-te pe educație și suport. Minimum 800-1000 cuvinte.`;
    }

    if (testType.includes('DISC')) {
      const dimensionNames = Object.keys(dimensions);
      const dominantStyle = dimensionNames.reduce((a, b) => dimensions[a] > dimensions[b] ? a : b, dimensionNames[0]);
      
      return `Ești un consultant organizațional expert în profilarea DISC. Analizează aceste rezultate și oferă o interpretare profesională.

${baseInfo}
- Dimensiuni DISC: ${Object.entries(dimensions).map(([key, value]) => `${key}: ${value}%`).join(', ')}
- Stil dominant: ${dominantStyle}

Generează o analiză structurată în 4 secțiuni:
1. **Profilul DISC** - Explică stilul comportamental dominant și combinațiile
2. **Punctele Forte în Comunicare** - Cum comunici cel mai eficient
3. **Mediul de Lucru Ideal** - Ce tip de environment îți potrivește
4. **Dezvoltare și Adaptabilitate** - Cum să îți dezvolți flexibilitatea comportamentală

Ton profesional și practic, concentrează-te pe aplicații în mediul de lucru. Minimum 800-1000 cuvinte.`;
    }

    if (testType.includes('Enneagram')) {
      return `Ești un coach certificat în Enneagram cu experiență vastă. Analizează aceste rezultate și oferă o interpretare profundă.

${baseInfo}
- Dimensiuni: ${Object.entries(dimensions).map(([key, value]) => `Tip ${key}: ${value}%`).join(', ')}

Generează o analiză structurată în 4 secțiuni:
1. **Tipul de Personalitate Dominant** - Explică tipul principal și caracteristicile sale
2. **Motivații și Frici Profunde** - Analizează driverii inconștienți
3. **Căile de Creștere** - Direcțiile de dezvoltare sănătoasă
4. **Relații și Comunicare** - Cum interacționezi cu alții și cum să îmbunătățești relațiile

Ton profund și introspectiv, concentrează-te pe autocunoaștere și creștere personală. Minimum 1000-1200 cuvinte.`;
    }

    if (testType.includes('Inteligență Emoțională') || testType.includes('Emotional Intelligence')) {
      return `Ești un expert în inteligența emoțională și dezvoltare personală. Analizează aceste rezultate și oferă o interpretare detaliată.

${baseInfo}
- Dimensiuni: ${Object.entries(dimensions).map(([key, value]) => `${key}: ${value}%`).join(', ')}

Generează o analiză structurată în 4 secțiuni:
1. **Profilul Inteligenței Emoționale** - Evaluează punctele forte și zonele de îmbunătățire
2. **Impact în Relații** - Cum îți influențează abilitățile emoționale relațiile
3. **Aplicații Profesionale** - Cum să folosești EQ în carieră și leadership
4. **Plan de Dezvoltare EQ** - Exerciții și tehnici concrete de îmbunătățire

Ton suportiv și practic, concentrează-te pe dezvoltarea abilităților emoționale. Minimum 800-1000 cuvinte.`;
    }

    // Default prompt for other test types
    return `Ești un psiholog expert în evaluarea psihologică. Analizează aceste rezultate de test și oferă o interpretare profesională și personalizată.

${baseInfo}
${Object.keys(dimensions).length > 0 ? `- Dimensiuni: ${Object.entries(dimensions).map(([key, value]) => `${key}: ${value}%`).join(', ')}` : ''}

Generează o analiză structurată în 4 secțiuni:
1. **Interpretarea Rezultatelor** - Ce înseamnă scorul și dimensiunile obținute
2. **Punctele Forte Identificate** - Abilitățile și caracteristicile pozitive
3. **Oportunități de Dezvoltare** - Zone care pot fi îmbunătățite
4. **Recomandări Practice** - Pași concreți pentru utilizarea acestor insight-uri

Ton profesional dar accesibil, concentrează-te pe aplicabilitate practică. Minimum 800-1000 cuvinte.

Formatează răspunsul folosind Markdown cu titluri clare (##) și liste pentru o citire ușoară.`;
  };

  const generateDetailedAnalysis = async () => {
    setIsGeneratingAnalysis(true);
    
    try {
      const prompt = generatePromptForTestType(testType, score, dimensions);

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
          title: t('common.success'),
          description: t('testResult.loadingAnalysis')
        });
      } else {
        throw new Error('No analysis returned from function');
      }
    } catch (error) {
      console.error('Error generating analysis:', error);
      toast({
        title: t('common.error'),
        description: t('testResult.noAnalysis'),
        variant: "destructive"
      });
    } finally {
      setIsGeneratingAnalysis(false);
    }
  };

  const formatMarkdownToJSX = (markdown: string) => {
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
      <div className="text-center">
        <Button
          onClick={generateDetailedAnalysis}
          disabled={isGeneratingAnalysis}
          size="lg"
          className="bg-gradient-to-r from-blue-600 to-purple-600 hover:from-blue-700 hover:to-purple-700 text-white font-semibold py-4 px-8 rounded-lg shadow-lg transform transition hover:scale-105"
        >
          {isGeneratingAnalysis ? (
            <>
              <Loader2 className="w-5 h-5 mr-2 animate-spin" />
              {t('testResult.loadingAnalysis')}
            </>
          ) : (
            <>
              <Brain className="w-5 h-5 mr-2" />
              {t('testResult.detailedAnalysis')}
            </>
          )}
        </Button>
        <p className="text-sm text-gray-500 mt-2">
          Primește o analiză personalizată extrem de detaliată și recomandări specifice pentru rezultatele tale
        </p>
      </div>

      {/* Detailed Analysis Display */}
      {detailedAnalysis && (
        <div className="mt-8 p-6 bg-gradient-to-br from-blue-50 to-purple-50 rounded-lg border border-blue-200">
          <div className="flex items-center mb-4">
            <Brain className="w-5 h-5 mr-2 text-blue-600" />
            <h3 className="text-lg font-semibold text-gray-800">{t('testResult.aiAnalysis')}</h3>
          </div>
          <div className="prose prose-gray max-w-none">
            {formatMarkdownToJSX(detailedAnalysis)}
          </div>
        </div>
      )}
    </>
  );
};

export default DetailedAnalysisSection;
