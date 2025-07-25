
-- Update the test name in the test_types table
UPDATE test_types 
SET name = 'Test de Competențe Manageriale'
WHERE name = 'Aptitudini Profesionale';

-- Also update the description to better reflect the managerial content
UPDATE test_types 
SET description = 'Evaluează competențele manageriale prin scenarii de judecată situațională. Testul măsoară abilitățile de leadership, luarea deciziilor și gestionarea echipei în diverse contexte profesionale.'
WHERE name = 'Test de Competențe Manageriale';
