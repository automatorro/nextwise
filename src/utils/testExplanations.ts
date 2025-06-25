
function getActualDimensionKey(key: string): string {
  const keyMap: { [key: string]: string } = {
    '0': 'verbal',
    '1': 'numeric', 
    '2': 'logic',
    '3': 'spatial',
    '4': 'abstract'
  };
  
  return keyMap[key] || key;
}

export function getDimensionExplanation(testName: string, dimensionKey: string): {
  description: string;
  interpretations?: {
    high: string;
    low: string;
  };
  yourScore?: {
    high?: string;
    moderate?: string;
    low?: string;
  };
} {
  const testKey = testName.toLowerCase();
  
  if (testKey === 'big five personalitate') {
    switch (dimensionKey) {
      case 'openness':
        return {
          description: 'Deschiderea la experiență reflectă curiozitatea intelectuală, creativitatea și deschiderea către idei noi. Persoanele cu scoruri ridicate sunt imaginative, artistice și aventuroase.',
          interpretations: {
            high: 'Ești o persoană creativă, curioasă și deschisă la experiențe noi.',
            low: 'Preferi stabilitatea și rutina, fiind mai conservator în abordări.'
          }
        };
      case 'conscientiousness':
        return {
          description: 'Conștiinciozitatea indică nivelul de organizare, disciplină și orientare către obiective. Persoanele conștiincioase sunt ordonate, punctuale și perseverente.',
          interpretations: {
            high: 'Ești o persoană organizată, disciplinată și orientată către obiective.',
            low: 'Ești mai spontan și flexibil, dar poți avea provocări cu organizarea.'
          }
        };
      case 'extraversion':
        return {
          description: 'Extraversia măsoară sociabilitatea, energia și tendința de a căuta stimulare din mediul extern. Extraveriții sunt vorbiți, asertivi și energici în interacțiunile sociale.',
          interpretations: {
            high: 'Ești o persoană sociabilă, energică și confortabilă în grupuri.',
            low: 'Preferi interacțiunile mai intime și timpul petrecut singur pentru reîncărcare.'
          }
        };
      case 'agreeableness':
        return {
          description: 'Agreabilitatea reflectă tendința de a fi cooperant, empatic și încrezător în relațiile cu ceilalți. Persoanele agreabile sunt altruiste, înțelegătoare și armonioase.',
          interpretations: {
            high: 'Ești o persoană empatică, cooperantă și orientată către armonie.',
            low: 'Ești mai direct și competitiv, prioritizând obiectivitatea.'
          }
        };
      case 'neuroticism':
        return {
          description: 'Neuroticismul indică instabilitatea emoțională și tendința de a experimenta emoții negative. Scoruri ridicate sugerează anxietate și mood variabil, scoruri scăzute indică stabilitate emoțională.',
          interpretations: {
            high: 'Poți experimenta emoții intense, fiind important să dezvolți strategii de gestionare.',
            low: 'Ai o stabilitate emoțională bună și reziști bine la stres.'
          }
        };
      default:
        return {
          description: 'Această dimensiune contribuie la profilul general de personalitate Big Five.'
        };
    }
  }
  
  if (testKey === 'test aptitudini cognitive') {
    const actualKey = getActualDimensionKey(dimensionKey);
    
    switch (actualKey) {
      case 'verbal':
        return {
          description: 'Raționamentul verbal evaluează capacitatea de a înțelege și manipula informații prezentate în cuvinte. Include înțelegerea vocabularului, analogiilor și relațiilor semantice.',
          interpretations: {
            high: 'Ai abilități verbale excelente, fiind priceput la comunicare și înțelegerea textelor complexe.',
            low: 'Poți dezvolta aceste abilități prin lectură regulată și exerciții de vocabular.'
          }
        };
      case 'numeric':
        return {
          description: 'Raționamentul numeric măsoară capacitatea de a lucra cu numere, concepte matematice și relații cantitative. Include aritmetica, secvențele numerice și problemele matematice.',
          interpretations: {
            high: 'Ai abilități matematice puternice și poți rezolva probleme numerice complexe cu ușurință.',
            low: 'Poți îmbunătăți aceste abilități prin practică regulată și exerciții matematice.'
          }
        };
      case 'logic':
        return {
          description: 'Raționamentul logic evaluează capacitatea de a identifica modele, de a face deducții și de a rezolva probleme folosind reguli logice.',
          interpretations: {
            high: 'Ai abilități logice excelente și poți analiza situații complexe în mod sistematic.',
            low: 'Poți dezvolta gândirea logică prin exerciții de logică și rezolvarea de puzzle-uri.'
          }
        };
      case 'spatial':
        return {
          description: 'Raționamentul spațial măsoară capacitatea de a vizualiza și manipula obiecte în spațiu. Include rotația mentală și percepția formelor.',
          interpretations: {
            high: 'Ai abilități spațiale puternice, fiind priceput la vizualizarea și manipularea obiectelor.',
            low: 'Poți îmbunătăți aceste abilități prin exerciții de vizualizare și jocuri spațiale.'
          }
        };
      case 'abstract':
        return {
          description: 'Raționamentul abstract evaluează capacitatea de a identifica modele complexe și de a gândi conceptual dincolo de informațiile concrete.',
          interpretations: {
            high: 'Ai abilități abstracte excelente și poți identifica patterns și concepte complexe.',
            low: 'Poți dezvolta gândirea abstractă prin exerciții de recunoaștere a tiparelor.'
          }
        };
      default:
        return {
          description: 'Această dimensiune contribuie la evaluarea generală a aptitudinilor cognitive.'
        };
    }
  }
  
  return {
    description: 'Această dimensiune contribuie la profilul general al testului.'
  };
}
