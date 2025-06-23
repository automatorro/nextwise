
-- Add DISC test type with proper UUID
INSERT INTO test_types (id, name, description, estimated_duration, questions_count, subscription_required, category_id)
VALUES (
  'a1b2c3d4-e5f6-7890-abcd-ef1234567890',
  'Test DISC - Stiluri de Comportament',
  'Testul DISC identifică stilul tău dominant de comportament în patru dimensiuni: Dominanță (D), Influență (I), Stabilitate (S) și Conformitate (C). Acest test te ajută să înțelegi cum interacționezi cu ceilalți și cum abordezi situațiile de lucru.',
  20,
  28,
  'professional',
  (SELECT id FROM test_categories WHERE name = 'Teste de Personalitate')
);

-- Add DISC test questions
INSERT INTO test_questions (test_type_id, question_order, question_text, question_type, options) VALUES
('a1b2c3d4-e5f6-7890-abcd-ef1234567890', 1, 'În situații de lucru în echipă, eu sunt cel care:', 'multiple_choice', '[
  {"value": 1, "label": "Iau inițiativa și conduc echipa", "dimension": "D"},
  {"value": 2, "label": "Motivez și entuziasmez echipa", "dimension": "I"},
  {"value": 3, "label": "Asigur stabilitatea și cooperarea", "dimension": "S"},
  {"value": 4, "label": "Analizez detaliile și urmăresc calitatea", "dimension": "C"}
]'),

('a1b2c3d4-e5f6-7890-abcd-ef1234567890', 2, 'Când iau decizii importante:', 'multiple_choice', '[
  {"value": 1, "label": "Decid rapid și ferm", "dimension": "D"},
  {"value": 2, "label": "Consult cu alții și caut consensul", "dimension": "I"},
  {"value": 3, "label": "Iau timp să mă gândesc bine", "dimension": "S"},
  {"value": 4, "label": "Analizez toate datele disponibile", "dimension": "C"}
]'),

('a1b2c3d4-e5f6-7890-abcd-ef1234567890', 3, 'Sub presiune, eu:', 'multiple_choice', '[
  {"value": 1, "label": "Devin mai direct și hotărât", "dimension": "D"},
  {"value": 2, "label": "Caut sprijinul celorlalți", "dimension": "I"},
  {"value": 3, "label": "Rămân calm și perseverent", "dimension": "S"},
  {"value": 4, "label": "Mă concentrez pe respectarea procedurilor", "dimension": "C"}
]'),

('a1b2c3d4-e5f6-7890-abcd-ef1234567890', 4, 'În comunicare, eu prefer să:', 'multiple_choice', '[
  {"value": 1, "label": "Fiu direct și concis", "dimension": "D"},
  {"value": 2, "label": "Fiu expresiv și prietenos", "dimension": "I"},
  {"value": 3, "label": "Ascult cu atenție și empatie", "dimension": "S"},
  {"value": 4, "label": "Fiu precis și factualizat", "dimension": "C"}
]'),

('a1b2c3d4-e5f6-7890-abcd-ef1234567890', 5, 'Când lucrez la un proiect:', 'multiple_choice', '[
  {"value": 1, "label": "Mă concentrez pe rezultate rapide", "dimension": "D"},
  {"value": 2, "label": "Îmi place să colaborez cu alții", "dimension": "I"},
  {"value": 3, "label": "Urmăresc un progres constant", "dimension": "S"},
  {"value": 4, "label": "Mă asigur că totul este perfect", "dimension": "C"}
]'),

('a1b2c3d4-e5f6-7890-abcd-ef1234567890', 6, 'În conflict, eu de obicei:', 'multiple_choice', '[
  {"value": 1, "label": "Abordez direct problema", "dimension": "D"},
  {"value": 2, "label": "Încerc să găsesc o soluție care să mulțumească pe toți", "dimension": "I"},
  {"value": 3, "label": "Evit confrontarea directă", "dimension": "S"},
  {"value": 4, "label": "Prezint faptele obiectiv", "dimension": "C"}
]'),

('a1b2c3d4-e5f6-7890-abcd-ef1234567890', 7, 'Mediul meu de lucru ideal ar fi:', 'multiple_choice', '[
  {"value": 1, "label": "Dinamic și provocator", "dimension": "D"},
  {"value": 2, "label": "Social și colaborativ", "dimension": "I"},
  {"value": 3, "label": "Stabil și predictibil", "dimension": "S"},
  {"value": 4, "label": "Organizat și structurat", "dimension": "C"}
]'),

('a1b2c3d4-e5f6-7890-abcd-ef1234567890', 8, 'Când îmi stabilesc obiective:', 'multiple_choice', '[
  {"value": 1, "label": "Îmi place să îmi asum riscuri mari", "dimension": "D"},
  {"value": 2, "label": "Caut obiective care implică lucrul cu oamenii", "dimension": "I"},
  {"value": 3, "label": "Prefer obiective realiste și realizabile", "dimension": "S"},
  {"value": 4, "label": "Stabilesc standarde înalte de calitate", "dimension": "C"}
]'),

('a1b2c3d4-e5f6-7890-abcd-ef1234567890', 9, 'În timpul liber, eu prefer să:', 'multiple_choice', '[
  {"value": 1, "label": "Fac sporturi competitive", "dimension": "D"},
  {"value": 2, "label": "Socializez cu prietenii", "dimension": "I"},
  {"value": 3, "label": "Mă relaxez acasă", "dimension": "S"},
  {"value": 4, "label": "Urmăresc hobby-uri care necesită precizie", "dimension": "C"}
]'),

('a1b2c3d4-e5f6-7890-abcd-ef1234567890', 10, 'Când învăț ceva nou:', 'multiple_choice', '[
  {"value": 1, "label": "Vreau să practic imediat", "dimension": "D"},
  {"value": 2, "label": "Îmi place să discut cu alții despre subiect", "dimension": "I"},
  {"value": 3, "label": "Iau timpul necesar pentru a înțelege bine", "dimension": "S"},
  {"value": 4, "label": "Studiez toate detaliile înainte de a începe", "dimension": "C"}
]'),

('a1b2c3d4-e5f6-7890-abcd-ef1234567890', 11, 'În întâlniri de lucru:', 'multiple_choice', '[
  {"value": 1, "label": "Îmi place să conduc discuția", "dimension": "D"},
  {"value": 2, "label": "Contribui cu idei creative", "dimension": "I"},
  {"value": 3, "label": "Ascult și sprijin ideile altora", "dimension": "S"},
  {"value": 4, "label": "Pun întrebări despre detalii", "dimension": "C"}
]'),

('a1b2c3d4-e5f6-7890-abcd-ef1234567890', 12, 'Când planific o vacanță:', 'multiple_choice', '[
  {"value": 1, "label": "Aleg destinații aventuroase", "dimension": "D"},
  {"value": 2, "label": "Plănuiesc activități sociale", "dimension": "I"},
  {"value": 3, "label": "Aleg locuri familiare și confortabile", "dimension": "S"},
  {"value": 4, "label": "Cercetez tot în detaliu înainte", "dimension": "C"}
]'),

('a1b2c3d4-e5f6-7890-abcd-ef1234567890', 13, 'În situații noi:', 'multiple_choice', '[
  {"value": 1, "label": "Mă adaptez rapid și acționez", "dimension": "D"},
  {"value": 2, "label": "Caut să cunosc oameni noi", "dimension": "I"},
  {"value": 3, "label": "Am nevoie de timp pentru adaptare", "dimension": "S"},
  {"value": 4, "label": "Observ și analizez înainte de a acționa", "dimension": "C"}
]'),

('a1b2c3d4-e5f6-7890-abcd-ef1234567890', 14, 'Când dau feedback altora:', 'multiple_choice', '[
  {"value": 1, "label": "Sunt direct și la obiect", "dimension": "D"},
  {"value": 2, "label": "Încerc să fiu pozitiv și încurajator", "dimension": "I"},
  {"value": 3, "label": "Sunt blând și diplomatic", "dimension": "S"},
  {"value": 4, "label": "Mă concentrez pe fapte și detalii", "dimension": "C"}
]'),

('a1b2c3d4-e5f6-7890-abcd-ef1234567890', 15, 'În managementul timpului:', 'multiple_choice', '[
  {"value": 1, "label": "Mă concentrez pe taskurile importante", "dimension": "D"},
  {"value": 2, "label": "Îmi fac timp pentru interacțiuni sociale", "dimension": "I"},
  {"value": 3, "label": "Urmăresc un program regulat", "dimension": "S"},
  {"value": 4, "label": "Plănuiesc totul în detaliu", "dimension": "C"}
]'),

('a1b2c3d4-e5f6-7890-abcd-ef1234567890', 16, 'Când conduc o echipă:', 'multiple_choice', '[
  {"value": 1, "label": "Stabilesc obiective clare și măsurabile", "dimension": "D"},
  {"value": 2, "label": "Motivez și inspir echipa", "dimension": "I"},
  {"value": 3, "label": "Creez un mediu de susținere și colaborare", "dimension": "S"},
  {"value": 4, "label": "Mă asigur că procesele sunt urmate corect", "dimension": "C"}
]'),

('a1b2c3d4-e5f6-7890-abcd-ef1234567890', 17, 'În negocieri:', 'multiple_choice', '[
  {"value": 1, "label": "Sunt ferm în privința obiectivelor mele", "dimension": "D"},
  {"value": 2, "label": "Caut soluții care să mulțumească ambele părți", "dimension": "I"},
  {"value": 3, "label": "Evit tensiunile și conflict", "dimension": "S"},
  {"value": 4, "label": "Prezint argumente bazate pe date", "dimension": "C"}
]'),

('a1b2c3d4-e5f6-7890-abcd-ef1234567890', 18, 'Când primesc critici:', 'multiple_choice', '[
  {"value": 1, "label": "Le iau ca pe o provocare", "dimension": "D"},
  {"value": 2, "label": "Mă întreb cum mă percep alții", "dimension": "I"},
  {"value": 3, "label": "Pot fi afectat emoțional", "dimension": "S"},
  {"value": 4, "label": "Analizez dacă sunt justificate", "dimension": "C"}
]'),

('a1b2c3d4-e5f6-7890-abcd-ef1234567890', 19, 'În rezolvarea problemelor:', 'multiple_choice', '[
  {"value": 1, "label": "Acționez rapid pentru a găsi o soluție", "dimension": "D"},
  {"value": 2, "label": "Caut input de la alții", "dimension": "I"},
  {"value": 3, "label": "Urmăresc metode dovedite", "dimension": "S"},
  {"value": 4, "label": "Analizez toate opțiunile disponibile", "dimension": "C"}
]'),

('a1b2c3d4-e5f6-7890-abcd-ef1234567890', 20, 'În ceea ce privește schimbarea:', 'multiple_choice', '[
  {"value": 1, "label": "O îmbrățișez ca pe o oportunitate", "dimension": "D"},
  {"value": 2, "label": "Mă entuziasmez de posibilitățile noi", "dimension": "I"},
  {"value": 3, "label": "Am nevoie de timp pentru a mă obișnui", "dimension": "S"},
  {"value": 4, "label": "Vreau să înțeleg impactul complet", "dimension": "C"}
]'),

('a1b2c3d4-e5f6-7890-abcd-ef1234567890', 21, 'În delegarea sarcinilor:', 'multiple_choice', '[
  {"value": 1, "label": "Dau autonomie completă", "dimension": "D"},
  {"value": 2, "label": "Ofer sprijin și încurajare", "dimension": "I"},
  {"value": 3, "label": "Mă asigur că se simt confortabil", "dimension": "S"},
  {"value": 4, "label": "Dau instrucțiuni clare și detaliate", "dimension": "C"}
]'),

('a1b2c3d4-e5f6-7890-abcd-ef1234567890', 22, 'Când iau riscuri:', 'multiple_choice', '[
  {"value": 1, "label": "Sunt dispus să risc mult pentru câștiguri mari", "dimension": "D"},
  {"value": 2, "label": "Îmi asum riscuri dacă alții mă susțin", "dimension": "I"},
  {"value": 3, "label": "Prefer să evit riscurile inutile", "dimension": "S"},
  {"value": 4, "label": "Calculez toate riscurile înainte", "dimension": "C"}
]'),

('a1b2c3d4-e5f6-7890-abcd-ef1234567890', 23, 'În prezentări publice:', 'multiple_choice', '[
  {"value": 1, "label": "Sunt încrezător și direct", "dimension": "D"},
  {"value": 2, "label": "Îmi place să interacționez cu audiența", "dimension": "I"},
  {"value": 3, "label": "Prefer grupuri mici și familiare", "dimension": "S"},
  {"value": 4, "label": "Mă pregătesc foarte bine în avans", "dimension": "C"}
]'),

('a1b2c3d4-e5f6-7890-abcd-ef1234567890', 24, 'În gestionarea stresului:', 'multiple_choice', '[
  {"value": 1, "label": "Caut provocări noi", "dimension": "D"},
  {"value": 2, "label": "Vorbesc cu prietenii despre probleme", "dimension": "I"},
  {"value": 3, "label": "Caut stabilitate și routine", "dimension": "S"},
  {"value": 4, "label": "Analizez sursele de stres", "dimension": "C"}
]'),

('a1b2c3d4-e5f6-7890-abcd-ef1234567890', 25, 'Când lucrez independent:', 'multiple_choice', '[
  {"value": 1, "label": "Îmi stabilesc propriile reguli", "dimension": "D"},
  {"value": 2, "label": "Îmi lipsește interacțiunea cu alții", "dimension": "I"},
  {"value": 3, "label": "Îmi place liniștea și focusul", "dimension": "S"},
  {"value": 4, "label": "Pot să mă concentrez pe detalii", "dimension": "C"}
]'),

('a1b2c3d4-e5f6-7890-abcd-ef1234567890', 26, 'În crearea de relații:', 'multiple_choice', '[
  {"value": 1, "label": "Caut să conduc și să influențez", "dimension": "D"},
  {"value": 2, "label": "Îmi place să cunosc mulți oameni", "dimension": "I"},
  {"value": 3, "label": "Prefer relații profunde și de lungă durată", "dimension": "S"},
  {"value": 4, "label": "Sunt selectiv în alegerea prietenilor", "dimension": "C"}
]'),

('a1b2c3d4-e5f6-7890-abcd-ef1234567890', 27, 'În atingerea obiectivelor:', 'multiple_choice', '[
  {"value": 1, "label": "Mă concentrez pe rezultate măsurabile", "dimension": "D"},
  {"value": 2, "label": "Îmi place să celebrez succesele cu alții", "dimension": "I"},
  {"value": 3, "label": "Progresez constant și perseverent", "dimension": "S"},
  {"value": 4, "label": "Mă asigur că fac totul corect", "dimension": "C"}
]'),

('a1b2c3d4-e5f6-7890-abcd-ef1234567890', 28, 'Când văd o oportunitate nouă:', 'multiple_choice', '[
  {"value": 1, "label": "Acționez imediat pentru a o folosi", "dimension": "D"},
  {"value": 2, "label": "O împărtășesc cu alții cu entuziasm", "dimension": "I"},
  {"value": 3, "label": "Evaluez cum se potrivește cu planurile mele", "dimension": "S"},
  {"value": 4, "label": "Cercetez toate aspectele înainte de a decide", "dimension": "C"}
]');
