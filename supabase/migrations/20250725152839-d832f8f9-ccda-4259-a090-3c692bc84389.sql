
-- Adăugarea testului Watson-Glaser în tabelul test_types
INSERT INTO test_types (
  id,
  name,
  description,
  category_id,
  questions_count,
  estimated_duration,
  subscription_required
) VALUES (
  'watson-glaser-critical-thinking',
  'Watson-Glaser Critical Thinking Appraisal',
  'Testul Watson-Glaser evaluează 5 dimensiuni ale gândirii critice: inferențe, asumpții, deducție, interpretare și evaluarea argumentelor prin 40 de întrebări structurate.',
  (SELECT id FROM test_categories WHERE name ILIKE '%cognitive%' OR name ILIKE '%cognitiv%' LIMIT 1),
  40,
  35,
  'basic'
);

-- Adăugarea întrebărilor Watson-Glaser în tabelul test_questions
-- Secțiunea 1: Inferențe (1-8)
INSERT INTO test_questions (
  id, test_type_id, question_order, question_text_ro, question_text_en, 
  options, options_en, question_type, scoring_weights
) VALUES 
(
  'watson-glaser-1', 'watson-glaser-critical-thinking', 1,
  'O companie a raportat o creștere a profitului cu 15% în ultimul trimestru comparativ cu același trimestru din anul precedent. Concluzia: Compania are o strategie de afaceri mai eficientă decât anul trecut.',
  'A company reported a 15% increase in profit in the last quarter compared to the same quarter last year. Conclusion: The company has a more efficient business strategy than last year.',
  '["Adevărat", "Fals", "Probabil adevărat", "Probabil fals", "Date insuficiente"]',
  '["True", "False", "Probably true", "Probably false", "Insufficient data"]',
  'multiple_choice',
  '{"correct_answer": 4, "section": "inferences"}'
),
(
  'watson-glaser-2', 'watson-glaser-critical-thinking', 2,
  'Studiile arată că oamenii care citesc regulat au un vocabular mai bogat decât cei care nu citesc. Concluzia: Cititul regulat îmbunătățește vocabularul unei persoane.',
  'Studies show that people who read regularly have a richer vocabulary than those who don''t read. Conclusion: Regular reading improves a person''s vocabulary.',
  '["Adevărat", "Fals", "Probabil adevărat", "Probabil fals", "Date insuficiente"]',
  '["True", "False", "Probably true", "Probably false", "Insufficient data"]',
  'multiple_choice',
  '{"correct_answer": 2, "section": "inferences"}'
),
(
  'watson-glaser-3', 'watson-glaser-critical-thinking', 3,
  'În ultimii 5 ani, numărul accidentelor rutiere a scăzut cu 20%. Concluzia: Șoferii au devenit mai precauți.',
  'In the last 5 years, the number of traffic accidents has decreased by 20%. Conclusion: Drivers have become more cautious.',
  '["Adevărat", "Fals", "Probabil adevărat", "Probabil fals", "Date insuficiente"]',
  '["True", "False", "Probably true", "Probably false", "Insufficient data"]',
  'multiple_choice',
  '{"correct_answer": 3, "section": "inferences"}'
),
(
  'watson-glaser-4', 'watson-glaser-critical-thinking', 4,
  'Compania X a lansat un nou produs și vânzările au crescut cu 30%. Concluzia: Noul produs este responsabil pentru creșterea vânzărilor.',
  'Company X launched a new product and sales increased by 30%. Conclusion: The new product is responsible for the sales increase.',
  '["Adevărat", "Fals", "Probabil adevărat", "Probabil fals", "Date insuficiente"]',
  '["True", "False", "Probably true", "Probably false", "Insufficient data"]',
  'multiple_choice',
  '{"correct_answer": 2, "section": "inferences"}'
),
(
  'watson-glaser-5', 'watson-glaser-critical-thinking', 5,
  'Temperatura globală a crescut cu 1°C în ultimii 100 de ani. Concluzia: Activitățile umane sunt cauza principală a încălzirii globale.',
  'Global temperature has increased by 1°C in the last 100 years. Conclusion: Human activities are the main cause of global warming.',
  '["Adevărat", "Fals", "Probabil adevărat", "Probabil fals", "Date insuficiente"]',
  '["True", "False", "Probably true", "Probably false", "Insufficient data"]',
  'multiple_choice',
  '{"correct_answer": 4, "section": "inferences"}'
),
(
  'watson-glaser-6', 'watson-glaser-critical-thinking', 6,
  'Un restaurant a început să folosească ingrediente biologice și numărul clienților a crescut. Concluzia: Clienții preferă mâncarea biologică.',
  'A restaurant started using organic ingredients and the number of customers increased. Conclusion: Customers prefer organic food.',
  '["Adevărat", "Fals", "Probabil adevărat", "Probabil fals", "Date insuficiente"]',
  '["True", "False", "Probably true", "Probably false", "Insufficient data"]',
  'multiple_choice',
  '{"correct_answer": 4, "section": "inferences"}'
),
(
  'watson-glaser-7', 'watson-glaser-critical-thinking', 7,
  'Studiile indică că exercițiile fizice regulate reduc riscul de boli cardiace. Concluzia: Oamenii care fac sport zilnic nu vor avea probleme cardiace.',
  'Studies indicate that regular physical exercise reduces the risk of heart disease. Conclusion: People who exercise daily will not have heart problems.',
  '["Adevărat", "Fals", "Probabil adevărat", "Probabil fals", "Date insuficiente"]',
  '["True", "False", "Probably true", "Probably false", "Insufficient data"]',
  'multiple_choice',
  '{"correct_answer": 3, "section": "inferences"}'
),
(
  'watson-glaser-8', 'watson-glaser-critical-thinking', 8,
  'O școală a introdus cursuri de programare și rata de absolvire a crescut cu 10%. Concluzia: Cursurile de programare îmbunătățesc performanța academică.',
  'A school introduced programming courses and the graduation rate increased by 10%. Conclusion: Programming courses improve academic performance.',
  '["Adevărat", "Fals", "Probabil adevărat", "Probabil fals", "Date insuficiente"]',
  '["True", "False", "Probably true", "Probably false", "Insufficient data"]',
  'multiple_choice',
  '{"correct_answer": 2, "section": "inferences"}'
),

-- Secțiunea 2: Asumpții (9-16)
(
  'watson-glaser-9', 'watson-glaser-critical-thinking', 9,
  'Afirmația: "Trebuie să reducem prețurile pentru a fi competitivi." Asumpția: Concurenții au prețuri mai mici.',
  'Statement: "We must reduce prices to be competitive." Assumption: Competitors have lower prices.',
  '["Da", "Nu"]',
  '["Yes", "No"]',
  'multiple_choice',
  '{"correct_answer": 0, "section": "assumptions"}'
),
(
  'watson-glaser-10', 'watson-glaser-critical-thinking', 10,
  'Afirmația: "Să lansăm o campanie publicitară pentru a crește vânzările." Asumpția: Publicitatea va influența comportamentul consumatorilor.',
  'Statement: "Let''s launch an advertising campaign to increase sales." Assumption: Advertising will influence consumer behavior.',
  '["Da", "Nu"]',
  '["Yes", "No"]',
  'multiple_choice',
  '{"correct_answer": 0, "section": "assumptions"}'
),
(
  'watson-glaser-11', 'watson-glaser-critical-thinking', 11,
  'Afirmația: "Angajații vor fi mai productivi dacă lucrează de acasă." Asumpția: Toți angajații au spațiul necesar pentru a lucra eficient de acasă.',
  'Statement: "Employees will be more productive if they work from home." Assumption: All employees have the necessary space to work efficiently from home.',
  '["Da", "Nu"]',
  '["Yes", "No"]',
  'multiple_choice',
  '{"correct_answer": 1, "section": "assumptions"}'
),
(
  'watson-glaser-12', 'watson-glaser-critical-thinking', 12,
  'Afirmația: "Trebuie să investim mai mult în tehnologie pentru a îmbunătăți eficiența." Asumpția: Tehnologia actuală nu este suficientă.',
  'Statement: "We need to invest more in technology to improve efficiency." Assumption: Current technology is not sufficient.',
  '["Da", "Nu"]',
  '["Yes", "No"]',
  'multiple_choice',
  '{"correct_answer": 0, "section": "assumptions"}'
),
(
  'watson-glaser-13', 'watson-glaser-critical-thinking', 13,
  'Afirmația: "Să organizăm o sesiune de team building pentru a îmbunătăți colaborarea." Asumpția: Toate echipele au probleme de colaborare.',
  'Statement: "Let''s organize a team building session to improve collaboration." Assumption: All teams have collaboration problems.',
  '["Da", "Nu"]',
  '["Yes", "No"]',
  'multiple_choice',
  '{"correct_answer": 1, "section": "assumptions"}'
),
(
  'watson-glaser-14', 'watson-glaser-critical-thinking', 14,
  'Afirmația: "Să oferim cursuri de formare profesională angajaților." Asumpția: Angajații vor să își dezvolte competențele.',
  'Statement: "Let''s offer professional training courses to employees." Assumption: Employees want to develop their skills.',
  '["Da", "Nu"]',
  '["Yes", "No"]',
  'multiple_choice',
  '{"correct_answer": 0, "section": "assumptions"}'
),
(
  'watson-glaser-15', 'watson-glaser-critical-thinking', 15,
  'Afirmația: "Să implementăm un sistem de bonusuri pentru performanță." Asumpția: Banii sunt singura motivație pentru angajați.',
  'Statement: "Let''s implement a performance bonus system." Assumption: Money is the only motivation for employees.',
  '["Da", "Nu"]',
  '["Yes", "No"]',
  'multiple_choice',
  '{"correct_answer": 1, "section": "assumptions"}'
),
(
  'watson-glaser-16', 'watson-glaser-critical-thinking', 16,
  'Afirmația: "Să deschidем o nouă filială în alt oraș." Asumpția: Există cerere pentru serviciile noastre în acel oraș.',
  'Statement: "Let''s open a new branch in another city." Assumption: There is demand for our services in that city.',
  '["Da", "Nu"]',
  '["Yes", "No"]',
  'multiple_choice',
  '{"correct_answer": 0, "section": "assumptions"}'
),

-- Secțiunea 3: Deducție (17-24)
(
  'watson-glaser-17', 'watson-glaser-critical-thinking', 17,
  'Premisele: Toate păsările au pene. Struții sunt păsări. Concluzia: Struții au pene.',
  'Premises: All birds have feathers. Ostriches are birds. Conclusion: Ostriches have feathers.',
  '["Urmează logic", "Nu urmează logic"]',
  '["Follows logically", "Does not follow logically"]',
  'multiple_choice',
  '{"correct_answer": 0, "section": "deduction"}'
),
(
  'watson-glaser-18', 'watson-glaser-critical-thinking', 18,
  'Premisele: Unii manageri sunt ingineri. Toți inginerii au diplomă de facultate. Concluzia: Unii manageri au diplomă de facultate.',
  'Premises: Some managers are engineers. All engineers have university degrees. Conclusion: Some managers have university degrees.',
  '["Urmează logic", "Nu urmează logic"]',
  '["Follows logically", "Does not follow logically"]',
  'multiple_choice',
  '{"correct_answer": 0, "section": "deduction"}'
),
(
  'watson-glaser-19', 'watson-glaser-critical-thinking', 19,
  'Premisele: Toți angajații cu performanță ridicată primesc bonusuri. Maria primește bonusuri. Concluzia: Maria are performanță ridicată.',
  'Premises: All high-performing employees receive bonuses. Maria receives bonuses. Conclusion: Maria has high performance.',
  '["Urmează logic", "Nu urmează logic"]',
  '["Follows logically", "Does not follow logically"]',
  'multiple_choice',
  '{"correct_answer": 1, "section": "deduction"}'
),
(
  'watson-glaser-20', 'watson-glaser-critical-thinking', 20,
  'Premisele: Nimeni care nu are experiență nu poate fi manager. Andrei este manager. Concluzia: Andrei are experiență.',
  'Premises: No one without experience can be a manager. Andrei is a manager. Conclusion: Andrei has experience.',
  '["Urmează logic", "Nu urmează logic"]',
  '["Follows logically", "Does not follow logically"]',
  'multiple_choice',
  '{"correct_answer": 0, "section": "deduction"}'
),
(
  'watson-glaser-21', 'watson-glaser-critical-thinking', 21,
  'Premisele: Toate produsele de calitate sunt scumpe. Acest produs este scump. Concluzia: Acest produs este de calitate.',
  'Premises: All quality products are expensive. This product is expensive. Conclusion: This product is quality.',
  '["Urmează logic", "Nu urmează logic"]',
  '["Follows logically", "Does not follow logically"]',
  'multiple_choice',
  '{"correct_answer": 1, "section": "deduction"}'
),
(
  'watson-glaser-22', 'watson-glaser-critical-thinking', 22,
  'Premisele: Unii clienți sunt nemulțumiți. Toți clienții nemulțumiți fac reclamații. Concluzia: Unii clienți fac reclamații.',
  'Premises: Some customers are dissatisfied. All dissatisfied customers make complaints. Conclusion: Some customers make complaints.',
  '["Urmează logic", "Nu urmează logic"]',
  '["Follows logically", "Does not follow logically"]',
  'multiple_choice',
  '{"correct_answer": 0, "section": "deduction"}'
),
(
  'watson-glaser-23', 'watson-glaser-critical-thinking', 23,
  'Premisele: Toți experții recomandă acest produs. Elena recomandă acest produs. Concluzia: Elena este expert.',
  'Premises: All experts recommend this product. Elena recommends this product. Conclusion: Elena is an expert.',
  '["Urmează logic", "Nu urmează logic"]',
  '["Follows logically", "Does not follow logically"]',
  'multiple_choice',
  '{"correct_answer": 1, "section": "deduction"}'
),
(
  'watson-glaser-24', 'watson-glaser-critical-thinking', 24,
  'Premisele: Toate companiile de succes investesc în cercetare. Această companie investește în cercetare. Concluzia: Această companie are succes.',
  'Premises: All successful companies invest in research. This company invests in research. Conclusion: This company is successful.',
  '["Urmează logic", "Nu urmează logic"]',
  '["Follows logically", "Does not follow logically"]',
  'multiple_choice',
  '{"correct_answer": 1, "section": "deduction"}'
),

-- Secțiunea 4: Interpretarea (25-32)
(
  'watson-glaser-25', 'watson-glaser-critical-thinking', 25,
  'Informațiile: Studiul arată că 80% din angajați sunt mulțumiți de locul de muncă. Concluzia: Majoritatea angajaților sunt mulțumiți.',
  'Information: Study shows that 80% of employees are satisfied with their workplace. Conclusion: Most employees are satisfied.',
  '["Concluzia urmează", "Concluzia nu urmează"]',
  '["Conclusion follows", "Conclusion does not follow"]',
  'multiple_choice',
  '{"correct_answer": 0, "section": "interpretation"}'
),
(
  'watson-glaser-26', 'watson-glaser-critical-thinking', 26,
  'Informațiile: Vânzările au crescut cu 15% în ultimul an. Concluzia: Strategia de marketing a fost foarte eficientă.',
  'Information: Sales increased by 15% last year. Conclusion: The marketing strategy was very effective.',
  '["Concluzia urmează", "Concluzia nu urmează"]',
  '["Conclusion follows", "Conclusion does not follow"]',
  'multiple_choice',
  '{"correct_answer": 1, "section": "interpretation"}'
),
(
  'watson-glaser-27', 'watson-glaser-critical-thinking', 27,
  'Informațiile: Rata de retenție a angajaților este de 85%. Concluzia: Angajații nu doresc să plece din companie.',
  'Information: Employee retention rate is 85%. Conclusion: Employees do not want to leave the company.',
  '["Concluzia urmează", "Concluzia nu urmează"]',
  '["Conclusion follows", "Conclusion does not follow"]',
  'multiple_choice',
  '{"correct_answer": 1, "section": "interpretation"}'
),
(
  'watson-glaser-28', 'watson-glaser-critical-thinking', 28,
  'Informațiile: Productivitatea a crescut cu 25% după implementarea noului sistem. Concluzia: Noul sistem a contribuit la creșterea productivității.',
  'Information: Productivity increased by 25% after implementing the new system. Conclusion: The new system contributed to increased productivity.',
  '["Concluzia urmează", "Concluzia nu urmează"]',
  '["Conclusion follows", "Conclusion does not follow"]',
  'multiple_choice',
  '{"correct_answer": 0, "section": "interpretation"}'
),
(
  'watson-glaser-29', 'watson-glaser-critical-thinking', 29,
  'Informațiile: 70% din clienți și-au exprimat satisfacția în sondaj. Concluzia: Serviciile companiei sunt apreciate de majoritatea clienților.',
  'Information: 70% of customers expressed satisfaction in the survey. Conclusion: The company''s services are appreciated by most customers.',
  '["Concluzia urmează", "Concluzia nu urmează"]',
  '["Conclusion follows", "Conclusion does not follow"]',
  'multiple_choice',
  '{"correct_answer": 0, "section": "interpretation"}'
),
(
  'watson-glaser-30', 'watson-glaser-critical-thinking', 30,
  'Informațiile: Profitul a scăzut cu 10% în ultimul trimestru. Concluzia: Compania se află în criză financiară.',
  'Information: Profit decreased by 10% in the last quarter. Conclusion: The company is in financial crisis.',
  '["Concluzia urmează", "Concluzia nu urmează"]',
  '["Conclusion follows", "Conclusion does not follow"]',
  'multiple_choice',
  '{"correct_answer": 1, "section": "interpretation"}'
),
(
  'watson-glaser-31', 'watson-glaser-critical-thinking', 31,
  'Informațiile: Timpul de livrare a fost redus cu 30%. Concluzia: Eficiența logisticii a fost îmbunătățită.',
  'Information: Delivery time was reduced by 30%. Conclusion: Logistics efficiency has been improved.',
  '["Concluzia urmează", "Concluzia nu urmează"]',
  '["Conclusion follows", "Conclusion does not follow"]',
  'multiple_choice',
  '{"correct_answer": 0, "section": "interpretation"}'
),
(
  'watson-glaser-32', 'watson-glaser-critical-thinking', 32,
  'Informațiile: Absenteismul a crescut cu 20% în ultimele 6 luni. Concluzia: Angajații nu mai sunt motivați să lucreze.',
  'Information: Absenteeism increased by 20% in the last 6 months. Conclusion: Employees are no longer motivated to work.',
  '["Concluzia urmează", "Concluzia nu urmează"]',
  '["Conclusion follows", "Conclusion does not follow"]',
  'multiple_choice',
  '{"correct_answer": 1, "section": "interpretation"}'
),

-- Secțiunea 5: Evaluarea argumentelor (33-40)
(
  'watson-glaser-33', 'watson-glaser-critical-thinking', 33,
  'Întrebarea: Ar trebui companiile să investească mai mult în tehnologii verzi? Argumentul: Da, pentru că protejează mediul și reduc costurile pe termen lung.',
  'Question: Should companies invest more in green technologies? Argument: Yes, because they protect the environment and reduce long-term costs.',
  '["Argument puternic", "Argument slab"]',
  '["Strong argument", "Weak argument"]',
  'multiple_choice',
  '{"correct_answer": 0, "section": "argument_evaluation"}'
),
(
  'watson-glaser-34', 'watson-glaser-critical-thinking', 34,
  'Întrebarea: Ar trebui să se interzică fumatul în toate spațiile publice? Argumentul: Da, pentru că fumul miroase urât.',
  'Question: Should smoking be banned in all public spaces? Argument: Yes, because smoke smells bad.',
  '["Argument puternic", "Argument slab"]',
  '["Strong argument", "Weak argument"]',
  'multiple_choice',
  '{"correct_answer": 1, "section": "argument_evaluation"}'
),
(
  'watson-glaser-35', 'watson-glaser-critical-thinking', 35,
  'Întrebarea: Ar trebui să se mărească salariul minim? Argumentul: Nu, pentru că prețurile la produse vor crește.',
  'Question: Should the minimum wage be increased? Argument: No, because product prices will increase.',
  '["Argument puternic", "Argument slab"]',
  '["Strong argument", "Weak argument"]',
  'multiple_choice',
  '{"correct_answer": 1, "section": "argument_evaluation"}'
),
(
  'watson-glaser-36', 'watson-glaser-critical-thinking', 36,
  'Întrebarea: Ar trebui să se implementeze programul de lucru flexibil? Argumentul: Da, pentru că îmbunătățește echilibrul între viață și muncă și poate crește productivitatea.',
  'Question: Should flexible work schedules be implemented? Argument: Yes, because it improves work-life balance and can increase productivity.',
  '["Argument puternic", "Argument slab"]',
  '["Strong argument", "Weak argument"]',
  'multiple_choice',
  '{"correct_answer": 0, "section": "argument_evaluation"}'
),
(
  'watson-glaser-37', 'watson-glaser-critical-thinking', 37,
  'Întrebarea: Ar trebui să se reducă numărul de ore de lucru pe săptămână? Argumentul: Da, pentru că toată lumea vrea să lucreze mai puțin.',
  'Question: Should the number of working hours per week be reduced? Argument: Yes, because everyone wants to work less.',
  '["Argument puternic", "Argument slab"]',
  '["Strong argument", "Weak argument"]',
  'multiple_choice',
  '{"correct_answer": 1, "section": "argument_evaluation"}'
),
(
  'watson-glaser-38', 'watson-glaser-critical-thinking', 38,
  'Întrebarea: Ar trebui să se investească mai mult în educație? Argumentul: Da, pentru că educația dezvoltă capita uman și stimulează creșterea economică.',
  'Question: Should more be invested in education? Argument: Yes, because education develops human capital and stimulates economic growth.',
  '["Argument puternic", "Argument slab"]',
  '["Strong argument", "Weak argument"]',
  'multiple_choice',
  '{"correct_answer": 0, "section": "argument_evaluation"}'
),
(
  'watson-glaser-39', 'watson-glaser-critical-thinking', 39,
  'Întrebarea: Ar trebui să se interzică mașinile în centrul orașului? Argumentul: Da, pentru că mașinile fac zgomot.',
  'Question: Should cars be banned from the city center? Argument: Yes, because cars make noise.',
  '["Argument puternic", "Argument slab"]',
  '["Strong argument", "Weak argument"]',
  'multiple_choice',
  '{"correct_answer": 1, "section": "argument_evaluation"}'
),
(
  'watson-glaser-40', 'watson-glaser-critical-thinking', 40,
  'Întrebarea: Ar trebui să se implementeze un sistem de monitorizare a performanței angajaților? Argumentul: Da, pentru că permite identificarea problemelor și îmbunătățirea continue a proceselor.',
  'Question: Should an employee performance monitoring system be implemented? Argument: Yes, because it allows problem identification and continuous process improvement.',
  '["Argument puternic", "Argument slab"]',
  '["Strong argument", "Weak argument"]',
  'multiple_choice',
  '{"correct_answer": 0, "section": "argument_evaluation"}'
);
