
import React, { useState, useEffect } from 'react';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Progress } from '@/components/ui/progress';
import { useToast } from '@/hooks/use-toast';
import { Loader2, Languages, CheckCircle, AlertCircle } from 'lucide-react';
import { 
  translateAllQuestions, 
  translateTestQuestions, 
  getTranslationProgress,
  getUntranslatedQuestions 
} from '@/utils/translateQuestions';
import { supabase } from '@/integrations/supabase/client';

interface TestType {
  id: string;
  name: string;
  questions_count: number;
}

const TranslationManager = () => {
  const [isTranslating, setIsTranslating] = useState(false);
  const [progress, setProgress] = useState({
    total: 0,
    translated: 0,
    remaining: 0,
    percentage: 0
  });
  const [testTypes, setTestTypes] = useState<TestType[]>([]);
  const [selectedTestType, setSelectedTestType] = useState<string>('');
  const [translationLog, setTranslationLog] = useState<string[]>([]);
  const { toast } = useToast();

  useEffect(() => {
    loadProgress();
    loadTestTypes();
  }, []);

  const loadProgress = async () => {
    try {
      const progressData = await getTranslationProgress();
      setProgress(progressData);
    } catch (error) {
      console.error('Error loading progress:', error);
    }
  };

  const loadTestTypes = async () => {
    try {
      const { data, error } = await supabase
        .from('test_types')
        .select('id, name, questions_count')
        .order('name');
      
      if (error) throw error;
      setTestTypes(data || []);
    } catch (error) {
      console.error('Error loading test types:', error);
    }
  };

  const addToLog = (message: string) => {
    setTranslationLog(prev => [...prev, `${new Date().toLocaleTimeString()}: ${message}`]);
  };

  const handleTranslateAll = async () => {
    setIsTranslating(true);
    setTranslationLog([]);
    addToLog('Începe traducerea tuturor întrebărilor...');

    try {
      const result = await translateAllQuestions();
      
      if (result.success) {
        addToLog(`Succes! Au fost traduse ${result.translated} din ${result.total} întrebări.`);
        toast({
          title: 'Traducere completată',
          description: `${result.translated} întrebări au fost traduse cu succes.`,
        });
        await loadProgress();
      } else {
        addToLog(`Eroare: ${result.error}`);
        toast({
          title: 'Eroare la traducere',
          description: result.error || 'A apărut o eroare necunoscută.',
          variant: 'destructive'
        });
      }
    } catch (error) {
      const errorMessage = error instanceof Error ? error.message : 'Eroare necunoscută';
      addToLog(`Eroare critică: ${errorMessage}`);
      toast({
        title: 'Eroare critică',
        description: errorMessage,
        variant: 'destructive'
      });
    } finally {
      setIsTranslating(false);
    }
  };

  const handleTranslateTestType = async () => {
    if (!selectedTestType) {
      toast({
        title: 'Selectează un test',
        description: 'Te rugăm să selectezi un tip de test pentru traducere.',
        variant: 'destructive'
      });
      return;
    }

    setIsTranslating(true);
    setTranslationLog([]);
    
    const testType = testTypes.find(t => t.id === selectedTestType);
    addToLog(`Începe traducerea pentru testul: ${testType?.name}...`);

    try {
      const result = await translateTestQuestions(selectedTestType);
      
      if (result.success) {
        addToLog(`Succes! Au fost traduse ${result.translated} din ${result.total} întrebări pentru ${testType?.name}.`);
        toast({
          title: 'Traducere completată',
          description: `${result.translated} întrebări au fost traduse pentru ${testType?.name}.`,
        });
        await loadProgress();
      } else {
        addToLog(`Eroare: ${result.error}`);
        toast({
          title: 'Eroare la traducere',
          description: result.error || 'A apărut o eroare necunoscută.',
          variant: 'destructive'
        });
      }
    } catch (error) {
      const errorMessage = error instanceof Error ? error.message : 'Eroare necunoscută';
      addToLog(`Eroare critică: ${errorMessage}`);
      toast({
        title: 'Eroare critică',
        description: errorMessage,
        variant: 'destructive'
      });
    } finally {
      setIsTranslating(false);
    }
  };

  return (
    <div className="space-y-6">
      <Card>
        <CardHeader>
          <CardTitle className="flex items-center gap-2">
            <Languages className="w-5 h-5" />
            Managementul Traducerilor
          </CardTitle>
        </CardHeader>
        <CardContent className="space-y-4">
          <div>
            <h3 className="text-lg font-medium mb-2">Progres General</h3>
            <div className="space-y-2">
              <div className="flex justify-between text-sm">
                <span>Întrebări traduse: {progress.translated} din {progress.total}</span>
                <span>{progress.percentage}%</span>
              </div>
              <Progress value={progress.percentage} className="w-full" />
              <p className="text-sm text-gray-600">
                Rămân de tradus: {progress.remaining} întrebări
              </p>
            </div>
          </div>

          <div className="border-t pt-4">
            <h3 className="text-lg font-medium mb-4">Acțiuni de Traducere</h3>
            
            <div className="space-y-4">
              <div>
                <h4 className="font-medium mb-2">Traducere selectivă</h4>
                <div className="flex gap-2">
                  <select
                    value={selectedTestType}
                    onChange={(e) => setSelectedTestType(e.target.value)}
                    className="flex-1 border border-gray-300 rounded-md px-3 py-2"
                    disabled={isTranslating}
                  >
                    <option value="">Selectează un tip de test...</option>
                    {testTypes.map(test => (
                      <option key={test.id} value={test.id}>
                        {test.name} ({test.questions_count} întrebări)
                      </option>
                    ))}
                  </select>
                  <Button
                    onClick={handleTranslateTestType}
                    disabled={isTranslating || !selectedTestType}
                  >
                    {isTranslating ? (
                      <Loader2 className="w-4 h-4 animate-spin mr-2" />
                    ) : null}
                    Traduce Test
                  </Button>
                </div>
              </div>

              <div>
                <h4 className="font-medium mb-2">Traducere completă</h4>
                <Button
                  onClick={handleTranslateAll}
                  disabled={isTranslating || progress.remaining === 0}
                  className="w-full"
                  variant={progress.remaining === 0 ? "outline" : "default"}
                >
                  {isTranslating ? (
                    <Loader2 className="w-4 h-4 animate-spin mr-2" />
                  ) : progress.remaining === 0 ? (
                    <CheckCircle className="w-4 h-4 mr-2" />
                  ) : (
                    <Languages className="w-4 h-4 mr-2" />
                  )}
                  {progress.remaining === 0 
                    ? 'Toate întrebările sunt traduse' 
                    : `Traduce toate (${progress.remaining} rămase)`}
                </Button>
              </div>
            </div>
          </div>

          {translationLog.length > 0 && (
            <div className="border-t pt-4">
              <h4 className="font-medium mb-2">Log Traducere</h4>
              <div className="bg-gray-50 rounded-md p-3 max-h-60 overflow-y-auto">
                {translationLog.map((entry, index) => (
                  <div key={index} className="text-sm font-mono mb-1">
                    {entry}
                  </div>
                ))}
              </div>
            </div>
          )}
        </CardContent>
      </Card>
    </div>
  );
};

export default TranslationManager;
