
-- Insert Watson-Glaser Critical Thinking Test with correct category ID
INSERT INTO public.test_types (
  id,
  name, 
  description,
  category_id,
  questions_count,
  estimated_duration,
  subscription_required
) VALUES (
  'e8f9a0b1-c2d3-4e5f-6789-0a1b2c3d4e5f',
  'Watson-Glaser Critical Thinking Appraisal',
  'Evaluează capacitatea de gândire critică prin cinci dimensiuni: inferențe, asumpții, deducție, interpretare și evaluarea argumentelor.',
  '13f9d37c-2a3b-4e55-8707-e0372b3b2581', -- Real ID for "Aptitudini Cognitive"
  40,
  25,
  'basic'
) ON CONFLICT (id) DO NOTHING;

-- Insert Watson-Glaser test questions
INSERT INTO public.test_questions (
  id,
  test_type_id,
  question_text_ro,
  question_text_en,
  question_order,
  question_type,
  options,
  options_en
) VALUES
-- Inference questions (1-8)
('wg-q001', 'e8f9a0b1-c2d3-4e5f-6789-0a1b2c3d4e5f', 'O companie a raportat o creștere a profitului cu 15% în ultimul trimestru comparativ cu perioada similară din anul anterior.', 'A company reported a 15% profit increase in the last quarter compared to the same period last year.', 1, 'multiple_choice', '["Probabil adevărat", "Insuficient de probabil", "Probabil fals", "Definitiv adevărat", "Definitiv fals"]', '["Probably true", "Insufficient probability", "Probably false", "Definitely true", "Definitely false"]'),

('wg-q002', 'e8f9a0b1-c2d3-4e5f-6789-0a1b2c3d4e5f', 'Din afirmația anterioară: Compania a avut performanțe mai bune decât în anul precedent.', 'From the previous statement: The company performed better than in the previous year.', 2, 'multiple_choice', '["Probabil adevărat", "Insuficient de probabil", "Probabil fals", "Definitiv adevărat", "Definitiv fals"]', '["Probably true", "Insufficient probability", "Probably false", "Definitely true", "Definitely false"]'),

('wg-q003', 'e8f9a0b1-c2d3-4e5f-6789-0a1b2c3d4e5f', 'Studiile arată că persoanele care citesc regulat au un vocabular mai bogat decât cele care nu citesc.', 'Studies show that people who read regularly have a richer vocabulary than those who do not read.', 3, 'multiple_choice', '["Probabil adevărat", "Insuficient de probabil", "Probabil fals", "Definitiv adevărat", "Definitiv fals"]', '["Probably true", "Insufficient probability", "Probably false", "Definitely true", "Definitely false"]'),

('wg-q004', 'e8f9a0b1-c2d3-4e5f-6789-0a1b2c3d4e5f', 'Din afirmația anterioară: Cititul îmbunătățește abilitățile de comunicare.', 'From the previous statement: Reading improves communication skills.', 4, 'multiple_choice', '["Probabil adevărat", "Insuficient de probabil", "Probabil fals", "Definitiv adevărat", "Definitiv fals"]', '["Probably true", "Insufficient probability", "Probably false", "Definitely true", "Definitely false"]'),

('wg-q005', 'e8f9a0b1-c2d3-4e5f-6789-0a1b2c3d4e5f', 'Într-un sondaj efectuat pe 1000 de persoane, 68% au declarat că preferă să lucreze de acasă.', 'In a survey of 1000 people, 68% said they prefer to work from home.', 5, 'multiple_choice', '["Probabil adevărat", "Insuficient de probabil", "Probabil fals", "Definitiv adevărat", "Definitiv fals"]', '["Probably true", "Insufficient probability", "Probably false", "Definitely true", "Definitely false"]'),

('wg-q006', 'e8f9a0b1-c2d3-4e5f-6789-0a1b2c3d4e5f', 'Din afirmația anterioară: Majoritatea oamenilor sunt mai productivi când lucrează de acasă.', 'From the previous statement: Most people are more productive when working from home.', 6, 'multiple_choice', '["Probabil adevărat", "Insuficient de probabil", "Probabil fals", "Definitiv adevărat", "Definitiv fals"]', '["Probably true", "Insufficient probability", "Probably false", "Definitely true", "Definitely false"]'),

('wg-q007', 'e8f9a0b1-c2d3-4e5f-6789-0a1b2c3d4e5f', 'Temperaturile medii globale au crescut cu 1.1°C în ultimii 100 de ani.', 'Global average temperatures have increased by 1.1°C over the past 100 years.', 7, 'multiple_choice', '["Probabil adevărat", "Insuficient de probabil", "Probabil fals", "Definitiv adevărat", "Definitiv fals"]', '["Probably true", "Insufficient probability", "Probably false", "Definitely true", "Definitely false"]'),

('wg-q008', 'e8f9a0b1-c2d3-4e5f-6789-0a1b2c3d4e5f', 'Din afirmația anterioară: Schimbările climatice sunt cauzate exclusiv de activitatea umană.', 'From the previous statement: Climate change is caused exclusively by human activity.', 8, 'multiple_choice', '["Probabil adevărat", "Insuficient de probabil", "Probabil fals", "Definitiv adevărat", "Definitiv fals"]', '["Probably true", "Insufficient probability", "Probably false", "Definitely true", "Definitely false"]'),

-- Assumptions questions (9-16)
('wg-q009', 'e8f9a0b1-c2d3-4e5f-6789-0a1b2c3d4e5f', 'Pentru a avea succes în afaceri, trebuie să investești mult timp și efort. Asumpția: Succesul în afaceri necesită sacrificii personale.', 'To succeed in business, you must invest a lot of time and effort. Assumption: Success in business requires personal sacrifices.', 9, 'binary_choice', '["Asumpție făcută", "Asumpție nu este făcută"]', '["Assumption made", "Assumption not made"]'),

('wg-q010', 'e8f9a0b1-c2d3-4e5f-6789-0a1b2c3d4e5f', 'Toți elevii ar trebui să învețe o limbă străină în școala primară. Asumpția: Învățarea limbilor străine este benefică pentru dezvoltarea cognitiva.', 'All students should learn a foreign language in elementary school. Assumption: Learning foreign languages is beneficial for cognitive development.', 10, 'binary_choice', '["Asumpție făcută", "Asumpție nu este făcută"]', '["Assumption made", "Assumption not made"]'),

('wg-q011', 'e8f9a0b1-c2d3-4e5f-6789-0a1b2c3d4e5f', 'Companiile ar trebui să ofere mai multe facilități pentru echilibrul între muncă și viața personală. Asumpția: Angajații valorează echilibrul între muncă și viața personală.', 'Companies should offer more work-life balance benefits. Assumption: Employees value work-life balance.', 11, 'binary_choice', '["Asumpție făcută", "Asumpție nu este făcută"]', '["Assumption made", "Assumption not made"]'),

('wg-q012', 'e8f9a0b1-c2d3-4e5f-6789-0a1b2c3d4e5f', 'Transportul public ar trebui să fie gratuit pentru toți cetățenii. Asumpția: Transportul public gratuit va reduce traficul.', 'Public transportation should be free for all citizens. Assumption: Free public transportation will reduce traffic.', 12, 'binary_choice', '["Asumpție făcută", "Asumpție nu este făcută"]', '["Assumption made", "Assumption not made"]'),

('wg-q013', 'e8f9a0b1-c2d3-4e5f-6789-0a1b2c3d4e5f', 'Educația online poate înlocui educația tradițională în multe domenii. Asumpția: Studenții pot învăța la fel de eficient online ca în persoană.', 'Online education can replace traditional education in many fields. Assumption: Students can learn as effectively online as in person.', 13, 'binary_choice', '["Asumpție făcută", "Asumpție nu este făcută"]', '["Assumption made", "Assumption not made"]'),

('wg-q014', 'e8f9a0b1-c2d3-4e5f-6789-0a1b2c3d4e5f', 'Guvernul ar trebui să investească mai mult în cercetarea științifică. Asumpția: Cercetarea științifică contribuie la progresul societății.', 'The government should invest more in scientific research. Assumption: Scientific research contributes to societal progress.', 14, 'binary_choice', '["Asumpție făcută", "Asumpție nu este făcută"]', '["Assumption made", "Assumption not made"]'),

('wg-q015', 'e8f9a0b1-c2d3-4e5f-6789-0a1b2c3d4e5f', 'Oamenii ar trebui să consume mai puține produse de origine animală pentru mediu. Asumpția: Producția de carne are un impact negativ asupra mediului.', 'People should consume fewer animal products for the environment. Assumption: Meat production has a negative environmental impact.', 15, 'binary_choice', '["Asumpție făcută", "Asumpție nu este făcută"]', '["Assumption made", "Assumption not made"]'),

('wg-q016', 'e8f9a0b1-c2d3-4e5f-6789-0a1b2c3d4e5f', 'Companiile de tehnologie ar trebui să fie reglementate mai strict. Asumpția: Reglementarea va proteja interesele consumatorilor.', 'Technology companies should be more strictly regulated. Assumption: Regulation will protect consumer interests.', 16, 'binary_choice', '["Asumpție făcută", "Asumpție nu este făcută"]', '["Assumption made", "Assumption not made"]'),

-- Deduction questions (17-24)
('wg-q017', 'e8f9a0b1-c2d3-4e5f-6789-0a1b2c3d4e5f', 'Toți managerii sunt lideri. Ion este manager. Prin urmare: Ion este lider.', 'All managers are leaders. Ion is a manager. Therefore: Ion is a leader.', 17, 'binary_choice', '["Concluzia urmează", "Concluzia nu urmează"]', '["Conclusion follows", "Conclusion does not follow"]'),

('wg-q018', 'e8f9a0b1-c2d3-4e5f-6789-0a1b2c3d4e5f', 'Unii sportivi sunt vegetarieni. Maria este sportivă. Prin urmare: Maria este vegetariană.', 'Some athletes are vegetarians. Maria is an athlete. Therefore: Maria is a vegetarian.', 18, 'binary_choice', '["Concluzia urmează", "Concluzia nu urmează"]', '["Conclusion follows", "Conclusion does not follow"]'),

('wg-q019', 'e8f9a0b1-c2d3-4e5f-6789-0a1b2c3d4e5f', 'Toate păsările au aripi. Pinguinii sunt păsări. Prin urmare: Pinguinii au aripi.', 'All birds have wings. Penguins are birds. Therefore: Penguins have wings.', 19, 'binary_choice', '["Concluzia urmează", "Concluzia nu urmează"]', '["Conclusion follows", "Conclusion does not follow"]'),

('wg-q020', 'e8f9a0b1-c2d3-4e5f-6789-0a1b2c3d4e5f', 'Niciunul dintre studenții de la medicină nu lucrează ca șofer de taxi. Paul lucrează ca șofer de taxi. Prin urmare: Paul nu este student la medicină.', 'None of the medical students work as taxi drivers. Paul works as a taxi driver. Therefore: Paul is not a medical student.', 20, 'binary_choice', '["Concluzia urmează", "Concluzia nu urmează"]', '["Conclusion follows", "Conclusion does not follow"]'),

('wg-q021', 'e8f9a0b1-c2d3-4e5f-6789-0a1b2c3d4e5f', 'Toate plantele au nevoie de lumină pentru fotosinteză. Ciupercile nu fac fotosinteză. Prin urmare: Ciupercile nu sunt plante.', 'All plants need light for photosynthesis. Mushrooms do not photosynthesize. Therefore: Mushrooms are not plants.', 21, 'binary_choice', '["Concluzia urmează", "Concluzia nu urmează"]', '["Conclusion follows", "Conclusion does not follow"]'),

('wg-q022', 'e8f9a0b1-c2d3-4e5f-6789-0a1b2c3d4e5f', 'Unii oameni bogați sunt nefericiți. Toți oamenii nefericiți au probleme. Prin urmare: Unii oameni bogați au probleme.', 'Some rich people are unhappy. All unhappy people have problems. Therefore: Some rich people have problems.', 22, 'binary_choice', '["Concluzia urmează", "Concluzia nu urmează"]', '["Conclusion follows", "Conclusion does not follow"]'),

('wg-q023', 'e8f9a0b1-c2d3-4e5f-6789-0a1b2c3d4e5f', 'Toți computerele moderne au procesoare. Această mașină de calcul nu are procesor. Prin urmare: Această mașină de calcul nu este un computer modern.', 'All modern computers have processors. This computing machine has no processor. Therefore: This computing machine is not a modern computer.', 23, 'binary_choice', '["Concluzia urmează", "Concluzia nu urmează"]', '["Conclusion follows", "Conclusion does not follow"]'),

('wg-q024', 'e8f9a0b1-c2d3-4e5f-6789-0a1b2c3d4e5f', 'Niciunul dintre profesioniștii IT nu lucrează în agricultură. Ana lucrează în IT. Prin urmare: Ana nu lucrează în agricultură.', 'None of the IT professionals work in agriculture. Ana works in IT. Therefore: Ana does not work in agriculture.', 24, 'binary_choice', '["Concluzia urmează", "Concluzia nu urmează"]', '["Conclusion follows", "Conclusion does not follow"]'),

-- Interpretation questions (25-32)
('wg-q025', 'e8f9a0b1-c2d3-4e5f-6789-0a1b2c3d4e5f', 'Un studiu arată că 70% dintre absolvenții unei universități găsesc de lucru în primul an după absolvire. Interpretarea: Universitatea oferă o educație de calitate.', 'A study shows that 70% of university graduates find jobs within the first year after graduation. Interpretation: The university provides quality education.', 25, 'binary_choice', '["Interpretarea urmează", "Interpretarea nu urmează"]', '["Interpretation follows", "Interpretation does not follow"]'),

('wg-q026', 'e8f9a0b1-c2d3-4e5f-6789-0a1b2c3d4e5f', 'Vânzările de biciclete au crescut cu 30% în ultimul an în orașul X. Interpretarea: Oamenii din orașul X au devenit mai conștienți de mediu.', 'Bicycle sales increased by 30% in city X last year. Interpretation: People in city X have become more environmentally conscious.', 26, 'binary_choice', '["Interpretarea urmează", "Interpretarea nu urmează"]', '["Interpretation follows", "Interpretation does not follow"]'),

('wg-q027', 'e8f9a0b1-c2d3-4e5f-6789-0a1b2c3d4e5f', 'O companie a redus cu 20% numărul de angajați și a menținut același nivel de producție. Interpretarea: Eficiența companiei a crescut.', 'A company reduced its workforce by 20% and maintained the same production level. Interpretation: The company\'s efficiency has increased.', 27, 'binary_choice', '["Interpretarea urmează", "Interpretarea nu urmează"]', '["Interpretation follows", "Interpretation does not follow"]'),

('wg-q028', 'e8f9a0b1-c2d3-4e5f-6789-0a1b2c3d4e5f', 'Numărul de accidente rutiere a scăzut cu 15% după instalarea camerelor de supraveghere. Interpretarea: Camerele de supraveghere descurajează comportamentul imprudent.', 'Road accidents decreased by 15% after installing surveillance cameras. Interpretation: Surveillance cameras discourage reckless behavior.', 28, 'binary_choice', '["Interpretarea urmează", "Interpretarea nu urmează"]', '["Interpretation follows", "Interpretation does not follow"]'),

('wg-q029', 'e8f9a0b1-c2d3-4e5f-6789-0a1b2c3d4e5f', 'Un restaurant a introdus meniul vegetarian și a observat o creștere a numărului de clienți cu 25%. Interpretarea: Clientii preferă opțiunile vegetariene.', 'A restaurant introduced a vegetarian menu and saw a 25% increase in customers. Interpretation: Customers prefer vegetarian options.', 29, 'binary_choice', '["Interpretarea urmează", "Interpretarea nu urmează"]', '["Interpretation follows", "Interpretation does not follow"]'),

('wg-q030', 'e8f9a0b1-c2d3-4e5f-6789-0a1b2c3d4e5f', 'Scorul mediu la matematică al elevilor dintr-o școală a crescut cu 10 puncte după introducerea unui nou program. Interpretarea: Noul program de matematică este eficient.', 'Students\' average math scores at a school increased by 10 points after introducing a new program. Interpretation: The new math program is effective.', 30, 'binary_choice', '["Interpretarea urmează", "Interpretarea nu urmează"]', '["Interpretation follows", "Interpretation does not follow"]'),

('wg-q031', 'e8f9a0b1-c2d3-4e5f-6789-0a1b2c3d4e5f', 'O companie de software a lansat o nouă aplicație și a înregistrat 100.000 de descărcări în prima săptămână. Interpretarea: Aplicația răspunde unei nevoi reale a utilizatorilor.', 'A software company launched a new app and recorded 100,000 downloads in the first week. Interpretation: The app addresses a real user need.', 31, 'binary_choice', '["Interpretarea urmează", "Interpretarea nu urmează"]', '["Interpretation follows", "Interpretation does not follow"]'),

('wg-q032', 'e8f9a0b1-c2d3-4e5f-6789-0a1b2c3d4e5f', 'Numărul de vizitatori într-un muzeu a scăzut cu 40% în timpul pandemiei. Interpretarea: Oamenii au pierdut interesul pentru cultură.', 'Museum visitors decreased by 40% during the pandemic. Interpretation: People have lost interest in culture.', 32, 'binary_choice', '["Interpretarea urmează", "Interpretarea nu urmează"]', '["Interpretation follows", "Interpretation does not follow"]'),

-- Argument Evaluation questions (33-40)
('wg-q033', 'e8f9a0b1-c2d3-4e5f-6789-0a1b2c3d4e5f', 'Argument: Educația gratuită ar trebui să fie disponibilă pentru toți pentru că aceasta reduce inegalitățile sociale. Evaluare: Acest argument este puternic.', 'Argument: Free education should be available to everyone because it reduces social inequalities. Evaluation: This argument is strong.', 33, 'binary_choice', '["Argument puternic", "Argument slab"]', '["Strong argument", "Weak argument"]'),

('wg-q034', 'e8f9a0b1-c2d3-4e5f-6789-0a1b2c3d4e5f', 'Argument: Ar trebui să interzică fumatul în parcuri pentru că mie nu-mi place mirosul de țigară. Evaluare: Acest argument este slab.', 'Argument: Smoking should be banned in parks because I don\'t like the smell of cigarettes. Evaluation: This argument is weak.', 34, 'binary_choice', '["Argument puternic", "Argument slab"]', '["Strong argument", "Weak argument"]'),

('wg-q035', 'e8f9a0b1-c2d3-4e5f-6789-0a1b2c3d4e5f', 'Argument: Energia regenerabilă ar trebui promovată pentru că reduce dependența de combustibilii fosili și protejează mediul. Evaluare: Acest argument este puternic.', 'Argument: Renewable energy should be promoted because it reduces dependence on fossil fuels and protects the environment. Evaluation: This argument is strong.', 35, 'binary_choice', '["Argument puternic", "Argument slab"]', '["Strong argument", "Weak argument"]'),

('wg-q036', 'e8f9a0b1-c2d3-4e5f-6789-0a1b2c3d4e5f', 'Argument: Nu ar trebui să cumpărăm produse din China pentru că toate sunt de calitate proastă. Evaluare: Acest argument este slab.', 'Argument: We should not buy products from China because they are all of poor quality. Evaluation: This argument is weak.', 36, 'binary_choice', '["Argument puternic", "Argument slab"]', '["Strong argument", "Weak argument"]'),

('wg-q037', 'e8f9a0b1-c2d3-4e5f-6789-0a1b2c3d4e5f', 'Argument: Vaccinarea ar trebui să fie obligatorie în școli pentru că protejează sănătatea publică și previne epidemiile. Evaluare: Acest argument este puternic.', 'Argument: Vaccination should be mandatory in schools because it protects public health and prevents epidemics. Evaluation: This argument is strong.', 37, 'binary_choice', '["Argument puternic", "Argument slab"]', '["Strong argument", "Weak argument"]'),

('wg-q038', 'e8f9a0b1-c2d3-4e5f-6789-0a1b2c3d4e5f', 'Argument: Ar trebui să mâncăm doar fructe pentru că sunt naturale. Evaluare: Acest argument este slab.', 'Argument: We should only eat fruits because they are natural. Evaluation: This argument is weak.', 38, 'binary_choice', '["Argument puternic", "Argument slab"]', '["Strong argument", "Weak argument"]'),

('wg-q039', 'e8f9a0b1-c2d3-4e5f-6789-0a1b2c3d4e5f', 'Argument: Creșterea salariului minim ar ajuta lucrătorii cu venituri mici să-și acopere costurile de trai în creștere. Evaluare: Acest argument este puternic.', 'Argument: Raising the minimum wage would help low-income workers cover rising living costs. Evaluation: This argument is strong.', 39, 'binary_choice', '["Argument puternic", "Argument slab"]', '["Strong argument", "Weak argument"]'),

('wg-q040', 'e8f9a0b1-c2d3-4e5f-6789-0a1b2c3d4e5f', 'Argument: Ar trebui să votez cu partidul X pentru că bunicul meu întotdeauna a votat cu ei. Evaluare: Acest argument este slab.', 'Argument: I should vote for party X because my grandfather always voted for them. Evaluation: This argument is weak.', 40, 'binary_choice', '["Argument puternic", "Argument slab"]', '["Strong argument", "Weak argument"]')

ON CONFLICT (id) DO NOTHING;
