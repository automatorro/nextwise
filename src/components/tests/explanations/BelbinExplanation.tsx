
import React from 'react';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { getBelbinExplanation } from '@/utils/testSpecificExplanations/belbinExplanations';
import { useLanguage } from '@/hooks/useLanguage';

interface BelbinExplanationProps {
  score?: any;
  language?: string;
}

const BelbinExplanation: React.FC<BelbinExplanationProps> = ({ score, language }) => {
  const { language: currentLanguage } = useLanguage();
  const lang = language || currentLanguage;
  const explanation = getBelbinExplanation(lang as 'en' | 'ro');

  return (
    <div className="space-y-6">
      {/* Overview */}
      <Card>
        <CardHeader>
          <CardTitle>Ce înseamnă Testul Belbin?</CardTitle>
        </CardHeader>
        <CardContent>
          <p className="text-muted-foreground">{explanation.description}</p>
        </CardContent>
      </Card>

      {/* Categories */}
      <Card>
        <CardHeader>
          <CardTitle>Categoriile de Roluri</CardTitle>
        </CardHeader>
        <CardContent className="space-y-4">
          <div className="grid md:grid-cols-3 gap-4">
            <div className="space-y-2">
              <h4 className="font-semibold text-primary">{explanation.categories.action.name}</h4>
              <p className="text-sm text-muted-foreground">{explanation.categories.action.description}</p>
            </div>
            <div className="space-y-2">
              <h4 className="font-semibold text-primary">{explanation.categories.people.name}</h4>
              <p className="text-sm text-muted-foreground">{explanation.categories.people.description}</p>
            </div>
            <div className="space-y-2">
              <h4 className="font-semibold text-primary">{explanation.categories.thinking.name}</h4>
              <p className="text-sm text-muted-foreground">{explanation.categories.thinking.description}</p>
            </div>
          </div>
        </CardContent>
      </Card>

      {/* All Roles */}
      <Card>
        <CardHeader>
          <CardTitle>Toate Rolurile Belbin</CardTitle>
        </CardHeader>
        <CardContent className="space-y-4">
          {Object.entries(explanation.roles).map(([key, role]) => (
            <div key={key} className="border-l-4 border-primary/20 pl-4 space-y-2">
              <div className="flex items-center gap-2">
                <h4 className="font-semibold">{role.name}</h4>
                <span className="text-xs bg-muted px-2 py-1 rounded">{role.category}</span>
              </div>
              <p className="text-sm text-muted-foreground">{role.description}</p>
              <div className="grid md:grid-cols-2 gap-4 text-sm">
                <div>
                  <span className="font-medium text-green-600">Puncte forte: </span>
                  <span className="text-muted-foreground">{role.strengths}</span>
                </div>
                <div>
                  <span className="font-medium text-orange-600">Slăbiciuni: </span>
                  <span className="text-muted-foreground">{role.weaknesses}</span>
                </div>
              </div>
            </div>
          ))}
        </CardContent>
      </Card>

      {/* Interpretation Guide */}
      <Card>
        <CardHeader>
          <CardTitle>Cum să interpretezi rezultatele</CardTitle>
        </CardHeader>
        <CardContent className="space-y-4">
          <div>
            <h4 className="font-semibold mb-2">Ce înseamnă rezultatele?</h4>
            <p className="text-muted-foreground">{explanation.whatItMeans}</p>
          </div>
          <div>
            <h4 className="font-semibold mb-2">Roluri Primare vs. Secundare</h4>
            <p className="text-muted-foreground">{explanation.primaryVsSecondary}</p>
          </div>
        </CardContent>
      </Card>
    </div>
  );
};

export default BelbinExplanation;
