
import React, { useState } from 'react';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Textarea } from '@/components/ui/textarea';
import { useLanguage } from '@/hooks/useLanguage';
import { useProgressSheets } from '@/hooks/useProgressSheets';
import { FileText, Plus, Save, Trash2, ArrowLeft, Target, Lightbulb, ListChecks } from 'lucide-react';
import { useToast } from '@/components/ui/use-toast';

const AIProgressSheets = () => {
  const { t } = useLanguage();
  const { toast } = useToast();
  const { sheets, generateSheet, saveSheet, deleteSheet, isLoading } = useProgressSheets();
  const [question, setQuestion] = useState('');
  const [currentSheet, setCurrentSheet] = useState<any>(null);
  const [showSheetsList, setShowSheetsList] = useState(true);

  const handleGenerateSheet = async () => {
    if (!question.trim()) return;
    
    try {
      const sheet = await generateSheet(question);
      setCurrentSheet(sheet);
      setShowSheetsList(false);
      setQuestion('');
      
      toast({
        title: t('common.success'),
        description: 'Fișa de progres a fost generată!',
      });
    } catch (error) {
      console.error('Error generating sheet:', error);
      toast({
        title: t('common.error'),
        description: 'Eroare la generarea fișei',
        variant: 'destructive',
      });
    }
  };

  const handleSaveSheet = async () => {
    if (!currentSheet) return;
    
    try {
      await saveSheet(currentSheet.id);
      toast({
        title: t('common.success'),
        description: 'Fișa a fost salvată!',
      });
    } catch (error) {
      console.error('Error saving sheet:', error);
      toast({
        title: t('common.error'),
        description: 'Eroare la salvarea fișei',
        variant: 'destructive',
      });
    }
  };

  const handleDeleteSheet = async (sheetId: string) => {
    try {
      await deleteSheet(sheetId);
      toast({
        title: t('common.success'),
        description: 'Fișa a fost ștearsă!',
      });
    } catch (error) {
      console.error('Error deleting sheet:', error);
      toast({
        title: t('common.error'),
        description: 'Eroare la ștergerea fișei',
        variant: 'destructive',
      });
    }
  };

  const handleBackToSheets = () => {
    setShowSheetsList(true);
    setCurrentSheet(null);
  };

  if (currentSheet && !showSheetsList) {
    return (
      <div className="space-y-6">
        <div className="flex items-center justify-between">
          <Button
            variant="ghost"
            size="sm"
            onClick={handleBackToSheets}
            className="flex items-center gap-2"
          >
            <ArrowLeft className="w-4 h-4" />
            {t('careerJourney.premiumFeatures.progressSheets.backToSheets')}
          </Button>
          <Button
            onClick={handleSaveSheet}
            disabled={isLoading}
            className="flex items-center gap-2"
          >
            <Save className="w-4 h-4" />
            Salvează Fișa
          </Button>
        </div>

        <div>
          <h2 className="text-2xl font-bold text-foreground">Fișa de Progres AI</h2>
          <p className="text-muted-foreground">Analiză personalizată pentru obiectivul tău</p>
        </div>

        <div className="grid gap-6">
          <Card>
            <CardHeader>
              <CardTitle className="flex items-center gap-2">
                <Target className="w-5 h-5 text-blue-500" />
                Obiectivul Tău
              </CardTitle>
            </CardHeader>
            <CardContent>
              <div className="p-4 bg-blue-50 rounded-lg border border-blue-200">
                <p className="text-blue-900 font-medium">{currentSheet.extracted_objective}</p>
              </div>
            </CardContent>
          </Card>

          <Card>
            <CardHeader>
              <CardTitle className="flex items-center gap-2">
                <Lightbulb className="w-5 h-5 text-orange-500" />
                Analiza AI
              </CardTitle>
            </CardHeader>
            <CardContent>
              <div className="p-4 bg-orange-50 rounded-lg border border-orange-200">
                <p className="text-orange-900 leading-relaxed">{currentSheet.ai_analysis}</p>
              </div>
            </CardContent>
          </Card>

          <Card>
            <CardHeader>
              <CardTitle className="flex items-center gap-2">
                <ListChecks className="w-5 h-5 text-green-500" />
                Recomandări și Pași Următori
              </CardTitle>
            </CardHeader>
            <CardContent className="space-y-4">
              {currentSheet.recommendations && currentSheet.recommendations.length > 0 && (
                <div className="p-4 bg-green-50 rounded-lg border border-green-200">
                  <h4 className="font-medium text-green-900 mb-3">Recomandări:</h4>
                  <ul className="space-y-2">
                    {currentSheet.recommendations.map((rec: string, index: number) => (
                      <li key={index} className="flex items-start gap-2 text-green-800">
                        <span className="text-green-600 mt-1">•</span>
                        <span>{rec}</span>
                      </li>
                    ))}
                  </ul>
                </div>
              )}
              
              {currentSheet.next_steps && currentSheet.next_steps.length > 0 && (
                <div className="p-4 bg-purple-50 rounded-lg border border-purple-200">
                  <h4 className="font-medium text-purple-900 mb-3">Următorii Pași:</h4>
                  <ol className="space-y-2">
                    {currentSheet.next_steps.map((step: string, index: number) => (
                      <li key={index} className="flex items-start gap-2 text-purple-800">
                        <span className="bg-purple-200 text-purple-900 rounded-full w-6 h-6 flex items-center justify-center text-sm font-medium flex-shrink-0 mt-0.5">
                          {index + 1}
                        </span>
                        <span>{step}</span>
                      </li>
                    ))}
                  </ol>
                </div>
              )}
            </CardContent>
          </Card>
        </div>
      </div>
    );
  }

  return (
    <div className="space-y-6">
      <div>
        <h2 className="text-2xl font-bold text-foreground">Fișe de Progres AI</h2>
        <p className="text-muted-foreground">
          Creează fișe de progres personalizate cu analiză AI pentru obiectivele tale de carieră
        </p>
      </div>

      <Card>
        <CardHeader>
          <CardTitle className="flex items-center gap-2">
            <Plus className="w-5 h-5" />
            Generează Fișă Nouă
          </CardTitle>
        </CardHeader>
        <CardContent className="space-y-4">
          <div>
            <label className="text-sm font-medium mb-2 block">
              Descrie obiectivul sau provocarea ta:
            </label>
            <Textarea
              value={question}
              onChange={(e) => setQuestion(e.target.value)}
              placeholder="Ex: Vreau să devin manager în următoarele 6 luni, dar nu știu ce pași să urmez..."
              className="min-h-[100px]"
            />
          </div>
          <Button 
            onClick={handleGenerateSheet}
            disabled={!question.trim() || isLoading}
            className="w-full"
          >
            {isLoading ? 'Se generează...' : 'Generează Fișa de Progres'}
          </Button>
        </CardContent>
      </Card>

      <Card>
        <CardHeader>
          <CardTitle className="flex items-center gap-2">
            <FileText className="w-5 h-5" />
            Fișele Mele Salvate ({sheets.length})
          </CardTitle>
        </CardHeader>
        <CardContent>
          {sheets.length === 0 ? (
            <div className="text-center py-8">
              <FileText className="w-12 h-12 mx-auto text-muted-foreground mb-4" />
              <p className="text-muted-foreground">Nu ai fișe de progres salvate încă.</p>
              <p className="text-sm text-muted-foreground mt-2">
                Generează prima ta fișă de progres folosind formularul de mai sus.
              </p>
            </div>
          ) : (
            <div className="space-y-4">
              {sheets.map((sheet) => (
                <div
                  key={sheet.id}
                  className="p-4 border rounded-lg hover:bg-muted/50 transition-colors"
                >
                  <div className="flex items-start justify-between">
                    <div className="flex-1">
                      <h3 className="font-medium mb-2">{sheet.extracted_objective}</h3>
                      <p className="text-sm text-muted-foreground mb-2">
                        {sheet.user_question}
                      </p>
                      <p className="text-xs text-muted-foreground">
                        Creată pe: {new Date(sheet.created_at).toLocaleDateString('ro-RO')}
                      </p>
                    </div>
                    <div className="flex items-center gap-2 ml-4">
                      <Button
                        variant="outline"
                        size="sm"
                        onClick={() => {
                          setCurrentSheet(sheet);
                          setShowSheetsList(false);
                        }}
                      >
                        Vezi
                      </Button>
                      <Button
                        variant="outline"
                        size="sm"
                        onClick={() => handleDeleteSheet(sheet.id)}
                        className="text-red-600 hover:text-red-700"
                      >
                        <Trash2 className="w-4 h-4" />
                      </Button>
                    </div>
                  </div>
                </div>
              ))}
            </div>
          )}
        </CardContent>
      </Card>
    </div>
  );
};

export default AIProgressSheets;
