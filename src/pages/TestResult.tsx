
import React from 'react';
import { useParams, useNavigate } from 'react-router-dom';
import { useQuery } from '@tanstack/react-query';
import { supabase } from '@/integrations/supabase/client';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Badge } from '@/components/ui/badge';
import { Progress } from '@/components/ui/progress';
import { Loader2, ArrowLeft, Download, Share2, BarChart3 } from 'lucide-react';
import { useToast } from '@/hooks/use-toast';

interface TestResult {
  id: string;
  score: {
    overall: number;
    dimensions: {
      emotional_intelligence: number;
      social_skills: number;
      leadership: number;
      stress_management: number;
    };
  };
  ai_analysis: string;
  recommendations: string;
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
      return data as TestResult;
    },
    enabled: !!resultId
  });

  const handleShare = () => {
    if (navigator.share) {
      navigator.share({
        title: 'Rezultatul testului meu psihologic',
        text: 'Am completat un test psihologic și am obținut rezultate interesante!',
        url: window.location.href
      });
    } else {
      navigator.clipboard.writeText(window.location.href);
      toast({
        title: "Link copiat!",
        description: "Link-ul a fost copiat în clipboard."
      });
    }
  };

  const getDimensionLabel = (key: string) => {
    const labels: { [key: string]: string } = {
      emotional_intelligence: 'Inteligență Emoțională',
      social_skills: 'Abilități Sociale',
      leadership: 'Leadership',
      stress_management: 'Gestionarea Stresului'
    };
    return labels[key] || key;
  };

  const getScoreColor = (score: number) => {
    if (score >= 80) return 'text-green-600';
    if (score >= 60) return 'text-yellow-600';
    return 'text-red-600';
  };

  const getScoreLabel = (score: number) => {
    if (score >= 80) return 'Excelent';
    if (score >= 60) return 'Bun';
    if (score >= 40) return 'Mediu';
    return 'Necesită îmbunătățire';
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
          <Button onClick={() => navigate('/dashboard')}>
            Înapoi la dashboard
          </Button>
        </div>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-gray-50">
      <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
        {/* Header */}
        <div className="mb-8">
          <div className="flex items-center justify-between mb-4">
            <Button 
              variant="ghost" 
              onClick={() => navigate('/dashboard')}
              className="flex items-center"
            >
              <ArrowLeft className="w-4 h-4 mr-2" />
              Înapoi la dashboard
            </Button>
            
            <div className="flex space-x-2">
              <Button variant="outline" onClick={handleShare}>
                <Share2 className="w-4 h-4 mr-2" />
                Partajează
              </Button>
              <Button variant="outline">
                <Download className="w-4 h-4 mr-2" />
                Descarcă PDF
              </Button>
            </div>
          </div>

          <h1 className="text-3xl font-bold text-gray-900 mb-2">Rezultatul Testului</h1>
          <p className="text-gray-600">
            {result.test_types.name} • Completat pe {new Date(result.completed_at).toLocaleDateString('ro-RO')}
          </p>
        </div>

        {/* Overall Score */}
        <Card className="mb-8">
          <CardHeader>
            <CardTitle className="flex items-center">
              <BarChart3 className="w-6 h-6 mr-2 text-blue-600" />
              Scorul General
            </CardTitle>
          </CardHeader>
          
          <CardContent>
            <div className="text-center mb-6">
              <div className={`text-6xl font-bold ${getScoreColor(result.score.overall)}`}>
                {Math.round(result.score.overall)}%
              </div>
              <Badge variant="secondary" className="mt-2">
                {getScoreLabel(result.score.overall)}
              </Badge>
            </div>
            
            <Progress value={result.score.overall} className="h-3" />
          </CardContent>
        </Card>

        {/* Dimension Scores */}
        <Card className="mb-8">
          <CardHeader>
            <CardTitle>Scoruri pe Dimensiuni</CardTitle>
          </CardHeader>
          
          <CardContent>
            <div className="space-y-6">
              {Object.entries(result.score.dimensions).map(([key, score]) => (
                <div key={key}>
                  <div className="flex justify-between items-center mb-2">
                    <span className="font-medium">{getDimensionLabel(key)}</span>
                    <span className={`font-bold ${getScoreColor(score)}`}>
                      {Math.round(score)}%
                    </span>
                  </div>
                  <Progress value={score} className="h-2" />
                </div>
              ))}
            </div>
          </CardContent>
        </Card>

        {/* AI Analysis */}
        {result.ai_analysis && (
          <Card className="mb-8">
            <CardHeader>
              <CardTitle>Analiza AI</CardTitle>
            </CardHeader>
            
            <CardContent>
              <div className="prose max-w-none">
                <p className="text-gray-700 leading-relaxed whitespace-pre-line">
                  {result.ai_analysis}
                </p>
              </div>
            </CardContent>
          </Card>
        )}

        {/* Recommendations */}
        {result.recommendations && (
          <Card className="mb-8">
            <CardHeader>
              <CardTitle>Recomandări pentru Dezvoltare</CardTitle>
            </CardHeader>
            
            <CardContent>
              <div className="prose max-w-none">
                <p className="text-gray-700 leading-relaxed whitespace-pre-line">
                  {result.recommendations}
                </p>
              </div>
            </CardContent>
          </Card>
        )}

        {/* Actions */}
        <div className="flex justify-center space-x-4">
          <Button onClick={() => navigate('/teste')}>
            Încearcă Alt Test
          </Button>
          <Button variant="outline" onClick={() => navigate('/career-paths')}>
            Creează Plan de Carieră
          </Button>
        </div>
      </div>
    </div>
  );
};

export default TestResult;
