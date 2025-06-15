import React from 'react';
import { useParams } from 'react-router-dom';
import { useQuery } from '@tanstack/react-query';
import { supabase } from '@/integrations/supabase/client';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Badge } from '@/components/ui/badge';
import { Progress } from '@/components/ui/progress';
import { Loader2, ArrowLeft, TrendingUp } from 'lucide-react';
import { Button } from '@/components/ui/button';
import { useNavigate } from 'react-router-dom';
import BigFiveRadarChart from '@/components/charts/BigFiveRadarChart';
import BigFiveExplanations from '@/components/charts/BigFiveExplanations';

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
              <BigFiveRadarChart dimensions={result.score.dimensions} />
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
              <BigFiveExplanations dimensions={result.score.dimensions} />
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
