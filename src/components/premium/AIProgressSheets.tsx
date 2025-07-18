
import React, { useState } from 'react';
import { useLanguage } from '@/hooks/useLanguage';
import { useProgressSheets } from '@/hooks/useProgressSheets';
import { useToast } from '@/hooks/use-toast';
import QuestionForm from './progress-sheets/QuestionForm';
import ProgressSheetCard from './progress-sheets/ProgressSheetCard';
import SavedSheetsList from './progress-sheets/SavedSheetsList';
import { Card, CardContent } from '@/components/ui/card';
import { FileText, Lightbulb } from 'lucide-react';

const AIProgressSheets = () => {
  const { t } = useLanguage();
  const { toast } = useToast();
  const { sheets, generateSheet, saveSheet, deleteSheet, isLoading } = useProgressSheets();
  const [currentSheet, setCurrentSheet] = useState(null);

  const handleGenerateSheet = async (question: string) => {
    try {
      const sheet = await generateSheet(question);
      setCurrentSheet(sheet);
      toast({
        title: t('common.success'),
        description: 'Fișa de progres a fost generată cu succes!',
      });
    } catch (error) {
      console.error('Error generating sheet:', error);
      toast({
        title: t('common.error'),
        description: 'Eroare la generarea fișei de progres',
        variant: 'destructive',
      });
    }
  };

  const handleSaveSheet = async () => {
    if (!currentSheet) return;
    
    try {
      await saveSheet(currentSheet.id);
      setCurrentSheet(null);
      toast({
        title: t('common.success'),
        description: 'Fișa de progres a fost salvată!',
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
        description: 'Fișa de progres a fost ștearsă!',
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

  if (isLoading && !currentSheet && sheets.length === 0) {
    return (
      <div className="flex items-center justify-center min-h-[400px]">
        <div className="animate-spin rounded-full h-8 w-8 border-b-2 border-primary"></div>
      </div>
    );
  }

  return (
    <div className="space-y-6">
      <div>
        <h2 className="text-2xl font-bold text-foreground flex items-center gap-3">
          <FileText className="w-8 h-8 text-primary" />
          Fișe de Progres AI
        </h2>
        <p className="text-muted-foreground">
          Pune întrebări despre cariera ta și primește analize AI personalizate cu planuri de acțiune
        </p>
      </div>

      <div className="grid gap-6 lg:grid-cols-2">
        <div className="space-y-6">
          <QuestionForm 
            onGenerateSheet={handleGenerateSheet}
            isLoading={isLoading}
          />

          {/* Example questions */}
          <Card>
            <CardContent className="p-4">
              <div className="flex items-center gap-2 mb-3">
                <Lightbulb className="w-4 h-4 text-yellow-500" />
                <h3 className="font-medium">Întrebări de exemplu:</h3>
              </div>
              <div className="space-y-2 text-sm text-muted-foreground">
                <p>• "Cum mă pot dezvolta pentru un rol de leadership?"</p>
                <p>• "Care sunt următorii pași în cariera mea în IT?"</p>
                <p>• "Cum îmi îmbunătățesc abilitățile de comunicare?"</p>
                <p>• "Ce competențe noi ar trebui să învăț?"</p>
              </div>
            </CardContent>
          </Card>
        </div>

        <div className="space-y-6">
          {currentSheet && (
            <div>
              <h3 className="text-lg font-medium mb-4 flex items-center gap-2">
                <FileText className="w-5 h-5 text-primary" />
                Fișa Ta de Progres
              </h3>
              <ProgressSheetCard 
                sheet={currentSheet} 
                isPreview={true} 
                onSave={handleSaveSheet}
              />
            </div>
          )}

          <div>
            <h3 className="text-lg font-medium mb-4">Fișele Tale Salvate</h3>
            <SavedSheetsList 
              sheets={sheets}
              onDeleteSheet={handleDeleteSheet}
            />
          </div>
        </div>
      </div>
    </div>
  );
};

export default AIProgressSheets;
