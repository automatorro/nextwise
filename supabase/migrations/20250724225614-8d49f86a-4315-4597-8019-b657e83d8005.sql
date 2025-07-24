
-- Inserez testul SJT în tabela test_types
INSERT INTO test_types (name, description, estimated_duration, questions_count, subscription_required, category_id)
VALUES (
  'Test SJT - Orientare în Carieră',
  'Testul de Judecată Situațională evaluează preferințele tale pentru diferite stiluri de lucru prin scenarii realiste. Descoperă-ți profilul de carieră dominant din cele 6 profiluri: Lider, Specialist Analitic, Creativ, Suport/Servicii, Antreprenor, Vânzări.',
  15,
  10,
  'basic',
  (SELECT id FROM test_categories WHERE name = 'Teste Profesionale' LIMIT 1)
);

-- Adaug întrebările pentru testul SJT
INSERT INTO test_questions (test_type_id, question_order, question_text_ro, question_text_en, question_type, options, options_en, scoring_weights)
VALUES 
((SELECT id FROM test_types WHERE name = 'Test SJT - Orientare în Carieră'), 1, 
'Într-o întâlnire de echipă, managerul prezintă o problemă complexă care necesită o soluție rapidă. Care este prima ta reacție?',
'In a team meeting, the manager presents a complex problem that requires a quick solution. What is your first reaction?',
'multiple_choice',
'["Propun să analizez problema în detaliu înainte de a lua o decizie", "Sugerez să brainstormăm soluții creative împreună", "Iau inițiativa și propun un plan de acțiune clar", "Întreb cum pot ajuta echipa să găsească cea mai bună soluție"]',
'["I propose to analyze the problem in detail before making a decision", "I suggest brainstorming creative solutions together", "I take initiative and propose a clear action plan", "I ask how I can help the team find the best solution"]',
'{"Leader": [1, 0, 2, 1], "Specialist_Analitic": [2, 0, 1, 0], "Creativ": [0, 2, 0, 1], "Suport_Servicii": [1, 1, 0, 2], "Antreprenor": [1, 1, 2, 0], "Vanzari": [0, 1, 1, 1]}'
),

((SELECT id FROM test_types WHERE name = 'Test SJT - Orientare în Carieră'), 2,
'Clientul este nemulțumit de serviciul oferit și solicită o soluție imediată. Cum procedezi?',
'The client is dissatisfied with the service provided and requests an immediate solution. How do you proceed?',
'multiple_choice',
'["Ascult cu atenție și încerc să înțeleg exact problema", "Propun mai multe variante de soluționare", "Iau responsabilitatea și implementez o soluție rapidă", "Explic situația și negociez o soluție acceptabilă"]',
'["I listen carefully and try to understand exactly the problem", "I propose multiple solution options", "I take responsibility and implement a quick solution", "I explain the situation and negotiate an acceptable solution"]',
'{"Leader": [1, 1, 2, 0], "Specialist_Analitic": [2, 1, 0, 0], "Creativ": [0, 2, 1, 0], "Suport_Servicii": [2, 0, 0, 1], "Antreprenor": [0, 1, 2, 1], "Vanzari": [1, 0, 1, 2]}'
),

((SELECT id FROM test_types WHERE name = 'Test SJT - Orientare în Carieră'), 3,
'Echipa ta trebuie să finalizeze un proiect important cu un deadline foarte strâns. Care este abordarea ta?',
'Your team needs to complete an important project with a very tight deadline. What is your approach?',
'multiple_choice',
'["Reorganizez echipa și delegez sarcini în mod eficient", "Analizez prioritățile și optimizez procesele", "Găsesc soluții creative pentru a economisi timp", "Mă asigur că toți membrii echipei au sprijinul necesar"]',
'["I reorganize the team and delegate tasks efficiently", "I analyze priorities and optimize processes", "I find creative solutions to save time", "I ensure all team members have the necessary support"]',
'{"Leader": [2, 1, 0, 1], "Specialist_Analitic": [1, 2, 0, 0], "Creativ": [0, 0, 2, 1], "Suport_Servicii": [1, 0, 1, 2], "Antreprenor": [2, 1, 1, 0], "Vanzari": [1, 0, 0, 1]}'
),

((SELECT id FROM test_types WHERE name = 'Test SJT - Orientare în Carieră'), 4,
'Ai identificat o oportunitate de îmbunătățire a unui proces în companie. Cum procedezi?',
'You have identified an opportunity to improve a process in the company. How do you proceed?',
'multiple_choice',
'["Prezint propunerea direct managerului cu un plan clar", "Studiez în detaliu impactul și beneficiile", "Dezvolt o abordare inovatoare pentru implementare", "Discut cu colegii pentru a obține feedback"]',
'["I present the proposal directly to the manager with a clear plan", "I study in detail the impact and benefits", "I develop an innovative approach for implementation", "I discuss with colleagues to get feedback"]',
'{"Leader": [2, 0, 1, 1], "Specialist_Analitic": [1, 2, 0, 0], "Creativ": [0, 1, 2, 0], "Suport_Servicii": [0, 0, 1, 2], "Antreprenor": [2, 1, 1, 0], "Vanzari": [1, 0, 0, 1]}'
),

((SELECT id FROM test_types WHERE name = 'Test SJT - Orientare în Carieră'), 5,
'Într-o prezentare importantă, realizezi că datele pe care le ai sunt incomplete. Cum reacționezi?',
'In an important presentation, you realize that the data you have is incomplete. How do you react?',
'multiple_choice',
'["Continui prezentarea și abordez problema transparent", "Cer o pauză pentru a verifica și completa datele", "Improviez cu informații relevante din experiență", "Explic situația și reprogramez prezentarea"]',
'["I continue the presentation and address the problem transparently", "I ask for a break to verify and complete the data", "I improvise with relevant information from experience", "I explain the situation and reschedule the presentation"]',
'{"Leader": [2, 1, 0, 1], "Specialist_Analitic": [0, 2, 0, 1], "Creativ": [1, 0, 2, 0], "Suport_Servicii": [1, 1, 0, 2], "Antreprenor": [1, 0, 2, 0], "Vanzari": [2, 0, 1, 1]}'
),

((SELECT id FROM test_types WHERE name = 'Test SJT - Orientare în Carieră'), 6,
'Colegul tău are dificultăți cu o sarcină complexă și pare stresat. Care este reacția ta?',
'Your colleague is having difficulties with a complex task and seems stressed. What is your reaction?',
'multiple_choice',
'["Îmi ofer să îl ajut să găsească o soluție împreună", "Îi sugerez să analizeze problema pas cu pas", "Propun o abordare complet diferită", "Îl încurajez și îi ofer sprijinul moral"]',
'["I offer to help him find a solution together", "I suggest him to analyze the problem step by step", "I propose a completely different approach", "I encourage him and offer moral support"]',
'{"Leader": [2, 1, 0, 1], "Specialist_Analitic": [1, 2, 0, 0], "Creativ": [0, 0, 2, 1], "Suport_Servicii": [1, 0, 1, 2], "Antreprenor": [1, 1, 1, 0], "Vanzari": [1, 0, 0, 1]}'
),

((SELECT id FROM test_types WHERE name = 'Test SJT - Orientare în Carieră'), 7,
'Compania consideră implementarea unei noi tehnologii. Cum te implici în procesul de decizie?',
'The company is considering implementing a new technology. How do you get involved in the decision process?',
'multiple_choice',
'["Coordonez evaluarea și implementarea", "Analizez costurile și beneficiile în detaliu", "Propun alternative creative și inovatoare", "Mă asigur că toți sunt informați și confortabili"]',
'["I coordinate the evaluation and implementation", "I analyze costs and benefits in detail", "I propose creative and innovative alternatives", "I ensure everyone is informed and comfortable"]',
'{"Leader": [2, 1, 0, 1], "Specialist_Analitic": [1, 2, 0, 0], "Creativ": [0, 0, 2, 1], "Suport_Servicii": [1, 0, 1, 2], "Antreprenor": [2, 1, 1, 0], "Vanzari": [1, 0, 1, 1]}'
),

((SELECT id FROM test_types WHERE name = 'Test SJT - Orientare în Carieră'), 8,
'Ai o idee pentru un nou produs/serviciu. Care este primul pas?',
'You have an idea for a new product/service. What is the first step?',
'multiple_choice',
'["Formez o echipă și încep dezvoltarea", "Cercetez piața și analizez fezabilitatea", "Dezvolt un concept creativ și inovator", "Testez ideea cu potențiali clienți"]',
'["I form a team and start development", "I research the market and analyze feasibility", "I develop a creative and innovative concept", "I test the idea with potential clients"]',
'{"Leader": [2, 1, 0, 0], "Specialist_Analitic": [1, 2, 0, 0], "Creativ": [0, 0, 2, 1], "Suport_Servicii": [0, 0, 1, 2], "Antreprenor": [2, 1, 1, 1], "Vanzari": [1, 0, 0, 2]}'
),

((SELECT id FROM test_types WHERE name = 'Test SJT - Orientare în Carieră'), 9,
'Echipa ta are opinii împărțite asupra unei decizii importante. Cum facilitezi consensul?',
'Your team has divided opinions on an important decision. How do you facilitate consensus?',
'multiple_choice',
'["Iau decizia finală bazată pe argumentele prezentate", "Analizez obiectiv toate opțiunile", "Propun o soluție creativă care să satisfacă pe toți", "Facilitez o discuție deschisă și constructivă"]',
'["I make the final decision based on the arguments presented", "I objectively analyze all options", "I propose a creative solution that satisfies everyone", "I facilitate an open and constructive discussion"]',
'{"Leader": [2, 1, 0, 1], "Specialist_Analitic": [1, 2, 0, 0], "Creativ": [0, 0, 2, 1], "Suport_Servicii": [1, 0, 1, 2], "Antreprenor": [1, 1, 1, 0], "Vanzari": [1, 0, 1, 1]}'
),

((SELECT id FROM test_types WHERE name = 'Test SJT - Orientare în Carieră'), 10,
'Un client important amenință că va rezilia contractul din cauza unei probleme minore. Cum gestionezi situația?',
'An important client threatens to terminate the contract due to a minor issue. How do you handle the situation?',
'multiple_choice',
'["Iau controlul situației și găsesc o soluție rapidă", "Analizez problema pentru a înțelege cauza reală", "Propun compensații creative pentru a repara relația", "Construiesc un dialog empatic pentru a calma situația"]',
'["I take control of the situation and find a quick solution", "I analyze the problem to understand the real cause", "I propose creative compensation to repair the relationship", "I build an empathetic dialogue to calm the situation"]',
'{"Leader": [2, 1, 0, 1], "Specialist_Analitic": [1, 2, 0, 0], "Creativ": [0, 0, 2, 1], "Suport_Servicii": [1, 0, 1, 2], "Antreprenor": [1, 1, 1, 0], "Vanzari": [1, 0, 1, 2]}'
);
