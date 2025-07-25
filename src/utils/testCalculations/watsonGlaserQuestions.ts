
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
    correct_answer: 3, // Probabil fals
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
  
  // Secțiunea 2: Asumpții (9-16)
  {
    id: 'watson-glaser-9',
    question_text_ro: 'Afirmația: "Trebuie să reducem prețurile pentru a fi competitivi." Asumpția: Concurenții au prețuri mai mici.',
    question_text_en: 'Statement: "We must reduce prices to be competitive." Assumption: Competitors have lower prices.',
    options_ro: ['Da', 'Nu'],
    options_en: ['Yes', 'No'],
    correct_answer: 0, // Da
    section: 'assumptions'
  },
  {
    id: 'watson-glaser-10',
    question_text_ro: 'Afirmația: "Să lansăm o campanie publicitară pentru a crește vânzările." Asumpția: Publicitatea va influența comportamentul consumatorilor.',
    question_text_en: 'Statement: "Let\'s launch an advertising campaign to increase sales." Assumption: Advertising will influence consumer behavior.',
    options_ro: ['Da', 'Nu'],
    options_en: ['Yes', 'No'],
    correct_answer: 0, // Da
    section: 'assumptions'
  },
  {
    id: 'watson-glaser-11',
    question_text_ro: 'Afirmația: "Angajații vor fi mai productivi dacă lucrează de acasă." Asumpția: Toți angajații au spațiul necesar pentru a lucra eficient de acasă.',
    question_text_en: 'Statement: "Employees will be more productive if they work from home." Assumption: All employees have the necessary space to work efficiently from home.',
    options_ro: ['Da', 'Nu'],
    options_en: ['Yes', 'No'],
    correct_answer: 1, // Nu
    section: 'assumptions'
  },
  {
    id: 'watson-glaser-12',
    question_text_ro: 'Afirmația: "Trebuie să investim mai mult în tehnologie pentru a îmbunătăți eficiența." Asumpția: Tehnologia actuală nu este suficientă.',
    question_text_en: 'Statement: "We need to invest more in technology to improve efficiency." Assumption: Current technology is not sufficient.',
    options_ro: ['Da', 'Nu'],
    options_en: ['Yes', 'No'],
    correct_answer: 0, // Da
    section: 'assumptions'
  },
  {
    id: 'watson-glaser-13',
    question_text_ro: 'Afirmația: "Să organizăm o sesiune de team building pentru a îmbunătăți colaborarea." Asumpția: Toate echipele au probleme de colaborare.',
    question_text_en: 'Statement: "Let\'s organize a team building session to improve collaboration." Assumption: All teams have collaboration problems.',
    options_ro: ['Da', 'Nu'],
    options_en: ['Yes', 'No'],
    correct_answer: 1, // Nu
    section: 'assumptions'
  },
  {
    id: 'watson-glaser-14',
    question_text_ro: 'Afirmația: "Să oferim cursuri de formare profesională angajaților." Asumpția: Angajații vor să își dezvolte competențele.',
    question_text_en: 'Statement: "Let\'s offer professional training courses to employees." Assumption: Employees want to develop their skills.',
    options_ro: ['Da', 'Nu'],
    options_en: ['Yes', 'No'],
    correct_answer: 0, // Da
    section: 'assumptions'
  },
  {
    id: 'watson-glaser-15',
    question_text_ro: 'Afirmația: "Să implementăm un sistem de bonusuri pentru performanță." Asumpția: Banii sunt singura motivație pentru angajați.',
    question_text_en: 'Statement: "Let\'s implement a performance bonus system." Assumption: Money is the only motivation for employees.',
    options_ro: ['Da', 'Nu'],
    options_en: ['Yes', 'No'],
    correct_answer: 1, // Nu
    section: 'assumptions'
  },
  {
    id: 'watson-glaser-16',
    question_text_ro: 'Afirmația: "Să deschidем o nouă filială în alt oraș." Asumpția: Există cerere pentru serviciile noastre în acel oraș.',
    question_text_en: 'Statement: "Let\'s open a new branch in another city." Assumption: There is demand for our services in that city.',
    options_ro: ['Da', 'Nu'],
    options_en: ['Yes', 'No'],
    correct_answer: 0, // Da
    section: 'assumptions'
  },
  
  // Secțiunea 3: Deducție (17-24)
  {
    id: 'watson-glaser-17',
    question_text_ro: 'Premisele: Toate păsările au pene. Struții sunt păsări. Concluzia: Struții au pene.',
    question_text_en: 'Premises: All birds have feathers. Ostriches are birds. Conclusion: Ostriches have feathers.',
    options_ro: ['Urmează logic', 'Nu urmează logic'],
    options_en: ['Follows logically', 'Does not follow logically'],
    correct_answer: 0, // Urmează logic
    section: 'deduction'
  },
  {
    id: 'watson-glaser-18',
    question_text_ro: 'Premisele: Unii manageri sunt ingineri. Toți inginerii au diplomă de facultate. Concluzia: Unii manageri au diplomă de facultate.',
    question_text_en: 'Premises: Some managers are engineers. All engineers have university degrees. Conclusion: Some managers have university degrees.',
    options_ro: ['Urmează logic', 'Nu urmează logic'],
    options_en: ['Follows logically', 'Does not follow logically'],
    correct_answer: 0, // Urmează logic
    section: 'deduction'
  },
  {
    id: 'watson-glaser-19',
    question_text_ro: 'Premisele: Toți angajații cu performanță ridicată primesc bonusuri. Maria primește bonusuri. Concluzia: Maria are performanță ridicată.',
    question_text_en: 'Premises: All high-performing employees receive bonuses. Maria receives bonuses. Conclusion: Maria has high performance.',
    options_ro: ['Urmează logic', 'Nu urmează logic'],
    options_en: ['Follows logically', 'Does not follow logically'],
    correct_answer: 1, // Nu urmează logic
    section: 'deduction'
  },
  {
    id: 'watson-glaser-20',
    question_text_ro: 'Premisele: Nimeni care nu are experiență nu poate fi manager. Andrei este manager. Concluzia: Andrei are experiență.',
    question_text_en: 'Premises: No one without experience can be a manager. Andrei is a manager. Conclusion: Andrei has experience.',
    options_ro: ['Urmează logic', 'Nu urmează logic'],
    options_en: ['Follows logically', 'Does not follow logically'],
    correct_answer: 0, // Urmează logic
    section: 'deduction'
  },
  {
    id: 'watson-glaser-21',
    question_text_ro: 'Premisele: Toate produsele de calitate sunt scumpe. Acest produs este scump. Concluzia: Acest produs este de calitate.',
    question_text_en: 'Premises: All quality products are expensive. This product is expensive. Conclusion: This product is quality.',
    options_ro: ['Urmează logic', 'Nu urmează logic'],
    options_en: ['Follows logically', 'Does not follow logically'],
    correct_answer: 1, // Nu urmează logic
    section: 'deduction'
  },
  {
    id: 'watson-glaser-22',
    question_text_ro: 'Premisele: Unii clienți sunt nemulțumiți. Toți clienții nemulțumiți fac reclamații. Concluzia: Unii clienți fac reclamații.',
    question_text_en: 'Premises: Some customers are dissatisfied. All dissatisfied customers make complaints. Conclusion: Some customers make complaints.',
    options_ro: ['Urmează logic', 'Nu urmează logic'],
    options_en: ['Follows logically', 'Does not follow logically'],
    correct_answer: 0, // Urmează logic
    section: 'deduction'
  },
  {
    id: 'watson-glaser-23',
    question_text_ro: 'Premisele: Toți experții recomandă acest produs. Elena recomandă acest produs. Concluzia: Elena este expert.',
    question_text_en: 'Premises: All experts recommend this product. Elena recommends this product. Conclusion: Elena is an expert.',
    options_ro: ['Urmează logic', 'Nu urmează logic'],
    options_en: ['Follows logically', 'Does not follow logically'],
    correct_answer: 1, // Nu urmează logic
    section: 'deduction'
  },
  {
    id: 'watson-glaser-24',
    question_text_ro: 'Premisele: Toate companiile de succes investesc în cercetare. Această companie investește în cercetare. Concluzia: Această companie are succes.',
    question_text_en: 'Premises: All successful companies invest in research. This company invests in research. Conclusion: This company is successful.',
    options_ro: ['Urmează logic', 'Nu urmează logic'],
    options_en: ['Follows logically', 'Does not follow logically'],
    correct_answer: 1, // Nu urmează logic
    section: 'deduction'
  },
  
  // Secțiunea 4: Interpretarea (25-32)
  {
    id: 'watson-glaser-25',
    question_text_ro: 'Informațiile: Studiul arată că 80% din angajați sunt mulțumiți de locul de muncă. Concluzia: Majoritatea angajaților sunt mulțumiți.',
    question_text_en: 'Information: Study shows that 80% of employees are satisfied with their workplace. Conclusion: Most employees are satisfied.',
    options_ro: ['Concluzia urmează', 'Concluzia nu urmează'],
    options_en: ['Conclusion follows', 'Conclusion does not follow'],
    correct_answer: 0, // Concluzia urmează
    section: 'interpretation'
  },
  {
    id: 'watson-glaser-26',
    question_text_ro: 'Informațiile: Vânzările au crescut cu 15% în ultimul an. Concluzia: Strategia de marketing a fost foarte eficientă.',
    question_text_en: 'Information: Sales increased by 15% last year. Conclusion: The marketing strategy was very effective.',
    options_ro: ['Concluzia urmează', 'Concluzia nu urmează'],
    options_en: ['Conclusion follows', 'Conclusion does not follow'],
    correct_answer: 1, // Concluzia nu urmează
    section: 'interpretation'
  },
  {
    id: 'watson-glaser-27',
    question_text_ro: 'Informațiile: Rata de retenție a angajaților este de 85%. Concluzia: Angajații nu doresc să plece din companie.',
    question_text_en: 'Information: Employee retention rate is 85%. Conclusion: Employees do not want to leave the company.',
    options_ro: ['Concluzia urmează', 'Concluzia nu urmează'],
    options_en: ['Conclusion follows', 'Conclusion does not follow'],
    correct_answer: 1, // Concluzia nu urmează
    section: 'interpretation'
  },
  {
    id: 'watson-glaser-28',
    question_text_ro: 'Informațiile: Productivitatea a crescut cu 25% după implementarea noului sistem. Concluzia: Noul sistem a contribuit la creșterea productivității.',
    question_text_en: 'Information: Productivity increased by 25% after implementing the new system. Conclusion: The new system contributed to increased productivity.',
    options_ro: ['Concluzia urmează', 'Concluzia nu urmează'],
    options_en: ['Conclusion follows', 'Conclusion does not follow'],
    correct_answer: 0, // Concluzia urmează
    section: 'interpretation'
  },
  {
    id: 'watson-glaser-29',
    question_text_ro: 'Informațiile: 70% din clienți și-au exprimat satisfacția în sondaj. Concluzia: Serviciile companiei sunt apreciate de majoritatea clienților.',
    question_text_en: 'Information: 70% of customers expressed satisfaction in the survey. Conclusion: The company\'s services are appreciated by most customers.',
    options_ro: ['Concluzia urmează', 'Concluzia nu urmează'],
    options_en: ['Conclusion follows', 'Conclusion does not follow'],
    correct_answer: 0, // Concluzia urmează
    section: 'interpretation'
  },
  {
    id: 'watson-glaser-30',
    question_text_ro: 'Informațiile: Profitul a scăzut cu 10% în ultimul trimestru. Concluzia: Compania se află în criză financiară.',
    question_text_en: 'Information: Profit decreased by 10% in the last quarter. Conclusion: The company is in financial crisis.',
    options_ro: ['Concluzia urmează', 'Concluzia nu urmează'],
    options_en: ['Conclusion follows', 'Conclusion does not follow'],
    correct_answer: 1, // Concluzia nu urmează
    section: 'interpretation'
  },
  {
    id: 'watson-glaser-31',
    question_text_ro: 'Informațiile: Timpul de livrare a fost redus cu 30%. Concluzia: Eficiența logisticii a fost îmbunătățită.',
    question_text_en: 'Information: Delivery time was reduced by 30%. Conclusion: Logistics efficiency has been improved.',
    options_ro: ['Concluzia urmează', 'Concluzia nu urmează'],
    options_en: ['Conclusion follows', 'Conclusion does not follow'],
    correct_answer: 0, // Concluzia urmează
    section: 'interpretation'
  },
  {
    id: 'watson-glaser-32',
    question_text_ro: 'Informațiile: Absenteismul a crescut cu 20% în ultimele 6 luni. Concluzia: Angajații nu mai sunt motivați să lucreze.',
    question_text_en: 'Information: Absenteeism increased by 20% in the last 6 months. Conclusion: Employees are no longer motivated to work.',
    options_ro: ['Concluzia urmează', 'Concluzia nu urmează'],
    options_en: ['Conclusion follows', 'Conclusion does not follow'],
    correct_answer: 1, // Concluzia nu urmează
    section: 'interpretation'
  },
  
  // Secțiunea 5: Evaluarea argumentelor (33-40)
  {
    id: 'watson-glaser-33',
    question_text_ro: 'Întrebarea: Ar trebui companiile să investească mai mult în tehnologii verzi? Argumentul: Da, pentru că protejează mediul și reduc costurile pe termen lung.',
    question_text_en: 'Question: Should companies invest more in green technologies? Argument: Yes, because they protect the environment and reduce long-term costs.',
    options_ro: ['Argument puternic', 'Argument slab'],
    options_en: ['Strong argument', 'Weak argument'],
    correct_answer: 0, // Argument puternic
    section: 'argument_evaluation'
  },
  {
    id: 'watson-glaser-34',
    question_text_ro: 'Întrebarea: Ar trebui să se interzică fumatul în toate spațiile publice? Argumentul: Da, pentru că fumul miroase urât.',
    question_text_en: 'Question: Should smoking be banned in all public spaces? Argument: Yes, because smoke smells bad.',
    options_ro: ['Argument puternic', 'Argument slab'],
    options_en: ['Strong argument', 'Weak argument'],
    correct_answer: 1, // Argument slab
    section: 'argument_evaluation'
  },
  {
    id: 'watson-glaser-35',
    question_text_ro: 'Întrebarea: Ar trebui să se mărească salariul minim? Argumentul: Nu, pentru că prețurile la produse vor crește.',
    question_text_en: 'Question: Should the minimum wage be increased? Argument: No, because product prices will increase.',
    options_ro: ['Argument puternic', 'Argument slab'],
    options_en: ['Strong argument', 'Weak argument'],
    correct_answer: 1, // Argument slab
    section: 'argument_evaluation'
  },
  {
    id: 'watson-glaser-36',
    question_text_ro: 'Întrebarea: Ar trebui să se implementeze programul de lucru flexibil? Argumentul: Da, pentru că îmbunătățește echilibrul între viață și muncă și poate crește productivitatea.',
    question_text_en: 'Question: Should flexible work schedules be implemented? Argument: Yes, because it improves work-life balance and can increase productivity.',
    options_ro: ['Argument puternic', 'Argument slab'],
    options_en: ['Strong argument', 'Weak argument'],
    correct_answer: 0, // Argument puternic
    section: 'argument_evaluation'
  },
  {
    id: 'watson-glaser-37',
    question_text_ro: 'Întrebarea: Ar trebui să se reducă numărul de ore de lucru pe săptămână? Argumentul: Da, pentru că toată lumea vrea să lucreze mai puțin.',
    question_text_en: 'Question: Should the number of working hours per week be reduced? Argument: Yes, because everyone wants to work less.',
    options_ro: ['Argument puternic', 'Argument slab'],
    options_en: ['Strong argument', 'Weak argument'],
    correct_answer: 1, // Argument slab
    section: 'argument_evaluation'
  },
  {
    id: 'watson-glaser-38',
    question_text_ro: 'Întrebarea: Ar trebui să se investească mai mult în educație? Argumentul: Da, pentru că educația dezvoltă capita uman și stimulează creșterea economică.',
    question_text_en: 'Question: Should more be invested in education? Argument: Yes, because education develops human capital and stimulates economic growth.',
    options_ro: ['Argument puternic', 'Argument slab'],
    options_en: ['Strong argument', 'Weak argument'],
    correct_answer: 0, // Argument puternic
    section: 'argument_evaluation'
  },
  {
    id: 'watson-glaser-39',
    question_text_ro: 'Întrebarea: Ar trebui să se interzică mașinile în centrul orașului? Argumentul: Da, pentru că mașinile fac zgomot.',
    question_text_en: 'Question: Should cars be banned from the city center? Argument: Yes, because cars make noise.',
    options_ro: ['Argument puternic', 'Argument slab'],
    options_en: ['Strong argument', 'Weak argument'],
    correct_answer: 1, // Argument slab
    section: 'argument_evaluation'
  },
  {
    id: 'watson-glaser-40',
    question_text_ro: 'Întrebarea: Ar trebui să se implementeze un sistem de monitorizare a performanței angajaților? Argumentul: Da, pentru că permite identificarea problemelor și îmbunătățirea continue a proceselor.',
    question_text_en: 'Question: Should an employee performance monitoring system be implemented? Argument: Yes, because it allows problem identification and continuous process improvement.',
    options_ro: ['Argument puternic', 'Argument slab'],
    options_en: ['Strong argument', 'Weak argument'],
    correct_answer: 0, // Argument puternic
    section: 'argument_evaluation'
  }
];

// Funcție pentru generarea întrebărilor în formatul necesar pentru baza de date
export function generateWatsonGlaserQuestionsForDB(testTypeId: string) {
  return WATSON_GLASER_QUESTIONS.map((question, index) => ({
    id: `${testTypeId}-${index + 1}`,
    test_type_id: testTypeId,
    question_order: index + 1,
    question_text_ro: question.question_text_ro,
    question_text_en: question.question_text_en,
    options: question.options_ro,
    options_en: question.options_en,
    question_type: 'multiple_choice',
    scoring_weights: {
      correct_answer: question.correct_answer,
      section: question.section
    }
  }));
}
