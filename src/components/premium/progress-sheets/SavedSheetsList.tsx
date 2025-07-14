import React from 'react';
import { Card, CardContent } from '@/components/ui/card';
import { useLanguage } from '@/hooks/useLanguage';
import ProgressSheetCard from './ProgressSheetCard';

interface ProgressSheet {
  id: string;
  user_question: string;
  created_at: string;
  extracted_objective: string;
  ai_analysis: string;
  recommendations: Array<{
    title: string;
    description: string;
    link?: string;
  }>;
  next_steps: string[];
}

interface SavedSheetsListProps {
  sheets: ProgressSheet[];
  onDeleteSheet: (sheetId: string) => Promise<void>;
}

const SavedSheetsList: React.FC<SavedSheetsListProps> = ({ sheets, onDeleteSheet }) => {
  const { t } = useLanguage();

  if (sheets.length === 0) {
    return (
      <Card>
        <CardContent className="py-8 text-center">
          <p className="text-muted-foreground">{t('premiumFeatures.progressSheets.noSheets')}</p>
        </CardContent>
      </Card>
    );
  }

  return (
    <div className="grid gap-4">
      {sheets.map((sheet) => (
        <ProgressSheetCard 
          key={sheet.id} 
          sheet={sheet} 
          onDelete={onDeleteSheet}
        />
      ))}
    </div>
  );
};

export default SavedSheetsList;