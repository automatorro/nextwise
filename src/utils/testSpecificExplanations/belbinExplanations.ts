
export interface BelbinExplanation {
  description: string;
  roles: {
    [key: string]: {
      name: string;
      category: string;
      description: string;
      strengths: string;
      weaknesses: string;
    };
  };
  categories: {
    action: { name: string; description: string; };
    people: { name: string; description: string; };
    thinking: { name: string; description: string; };
  };
  whatItMeans: string;
  primaryVsSecondary: string;
}

export function getBelbinExplanation(language: 'en' | 'ro' = 'ro'): BelbinExplanation {
  if (language === 'en') {
    return {
      description: `The Belbin Team Roles test identifies your preferred roles within a team environment. Dr. Meredith Belbin identified nine distinct team roles that contribute to team success. Each person typically has 2-3 preferred roles (primary and secondary) and should avoid 1-2 roles that don't suit their natural style.`,
      roles: {
        'plant': {
          name: 'Plant',
          category: 'thinking',
          description: 'Creative problem-solver who generates original ideas',
          strengths: 'Creative, imaginative, free-thinking, generates ideas and solves difficult problems',
          weaknesses: 'Might ignore incidentals, too preoccupied to communicate effectively'
        },
        'resource-investigator': {
          name: 'Resource Investigator', 
          category: 'people',
          description: 'Outgoing networker who explores opportunities and develops contacts',
          strengths: 'Outgoing, enthusiastic, communicative, explores opportunities and develops contacts',
          weaknesses: 'Might be over-optimistic, can lose interest once the initial enthusiasm has passed'
        },
        'coordinator': {
          name: 'Coordinator',
          category: 'people', 
          description: 'Mature leader who clarifies goals and delegates effectively',
          strengths: 'Mature, confident, identifies talent, clarifies goals, delegates effectively',
          weaknesses: 'Can be seen as manipulative, might offload their own share of the work'
        },
        'shaper': {
          name: 'Shaper',
          category: 'action',
          description: 'Dynamic leader who overcomes obstacles and drives for results',
          strengths: 'Challenging, dynamic, thrives on pressure, drive and courage to overcome obstacles',
          weaknesses: 'Can be prone to provocation, might sometimes offend people\'s feelings'
        },
        'monitor-evaluator': {
          name: 'Monitor Evaluator',
          category: 'thinking',
          description: 'Strategic thinker who provides objective analysis',
          strengths: 'Sober, strategic and discerning, sees all options and judges accurately',
          weaknesses: 'Sometimes lacks the drive and ability to inspire others, can be overly critical'
        },
        'teamworker': {
          name: 'Teamworker',
          category: 'people',
          description: 'Cooperative team player who maintains harmony',
          strengths: 'Cooperative, perceptive and diplomatic, listens and averts friction',
          weaknesses: 'Can be indecisive in crunch situations, tends to avoid confrontation'
        },
        'implementer': {
          name: 'Implementer',
          category: 'action',
          description: 'Practical organizer who turns ideas into actions',
          strengths: 'Practical, reliable, efficient, turns ideas into actions and organizes work',
          weaknesses: 'Can be somewhat inflexible, slow to respond to new possibilities'
        },
        'completer-finisher': {
          name: 'Completer Finisher',
          category: 'action',
          description: 'Detail-oriented perfectionist who ensures thorough completion',
          strengths: 'Painstaking, conscientious, anxious, searches out errors, polishes and perfects',
          weaknesses: 'Can be inclined to worry unduly, reluctant to delegate, can be a nitpicker'
        },
        'specialist': {
          name: 'Specialist',
          category: 'thinking',
          description: 'Expert who provides specialized knowledge and skills',
          strengths: 'Single-minded, self-starting, dedicated, provides specialist knowledge and skills',
          weaknesses: 'Can only contribute on a narrow front, tends to dwell on technicalities'
        }
      },
      categories: {
        action: {
          name: 'Action-Oriented Roles',
          description: 'Focus on moving forward and getting things done'
        },
        people: {
          name: 'People-Oriented Roles', 
          description: 'Focus on team dynamics and communication'
        },
        thinking: {
          name: 'Thinking-Oriented Roles',
          description: 'Focus on analysis, creativity and strategic thinking'
        }
      },
      whatItMeans: 'Your team role preferences indicate how you naturally contribute to team success. Primary roles are your strongest contributions, while secondary roles support your effectiveness.',
      primaryVsSecondary: 'Primary roles (highest scores) are your natural strengths and preferred contributions. Secondary roles complement your primary style. Roles with low scores may indicate areas to avoid or delegate to others.'
    };
  } else {
    return {
      description: `Testul Rolurilor Belbin identifică rolurile tale preferate într-un mediu de echipă. Dr. Meredith Belbin a identificat nouă roluri distincte în echipă care contribuie la succesul echipei. Fiecare persoană are de obicei 2-3 roluri preferate (primare și secundare) și ar trebui să evite 1-2 roluri care nu se potrivesc stilului lor natural.`,
      roles: {
        'plant': {
          name: 'Idealist',
          category: 'thinking',
          description: 'Soluționator creativ care generează idei originale',
          strengths: 'Creativ, imaginativ, gânditor liber, generează idei și rezolvă probleme dificile',
          weaknesses: 'Poate ignora detaliile, prea preocupat pentru a comunica eficient'
        },
        'resource-investigator': {
          name: 'Investigator de Resurse',
          category: 'people', 
          description: 'Networking activ care explorează oportunități și dezvoltă contacte',
          strengths: 'Sociabil, entuziast, comunicativ, explorează oportunități și dezvoltă contacte',
          weaknesses: 'Poate fi prea optimist, poate pierde interesul după ce entuziasmul inițial a trecut'
        },
        'coordinator': {
          name: 'Coordonator',
          category: 'people',
          description: 'Lider matur care clarifică obiectivele și delege eficient',
          strengths: 'Matur, încrezător, identifică talentul, clarifică obiectivele, delege eficient',
          weaknesses: 'Poate fi văzut ca manipulator, ar putea delega propria parte din muncă'
        },
        'shaper': {
          name: 'Formator',
          category: 'action',
          description: 'Lider dinamic care depășește obstacolele și conduce spre rezultate',
          strengths: 'Provocator, dinamic, prosperă sub presiune, curaj și determinare să depășească obstacolele',
          weaknesses: 'Poate fi predispus la provocare, uneori poate răni sentimentele oamenilor'
        },
        'monitor-evaluator': {
          name: 'Monitor Evaluator',
          category: 'thinking',
          description: 'Gânditor strategic care oferă analiză obiectivă',
          strengths: 'Sobru, strategic și perspicace, vede toate opțiunile și judecă cu acuratețe',
          weaknesses: 'Uneori îi lipsește dorința și abilitatea de a inspira pe alții, poate fi prea critic'
        },
        'teamworker': {
          name: 'Echipier',
          category: 'people',
          description: 'Jucător cooperant în echipă care menține armonia',
          strengths: 'Cooperant, perspicace și diplomat, ascultă și evită fricțiunile',
          weaknesses: 'Poate fi indecis în situații critice, tinde să evite confruntarea'
        },
        'implementer': {
          name: 'Implementator',
          category: 'action',
          description: 'Organizator practic care transformă ideile în acțiuni',
          strengths: 'Practic, de încredere, eficient, transformă ideile în acțiuni și organizează munca',
          weaknesses: 'Poate fi oarecum inflexibil, lent să răspundă la noi posibilități'
        },
        'completer-finisher': {
          name: 'Finalizator',
          category: 'action',
          description: 'Perfecționist orientat pe detalii care asigură finalizarea completă',
          strengths: 'Minuțios, conștiincios, anxios, caută erori, lustrează și perfecționează',
          weaknesses: 'Poate fi înclinat să se îngrijoreze excesiv, reticent să delege, poate fi prea critic'
        },
        'specialist': {
          name: 'Specialist',
          category: 'thinking',
          description: 'Expert care oferă cunoștințe și abilități specializate',
          strengths: 'Concentrat, auto-motivat, dedicat, oferă cunoștințe și abilități specializate',
          weaknesses: 'Poate contribui doar pe un front îngust, tinde să se concentreze pe tehnicități'
        }
      },
      categories: {
        action: {
          name: 'Roluri Orientate pe Acțiune',
          description: 'Se concentrează pe progres și realizarea lucrurilor'
        },
        people: {
          name: 'Roluri Orientate pe Oameni',
          description: 'Se concentrează pe dinamica echipei și comunicare'
        },
        thinking: {
          name: 'Roluri Orientate pe Gândire', 
          description: 'Se concentrează pe analiză, creativitate și gândire strategică'
        }
      },
      whatItMeans: 'Preferințele tale pentru rolurile în echipă indică modul în care contribui natural la succesul echipei. Rolurile primare sunt cele mai puternice contribuții ale tale, în timp ce rolurile secundare susțin eficacitatea ta.',
      primaryVsSecondary: 'Rolurile primare (scorurile cele mai mari) sunt punctele tale forte naturale și contribuțiile preferate. Rolurile secundare completează stilul tău primar. Rolurile cu scoruri scăzute pot indica zone de evitat sau de delegat altora.'
    };
  }
}
