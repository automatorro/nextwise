import React, { useState } from 'react';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Badge } from '@/components/ui/badge';
import { Collapsible, CollapsibleContent, CollapsibleTrigger } from '@/components/ui/collapsible';
import { Brain, Calendar, ChevronDown, ChevronUp, FileText, ExternalLink, Trash2 } from 'lucide-react';
import { format } from 'date-fns';
import { ro } from 'date-fns/locale';


interface AIInsight {
  id: string;
  type: string;
  title: string;
  content: string;
  test_type?: string;
  custom_note?: string;
  created_at: string;
  source: string;
}

interface AIInsightsSectionProps {
  insights: AIInsight[];
  onRemoveInsight?: (insightId: string) => void;
}

const AIInsightsSection: React.FC<AIInsightsSectionProps> = ({ 
  insights, 
  onRemoveInsight 
}) => {
  const [expandedInsights, setExpandedInsights] = useState<Set<string>>(new Set());

  const toggleInsight = (insightId: string) => {
    const newExpanded = new Set(expandedInsights);
    if (newExpanded.has(insightId)) {
      newExpanded.delete(insightId);
    } else {
      newExpanded.add(insightId);
    }
    setExpandedInsights(newExpanded);
  };

  if (!insights || insights.length === 0) {
    return null;
  }

  return (
    <Card>
      <CardHeader>
        <CardTitle className="flex items-center gap-2">
          <Brain className="h-5 w-5" />
          Insight-uri AI ({insights.length})
        </CardTitle>
        <p className="text-sm text-muted-foreground">
          Analizele AI salvate în acest plan de carieră
        </p>
      </CardHeader>
      <CardContent className="space-y-4">
        {insights.map((insight) => (
          <Collapsible key={insight.id}>
            <div className="border rounded-lg">
              <CollapsibleTrigger 
                className="w-full"
                onClick={() => toggleInsight(insight.id)}
              >
                <div className="flex items-center justify-between p-4 hover:bg-muted/50 transition-colors">
                  <div className="flex items-center gap-3 text-left">
                    <Brain className="h-4 w-4 text-primary" />
                    <div>
                      <h4 className="font-medium">{insight.title}</h4>
                      <div className="flex items-center gap-2 mt-1">
                        <div className="flex items-center gap-1 text-xs text-muted-foreground">
                          <Calendar className="h-3 w-3" />
                          {format(new Date(insight.created_at), 'dd MMM yyyy', { locale: ro })}
                        </div>
                        {insight.test_type && (
                          <Badge variant="outline" className="text-xs">
                            {insight.test_type}
                          </Badge>
                        )}
                      </div>
                    </div>
                  </div>
                  <div className="flex items-center gap-2">
                    {onRemoveInsight && (
                      <Button
                        variant="ghost"
                        size="sm"
                        onClick={(e) => {
                          e.stopPropagation();
                          onRemoveInsight(insight.id);
                        }}
                        className="text-destructive hover:text-destructive"
                      >
                        <Trash2 className="h-4 w-4" />
                      </Button>
                    )}
                    {expandedInsights.has(insight.id) ? (
                      <ChevronUp className="h-4 w-4" />
                    ) : (
                      <ChevronDown className="h-4 w-4" />
                    )}
                  </div>
                </div>
              </CollapsibleTrigger>
              
              <CollapsibleContent>
                <div className="px-4 pb-4 border-t bg-muted/20">
                  <div className="pt-4 space-y-3">
                    <div className="prose prose-sm max-w-none">
                      <div className="text-sm whitespace-pre-wrap">
                        {insight.content}
                      </div>
                    </div>
                    
                    {insight.custom_note && (
                      <div className="border-l-4 border-primary/30 pl-4 bg-primary/5 rounded-r-lg py-2">
                        <h5 className="text-sm font-medium mb-1">Nota personală:</h5>
                        <p className="text-sm text-muted-foreground">
                          {insight.custom_note}
                        </p>
                      </div>
                    )}
                    
                    <div className="flex items-center justify-between pt-2">
                      <Badge variant="secondary" className="text-xs">
                        {insight.source === 'test_result' ? 'Din rezultat test' : 'Adăugat manual'}
                      </Badge>
                      
                      <Button
                        variant="outline"
                        size="sm"
                        onClick={() => {
                          navigator.clipboard.writeText(insight.content);
                        }}
                      >
                        <FileText className="h-3 w-3 mr-1" />
                        Copiază
                      </Button>
                    </div>
                  </div>
                </div>
              </CollapsibleContent>
            </div>
          </Collapsible>
        ))}
      </CardContent>
    </Card>
  );
};

export default AIInsightsSection;