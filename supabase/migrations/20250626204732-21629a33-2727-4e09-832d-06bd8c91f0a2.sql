
-- Update options_en with correct English translations for Belbin test questions
-- Fixed version with proper quote escaping

UPDATE test_questions 
SET options_en = jsonb_build_array(
  jsonb_build_object('value', 0, 'label', 'I come up with new and creative ideas for team problems'),
  jsonb_build_object('value', 1, 'label', 'I look for resources and opportunities outside'),
  jsonb_build_object('value', 2, 'label', 'I coordinate the efforts of team members'),
  jsonb_build_object('value', 3, 'label', 'I try to give direction and motivate the team'),
  jsonb_build_object('value', 4, 'label', 'I critically analyze options and evaluate objectively'),
  jsonb_build_object('value', 5, 'label', 'I make sure everyone feels comfortable contributing'),
  jsonb_build_object('value', 6, 'label', 'I transform ideas into practical and achievable plans'),
  jsonb_build_object('value', 7, 'label', 'I check details and make sure everything is correct'),
  jsonb_build_object('value', 8, 'label', 'I offer specialized knowledge in my field')
)
WHERE question_text_ro LIKE '%Când lucrez în echipă%' 
AND test_type_id IN (SELECT id FROM test_types WHERE name LIKE '%Belbin%');

UPDATE test_questions 
SET options_en = jsonb_build_array(
  jsonb_build_object('value', 0, 'label', 'Transform plans into concrete and systematic actions'),
  jsonb_build_object('value', 1, 'label', 'Verify that everything is complete and error-free'),
  jsonb_build_object('value', 2, 'label', 'Bring the necessary technical expertise'),
  jsonb_build_object('value', 3, 'label', 'Find innovative solutions to blockages'),
  jsonb_build_object('value', 4, 'label', 'Explore new possibilities and resources')
)
WHERE question_text_ro LIKE '%contribuția mea unică%' 
AND test_type_id IN (SELECT id FROM test_types WHERE name LIKE '%Belbin%');

UPDATE test_questions 
SET options_en = jsonb_build_array(
  jsonb_build_object('value', 0, 'label', 'Direct and results-oriented'),
  jsonb_build_object('value', 1, 'label', 'Analytical and full of questions'),
  jsonb_build_object('value', 2, 'label', 'Supportive and encouraging'),
  jsonb_build_object('value', 3, 'label', 'Practical and solution-oriented'),
  jsonb_build_object('value', 4, 'label', 'Detail-oriented and precise')
)
WHERE question_text_ro LIKE '%stilul meu de comunicare%' 
AND test_type_id IN (SELECT id FROM test_types WHERE name LIKE '%Belbin%');

UPDATE test_questions 
SET options_en = jsonb_build_array(
  jsonb_build_object('value', 0, 'label', 'I focus on perfect completion of tasks'),
  jsonb_build_object('value', 1, 'label', 'I bring my specialized knowledge to accelerate the process'),
  jsonb_build_object('value', 2, 'label', 'I find creative solutions to save time'),
  jsonb_build_object('value', 3, 'label', 'I mobilize the team and push for delivery'),
  jsonb_build_object('value', 4, 'label', 'I look for external resources that could help')
)
WHERE question_text_ro LIKE '%presiune de timp%' 
AND test_type_id IN (SELECT id FROM test_types WHERE name LIKE '%Belbin%');

UPDATE test_questions 
SET options_en = jsonb_build_array(
  jsonb_build_object('value', 0, 'label', 'Keep the team united and motivated'),
  jsonb_build_object('value', 1, 'label', 'Execute plans efficiently and systematically'),
  jsonb_build_object('value', 2, 'label', 'Improve quality and eliminate errors'),
  jsonb_build_object('value', 3, 'label', 'Bring specialized perspective in my field'),
  jsonb_build_object('value', 4, 'label', 'Delegate and coordinate activities')
)
WHERE question_text_ro LIKE '%rolul meu preferat%' 
AND test_type_id IN (SELECT id FROM test_types WHERE name LIKE '%Belbin%');

UPDATE test_questions 
SET options_en = jsonb_build_array(
  jsonb_build_object('value', 0, 'label', 'I evaluate them critically and identify potential problems'),
  jsonb_build_object('value', 1, 'label', 'I think about how to implement them practically'),
  jsonb_build_object('value', 2, 'label', 'I check if they are compatible with our standards'),
  jsonb_build_object('value', 3, 'label', 'I develop and enrich them with new perspectives'),
  jsonb_build_object('value', 4, 'label', 'I look for ways to promote and support them')
)
WHERE question_text_ro LIKE '%idei noi%' 
AND test_type_id IN (SELECT id FROM test_types WHERE name LIKE '%Belbin%');

UPDATE test_questions 
SET options_en = jsonb_build_array(
  jsonb_build_object('value', 0, 'label', 'I analyze them carefully and offer evidence-based recommendations'),
  jsonb_build_object('value', 1, 'label', 'I focus on minimizing them through detailed planning'),
  jsonb_build_object('value', 2, 'label', 'I check all details to avoid problems'),
  jsonb_build_object('value', 3, 'label', 'I take calculated risks to get better results'),
  jsonb_build_object('value', 4, 'label', 'I explore creative alternatives to avoid them')
)
WHERE question_text_ro LIKE '%risc%' 
AND test_type_id IN (SELECT id FROM test_types WHERE name LIKE '%Belbin%');

UPDATE test_questions 
SET options_en = jsonb_build_array(
  jsonb_build_object('value', 0, 'label', 'I offer emotional support and encourage the team'),
  jsonb_build_object('value', 1, 'label', 'I find practical solutions to overcome problems'),
  jsonb_build_object('value', 2, 'label', 'I make sure we do not repeat the same mistakes'),
  jsonb_build_object('value', 3, 'label', 'I bring my expertise to solve technical problems'),
  jsonb_build_object('value', 4, 'label', 'I redefine the problem and propose new approaches')
)
WHERE question_text_ro LIKE '%probleme%' 
AND test_type_id IN (SELECT id FROM test_types WHERE name LIKE '%Belbin%');

UPDATE test_questions 
SET options_en = jsonb_build_array(
  jsonb_build_object('value', 0, 'label', 'I make sure everyone gets tasks suited to their abilities'),
  jsonb_build_object('value', 1, 'label', 'I focus on quickly obtaining results'),
  jsonb_build_object('value', 2, 'label', 'I check progress and quality regularly'),
  jsonb_build_object('value', 3, 'label', 'I take on tasks that require my expertise'),
  jsonb_build_object('value', 4, 'label', 'I try to find new ways of organizing')
)
WHERE question_text_ro LIKE '%sarcini%' 
AND test_type_id IN (SELECT id FROM test_types WHERE name LIKE '%Belbin%');

UPDATE test_questions 
SET options_en = jsonb_build_array(
  jsonb_build_object('value', 0, 'label', 'I focus on technical and specialized aspects'),
  jsonb_build_object('value', 1, 'label', 'I evaluate innovation and creativity of solutions'),
  jsonb_build_object('value', 2, 'label', 'I check if processes were followed correctly'),
  jsonb_build_object('value', 3, 'label', 'I look at final results and impact'),
  jsonb_build_object('value', 4, 'label', 'I objectively analyze what worked and what did not')
)
WHERE question_text_ro LIKE '%evalua%' 
AND test_type_id IN (SELECT id FROM test_types WHERE name LIKE '%Belbin%');
