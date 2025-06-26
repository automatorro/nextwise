
export interface DISCExplanation {
  description: string;
  dimensions: {
    D: { name: string; description: string; highTrait: string; lowTrait: string; };
    I: { name: string; description: string; highTrait: string; lowTrait: string; };
    S: { name: string; description: string; highTrait: string; lowTrait: string; };
    C: { name: string; description: string; highTrait: string; lowTrait: string; };
  };
  scoreRanges: Array<{
    range: string;
    label: string;
    variant: 'default' | 'secondary' | 'destructive' | 'outline';
  }>;
  whatItMeans: string;
  combinations?: string;
}

export function getDISCExplanation(language: 'en' | 'ro' = 'ro'): DISCExplanation {
  if (language === 'en') {
    return {
      description: `The DISC test measures four primary behavioral styles that describe how people respond to challenges, influence others, respond to pace of environment, and respond to rules and procedures. Understanding your DISC profile helps improve communication, teamwork, and personal effectiveness.`,
      dimensions: {
        D: {
          name: 'Dominance',
          description: 'How you respond to problems and challenges',
          highTrait: 'Direct, results-oriented, firm, strong-willed, forceful',
          lowTrait: 'Modest, mild, cooperative, calculating, undemanding'
        },
        I: {
          name: 'Influence', 
          description: 'How you influence others to your point of view',
          highTrait: 'Outgoing, enthusiastic, optimistic, high-spirited, lively',
          lowTrait: 'Reflective, factual, calculating, skeptical, logical'
        },
        S: {
          name: 'Steadiness',
          description: 'How you respond to the pace of the environment',
          highTrait: 'Even-tempered, accommodating, patient, humble, tactful',
          lowTrait: 'Eager, flexible, restless, demonstrative, impatient'
        },
        C: {
          name: 'Conscientiousness',
          description: 'How you respond to rules and procedures',
          highTrait: 'Precise, accurate, analytical, conscientious, careful',
          lowTrait: 'Strong-willed, independent, arbitrary, stubborn, opinionated'
        }
      },
      scoreRanges: [
        { range: '0-24%', label: 'Low', variant: 'outline' },
        { range: '25-49%', label: 'Moderate Low', variant: 'secondary' },
        { range: '50-74%', label: 'Moderate High', variant: 'default' },
        { range: '75-100%', label: 'High', variant: 'default' }
      ],
      whatItMeans: 'Your DISC profile shows your preferred behavioral style. Higher scores indicate stronger tendencies in that style. Most people have a combination of styles, with 1-2 being dominant.',
      combinations: 'Common combinations include DI (Driver-Influencer), SC (Supporter-Compliant), DC (Driver-Compliant), and IS (Influencer-Supporter).'
    };
  } else {
    return {
      description: `Testul DISC măsoară patru stiluri comportamentale principale care descriu modul în care oamenii răspund la provocări, influențează pe alții, răspund la ritmul mediului și răspund la reguli și proceduri. Înțelegerea profilului tău DISC ajută la îmbunătățirea comunicării, lucrul în echipă și eficacitatea personală.`,
      dimensions: {
        D: {
          name: 'Dominanță',
          description: 'Cum răspunzi la probleme și provocări',
          highTrait: 'Direct, orientat spre rezultate, ferm, puternic, hotărât',
          lowTrait: 'Modest, blând, cooperant, calculat, nepretențios'
        },
        I: {
          name: 'Influență',
          description: 'Cum influențezi pe alții către punctul tău de vedere',
          highTrait: 'Sociabil, entuziast, optimist, vioi, energic',
          lowTrait: 'Reflexiv, factual, calculat, sceptic, logic'
        },
        S: {
          name: 'Stabilitate',
          description: 'Cum răspunzi la ritmul mediului',
          highTrait: 'Echilibrat, acomodant, răbdător, umil, tactful',
          lowTrait: 'Dornic, flexibil, agitat, demonstrativ, nerăbdător'
        },
        C: {
          name: 'Conformitate',
          description: 'Cum răspunzi la reguli și proceduri',
          highTrait: 'Precis, exact, analitic, conștiincios, atent',
          lowTrait: 'Puternic, independent, arbitrar, încăpățânat, dogmatic'
        }
      },
      scoreRanges: [
        { range: '0-24%', label: 'Scăzut', variant: 'outline' },
        { range: '25-49%', label: 'Moderat Scăzut', variant: 'secondary' },
        { range: '50-74%', label: 'Moderat Ridicat', variant: 'default' },
        { range: '75-100%', label: 'Ridicat', variant: 'default' }
      ],
      whatItMeans: 'Profilul tău DISC arată stilul tău comportamental preferat. Scorurile mai mari indică tendințe mai puternice în acel stil. Majoritatea oamenilor au o combinație de stiluri, cu 1-2 fiind dominante.',
      combinations: 'Combinațiile comune includ DI (Conducător-Influențator), SC (Susținător-Conform), DC (Conducător-Conform) și IS (Influențator-Susținător).'
    };
  }
}
