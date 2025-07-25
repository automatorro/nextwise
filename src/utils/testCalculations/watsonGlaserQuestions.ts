
export const watsonGlaserQuestions = [
  // Secțiunea 1: Inferențe (1-8)
  {
    id: 'watson-glaser-1',
    question_text_ro: 'O companie a raportat o creștere a profitului cu 15% în ultimul trimestru comparativ cu același trimestru din anul precedent.',
    question_text_en: 'A company reported a 15% increase in profit in the last quarter compared to the same quarter last year.',
    context_ro: 'Știind că profitul companiei a crescut cu 15% în ultimul trimestru comparativ cu același trimestru din anul precedent, ce putem concluziona?',
    context_en: 'Knowing that the company\'s profit increased by 15% in the last quarter compared to the same quarter last year, what can we conclude?',
    inference_ro: 'Compania are o strategie de afaceri mai eficientă decât anul trecut.',
    inference_en: 'The company has a more efficient business strategy than last year.',
    options_ro: ['Adevărat', 'Fals', 'Probabil adevărat', 'Probabil fals', 'Date insuficiente'],
    options_en: ['True', 'False', 'Probably true', 'Probably false', 'Insufficient data'],
    correct_answer: 4, // Date insuficiente
    explanation_ro: 'Creșterea profitului poate fi rezultatul mai multor factori, nu neapărat al unei strategii mai eficiente.',
    explanation_en: 'Profit increase can result from multiple factors, not necessarily from a more efficient strategy.'
  },
  {
    id: 'watson-glaser-2',
    question_text_ro: 'Studiile arată că oamenii care citesc regulat au un vocabular mai bogat decât cei care nu citesc.',
    question_text_en: 'Studies show that people who read regularly have a richer vocabulary than those who don\'t read.',
    context_ro: 'Pe baza acestei informații:',
    context_en: 'Based on this information:',
    inference_ro: 'Cititul regulat îmbunătățește vocabularul unei persoane.',
    inference_en: 'Regular reading improves a person\'s vocabulary.',
    options_ro: ['Adevărat', 'Fals', 'Probabil adevărat', 'Probabil fals', 'Date insuficiente'],
    options_en: ['True', 'False', 'Probably true', 'Probably false', 'Insufficient data'],
    correct_answer: 2, // Probabil adevărat
    explanation_ro: 'Există o corelație puternică între citit și vocabular, dar nu putem fi 100% siguri de relația cauzală.',
    explanation_en: 'There is a strong correlation between reading and vocabulary, but we cannot be 100% sure of the causal relationship.'
  },
  // Continue with more questions...
];
