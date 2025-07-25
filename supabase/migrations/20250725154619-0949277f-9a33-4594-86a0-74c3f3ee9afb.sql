
-- Insert the cognitive aptitudes category if it doesn't exist
INSERT INTO test_categories (id, name, description, icon) 
VALUES (
  'a1b2c3d4-e5f6-7890-abcd-ef1234567890',
  'Aptitudini Cognitive',
  'Teste pentru evaluarea capacităților cognitive și de gândire critică',
  'Brain'
) ON CONFLICT (name) DO NOTHING;

-- Insert the Watson-Glaser test type
INSERT INTO test_types (id, name, description, category_id, questions_count, estimated_duration, subscription_required) 
VALUES (
  'wg-test-1234-5678-9abc-def012345678',
  'Watson-Glaser Critical Thinking Appraisal',
  'Test de evaluare a gândirii critice prin 5 dimensiuni: inferențe, asumpții, deducție, interpretarea și evaluarea argumentelor',
  'a1b2c3d4-e5f6-7890-abcd-ef1234567890',
  40,
  35,
  'basic'
);

-- Insert all 40 Watson-Glaser questions
INSERT INTO test_questions (id, test_type_id, question_text_ro, question_text_en, options, options_en, question_order, question_type, scoring_weights) VALUES
-- Secțiunea 1: Inferențe (1-8)
('wg-q001-1234-5678-9abc-def012345678', 'wg-test-1234-5678-9abc-def012345678', 'Compania XYZ a raportat venituri record în acest trimestru. Ce putem concluziona despre performanța companiei?', 'Company XYZ reported record revenues this quarter. What can we conclude about the company performance?', '["Compania este foarte profitabilă", "Compania se dezvoltă rapid", "Probabil adevărat", "Probabil fals", "Date insuficiente"]', '["The company is very profitable", "The company is growing rapidly", "Probably true", "Probably false", "Insufficient data"]', 1, 'multiple_choice', '[0, 0, 0, 0, 1]'),

('wg-q002-1234-5678-9abc-def012345678', 'wg-test-1234-5678-9abc-def012345678', 'Majoritatea angajaților din departamentul IT au plecat în ultimele 6 luni. Managementul nu este eficient în acest departament.', 'Most IT department employees left in the last 6 months. Management is not efficient in this department.', '["Adevărat", "Fals", "Probabil adevărat", "Probabil fals", "Date insuficiente"]', '["True", "False", "Probably true", "Probably false", "Insufficient data"]', 2, 'multiple_choice', '[0, 0, 1, 0, 0]'),

('wg-q003-1234-5678-9abc-def012345678', 'wg-test-1234-5678-9abc-def012345678', 'Vânzările online au crescut cu 200% în pandemie. Magazinele fizice vor dispărea complet în următorii 5 ani.', 'Online sales increased by 200% during the pandemic. Physical stores will disappear completely in the next 5 years.', '["Adevărat", "Fals", "Probabil adevărat", "Probabil fals", "Date insuficiente"]', '["True", "False", "Probably true", "Probably false", "Insufficient data"]', 3, 'multiple_choice', '[0, 0, 0, 1, 0]'),

('wg-q004-1234-5678-9abc-def012345678', 'wg-test-1234-5678-9abc-def012345678', 'Studiul arată că 80% din absolvenți găsesc loc de muncă în primul an. Sistemul educațional pregătește bine studenții pentru piața muncii.', 'The study shows that 80% of graduates find jobs in the first year. The education system prepares students well for the job market.', '["Adevărat", "Fals", "Probabil adevărat", "Probabil fals", "Date insuficiente"]', '["True", "False", "Probably true", "Probably false", "Insufficient data"]', 4, 'multiple_choice', '[0, 0, 1, 0, 0]'),

('wg-q005-1234-5678-9abc-def012345678', 'wg-test-1234-5678-9abc-def012345678', 'Prețul petrolului a scăzut cu 30% în ultima lună. Costul transportului va scădea automat pentru toate companiile.', 'Oil price dropped by 30% in the last month. Transportation costs will automatically decrease for all companies.', '["Adevărat", "Fals", "Probabil adevărat", "Probabil fals", "Date insuficiente"]', '["True", "False", "Probably true", "Probably false", "Insufficient data"]', 5, 'multiple_choice', '[0, 0, 0, 0, 1]'),

('wg-q006-1234-5678-9abc-def012345678', 'wg-test-1234-5678-9abc-def012345678', 'Numărul de aplicații mobile descărcate a crescut cu 40% în această lună. Interesul pentru tehnologie este în creștere constantă.', 'The number of mobile apps downloaded increased by 40% this month. Interest in technology is constantly growing.', '["Adevărat", "Fals", "Probabil adevărat", "Probabil fals", "Date insuficiente"]', '["True", "False", "Probably true", "Probably false", "Insufficient data"]', 6, 'multiple_choice', '[0, 0, 0, 0, 1]'),

('wg-q007-1234-5678-9abc-def012345678', 'wg-test-1234-5678-9abc-def012345678', 'Temperatura medie globală a crescut cu 1.2°C în ultimii 50 de ani. Toate schimbările climatice sunt cauzate de activitatea umană.', 'Global average temperature increased by 1.2°C in the last 50 years. All climate changes are caused by human activity.', '["Adevărat", "Fals", "Probabil adevărat", "Probabil fals", "Date insuficiente"]', '["True", "False", "Probably true", "Probably false", "Insufficient data"]', 7, 'multiple_choice', '[0, 0, 0, 1, 0]'),

('wg-q008-1234-5678-9abc-def012345678', 'wg-test-1234-5678-9abc-def012345678', 'Rata de alfabetizare în țară a ajuns la 98%. Sistemul educațional este foarte eficient.', 'The literacy rate in the country reached 98%. The education system is very efficient.', '["Adevărat", "Fals", "Probabil adevărat", "Probabil fals", "Date insuficiente"]', '["True", "False", "Probably true", "Probably false", "Insufficient data"]', 8, 'multiple_choice', '[0, 0, 1, 0, 0]'),

-- Secțiunea 2: Asumpții (9-16)
('wg-q009-1234-5678-9abc-def012345678', 'wg-test-1234-5678-9abc-def012345678', 'Argumentul: "Trebuie să creștem bugetul pentru marketing digital pentru că tinerii folosesc mai mult internetul." Asumpția: Tinerii sunt segmentul nostru țintă principal.', 'Argument: "We need to increase the digital marketing budget because young people use the internet more." Assumption: Young people are our main target segment.', '["Da", "Nu"]', '["Yes", "No"]', 9, 'multiple_choice', '[1, 0]'),

('wg-q010-1234-5678-9abc-def012345678', 'wg-test-1234-5678-9abc-def012345678', 'Argumentul: "Ar trebui să investim în energie solară pentru că este ecologică." Asumpția: Compania noastră ar trebui să fie responsabilă din punct de vedere ecologic.', 'Argument: "We should invest in solar energy because it is ecological." Assumption: Our company should be environmentally responsible.', '["Da", "Nu"]', '["Yes", "No"]', 10, 'multiple_choice', '[1, 0]'),

('wg-q011-1234-5678-9abc-def012345678', 'wg-test-1234-5678-9abc-def012345678', 'Argumentul: "Angajații care lucrează de acasă sunt mai productivi, deci ar trebui să renunțăm la birou." Asumpția: Productivitatea este singurul criteriu important pentru organizarea muncii.', 'Argument: "Employees working from home are more productive, so we should give up the office." Assumption: Productivity is the only important criterion for work organization.', '["Da", "Nu"]', '["Yes", "No"]', 11, 'multiple_choice', '[0, 1]'),

('wg-q012-1234-5678-9abc-def012345678', 'wg-test-1234-5678-9abc-def012345678', 'Argumentul: "Trebuie să angajăm mai mulți specialiști în AI pentru că tehnologia avansează rapid." Asumpția: Compania noastră trebuie să țină pasul cu dezvoltarea tehnologică.', 'Argument: "We need to hire more AI specialists because technology is advancing rapidly." Assumption: Our company needs to keep up with technological development.', '["Da", "Nu"]', '["Yes", "No"]', 12, 'multiple_choice', '[1, 0]'),

('wg-q013-1234-5678-9abc-def012345678', 'wg-test-1234-5678-9abc-def012345678', 'Argumentul: "Nu ar trebui să cumpărăm echipamente scumpe pentru că prețurile vor scădea anul viitor." Asumpția: Prețurile echipamentelor vor scădea cu siguranță anul viitor.', 'Argument: "We should not buy expensive equipment because prices will drop next year." Assumption: Equipment prices will definitely drop next year.', '["Da", "Nu"]', '["Yes", "No"]', 13, 'multiple_choice', '[0, 1]'),

('wg-q014-1234-5678-9abc-def012345678', 'wg-test-1234-5678-9abc-def012345678', 'Argumentul: "Ar trebui să deschidem un magazin în centrul orașului pentru că traficul de pietoni este mare." Asumpția: Traficul mare de pietoni va genera vânzări mai mari.', 'Argument: "We should open a store in the city center because foot traffic is high." Assumption: High foot traffic will generate higher sales.', '["Da", "Nu"]', '["Yes", "No"]', 14, 'multiple_choice', '[1, 0]'),

('wg-q015-1234-5678-9abc-def012345678', 'wg-test-1234-5678-9abc-def012345678', 'Argumentul: "Ar trebui să reducem prețurile pentru că concurența are prețuri mai mici." Asumpția: Clienții alege întotdeauna produsele cu cele mai mici prețuri.', 'Argument: "We should reduce prices because competitors have lower prices." Assumption: Customers always choose products with the lowest prices.', '["Da", "Nu"]', '["Yes", "No"]', 15, 'multiple_choice', '[0, 1]'),

('wg-q016-1234-5678-9abc-def012345678', 'wg-test-1234-5678-9abc-def012345678', 'Argumentul: "Trebuie să îmbunătățim serviciul clienți pentru că am primit reclamații." Asumpția: Reclamațiile indică probleme reale în serviciul clienți.', 'Argument: "We need to improve customer service because we received complaints." Assumption: Complaints indicate real problems in customer service.', '["Da", "Nu"]', '["Yes", "No"]', 16, 'multiple_choice', '[1, 0]'),

-- Secțiunea 3: Deducție (17-24)
('wg-q017-1234-5678-9abc-def012345678', 'wg-test-1234-5678-9abc-def012345678', 'Premisa: Toți managerii au diploma de facultate. Ion este manager. Concluzia: Ion are diploma de facultate.', 'Premise: All managers have college degrees. Ion is a manager. Conclusion: Ion has a college degree.', '["Urmează logic", "Nu urmează logic"]', '["Follows logically", "Does not follow logically"]', 17, 'multiple_choice', '[1, 0]'),

('wg-q018-1234-5678-9abc-def012345678', 'wg-test-1234-5678-9abc-def012345678', 'Premisa: Dacă o companie investește în cercetare, va inova. Compania X investește în cercetare. Concluzia: Compania X va inova.', 'Premise: If a company invests in research, it will innovate. Company X invests in research. Conclusion: Company X will innovate.', '["Urmează logic", "Nu urmează logic"]', '["Follows logically", "Does not follow logically"]', 18, 'multiple_choice', '[1, 0]'),

('wg-q019-1234-5678-9abc-def012345678', 'wg-test-1234-5678-9abc-def012345678', 'Premisa: Unii angajați lucrează de acasă. Maria este angajat. Concluzia: Maria lucrează de acasă.', 'Premise: Some employees work from home. Maria is an employee. Conclusion: Maria works from home.', '["Urmează logic", "Nu urmează logic"]', '["Follows logically", "Does not follow logically"]', 19, 'multiple_choice', '[0, 1]'),

('wg-q020-1234-5678-9abc-def012345678', 'wg-test-1234-5678-9abc-def012345678', 'Premisa: Toate produsele eco-friendly sunt mai scumpe. Produsul Y este eco-friendly. Concluzia: Produsul Y este mai scump.', 'Premise: All eco-friendly products are more expensive. Product Y is eco-friendly. Conclusion: Product Y is more expensive.', '["Urmează logic", "Nu urmează logic"]', '["Follows logically", "Does not follow logically"]', 20, 'multiple_choice', '[1, 0]'),

('wg-q021-1234-5678-9abc-def012345678', 'wg-test-1234-5678-9abc-def012345678', 'Premisa: Dacă creșterea economică este pozitivă, șomajul scade. Șomajul a crescut. Concluzia: Creșterea economică nu este pozitivă.', 'Premise: If economic growth is positive, unemployment decreases. Unemployment has increased. Conclusion: Economic growth is not positive.', '["Urmează logic", "Nu urmează logic"]', '["Follows logically", "Does not follow logically"]', 21, 'multiple_choice', '[0, 1]'),

('wg-q022-1234-5678-9abc-def012345678', 'wg-test-1234-5678-9abc-def012345678', 'Premisa: Toți experții recomandă diversificarea portofoliului. Ana este expert. Concluzia: Ana recomandă diversificarea portofoliului.', 'Premise: All experts recommend portfolio diversification. Ana is an expert. Conclusion: Ana recommends portfolio diversification.', '["Urmează logic", "Nu urmează logic"]', '["Follows logically", "Does not follow logically"]', 22, 'multiple_choice', '[1, 0]'),

('wg-q023-1234-5678-9abc-def012345678', 'wg-test-1234-5678-9abc-def012345678', 'Premisa: Unele companii tech sunt profitabile. Compania Z este companie tech. Concluzia: Compania Z este profitabilă.', 'Premise: Some tech companies are profitable. Company Z is a tech company. Conclusion: Company Z is profitable.', '["Urmează logic", "Nu urmează logic"]', '["Follows logically", "Does not follow logically"]', 23, 'multiple_choice', '[0, 1]'),

('wg-q024-1234-5678-9abc-def012345678', 'wg-test-1234-5678-9abc-def012345678', 'Premisa: Dacă inflația crește, puterea de cumpărare scade. Puterea de cumpărare a scăzut. Concluzia: Inflația a crescut.', 'Premise: If inflation increases, purchasing power decreases. Purchasing power has decreased. Conclusion: Inflation has increased.', '["Urmează logic", "Nu urmează logic"]', '["Follows logically", "Does not follow logically"]', 24, 'multiple_choice', '[0, 1]'),

-- Secțiunea 4: Interpretarea (25-32)
('wg-q025-1234-5678-9abc-def012345678', 'wg-test-1234-5678-9abc-def012345678', 'Faptele: Vânzările au crescut cu 15% în Q1. Profitul a crescut cu 10%. Concluzia: Compania și-a îmbunătățit eficiența operațională.', 'Facts: Sales increased by 15% in Q1. Profit increased by 10%. Conclusion: The company improved its operational efficiency.', '["Concluzia urmează", "Concluzia nu urmează"]', '["Conclusion follows", "Conclusion does not follow"]', 25, 'multiple_choice', '[1, 0]'),

('wg-q026-1234-5678-9abc-def012345678', 'wg-test-1234-5678-9abc-def012345678', 'Faptele: 60% din angajați au lucrat de acasă în pandemie. Productivitatea a crescut cu 20%. Concluzia: Munca de acasă face angajații mai productivi.', 'Facts: 60% of employees worked from home during the pandemic. Productivity increased by 20%. Conclusion: Working from home makes employees more productive.', '["Concluzia urmează", "Concluzia nu urmează"]', '["Conclusion follows", "Conclusion does not follow"]', 26, 'multiple_choice', '[0, 1]'),

('wg-q027-1234-5678-9abc-def012345678', 'wg-test-1234-5678-9abc-def012345678', 'Faptele: Prețul acțiunilor a scăzut cu 25%. Veniturile companiei au rămas stabile. Concluzia: Investitorii au pierdut încrederea în companie.', 'Facts: Stock price dropped by 25%. Company revenues remained stable. Conclusion: Investors lost confidence in the company.', '["Concluzia urmează", "Concluzia nu urmează"]', '["Conclusion follows", "Conclusion does not follow"]', 27, 'multiple_choice', '[0, 1]'),

('wg-q028-1234-5678-9abc-def012345678', 'wg-test-1234-5678-9abc-def012345678', 'Faptele: Costurile cu materiile prime au crescut cu 30%. Prețul produselor a crescut cu 25%. Concluzia: Marja de profit a scăzut.', 'Facts: Raw material costs increased by 30%. Product prices increased by 25%. Conclusion: Profit margin decreased.', '["Concluzia urmează", "Concluzia nu urmează"]', '["Conclusion follows", "Conclusion does not follow"]', 28, 'multiple_choice', '[1, 0]'),

('wg-q029-1234-5678-9abc-def012345678', 'wg-test-1234-5678-9abc-def012345678', 'Faptele: Numărul de angajați a crescut cu 40%. Productivitatea pe angajat a scăzut cu 15%. Concluzia: Productivitatea totală a crescut.', 'Facts: Number of employees increased by 40%. Productivity per employee decreased by 15%. Conclusion: Total productivity increased.', '["Concluzia urmează", "Concluzia nu urmează"]', '["Conclusion follows", "Conclusion does not follow"]', 29, 'multiple_choice', '[1, 0]'),

('wg-q030-1234-5678-9abc-def012345678', 'wg-test-1234-5678-9abc-def012345678', 'Faptele: Vânzările online au crescut cu 50%. Vânzările în magazin au scăzut cu 30%. Concluzia: Preferințele clienților s-au schimbat către online.', 'Facts: Online sales increased by 50%. In-store sales decreased by 30%. Conclusion: Customer preferences shifted towards online.', '["Concluzia urmează", "Concluzia nu urmează"]', '["Conclusion follows", "Conclusion does not follow"]', 30, 'multiple_choice', '[0, 1]'),

('wg-q031-1234-5678-9abc-def012345678', 'wg-test-1234-5678-9abc-def012345678', 'Faptele: Investițiile în R&D au crescut cu 60%. Numărul de brevete a crescut cu 40%. Concluzia: Investițiile în R&D generează inovație.', 'Facts: R&D investments increased by 60%. Number of patents increased by 40%. Conclusion: R&D investments generate innovation.', '["Concluzia urmează", "Concluzia nu urmează"]', '["Conclusion follows", "Conclusion does not follow"]', 31, 'multiple_choice', '[1, 0]'),

('wg-q032-1234-5678-9abc-def012345678', 'wg-test-1234-5678-9abc-def012345678', 'Faptele: Timpul de răspuns la reclamații a scăzut cu 40%. Satisfacția clienților a crescut cu 25%. Concluzia: Toate problemele de serviciu au fost rezolvate.', 'Facts: Response time to complaints decreased by 40%. Customer satisfaction increased by 25%. Conclusion: All service problems have been resolved.', '["Concluzia urmează", "Concluzia nu urmează"]', '["Conclusion follows", "Conclusion does not follow"]', 32, 'multiple_choice', '[0, 1]'),

-- Secțiunea 5: Evaluarea argumentelor (33-40)
('wg-q033-1234-5678-9abc-def012345678', 'wg-test-1234-5678-9abc-def012345678', 'Întrebarea: Ar trebui companiile să implementeze programe de wellness pentru angajați? Argumentul: Da, pentru că angajații sănătoși sunt mai productivi și au mai puține absențe medicale.', 'Question: Should companies implement wellness programs for employees? Argument: Yes, because healthy employees are more productive and have fewer sick days.', '["Argument puternic", "Argument slab"]', '["Strong argument", "Weak argument"]', 33, 'multiple_choice', '[1, 0]'),

('wg-q034-1234-5678-9abc-def012345678', 'wg-test-1234-5678-9abc-def012345678', 'Întrebarea: Ar trebui să se interzică lucrul în weekend? Argumentul: Da, pentru că weekendul trebuie să fie liber pentru că așa a fost întotdeauna.', 'Question: Should working on weekends be banned? Argument: Yes, because weekends should be free because it has always been so.', '["Argument puternic", "Argument slab"]', '["Strong argument", "Weak argument"]', 34, 'multiple_choice', '[0, 1]'),

('wg-q035-1234-5678-9abc-def012345678', 'wg-test-1234-5678-9abc-def012345678', 'Întrebarea: Ar trebui să se investească mai mult în educația online? Argumentul: Nu, pentru că profesorii tradiționale nu vor fi mulțumiți de această schimbare.', 'Question: Should more be invested in online education? Argument: No, because traditional teachers will not be happy with this change.', '["Argument puternic", "Argument slab"]', '["Strong argument", "Weak argument"]', 35, 'multiple_choice', '[0, 1]'),

('wg-q036-1234-5678-9abc-def012345678', 'wg-test-1234-5678-9abc-def012345678', 'Întrebarea: Ar trebui să se crească taxele pentru companiile care poluează? Argumentul: Da, pentru că taxele vor crea incentive economice pentru reducerea poluării și vor genera fonduri pentru proiecte ecologice.', 'Question: Should taxes be increased for companies that pollute? Argument: Yes, because taxes will create economic incentives to reduce pollution and generate funds for ecological projects.', '["Argument puternic", "Argument slab"]', '["Strong argument", "Weak argument"]', 36, 'multiple_choice', '[1, 0]'),

('wg-q037-1234-5678-9abc-def012345678', 'wg-test-1234-5678-9abc-def012345678', 'Întrebarea: Ar trebui să se automatizeze mai multe procese în fabrici? Argumentul: Nu, pentru că automatizarea este prea complicată pentru majoritatea oamenilor.', 'Question: Should more processes be automated in factories? Argument: No, because automation is too complicated for most people.', '["Argument puternic", "Argument slab"]', '["Strong argument", "Weak argument"]', 37, 'multiple_choice', '[0, 1]'),

('wg-q038-1234-5678-9abc-def012345678', 'wg-test-1234-5678-9abc-def012345678', 'Întrebarea: Ar trebui să se introducă un salariu minim universal? Argumentul: Da, pentru că ar reduce inegalitatea socială și ar oferi siguranță economică de bază tuturor cetățenilor.', 'Question: Should a universal minimum wage be introduced? Argument: Yes, because it would reduce social inequality and provide basic economic security for all citizens.', '["Argument puternic", "Argument slab"]', '["Strong argument", "Weak argument"]', 38, 'multiple_choice', '[1, 0]'),

('wg-q039-1234-5678-9abc-def012345678', 'wg-test-1234-5678-9abc-def012345678', 'Întrebarea: Ar trebui să se interzică reclamele la produse nesănătoase? Argumentul: Da, pentru că reclamele sunt oricum iritante și nimeni nu le place.', 'Question: Should advertising for unhealthy products be banned? Argument: Yes, because advertisements are annoying anyway and nobody likes them.', '["Argument puternic", "Argument slab"]', '["Strong argument", "Weak argument"]', 39, 'multiple_choice', '[0, 1]'),

('wg-q040-1234-5678-9abc-def012345678', 'wg-test-1234-5678-9abc-def012345678', 'Întrebarea: Ar trebui să se investească mai mult în transportul public? Argumentul: Da, pentru că transportul public eficient reduce traficul, poluarea și costurile pentru cetățeni.', 'Question: Should more be invested in public transportation? Argument: Yes, because efficient public transportation reduces traffic, pollution, and costs for citizens.', '["Argument puternic", "Argument slab"]', '["Strong argument", "Weak argument"]', 40, 'multiple_choice', '[1, 0]');
