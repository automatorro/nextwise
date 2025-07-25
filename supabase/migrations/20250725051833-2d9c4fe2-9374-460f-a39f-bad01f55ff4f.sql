
-- Remove existing incorrect questions for the Professional Aptitude test
DELETE FROM test_questions WHERE test_type_id = '11a82171-19bc-4604-8604-85d4510c66ff';

-- Insert 20 realistic SJT workplace scenarios in Romanian and English
INSERT INTO test_questions (test_type_id, question_order, question_text_ro, question_text_en, options, options_en, scoring_weights) VALUES

-- Scenario 1: Team Conflict Resolution
('11a82171-19bc-4604-8604-85d4510c66ff', 1, 
'Doi colegi din echipa ta au o ceartă aprinsă despre modul de abordare a unui proiect important. Conflictul afectează atmosfera și productivitatea echipei. Ce faci?',
'Two colleagues in your team are having a heated argument about how to approach an important project. The conflict is affecting the team atmosphere and productivity. What do you do?',
'["Intervin imediat și le impun o soluție pe care o consider cea mai bună", "Organizez o întâlnire structurată pentru a discuta opțiunile și a găsi un compromis", "Îi las să rezolve singuri conflictul, fără să mă implic", "Încerc să găsesc o soluție creativă care să combine elementele din ambele abordări"]',
'["I intervene immediately and impose a solution that I consider the best", "I organize a structured meeting to discuss options and find a compromise", "I let them resolve the conflict themselves without getting involved", "I try to find a creative solution that combines elements from both approaches"]',
'{"Leader": [3, 4, 1, 2], "Specialist_Analitic": [2, 4, 1, 3], "Creativ": [1, 2, 2, 4], "Suport_Servicii": [2, 4, 3, 2], "Antreprenor": [3, 2, 1, 4], "Vanzari": [3, 4, 2, 2]}'),

-- Scenario 2: Urgent Task Prioritization
('11a82171-19bc-4604-8604-85d4510c66ff', 2, 
'Ai primit simultan trei sarcini urgente de la manageri diferiți, toate cu termen limită în aceeași zi. Nu poți finaliza toate la timp. Cum procedezi?',
'You have simultaneously received three urgent tasks from different managers, all with deadlines on the same day. You cannot finish all of them on time. How do you proceed?',
'["Lucrez la toate simultan, chiar dacă calitatea va suferi", "Analizez impactul fiecărei sarcini și prioritizez pe cea mai importantă", "Negociez cu managerii pentru a extinde termenele", "Delegate parte din sarcini colegilor disponibili"]',
'["I work on all simultaneously, even if quality will suffer", "I analyze the impact of each task and prioritize the most important one", "I negotiate with managers to extend deadlines", "I delegate part of the tasks to available colleagues"]',
'{"Leader": [1, 3, 4, 4], "Specialist_Analitic": [1, 4, 3, 2], "Creativ": [2, 3, 2, 3], "Suport_Servicii": [2, 2, 3, 4], "Antreprenor": [2, 3, 4, 3], "Vanzari": [1, 2, 4, 3]}'),

-- Scenario 3: Difficult Client Communication
('11a82171-19bc-4604-8604-85d4510c66ff', 3,
'Un client important este foarte nemulțumit de un serviciu livrat și amenință cu anularea contractului. Este agitat și refuză să asculte explicațiile. Ce abordare alegi?',
'An important client is very dissatisfied with a delivered service and threatens to cancel the contract. They are agitated and refuse to listen to explanations. What approach do you choose?',
'["Rămân calm și îi ofer soluții concrete și imediate", "Analizez în detaliu problemele și prezint un plan de remediere", "Îl transfer unui coleg mai experimentat", "Propun o întâlnire creativă pentru a redefini relația"]',
'["I remain calm and offer concrete and immediate solutions", "I analyze the problems in detail and present a remediation plan", "I transfer them to a more experienced colleague", "I propose a creative meeting to redefine the relationship"]',
'{"Leader": [4, 3, 1, 2], "Specialist_Analitic": [3, 4, 2, 1], "Creativ": [2, 2, 1, 4], "Suport_Servicii": [4, 3, 2, 3], "Antreprenor": [4, 3, 2, 3], "Vanzari": [4, 3, 1, 2]}'),

-- Scenario 4: Group Decision Making
('11a82171-19bc-4604-8604-85d4510c66ff', 4,
'Echipa ta trebuie să ia o decizie importantă, dar opiniile sunt împărțite în două tabere egale. Timpul se scurge și este nevoie de o decizie rapidă. Ce faci?',
'Your team needs to make an important decision, but opinions are split into two equal camps. Time is running out and a quick decision is needed. What do you do?',
'["Iau decizia eu și îmi asum responsabilitatea", "Caut mai multe date pentru a fundamenta decizia", "Organizez un vot democratic în echipă", "Propun o soluție inovatoare care să depășească impasul"]',
'["I make the decision myself and take responsibility", "I look for more data to substantiate the decision", "I organize a democratic vote in the team", "I propose an innovative solution that overcomes the impasse"]',
'{"Leader": [4, 2, 3, 2], "Specialist_Analitic": [2, 4, 3, 2], "Creativ": [1, 2, 2, 4], "Suport_Servicii": [2, 3, 4, 2], "Antreprenor": [4, 2, 3, 4], "Vanzari": [3, 2, 4, 3]}'),

-- Scenario 5: Negative Feedback Management
('11a82171-19bc-4604-8604-85d4510c66ff', 5,
'Ai primit feedback negativ de la șeful tău despre o prezentare importantă. Critica este justificată, dar a fost exprimată dur în fața echipei. Cum reacționezi?',
'You received negative feedback from your boss about an important presentation. The criticism is justified, but it was expressed harshly in front of the team. How do you react?',
'["Accept feedback-ul și îmi cer scuze public", "Analizez greșelile și prezint un plan de îmbunătățire", "Discut privat cu șeful despre modul de comunicare", "Transform situația într-o oportunitate de învățare pentru echipă"]',
'["I accept the feedback and apologize publicly", "I analyze the mistakes and present an improvement plan", "I discuss privately with the boss about the communication method", "I transform the situation into a learning opportunity for the team"]',
'{"Leader": [3, 3, 4, 3], "Specialist_Analitic": [3, 4, 2, 2], "Creativ": [2, 2, 3, 4], "Suport_Servicii": [4, 3, 3, 3], "Antreprenor": [3, 3, 4, 4], "Vanzari": [4, 3, 3, 3]}'),

-- Scenario 6: Process Change Implementation
('11a82171-19bc-4604-8604-85d4510c66ff', 6,
'Compania introduce un nou sistem de lucru, dar echipa ta rezistă la schimbare. Unii colegi se plâng că procesul vechi era mai eficient. Ce abordare adopți?',
'The company introduces a new work system, but your team resists change. Some colleagues complain that the old process was more efficient. What approach do you adopt?',
'["Impun respectarea noului sistem și explic beneficiile", "Analizez avantajele și dezavantajele ambelor sisteme", "Ascult preocupările echipei și transmit feedback-ul management-ului", "Creez o variantă hibridă care să combine elementele bune din ambele sisteme"]',
'["I enforce compliance with the new system and explain the benefits", "I analyze the advantages and disadvantages of both systems", "I listen to the team concerns and transmit feedback to management", "I create a hybrid version that combines good elements from both systems"]',
'{"Leader": [4, 3, 2, 2], "Specialist_Analitic": [3, 4, 2, 2], "Creativ": [2, 2, 3, 4], "Suport_Servicii": [2, 3, 4, 2], "Antreprenor": [3, 3, 3, 4], "Vanzari": [4, 3, 3, 2]}'),

-- Scenario 7: Resource Allocation
('11a82171-19bc-4604-8604-85d4510c66ff', 7,
'Ai un buget limitat pentru un proiect și trebuie să alegi între angajarea unui specialist extern scump sau formarea unui coleg intern. Ce decizi?',
'You have a limited budget for a project and must choose between hiring an expensive external specialist or training an internal colleague. What do you decide?',
'["Angajez specialistul extern pentru rezultate garantate", "Calculez costurile și beneficiile pe termen lung", "Investesc în formarea colegului pentru dezvoltarea echipei", "Caut soluții creative pentru a reduce costurile"]',
'["I hire the external specialist for guaranteed results", "I calculate the long-term costs and benefits", "I invest in colleague training for team development", "I look for creative solutions to reduce costs"]',
'{"Leader": [3, 3, 4, 2], "Specialist_Analitic": [2, 4, 3, 2], "Creativ": [2, 2, 3, 4], "Suport_Servicii": [2, 3, 4, 3], "Antreprenor": [3, 3, 3, 4], "Vanzari": [4, 3, 2, 3]}'),

-- Scenario 8: Deadline Crisis
('11a82171-19bc-4604-8604-85d4510c66ff', 8,
'Un proiect important are întârzieri majore din cauza unor probleme neprevăzute. Clientul și managementul fac presiune pentru livrare. Ce strategie adopți?',
'An important project has major delays due to unforeseen problems. The client and management are pressuring for delivery. What strategy do you adopt?',
'["Mobilizez toată echipa pentru a recupera întârzierea", "Analizez cauzele și prezint un plan realist de recuperare", "Comunic transparent cu clientul despre situație", "Găsesc soluții inovatoare pentru a accelera procesul"]',
'["I mobilize the entire team to recover the delay", "I analyze the causes and present a realistic recovery plan", "I communicate transparently with the client about the situation", "I find innovative solutions to accelerate the process"]',
'{"Leader": [4, 3, 3, 2], "Specialist_Analitic": [3, 4, 2, 2], "Creativ": [2, 2, 3, 4], "Suport_Servicii": [3, 3, 4, 2], "Antreprenor": [4, 3, 4, 4], "Vanzari": [3, 3, 4, 3]}'),

-- Scenario 9: Team Motivation
('11a82171-19bc-4604-8604-85d4510c66ff', 9,
'Echipa ta parcurge o perioadă dificilă cu multe proiecte respinse și morala este scăzută. Productivitatea a început să scadă. Ce măsuri iei?',
'Your team is going through a difficult period with many rejected projects and morale is low. Productivity has started to decline. What measures do you take?',
'["Organizez o întâlnire motivațională și stabilesc obiective clare", "Analizez cauzele respingerilor și implementez îmbunătățiri", "Petrec timp individual cu fiecare membru al echipei", "Organizez activități creative pentru a restabili energia"]',
'["I organize a motivational meeting and set clear objectives", "I analyze the causes of rejections and implement improvements", "I spend individual time with each team member", "I organize creative activities to restore energy"]',
'{"Leader": [4, 3, 3, 2], "Specialist_Analitic": [2, 4, 3, 2], "Creativ": [3, 2, 2, 4], "Suport_Servicii": [3, 3, 4, 3], "Antreprenor": [4, 3, 2, 3], "Vanzari": [4, 2, 3, 3]}'),

-- Scenario 10: Performance Issue
('11a82171-19bc-4604-8604-85d4510c66ff', 10,
'Un coleg din echipă cu experiență îndelungată nu mai performează la același nivel ca înainte. Alte persoane din echipă au început să observe. Ce faci?',
'A team colleague with extensive experience is no longer performing at the same level as before. Other team members have started to notice. What do you do?',
'["Discut direct cu el despre scăderea performanței", "Observ atent și documentez problemele înainte de a acționa", "Ofer să îl ajut sau să îl îndrumez", "Propun o abordare creativă pentru a-i reda motivația"]',
'["I discuss directly with him about the performance decline", "I observe carefully and document problems before acting", "I offer to help or guide him", "I propose a creative approach to restore his motivation"]',
'{"Leader": [4, 3, 2, 2], "Specialist_Analitic": [3, 4, 2, 1], "Creativ": [2, 2, 3, 4], "Suport_Servicii": [3, 2, 4, 3], "Antreprenor": [4, 3, 3, 3], "Vanzari": [4, 3, 3, 2]}'),

-- Scenario 11: Innovation Opportunity
('11a82171-19bc-4604-8604-85d4510c66ff', 11,
'Ai identificat o oportunitate de a implementa o tehnologie nouă care ar putea revoluționa procesele companiei, dar implică riscuri și investiții mari. Ce faci?',
'You have identified an opportunity to implement a new technology that could revolutionize company processes, but it involves risks and large investments. What do you do?',
'["Prezint imediat propunerea managementului cu încredere", "Realizez o analiză detaliată a riscurilor și beneficiilor", "Discut cu echipa pentru a obține sprijin", "Dezvolt un prototip pentru a demonstra potențialul"]',
'["I immediately present the proposal to management with confidence", "I conduct a detailed analysis of risks and benefits", "I discuss with the team to gain support", "I develop a prototype to demonstrate potential"]',
'{"Leader": [4, 3, 2, 2], "Specialist_Analitic": [2, 4, 3, 2], "Creativ": [3, 2, 2, 4], "Suport_Servicii": [2, 3, 4, 2], "Antreprenor": [4, 3, 3, 4], "Vanzari": [4, 3, 3, 3]}'),

-- Scenario 12: Ethical Dilemma
('11a82171-19bc-4604-8604-85d4510c66ff', 12,
'Ai descoperit că un coleg folosește date inexacte în rapoartele sale pentru a-și îmbunătăți rezultatele. Nimeni altcineva nu a observat încă. Ce faci?',
'You discovered that a colleague is using inaccurate data in his reports to improve his results. No one else has noticed yet. What do you do?',
'["Îl confrunt direct și îi cer să corecteze datele", "Verific și analizez datele pentru a fi sigur de problemă", "Discut cu el într-un mod suportiv pentru a înțelege motivele", "Caut o modalitate diplomatică de a rezolva situația"]',
'["I confront him directly and ask him to correct the data", "I verify and analyze the data to be sure of the problem", "I discuss with him in a supportive way to understand the reasons", "I look for a diplomatic way to resolve the situation"]',
'{"Leader": [4, 3, 2, 3], "Specialist_Analitic": [3, 4, 2, 2], "Creativ": [2, 2, 3, 4], "Suport_Servicii": [2, 3, 4, 3], "Antreprenor": [4, 3, 3, 3], "Vanzari": [3, 3, 4, 4]}'),

-- Scenario 13: Cross-Department Collaboration
('11a82171-19bc-4604-8604-85d4510c66ff', 13,
'Trebuie să colaborezi cu un alt departament pentru un proiect, dar au priorități și metode de lucru complet diferite. Comunicarea este dificilă. Ce strategie adopți?',
'You need to collaborate with another department for a project, but they have completely different priorities and working methods. Communication is difficult. What strategy do you adopt?',
'["Stabilesc reguli clare de colaborare de la început", "Studiez metodele lor de lucru pentru a găsi puncte comune", "Încerc să construiesc relații personale cu echipa lor", "Propun modalități creative de colaborare"]',
'["I establish clear collaboration rules from the start", "I study their working methods to find common points", "I try to build personal relationships with their team", "I propose creative ways of collaboration"]',
'{"Leader": [4, 2, 3, 2], "Specialist_Analitic": [3, 4, 2, 2], "Creativ": [2, 2, 3, 4], "Suport_Servicii": [2, 3, 4, 2], "Antreprenor": [3, 3, 3, 4], "Vanzari": [3, 2, 4, 3]}'),

-- Scenario 14: Budget Constraints
('11a82171-19bc-4604-8604-85d4510c66ff', 14,
'Bugetul pentru proiectul tău a fost redus cu 30% din cauza unei crize financiare în companie. Trebuie să livrezi același rezultat. Ce abordare alegi?',
'The budget for your project has been reduced by 30% due to a financial crisis in the company. You need to deliver the same result. What approach do you choose?',
'["Renegociez obiectivele și livrabilele cu managementul", "Analizez în detaliu cheltuielile și elimin redundanțele", "Caut sprijin suplimentar de la alți colegi", "Găsesc soluții inovatoare pentru a reduce costurile"]',
'["I renegotiate objectives and deliverables with management", "I analyze expenses in detail and eliminate redundancies", "I seek additional support from other colleagues", "I find innovative solutions to reduce costs"]',
'{"Leader": [4, 3, 2, 2], "Specialist_Analitic": [3, 4, 2, 2], "Creativ": [2, 2, 3, 4], "Suport_Servicii": [2, 3, 4, 2], "Antreprenor": [3, 3, 3, 4], "Vanzari": [4, 3, 3, 3]}'),

-- Scenario 15: Remote Work Challenge
('11a82171-19bc-4604-8604-85d4510c66ff', 15,
'Echipa ta lucrează în sistem hibrid (remote și la birou). Observi că comunicarea s-a deteriorat și unii membri se simt izolați. Ce măsuri iei?',
'Your team works in a hybrid system (remote and in office). You notice that communication has deteriorated and some members feel isolated. What measures do you take?',
'["Stabilesc reguli stricte pentru comunicare și întâlniri", "Analizez problemele și implementez soluții tehnice", "Organizez activități sociale pentru a întări legăturile", "Creez noi formate de colaborare adaptate situației"]',
'["I establish strict rules for communication and meetings", "I analyze problems and implement technical solutions", "I organize social activities to strengthen bonds", "I create new collaboration formats adapted to the situation"]',
'{"Leader": [4, 3, 2, 2], "Specialist_Analitic": [3, 4, 2, 2], "Creativ": [2, 2, 3, 4], "Suport_Servicii": [2, 3, 4, 2], "Antreprenor": [3, 3, 3, 4], "Vanzari": [3, 3, 4, 3]}'),

-- Scenario 16: Quality vs Speed
('11a82171-19bc-4604-8604-85d4510c66ff', 16,
'Managementul cere livrarea rapidă a unui proiect, dar tu știi că o lansare grăbită ar putea compromite calitatea. Clientul este foarte important. Ce decizi?',
'Management requests rapid delivery of a project, but you know that a rushed launch could compromise quality. The client is very important. What do you decide?',
'["Respect termenul impus și accept riscul pentru calitate", "Prezint o analiză detaliată a riscurilor managementului", "Negociez cu clientul pentru a obține mai mult timp", "Propun soluții creative pentru a menține calitatea în timp redus"]',
'["I respect the imposed deadline and accept the risk to quality", "I present a detailed risk analysis to management", "I negotiate with the client to get more time", "I propose creative solutions to maintain quality in reduced time"]',
'{"Leader": [3, 4, 3, 2], "Specialist_Analitic": [2, 4, 3, 2], "Creativ": [2, 2, 3, 4], "Suport_Servicii": [2, 3, 4, 2], "Antreprenor": [4, 3, 3, 4], "Vanzari": [4, 3, 4, 3]}'),

-- Scenario 17: Knowledge Transfer
('11a82171-19bc-4604-8604-85d4510c66ff', 17,
'Cel mai experimentat membru al echipei tale pleacă în două săptămâni și deține cunoștințe critice pentru proiect. Nu a documentat nimic. Ce faci?',
'The most experienced member of your team is leaving in two weeks and holds critical knowledge for the project. He has not documented anything. What do you do?',
'["Îi impun să documenteze urgent toate procesele", "Organizez sesiuni intensive de transfer de cunoștințe", "Îi cer să formeze un succesor din echipă", "Creez un sistem colaborativ pentru capturarea cunoștințelor"]',
'["I require him to urgently document all processes", "I organize intensive knowledge transfer sessions", "I ask him to train a successor from the team", "I create a collaborative system for capturing knowledge"]',
'{"Leader": [4, 3, 2, 2], "Specialist_Analitic": [4, 3, 2, 2], "Creativ": [2, 2, 3, 4], "Suport_Servicii": [2, 3, 4, 2], "Antreprenor": [3, 3, 3, 4], "Vanzari": [3, 3, 4, 3]}'),

-- Scenario 18: Underperforming Team Member
('11a82171-19bc-4604-8604-85d4510c66ff', 18,
'Un membru nou al echipei nu reușește să se integreze și performanța sa este sub așteptări. Alți colegi încep să se plângă. Ce abordare adopți?',
'A new team member cannot integrate and his performance is below expectations. Other colleagues are starting to complain. What approach do you adopt?',
'["Vorbesc direct cu el despre problemele de performanță", "Analizez cauzele și creez un plan de dezvoltare", "Îl pun să lucreze mai strâns cu colegii mai experimentați", "Caut modalități creative de a-i valorifica punctele forte"]',
'["I speak directly with him about performance issues", "I analyze causes and create a development plan", "I have him work more closely with more experienced colleagues", "I look for creative ways to leverage his strengths"]',
'{"Leader": [4, 3, 2, 2], "Specialist_Analitic": [3, 4, 2, 2], "Creativ": [2, 2, 3, 4], "Suport_Servicii": [2, 3, 4, 2], "Antreprenor": [4, 3, 3, 3], "Vanzari": [4, 3, 3, 3]}'),

-- Scenario 19: Technology Migration
('11a82171-19bc-4604-8604-85d4510c66ff', 19,
'Compania decide să migreze la o nouă platformă tehnologică. Echipa ta este reticentă și se teme că va fi depășită. Ce strategie adopți?',
'The company decides to migrate to a new technology platform. Your team is reluctant and fears being overwhelmed. What strategy do you adopt?',
'["Explic beneficiile și impun adaptarea la noua tehnologie", "Analizez impactul și creez un plan de tranziție detailat", "Organizez sesiuni de suport și encouragement pentru echipă", "Dezvolt modalități creative de învățare a noii tehnologii"]',
'["I explain the benefits and impose adaptation to new technology", "I analyze the impact and create a detailed transition plan", "I organize support and encouragement sessions for the team", "I develop creative ways to learn the new technology"]',
'{"Leader": [4, 3, 2, 2], "Specialist_Analitic": [3, 4, 2, 2], "Creativ": [2, 2, 3, 4], "Suport_Servicii": [2, 3, 4, 2], "Antreprenor": [4, 3, 3, 4], "Vanzari": [4, 3, 3, 3]}'),

-- Scenario 20: Strategic Planning
('11a82171-19bc-4604-8604-85d4510c66ff', 20,
'Ești invitat să participi la planificarea strategică a departamentului pentru următorul an. Ai idei bune, dar ești cel mai junior la masă. Ce strategie adopți?',
'You are invited to participate in strategic planning for the department for next year. You have good ideas, but you are the most junior at the table. What strategy do you adopt?',
'["Îmi prezint ideile cu încredere și îmi susțin punctul de vedere", "Analizez propunerile celorlalți și ofer perspective fundamentate", "Construiesc alianțe cu colegii pentru a-mi susține ideile", "Propun abordări inovatoare care să completeze ideile celorlalți"]',
'["I present my ideas with confidence and support my point of view", "I analyze others proposals and offer substantiated perspectives", "I build alliances with colleagues to support my ideas", "I propose innovative approaches that complement others ideas"]',
'{"Leader": [4, 3, 2, 2], "Specialist_Analitic": [3, 4, 2, 2], "Creativ": [3, 2, 2, 4], "Suport_Servicii": [2, 3, 4, 2], "Antreprenor": [4, 3, 3, 4], "Vanzari": [4, 3, 4, 3]}');
