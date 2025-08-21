import React, { useState } from 'react';
import { Dialog, DialogContent, DialogHeader, DialogTitle } from '@/components/ui/dialog';
import { Button } from '@/components/ui/button';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Textarea } from '@/components/ui/textarea';
import { Badge } from '@/components/ui/badge';
import { useCareerPlans } from '@/hooks/useCareerPlans';
import { supabase } from '@/integrations/supabase/client';
import { useToast } from '@/components/ui/use-toast';

import { Brain, Plus, Target, Calendar } from 'lucide-react';
import { format } from 'date-fns';
import { ro } from 'date-fns/locale';

interface SaveToCareerPlanModalProps {
  isOpen: boolean;
  onClose: () => void;
  analysisText: string;
  testName?: string;
  testType?: string;
}

const SaveToCareerPlanModal: React.FC<SaveToCareerPlanModalProps> = ({
  isOpen,
  onClose,
  analysisText,
  testName,
  testType
}) => {
  const { toast } = useToast();
  const { careerPlans, isLoading } = useCareerPlans();
  const [selectedPlanId, setSelectedPlanId] = useState<string | null>(null);
  const [customNote, setCustomNote] = useState('');
  const [isSaving, setIsSaving] = useState(false);

  const handleSaveToplan = async () => {
    if (!selectedPlanId) {
      toast({
        title: "Eroare",
        description: "Te rugăm să selectezi un plan de carieră.",
        variant: "destructive",
      });
      return;
    }

    setIsSaving(true);
    try {
      // Get current plan data
      const { data: currentPlan, error: fetchError } = await supabase
        .from('career_paths')
        .select('ai_insights')
        .eq('id', selectedPlanId)
        .single();

      if (fetchError) throw fetchError;

      // Create new insight object
      const newInsight = {
        id: crypto.randomUUID(),
        type: 'ai_analysis',
        title: testName ? `Analiză ${testName}` : 'Analiză AI',
        content: analysisText,
        test_type: testType,
        custom_note: customNote,
        created_at: new Date().toISOString(),
        source: 'test_result'
      };

      // Add new insight to existing insights
      const currentInsights = Array.isArray(currentPlan?.ai_insights) ? currentPlan.ai_insights : [];
      const updatedInsights = [...currentInsights, newInsight];

      // Update the career plan
      const { error: updateError } = await supabase
        .from('career_paths')
        .update({ 
          ai_insights: updatedInsights,
          updated_at: new Date().toISOString()
        })
        .eq('id', selectedPlanId);

      if (updateError) throw updateError;

      toast({
        title: "Succes",
        description: "Analiza a fost salvată în planul de carieră cu succes.",
      });
      
      onClose();
      setSelectedPlanId(null);
      setCustomNote('');
      
    } catch (error) {
      console.error('Error saving to career plan:', error);
      toast({
        title: "Eroare",
        description: "Nu am putut salva analiza în planul de carieră. Te rugăm să încerci din nou.",
        variant: "destructive",
      });
    } finally {
      setIsSaving(false);
    }
  };

  if (isLoading) {
    return (
      <Dialog open={isOpen} onOpenChange={onClose}>
        <DialogContent className="max-w-2xl">
          <div className="flex justify-center p-8">Se încarcă planurile...</div>
        </DialogContent>
      </Dialog>
    );
  }

  return (
    <Dialog open={isOpen} onOpenChange={onClose}>
      <DialogContent className="max-w-2xl max-h-[80vh] overflow-y-auto">
        <DialogHeader>
          <DialogTitle className="flex items-center gap-2">
            <Brain className="h-5 w-5" />
            Salvează analiza în planul de carieră
          </DialogTitle>
        </DialogHeader>
        
        <div className="space-y-6">
          <div className="p-4 bg-muted/50 rounded-lg">
            <h4 className="font-medium mb-2">Analiza care va fi salvată:</h4>
            <p className="text-sm text-muted-foreground line-clamp-3">
              {analysisText.substring(0, 200)}...
            </p>
            {testName && (
              <Badge variant="outline" className="mt-2">
                {testName}
              </Badge>
            )}
          </div>

          <div>
            <h4 className="font-medium mb-3">Selectează planul de carieră:</h4>
            {careerPlans.length === 0 ? (
              <Card className="p-6 text-center">
                <div className="flex flex-col items-center gap-2">
                  <Target className="h-8 w-8 text-muted-foreground" />
                  <h3 className="font-medium">Nu ai încă planuri de carieră</h3>
                  <p className="text-sm text-muted-foreground">
                    Creează primul tău plan pentru a salva această analiză
                  </p>
                  <Button 
                    variant="outline" 
                    className="mt-2"
                    onClick={() => {
                      onClose();
                      // Navigate to create plan page
                      window.location.href = '/career-paths?tab=create-plan';
                    }}
                  >
                    <Plus className="h-4 w-4 mr-2" />
                    Creează plan nou
                  </Button>
                </div>
              </Card>
            ) : (
              <div className="grid gap-3">
                {careerPlans.map((plan) => (
                  <Card 
                    key={plan.id}
                    className={`cursor-pointer transition-colors ${
                      selectedPlanId === plan.id 
                        ? 'ring-2 ring-primary bg-primary/5' 
                        : 'hover:bg-muted/50'
                    }`}
                    onClick={() => setSelectedPlanId(plan.id)}
                  >
                    <CardHeader className="pb-2">
                      <CardTitle className="text-base">{plan.title}</CardTitle>
                    </CardHeader>
                    <CardContent>
                      <p className="text-sm text-muted-foreground line-clamp-2 mb-2">
                        {plan.description}
                      </p>
                      <div className="flex items-center justify-between">
                        <div className="flex items-center gap-2 text-xs text-muted-foreground">
                          <Calendar className="h-3 w-3" />
                          {format(new Date(plan.created_at), 'dd MMM yyyy', { locale: ro })}
                        </div>
                        <Badge variant="secondary">
                          {plan.progress_percentage || 0}% progres
                        </Badge>
                      </div>
                      {Array.isArray((plan as any).ai_insights) && (plan as any).ai_insights.length > 0 && (
                        <div className="flex items-center gap-1 mt-2">
                          <Brain className="h-3 w-3 text-muted-foreground" />
                          <span className="text-xs text-muted-foreground">
                            {(plan as any).ai_insights.length} insight{(plan as any).ai_insights.length !== 1 ? '-uri' : ''} AI
                          </span>
                        </div>
                      )}
                    </CardContent>
                  </Card>
                ))}
              </div>
            )}
          </div>

          {selectedPlanId && (
            <div>
              <label className="text-sm font-medium mb-2 block">
                Notă personală (opțional):
              </label>
              <Textarea
                placeholder="Adaugă o notă personală despre această analiză..."
                value={customNote}
                onChange={(e) => setCustomNote(e.target.value)}
                rows={3}
              />
            </div>
          )}

          <div className="flex gap-3 pt-4">
            <Button 
              onClick={handleSaveToplan} 
              disabled={!selectedPlanId || isSaving || careerPlans.length === 0}
              className="flex-1"
            >
              {isSaving ? 'Se salvează...' : 'Salvează în plan'}
            </Button>
            <Button variant="outline" onClick={onClose} className="flex-1">
              Anulează
            </Button>
          </div>
        </div>
      </DialogContent>
    </Dialog>
  );
};

export default SaveToCareerPlanModal;