
export interface ClinicalTestExplanation {
  description: string;
  clinicalRanges: Array<{
    range: string;
    label: string;
    variant: 'default' | 'secondary' | 'destructive' | 'outline';
    clinicalSignificance: string;
  }>;
  whatItMeans: string;
  limitations: string;
  recommendations: string;
}

export function getClinicalTestExplanation(testName: string, language: 'en' | 'ro' = 'ro'): ClinicalTestExplanation {
  const testKey = testName.toLowerCase();
  
  if (testKey.includes('gad-7') || testKey.includes('anxietate')) {
    return language === 'en' ? {
      description: `GAD-7 (Generalized Anxiety Disorder scale) is a validated clinical screening tool for anxiety disorders. It measures anxiety symptoms over the past two weeks using 7 questions, with scores ranging from 0-21. This tool is widely used in clinical practice for initial screening.`,
      clinicalRanges: [
        { 
          range: '0-4 (0-19%)', 
          label: 'Minimal anxiety', 
          variant: 'default',
          clinicalSignificance: 'Normal range - no significant anxiety symptoms'
        },
        { 
          range: '5-9 (20-43%)', 
          label: 'Mild anxiety', 
          variant: 'secondary',
          clinicalSignificance: 'Mild symptoms - monitor and consider self-help strategies'
        },
        { 
          range: '10-14 (44-67%)', 
          label: 'Moderate anxiety', 
          variant: 'outline',
          clinicalSignificance: 'Moderate symptoms - consider professional consultation'
        },
        { 
          range: '15-21 (68-100%)', 
          label: 'Severe anxiety', 
          variant: 'destructive',
          clinicalSignificance: 'Severe symptoms - professional evaluation recommended'
        }
      ],
      whatItMeans: 'Your score indicates the severity of anxiety symptoms you may be experiencing. This is a screening tool, not a diagnostic instrument.',
      limitations: 'This test is for screening purposes only and cannot diagnose anxiety disorders. A proper diagnosis requires professional clinical evaluation.',
      recommendations: 'Scores of 10 or above suggest that speaking with a healthcare professional could be beneficial for proper assessment and potential treatment options.'
    } : {
      description: `GAD-7 (Scala Tulburării de Anxietate Generalizată) este un instrument clinic validat pentru screening-ul tulburărilor de anxietate. Măsoară simptomele de anxietate din ultimele două săptămâni folosind 7 întrebări, cu scoruri de la 0-21. Acest instrument este folosit pe scară largă în practica clinică pentru screening-ul inițial.`,
      clinicalRanges: [
        { 
          range: '0-4 (0-19%)', 
          label: 'Anxietate minimă', 
          variant: 'default',
          clinicalSignificance: 'Interval normal - fără simptome semnificative de anxietate'
        },
        { 
          range: '5-9 (20-43%)', 
          label: 'Anxietate ușoară', 
          variant: 'secondary',
          clinicalSignificance: 'Simptome ușoare - monitorizare și strategii de auto-ajutor'
        },
        { 
          range: '10-14 (44-67%)', 
          label: 'Anxietate moderată', 
          variant: 'outline',
          clinicalSignificance: 'Simptome moderate - consultare profesională recomandată'
        },
        { 
          range: '15-21 (68-100%)', 
          label: 'Anxietate severă', 
          variant: 'destructive',
          clinicalSignificance: 'Simptome severe - evaluare profesională necesară'
        }
      ],
      whatItMeans: 'Scorul tău indică severitatea simptomelor de anxietate pe care le poți experimenta. Acesta este un instrument de screening, nu de diagnostic.',
      limitations: 'Acest test este doar pentru screening și nu poate diagnostica tulburări de anxietate. Un diagnostic adecvat necesită evaluare clinică profesională.',
      recommendations: 'Scorurile de 10 sau mai mult sugerează că discutarea cu un profesionist din sănătate ar putea fi benefică pentru evaluare adecvată și opțiuni potențiale de tratament.'
    };
  }
  
  if (testKey.includes('phq-9') || testKey.includes('depresie')) {
    return language === 'en' ? {
      description: `PHQ-9 (Patient Health Questionnaire-9) is a widely used clinical tool for screening and monitoring depression. It assesses depressive symptoms over the past two weeks using 9 criteria that correspond to the diagnostic criteria for major depressive disorder.`,
      clinicalRanges: [
        { 
          range: '0-4 (0-20%)', 
          label: 'Minimal depression', 
          variant: 'default',
          clinicalSignificance: 'No significant depressive symptoms'
        },
        { 
          range: '5-9 (21-45%)', 
          label: 'Mild depression', 
          variant: 'secondary',
          clinicalSignificance: 'Mild symptoms - watchful waiting, repeat in 2 weeks'
        },
        { 
          range: '10-14 (46-70%)', 
          label: 'Moderate depression', 
          variant: 'outline',
          clinicalSignificance: 'Moderate symptoms - treatment plan consideration'
        },
        { 
          range: '15-27 (71-100%)', 
          label: 'Severe depression', 
          variant: 'destructive',
          clinicalSignificance: 'Severe symptoms - active treatment recommended'
        }
      ],
      whatItMeans: 'Your score reflects the severity of depressive symptoms. This screening tool helps identify the need for further professional evaluation.',
      limitations: 'This is a screening questionnaire, not a diagnostic tool. Clinical judgment and additional assessment are needed for proper diagnosis.',
      recommendations: 'Scores of 10 or higher suggest that professional consultation would be beneficial for proper assessment and treatment planning.'
    } : {
      description: `PHQ-9 (Chestionarul de Sănătate al Pacientului-9) este un instrument clinic folosit pe scară largă pentru screening-ul și monitorizarea depresiei. Evaluează simptomele depresive din ultimele două săptămâni folosind 9 criterii care corespund criteriilor diagnostice pentru tulburarea depresivă majoră.`,
      clinicalRanges: [
        { 
          range: '0-4 (0-20%)', 
          label: 'Depresie minimă', 
          variant: 'default',
          clinicalSignificance: 'Fără simptome depresive semnificative'
        },
        { 
          range: '5-9 (21-45%)', 
          label: 'Depresie ușoară', 
          variant: 'secondary',
          clinicalSignificance: 'Simptome ușoare - monitorizare, repetare în 2 săptămâni'
        },
        { 
          range: '10-14 (46-70%)', 
          label: 'Depresie moderată', 
          variant: 'outline',
          clinicalSignificance: 'Simptome moderate - luarea în considerare a unui plan de tratament'
        },
        { 
          range: '15-27 (71-100%)', 
          label: 'Depresie severă', 
          variant: 'destructive',
          clinicalSignificance: 'Simptome severe - tratament activ recomandat'
        }
      ],
      whatItMeans: 'Scorul tău reflectă severitatea simptomelor depresive. Acest instrument de screening ajută la identificarea necesității pentru evaluare profesională suplimentară.',
      limitations: 'Acesta este un chestionar de screening, nu un instrument de diagnostic. Judecata clinică și evaluarea suplimentară sunt necesare pentru diagnosticul adecvat.',
      recommendations: 'Scorurile de 10 sau mai mult sugerează că consultarea profesională ar fi benefică pentru evaluare adecvată și planificarea tratamentului.'
    };
  }
  
  // Default for other clinical tests
  return language === 'en' ? {
    description: `This is a validated clinical screening instrument designed to assess specific psychological symptoms or conditions. The results should be interpreted within a clinical context.`,
    clinicalRanges: [
      { 
        range: '0-25%', 
        label: 'Minimal', 
        variant: 'default',
        clinicalSignificance: 'Within normal range'
      },
      { 
        range: '26-50%', 
        label: 'Mild', 
        variant: 'secondary',
        clinicalSignificance: 'Mild symptoms present'
      },
      { 
        range: '51-75%', 
        label: 'Moderate', 
        variant: 'outline',
        clinicalSignificance: 'Moderate symptoms - consideration for intervention'
      },
      { 
        range: '76-100%', 
        label: 'Severe', 
        variant: 'destructive',
        clinicalSignificance: 'Significant symptoms - professional evaluation recommended'
      }
    ],
    whatItMeans: 'This clinical screening tool provides an indication of symptom severity in the assessed area.',
    limitations: 'This is a screening tool only and cannot provide a clinical diagnosis. Professional evaluation is needed for proper assessment.',
    recommendations: 'Higher scores may indicate the need for professional consultation and further clinical evaluation.'
  } : {
    description: `Acesta este un instrument clinic validat de screening conceput pentru a evalua simptome sau condiții psihologice specifice. Rezultatele trebuie interpretate într-un context clinic.`,
    clinicalRanges: [
      { 
        range: '0-25%', 
        label: 'Minimal', 
        variant: 'default',
        clinicalSignificance: 'În intervalul normal'
      },
      { 
        range: '26-50%', 
        label: 'Ușor', 
        variant: 'secondary',
        clinicalSignificance: 'Simptome ușoare prezente'
      },
      { 
        range: '51-75%', 
        label: 'Moderat', 
        variant: 'outline',
        clinicalSignificance: 'Simptome moderate - luarea în considerare a intervenției'
      },
      { 
        range: '76-100%', 
        label: 'Sever', 
        variant: 'destructive',
        clinicalSignificance: 'Simptome semnificative - evaluare profesională recomandată'
      }
    ],
    whatItMeans: 'Acest instrument clinic de screening oferă o indicație asupra severității simptomelor în zona evaluată.',
    limitations: 'Acesta este doar un instrument de screening și nu poate oferi un diagnostic clinic. Evaluarea profesională este necesară pentru evaluare adecvată.',
    recommendations: 'Scorurile mai mari pot indica necesitatea consultării profesionale și evaluării clinice suplimentare.'
  };
}
