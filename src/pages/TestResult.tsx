import React, { useState } from 'react';
import { useParams } from 'react-router-dom';
import { useQuery } from '@tanstack/react-query';
import { supabase } from '@/integrations/supabase/client';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Badge } from '@/components/ui/badge';
import { Progress } from '@/components/ui/progress';
import { Loader2, ArrowLeft, TrendingUp, Brain } from 'lucide-react';
import { Button } from '@/components/ui/button';
import { useNavigate } from 'react-router-dom';
import BigFiveRadarChart from '@/components/charts/BigFiveRadarChart';
import BigFiveExplanations from '@/components/charts/BigFiveExplanations';
import { useToast } from '@/hooks/use-toast';

interface ScoreData {
  overall: number;
  raw_score: number;
  max_score: number;
  interpretation: string;
  dimensions: { [key: string]: number };
  detailed_interpretations?: {
    openness?: string;
    conscientiousness?: string;
    extraversion?: string;
    agreeableness?: string;
    neuroticism?: string;
  };
}

interface TestResultData {
  id: string;
  score: ScoreData;
  completed_at: string;
  test_types: {
    name: string;
    description: string;
  };
}

const TestResult = () => {
  const { resultId } = useParams<{ resultId: string }>();
  const navigate = useNavigate();
  const { toast } = useToast();
  const [detailedAnalysis, setDetailedAnalysis] = useState<string>('');
  const [isGeneratingAnalysis, setIsGeneratingAnalysis] = useState(false);

  const { data: result, isLoading, error } = useQuery({
    queryKey: ['test-result', resultId],
    queryFn: async () => {
      const { data, error } = await supabase
        .from('test_results')
        .select(`
          *,
          test_types (
            name,
            description
          )
        `)
        .eq('id', resultId)
        .single();
      
      if (error) throw error;
      
      // Type cast the score from Json to our expected structure
      return {
        ...data,
        score: data.score as unknown as ScoreData
      } as TestResultData;
    },
    enabled: !!resultId
  });

  const getDimensionLabel = (key: string) => {
    const labels: { [key: string]: string } = {
      // General
      general_score: 'Scor General',

      // GAD-7
      anxiety_level: 'Nivel de Anxietate',

      // Emotional Intelligence
      self_awareness: 'Conștientizare de Sine',
      self_regulation: 'Autoreglare',
      motivation: 'Motivație',
      empathy: 'Empatie',
      social_skills: 'Abilități Sociale',

      // Big Five
      openness: 'Deschidere către Experiență',
      conscientiousness: 'Conștiinciozitate',
      extraversion: 'Extraversiune',
      agreeableness: 'Amabilitate',
      neuroticism: 'Nevrotism',

      // Legacy/Other - might still be in use
      emotional_intelligence: 'Inteligență Emoțională',
      leadership: 'Leadership',
      stress_management: 'Gestionarea Stresului',
    };
    // A nice fallback for any keys not explicitly defined
    return labels[key] || key.split('_').map(word => word.charAt(0).toUpperCase() + word.slice(1)).join(' ');
  };

  const getScoreColor = (score: number) => {
    if (score >= 80) return 'text-green-600';
    if (score >= 60) return 'text-yellow-600';
    return 'text-red-600';
  };

  const getScoreBadgeVariant = (score: number) => {
    if (score >= 80) return 'default';
    if (score >= 60) return 'secondary';
    return 'destructive';
  };

  // Helper function to safely convert dimensions to Big Five format
  const getBigFiveDimensions = (dimensions: { [key: string]: number }) => {
    return {
      openness: dimensions.openness || 0,
      conscientiousness: dimensions.conscientiousness || 0,
      extraversion: dimensions.extraversion || 0,
      agreeableness: dimensions.agreeableness || 0,
      neuroticism: dimensions.neuroticism || 0
    };
  };

  const generateDetailedAnalysis = async () => {
    if (!result || !isBigFiveTest) return;
    
    setIsGeneratingAnalysis(true);
    
    try {
      const rawScores = {
        openness: Math.round((result.score.dimensions.openness / 100) * 40),
        conscientiousness: Math.round((result.score.dimensions.conscientiousness / 100) * 40),
        extraversion: Math.round((result.score.dimensions.extraversion / 100) * 40),
        agreeableness: Math.round((result.score.dimensions.agreeableness / 100) * 40),
        neuroticism: Math.round((result.score.dimensions.neuroticism / 100) * 40)
      };

      const prompt = `Ești un psiholog expert în consiliere vocațională. Un utilizator a finalizat testul de personalitate Big Five. Iată rezultatele sale (scoruri din 40):
- Deschidere: ${rawScores.openness}
- Conștiinciozitate: ${rawScores.conscientiousness}
- Extraversiune: ${rawScores.extraversion}
- Agreabilitate: ${rawScores.agreeableness}
- Nevrotism: ${rawScores.neuroticism}

Sarcina ta este să generezi o analiză completă și personalizată, structurată în 3 secțiuni clare:
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

      if (error) throw error;

      setDetailedAnalysis(data.analysis);
      toast({
        title: "Analiză generată cu succes",
        description: "Analiza detaliată a profilului tău a fost generată."
      });
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

  if (isLoading) {
    return (
      <div className="min-h-screen bg-gray-50 flex items-center justify-center">
        <Loader2 className="w-8 h-8 animate-spin" />
      </div>
    );
  }

  if (error || !result) {
    return (
      <div className="min-h-screen bg-gray-50 flex items-center justify-center">
        <div className="text-center">
          <h2 className="text-2xl font-bold text-gray-900 mb-2">Rezultatul nu a fost găsit</h2>
          <Button onClick={() => navigate('/teste')}>
            Înapoi la teste
          </Button>
        </div>
      </div>
    );
  }

  const isBigFiveTest = result.test_types.name.includes('Big Five');
  const bigFiveDimensions = getBigFiveDimensions(result.score.dimensions);

  return (
    <div className="min-h-screen bg-gray-50">
      <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
        {/* Header */}
        <div className="mb-8">
          <Button 
            variant="ghost" 
            onClick={() => navigate('/teste')}
            className="flex items-center mb-4"
          >
            <ArrowLeft className="w-4 h-4 mr-2" />
            Înapoi la teste
          </Button>
          
          <h1 className="text-3xl font-bold text-gray-900 mb-2">
            Rezultatul testului: {result.test_types.name}
          </h1>
          <p className="text-gray-600">
            Completat pe {new Date(result.completed_at).toLocaleDateString('ro-RO')}
          </p>
        </div>

        {/* Overall Score */}
        <Card className="mb-8">
          <CardHeader>
            <CardTitle className="flex items-center">
              <TrendingUp className="w-5 h-5 mr-2" />
              Scorul General
            </CardTitle>
          </CardHeader>
          <CardContent>
            <div className="flex items-center justify-between mb-4">
              <div>
                <div className="text-3xl font-bold mb-2">
                  <span className={getScoreColor(result.score.overall)}>
                    {result.score.overall}%
                  </span>
                </div>
                <Badge variant={getScoreBadgeVariant(result.score.overall)}>
                  {result.score.interpretation}
                </Badge>
              </div>
              <div className="text-right text-sm text-gray-600">
                <div>Scor obținut: {result.score.raw_score}</div>
                <div>Scor maxim: {result.score.max_score}</div>
              </div>
            </div>
            <Progress value={result.score.overall} className="w-full" />
          </CardContent>
        </Card>

        {/* Big Five Radar Chart */}
        {isBigFiveTest && result.score.dimensions && (
          <Card className="mb-8">
            <CardHeader>
              <CardTitle>Vizualizare Radar - Dimensiunile Big Five</CardTitle>
              <p className="text-sm text-gray-600">
                Graficul radar arată profilul tău de personalitate pe cele 5 dimensiuni principale. 
                Fiecare axă reprezintă o dimensiune, iar scorul este afișat ca procent din scorul maxim (40 puncte).
              </p>
            </CardHeader>
            <CardContent>
              <BigFiveRadarChart dimensions={bigFiveDimensions} />
              
              {/* Generate Detailed Analysis Button */}
              <div className="mt-6 text-center">
                <Button
                  onClick={generateDetailedAnalysis}
                  disabled={isGeneratingAnalysis}
                  size="lg"
                  className="bg-gradient-to-r from-blue-600 to-purple-600 hover:from-blue-700 hover:to-purple-700 text-white font-semibold py-3 px-8 rounded-lg shadow-lg transform transition hover:scale-105"
                >
                  {isGeneratingAnalysis ? (
                    <>
                      <Loader2 className="w-5 h-5 mr-2 animate-spin" />
                      Se generează analiza...
                    </>
                  ) : (
                    <>
                      <Brain className="w-5 h-5 mr-2" />
                      Generează Analiza Detaliată a Profilului
                    </>
                  )}
                </Button>
              </div>
            </CardContent>
          </Card>
        )}

        {/* Detailed Analysis Display */}
        {detailedAnalysis && (
          <Card className="mb-8">
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

        {/* Dimensions */}
        {result.score.dimensions && Object.keys(result.score.dimensions).length > 0 && (
          <Card className="mb-8">
            <CardHeader>
              <CardTitle>Analiza pe Dimensiuni</CardTitle>
            </CardHeader>
            <CardContent>
              <div className="space-y-6">
                {Object.entries(result.score.dimensions).map(([key, value]) => (
                  <div key={key}>
                    <div className="flex items-center justify-between mb-2">
                      <h3 className="font-medium">{getDimensionLabel(key)}</h3>
                      <span className={`font-bold ${getScoreColor(value)}`}>
                        {value}%
                      </span>
                    </div>
                    <Progress value={value} className="w-full" />
                  </div>
                ))}
              </div>
            </CardContent>
          </Card>
        )}

        {/* Big Five Explanations */}
        {isBigFiveTest && result.score.dimensions && (
          <Card className="mb-8">
            <CardHeader>
              <CardTitle>Ghid de Interpretare</CardTitle>
            </CardHeader>
            <CardContent>
              <BigFiveExplanations dimensions={bigFiveDimensions} />
            </CardContent>
          </Card>
        )}

        {/* Detailed Interpretations for Big Five */}
        {isBigFiveTest && result.score.detailed_interpretations && (
          <Card className="mb-8">
            <CardHeader>
              <CardTitle>Interpretări Detaliate</CardTitle>
            </CardHeader>
            <CardContent>
              <div className="space-y-6">
                {Object.entries(result.score.detailed_interpretations).map(([dimension, interpretation]) => (
                  <div key={dimension} className="border-l-4 border-blue-500 pl-4">
                    <h3 className="font-semibold text-lg mb-2 text-blue-700">
                      {getDimensionLabel(dimension)}
                    </h3>
                    <p className="text-gray-700 leading-relaxed">
                      {interpretation}
                    </p>
                  </div>
                ))}
              </div>
            </CardContent>
          </Card>
        )}

        {/* Actions */}
        <div className="flex gap-4">
          <Button onClick={() => navigate('/teste')} className="flex-1">
            Încearcă un alt test
          </Button>
          <Button variant="outline" onClick={() => navigate('/dashboard')} className="flex-1">
            Mergi la Dashboard
          </Button>
        </div>
      </div>
    </div>
  );
};

export default TestResult;
