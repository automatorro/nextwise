
import React from 'react';

export const WATSON_GLASER_QUESTIONS = [
  // Secțiunea 1: Inferențe (1-8)
  {
    id: 'watson-glaser-1',
    question_text_ro: 'O companie a raportat o creștere a profitului cu 15% în ultimul trimestru comparativ cu același trimestru din anul precedent. Concluzia: Compania are o strategie de afaceri mai eficientă decât anul trecut.',
    question_text_en: 'A company reported a 15% increase in profit in the last quarter compared to the same quarter last year. Conclusion: The company has a more efficient business strategy than last year.',
    options_ro: ['Adevărat', 'Fals', 'Probabil adevărat', 'Probabil fals', 'Date insuficiente'],
    options_en: ['True', 'False', 'Probably true', 'Probably false', 'Insufficient data'],
    correct_answer: 4, // Date insuficiente
    section: 'inferences'
  },
  {
    id: 'watson-glaser-2',
    question_text_ro: 'Studiile arată că oamenii care citesc regulat au un vocabular mai bogat decât cei care nu citesc. Concluzia: Cititul regulat îmbunătățește vocabularul unei persoane.',
    question_text_en: 'Studies show that people who read regularly have a richer vocabulary than those who don\'t read. Conclusion: Regular reading improves a person\'s vocabulary.',
    options_ro: ['Adevărat', 'Fals', 'Probabil adevărat', 'Probabil fals', 'Date insuficiente'],
    options_en: ['True', 'False', 'Probably true', 'Probably false', 'Insufficient data'],
    correct_answer: 2, // Probabil adevărat
    section: 'inferences'
  },
  {
    id: 'watson-glaser-3',
    question_text_ro: 'În ultimii 5 ani, numărul accidentelor rutiere a scăzut cu 20%. Concluzia: Șoferii au devenit mai precauți.',
    question_text_en: 'In the last 5 years, the number of traffic accidents has decreased by 20%. Conclusion: Drivers have become more cautious.',
    options_ro: ['Adevărat', 'Fals', 'Probabil adevărat', 'Probabil fals', 'Date insuficiente'],
    options_en: ['True', 'False', 'Probably true', 'Probably false', 'Insufficient data'],
    correct_answer: 3, // Probabil fals
    section: 'inferences'
  },
  {
    id: 'watson-glaser-4',
    question_text_ro: 'Compania X a lansat un nou produs și vânzările au crescut cu 30%. Concluzia: Noul produs este responsabil pentru creșterea vânzărilor.',
    question_text_en: 'Company X launched a new product and sales increased by 30%. Conclusion: The new product is responsible for the sales increase.',
    options_ro: ['Adevărat', 'Fals', 'Probabil adevărat', 'Probabil fals', 'Date insuficiente'],
    options_en: ['True', 'False', 'Probably true', 'Probably false', 'Insufficient data'],
    correct_answer: 2, // Probabil adevărat
    section: 'inferences'
  },
  {
    id: 'watson-glaser-5',
    question_text_ro: 'Temperatura globală a crescut cu 1°C în ultimii 100 de ani. Concluzia: Activitățile umane sunt cauza principală a încălzirii globale.',
    question_text_en: 'Global temperature has increased by 1°C in the last 100 years. Conclusion: Human activities are the main cause of global warming.',
    options_ro: ['Adevărat', 'Fals', 'Probabil adevărat', 'Probabil fals', 'Date insuficiente'],
    options_en: ['True', 'False', 'Probably true', 'Probably false', 'Insufficient data'],
    correct_answer: 4, // Date insuficiente
    section: 'inferences'
  },
  {
    id: 'watson-glaser-6',
    question_text_ro: 'Un restaurant a început să folosească ingrediente biologice și numărul clienților a crescut. Concluzia: Clienții preferă mâncarea biologică.',
    question_text_en: 'A restaurant started using organic ingredients and the number of customers increased. Conclusion: Customers prefer organic food.',
    options_ro: ['Adevărat', 'Fals', 'Probabil adevărat', 'Probabil fals', 'Date insuficiente'],
    options_en: ['True', 'False', 'Probably true', 'Probably false', 'Insufficient data'],
    correct_answer: 4, // Date insuficiente
    section: 'inferences'
  },
  {
    id: 'watson-glaser-7',
    question_text_ro: 'Studiile indică că exercițiile fizice regulate reduc riscul de boli cardiace. Concluzia: Oamenii care fac sport zilnic nu vor avea probleme cardiace.',
    question_text_en: 'Studies indicate that regular physical exercise reduces the risk of heart disease. Conclusion: People who exercise daily will not have heart problems.',
    options_ro: ['Adevărat', 'Fals', 'Probabil adevărat', 'Probabil fals', 'Date insuficiente'],
    options_en: ['True', 'False', 'Probably true', 'Probably false', 'Insufficient data'],
    correct_answer: 2, // Probabil adevărat
    section: 'inferences'
  },
  {
    id: 'watson-glaser-8',
    question_text_ro: 'O școală a introdus cursuri de programare și rata de absolvire a crescut cu 10%. Concluzia: Cursurile de programare îmbunătățesc performanța academică.',
    question_text_en: 'A school introduced programming courses and the graduation rate increased by 10%. Conclusion: Programming courses improve academic performance.',
    options_ro: ['Adevărat', 'Fals', 'Probabil adevărat', 'Probabil fals', 'Date insuficiente'],
    options_en: ['True', 'False', 'Probably true', 'Probably false', 'Insufficient data'],
    correct_answer: 2, // Probabil adevărat
    section: 'inferences'
  },
  // Continue with remaining 32 questions for other sections...
];
