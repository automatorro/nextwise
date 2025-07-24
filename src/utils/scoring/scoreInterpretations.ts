export const getDimensionExplanation = (testName: string, dimensionKey: string, score: number): string => {
  const normalizedTestName = testName.toLowerCase();
  
  if (normalizedTestName.includes('hexaco')) {
    const dimensionExplanations: Record<string, any> = {
      honesty_humility: {
        description: 'Onestitate-Umilința măsoară sinceritatea, fairplay-ul și modestia în relațiile cu alții.',
        interpretations: {
          high: 'Scoruri ridicate indică o persoană sinceră, modestă și care valorează echitatea în relațiile cu alții.',
          low: 'Scoruri scăzute pot indica o tendință spre autopromovare și competitivitate în obținerea avantajelor.'
        },
        yourScore: {
          high: 'Ești o persoană onestă și modestă care valorează relațiile echitabile cu alții.',
          moderate: 'Ai un echilibru între modestie și încredere în sine, fiind capabil să-ți promovezi interesele când este necesar.',
          low: 'Tinde să fii mai competitiv și să-ți promovezi mai direct realizările și interesele.'
        }
      },
      emotionality: {
        description: 'Emotivitatea măsoară sensibilitatea emoțională, empatia și atașamentul față de alții.',
        interpretations: {
          high: 'Scoruri ridicate indică o sensibilitate emoțională puternică și capacitatea de a forma legături profunde.',
          low: 'Scoruri scăzute pot indica o abordare mai detașată și mai puțin emoțională în relații.'
        },
        yourScore: {
          high: 'Ești foarte sensibil la emoțiile proprii și ale altora, formând legături emoționale profunde.',
          moderate: 'Ai un echilibru între sensibilitatea emoțională și controlul rațional.',
          low: 'Ai o abordare mai detașată și mai puțin afectată de fluctuațiile emoționale.'
        }
      },
      extraversion: {
        description: 'Extraversiunea măsoară sociabilitatea, încrederea socială și tendința spre energie pozitivă.',
        interpretations: {
          high: 'Scoruri ridicate indică o persoană foarte sociabilă care se simte energizată în compania altora.',
          low: 'Scoruri scăzute pot indica o preferință pentru activități mai liniștite și grupuri mai mici.'
        },
        yourScore: {
          high: 'Ești foarte sociabil și te simți energizat în grupuri mari și situații sociale.',
          moderate: 'Ai un echilibru între socialitate și momentele de solitudine, adaptându-te la diferite situații.',
          low: 'Preferi interacțiunile mai intime și ai nevoie de timp pentru a te reîncărca singur.'
        }
      },
      agreeableness: {
        description: 'Agreabilitatea măsoară cooperarea, răbdarea și tendința de a evita conflictele.',
        interpretations: {
          high: 'Scoruri ridicate indică o persoană foarte cooperantă care valorează armonia în relații.',
          low: 'Scoruri scăzute pot indica o abordare mai directă și mai puțin îngăduitoare în conflicte.'
        },
        yourScore: {
          high: 'Ești foarte cooperant și cauți să menții armonia în relațiile cu alții.',
          moderate: 'Știi când să fii cooperant și când să fii mai ferm, adaptându-te la situație.',
          low: 'Ai o abordare mai directă și ești dispus să confrontezi problemele când este necesar.'
        }
      },
      conscientiousness: {
        description: 'Conștiinciozitatea măsoară organizarea, disciplina și perseverența în atingerea obiectivelor.',
        interpretations: {
          high: 'Scoruri ridicate indică o persoană foarte organizată cu standarde înalte de performanță.',
          low: 'Scoruri scăzute pot indica o preferință pentru flexibilitate și spontaneitate.'
        },
        yourScore: {
          high: 'Ești foarte organizat și disciplinat, cu standarde înalte pentru tot ceea ce faci.',
          moderate: 'Ai un echilibru între structură și flexibilitate în abordarea sarcinilor.',
          low: 'Preferi să improvizezi și să te adaptezi decât să urmezi planuri rigide.'
        }
      },
      openness: {
        description: 'Deschiderea măsoară creativitatea, curiozitatea intelectuală și deschiderea către experiențe noi.',
        interpretations: {
          high: 'Scoruri ridicate indică o persoană foarte creativă și deschisă la experiențe noi.',
          low: 'Scoruri scăzute pot indica o preferință pentru familiar și tradițional.'
        },
        yourScore: {
          high: 'Ești foarte creativ și curios, apreciind noutatea și experiențele diverse.',
          moderate: 'Ai un echilibru între aprecierea noutății și confortul familiarului.',
          low: 'Preferi experiențele familiare și abordările tradiționale, fiind mai conservator.'
        }
      }
    };

    const explanation = dimensionExplanations[dimensionKey];
    if (explanation) {
      let interpretation = '';
      if (score >= 70) {
        interpretation = explanation.yourScore.high || explanation.interpretations.high;
      } else if (score >= 40) {
        interpretation = explanation.yourScore.moderate || 'Ai un nivel moderat pentru această dimensiune.';
      } else {
        interpretation = explanation.yourScore.low || explanation.interpretations.low;
      }
      
      return `${explanation.description} ${interpretation}`;
    }
  }
  
  return getGenericDimensionExplanation(dimensionKey, score);
};
