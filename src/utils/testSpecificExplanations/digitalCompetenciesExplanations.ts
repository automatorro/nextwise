
import { DimensionExplanation } from '@/utils/types';

export const digitalCompetenciesExplanations = {
  alfabetizare_digitala: {
    description: 'Alfabetizarea digitală reprezintă capacitatea de a găsi, evalua, utiliza și gestiona informațiile în mediul digital.',
    interpretations: {
      high: 'Poți identifica rapid sursele credibile, evalua critic informațiile și organiza eficient datele digitale.',
      low: 'Ai nevoie să dezvolți competențele de căutare avansată și evaluarea critică a surselor online.'
    },
    yourScore: {
      high: 'Excelezi în gestionarea informațiilor digitale și ai competențe avansate de analiză a datelor.',
      moderate: 'Ai competențe funcționale în căutarea și organizarea informațiilor digitale.',
      low: 'Recomandăm să te concentrezi pe dezvoltarea competențelor de bază în alfabetizarea digitală.'
    }
  } as DimensionExplanation,

  comunicare_digitala: {
    description: 'Comunicarea digitală include competențele de interacțiune, colaborare și partajare în mediul online.',
    interpretations: {
      high: 'Comunici eficient pe multiple platforme digitale și facilitezi colaborări productive în echipe virtuale.',
      low: 'Ai nevoie să dezvolți competențele de comunicare online și să te familiarizezi cu instrumentele de colaborare.'
    },
    yourScore: {
      high: 'Ești foarte competent în comunicarea digitală și colaborarea online.',
      moderate: 'Ai competențe solide de comunicare digitală cu potențial de îmbunătățire.',
      low: 'Recomandăm să practici comunicarea pe diverse platforme digitale.'
    }
  } as DimensionExplanation,

  creare_continut: {
    description: 'Crearea conținutului digital implică competențele de dezvoltare, editare și publicare a materialelor multimedia.',
    interpretations: {
      high: 'Poți crea conținut digital profesional, respectând drepturile de autor și adaptându-l pentru diferite platforme.',
      low: 'Ai nevoie să dezvolți competențele de bază în crearea și editarea conținutului digital.'
    },
    yourScore: {
      high: 'Excelezi în crearea conținutului digital creative și profesional.',
      moderate: 'Ai competențe funcționale în crearea conținutului cu potențial de dezvoltare.',
      low: 'Recomandăm să înveți să folosești instrumente de bază pentru crearea conținutului digital.'
    }
  } as DimensionExplanation,

  siguranta_digitala: {
    description: 'Siguranța digitală cuprinde competențele de protejare a datelor, dispozitivelor și identității online.',
    interpretations: {
      high: 'Implementezi măsuri comprehensive de securitate și înțelegi riscurile digitale complexe.',
      low: 'Ai nevoie să dezvolți competențele fundamentale de securitate digitală și protecție a datelor.'
    },
    yourScore: {
      high: 'Ai competențe avansate în securitatea digitală și protecția datelor.',
      moderate: 'Ai o înțelegere solidă a securității digitale cu potențial de îmbunătățire.',
      low: 'Este urgent să dezvolți competențele de bază în securitatea digitală.'
    }
  } as DimensionExplanation,

  rezolvare_probleme: {
    description: 'Rezolvarea problemelor digitale include capacitatea de a identifica soluții tehnologice și de a se adapta la noile instrumente.',
    interpretations: {
      high: 'Identifici rapid soluții digitale inovatoare și te adaptezi cu ușurință la noile tehnologii.',
      low: 'Ai nevoie să dezvolți competențele de rezolvare a problemelor digitale și adaptarea la schimbări.'
    },
    yourScore: {
      high: 'Excelezi în identificarea soluțiilor digitale și adaptarea la noile tehnologii.',
      moderate: 'Ai competențe funcționale în rezolvarea problemelor digitale.',
      low: 'Recomandăm să practici rezolvarea problemelor și să explorezi noile tehnologii.'
    }
  } as DimensionExplanation
};

export const getDigitalCompetenciesRecommendations = (dimensions: Record<string, number>) => {
  const recommendations: string[] = [];
  
  if (dimensions.alfabetizare_digitala < 60) {
    recommendations.push('Practică tehnicile de căutare avansată și învață să evaluezi credibilitatea surselor online.');
  }
  
  if (dimensions.comunicare_digitala < 60) {
    recommendations.push('Explorează platformele de colaborare online și practică comunicarea în echipe virtuale.');
  }
  
  if (dimensions.creare_continut < 60) {
    recommendations.push('Învață să folosești instrumente de creare conținut precum Canva, Adobe Creative Suite sau alternative gratuite.');
  }
  
  if (dimensions.siguranta_digitala < 60) {
    recommendations.push('Studiază principiile de securitate cibernetică și implementează autentificarea în doi pași.');
  }
  
  if (dimensions.rezolvare_probleme < 60) {
    recommendations.push('Practică rezolvarea problemelor digitale și explorează noile tehnologii din domeniul tău.');
  }
  
  return recommendations;
};
