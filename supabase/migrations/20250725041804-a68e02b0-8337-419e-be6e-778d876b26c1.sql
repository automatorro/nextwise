
-- Insert professional aptitude test questions for test_type_id '11a82171-19bc-4604-8604-85d4510c66ff'
INSERT INTO public.test_questions (test_type_id, question_text_ro, question_text_en, question_order, question_type, options, options_en, scoring_weights) VALUES

-- Logical Reasoning Questions (1-10)
('11a82171-19bc-4604-8604-85d4510c66ff', 'Dacă toți angajații din departament sunt punctuali și Maria lucrează în departament, atunci:', 'If all employees in the department are punctual and Maria works in the department, then:', 1, 'multiple_choice', 
'["Maria este punctuală", "Maria poate fi punctuală", "Maria nu este punctuală", "Nu se poate determina"]', 
'["Maria is punctual", "Maria might be punctual", "Maria is not punctual", "Cannot be determined"]', 
'[2, 0, 0, 0]'),

('11a82171-19bc-4604-8604-85d4510c66ff', 'Completați seria logică: 2, 6, 12, 20, 30, ?', 'Complete the logical series: 2, 6, 12, 20, 30, ?', 2, 'multiple_choice',
'["40", "42", "44", "46"]',
'["40", "42", "44", "46"]',
'[0, 2, 0, 0]'),

('11a82171-19bc-4604-8604-85d4510c66ff', 'Dacă A > B și B > C, atunci:', 'If A > B and B > C, then:', 3, 'multiple_choice',
'["A = C", "A < C", "A > C", "A poate fi egal cu C"]',
'["A = C", "A < C", "A > C", "A might equal C"]',
'[0, 0, 2, 0]'),

('11a82171-19bc-4604-8604-85d4510c66ff', 'Care dintre următoarele cuvinte NU aparține grupului: câine, pisică, pasăre, pește?', 'Which of the following words does NOT belong to the group: dog, cat, bird, fish?', 4, 'multiple_choice',
'["Câine", "Pisică", "Pasăre", "Toate aparțin grupului"]',
'["Dog", "Cat", "Bird", "All belong to the group"]',
'[0, 0, 0, 2]'),

('11a82171-19bc-4604-8604-85d4510c66ff', 'Dacă astăzi este miercuri, ce zi va fi peste 100 de zile?', 'If today is Wednesday, what day will it be in 100 days?', 5, 'multiple_choice',
'["Luni", "Marți", "Miercuri", "Joi"]',
'["Monday", "Tuesday", "Wednesday", "Thursday"]',
'[0, 0, 0, 2]'),

-- Problem Solving Questions (6-10)
('11a82171-19bc-4604-8604-85d4510c66ff', 'Cum ați aborda o situație în care aveți o deadline strânsă și resurse limitate?', 'How would you approach a situation where you have a tight deadline and limited resources?', 6, 'multiple_choice',
'["Prioritizez taskurile și cer ajutor", "Lucrez mai multe ore", "Reportez deadline-ul", "Fac ce pot în timp"]',
'["Prioritize tasks and ask for help", "Work more hours", "Report the deadline", "Do what I can in time"]',
'[2, 1, 0, 1]'),

('11a82171-19bc-4604-8604-85d4510c66ff', 'Care este cea mai eficientă modalitate de a organiza un proiect complex?', 'What is the most efficient way to organize a complex project?', 7, 'multiple_choice',
'["Împart în task-uri mici", "Lucrez pas cu pas", "Fac un plan detaliat", "Toate variantele de mai sus"]',
'["Break into small tasks", "Work step by step", "Make a detailed plan", "All of the above"]',
'[1, 1, 1, 2]'),

('11a82171-19bc-4604-8604-85d4510c66ff', 'Când întâmpinați o problemă tehnică necunoscută, primul pas este:', 'When encountering an unknown technical problem, the first step is:', 8, 'multiple_choice',
'["Încerc să o rezolv singur", "Caut informații", "Cer ajutor imediat", "Ignor problema"]',
'["Try to solve it myself", "Search for information", "Ask for help immediately", "Ignore the problem"]',
'[1, 2, 1, 0]'),

('11a82171-19bc-4604-8604-85d4510c66ff', 'Pentru a lua o decizie importantă, este esențial să:', 'To make an important decision, it is essential to:', 9, 'multiple_choice',
'["Analizez toate opțiunile", "Mă consult cu colegii", "Urmez instinctul", "Toate sunt importante"]',
'["Analyze all options", "Consult with colleagues", "Follow instinct", "All are important"]',
'[2, 1, 0, 1]'),

('11a82171-19bc-4604-8604-85d4510c66ff', 'Calculați: (15 + 25) × 2 - 30 ÷ 3', 'Calculate: (15 + 25) × 2 - 30 ÷ 3', 10, 'multiple_choice',
'["70", "80", "90", "100"]',
'["70", "80", "90", "100"]',
'[2, 0, 0, 0]'),

-- Reading Comprehension Questions (11-15)
('11a82171-19bc-4604-8604-85d4510c66ff', 'Ce înseamnă să "delegezi" responsabilități?', 'What does it mean to "delegate" responsibilities?', 11, 'multiple_choice',
'["Să eviți responsabilitatea", "Să împarți taskurile cu alții", "Să lucrezi mai mult", "Să controlezi totul"]',
'["To avoid responsibility", "To share tasks with others", "To work more", "To control everything"]',
'[0, 2, 0, 0]'),

('11a82171-19bc-4604-8604-85d4510c66ff', 'Comunicarea eficientă la locul de muncă presupune:', 'Effective communication at work involves:', 12, 'multiple_choice',
'["Vorbirea mult", "Ascultarea activă", "Întreruperea colegilor", "Evitarea conversațiilor"]',
'["Talking a lot", "Active listening", "Interrupting colleagues", "Avoiding conversations"]',
'[0, 2, 0, 0]'),

('11a82171-19bc-4604-8604-85d4510c66ff', 'Feedback-ul constructiv se caracterizează prin:', 'Constructive feedback is characterized by:', 13, 'multiple_choice',
'["Critici dure", "Sugestii specifice", "Generalizări", "Atacuri personale"]',
'["Harsh criticism", "Specific suggestions", "Generalizations", "Personal attacks"]',
'[0, 2, 0, 0]'),

('11a82171-19bc-4604-8604-85d4510c66ff', 'Managementul timpului eficient include:', 'Efficient time management includes:', 14, 'multiple_choice',
'["Multitasking constant", "Planificarea priorităților", "Lucrul fără pauze", "Amânarea taskurilor"]',
'["Constant multitasking", "Priority planning", "Working without breaks", "Postponing tasks"]',
'[0, 2, 0, 0]'),

('11a82171-19bc-4604-8604-85d4510c66ff', 'Stresul la locul de muncă se gestionează prin:', 'Workplace stress is managed through:', 15, 'multiple_choice',
'["Ignorarea problemelor", "Tehnici de relaxare", "Izolarea socială", "Lucrul în plus"]',
'["Ignoring problems", "Relaxation techniques", "Social isolation", "Extra work"]',
'[0, 2, 0, 0]'),

-- Basic Math Questions (16-20)
('11a82171-19bc-4604-8604-85d4510c66ff', 'Calculați 25% din 200:', 'Calculate 25% of 200:', 16, 'multiple_choice',
'["25", "50", "75", "100"]',
'["25", "50", "75", "100"]',
'[0, 2, 0, 0]'),

('11a82171-19bc-4604-8604-85d4510c66ff', 'Dacă un proiect costă 1500 lei și bugetul este 2000 lei, cât procent din buget se folosește?', 'If a project costs 1500 lei and the budget is 2000 lei, what percentage of the budget is used?', 17, 'multiple_choice',
'["65%", "70%", "75%", "80%"]',
'["65%", "70%", "75%", "80%"]',
'[0, 0, 2, 0]'),

('11a82171-19bc-4604-8604-85d4510c66ff', 'Un angajat lucrează 8 ore pe zi, 5 zile pe săptămână. Câte ore lucrează în 4 săptămâni?', 'An employee works 8 hours per day, 5 days per week. How many hours does he work in 4 weeks?', 18, 'multiple_choice',
'["140", "150", "160", "170"]',
'["140", "150", "160", "170"]',
'[0, 0, 2, 0]'),

('11a82171-19bc-4604-8604-85d4510c66ff', 'Dacă venitul pe oră este 15 lei și se lucrează 40 ore pe săptămână, venitul săptămânal este:', 'If the hourly income is 15 lei and you work 40 hours per week, the weekly income is:', 19, 'multiple_choice',
'["500 lei", "550 lei", "600 lei", "650 lei"]',
'["500 lei", "550 lei", "600 lei", "650 lei"]',
'[0, 0, 2, 0]'),

('11a82171-19bc-4604-8604-85d4510c66ff', 'Media aritmetică a numerelor 10, 15, 20, 25 este:', 'The arithmetic mean of the numbers 10, 15, 20, 25 is:', 20, 'multiple_choice',
'["15", "17.5", "20", "22.5"]',
'["15", "17.5", "20", "22.5"]',
'[0, 2, 0, 0]'),

-- Communication Skills Questions (21-25)
('11a82171-19bc-4604-8604-85d4510c66ff', 'Cea mai importantă abilitate în comunicarea cu clienții este:', 'The most important skill in client communication is:', 21, 'multiple_choice',
'["Vorbirea rapidă", "Empatia", "Cunoștințele tehnice", "Autoritatea"]',
'["Fast talking", "Empathy", "Technical knowledge", "Authority"]',
'[0, 2, 1, 0]'),

('11a82171-19bc-4604-8604-85d4510c66ff', 'Când prezentați un raport, este important să:', 'When presenting a report, it is important to:', 22, 'multiple_choice',
'["Citesc tot textul", "Evidențiez punctele cheie", "Vorbesc cât mai mult", "Evit întrebările"]',
'["Read all the text", "Highlight key points", "Talk as much as possible", "Avoid questions"]',
'[0, 2, 0, 0]'),

('11a82171-19bc-4604-8604-85d4510c66ff', 'Comunicarea non-verbală include:', 'Non-verbal communication includes:', 23, 'multiple_choice',
'["Doar gesturile", "Doar expresiile faciale", "Tonul vocii și limbajul corporal", "Doar cuvintele"]',
'["Only gestures", "Only facial expressions", "Voice tone and body language", "Only words"]',
'[0, 0, 2, 0]'),

('11a82171-19bc-4604-8604-85d4510c66ff', 'Pentru a evita conflictele la locul de muncă, este util să:', 'To avoid conflicts at work, it is useful to:', 24, 'multiple_choice',
'["Evit colegii", "Comunic deschis", "Îmi păstrez opiniile", "Critic constant"]',
'["Avoid colleagues", "Communicate openly", "Keep my opinions", "Constantly criticize"]',
'[0, 2, 0, 0]'),

('11a82171-19bc-4604-8604-85d4510c66ff', 'Ascultarea activă presupune:', 'Active listening involves:', 25, 'multiple_choice',
'["Pregătirea răspunsului", "Concentrarea pe vorbitor", "Întreruperea frecventă", "Gândirea la altceva"]',
'["Preparing the response", "Focusing on the speaker", "Frequent interruption", "Thinking about something else"]',
'[0, 2, 0, 0]'),

-- Teamwork Questions (26-30)
('11a82171-19bc-4604-8604-85d4510c66ff', 'Într-o echipă eficientă, membrii:', 'In an efficient team, members:', 26, 'multiple_choice',
'["Lucrează independent", "Colaborează și comunică", "Competiția între ei", "Evit responsabilitatea"]',
'["Work independently", "Collaborate and communicate", "Compete with each other", "Avoid responsibility"]',
'[0, 2, 0, 0]'),

('11a82171-19bc-4604-8604-85d4510c66ff', 'Când apare un conflict în echipă, cel mai bun approach este:', 'When a conflict arises in the team, the best approach is:', 27, 'multiple_choice',
'["Ignorarea conflictului", "Medierea și dialogul", "Luarea unei părți", "Evitarea discuțiilor"]',
'["Ignoring the conflict", "Mediation and dialogue", "Taking sides", "Avoiding discussions"]',
'[0, 2, 0, 0]'),

('11a82171-19bc-4604-8604-85d4510c66ff', 'Leadership-ul eficient se caracterizează prin:', 'Effective leadership is characterized by:', 28, 'multiple_choice',
'["Control total", "Inspirarea echipei", "Micromanagement", "Izolarea de echipă"]',
'["Total control", "Inspiring the team", "Micromanagement", "Isolation from team"]',
'[0, 2, 0, 0]'),

('11a82171-19bc-4604-8604-85d4510c66ff', 'Când un coleg are nevoie de ajutor, ar trebui să:', 'When a colleague needs help, you should:', 29, 'multiple_choice',
'["Îl ignor", "Ofer suport dacă pot", "Îl trimit la șef", "Îi spun să se descurce"]',
'["Ignore him", "Offer support if I can", "Send him to the boss", "Tell him to manage"]',
'[0, 2, 0, 0]'),

('11a82171-19bc-4604-8604-85d4510c66ff', 'Adaptabilitatea la schimbări presupune:', 'Adaptability to changes involves:', 30, 'multiple_choice',
'["Rezistență la nou", "Flexibilitate și învățare", "Menținerea rutinei", "Critici la adresa schimbărilor"]',
'["Resistance to new", "Flexibility and learning", "Maintaining routine", "Criticism of changes"]',
'[0, 2, 0, 0]');
