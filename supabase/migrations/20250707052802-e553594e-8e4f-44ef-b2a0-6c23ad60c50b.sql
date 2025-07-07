-- Add milestones for Senior Trainer template
INSERT INTO career_template_milestones (template_id, title, description, milestone_order, estimated_duration_weeks, required_skills, resources)
SELECT 
  id,
  milestone_data.title,
  milestone_data.description,
  milestone_data.milestone_order,
  milestone_data.estimated_duration_weeks,
  milestone_data.required_skills::jsonb,
  milestone_data.resources::jsonb
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
  ('Primul Workshop', 'Organizează și livrează primul tău workshop de training', 3, 4, '["Workshop Design", "Activity Planning", "Feedback Collection"]', '[
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
  ('Networking în L&D', 'Construiește o rețea profesională în domeniul Learning & Development', 4, 3, '["Professional Networking", "Industry Knowledge", "Career Development"]', '[
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

-- Add milestones for UX Designer template
INSERT INTO career_template_milestones (template_id, title, description, milestone_order, estimated_duration_weeks, required_skills, resources)
SELECT 
  id,
  milestone_data.title,
  milestone_data.description,
  milestone_data.milestone_order,
  milestone_data.estimated_duration_weeks,
  milestone_data.required_skills::jsonb,
  milestone_data.resources::jsonb
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
  ('Primul Proiect UX', 'Realizează primul tău proiect UX complet pentru portofoliu', 4, 4, '["Portfolio Creation", "Case Study Writing", "Presentation Skills"]', '[
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
  ]')
) AS milestone_data(title, description, milestone_order, estimated_duration_weeks, required_skills, resources)
WHERE career_plan_templates.title = 'UX Designer';