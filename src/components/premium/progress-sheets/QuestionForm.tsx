import React, { useState } from 'react';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Plus } from 'lucide-react';
import { useLanguage } from '@/hooks/useLanguage';

interface QuestionFormProps {
  onGenerateSheet: (question: string) => Promise<void>;
  isLoading: boolean;
}

const QuestionForm: React.FC<QuestionFormProps> = ({ onGenerateSheet, isLoading }) => {
  const { t } = useLanguage();
  const [question, setQuestion] = useState('');

  const handleSubmit = async () => {
    if (!question.trim()) return;
    
    await onGenerateSheet(question);
    setQuestion('');
  };

  return (
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
          onKeyDown={(e) => {
            if (e.key === 'Enter' && !e.shiftKey) {
              e.preventDefault();
              handleSubmit();
            }
          }}
        />
        <Button 
          onClick={handleSubmit}
          disabled={!question.trim() || isLoading}
          className="w-full"
        >
          {isLoading ? t('premiumFeatures.progressSheets.generating') : t('premiumFeatures.progressSheets.generateSheet')}
        </Button>
      </CardContent>
    </Card>
  );
};

export default QuestionForm;