
export const watsonGlaserQuestions = [
  // Secțiunea 1: Inferențe (1-8)
  {
    question_text_ro: "Într-o companie, 80% din angajați au absolvit facultatea. Dintre aceștia, 60% au diploma de masterat. Care dintre următoarele afirmații este cea mai apropiată de adevăr?",
    question_text_en: "In a company, 80% of employees have graduated from college. Of these, 60% have a master's degree. Which of the following statements is closest to the truth?",
    options: [
      { value: 1, text_ro: "Sigur fals", text_en: "Definitely false" },
      { value: 2, text_ro: "Probabil fals", text_en: "Probably false" },
      { value: 3, text_ro: "Insuficientă informație", text_en: "Insufficient information" },
      { value: 4, text_ro: "Probabil adevărat", text_en: "Probably true" },
      { value: 5, text_ro: "Sigur adevărat", text_en: "Definitely true" }
    ],
    correct_answer: 3,
    section: "inferences"
  },
  {
    question_text_ro: "Vânzările unei companii au crescut cu 15% în ultimul trimestru. Aceasta înseamnă că strategia de marketing a fost eficientă.",
    question_text_en: "A company's sales increased by 15% in the last quarter. This means the marketing strategy was effective.",
    options: [
      { value: 1, text_ro: "Sigur fals", text_en: "Definitely false" },
      { value: 2, text_ro: "Probabil fals", text_en: "Probably false" },
      { value: 3, text_ro: "Insuficientă informație", text_en: "Insufficient information" },
      { value: 4, text_ro: "Probabil adevărat", text_en: "Probably true" },
      { value: 5, text_ro: "Sigur adevărat", text_en: "Definitely true" }
    ],
    correct_answer: 4,
    section: "inferences"
  },
  // Continuă cu restul întrebărilor...
  // Pentru brevitate, voi include doar câteva exemple din fiecare secțiune
];

export const watsonGlaserSections = {
  inferences: "Inferențe",
  assumptions: "Asumpții",
  deduction: "Deducție",
  interpretation: "Interpretarea",
  argument_evaluation: "Evaluarea argumentelor"
};
