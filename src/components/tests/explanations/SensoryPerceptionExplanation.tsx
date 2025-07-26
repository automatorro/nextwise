
import React from 'react';
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Eye, Ear, Brain, Focus } from 'lucide-react';

interface SensoryPerceptionExplanationProps {
  score: {
    overall: number;
    dimensions?: {
      discriminare_vizuala: number;
      procesare_auditiva: number;
      integrare_multimodala: number;
      atentie_perceptuala: number;
    };
    dominant_ability?: string;
    professional_applications?: string[];
  };
  language?: string;
}

export const SensoryPerceptionExplanation: React.FC<SensoryPerceptionExplanationProps> = ({ 
  score, 
  language = 'ro' 
}) => {
  const getDimensionIcon = (dimension: string) => {
    const icons = {
      discriminare_vizuala: Eye,
      procesare_auditiva: Ear,
      integrare_multimodala: Brain,
      atentie_perceptuala: Focus
    };
    return icons[dimension as keyof typeof icons] || Brain;
  };

  const getDimensionLabel = (dimension: string) => {
    const labels: Record<string, string> = {
      discriminare_vizuala: language === 'en' ? 'Visual Discrimination' : 'Discriminare Vizuală',
      procesare_auditiva: language === 'en' ? 'Auditory Processing' : 'Procesare Auditivă',
      integrare_multimodala: language === 'en' ? 'Multimodal Integration' : 'Integrare Multimodală',
      atentie_perceptuala: language === 'en' ? 'Perceptual Attention' : 'Atenție Perceptuală'
    };
    return labels[dimension] || dimension;
  };

  const getDimensionDescription = (dimension: string) => {
    const descriptions: Record<string, string> = {
      discriminare_vizuala: language === 'en' 
        ? 'Ability to distinguish visual details, colors, and patterns with precision'
        : 'Abilitatea de a distinge detalii vizuale, culori și pattern-uri cu precizie',
      procesare_auditiva: language === 'en'
        ? 'Capacity to interpret sounds, voices, and auditory information accurately'
        : 'Capacitatea de a interpreta sunete, voci și informații auditive cu acuratețe',
      integrare_multimodala: language === 'en'
        ? 'Skill in combining information from multiple senses for comprehensive understanding'
        : 'Abilitatea de a combina informații de la multiple simțuri pentru înțelegere comprehensivă',
      atentie_perceptuala: language === 'en'
        ? 'Focus and attention control for sustained perceptual tasks'
        : 'Control al focalizării și atenției pentru sarcini perceptuale susținute'
    };
    return descriptions[dimension] || '';
  };

  const getScoreLevel = (score: number) => {
    if (score >= 86) return { label: language === 'en' ? 'Exceptional' : 'Excepțional', variant: 'default' as const };
    if (score >= 66) return { label: language === 'en' ? 'High' : 'Ridicat', variant: 'default' as const };
    if (score >= 46) return { label: language === 'en' ? 'Moderate' : 'Moderat', variant: 'secondary' as const };
    return { label: language === 'en' ? 'Developing' : 'În dezvoltare', variant: 'outline' as const };
  };

  return (
    <Card className="mb-6">
      <CardHeader>
        <CardTitle>
          {language === 'en' ? 'About the Sensory Perception Test' : 'Despre Testul de Percepție Senzorială'}
        </CardTitle>
      </CardHeader>
      <CardContent className="space-y-6">
        <div>
          <p className="text-sm text-gray-600 mb-4">
            {language === 'en' 
              ? 'The Sensory Perception Test evaluates your ability to process, integrate, and respond to sensory information from your environment. It measures four key dimensions crucial for professional performance in fields requiring high perceptual acuity.'
              : 'Testul de Percepție Senzorială evaluează capacitatea ta de a procesa, integra și răspunde la informațiile senzoriale din mediul înconjurător. Măsoară patru dimensiuni cheie cruciale pentru performanța profesională în domenii care necesită acuitate perceptuală ridicată.'
            }
          </p>
        </div>

        {score.dimensions && (
          <div>
            <h4 className="font-semibold mb-3">
              {language === 'en' ? 'Your Sensory Dimensions' : 'Dimensiunile Tale Senzoriale'}
            </h4>
            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
              {Object.entries(score.dimensions).map(([key, value]) => {
                const IconComponent = getDimensionIcon(key);
                const level = getScoreLevel(value);
                
                return (
                  <div key={key} className="border rounded-lg p-4">
                    <div className="flex items-center justify-between mb-2">
                      <div className="flex items-center gap-2">
                        <IconComponent className="w-4 h-4 text-blue-600" />
                        <span className="font-medium text-sm">{getDimensionLabel(key)}</span>
                      </div>
                      <Badge variant={level.variant} className="text-xs">
                        {level.label} ({Math.round(value)}%)
                      </Badge>
                    </div>
                    <p className="text-xs text-gray-600">
                      {getDimensionDescription(key)}
                    </p>
                  </div>
                );
              })}
            </div>
          </div>
        )}

        {score.professional_applications && score.professional_applications.length > 0 && (
          <div>
            <h4 className="font-semibold mb-3">
              {language === 'en' ? 'Professional Applications' : 'Aplicații Profesionale'}
            </h4>
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-2">
              {score.professional_applications.map((application, index) => (
                <div key={index} className="flex items-center gap-2 text-sm text-gray-700">
                  <div className="w-2 h-2 bg-blue-500 rounded-full flex-shrink-0"></div>
                  {application}
                </div>
              ))}
            </div>
          </div>
        )}

        <div className="bg-blue-50 rounded-lg p-4">
          <h4 className="font-semibold text-blue-800 mb-2">
            {language === 'en' ? 'Why Sensory Perception Matters' : 'De Ce Contează Percepția Senzorială'}
          </h4>
          <p className="text-sm text-blue-700">
            {language === 'en'
              ? 'Strong sensory perception abilities are essential for careers in healthcare, design, safety, transportation, and research. They enable you to notice critical details, maintain situational awareness, and respond effectively to complex environments.'
              : 'Abilitățile puternice de percepție senzorială sunt esențiale pentru carierele în sănătate, design, siguranță, transport și cercetare. Ele îți permit să observi detalii critice, să menții conștientizarea situațională și să răspunzi eficient la mediile complexe.'
            }
          </p>
        </div>
      </CardContent>
    </Card>
  );
};

export default SensoryPerceptionExplanation;
