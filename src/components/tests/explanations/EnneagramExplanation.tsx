
import React from 'react';
import { useTranslation } from 'react-i18next';
import { Badge } from '@/components/ui/badge';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { Progress } from '@/components/ui/progress';

interface EnneagramExplanationProps {
  score: Record<string, number>;
  language: string;
}

const EnneagramExplanation: React.FC<EnneagramExplanationProps> = ({ score, language }) => {
  const { t } = useTranslation();

  // Calculăm tipul dominant
  const dominantType = Object.entries(score).reduce((a, b) => 
    score[a[0]] > score[b[0]] ? a : b
  )[0];

  // Calculăm procentajele pentru toate tipurile
  const totalScore = Object.values(score).reduce((sum, val) => sum + val, 0);
  const percentages = Object.entries(score).map(([type, value]) => ({
    type,
    percentage: totalScore > 0 ? Math.round((value / totalScore) * 100) : 0,
    score: value
  })).sort((a, b) => b.score - a.score);

  const getTypeInfo = (type: string) => {
    const typeMap: Record<string, any> = {
      type1: {
        name: { ro: 'Perfecționistul', en: 'The Perfectionist' },
        core: { ro: 'Dorința de a fi bun, corect și perfect', en: 'The desire to be good, right, and perfect' },
        fear: { ro: 'Să fie greșit, rău sau imperfect', en: 'Being wrong, bad, or imperfect' },
        strengths: { 
          ro: ['Principial', 'Organizat', 'Responsabil', 'Îmbunătățește totul', 'Integru'],
          en: ['Principled', 'Organized', 'Responsible', 'Improves everything', 'Integrity']
        },
        challenges: { 
          ro: ['Critic', 'Rigid', 'Perfecționist', 'Controlant', 'Iritat'],
          en: ['Critical', 'Rigid', 'Perfectionist', 'Controlling', 'Irritated']
        },
        growth: { 
          ro: 'Învață să accepte imperfecțiunea și să fie mai flexibil',
          en: 'Learn to accept imperfection and be more flexible'
        }
      },
      type2: {
        name: { ro: 'Ajutătorul', en: 'The Helper' },
        core: { ro: 'Dorința de a fi iubit și necesar', en: 'The desire to be loved and needed' },
        fear: { ro: 'Să fie neiubit sau nedorit', en: 'Being unloved or unwanted' },
        strengths: { 
          ro: ['Empatic', 'Generos', 'Înțelegător', 'Sprijinitor', 'Intuitiv'],
          en: ['Empathetic', 'Generous', 'Understanding', 'Supportive', 'Intuitive']
        },
        challenges: { 
          ro: ['Dependent', 'Manipulator', 'Posesiv', 'Mărturisitor', 'Resentimentar'],
          en: ['Dependent', 'Manipulative', 'Possessive', 'Martyrdom', 'Resentful']
        },
        growth: { 
          ro: 'Învață să te iubești pe tine și să îți recunoști nevoile',
          en: 'Learn to love yourself and recognize your own needs'
        }
      },
      type3: {
        name: { ro: 'Realizatorul', en: 'The Achiever' },
        core: { ro: 'Dorința de a fi valoros și demn de dragoste', en: 'The desire to be valuable and worthy of love' },
        fear: { ro: 'Să fie fără valoare sau fără identitate', en: 'Being without value or identity' },
        strengths: { 
          ro: ['Ambițios', 'Eficient', 'Adaptabil', 'Motivat', 'Pragmatic'],
          en: ['Ambitious', 'Efficient', 'Adaptable', 'Motivated', 'Pragmatic']
        },
        challenges: { 
          ro: ['Vanitos', 'Mincinos', 'Workaholic', 'Competitiv', 'Superficial'],
          en: ['Vain', 'Deceitful', 'Workaholic', 'Competitive', 'Superficial']
        },
        growth: { 
          ro: 'Învață să fi autentic și să îți valorifici adevărata identitate',
          en: 'Learn to be authentic and value your true identity'
        }
      },
      type4: {
        name: { ro: 'Individualistul', en: 'The Individualist' },
        core: { ro: 'Dorința de a fi special și autentic', en: 'The desire to be special and authentic' },
        fear: { ro: 'Să nu aibă identitate sau să fie insignifiant', en: 'Having no identity or being insignificant' },
        strengths: { 
          ro: ['Creativ', 'Empatic', 'Autentic', 'Artistic', 'Profund'],
          en: ['Creative', 'Empathetic', 'Authentic', 'Artistic', 'Deep']
        },
        challenges: { 
          ro: ['Melancolic', 'Egocentric', 'Dramatic', 'Invidios', 'Instabil'],
          en: ['Melancholic', 'Self-absorbed', 'Dramatic', 'Envious', 'Unstable']
        },
        growth: { 
          ro: 'Învață să te concentrezi pe prezent și să îți apreciezi darurile',
          en: 'Learn to focus on the present and appreciate your gifts'
        }
      },
      type5: {
        name: { ro: 'Investigatorul', en: 'The Investigator' },
        core: { ro: 'Dorința de a fi competent și capabil', en: 'The desire to be competent and capable' },
        fear: { ro: 'Să fie incompetent sau invadat', en: 'Being incompetent or invaded' },
        strengths: { 
          ro: ['Analitic', 'Independent', 'Inventiv', 'Concentrat', 'Observator'],
          en: ['Analytical', 'Independent', 'Inventive', 'Focused', 'Observant']
        },
        challenges: { 
          ro: ['Detașat', 'Izolat', 'Cinic', 'Secretos', 'Antisocial'],
          en: ['Detached', 'Isolated', 'Cynical', 'Secretive', 'Antisocial']
        },
        growth: { 
          ro: 'Învață să te conectezi cu alții și să îți împărtășești cunoștințele',
          en: 'Learn to connect with others and share your knowledge'
        }
      },
      type6: {
        name: { ro: 'Loialistul', en: 'The Loyalist' },
        core: { ro: 'Dorința de a avea securitate și sprijin', en: 'The desire to have security and support' },
        fear: { ro: 'Să fie fără sprijin sau îndrumare', en: 'Being without support or guidance' },
        strengths: { 
          ro: ['Loial', 'Responsabil', 'Angajat', 'Cooperant', 'Prietenos'],
          en: ['Loyal', 'Responsible', 'Committed', 'Cooperative', 'Friendly']
        },
        challenges: { 
          ro: ['Anxios', 'Suspiciuos', 'Pessimist', 'Dependent', 'Indecis'],
          en: ['Anxious', 'Suspicious', 'Pessimistic', 'Dependent', 'Indecisive']
        },
        growth: { 
          ro: 'Învață să îți ai încredere în tine și să fii independent',
          en: 'Learn to trust yourself and be independent'
        }
      },
      type7: {
        name: { ro: 'Entuziastul', en: 'The Enthusiast' },
        core: { ro: 'Dorința de a fi mulțumit și împlinit', en: 'The desire to be satisfied and fulfilled' },
        fear: { ro: 'Să fie prins în durere sau privațiune', en: 'Being trapped in pain or deprivation' },
        strengths: { 
          ro: ['Optimist', 'Aventuros', 'Spontan', 'Versatil', 'Entuziast'],
          en: ['Optimistic', 'Adventurous', 'Spontaneous', 'Versatile', 'Enthusiastic']
        },
        challenges: { 
          ro: ['Impulsiv', 'Superficial', 'Nerabdator', 'Nefocusat', 'Egocentrik'],
          en: ['Impulsive', 'Superficial', 'Impatient', 'Unfocused', 'Self-centered']
        },
        growth: { 
          ro: 'Învață să te concentrezi și să accepti durerea ca parte din viață',
          en: 'Learn to focus and accept pain as part of life'
        }
      },
      type8: {
        name: { ro: 'Contestatarul', en: 'The Challenger' },
        core: { ro: 'Dorința de a fi autonom și în control', en: 'The desire to be autonomous and in control' },
        fear: { ro: 'Să fie controlat sau vulnerabil', en: 'Being controlled or vulnerable' },
        strengths: { 
          ro: ['Puternic', 'Protector', 'Hotărât', 'Confident', 'Lider'],
          en: ['Strong', 'Protective', 'Decisive', 'Confident', 'Leader']
        },
        challenges: { 
          ro: ['Dominat', 'Agresiv', 'Confrontativ', 'Vindicativ', 'Insensibil'],
          en: ['Dominating', 'Aggressive', 'Confrontational', 'Vindictive', 'Insensitive']
        },
        growth: { 
          ro: 'Învață să fii vulnerabil și să îți folosești puterea pentru a proteja',
          en: 'Learn to be vulnerable and use your power to protect others'
        }
      },
      type9: {
        name: { ro: 'Mediatorul', en: 'The Peacemaker' },
        core: { ro: 'Dorința de a avea pace interioară și exterioară', en: 'The desire to have inner and outer peace' },
        fear: { ro: 'Să fie în conflict sau fragmentat', en: 'Being in conflict or fragmented' },
        strengths: { 
          ro: ['Calm', 'Acceptant', 'Empatic', 'Stabilizator', 'Suportiv'],
          en: ['Calm', 'Accepting', 'Empathetic', 'Stabilizing', 'Supportive']
        },
        challenges: { 
          ro: ['Leneș', 'Procrastinator', 'Pasiv-agresiv', 'Înăbuș', 'Obstinant'],
          en: ['Lazy', 'Procrastinating', 'Passive-aggressive', 'Stubborn', 'Obstinate']
        },
        growth: { 
          ro: 'Învață să îți urmezi propriile priorități și să acționezi',
          en: 'Learn to follow your own priorities and take action'
        }
      }
    };

    return typeMap[type] || typeMap.type1;
  };

  const dominantInfo = getTypeInfo(dominantType);

  return (
    <div className="space-y-6">
      {/* Tipul Dominant */}
      <Card className="border-2 border-primary">
        <CardHeader>
          <div className="flex items-center justify-between">
            <CardTitle className="text-2xl">
              {dominantInfo.name[language as 'ro' | 'en']}
            </CardTitle>
            <Badge variant="default" className="text-lg px-4 py-2">
              {t('tests.enneagram.dominantType')}
            </Badge>
          </div>
          <CardDescription className="text-lg">
            {dominantInfo.core[language as 'ro' | 'en']}
          </CardDescription>
        </CardHeader>
        <CardContent className="space-y-4">
          <div className="grid md:grid-cols-2 gap-4">
            <div>
              <h4 className="font-semibold text-green-600 mb-2">
                {t('tests.enneagram.strengths')}
              </h4>
              <ul className="space-y-1">
                {dominantInfo.strengths[language as 'ro' | 'en'].map((strength: string, index: number) => (
                  <li key={index} className="flex items-center space-x-2">
                    <div className="w-2 h-2 bg-green-500 rounded-full"></div>
                    <span>{strength}</span>
                  </li>
                ))}
              </ul>
            </div>
            <div>
              <h4 className="font-semibold text-orange-600 mb-2">
                {t('tests.enneagram.challenges')}
              </h4>
              <ul className="space-y-1">
                {dominantInfo.challenges[language as 'ro' | 'en'].map((challenge: string, index: number) => (
                  <li key={index} className="flex items-center space-x-2">
                    <div className="w-2 h-2 bg-orange-500 rounded-full"></div>
                    <span>{challenge}</span>
                  </li>
                ))}
              </ul>
            </div>
          </div>
          <div className="bg-blue-50 p-4 rounded-lg">
            <h4 className="font-semibold text-blue-600 mb-2">
              {t('tests.enneagram.growthPath')}
            </h4>
            <p className="text-blue-800">
              {dominantInfo.growth[language as 'ro' | 'en']}
            </p>
          </div>
        </CardContent>
      </Card>

      {/* Graficul cu toate tipurile */}
      <Card>
        <CardHeader>
          <CardTitle>{t('tests.enneagram.allTypes')}</CardTitle>
          <CardDescription>
            {t('tests.enneagram.allTypesDescription')}
          </CardDescription>
        </CardHeader>
        <CardContent>
          <div className="space-y-4">
            {percentages.map(({ type, percentage, score }) => {
              const info = getTypeInfo(type);
              return (
                <div key={type} className="space-y-2">
                  <div className="flex justify-between items-center">
                    <span className="font-medium">
                      {info.name[language as 'ro' | 'en']}
                    </span>
                    <span className="text-sm text-gray-600">
                      {score} {t('tests.common.points')} ({percentage}%)
                    </span>
                  </div>
                  <Progress value={percentage} className="h-2" />
                </div>
              );
            })}
          </div>
        </CardContent>
      </Card>

      {/* Interpretarea rezultatelor */}
      <Card>
        <CardHeader>
          <CardTitle>{t('tests.enneagram.interpretation')}</CardTitle>
        </CardHeader>
        <CardContent className="space-y-4">
          <div className="grid md:grid-cols-2 gap-4">
            <div className="bg-red-50 p-4 rounded-lg">
              <h4 className="font-semibold text-red-600 mb-2">
                {t('tests.enneagram.coreFear')}
              </h4>
              <p className="text-red-800">
                {dominantInfo.fear[language as 'ro' | 'en']}
              </p>
            </div>
            <div className="bg-green-50 p-4 rounded-lg">
              <h4 className="font-semibold text-green-600 mb-2">
                {t('tests.enneagram.coreDesire')}
              </h4>
              <p className="text-green-800">
                {dominantInfo.core[language as 'ro' | 'en']}
              </p>
            </div>
          </div>
          
          <div className="bg-purple-50 p-4 rounded-lg">
            <h4 className="font-semibold text-purple-600 mb-2">
              {t('tests.enneagram.developmentTips')}
            </h4>
            <ul className="space-y-2 text-purple-800">
              <li>• {t('tests.enneagram.tip1')}</li>
              <li>• {t('tests.enneagram.tip2')}</li>
              <li>• {t('tests.enneagram.tip3')}</li>
              <li>• {t('tests.enneagram.tip4')}</li>
            </ul>
          </div>
        </CardContent>
      </Card>
    </div>
  );
};

export default EnneagramExplanation;
