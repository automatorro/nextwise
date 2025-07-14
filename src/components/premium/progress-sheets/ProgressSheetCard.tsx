import React from 'react';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Target, Brain, Lightbulb, ArrowRight, Save, Trash2 } from 'lucide-react';
import { useLanguage } from '@/hooks/useLanguage';

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

interface ProgressSheetCardProps {
  sheet: ProgressSheet;
  isPreview?: boolean;
  onSave?: () => void;
  onDelete?: (sheetId: string) => void;
}

const ProgressSheetCard: React.FC<ProgressSheetCardProps> = ({ 
  sheet, 
  isPreview = false, 
  onSave, 
  onDelete 
}) => {
  const { t } = useLanguage();

  return (
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
            <Button onClick={onSave} size="sm">
              <Save className="w-4 h-4 mr-2" />
              {t('premiumFeatures.progressSheets.saveSheet')}
            </Button>
          ) : (
            <Button 
              onClick={() => onDelete?.(sheet.id)} 
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
};

export default ProgressSheetCard;