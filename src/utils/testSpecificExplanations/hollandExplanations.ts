
export const getHollandDimensionExplanation = (dimensionKey: string, score: number): string => {
  const level = score >= 70 ? 'high' : score >= 40 ? 'moderate' : 'low';
  
  const explanations: Record<string, Record<string, string>> = {
    realistic: {
      high: 'Ai o preferință puternică pentru activități practice și concrete. Te atrag joburile care implică lucrul cu mâinile, folosirea uneltelor și crearea de obiecte tangibile. Mediile de lucru în aer liber și activitățile fizice îți oferă satisfacție.',
      moderate: 'Ai un interes moderat pentru activitățile practice. Poți aprecia atât lucrul manual, cât și alte tipuri de sarcini, în funcție de context și circumstanțe.',
      low: 'Nu ești foarte atras de activitățile fizice sau practice. Preferi să lucrezi cu idei, concepte sau în interacțiune cu oamenii decât cu obiecte sau unelte.'
    },
    investigative: {
      high: 'Ești foarte atras de activitățile intelectuale și analitice. Îți place să cercetezi, să analizezi probleme complexe și să descoperi adevăruri prin investigație sistematică. Științele și tehnologia îți oferă satisfacție intelectuală.',
      moderate: 'Ai un interes moderat pentru cercetare și analiză. Poți aprecia atât gândirea teoretică, cât și aplicațiile practice, în funcție de subiect și context.',
      low: 'Nu ești foarte orientat spre activitățile de cercetare sau analiză teoretică. Preferi activitățile mai practice, sociale sau creative decât investigația pură.'
    },
    artistic: {
      high: 'Ai o creativitate puternică și îți place să îți exprimi originalitatea prin diverse forme de artă. Valorile estetice sunt importante pentru tine, iar mediile de lucru libere și nestructurate îți permit să înflorești.',
      moderate: 'Ai o doză sănătoasă de creativitate care poate fi exprimată în diferite contexte. Poți aprecia atât aspectele artistice, cât și cele mai structurate ale unei activități.',
      low: 'Nu ești foarte orientat spre activitățile creative sau artistice. Preferi medii mai structurate și activități cu reguli și proceduri mai clare.'
    },
    social: {
      high: 'Ești foarte orientat spre oameni și îți place să ajuți, să predai și să sprijini pe alții. Relațiile interpersonale îți oferă energie și satisfacție, iar contribuția la bunăstarea celorlalți este o motivație puternică.',
      moderate: 'Îți place să lucrezi cu oamenii, dar poți aprecia și alte tipuri de activități. Ai un echilibru între dorința de a ajuta și alte interese profesionale.',
      low: 'Nu ești foarte orientat spre activitățile sociale intense. Preferi să lucrezi cu date, idei sau obiecte decât în interacțiune constantă cu oamenii.'
    },
    enterprising: {
      high: 'Ești foarte motivat de leadership, influență și oportunități de afaceri. Îți place să conduci, să convingi și să îți asumi riscuri calculate pentru a atinge obiective ambițioase.',
      moderate: 'Ai o doză moderată de spirit antreprenorial. Poți fi confortabil atât în roluri de conducere, cât și în pozițiile de colaborator, în funcție de circumstanțe.',
      low: 'Nu ești foarte atras de rolurile de conducere sau de riscurile asociate afacerilor. Preferi să urmezi decât să conduci și să eviți situațiile foarte competitive.'
    },
    conventional: {
      high: 'Îți place ordinea, structura și precizia în muncă. Te simți confortabil urmând proceduri stabilite și lucrând cu sisteme bine definite. Atenția la detalii și organizarea sunt punctele tale forte.',
      moderate: 'Apreciezi structura dar poți fi și flexibil când situația o cere. Ai un echilibru între dorința de ordine și capacitatea de adaptare.',
      low: 'Nu îți place rutina și activitățile foarte structurate. Preferi flexibilitatea, creativitatea și libertatea de a-ți organiza munca după propriile preferințe.'
    }
  };
  
  const dimensionName = {
    realistic: 'Realistic (R)',
    investigative: 'Investigative (I)', 
    artistic: 'Artistic (A)',
    social: 'Social (S)',
    enterprising: 'Enterprising (E)',
    conventional: 'Conventional (C)'
  }[dimensionKey] || dimensionKey;
  
  return `${dimensionName}: ${explanations[dimensionKey]?.[level] || 'Explicația nu este disponibilă.'}`;
};

export const getHollandCareerRecommendations = (dominantType: string): string[] => {
  const recommendations: Record<string, string[]> = {
    realistic: [
      'Inginer mecanic, civil sau industrial',
      'Tehnician auto, electronic sau IT',
      'Arhitect peisagist sau constructor',
      'Pilot, mecanic aeronautic',
      'Agricultor, silvicultor',
      'Bucătar profesionist, chef',
      'Fotograf, cameraman'
    ],
    investigative: [
      'Cercetător științific, analist de date',
      'Medic, veterinar, farmacist',
      'Psiholog, sociolog, antropolog', 
      'Profesor universitar, cercetător',
      'Inginer software, arhitect de sisteme',
      'Economist, analist financiar',
      'Jurnalist de investigație'
    ],
    artistic: [
      'Artist plastic, designer grafic',
      'Muzician, compozitor, producător muzical',
      'Scriitor, jurnalist, editor',
      'Actor, regizor, scenarist',
      'Arhitect, designer interior',
      'Fotograf artistic, videomaker',
      'Curator muzeu, critic de artă'
    ],
    social: [
      'Profesor, educator, formator',
      'Psiholog clinician, consilier',
      'Asistent social, terapeut',
      'Medic de familie, asistent medical',
      'HR specialist, recruiter',
      'Antrenor sportiv, instructor fitness',
      'Preot, consilier spiritual'
    ],
    enterprising: [
      'Manager, director executiv',
      'Antreprenor, fondator de startup',
      'Agent de vânzări, account manager',
      'Consultant în management',
      'Agent imobiliar, broker',
      'Politician, diplomat',
      'Specialist în marketing, PR'
    ],
    conventional: [
      'Contabil, auditor financiar',
      'Administrator de baze de date',
      'Secretar executiv, asistent administrativ',
      'Bancher, specialist în credite',
      'Specialist în resurse umane',
      'Inspector, controller de calitate',
      'Planificator financiar, analist bugetar'
    ]
  };
  
  return recommendations[dominantType] || ['Nu sunt disponibile recomandări pentru acest tip.'];
};

export const getHollandOverallInterpretation = (dominantCode: string, score: number): string => {
  const interpretations: Record<string, string> = {
    REALISTIC: `Profilul tău dominant este Realistic (R). Ești o persoană practică care preferă să lucreze cu obiecte concrete, unelte și echipamente. Te simți în elementul tău în activități care produc rezultate tangibile și vizibile.`,
    INVESTIGATIVE: `Profilul tău dominant este Investigative (I). Ești o persoană analitică și curioasă care se bucură să rezolve probleme complexe prin cercetare și gândire sistematică. Îți place să înțelegi cum funcționează lucrurile.`,
    ARTISTIC: `Profilul tău dominant este Artistic (A). Ești o persoană creativă care valorește originalitatea și expresia de sine. Îți place să creezi ceva nou și să lucrezi în medii libere și flexibile.`,
    SOCIAL: `Profilul tău dominant este Social (S). Ești o persoană orientată spre oameni care se bucură să ajute, să educe și să sprijine pe alții. Relațiile interpersonale îți oferă energie și satisfacție.`,
    ENTERPRISING: `Profilul tău dominant este Enterprising (E). Ești o persoană ambițioasă și orientată spre leadership care îți place să influențezi, să conduci și să își asume riscuri pentru a atinge obiective mari.`,
    CONVENTIONAL: `Profilul tău dominant este Conventional (C). Ești o persoană organizată care apreciază structura, ordinea și precizia. Te simți confortabil urmând proceduri și lucrând cu sisteme bine definite.`
  };
  
  return interpretations[dominantCode] || 'Interpretarea nu este disponibilă.';
};
