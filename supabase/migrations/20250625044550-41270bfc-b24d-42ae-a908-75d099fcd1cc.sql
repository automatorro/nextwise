
-- Șterg mai întâi orice întrebări existente pentru testul de aptitudini cognitive pentru a evita duplicatele
DELETE FROM test_questions WHERE test_type_id = '5b732740-f04b-49dd-903c-c84253ec61df';

-- Inserez întrebările pentru Test Aptitudini Cognitive cu ID-ul corect
-- Dimensiunea: Raționament Verbal (8 întrebări)
INSERT INTO test_questions (test_type_id, question_text, question_order, options, scoring_weights) VALUES
('5b732740-f04b-49dd-903c-c84253ec61df', 'Care dintre următoarele cuvinte are sensul cel mai apropiat de "abundent"?', 1, 
'[{"value": 0, "label": "Rar"}, {"value": 1, "label": "Puțin"}, {"value": 2, "label": "Moderat"}, {"value": 3, "label": "Mult"}, {"value": 4, "label": "Extrem de mult"}]',
'{"0": {"verbal": 0}, "1": {"verbal": 1}, "2": {"verbal": 2}, "3": {"verbal": 3}, "4": {"verbal": 4}}'),

('5b732740-f04b-49dd-903c-c84253ec61df', 'Completați analogia: Carte este la bibliotecă cum masa este la...', 2,
'[{"value": 0, "label": "Scaun"}, {"value": 1, "label": "Bucătărie"}, {"value": 2, "label": "Restaurant"}, {"value": 3, "label": "Lemn"}, {"value": 4, "label": "Masă"}]',
'{"0": {"verbal": 1}, "1": {"verbal": 2}, "2": {"verbal": 4}, "3": {"verbal": 1}, "4": {"verbal": 0}}'),

('5b732740-f04b-49dd-903c-c84253ec61df', 'Care este antonimul cuvântului "prolific"?', 3,
'[{"value": 0, "label": "Productiv"}, {"value": 1, "label": "Creativ"}, {"value": 2, "label": "Steril"}, {"value": 3, "label": "Activ"}, {"value": 4, "label": "Energic"}]',
'{"0": {"verbal": 0}, "1": {"verbal": 1}, "2": {"verbal": 4}, "3": {"verbal": 1}, "4": {"verbal": 0}}'),

('5b732740-f04b-49dd-903c-c84253ec61df', 'Sinonimul pentru "perspicace" este:', 4,
'[{"value": 0, "label": "Confuz"}, {"value": 1, "label": "Lent"}, {"value": 2, "label": "Perspicace"}, {"value": 3, "label": "Ascuțit"}, {"value": 4, "label": "Obtuz"}]',
'{"0": {"verbal": 0}, "1": {"verbal": 1}, "2": {"verbal": 2}, "3": {"verbal": 4}, "4": {"verbal": 0}}'),

('5b732740-f04b-49dd-903c-c84253ec61df', 'Completați propoziția: Dacă toți rozii sunt flori și unele flori sunt parfumate, atunci...', 5,
'[{"value": 0, "label": "Toți rozii sunt parfumați"}, {"value": 1, "label": "Unii rozi pot fi parfumați"}, {"value": 2, "label": "Niciun trandafir nu este parfumat"}, {"value": 3, "label": "Toate florile sunt rozi"}, {"value": 4, "label": "Nu se poate determina"}]',
'{"0": {"verbal": 1}, "1": {"verbal": 4}, "2": {"verbal": 0}, "3": {"verbal": 0}, "4": {"verbal": 2}}'),

('5b732740-f04b-49dd-903c-c84253ec61df', 'Care dintre următoarele propoziții este echivalentă cu "Toți câinii sunt animale"?', 6,
'[{"value": 0, "label": "Unele animale sunt câini"}, {"value": 1, "label": "Dacă este câine, atunci este animal"}, {"value": 2, "label": "Dacă este animal, atunci este câine"}, {"value": 3, "label": "Toți câinii sunt la fel"}, {"value": 4, "label": "Animalele sunt câini"}]',
'{"0": {"verbal": 2}, "1": {"verbal": 4}, "2": {"verbal": 0}, "3": {"verbal": 0}, "4": {"verbal": 1}}'),

('5b732740-f04b-49dd-903c-c84253ec61df', 'Găsiți cuvântul care nu se potrivește: elefant, pisică, automobil, câine, cal', 7,
'[{"value": 0, "label": "Elefant"}, {"value": 1, "label": "Pisică"}, {"value": 2, "label": "Automobil"}, {"value": 3, "label": "Câine"}, {"value": 4, "label": "Cal"}]',
'{"0": {"verbal": 1}, "1": {"verbal": 1}, "2": {"verbal": 4}, "3": {"verbal": 1}, "4": {"verbal": 1}}'),

('5b732740-f04b-49dd-903c-c84253ec61df', 'Care este sensul expresiei "a lua taurul de coarne"?', 8,
'[{"value": 0, "label": "A fi foarte curajos"}, {"value": 1, "label": "A aborda direct o problemă"}, {"value": 2, "label": "A lucra în agricultură"}, {"value": 3, "label": "A fi foarte puternic"}, {"value": 4, "label": "A face ceva periculos"}]',
'{"0": {"verbal": 2}, "1": {"verbal": 4}, "2": {"verbal": 0}, "3": {"verbal": 1}, "4": {"verbal": 3}}');

-- Dimensiunea: Raționament Numeric (8 întrebări)
INSERT INTO test_questions (test_type_id, question_text, question_order, options, scoring_weights) VALUES
('5b732740-f04b-49dd-903c-c84253ec61df', 'Care este următorul număr în seria: 2, 6, 18, 54, ?', 9,
'[{"value": 0, "label": "108"}, {"value": 1, "label": "162"}, {"value": 2, "label": "216"}, {"value": 3, "label": "270"}, {"value": 4, "label": "324"}]',
'{"0": {"numeric": 2}, "1": {"numeric": 4}, "2": {"numeric": 1}, "3": {"numeric": 0}, "4": {"numeric": 0}}'),

('5b732740-f04b-49dd-903c-c84253ec61df', 'Dacă 3x + 7 = 22, atunci x = ?', 10,
'[{"value": 0, "label": "3"}, {"value": 1, "label": "5"}, {"value": 2, "label": "7"}, {"value": 3, "label": "9"}, {"value": 4, "label": "15"}]',
'{"0": {"numeric": 1}, "1": {"numeric": 4}, "2": {"numeric": 2}, "3": {"numeric": 0}, "4": {"numeric": 0}}'),

('5b732740-f04b-49dd-903c-c84253ec61df', 'Un produs costă 120 lei. Dacă se aplică o reducere de 25%, care va fi prețul final?', 11,
'[{"value": 0, "label": "85 lei"}, {"value": 1, "label": "90 lei"}, {"value": 2, "label": "95 lei"}, {"value": 3, "label": "100 lei"}, {"value": 4, "label": "105 lei"}]',
'{"0": {"numeric": 1}, "1": {"numeric": 4}, "2": {"numeric": 2}, "3": {"numeric": 0}, "4": {"numeric": 0}}'),

('5b732740-f04b-49dd-903c-c84253ec61df', 'Care este media aritmetică a numerelor: 8, 12, 16, 20, 24?', 12,
'[{"value": 0, "label": "14"}, {"value": 1, "label": "16"}, {"value": 2, "label": "18"}, {"value": 3, "label": "20"}, {"value": 4, "label": "22"}]',
'{"0": {"numeric": 1}, "1": {"numeric": 4}, "2": {"numeric": 2}, "3": {"numeric": 0}, "4": {"numeric": 0}}'),

('5b732740-f04b-49dd-903c-c84253ec61df', 'Dacă un automobil parcurge 240 km în 3 ore, care este viteza medie?', 13,
'[{"value": 0, "label": "60 km/h"}, {"value": 1, "label": "70 km/h"}, {"value": 2, "label": "80 km/h"}, {"value": 3, "label": "90 km/h"}, {"value": 4, "label": "100 km/h"}]',
'{"0": {"numeric": 1}, "1": {"numeric": 2}, "2": {"numeric": 4}, "3": {"numeric": 1}, "4": {"numeric": 0}}'),

('5b732740-f04b-49dd-903c-c84253ec61df', 'Care este următorul număr în seria: 1, 4, 9, 16, 25, ?', 14,
'[{"value": 0, "label": "30"}, {"value": 1, "label": "32"}, {"value": 2, "label": "35"}, {"value": 3, "label": "36"}, {"value": 4, "label": "40"}]',
'{"0": {"numeric": 0}, "1": {"numeric": 1}, "2": {"numeric": 0}, "3": {"numeric": 4}, "4": {"numeric": 2}}'),

('5b732740-f04b-49dd-903c-c84253ec61df', 'Dacă un triunghi are laturile de 3, 4 și 5 cm, care este aria sa?', 15,
'[{"value": 0, "label": "5 cm²"}, {"value": 1, "label": "6 cm²"}, {"value": 2, "label": "7 cm²"}, {"value": 3, "label": "8 cm²"}, {"value": 4, "label": "10 cm²"}]',
'{"0": {"numeric": 1}, "1": {"numeric": 4}, "2": {"numeric": 2}, "3": {"numeric": 1}, "4": {"numeric": 0}}'),

('5b732740-f04b-49dd-903c-c84253ec61df', 'Care este 15% din 200?', 16,
'[{"value": 0, "label": "25"}, {"value": 1, "label": "30"}, {"value": 2, "label": "35"}, {"value": 3, "label": "40"}, {"value": 4, "label": "45"}]',
'{"0": {"numeric": 1}, "1": {"numeric": 4}, "2": {"numeric": 2}, "3": {"numeric": 1}, "4": {"numeric": 0}}');

-- Dimensiunea: Raționament Logic (8 întrebări)
INSERT INTO test_questions (test_type_id, question_text, question_order, options, scoring_weights) VALUES
('5b732740-f04b-49dd-903c-c84253ec61df', 'Dacă toți A sunt B și toți B sunt C, atunci:', 17,
'[{"value": 0, "label": "Toți A sunt C"}, {"value": 1, "label": "Unii A sunt C"}, {"value": 2, "label": "Niciun A nu este C"}, {"value": 3, "label": "Nu se poate determina"}, {"value": 4, "label": "Toți C sunt A"}]',
'{"0": {"logic": 4}, "1": {"logic": 2}, "2": {"logic": 0}, "3": {"logic": 1}, "4": {"logic": 0}}'),

('5b732740-f04b-49dd-903c-c84253ec61df', 'Care este concluzia logică: Toți programatorii știu matematică. Ion este programator.', 18,
'[{"value": 0, "label": "Ion nu știe matematică"}, {"value": 1, "label": "Ion știe matematică"}, {"value": 2, "label": "Ion poate să știe matematică"}, {"value": 3, "label": "Nu avem suficiente informații"}, {"value": 4, "label": "Ion este matematician"}]',
'{"0": {"logic": 0}, "1": {"logic": 4}, "2": {"logic": 2}, "3": {"logic": 1}, "4": {"logic": 1}}'),

('5b732740-f04b-49dd-903c-c84253ec61df', 'Care afirmație contradict premisa: "Niciun păsări nu poate zbura"?', 19,
'[{"value": 0, "label": "Unele păsări nu zboară"}, {"value": 1, "label": "Toate păsările zboară"}, {"value": 2, "label": "Cel puțin o pasăre poate zbura"}, {"value": 3, "label": "Păsările sunt animale"}, {"value": 4, "label": "Păsările au pene"}]',
'{"0": {"logic": 1}, "1": {"logic": 3}, "2": {"logic": 4}, "3": {"logic": 0}, "4": {"logic": 0}}'),

('5b732740-f04b-49dd-903c-c84253ec61df', 'Dacă P implică Q și Q implică R, atunci:', 20,
'[{"value": 0, "label": "P implică R"}, {"value": 1, "label": "R implică P"}, {"value": 2, "label": "P și R sunt echivalente"}, {"value": 3, "label": "Nu există legătură între P și R"}, {"value": 4, "label": "Q este fals"}]',
'{"0": {"logic": 4}, "1": {"logic": 1}, "2": {"logic": 2}, "3": {"logic": 0}, "4": {"logic": 0}}'),

('5b732740-f04b-49dd-903c-c84253ec61df', 'Care dintre următoarele este un exemplu de raționament valid?', 21,
'[{"value": 0, "label": "Toți oamenii mor. Socrate este om. Socrate moare."}, {"value": 1, "label": "Unii câini sunt mari. Rex este câine. Rex este mare."}, {"value": 2, "label": "Toate rozele sunt roșii. Aceasta este roșie. Aceasta este trandafir."}, {"value": 3, "label": "Unii studenți sunt inteligenți. Maria este studentă. Maria este inteligentă."}, {"value": 4, "label": "Toate mașinile au roți. Aceasta are roți. Aceasta este mașină."}]',
'{"0": {"logic": 4}, "1": {"logic": 1}, "2": {"logic": 0}, "3": {"logic": 1}, "4": {"logic": 0}}'),

('5b732740-f04b-49dd-903c-c84253ec61df', 'Care este negația propoziției: "Toți elevii au învățat lecția"?', 22,
'[{"value": 0, "label": "Niciun elev nu a învățat lecția"}, {"value": 1, "label": "Cel puțin un elev nu a învățat lecția"}, {"value": 2, "label": "Unii elevi au învățat lecția"}, {"value": 3, "label": "Foarte puțini elevi au învățat lecția"}, {"value": 4, "label": "Majoritatea elevilor nu au învățat lecția"}]',
'{"0": {"logic": 2}, "1": {"logic": 4}, "2": {"logic": 1}, "3": {"logic": 1}, "4": {"logic": 2}}'),

('5b732740-f04b-49dd-903c-c84253ec61df', 'Dacă "Dacă plouă, atunci strada este udă" și "Strada nu este udă", ce putem concluziona?', 23,
'[{"value": 0, "label": "Plouă"}, {"value": 1, "label": "Nu plouă"}, {"value": 2, "label": "Poate să plouă"}, {"value": 3, "label": "Nu știm dacă plouă"}, {"value": 4, "label": "Strada va fi udă mai târziu"}]',
'{"0": {"logic": 0}, "1": {"logic": 4}, "2": {"logic": 2}, "3": {"logic": 1}, "4": {"logic": 0}}'),

('5b732740-f04b-49dd-903c-c84253ec61df', 'Care dintre următoarele este o premisă falsă într-un silogism valid?', 24,
'[{"value": 0, "label": "Toți oamenii sunt mortali"}, {"value": 1, "label": "Toți peștii zboară"}, {"value": 2, "label": "Unii câini sunt animale"}, {"value": 3, "label": "Toate plantele au rădăcini"}, {"value": 4, "label": "Unii studenți învață"}]',
'{"0": {"logic": 1}, "1": {"logic": 4}, "2": {"logic": 2}, "3": {"logic": 1}, "4": {"logic": 2}}');

-- Dimensiunea: Raționament Spațial (8 întrebări)
INSERT INTO test_questions (test_type_id, question_text, question_order, options, scoring_weights) VALUES
('5b732740-f04b-49dd-903c-c84253ec61df', 'Câte fețe are un cub?', 25,
'[{"value": 0, "label": "4"}, {"value": 1, "label": "6"}, {"value": 2, "label": "8"}, {"value": 3, "label": "10"}, {"value": 4, "label": "12"}]',
'{"0": {"spatial": 0}, "1": {"spatial": 4}, "2": {"spatial": 2}, "3": {"spatial": 1}, "4": {"spatial": 0}}'),

('5b732740-f04b-49dd-903c-c84253ec61df', 'Dacă rotesc un pătrat cu 45 de grade, ce formă obțin?', 26,
'[{"value": 0, "label": "Un pătrat identic"}, {"value": 1, "label": "Un romb"}, {"value": 2, "label": "Un pătrat rotit"}, {"value": 3, "label": "Un cerc"}, {"value": 4, "label": "Un triunghi"}]',
'{"0": {"spatial": 1}, "1": {"spatial": 2}, "2": {"spatial": 4}, "3": {"spatial": 0}, "4": {"spatial": 0}}'),

('5b732740-f04b-49dd-903c-c84253ec61df', 'Care este vederea de sus a unei piramide cu baza pătrată?', 27,
'[{"value": 0, "label": "Un cerc"}, {"value": 1, "label": "Un triunghi"}, {"value": 2, "label": "Un pătrat"}, {"value": 3, "label": "Un romb"}, {"value": 4, "label": "O linie"}]',
'{"0": {"spatial": 0}, "1": {"spatial": 1}, "2": {"spatial": 4}, "3": {"spatial": 2}, "4": {"spatial": 0}}'),

('5b732740-f04b-49dd-903c-c84253ec61df', 'Dacă desfac un cub, câte pătrate voi obține?', 28,
'[{"value": 0, "label": "4"}, {"value": 1, "label": "5"}, {"value": 2, "label": "6"}, {"value": 3, "label": "7"}, {"value": 4, "label": "8"}]',
'{"0": {"spatial": 0}, "1": {"spatial": 1}, "2": {"spatial": 4}, "3": {"spatial": 2}, "4": {"spatial": 1}}'),

('5b732740-f04b-49dd-903c-c84253ec61df', 'Care este imaginea în oglindă a literei "p"?', 29,
'[{"value": 0, "label": "q"}, {"value": 1, "label": "b"}, {"value": 2, "label": "d"}, {"value": 3, "label": "p"}, {"value": 4, "label": "u"}]',
'{"0": {"spatial": 4}, "1": {"spatial": 2}, "2": {"spatial": 1}, "3": {"spatial": 0}, "4": {"spatial": 0}}'),

('5b732740-f04b-49dd-903c-c84253ec61df', 'Dacă văd un obiect din față și arată ca un cerc, ce poate fi obiectul?', 30,
'[{"value": 0, "label": "Un cub"}, {"value": 1, "label": "O sferă"}, {"value": 2, "label": "Un cilindru"}, {"value": 3, "label": "Un con"}, {"value": 4, "label": "Toate variantele de mai sus"}]',
'{"0": {"spatial": 0}, "1": {"spatial": 3}, "2": {"spatial": 3}, "3": {"spatial": 2}, "4": {"spatial": 4}}'),

('5b732740-f04b-49dd-903c-c84253ec61df', 'Câte muchii are un tetraedru?', 31,
'[{"value": 0, "label": "4"}, {"value": 1, "label": "6"}, {"value": 2, "label": "8"}, {"value": 3, "label": "10"}, {"value": 4, "label": "12"}]',
'{"0": {"spatial": 2}, "1": {"spatial": 4}, "2": {"spatial": 1}, "3": {"spatial": 0}, "4": {"spatial": 0}}'),

('5b732740-f04b-49dd-903c-c84253ec61df', 'Dacă împart un cerc în 8 părți egale, care va fi unghiul fiecărei părți?', 32,
'[{"value": 0, "label": "30°"}, {"value": 1, "label": "40°"}, {"value": 2, "label": "45°"}, {"value": 3, "label": "50°"}, {"value": 4, "label": "60°"}]',
'{"0": {"spatial": 1}, "1": {"spatial": 0}, "2": {"spatial": 4}, "3": {"spatial": 2}, "4": {"spatial": 1}}');

-- Dimensiunea: Raționament Abstract (8 întrebări)
INSERT INTO test_questions (test_type_id, question_text, question_order, options, scoring_weights) VALUES
('5b732740-f04b-49dd-903c-c84253ec61df', 'Care este următorul element în secvența: ○, ●, ○○, ●●, ○○○, ?', 33,
'[{"value": 0, "label": "●●"}, {"value": 1, "label": "●●●"}, {"value": 2, "label": "○○○○"}, {"value": 3, "label": "●○●"}, {"value": 4, "label": "○●○"}]',
'{"0": {"abstract": 1}, "1": {"abstract": 4}, "2": {"abstract": 0}, "3": {"abstract": 2}, "4": {"abstract": 1}}'),

('5b732740-f04b-49dd-903c-c84253ec61df', 'Care model continuă seria: △, ▲, ▢, ■, ○, ?', 34,
'[{"value": 0, "label": "●"}, {"value": 1, "label": "▲"}, {"value": 2, "label": "▢"}, {"value": 3, "label": "△"}, {"value": 4, "label": "■"}]',
'{"0": {"abstract": 4}, "1": {"abstract": 1}, "2": {"abstract": 1}, "3": {"abstract": 2}, "4": {"abstract": 1}}'),

('5b732740-f04b-49dd-903c-c84253ec61df', 'Dacă A=1, B=2, C=3, atunci ce reprezintă secvența: 3,1,20?', 35,
'[{"value": 0, "label": "CAT"}, {"value": 1, "label": "BAT"}, {"value": 2, "label": "ACT"}, {"value": 3, "label": "TAB"}, {"value": 4, "label": "CAB"}]',
'{"0": {"abstract": 4}, "1": {"abstract": 2}, "2": {"abstract": 1}, "3": {"abstract": 1}, "4": {"abstract": 2}}'),

('5b732740-f04b-49dd-903c-c84253ec61df', 'Care este următorul număr în seria: 1, 1, 2, 3, 5, 8, ?', 36,
'[{"value": 0, "label": "11"}, {"value": 1, "label": "13"}, {"value": 2, "label": "15"}, {"value": 3, "label": "16"}, {"value": 4, "label": "21"}]',
'{"0": {"abstract": 2}, "1": {"abstract": 4}, "2": {"abstract": 1}, "3": {"abstract": 1}, "4": {"abstract": 0}}'),

('5b732740-f04b-49dd-903c-c84253ec61df', 'Care formă nu se potrivește cu celelalte: ▲, ▼, ◄, ►, ●?', 37,
'[{"value": 0, "label": "▲"}, {"value": 1, "label": "▼"}, {"value": 2, "label": "◄"}, {"value": 3, "label": "►"}, {"value": 4, "label": "●"}]',
'{"0": {"abstract": 1}, "1": {"abstract": 1}, "2": {"abstract": 1}, "3": {"abstract": 1}, "4": {"abstract": 4}}'),

('5b732740-f04b-49dd-903c-c84253ec61df', 'Dacă roșu + albastru = violet, atunci galben + roșu = ?', 38,
'[{"value": 0, "label": "Verde"}, {"value": 1, "label": "Orange"}, {"value": 2, "label": "Mov"}, {"value": 3, "label": "Roz"}, {"value": 4, "label": "Maro"}]',
'{"0": {"abstract": 2}, "1": {"abstract": 4}, "2": {"abstract": 1}, "3": {"abstract": 1}, "4": {"abstract": 0}}'),

('5b732740-f04b-49dd-903c-c84253ec61df', 'Care este modelul în secvența: 2, 4, 8, 16, ?', 39,
'[{"value": 0, "label": "24"}, {"value": 1, "label": "28"}, {"value": 2, "label": "32"}, {"value": 3, "label": "48"}, {"value": 4, "label": "64"}]',
'{"0": {"abstract": 1}, "1": {"abstract": 0}, "2": {"abstract": 4}, "3": {"abstract": 2}, "4": {"abstract": 1}}'),

('5b732740-f04b-49dd-903c-c84253ec61df', 'Care este următorul simbol în seria: *, **, ***, ****, ?', 40,
'[{"value": 0, "label": "*****"}, {"value": 1, "label": "****"}, {"value": 2, "label": "***"}, {"value": 3, "label": "**"}, {"value": 4, "label": "*"}]',
'{"0": {"abstract": 4}, "1": {"abstract": 3}, "2": {"abstract": 2}, "3": {"abstract": 1}, "4": {"abstract": 0}}');
