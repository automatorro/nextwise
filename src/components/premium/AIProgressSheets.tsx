import React, { useState } from 'react';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Badge } from '@/components/ui/badge';
import { useLanguage } from '@/hooks/useLanguage';
import { useProgressSheets } from '@/hooks/useProgressSheets';
import { Target, Brain, Lightbulb, ArrowRight, Save, Trash2, Plus } from 'lucide-react';
import { useToast } from '@/components/ui/use-toast';

const AIProgressSheets = () => {
  const { t } = useLanguage();
  const { toast } = useToast();
  const { sheets, generateSheet, saveSheet, deleteSheet, isLoading } = useProgressSheets();
  const [question, setQuestion] = useState('');
  const [currentSheet, setCurrentSheet] = useState(null);

  const handleGenerateSheet = async () => {
    if (!question.trim()) return;
    
    try {
      const sheet = await generateSheet(question);
      setCurrentSheet(sheet);
      setQuestion('');
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

  const ProgressSheetCard = ({ sheet, isPreview = false }) => (
    <Card className="w-full">
      <CardHeader>
        <div className="flex items-start justify-between">
          <div>
            <CardTitle className="text-lg">{sheet.user_question}</CardTitle>
            <p className="text-sm text-muted-foreground">
              {new Date(sheet.created_at).toLocaleDateString()}
            </p>
          </div>
          {isPreview ? (
            <Button onClick={handleSaveSheet} size="sm">
              <Save className="w-4 h-4 mr-2" />
              {t('premiumFeatures.progressSheets.saveSheet')}
            </Button>
          ) : (
            <Button 
              onClick={() => handleDeleteSheet(sheet.id)} 
              variant="outline" 
              size="sm"
            >
              <Trash2 className="w-4 h-4" />
            </Button>
          )}
        </div>
      </CardHeader>
      <CardContent className="space-y-6">
        <div>
          <div className="flex items-center gap-2 mb-3">
            <Target className="w-5 h-5 text-blue-500" />
            <h4 className="font-medium">{t('premiumFeatures.progressSheets.objective')}</h4>
          </div>
          <p className="text-sm text-muted-foreground pl-7">{sheet.extracted_objective}</p>
        </div>

        <div>
          <div className="flex items-center gap-2 mb-3">
            <Brain className="w-5 h-5 text-purple-500" />
            <h4 className="font-medium">{t('premiumFeatures.progressSheets.analysis')}</h4>
          </div>
          <p className="text-sm text-muted-foreground pl-7">{sheet.ai_analysis}</p>
        </div>

        <div>
          <div className="flex items-center gap-2 mb-3">
            <Lightbulb className="w-5 h-5 text-yellow-500" />
            <h4 className="font-medium">{t('premiumFeatures.progressSheets.recommendations')}</h4>
          </div>
          <div className="pl-7 space-y-2">
            {sheet.recommendations.map((rec, index) => (
              <div key={index} className="p-3 bg-muted rounded-lg">
                <h5 className="font-medium text-sm">{rec.title}</h5>
                <p className="text-xs text-muted-foreground">{rec.description}</p>
                {rec.link && (
                  <a 
                    href={rec.link} 
                    target="_blank" 
                    rel="noopener noreferrer"
                    className="text-xs text-primary hover:underline"
                  >
                    {rec.link}
                  </a>
                )}
              </div>
            ))}
          </div>
        </div>

        <div>
          <div className="flex items-center gap-2 mb-3">
            <ArrowRight className="w-5 h-5 text-green-500" />
            <h4 className="font-medium">{t('premiumFeatures.progressSheets.nextSteps')}</h4>
          </div>
          <div className="pl-7 space-y-2">
            {sheet.next_steps.map((step, index) => (
              <div key={index} className="flex items-center gap-2">
                <div className="w-6 h-6 rounded-full bg-primary text-primary-foreground text-xs flex items-center justify-center">
                  {index + 1}
                </div>
                <p className="text-sm">{step}</p>
              </div>
            ))}
          </div>
        </div>
      </CardContent>
    </Card>
  );

  return (
    <div className="space-y-6">
      <div>
        <h2 className="text-2xl font-bold text-foreground">{t('premiumFeatures.progressSheets.title')}</h2>
        <p className="text-muted-foreground">{t('premiumFeatures.progressSheets.subtitle')}</p>
      </div>

      <Card>
        <CardHeader>
          <CardTitle className="flex items-center gap-2">
            <Plus className="w-5 h-5" />
            {t('premiumFeatures.progressSheets.askQuestion')}
          </CardTitle>
        </CardHeader>
        <CardContent className="space-y-4">
          <Input
            value={question}
            onChange={(e) => setQuestion(e.target.value)}
            placeholder={t('premiumFeatures.progressSheets.questionPlaceholder')}
            className="w-full"
          />
          <Button 
            onClick={handleGenerateSheet}
            disabled={!question.trim() || isLoading}
            className="w-full"
          >
            {isLoading ? t('premiumFeatures.progressSheets.generating') : t('premiumFeatures.progressSheets.generateSheet')}
          </Button>
        </CardContent>
      </Card>

      {currentSheet && (
        <div>
          <h3 className="text-lg font-medium mb-4">Generated Sheet</h3>
          <ProgressSheetCard sheet={currentSheet} isPreview={true} />
        </div>
      )}

      <div>
        <h3 className="text-lg font-medium mb-4">{t('premiumFeatures.progressSheets.mySheets')}</h3>
        {sheets.length === 0 ? (
          <Card>
            <CardContent className="py-8 text-center">
              <p className="text-muted-foreground">{t('premiumFeatures.progressSheets.noSheets')}</p>
            </CardContent>
          </Card>
        ) : (
          <div className="grid gap-4">
            {sheets.map((sheet) => (
              <ProgressSheetCard key={sheet.id} sheet={sheet} />
            ))}
          </div>
        )}
      </div>
    </div>
  );
};

export default AIProgressSheets;