-- First, let's see what templates we have and add missing ones
INSERT INTO career_plan_templates (title, description, category, difficulty_level, estimated_duration_months, required_skills, target_roles) VALUES
('Data Scientist', 'Plan complet pentru tranziția către Data Science cu focus pe Python, Machine Learning și analiză de date', 'analytics', 'intermediate', 8, '["Python", "Statistics", "Machine Learning", "SQL", "Data Visualization"]', '["Data Scientist", "ML Engineer", "Data Analyst"]'),
('Senior Trainer', 'Plan de dezvoltare pentru rolul de Senior Trainer cu focus pe competențe de instruire și facilitare', 'management', 'intermediate', 6, '["Public Speaking", "Instructional Design", "Communication", "Facilitation", "Adult Learning"]', '["Senior Trainer", "Training Manager", "L&D Specialist"]'),
('Product Manager', 'Plan de carieră pentru Product Management cu focus pe strategie produse și management echipe', 'management', 'advanced', 10, '["Product Strategy", "User Research", "Data Analysis", "Agile", "Stakeholder Management"]', '["Product Manager", "Senior Product Manager", "Product Owner"]'),
('UX Designer', 'Plan pentru tranziția către UX Design cu focus pe research, prototyping și design thinking', 'design', 'beginner', 7, '["Design Thinking", "Prototyping", "User Research", "Figma", "Usability Testing"]', '["UX Designer", "Product Designer", "UI/UX Designer"]')
ON CONFLICT (title) DO UPDATE SET
  description = EXCLUDED.description,
  category = EXCLUDED.category,
  difficulty_level = EXCLUDED.difficulty_level,
  estimated_duration_months = EXCLUDED.estimated_duration_months,
  required_skills = EXCLUDED.required_skills,
  target_roles = EXCLUDED.target_roles;

-- Clear existing template milestones to avoid duplicates
DELETE FROM career_template_milestones WHERE template_id IN (
  SELECT id FROM career_plan_templates WHERE title IN ('Data Scientist', 'Senior Trainer', 'Product Manager', 'UX Designer', 'Full Stack Developer')
);

-- Add comprehensive milestones for Data Scientist template
INSERT INTO career_template_milestones (template_id, title, description, milestone_order, estimated_duration_weeks, required_skills, resources)
SELECT 
  id,
  milestone_data.title,
  milestone_data.description,
  milestone_data.milestone_order,
  milestone_data.estimated_duration_weeks,
  milestone_data.required_skills,
  milestone_data.resources
FROM career_plan_templates,
(VALUES
  ('Fundamentele Python și Statistică', 'Învață Python de la zero și conceptele statistice fundamentale necesare pentru data science', 1, 3, '["Python", "Statistics", "Basic Math"]', '[
    {
      "type": "course",
      "title": "Python for Everybody - University of Michigan",
      "url": "https://www.coursera.org/specializations/python",
      "description": "Specializare completă Python gratuită cu certificat audit",
      "estimatedHours": 40,
      "isFree": true
    },
    {
      "type": "course", 
      "title": "Introduction to Statistics - Stanford",
      "url": "https://www.edx.org/course/introduction-to-statistics-descriptive",
      "description": "Statistică descriptivă și inferențială de la Stanford",
      "estimatedHours": 25,
      "isFree": true
    },
    {
      "type": "practice",
      "title": "Python Practice - HackerRank",
      "url": "https://www.hackerrank.com/domains/python",
      "description": "Exerciții practice Python pentru consolidare",
      "estimatedHours": 15,
      "isFree": true
    }
  ]'),
  ('Pandas și Manipularea Datelor', 'Stăpânește librăria Pandas pentru curățarea și manipularea datelor', 2, 2, '["Python", "Pandas", "Data Cleaning"]', '[
    {
      "type": "course",
      "title": "Data Analysis with Python - IBM",
      "url": "https://www.coursera.org/learn/data-analysis-with-python",
      "description": "Curs IBM gratuit pentru analiza datelor cu Python",
      "estimatedHours": 30,
      "isFree": true
    },
    {
      "type": "video",
      "title": "Pandas Tutorial - Corey Schafer",
      "url": "https://www.youtube.com/playlist?list=PL-osiE80TeTsWmV9i9c58mdDCSskIFdDS",
      "description": "Tutorial complet Pandas de la expert",
      "estimatedHours": 12,
      "isFree": true
    }
  ]'),
  ('Machine Learning Fundamentals', 'Înțelege algoritmii de Machine Learning și implementează primele modele', 3, 4, '["Machine Learning", "Scikit-learn", "Model Evaluation"]', '[
    {
      "type": "course", 
      "title": "Machine Learning - Andrew Ng",
      "url": "https://www.coursera.org/learn/machine-learning",
      "description": "Cel mai popular curs ML din lume, gratuit cu audit",
      "estimatedHours": 55,
      "isFree": true
    },
    {
      "type": "course",
      "title": "Introduction to Machine Learning - MIT",
      "url": "https://www.edx.org/course/introduction-to-machine-learning",
      "description": "Curs MIT pentru ML fundamentals",
      "estimatedHours": 40,
      "isFree": true
    }
  ]'),
  ('Primul Proiect Portfolio', 'Construiește primul proiect complet de data science pentru portofoliu', 4, 3, '["Project Management", "Data Storytelling", "GitHub"]', '[
    {
      "type": "practice",
      "title": "Kaggle Learn",
      "url": "https://www.kaggle.com/learn",
      "description": "Micro-cursuri gratuite și dataset-uri pentru practică",
      "estimatedHours": 20,
      "isFree": true
    },
    {
      "type": "article",
      "title": "How to Build a Data Science Portfolio",
      "url": "https://towardsdatascience.com/how-to-build-a-data-science-portfolio-5f566517c79c",
      "description": "Ghid complet pentru crearea portofoliului",
      "estimatedHours": 5,
      "isFree": true
    }
  ]'),
  ('SQL și Baze de Date', 'Învață SQL pentru extragerea și manipularea datelor din baze de date', 5, 2, '["SQL", "Database Design", "Data Extraction"]', '[
    {
      "type": "course",
      "title": "SQL for Data Science - UC Davis",
      "url": "https://www.coursera.org/learn/sql-for-data-science",
      "description": "SQL specializat pentru data science, gratuit cu audit",
      "estimatedHours": 25,
      "isFree": true
    },
    {
      "type": "practice",
      "title": "W3Schools SQL Tutorial",
      "url": "https://www.w3schools.com/sql/",
      "description": "Tutorial interactiv SQL cu exerciții",
      "estimatedHours": 15,
      "isFree": true
    }
  ]'),
  ('Data Visualization', 'Creează vizualizări impactante cu Matplotlib, Seaborn și Plotly', 6, 2, '["Data Visualization", "Matplotlib", "Storytelling"]', '[
    {
      "type": "course",
      "title": "Data Visualization with Python - IBM",
      "url": "https://www.coursera.org/learn/python-for-data-visualization",
      "description": "Vizualizare de date cu librării Python",
      "estimatedHours": 20,
      "isFree": true
    },
    {
      "type": "video",
      "title": "Matplotlib Tutorial - Sentdex",
      "url": "https://www.youtube.com/playlist?list=PLQVvvaa0QuDfefDfXb9Yf0la1fPDKluPF",
      "description": "Tutorial complet matplotlib",
      "estimatedHours": 10,
      "isFree": true
    }
  ]')
) AS milestone_data(title, description, milestone_order, estimated_duration_weeks, required_skills, resources)
WHERE career_plan_templates.title = 'Data Scientist';

-- Add milestones for Senior Trainer template
INSERT INTO career_template_milestones (template_id, title, description, milestone_order, estimated_duration_weeks, required_skills, resources)
SELECT 
  id,
  milestone_data.title,
  milestone_data.description,
  milestone_data.milestone_order,
  milestone_data.estimated_duration_weeks,
  milestone_data.required_skills,
  milestone_data.resources
FROM career_plan_templates,
(VALUES
  ('Fundamentele Public Speaking', 'Dezvoltă competențele de prezentare și comunicare eficientă în public', 1, 2, '["Public Speaking", "Communication", "Confidence"]', '[
    {
      "type": "course",
      "title": "Introduction to Public Speaking - University of Washington",
      "url": "https://www.edx.org/course/introduction-to-public-speaking",
      "description": "Curs complet de public speaking de la UW",
      "estimatedHours": 20,
      "isFree": true
    },
    {
      "type": "practice",
      "title": "Toastmasters International",
      "url": "https://www.toastmasters.org/find-a-club",
      "description": "Găsește un club local pentru practică",
      "estimatedHours": 8,
      "isFree": true
    }
  ]'),
  ('Instructional Design', 'Învață să creezi materiale educaționale eficiente și angajante', 2, 3, '["Instructional Design", "Learning Theory", "Curriculum Development"]', '[
    {
      "type": "course",
      "title": "Learning How to Learn - UC San Diego",
      "url": "https://www.coursera.org/learn/learning-how-to-learn",
      "description": "Cel mai popular curs despre învățare, gratuit",
      "estimatedHours": 15,
      "isFree": true
    },
    {
      "type": "article",
      "title": "ADDIE Model Guide",
      "url": "https://www.instructionaldesign.org/models/addie/",
      "description": "Ghid complet pentru modelul ADDIE",
      "estimatedHours": 3,
      "isFree": true
    }
  ]'),
  ('Facilitarea Grupurilor', 'Stăpânește arta facilitării și managementului grupurilor de învățare', 3, 2, '["Facilitation", "Group Dynamics", "Conflict Resolution"]', '[
    {
      "type": "course",
      "title": "Facilitation Skills - LinkedIn Learning",
      "url": "https://www.linkedin.com/learning/topics/facilitation",
      "description": "Cursuri de facilitare (acces gratuit 1 lună)",
      "estimatedHours": 12,
      "isFree": true
    },
    {
      "type": "book",
      "title": "The Art of Gathering - Priya Parker",
      "url": "https://archive.org/details/artofgatheringho0000park",
      "description": "Cartea fundamentală despre organizarea întâlnirilor",
      "estimatedHours": 8,
      "isFree": true
    }
  ]'),
  ('Primul Workshop', 'Organizează și livrează primul tău workshop de training', 4, 4, '["Workshop Design", "Activity Planning", "Feedback Collection"]', '[
    {
      "type": "practice",
      "title": "Volunteer Training Opportunity",
      "url": "https://www.volunteermatch.org/search/?v=false&s=1&o=recency&l=Remote&k=training",
      "description": "Caută oportunități de volunteer pentru practică",
      "estimatedHours": 16,
      "isFree": true
    },
    {
      "type": "template",
      "title": "Workshop Planning Template",
      "url": "https://www.sessionlab.com/templates/",
      "description": "Template-uri gratuite pentru planificarea workshop-urilor",
      "estimatedHours": 4,
      "isFree": true
    }
  ]'),
  ('Feedback și Evaluare', 'Învață să colectezi și analizezi feedback-ul pentru îmbunătățirea continuă', 5, 2, '["Feedback Collection", "Performance Evaluation", "Continuous Improvement"]', '[
    {
      "type": "course",
      "title": "Giving Helpful Feedback - University of Colorado",
      "url": "https://www.coursera.org/learn/feedback-loops",
      "description": "Curs despre oferirea feedback-ului constructiv",
      "estimatedHours": 12,
      "isFree": true
    },
    {
      "type": "tool",
      "title": "Google Forms for Feedback",
      "url": "https://www.google.com/forms/about/",
      "description": "Creează formulare de feedback profesionale",
      "estimatedHours": 2,
      "isFree": true
    }
  ]'),
  ('Networking în L&D', 'Construiește o rețea profesională în domeniul Learning & Development', 6, 3, '["Professional Networking", "Industry Knowledge", "Career Development"]', '[
    {
      "type": "networking",
      "title": "ATD (Association for Talent Development)",
      "url": "https://www.td.org/",
      "description": "Cea mai mare asociație pentru profesioniștii L&D",
      "estimatedHours": 5,
      "isFree": true
    },
    {
      "type": "networking", 
      "title": "LinkedIn L&D Groups",
      "url": "https://www.linkedin.com/groups/",
      "description": "Grupuri specializate Learning & Development",
      "estimatedHours": 6,
      "isFree": true
    }
  ]')
) AS milestone_data(title, description, milestone_order, estimated_duration_weeks, required_skills, resources)
WHERE career_plan_templates.title = 'Senior Trainer';

-- Add milestones for Product Manager template  
INSERT INTO career_template_milestones (template_id, title, description, milestone_order, estimated_duration_weeks, required_skills, resources)
SELECT 
  id,
  milestone_data.title,
  milestone_data.description,
  milestone_data.milestone_order,
  milestone_data.estimated_duration_weeks,
  milestone_data.required_skills,
  milestone_data.resources
FROM career_plan_templates,
(VALUES
  ('Product Strategy Fundamentals', 'Înțelege strategia produselor și cum să construiești roadmap-uri eficiente', 1, 3, '["Product Strategy", "Market Research", "Competitive Analysis"]', '[
    {
      "type": "course",
      "title": "Product Management - University of Virginia", 
      "url": "https://www.coursera.org/learn/uva-darden-product-management",
      "description": "Curs fundamental de product management",
      "estimatedHours": 30,
      "isFree": true
    },
    {
      "type": "book",
      "title": "Inspired - Marty Cagan",
      "url": "https://archive.org/details/inspiredhowtocre0000caga",
      "description": "Biblia product management-ului",
      "estimatedHours": 12,
      "isFree": true
    }
  ]'),
  ('User Research și Validare', 'Învață să înțelegi utilizatorii și să validezi idei de produs', 2, 4, '["User Research", "Customer Interviews", "Survey Design"]', '[
    {
      "type": "course",
      "title": "User Experience Research - University of Michigan",
      "url": "https://www.coursera.org/learn/user-research",
      "description": "Curs complet de user research",
      "estimatedHours": 25,
      "isFree": true
    },
    {
      "type": "template",
      "title": "User Interview Templates",
      "url": "https://www.nngroup.com/articles/user-interviews/",
      "description": "Template-uri pentru interviuri cu utilizatorii",
      "estimatedHours": 3,
      "isFree": true
    }
  ]'),
  ('Agile și Scrum', 'Stăpânește metodologiile agile și rolul PM în echipe Scrum', 3, 2, '["Agile", "Scrum", "Sprint Planning"]', '[
    {
      "type": "course",
      "title": "Agile Development - University of Virginia",
      "url": "https://www.coursera.org/learn/agile-development",
      "description": "Principiile dezvoltării agile",
      "estimatedHours": 20,
      "isFree": true
    },
    {
      "type": "certification",
      "title": "Professional Scrum Product Owner",
      "url": "https://www.scrum.org/assessments/professional-scrum-product-owner-i-assessment",
      "description": "Certificare gratuită Scrum Product Owner",
      "estimatedHours": 15,
      "isFree": true
    }
  ]'),
  ('Data-Driven Decisions', 'Învață să folosești datele pentru luarea deciziilor de produs', 4, 3, '["Data Analysis", "A/B Testing", "Analytics"]', '[
    {
      "type": "course",
      "title": "Data Analysis for Decision Making - University of Colorado",
      "url": "https://www.coursera.org/learn/data-analysis-decision-making",
      "description": "Analiza datelor pentru luarea deciziilor",
      "estimatedHours": 25,
      "isFree": true
    },
    {
      "type": "tool",
      "title": "Google Analytics Academy",
      "url": "https://analytics.google.com/analytics/academy/",
      "description": "Cursuri gratuite Google Analytics",
      "estimatedHours": 12,
      "isFree": true
    }
  ]'),
  ('Stakeholder Management', 'Dezvoltă competențele de comunicare și management al stakeholder-ilor', 5, 2, '["Communication", "Stakeholder Management", "Presentation Skills"]', '[
    {
      "type": "course",
      "title": "Successful Negotiation - University of Michigan",
      "url": "https://www.coursera.org/learn/negotiation",
      "description": "Competențe de negociere pentru PM",
      "estimatedHours": 20,
      "isFree": true
    },
    {
      "type": "article",
      "title": "Stakeholder Mapping Guide",
      "url": "https://www.mindtools.com/pages/article/newPPM_07.htm",
      "description": "Ghid pentru maparea stakeholder-ilor",
      "estimatedHours": 2,
      "isFree": true
    }
  ]'),
  ('Primul Produs', 'Lucrează la primul tău produs complet - de la idee la lansare', 6, 6, '["Product Launch", "Go-to-Market", "Project Management"]', '[
    {
      "type": "practice",
      "title": "Product Hunt Maker Program",
      "url": "https://www.producthunt.com/makers",
      "description": "Comunitate pentru lansarea primului produs",
      "estimatedHours": 30,
      "isFree": true
    },
    {
      "type": "template",
      "title": "Product Requirements Document",
      "url": "https://www.atlassian.com/agile/product-management/requirements",
      "description": "Template PRD de la Atlassian",
      "estimatedHours": 4,
      "isFree": true
    }
  ]')
) AS milestone_data(title, description, milestone_order, estimated_duration_weeks, required_skills, resources)
WHERE career_plan_templates.title = 'Product Manager';

-- Add milestones for UX Designer template
INSERT INTO career_template_milestones (template_id, title, description, milestone_order, estimated_duration_weeks, required_skills, resources)
SELECT 
  id,
  milestone_data.title,
  milestone_data.description,
  milestone_data.milestone_order,
  milestone_data.estimated_duration_weeks,
  milestone_data.required_skills,
  milestone_data.resources
FROM career_plan_templates,
(VALUES
  ('Design Thinking Fundamentals', 'Înțelege procesul de design thinking și principiile UX', 1, 2, '["Design Thinking", "User Empathy", "Problem Solving"]', '[
    {
      "type": "course",
      "title": "Design Thinking - University of Virginia",
      "url": "https://www.coursera.org/learn/uva-darden-design-thinking",
      "description": "Curs fundamental de design thinking",
      "estimatedHours": 20,
      "isFree": true
    },
    {
      "type": "course",
      "title": "Human-Computer Interaction - UC San Diego",
      "url": "https://www.coursera.org/learn/human-computer-interaction",
      "description": "Principiile interacțiunii om-calculator",
      "estimatedHours": 25,
      "isFree": true
    }
  ]'),
  ('User Research Methods', 'Învață metodele de cercetare pentru înțelegerea utilizatorilor', 2, 3, '["User Research", "Usability Testing", "Interview Techniques"]', '[
    {
      "type": "course",
      "title": "User Experience Research - University of Michigan",
      "url": "https://www.coursera.org/learn/user-research",
      "description": "Metode de cercetare UX complete",
      "estimatedHours": 25,
      "isFree": true
    },
    {
      "type": "tool",
      "title": "Maze - User Testing",
      "url": "https://maze.co/",
      "description": "Platform gratuit pentru testarea usabilității",
      "estimatedHours": 5,
      "isFree": true
    }
  ]'),
  ('Wireframing și Prototyping', 'Creează wireframe-uri și prototipuri pentru testarea ideilor', 3, 3, '["Wireframing", "Prototyping", "Information Architecture"]', '[
    {
      "type": "tool",
      "title": "Figma Basics",
      "url": "https://www.figma.com/academy/",
      "description": "Academia Figma cu cursuri gratuite",
      "estimatedHours": 15,
      "isFree": true
    },
    {
      "type": "course",
      "title": "Interaction Design - UC San Diego",
      "url": "https://www.coursera.org/learn/interaction-design",
      "description": "Principiile interaction design-ului",
      "estimatedHours": 30,
      "isFree": true
    }
  ]'),
  ('Visual Design Principles', 'Înțelege principiile design-ului vizual și tipografiei', 4, 2, '["Visual Design", "Typography", "Color Theory"]', '[
    {
      "type": "course",
      "title": "Graphic Design - CalArts",
      "url": "https://www.coursera.org/learn/fundamentals-of-graphic-design",
      "description": "Fundamentele design-ului grafic",
      "estimatedHours": 20,
      "isFree": true
    },
    {
      "type": "resource",
      "title": "Material Design Guidelines",
      "url": "https://material.io/design",
      "description": "Ghidurile complete Google Material Design",
      "estimatedHours": 8,
      "isFree": true
    }
  ]'),
  ('Primul Proiect UX', 'Realizează primul tău proiect UX complet pentru portofoliu', 5, 4, '["Portfolio Creation", "Case Study Writing", "Presentation Skills"]', '[
    {
      "type": "practice",
      "title": "Daily UI Challenge",
      "url": "https://www.dailyui.co/",
      "description": "Challenge zilnic pentru practică design",
      "estimatedHours": 30,
      "isFree": true
    },
    {
      "type": "article",
      "title": "UX Portfolio Guide",
      "url": "https://uxplanet.org/how-to-create-a-ux-portfolio-c676cb0eb93e",
      "description": "Ghid pentru crearea portofoliului UX",
      "estimatedHours": 5,
      "isFree": true
    }
  ]'),
  ('Usability Testing', 'Învață să testezi și să îmbunătățești designurile bazat pe feedback real', 6, 2, '["Usability Testing", "User Feedback", "Iteration"]', '[
    {
      "type": "course",
      "title": "UX Research Methods - MIT",
      "url": "https://www.edx.org/course/introduction-to-user-experience-design",
      "description": "Metode de cercetare UX de la MIT",
      "estimatedHours": 20,
      "isFree": true
    },
    {
      "type": "tool",
      "title": "UserTesting Platform",
      "url": "https://www.usertesting.com/",
      "description": "Platform pentru testarea cu utilizatori reali",
      "estimatedHours": 10,
      "isFree": true
    }
  ]')
) AS milestone_data(title, description, milestone_order, estimated_duration_weeks, required_skills, resources)
WHERE career_plan_templates.title = 'UX Designer';