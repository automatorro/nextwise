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