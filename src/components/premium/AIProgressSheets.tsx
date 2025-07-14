import React, { useState } from 'react';
import { useLanguage } from '@/hooks/useLanguage';
import { useProgressSheets } from '@/hooks/useProgressSheets';
import { useToast } from '@/hooks/use-toast';
import QuestionForm from './progress-sheets/QuestionForm';
import ProgressSheetCard from './progress-sheets/ProgressSheetCard';
import SavedSheetsList from './progress-sheets/SavedSheetsList';

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
        description: t('premiumFeatures.progressSheets.generateSheet'),
      });
    } catch (error) {
      toast({
        title: t('common.error'),
        description: t('premiumFeatures.progressSheets.error'),
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
        description: t('premiumFeatures.progressSheets.saveSheet'),
      });
    } catch (error) {
      toast({
        title: t('common.error'),
        description: 'Error saving sheet',
        variant: 'destructive',
      });
    }
  };

  const handleDeleteSheet = async (sheetId: string) => {
    try {
      await deleteSheet(sheetId);
      toast({
        title: t('common.success'),
        description: t('premiumFeatures.progressSheets.deleteSheet'),
      });
    } catch (error) {
      toast({
        title: t('common.error'),
        description: 'Error deleting sheet',
        variant: 'destructive',
      });
    }
  };

  return (
    <div className="space-y-6">
      <div>
        <h2 className="text-2xl font-bold text-foreground">{t('premiumFeatures.progressSheets.title')}</h2>
        <p className="text-muted-foreground">{t('premiumFeatures.progressSheets.subtitle')}</p>
      </div>

      <QuestionForm 
        onGenerateSheet={handleGenerateSheet}
        isLoading={isLoading}
      />

      {currentSheet && (
        <div>
          <h3 className="text-lg font-medium mb-4">Generated Sheet</h3>
          <ProgressSheetCard 
            sheet={currentSheet} 
            isPreview={true} 
            onSave={handleSaveSheet}
          />
        </div>
      )}

      <div>
        <h3 className="text-lg font-medium mb-4">{t('premiumFeatures.progressSheets.mySheets')}</h3>
        <SavedSheetsList 
          sheets={sheets}
          onDeleteSheet={handleDeleteSheet}
        />
      </div>
    </div>
  );
};

export default AIProgressSheets;