
-- Remove the duplicate HEXACO test (keeping only the properly named one)
DELETE FROM test_types WHERE name = 'HEXACO Personalitate';

-- Update the remaining HEXACO test to have consistent naming
UPDATE test_types 
SET name = 'Test de Personalitate HEXACO',
    description = 'Evaluează personalitatea pe baza modelului HEXACO cu 6 dimensiuni principale: Onestitate-Umilință, Emotivitate, Extraversiune, Agreabilitate, Conștiinciozitate și Deschidere.'
WHERE name LIKE '%HEXACO%';
