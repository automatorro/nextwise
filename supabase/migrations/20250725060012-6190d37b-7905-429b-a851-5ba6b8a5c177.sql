
-- Adăugarea testului Watson-Glaser Critical Thinking Appraisal
INSERT INTO test_types (
  id,
  name,
  description,
  category_id,
  questions_count,
  estimated_duration,
  subscription_required
) VALUES (
  '550e8400-e29b-41d4-a716-446655440001',
  'Test Watson-Glaser Critical Thinking Appraisal',
  'Evaluează raționamentul critic și gândirea structurată prin 5 componente: inferențe, recunoașterea asumpțiilor, deducție, interpretarea și evaluarea argumentelor.',
  (SELECT id FROM test_categories WHERE name = 'Aptitudini Cognitive'),
  40,
  35,
  'professional'
);

-- Secțiunea 1: Inferențe (8 întrebări)
INSERT INTO test_questions (
  test_type_id,
  question_order,
  question_text_ro,
  question_text_en,
  question_type,
  options,
  options_en,
  scoring_weights
) VALUES
(
  '550e8400-e29b-41d4-a716-446655440001',
  1,
  'Fapt: "Toți angajații departamentului de marketing au primit training în social media." Concluzie: "Andrei, care lucrează în marketing, știe să gestioneze campanii pe Instagram."',
  'Fact: "All marketing department employees have received social media training." Conclusion: "Andrei, who works in marketing, knows how to manage Instagram campaigns."',
  'multiple_choice',
  '["Sigur fals", "Probabil fals", "Insuficientă informație", "Probabil adevărat", "Sigur adevărat"]'::jsonb,
  '["Definitely false", "Probably false", "Insufficient information", "Probably true", "Definitely true"]'::jsonb,
  '[0, 0, 0, 1, 0]'::jsonb
),
(
  '550e8400-e29b-41d4-a716-446655440001',
  2,
  'Fapt: "Niciun produs X nu este livrat gratuit." Concluzie: "Clienții trebuie să plătească pentru transportul produsului X."',
  'Fact: "No product X is delivered for free." Conclusion: "Customers must pay for product X transportation."',
  'multiple_choice',
  '["Sigur fals", "Probabil fals", "Insuficientă informație", "Probabil adevărat", "Sigur adevărat"]'::jsonb,
  '["Definitely false", "Probably false", "Insufficient information", "Probably true", "Definitely true"]'::jsonb,
  '[0, 0, 0, 0, 1]'::jsonb
),
(
  '550e8400-e29b-41d4-a716-446655440001',
  3,
  'Fapt: "Jumătate dintre angajații companiei lucrează remote." Concluzie: "Laura lucrează de acasă."',
  'Fact: "Half of the company employees work remotely." Conclusion: "Laura works from home."',
  'multiple_choice',
  '["Sigur fals", "Probabil fals", "Insuficientă informație", "Probabil adevărat", "Sigur adevărat"]'::jsonb,
  '["Definitely false", "Probably false", "Insufficient information", "Probably true", "Definitely true"]'::jsonb,
  '[0, 0, 1, 0, 0]'::jsonb
),
(
  '550e8400-e29b-41d4-a716-446655440001',
  4,
  'Fapt: "Toate ședințele de luni durează o oră." Concluzie: "Ședința de luni viitoare va dura exact o oră."',
  'Fact: "All Monday meetings last one hour." Conclusion: "Next Monday meeting will last exactly one hour."',
  'multiple_choice',
  '["Sigur fals", "Probabil fals", "Insuficientă informație", "Probabil adevărat", "Sigur adevărat"]'::jsonb,
  '["Definitely false", "Probably false", "Insufficient information", "Probably true", "Definitely true"]'::jsonb,
  '[0, 0, 0, 0, 1]'::jsonb
),
(
  '550e8400-e29b-41d4-a716-446655440001',
  5,
  'Fapt: "Niciun client nu a raportat defecte la produsul nou." Concluzie: "Produsul nou funcționează perfect."',
  'Fact: "No client has reported defects in the new product." Conclusion: "The new product works perfectly."',
  'multiple_choice',
  '["Sigur fals", "Probabil fals", "Insuficientă informație", "Probabil adevărat", "Sigur adevărat"]'::jsonb,
  '["Definitely false", "Probably false", "Insufficient information", "Probably true", "Definitely true"]'::jsonb,
  '[0, 0, 0, 1, 0]'::jsonb
),
(
  '550e8400-e29b-41d4-a716-446655440001',
  6,
  'Fapt: "Toți cursanții care promovează examenul final primesc certificat." Concluzie: "Ioana a primit certificat, deci a promovat examenul."',
  'Fact: "All students who pass the final exam receive a certificate." Conclusion: "Ioana received a certificate, so she passed the exam."',
  'multiple_choice',
  '["Sigur fals", "Probabil fals", "Insuficientă informație", "Probabil adevărat", "Sigur adevărat"]'::jsonb,
  '["Definitely false", "Probably false", "Insufficient information", "Probably true", "Definitely true"]'::jsonb,
  '[0, 0, 0, 1, 0]'::jsonb
),
(
  '550e8400-e29b-41d4-a716-446655440001',
  7,
  'Fapt: "Majoritatea angajaților preferă munca de acasă." Concluzie: "Este posibil ca unii să prefere biroul."',
  'Fact: "Most employees prefer working from home." Conclusion: "It is possible that some prefer the office."',
  'multiple_choice',
  '["Sigur fals", "Probabil fals", "Insuficientă informație", "Probabil adevărat", "Sigur adevărat"]'::jsonb,
  '["Definitely false", "Probably false", "Insufficient information", "Probably true", "Definitely true"]'::jsonb,
  '[0, 0, 0, 0, 1]'::jsonb
),
(
  '550e8400-e29b-41d4-a716-446655440001',
  8,
  'Fapt: "Niciun membru al echipei nu are acces la baza de date fără parolă." Concluzie: "Maria are parolă dacă poate accesa baza de date."',
  'Fact: "No team member has access to the database without a password." Conclusion: "Maria has a password if she can access the database."',
  'multiple_choice',
  '["Sigur fals", "Probabil fals", "Insuficientă informație", "Probabil adevărat", "Sigur adevărat"]'::jsonb,
  '["Definitely false", "Probably false", "Insufficient information", "Probably true", "Definitely true"]'::jsonb,
  '[0, 0, 0, 0, 1]'::jsonb
);

-- Secțiunea 2: Recunoașterea asumpțiilor (8 întrebări)
INSERT INTO test_questions (
  test_type_id,
  question_order,
  question_text_ro,
  question_text_en,
  question_type,
  options,
  options_en,
  scoring_weights
) VALUES
(
  '550e8400-e29b-41d4-a716-446655440001',
  9,
  'Afirmație: "Pentru a crește vânzările, compania trebuie să investească în marketing online." Presupunere: "Marketingul online este mai eficient decât alte metode."',
  'Statement: "To increase sales, the company must invest in online marketing." Assumption: "Online marketing is more efficient than other methods."',
  'binary_choice',
  '["Nu", "Da"]'::jsonb,
  '["No", "Yes"]'::jsonb,
  '[0, 1]'::jsonb
),
(
  '550e8400-e29b-41d4-a716-446655440001',
  10,
  'Afirmație: "Ar trebui să cumpărăm mașini electrice pentru flotă." Presupunere: "Mașinile electrice vor reduce costurile."',
  'Statement: "We should buy electric cars for the fleet." Assumption: "Electric cars will reduce costs."',
  'binary_choice',
  '["Nu", "Da"]'::jsonb,
  '["No", "Yes"]'::jsonb,
  '[0, 1]'::jsonb
),
(
  '550e8400-e29b-41d4-a716-446655440001',
  11,
  'Afirmație: "Angajații trebuie să lucreze 2 zile pe săptămână de acasă." Presupunere: "Se poate lucra eficient și remote."',
  'Statement: "Employees should work 2 days per week from home." Assumption: "One can work efficiently remotely."',
  'binary_choice',
  '["Nu", "Da"]'::jsonb,
  '["No", "Yes"]'::jsonb,
  '[0, 1]'::jsonb
),
(
  '550e8400-e29b-41d4-a716-446655440001',
  12,
  'Afirmație: "Nu este nevoie să schimbăm softul actual de contabilitate." Presupunere: "Softul actual funcționează suficient de bine."',
  'Statement: "There is no need to change the current accounting software." Assumption: "The current software works well enough."',
  'binary_choice',
  '["Nu", "Da"]'::jsonb,
  '["No", "Yes"]'::jsonb,
  '[0, 1]'::jsonb
),
(
  '550e8400-e29b-41d4-a716-446655440001',
  13,
  'Afirmație: "Ar trebui să participăm la conferința internațională." Presupunere: "Conferința va aduce beneficii companiei."',
  'Statement: "We should attend the international conference." Assumption: "The conference will bring benefits to the company."',
  'binary_choice',
  '["Nu", "Da"]'::jsonb,
  '["No", "Yes"]'::jsonb,
  '[0, 1]'::jsonb
),
(
  '550e8400-e29b-41d4-a716-446655440001',
  14,
  'Afirmație: "Nu este recomandat să angajăm oameni fără experiență." Presupunere: "Experiența este mai importantă decât potențialul."',
  'Statement: "It is not recommended to hire people without experience." Assumption: "Experience is more important than potential."',
  'binary_choice',
  '["Nu", "Da"]'::jsonb,
  '["No", "Yes"]'::jsonb,
  '[0, 1]'::jsonb
),
(
  '550e8400-e29b-41d4-a716-446655440001',
  15,
  'Afirmație: "Vom lansa produsul pe piață luna viitoare." Presupunere: "Produsul va fi gata până atunci."',
  'Statement: "We will launch the product on the market next month." Assumption: "The product will be ready by then."',
  'binary_choice',
  '["Nu", "Da"]'::jsonb,
  '["No", "Yes"]'::jsonb,
  '[0, 1]'::jsonb
),
(
  '550e8400-e29b-41d4-a716-446655440001',
  16,
  'Afirmație: "Clienții preferă prețuri mai mici decât servicii suplimentare." Presupunere: "Clienții pun costul pe primul loc."',
  'Statement: "Customers prefer lower prices than additional services." Assumption: "Customers put cost first."',
  'binary_choice',
  '["Nu", "Da"]'::jsonb,
  '["No", "Yes"]'::jsonb,
  '[0, 1]'::jsonb
);

-- Secțiunea 3: Deducție (8 întrebări)
INSERT INTO test_questions (
  test_type_id,
  question_order,
  question_text_ro,
  question_text_en,
  question_type,
  options,
  options_en,
  scoring_weights
) VALUES
(
  '550e8400-e29b-41d4-a716-446655440001',
  17,
  'Premisă: "Toți angajații din vânzări primesc comision." Concluzie: "Ana primește comision, deci lucrează în vânzări."',
  'Premise: "All sales employees receive commission." Conclusion: "Ana receives commission, so she works in sales."',
  'binary_choice',
  '["Nu urmează logic", "Urmează logic"]'::jsonb,
  '["Does not follow logically", "Follows logically"]'::jsonb,
  '[1, 0]'::jsonb
),
(
  '550e8400-e29b-41d4-a716-446655440001',
  18,
  'Premisă: "Niciun student nu are voie să fumeze în campus." Concluzie: "Dacă Maria e studentă, nu fumează în campus."',
  'Premise: "No student is allowed to smoke on campus." Conclusion: "If Maria is a student, she does not smoke on campus."',
  'binary_choice',
  '["Nu urmează logic", "Urmează logic"]'::jsonb,
  '["Does not follow logically", "Follows logically"]'::jsonb,
  '[0, 1]'::jsonb
),
(
  '550e8400-e29b-41d4-a716-446655440001',
  19,
  'Premisă: "Toate laptopurile companiei au sistem de securitate." Concluzie: "Acest laptop are sistem de securitate, deci este al companiei."',
  'Premise: "All company laptops have security systems." Conclusion: "This laptop has a security system, so it belongs to the company."',
  'binary_choice',
  '["Nu urmează logic", "Urmează logic"]'::jsonb,
  '["Does not follow logically", "Follows logically"]'::jsonb,
  '[1, 0]'::jsonb
),
(
  '550e8400-e29b-41d4-a716-446655440001',
  20,
  'Premisă: "Orice persoană care termină cursul primește diplomă." Concluzie: "Ioana a primit diplomă, deci a terminat cursul."',
  'Premise: "Anyone who completes the course receives a diploma." Conclusion: "Ioana received a diploma, so she completed the course."',
  'binary_choice',
  '["Nu urmează logic", "Urmează logic"]'::jsonb,
  '["Does not follow logically", "Follows logically"]'::jsonb,
  '[0, 1]'::jsonb
),
(
  '550e8400-e29b-41d4-a716-446655440001',
  21,
  'Premisă: "Nicio carte de pe raft nu este disponibilă pentru împrumut." Concluzie: "Această carte este pe raft, deci nu poate fi împrumutată."',
  'Premise: "No book on the shelf is available for borrowing." Conclusion: "This book is on the shelf, so it cannot be borrowed."',
  'binary_choice',
  '["Nu urmează logic", "Urmează logic"]'::jsonb,
  '["Does not follow logically", "Follows logically"]'::jsonb,
  '[0, 1]'::jsonb
),
(
  '550e8400-e29b-41d4-a716-446655440001',
  22,
  'Premisă: "Toate contractele sunt verificate de manager." Concluzie: "Acest document a fost verificat de manager, deci este contract."',
  'Premise: "All contracts are verified by the manager." Conclusion: "This document was verified by the manager, so it is a contract."',
  'binary_choice',
  '["Nu urmează logic", "Urmează logic"]'::jsonb,
  '["Does not follow logically", "Follows logically"]'::jsonb,
  '[1, 0]'::jsonb
),
(
  '550e8400-e29b-41d4-a716-446655440001',
  23,
  'Premisă: "Nimeni din echipa IT nu lucrează part-time." Concluzie: "Andrei lucrează full-time, deci e din IT."',
  'Premise: "No one from the IT team works part-time." Conclusion: "Andrei works full-time, so he is from IT."',
  'binary_choice',
  '["Nu urmează logic", "Urmează logic"]'::jsonb,
  '["Does not follow logically", "Follows logically"]'::jsonb,
  '[1, 0]'::jsonb
),
(
  '550e8400-e29b-41d4-a716-446655440001',
  24,
  'Premisă: "Toate întâlnirile de proiect sunt marți." Concluzie: "Dacă este marți, există o întâlnire de proiect."',
  'Premise: "All project meetings are on Tuesday." Conclusion: "If it is Tuesday, there is a project meeting."',
  'binary_choice',
  '["Nu urmează logic", "Urmează logic"]'::jsonb,
  '["Does not follow logically", "Follows logically"]'::jsonb,
  '[1, 0]'::jsonb
);

-- Secțiunea 4: Interpretarea (8 întrebări)
INSERT INTO test_questions (
  test_type_id,
  question_order,
  question_text_ro,
  question_text_en,
  question_type,
  options,
  options_en,
  scoring_weights
) VALUES
(
  '550e8400-e29b-41d4-a716-446655440001',
  25,
  'Text: "Studiile arată că angajații care primesc feedback regulat sunt mai motivați." Concluzie: "Feedback-ul regulat crește motivația angajaților."',
  'Text: "Studies show that employees who receive regular feedback are more motivated." Conclusion: "Regular feedback increases employee motivation."',
  'binary_choice',
  '["Concluzia nu este corectă", "Concluzia este corectă"]'::jsonb,
  '["The conclusion is not correct", "The conclusion is correct"]'::jsonb,
  '[0, 1]'::jsonb
),
(
  '550e8400-e29b-41d4-a716-446655440001',
  26,
  'Text: "Clienții care folosesc aplicația mobilă cumpără mai des." Concluzie: "Aplicația mobilă determină clienții să cumpere mai mult."',
  'Text: "Customers who use the mobile app buy more often." Conclusion: "The mobile app causes customers to buy more."',
  'binary_choice',
  '["Concluzia nu este corectă", "Concluzia este corectă"]'::jsonb,
  '["The conclusion is not correct", "The conclusion is correct"]'::jsonb,
  '[1, 0]'::jsonb
),
(
  '550e8400-e29b-41d4-a716-446655440001',
  27,
  'Text: "În ultimele 6 luni, vânzările produsului A au crescut cu 20%." Concluzie: "Produsul A se va vinde tot mai mult în următoarele 6 luni."',
  'Text: "In the last 6 months, product A sales increased by 20%." Conclusion: "Product A will sell more and more in the next 6 months."',
  'binary_choice',
  '["Concluzia nu este corectă", "Concluzia este corectă"]'::jsonb,
  '["The conclusion is not correct", "The conclusion is correct"]'::jsonb,
  '[1, 0]'::jsonb
),
(
  '550e8400-e29b-41d4-a716-446655440001',
  28,
  'Text: "90% din participanți au spus că ar recomanda cursul prietenilor." Concluzie: "Majoritatea participanților au fost mulțumiți de curs."',
  'Text: "90% of participants said they would recommend the course to friends." Conclusion: "Most participants were satisfied with the course."',
  'binary_choice',
  '["Concluzia nu este corectă", "Concluzia este corectă"]'::jsonb,
  '["The conclusion is not correct", "The conclusion is correct"]'::jsonb,
  '[0, 1]'::jsonb
),
(
  '550e8400-e29b-41d4-a716-446655440001',
  29,
  'Text: "Mai multe studii sugerează că exercițiul fizic regulat reduce stresul." Concluzie: "Exercițiul fizic ajută la reducerea stresului."',
  'Text: "Several studies suggest that regular physical exercise reduces stress." Conclusion: "Physical exercise helps reduce stress."',
  'binary_choice',
  '["Concluzia nu este corectă", "Concluzia este corectă"]'::jsonb,
  '["The conclusion is not correct", "The conclusion is correct"]'::jsonb,
  '[0, 1]'::jsonb
),
(
  '550e8400-e29b-41d4-a716-446655440001',
  30,
  'Text: "Numărul utilizatorilor aplicației a scăzut cu 10% luna trecută." Concluzie: "Aplicația va pierde utilizatori și luna viitoare."',
  'Text: "The number of app users decreased by 10% last month." Conclusion: "The app will lose users next month as well."',
  'binary_choice',
  '["Concluzia nu este corectă", "Concluzia este corectă"]'::jsonb,
  '["The conclusion is not correct", "The conclusion is correct"]'::jsonb,
  '[1, 0]'::jsonb
),
(
  '550e8400-e29b-41d4-a716-446655440001',
  31,
  'Text: "Majoritatea angajaților preferă să lucreze de acasă cel puțin 2 zile pe săptămână." Concluzie: "Cei mai mulți angajați preferă un model de lucru hibrid."',
  'Text: "Most employees prefer to work from home at least 2 days per week." Conclusion: "Most employees prefer a hybrid work model."',
  'binary_choice',
  '["Concluzia nu este corectă", "Concluzia este corectă"]'::jsonb,
  '["The conclusion is not correct", "The conclusion is correct"]'::jsonb,
  '[0, 1]'::jsonb
),
(
  '550e8400-e29b-41d4-a716-446655440001',
  32,
  'Text: "Un raport a arătat că 70% din consumatori citesc recenzii online înainte de a cumpăra." Concluzie: "Recenziile online influențează deciziile majorității cumpărătorilor."',
  'Text: "A report showed that 70% of consumers read online reviews before buying." Conclusion: "Online reviews influence the majority of buyers\' decisions."',
  'binary_choice',
  '["Concluzia nu este corectă", "Concluzia este corectă"]'::jsonb,
  '["The conclusion is not correct", "The conclusion is correct"]'::jsonb,
  '[0, 1]'::jsonb
);

-- Secțiunea 5: Evaluarea argumentelor (8 întrebări)
INSERT INTO test_questions (
  test_type_id,
  question_order,
  question_text_ro,
  question_text_en,
  question_type,
  options,
  options_en,
  scoring_weights
) VALUES
(
  '550e8400-e29b-41d4-a716-446655440001',
  33,
  'Argument: "Compania ar trebui să investească în formare pentru angajați, pentru că îi ajută să fie mai productivi."',
  'Argument: "The company should invest in employee training because it helps them be more productive."',
  'binary_choice',
  '["Slab", "Puternic"]'::jsonb,
  '["Weak", "Strong"]'::jsonb,
  '[0, 1]'::jsonb
),
(
  '550e8400-e29b-41d4-a716-446655440001',
  34,
  'Argument: "Trebuie să reducem prețurile, pentru că concurența are reclame atractive."',
  'Argument: "We must reduce prices because the competition has attractive advertisements."',
  'binary_choice',
  '["Slab", "Puternic"]'::jsonb,
  '["Weak", "Strong"]'::jsonb,
  '[1, 0]'::jsonb
),
(
  '550e8400-e29b-41d4-a716-446655440001',
  35,
  'Argument: "Ar trebui să deschidem un birou într-un oraș nou, pentru că multe companii s-au mutat acolo recent."',
  'Argument: "We should open an office in a new city because many companies have moved there recently."',
  'binary_choice',
  '["Slab", "Puternic"]'::jsonb,
  '["Weak", "Strong"]'::jsonb,
  '[1, 0]'::jsonb
),
(
  '550e8400-e29b-41d4-a716-446655440001',
  36,
  'Argument: "Compania trebuie să introducă un program de lucru flexibil, pentru că angajații cer acest lucru."',
  'Argument: "The company must introduce a flexible work program because employees are asking for it."',
  'binary_choice',
  '["Slab", "Puternic"]'::jsonb,
  '["Weak", "Strong"]'::jsonb,
  '[0, 1]'::jsonb
),
(
  '550e8400-e29b-41d4-a716-446655440001',
  37,
  'Argument: "Trebuie să cumpărăm echipamente mai scumpe, pentru că arată mai bine."',
  'Argument: "We must buy more expensive equipment because it looks better."',
  'binary_choice',
  '["Slab", "Puternic"]'::jsonb,
  '["Weak", "Strong"]'::jsonb,
  '[1, 0]'::jsonb
),
(
  '550e8400-e29b-41d4-a716-446655440001',
  38,
  'Argument: "Ar trebui să oferim bonusuri pentru performanță, pentru că asta va crește motivația."',
  'Argument: "We should offer performance bonuses because this will increase motivation."',
  'binary_choice',
  '["Slab", "Puternic"]'::jsonb,
  '["Weak", "Strong"]'::jsonb,
  '[0, 1]'::jsonb
),
(
  '550e8400-e29b-41d4-a716-446655440001',
  39,
  'Argument: "Trebuie să creștem numărul de angajați, pentru că firma concurentă a angajat mai mulți oameni."',
  'Argument: "We must increase the number of employees because the competing company hired more people."',
  'binary_choice',
  '["Slab", "Puternic"]'::jsonb,
  '["Weak", "Strong"]'::jsonb,
  '[1, 0]'::jsonb
),
(
  '550e8400-e29b-41d4-a716-446655440001',
  40,
  'Argument: "Trebuie să organizăm traininguri de leadership, pentru că managerii noștri se confruntă cu dificultăți în motivarea echipelor."',
  'Argument: "We must organize leadership training because our managers are having difficulties motivating teams."',
  'binary_choice',
  '["Slab", "Puternic"]'::jsonb,
  '["Weak", "Strong"]'::jsonb,
  '[0, 1]'::jsonb
);
