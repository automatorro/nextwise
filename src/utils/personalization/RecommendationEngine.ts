import { StandardizedScore } from '@/types/tests';
import { translateKey } from '@/utils/translationUtils';

// Get translations function
const getTranslations = async () => {
  const language = localStorage.getItem('language') || 'ro';
  try {
    const translations = await import(`../../../public/locales/${language}.json`);
    return translations.default;
  } catch (error) {
    const fallback = await import('../../../public/locales/ro.json');
    return fallback.default;
  }
};

export interface ContextualRecommendation {
  type: 'self-help' | 'professional' | 'immediate' | 'lifestyle';
  category: string;
  title: string;
  description: string;
  actionItems?: string[];
}

export async function getContextualRecommendations(
  testName: string, 
  score: StandardizedScore
): Promise<ContextualRecommendation[] | null> {
  const testKey = testName.toLowerCase();
  
  if (testKey.includes('gad') || testKey.includes('anxietate')) {
    return getGADRecommendations(score);
  }
  
  if (testKey.includes('phq') || testKey.includes('depresie')) {
    return getPHQRecommendations(score);
  }
  
  if (testKey.includes('big five') || testKey.includes('personality')) {
    return await getBigFiveRecommendations(score);
  }
  
  if (testKey.includes('cattell') || testKey.includes('16pf')) {
    return getCattellRecommendations(score);
  }
  
  return null;
}

function getGADRecommendations(score: StandardizedScore): ContextualRecommendation[] {
  const rawScore = score.raw_score || 0;
  const recommendations: ContextualRecommendation[] = [];
  
  if (rawScore <= 4) {
    recommendations.push({
      type: 'lifestyle',
      category: 'Menținerea bunăstării',
      title: 'Continuă strategiile care funcționează',
      description: 'Scorul tău indică o gestionare bună a anxietății. Continuă cu obiceiurile sănătoase.',
      actionItems: [
        'Menține o rutină de somn regulată',
        'Practică exerciții fizice regulate',
        'Continuă activitățile care îți aduc bucurie și relaxare'
      ]
    });
  } else if (rawScore <= 9) {
    recommendations.push({
      type: 'self-help',
      category: 'Tehnici de auto-ajutor',
      title: 'Dezvoltă strategii de management',
      description: 'Nivel ușor de anxietate care poate fi gestionat prin tehnici simple.',
      actionItems: [
        'Încearcă exerciții de respirație profundă (4-7-8)',
        'Practică mindfulness 10 minute zilnic',
        'Identifică și evită sau gestionează factorii declanșatori',
        'Menține un jurnal al anxietății pentru a identifica pattern-uri'
      ]
    });
    
    recommendations.push({
      type: 'lifestyle',
      category: 'Schimbări de stil de viață',
      title: 'Optimizează rutina zilnică',
      description: 'Ajustări simple care pot reduce anxietatea.',
      actionItems: [
        'Limitează cafeina și alcoolul',
        'Stabilește o rutină de exerciții (30 min, 3x/săptămână)',
        'Asigură-te că dormi 7-8 ore pe noapte',
        'Conectează-te social cu persoane care te susțin'
      ]
    });
  } else if (rawScore <= 14) {
    recommendations.push({
      type: 'professional',
      category: 'Consultare profesională',
      title: 'Consideră sprijinul specializat',
      description: 'La acest nivel, terapia poate fi foarte benefică pentru dezvoltarea strategiilor de coping.',
      actionItems: [
        'Caută un terapeut specializat în tulburări de anxietate',
        'Explorează terapia cognitiv-comportamentală (CBT)',
        'Discută cu medicul de familie despre opțiuni'
      ]
    });
    
    recommendations.push({
      type: 'self-help',
      category: 'Strategii intensive',
      title: 'Implementează tehnici avansate',
      description: 'Combinații de tehnici pentru management mai eficient.',
      actionItems: [
        'Practică relaxarea musculară progresivă',
        'Încearcă aplicații de meditație ghidată',
        'Dezvoltă un plan de siguranță pentru momentele acute',
        'Învață tehnici de restructurare cognitivă'
      ]
    });
  } else {
    recommendations.push({
      type: 'immediate',
      category: 'Acțiune imediată',
      title: 'Caută ajutor profesional urgent',
      description: 'Acest nivel de anxietate necesită intervenție profesională pentru a preveni impactul negativ.',
      actionItems: [
        'Programează o consultație cu un specialist în sănătate mintală',
        'Consideră consultarea medicului pentru evaluare medicală',
        'Contactează linia de ajutor pentru criză dacă te simți copleșit',
        'Informează o persoană de încredere despre starea ta'
      ]
    });
    
    recommendations.push({
      type: 'professional',
      category: 'Plan de tratament',
      title: 'Dezvoltă un plan comprehensiv',
      description: 'Combinație de intervenții pentru management optim.',
      actionItems: [
        'Evaluare pentru posibilă medicație anxiolitică',
        'Terapie specializată (CBT, EMDR sau alte forme)',
        'Plan de gestionare a crizelor de anxietate',
        'Monitorizare regulată cu profesionistul'
      ]
    });
  }
  
  return recommendations;
}

function getPHQRecommendations(score: StandardizedScore): ContextualRecommendation[] {
  const rawScore = score.raw_score || 0;
  const recommendations: ContextualRecommendation[] = [];
  
  if (rawScore <= 4) {
    recommendations.push({
      type: 'lifestyle',
      category: 'Prevenția',
      title: 'Menține sănătatea mentală',
      description: 'Continuă cu obiceiurile care susțin bunăstarea emoțională.',
      actionItems: [
        'Menține conexiuni sociale semnificative',
        'Practică activități fizice regulate',
        'Dezvoltă hobby-uri și pasiuni personale'
      ]
    });
  } else if (rawScore <= 9) {
    recommendations.push({
      type: 'self-help',
      category: 'Auto-îngrijire',
      title: 'Strategii de auto-ajutor',
      description: 'Tehnici pentru îmbunătățirea dispoziției și energiei.',
      actionItems: [
        'Stabilește o rutină zilnică structurată',
        'Practică activitatea fizică regulat',
        'Menține un jurnal de recunoștință',
        'Conectează-te cu prietenii și familia'
      ]
    });
  } else if (rawScore <= 14) {
    recommendations.push({
      type: 'professional',
      category: 'Intervenție profesională',
      title: 'Consultare cu specialist',
      description: 'Terapia poate fi foarte eficientă pentru simptomele moderate.',
      actionItems: [
        'Caută un psihoterapeut specializat în depresie',
        'Discută cu medicul despre evaluare completă',
        'Explorează opțiuni de terapie cognitiv-comportamentală'
      ]
    });
  } else {
    recommendations.push({
      type: 'immediate',
      category: 'Intervenție urgentă',
      title: 'Caută ajutor imediat',
      description: 'Simptomele severe necesită atenție profesională imediată.',
      actionItems: [
        'Contactează imediat un specialist în sănătate mintală',
        'Dacă ai gânduri de auto-vătămare, apelează linia de urgență',
        'Informează familia sau prietenii despre starea ta',
        'Nu rămâne singur - caută suport imediat'
      ]
    });
  }
  
  return recommendations;
}

async function getBigFiveRecommendations(score: StandardizedScore): Promise<ContextualRecommendation[]> {
  const translations = await getTranslations();
  const t = (key: string) => translateKey(translations, key);
  const recommendations: ContextualRecommendation[] = [];
  
  if (!score.dimensions) {
    return [{
      type: "self-help",
      category: t('recommendations.selfAwareness'),
      title: t('recommendations.bigFive.developSelfAwareness'),
      description: t('recommendations.bigFive.developSelfAwarenessDesc')
    }];
  }

  // Recomandări bazate pe dimensiuni specifice
  score.dimensions.forEach(dimension => {
    if (dimension.id === 'openness') {
      if (dimension.score >= 7) {
        recommendations.push({
          type: "lifestyle",
          category: t('recommendations.creativity'),
          title: t('recommendations.bigFive.channelCreativity'),
          description: t('recommendations.bigFive.channelCreativityDesc'),
          actionItems: [
            t('recommendations.bigFive.channelCreativityActions.0') || "Explorează hobby-uri artistice",
            t('recommendations.bigFive.channelCreativityActions.1') || "Caută experiențe noi", 
            t('recommendations.bigFive.channelCreativityActions.2') || "Participă la evenimente culturale"
          ]
        });
      } else {
        recommendations.push({
          type: "self-help",
          category: t('recommendations.comfort'),
          title: t('recommendations.bigFive.valorizeStability'),
          description: t('recommendations.bigFive.valorizeStabilityDesc'),
          actionItems: t('recommendations.bigFive.valorizeStabilityActions') || [
            "Creează rutine productive", 
            "Specializează-te într-un domeniu", 
            "Construiește sisteme organizate"
          ]
        });
      }
    }
    
    if (dimension.id === 'conscientiousness') {
      if (dimension.score >= 7) {
        recommendations.push({
          type: "professional",
          category: t('recommendations.productivity'),
          title: t('recommendations.bigFive.valorizeProductivity'),
          description: t('recommendations.bigFive.valorizeProductivityDesc'),
          actionItems: t('recommendations.bigFive.valorizeProductivityActions') || [
            "Acceptă roluri de leadership", 
            "Gestionează proiecte complexe", 
            "Creează sisteme de productivitate"
          ]
        });
      } else {
        recommendations.push({
          type: "lifestyle",
          category: t('recommendations.flexibility'),
          title: t('recommendations.bigFive.developFlexibility'),
          description: t('recommendations.bigFive.developFlexibilityDesc'),
          actionItems: t('recommendations.bigFive.developFlexibilityActions') || [
            "Folosește reminder-uri vizuale", 
            "Creează rutine scurte", 
            "Lucrează în echipe organizate"
          ]
        });
      }
    }

    if (dimension.id === 'extraversion') {
      if (dimension.score >= 7) {
        recommendations.push({
          type: "lifestyle",
          category: t('recommendations.socialization'),
          title: t('recommendations.bigFive.energizeThroughInteraction'),
          description: t('recommendations.bigFive.energizeThroughInteractionDesc'),
          actionItems: t('recommendations.bigFive.energizeThroughInteractionActions') || [
            "Participă la evenimente de networking", 
            "Alătură-te grupurilor de interes", 
            "Consideră roluri care implică prezentări"
          ]
        });
      } else {
        recommendations.push({
          type: "self-help",
          category: t('recommendations.introspection'),
          title: t('recommendations.bigFive.valorizeDeepReflection'),
          description: t('recommendations.bigFive.valorizeDeepReflectionDesc'),
          actionItems: t('recommendations.bigFive.valorizeDeepReflectionActions') || [
            "Creează spații de lucru liniștite", 
            "Dezvoltă relații 1-la-1 profunde", 
            "Folosește timpul singur pentru planificare"
          ]
        });
      }
    }
  });

  // Recomandare generală pentru Big Five
  recommendations.push({
    type: "self-help",
    category: t('recommendations.selfAwareness'),
    title: t('recommendations.bigFive.developSelfAwareness'),
    description: t('recommendations.bigFive.developSelfAwarenessDesc'),
    actionItems: t('recommendations.bigFive.developSelfAwarenessActions') || [
      "Ține un jurnal de reflecție", 
      "Observă cum reacționezi în situații diverse", 
      "Discută rezultatele cu persoane apropiate"
    ]
  });

  return recommendations;
}

function getCattellRecommendations(score: StandardizedScore): ContextualRecommendation[] {
  return [{
    type: 'self-help',
    category: 'Analiză de personalitate',
    title: 'Aplică cunoașterea de sine',
    description: 'Folosește profilul 16PF pentru înțelegere mai profundă a personalității.',
    actionItems: [
      'Analizează cum factorii de personalitate influențează comportamentul tău',
      'Identifică domeniile profesionale potrivite',
      'Dezvoltă strategii pentru gestionarea punctelor slabe',
      'Valorifică punctele forte în relații și carieră'
    ]
  }];
}