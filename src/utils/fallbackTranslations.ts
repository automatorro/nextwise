
import type { Language, Translations } from '@/types/language';

export const fallbackTranslations: Record<Language, Translations> = {
  ro: {
    common: {
      poweredByAI: "Alimentat de AI",
      success: "Succes",
      error: "Eroare",
      loading: "Se încarcă...",
      save: "Salvează",
      cancel: "Anulează",
      delete: "Șterge",
      edit: "Editează",
      view: "Vizualizează",
      back: "Înapoi",
      next: "Următor",
      previous: "Anterior",
      close: "Închide",
      confirm: "Confirmă",
      yes: "Da",
      no: "Nu"
    },
    nav: {
      login: "Autentificare",
      logout: "Deconectare",
      startFree: "Începe Gratuit",
      dashboard: "Tablou de Bord",
      tests: "Teste",
      career: "Carieră",
      profile: "Profil",
      subscriptionSettings: "Setări Abonament"
    },
    home: {
      title: "Descoperă-ți potențialul și dezvoltă-ți cariera",
      subtitle: "Platforma AI care te ajută să îți înțelegi personalitatea, să îți identifici punctele forte și să îți construiești calea ideală în carieră prin evaluări psihologice avansate.",
      ctaButton: "Începe Evaluarea Gratuită",
      demoButton: "Vezi Demo",
      featuresTitle: "De ce să alegi EmpowerCareer?",
      featuresSubtitle: "Descoperă cum tehnologia AI poate transforma modul în care îți înțelegi personalitatea și îți planifici cariera.",
      categoriesTitle: "Categorii de Teste Disponibile",
      categoriesSubtitle: "Explorează o gamă variată de evaluări psihologice și teste de personalitate pentru a-ți înțelege mai bine punctele forte și preferințele.",
      pricingTitle: "Planuri de Abonament",
      pricingSubtitle: "Alege planul care se potrivește cel mai bine nevoilor tale de dezvoltare profesională.",
      ctaFinalTitle: "Gata să îți transformi cariera?",
      ctaFinalSubtitle: "Începe astăzi cu evaluarea gratuită și descoperă-ți adevăratul potențial.",
      ctaFinalButton: "Începe Acum",
      footerText: "Platforma AI care te ajută să îți descoperi potențialul și să îți construiești cariera ideală.",
      footerCopyright: "© 2024 EmpowerCareer. Toate drepturile rezervate."
    },
    features: {
      psychologicalEvaluations: "Evaluări Psihologice AI",
      psychologicalEvaluationsDesc: "Teste avansate de personalitate și inteligență emoțională analizate de algoritmi AI",
      personalizedCareerPlans: "Planuri de Carieră Personalizate",
      personalizedCareerPlansDesc: "Recomandări de carieră bazate pe rezultatele testelor și preferințele tale",
      advancedAnalytics: "Analiză Avansată",
      advancedAnalyticsDesc: "Vizualizări detaliate și interpretări pentru rezultatele testelor tale",
      aiMentoring: "Mentoring AI",
      aiMentoringDesc: "Consiliere inteligentă și ghidare pentru dezvoltarea carierei tale"
    },
    testCategories: {
      emotionalIntelligence: "Inteligență Emoțională",
      personality: "Personalitate",
      leadership: "Leadership",
      technicalSkills: "Abilități Tehnice",
      wellness: "Bunăstare",
      cognitive: "Cognitiv",
      digital: "Digital",
      sensory: "Senzorial"
    },
    plans: {
      basic: {
        name: "Planul Basic",
        price: "Gratuit",
        description: "Perfect pentru începători",
        features: [
          "3 teste gratuite pe lună",
          "Rezultate de bază",
          "Suport email"
        ],
        button: "Începe Gratuit"
      },
      professional: {
        name: "Planul Professional",
        price: "29 lei/lună",
        description: "Ideal pentru profesioniști",
        features: [
          "Teste nelimitate",
          "Analiză detaliată AI",
          "Planuri de carieră personalizate",
          "Mentoring AI",
          "Suport prioritar"
        ],
        button: "Începe Perioada de Probă"
      },
      premium: {
        name: "Planul Premium",
        price: "49 lei/lună",
        description: "Pentru organizații și echipe",
        features: [
          "Toate beneficiile Professional",
          "Rapoarte pentru echipă",
          "Analiză comparativă",
          "Dashboard manager",
          "Consultanță specializată"
        ],
        button: "Contactează-ne"
      },
      mostPopular: "Cel mai popular"
    },
    dashboard: {
      categories: {
        test: "test",
        tests: "teste"
      },
      welcome: "Bun venit",
      recentTests: "Teste Recente",
      quickActions: "Acțiuni Rapide",
      stats: "Statistici",
      progress: "Progres"
    },
    profile: {
      title: "Profilul Meu",
      administrator: "Administrator",
      welcome: "Bun venit",
      welcomeMessage: "Aici poți gestiona setările contului tău și vizualiza progresul.",
      personalInfo: "Informații Personale",
      accountSettings: "Setări Cont",
      testResults: "Rezultate Teste",
      progressOverview: "Vedere Generală Progres"
    },
    tests: {
      title: "Teste Disponibile",
      startTest: "Începe Testul",
      viewResult: "Vezi Rezultatul",
      minutes: "minute",
      questions: "întrebări",
      completed: "Completat",
      available: "Disponibil"
    },
    testRunner: {
      questionsLabel: "Întrebări",
      durationLabel: "Durata estimată",
      startButton: "Începe Testul",
      nextQuestion: "Următoarea Întrebare",
      previousQuestion: "Întrebarea Anterioară",
      submitTest: "Finalizează Testul",
      question: "Întrebarea",
      of: "din"
    },
    testResult: {
      title: "Rezultatul Testului",
      overallScore: "Scor General",
      detailedAnalysis: "Analiză Detaliată",
      recommendations: "Recomandări",
      shareResult: "Partajează Rezultatul",
      downloadPDF: "Descarcă PDF",
      backToTests: "Înapoi la Teste",
      testResult: "Rezultatul Testului",
      completedOn: "Completat pe",
      scoredPoints: "Puncte obținute",
      maxPoints: "Puncte maxime",
      overallScoreTitle: "Scor General"
    },
    premiumFeatures: {
      aiPrograms: {
        title: "Programe AI de 14 Zile",
        subtitle: "Mini-intervenții ghidate pentru dezvoltare rapidă",
        description: "Participă la programe intensive de dezvoltare personală cu ghidaj AI",
        startProgram: "Începe Programul",
        continueProgram: "Continuă Programul",
        programCompleted: "Program Completat",
        availablePrograms: "Programe Disponibile",
        motivationReset: "Resetarea Motivației",
        leadershipTransition: "Tranziția în Leadership",
        interviewTraining: "Pregătire pentru Interviuri",
        careerClarity: "Claritate în Carieră",
        day: "Ziua",
        of: "din",
        currentTask: "Sarcina Curentă",
        reflection: "Reflecție",
        submitReflection: "Trimite Reflecția",
        programProgress: "Progresul Programului",
        legend: "Legendă",
        completed: "Completat",
        current: "Curent",
        upcoming: "Viitor"
      },
      progressSheets: {
        title: "Fișe de Progres AI",
        subtitle: "Evaluări vizuale și feedback personalizat",
        description: "Creează și salvează fișe de progres personalizate cu analiza AI",
        createNew: "Creează Fișă Nouă",
        savedSheets: "Fișe Salvate",
        generateSheet: "Generează Fișă",
        saveSheet: "Salvează Fișa",
        viewSheet: "Vezi Fișa",
        deleteSheet: "Șterge Fișa",
        category: "Categorie",
        question: "Întrebare",
        answer: "Răspuns",
        aiAnalysis: "Analiză AI",
        createdOn: "Creat pe"
      },
      simulations: {
        title: "Simulări AI",
        subtitle: "Exersează scenarii profesionale cu AI",
        description: "Participă la simulări interactive pentru a-ți îmbunătăți abilitățile profesionale",
        startSimulation: "Începe Simularea",
        backToSimulations: "Înapoi la Simulări",
        conversation: "Conversația de Simulare",
        sendResponse: "Trimite Răspunsul",
        feedback: "Feedback și Evaluare",
        aiRole: "Rol AI",
        completed: "Finalizat",
        overallScore: "Scor General",
        clarity: "Claritate",
        empathy: "Empatie",
        conviction: "Convingere",
        structure: "Structură"
      },
      progressTracking: {
        title: "Analiza Progresului",
        subtitle: "Urmărește-ți evoluția în timp",
        description: "Vezi statistici detaliate despre progresul tău și realizările obținute",
        totalTests: "Total Teste",
        averageScore: "Scor Mediu",
        hoursSpent: "Ore Petrecute",
        achievements: "Realizări",
        progressOverTime: "Progresul în Timp",
        testPerformance: "Performanța la Teste",
        recentAchievements: "Realizări Recente",
        month: "Luna",
        score: "Scor",
        viewDetails: "Vezi Detalii"
      }
    }
  },
  en: {
    common: {
      poweredByAI: "Powered by AI",
      success: "Success",
      error: "Error",
      loading: "Loading...",
      save: "Save",
      cancel: "Cancel",
      delete: "Delete",
      edit: "Edit",
      view: "View",
      back: "Back",
      next: "Next",
      previous: "Previous",
      close: "Close",
      confirm: "Confirm",
      yes: "Yes",
      no: "No"
    },
    nav: {
      login: "Login",
      logout: "Logout",
      startFree: "Start Free",
      dashboard: "Dashboard",
      tests: "Tests",
      career: "Career",
      profile: "Profile",
      subscriptionSettings: "Subscription Settings"
    },
    home: {
      title: "Discover Your Potential and Grow Your Career",
      subtitle: "The AI platform that helps you understand your personality, identify your strengths, and build your ideal career path through advanced psychological assessments.",
      ctaButton: "Start Free Assessment",
      demoButton: "View Demo",
      featuresTitle: "Why Choose EmpowerCareer?",
      featuresSubtitle: "Discover how AI technology can transform the way you understand your personality and plan your career.",
      categoriesTitle: "Available Test Categories",
      categoriesSubtitle: "Explore a diverse range of psychological assessments and personality tests to better understand your strengths and preferences.",
      pricingTitle: "Subscription Plans",
      pricingSubtitle: "Choose the plan that best fits your professional development needs.",
      ctaFinalTitle: "Ready to transform your career?",
      ctaFinalSubtitle: "Start today with a free assessment and discover your true potential.",
      ctaFinalButton: "Start Now",
      footerText: "The AI platform that helps you discover your potential and build your ideal career.",
      footerCopyright: "© 2024 EmpowerCareer. All rights reserved."
    },
    features: {
      psychologicalEvaluations: "AI Psychological Evaluations",
      psychologicalEvaluationsDesc: "Advanced personality and emotional intelligence tests analyzed by AI algorithms",
      personalizedCareerPlans: "Personalized Career Plans",
      personalizedCareerPlansDesc: "Career recommendations based on your test results and preferences",
      advancedAnalytics: "Advanced Analytics",
      advancedAnalyticsDesc: "Detailed visualizations and interpretations for your test results",
      aiMentoring: "AI Mentoring",
      aiMentoringDesc: "Intelligent counseling and guidance for your career development"
    },
    testCategories: {
      emotionalIntelligence: "Emotional Intelligence",
      personality: "Personality",
      leadership: "Leadership",
      technicalSkills: "Technical Skills",
      wellness: "Wellness",
      cognitive: "Cognitive",
      digital: "Digital",
      sensory: "Sensory"
    },
    plans: {
      basic: {
        name: "Basic Plan",
        price: "Free",
        description: "Perfect for beginners",
        features: [
          "3 free tests per month",
          "Basic results",
          "Email support"
        ],
        button: "Start Free"
      },
      professional: {
        name: "Professional Plan",
        price: "$7/month",
        description: "Ideal for professionals",
        features: [
          "Unlimited tests",
          "Detailed AI analysis",
          "Personalized career plans",
          "AI mentoring",
          "Priority support"
        ],
        button: "Start Trial"
      },
      premium: {
        name: "Premium Plan",
        price: "$12/month",
        description: "For organizations and teams",
        features: [
          "All Professional benefits",
          "Team reports",
          "Comparative analysis",
          "Manager dashboard",
          "Specialized consulting"
        ],
        button: "Contact Us"
      },
      mostPopular: "Most Popular"
    },
    dashboard: {
      categories: {
        test: "test",
        tests: "tests"
      },
      welcome: "Welcome",
      recentTests: "Recent Tests",
      quickActions: "Quick Actions",
      stats: "Statistics",
      progress: "Progress"
    },
    profile: {
      title: "My Profile",
      administrator: "Administrator",
      welcome: "Welcome",
      welcomeMessage: "Here you can manage your account settings and view your progress.",
      personalInfo: "Personal Information",
      accountSettings: "Account Settings",
      testResults: "Test Results",
      progressOverview: "Progress Overview"
    },
    tests: {
      title: "Available Tests",
      startTest: "Start Test",
      viewResult: "View Result",
      minutes: "minutes",
      questions: "questions",
      completed: "Completed",
      available: "Available"
    },
    testRunner: {
      questionsLabel: "Questions",
      durationLabel: "Estimated duration",
      startButton: "Start Test",
      nextQuestion: "Next Question",
      previousQuestion: "Previous Question",
      submitTest: "Submit Test",
      question: "Question",
      of: "of"
    },
    testResult: {
      title: "Test Result",
      overallScore: "Overall Score",
      detailedAnalysis: "Detailed Analysis",
      recommendations: "Recommendations",
      shareResult: "Share Result",
      downloadPDF: "Download PDF",
      backToTests: "Back to Tests",
      testResult: "Test Result",
      completedOn: "Completed on",
      scoredPoints: "Points scored",
      maxPoints: "Maximum points",
      overallScoreTitle: "Overall Score"
    },
    premiumFeatures: {
      aiPrograms: {
        title: "14-Day AI Programs",
        subtitle: "Guided mini-interventions for rapid development",
        description: "Participate in intensive personal development programs with AI guidance",
        startProgram: "Start Program",
        continueProgram: "Continue Program",
        programCompleted: "Program Completed",
        availablePrograms: "Available Programs",
        motivationReset: "Motivation Reset",
        leadershipTransition: "Leadership Transition",
        interviewTraining: "Interview Training",
        careerClarity: "Career Clarity",
        day: "Day",
        of: "of",
        currentTask: "Current Task",
        reflection: "Reflection",
        submitReflection: "Submit Reflection",
        programProgress: "Program Progress",
        legend: "Legend",
        completed: "Completed",
        current: "Current",
        upcoming: "Upcoming"
      },
      progressSheets: {
        title: "AI Progress Sheets",
        subtitle: "Visual assessments and personalized feedback",
        description: "Create and save personalized progress sheets with AI analysis",
        createNew: "Create New Sheet",
        savedSheets: "Saved Sheets",
        generateSheet: "Generate Sheet",
        saveSheet: "Save Sheet",
        viewSheet: "View Sheet",
        deleteSheet: "Delete Sheet",
        category: "Category",
        question: "Question",
        answer: "Answer",
        aiAnalysis: "AI Analysis",
        createdOn: "Created on"
      },
      simulations: {
        title: "AI Simulations",
        subtitle: "Practice professional scenarios with AI",
        description: "Participate in interactive simulations to improve your professional skills",
        startSimulation: "Start Simulation",
        backToSimulations: "Back to Simulations",
        conversation: "Simulation Conversation",
        sendResponse: "Send Response",
        feedback: "Feedback and Evaluation",
        aiRole: "AI Role",
        completed: "Completed",
        overallScore: "Overall Score",
        clarity: "Clarity",
        empathy: "Empathy",
        conviction: "Conviction",
        structure: "Structure"
      },
      progressTracking: {
        title: "Progress Analytics",
        subtitle: "Track your evolution over time",
        description: "View detailed statistics about your progress and achievements",
        totalTests: "Total Tests",
        averageScore: "Average Score",
        hoursSpent: "Hours Spent",
        achievements: "Achievements",
        progressOverTime: "Progress Over Time",
        testPerformance: "Test Performance",
        recentAchievements: "Recent Achievements",
        month: "Month",
        score: "Score",
        viewDetails: "View Details"
      }
    }
  }
};
