
import type { Translations } from '@/types/language';

export const fallbackTranslations: Record<'ro' | 'en', Translations> = {
  ro: {
    common: {
      poweredByAI: "Alimentat de AI",
      loading: "Se încarcă...",
      error: "Eroare",
      success: "Succes",
      cancel: "Anulează",
      save: "Salvează",
      edit: "Editează",
      delete: "Șterge",
      back: "Înapoi",
      next: "Următorul",
      previous: "Anterior",
      submit: "Trimite",
      start: "Start",
      finish: "Finalizează",
      continue: "Continuă"
    },
    nav: {
      login: "Autentificare",
      startFree: "Începe Gratuit",
      dashboard: "Tablou de Bord",
      tests: "Teste",
      career: "Carieră",
      profile: "Profil",
      subscription: "Abonament",
      subscriptionSettings: "Abonament și Setări",
      logout: "Deconectare"
    },
    home: {
      title: "Descoperă-ți Potențialul și Dezvoltă-ți Cariera",
      subtitle: "Platforma AI care te ajută să îți înțelegi personalitatea, să îți identifici punctele forte și să îți construiești calea ideală de carieră prin evaluări psihologice avansate.",
      ctaButton: "Începe Evaluarea Gratuită",
      demoButton: "Vezi Demo",
      featuresTitle: "De ce să alegi EmpowerCareer?",
      featuresSubtitle: "Descoperă cum tehnologia AI poate transforma modul în care îți înțelegi personalitatea și îți planifici cariera.",
      categoriesTitle: "Categorii de Teste Disponibile",
      categoriesSubtitle: "Explorează o gamă variată de evaluări psihologice și teste de personalitate pentru a-ți înțelege mai bine punctele forte și preferințele.",
      pricingTitle: "Planuri de Abonament",
      pricingSubtitle: "Alege planul care se potrivește cel mai bine nevoilor tale de dezvoltare profesională.",
      ctaFinalTitle: "Ești gata să îți transformi cariera?",
      ctaFinalSubtitle: "Începe astăzi cu o evaluare gratuită și descoperă-ți adevăratul potențial.",
      ctaFinalButton: "Începe Acum",
      footerText: "Platforma AI care te ajută să îți descoperi potențialul și să îți construiești cariera ideală.",
      footerCopyright: "© 2024 EmpowerCareer. Toate drepturile rezervate."
    },
    dashboard: {
      welcome: "Bine ai venit",
      welcomeSubtext: "Începe călătoria ta de dezvoltare personală și profesională cu testele noastre AI.",
      stats: {
        testsCompleted: "Teste Completate",
        careerPlans: "Planuri de Carieră",
        timeSaved: "Timp Economisit",
        careerProgress: "Progres Carieră",
        days: "Zile"
      },
      actions: {
        startFirstTest: "Începe Primul Test",
        startFirstTestDesc: "Descoperă-ți personalitatea și punctele forte cu primul nostru test AI.",
        exploreTests: "Explorează Testele",
        planCareer: "Planifică-ți Cariera",
        planCareerDesc: "Creează un plan de carieră personalizat bazat pe rezultatele testelor tale.",
        startCareerPlan: "Începe Planul de Carieră"
      },
      categories: {
        title: "Categorii Populare de Teste",
        subtitle: "Explorează cele mai populare categorii de teste pentru dezvoltarea ta profesională.",
        emotionalIntelligence: "Inteligența Emoțională",
        emotionalIntelligenceDesc: "Evaluează-ți capacitatea de a înțelege și gestiona emoțiile",
        personality: "Teste de Personalitate",
        personalityDesc: "Descoperă-ți trăsăturile de personalitate și stilul de lucru",
        leadership: "Abilități de Leadership",
        leadershipDesc: "Evaluează-ți potențialul de leadership și stilul de management",
        wellness: "Wellness și Stres",
        wellnessDesc: "Analizează nivelurile de stres și strategiile de coping",
        test: "test",
        tests: "teste",
        viewAllTests: "Vezi Toate Testele"
      }
    },
    tests: {
      title: "Teste Psihologice",
      subtitle: "Descoperă-ți personalitatea și punctele forte prin evaluări psihologice avansate analizate de inteligența artificială.",
      allCategories: "Toate Categoriile",
      noTests: "Nu există teste disponibile în această categorie",
      noTestsDescription: "Testele vor fi adăugate în curând. Mulțumim pentru răbdare!",
      minutes: "minute",
      questions: "întrebări",
      takeTest: "Susține Testul",
      upgradeRequired: "Upgrade Necesar",
      categories: {
        all: "Toate",
        personality: "Personalitate",
        cognitive: "Cognitive",
        emotional: "Emoțional",
        leadership: "Leadership",
        wellness: "Wellness",
        technical: "Tehnice"
      }
    },
    profile: {
      title: "Profil",
      welcome: "Bine ai venit",
      administrator: "Administrator",
      welcomeMessage: "Aici poți vedea progresul tău și rezultatele testelor.",
      personalInfo: "Informații Personale",
      fullName: "Nume Complet",
      email: "Email",
      avatar: "Avatar",
      updateProfile: "Actualizează Profilul",
      passwordSection: "Parolă",
      currentPassword: "Parola Curentă",
      newPassword: "Parola Nouă",
      confirmPassword: "Confirmă Parola",
      changePassword: "Schimbă Parola",
      profileUpdated: "Profil actualizat cu succes!",
      passwordChanged: "Parola schimbată cu succes!",
      overview: "Prezentare Generală",
      recentResults: "Rezultate Recente",
      quickActions: "Acțiuni Rapide",
      statsCards: {
        testsCompleted: "Teste Completate",
        avgScore: "Scor Mediu",
        lastTest: "Ultimul Test",
        timeSpent: "Timp Petrecut"
      },
      actions: {
        takeTest: "Susține un Test",
        viewResults: "Vezi Rezultatele",
        planCareer: "Planifică Cariera",
        settings: "Setări"
      }
    },
    careerPaths: {
      title: "Hub Carieră",
      subtitle: "Planifică, urmărește și accelerează-ți creșterea profesională",
      tabs: {
        dashboard: "Planurile Mele",
        create: "Creează Plan",
        mentoring: "Mentorat AI"
      }
    },
    career: {
      dashboard: {
        activePlans: "Planuri Active"
      }
    },
    testCategories: {
      emotionalIntelligence: "Inteligența Emoțională",
      personality: "Personalitate",
      leadership: "Leadership",
      technicalSkills: "Abilități Tehnice",
      wellness: "Wellness",
      psychologicalWellness: "Wellness Psihologic",
      cognitive: "Cognitive",
      digital: "Digital",
      sensory: "Senzorial",
      mentalHealth: "Sănătate Mentală",
      cognitiveAbilities: "Abilități Cognitive",
      teamRoles: "Roluri în Echipă"
    },
    testNames: {
      beckDepressionInventory: "Inventarul Depresiei Beck",
      cognitiveAbilitiesTest: "Testul Abilităților Cognitive",
      belbinTeamRoles: "Rolurile în Echipă Belbin",
      bigFivePersonality: "Testul Big Five",
      emotionalIntelligenceTest: "Testul Inteligenței Emoționale",
      leadershipTest: "Testul de Leadership",
      maslachBurnoutTest: "Testul Burnout Maslach",
      perceivedStressTest: "Testul Stresului Perceput",
      resilienceTest: "Testul Rezilienței",
      gad7AnxietyAssessment: "Evaluarea Anxietății GAD-7",
      discBehavioralStyles: "Testul Stilurilor Comportamentale DISC",
      cattell16PF: "Testul de Personalitate Cattell 16PF"
    },
    testDescriptions: {
      beckDepressionInventory: "Evaluează-ți starea emoțională și identifică potențialele semne de depresie prin întrebări validate științific.",
      cognitiveAbilitiesTest: "Evaluează-ți abilitățile cognitive incluzând gândirea logică, rezolvarea problemelor și gândirea analitică.",
      belbinTeamRoles: "Descoperă-ți rolul preferat în echipă și modul în care contribui cel mai eficient în setările de grup.",
      bigFivePersonality: "Explorează cele cinci dimensiuni majore ale personalității: deschidere, conștiinciozitate, extraversiune, agreabilitate și nevrotism.",
      emotionalIntelligenceTest: "Măsoară-ți capacitatea de a înțelege și gestiona propriile emoții și pe cele ale altora în diverse situații.",
      leadershipTest: "Evaluează-ți stilul de leadership, punctele forte și domeniile de dezvoltare în managementul și inspirarea echipelor.",
      maslachBurnoutTest: "Evaluează-ți nivelul de burnout legat de muncă pe dimensiunile epuizării emoționale, depersonalizării și realizării personale.",
      perceivedStressTest: "Măsoară cât de stresante percepi situațiile din viața ta și capacitatea ta de a face față stresului.",
      resilienceTest: "Evaluează-ți reziliența psihologică și capacitatea de a reveni din provocări și adversități.",
      gad7AnxietyAssessment: "Evaluează-ți nivelurile de anxietate folosind scala standardizată GAD-7 pentru a identifica simptomele și severitatea tulburării de anxietate generalizată.",
      discBehavioralStyles: "Descoperă-ți stilul comportamental și preferințele de comunicare folosind modelul de evaluare DISC pentru a îmbunătăți relațiile de la locul de muncă.",
      cattell16PF: "Evaluare completă a personalității măsurând 16 factori primari de personalitate pentru a oferi perspective detaliate asupra trăsăturilor de caracter și modelelor comportamentale."
    },
    subscription: {
      title: "Abonament și Setări",
      subtitle: "Gestionează abonamentul și actualizează informațiile personale.",
      profileSettings: "Setări Profil",
      currentSubscription: "Abonament Curent",
      subscriptionType: "Tip Abonament",
      status: "Status",
      testsThisMonth: "Teste Susținute Luna Aceasta",
      administrator: "Administrator",
      unlimitedAccess: "Administrator (Acces Nelimitat)",
      active: "Activ",
      upgradeSubscription: "Upgrade abonament"
    }
  },
  en: {
    common: {
      poweredByAI: "Powered by AI",
      loading: "Loading...",
      error: "Error",
      success: "Success",
      cancel: "Cancel",
      save: "Save",
      edit: "Edit",
      delete: "Delete",
      back: "Back",
      next: "Next",
      previous: "Previous",
      submit: "Submit",
      start: "Start",
      finish: "Finish",
      continue: "Continue"
    },
    nav: {
      login: "Login",
      startFree: "Start Free",
      dashboard: "Dashboard",
      tests: "Tests",
      career: "Career",
      profile: "Profile",
      subscription: "Subscription",
      subscriptionSettings: "Subscription & Settings",
      logout: "Logout"
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
    dashboard: {
      welcome: "Welcome",
      welcomeSubtext: "Start your personal and professional development journey with our AI tests.",
      stats: {
        testsCompleted: "Tests Completed",
        careerPlans: "Career Plans",
        timeSaved: "Time Saved",
        careerProgress: "Career Progress",
        days: "Days"
      },
      actions: {
        startFirstTest: "Start Your First Test",
        startFirstTestDesc: "Discover your personality and strengths with our first AI test.",
        exploreTests: "Explore Tests",
        planCareer: "Plan Your Career",
        planCareerDesc: "Create a personalized career plan based on your test results.",
        startCareerPlan: "Start Career Plan"
      },
      categories: {
        title: "Popular Test Categories",
        subtitle: "Explore the most popular test categories for your professional development.",
        emotionalIntelligence: "Emotional Intelligence",
        emotionalIntelligenceDesc: "Assess your ability to understand and manage emotions",
        personality: "Personality Tests",
        personalityDesc: "Discover your personality traits and work style",
        leadership: "Leadership Skills",
        leadershipDesc: "Evaluate your leadership potential and management style",
        wellness: "Wellness and Stress",
        wellnessDesc: "Analyze stress levels and coping strategies",
        test: "test",
        tests: "tests",
        viewAllTests: "View All Tests"
      }
    },
    tests: {
      title: "Psychological Tests",
      subtitle: "Discover your personality and strengths through advanced psychological assessments analyzed by artificial intelligence.",
      allCategories: "All Categories",
      noTests: "No tests available in this category",
      noTestsDescription: "Tests will be added soon. Thank you for your patience!",
      minutes: "minutes",
      questions: "questions",
      takeTest: "Take Test",
      upgradeRequired: "Upgrade Required",
      categories: {
        all: "All",
        personality: "Personality",
        cognitive: "Cognitive",
        emotional: "Emotional",
        leadership: "Leadership",
        wellness: "Wellness",
        technical: "Technical"
      }
    },
    profile: {
      title: "Profile",
      welcome: "Welcome",
      administrator: "Administrator",
      welcomeMessage: "Here you can view your progress and test results.",
      personalInfo: "Personal Information",
      fullName: "Full Name",
      email: "Email",
      avatar: "Avatar",
      updateProfile: "Update Profile",
      passwordSection: "Password",
      currentPassword: "Current Password",
      newPassword: "New Password",
      confirmPassword: "Confirm Password",
      changePassword: "Change Password",
      profileUpdated: "Profile updated successfully!",
      passwordChanged: "Password changed successfully!",
      overview: "Overview",
      recentResults: "Recent Results",
      quickActions: "Quick Actions",
      statsCards: {
        testsCompleted: "Tests Completed",
        avgScore: "Average Score",
        lastTest: "Last Test",
        timeSpent: "Time Spent"
      },
      actions: {
        takeTest: "Take a Test",
        viewResults: "View Results",
        planCareer: "Plan Career",
        settings: "Settings"
      }
    },
    careerPaths: {
      title: "Career Hub",
      subtitle: "Plan, track, and accelerate your professional growth",
      tabs: {
        dashboard: "My Plans",
        create: "Create Plan",
        mentoring: "AI Mentoring"
      }
    },
    career: {
      dashboard: {
        activePlans: "Active Plans"
      }
    },
    testCategories: {
      emotionalIntelligence: "Emotional Intelligence",
      personality: "Personality",
      leadership: "Leadership",
      technicalSkills: "Technical Skills",
      wellness: "Wellness",
      psychologicalWellness: "Psychological Wellness",
      cognitive: "Cognitive",
      digital: "Digital",
      sensory: "Sensory",
      mentalHealth: "Mental Health",
      cognitiveAbilities: "Cognitive Abilities",
      teamRoles: "Team Roles"
    },
    testNames: {
      beckDepressionInventory: "Beck Depression Inventory",
      cognitiveAbilitiesTest: "Cognitive Abilities Test",
      belbinTeamRoles: "Belbin Team Roles",
      bigFivePersonality: "Big Five Personality Test",
      emotionalIntelligenceTest: "Emotional Intelligence Test",
      leadershipTest: "Leadership Test",
      maslachBurnoutTest: "Maslach Burnout Test",
      perceivedStressTest: "Perceived Stress Test",
      resilienceTest: "Resilience Test",
      gad7AnxietyAssessment: "GAD-7 Anxiety Assessment",
      discBehavioralStyles: "DISC Behavioral Styles Test",
      cattell16PF: "Cattell 16PF Personality Test"
    },
    testDescriptions: {
      beckDepressionInventory: "Assess your emotional state and identify potential signs of depression through scientifically validated questions.",
      cognitiveAbilitiesTest: "Evaluate your cognitive skills including logical reasoning, problem-solving, and analytical thinking.",
      belbinTeamRoles: "Discover your preferred team role and how you contribute most effectively in group settings.",
      bigFivePersonality: "Explore the five major dimensions of personality: openness, conscientiousness, extraversion, agreeableness, and neuroticism.",
      emotionalIntelligenceTest: "Measure your ability to understand and manage your own emotions and those of others in various situations.",
      leadershipTest: "Assess your leadership style, strengths, and areas for development in managing and inspiring teams.",
      maslachBurnoutTest: "Evaluate your level of work-related burnout across emotional exhaustion, depersonalization, and personal accomplishment.",
      perceivedStressTest: "Measure how stressful you perceive situations in your life and your ability to cope with stress.",
      resilienceTest: "Assess your psychological resilience and ability to bounce back from challenges and adversity.",
      gad7AnxietyAssessment: "Evaluate your anxiety levels using the standardized GAD-7 scale to identify symptoms and severity of generalized anxiety disorder.",
      discBehavioralStyles: "Discover your behavioral style and communication preferences using the DISC assessment model to improve workplace relationships.",
      cattell16PF: "Comprehensive personality assessment measuring 16 primary personality factors to provide detailed insights into your character traits and behavioral patterns."
    },
    subscription: {
      title: "Subscription & Settings",
      subtitle: "Manage your subscription and update your personal information.",
      profileSettings: "Profile Settings",
      currentSubscription: "Current Subscription",
      subscriptionType: "Subscription Type",
      status: "Status",
      testsThisMonth: "Tests Taken This Month",
      administrator: "Administrator",
      unlimitedAccess: "Administrator (Unlimited Access)",
      active: "Active",
      upgradeSubscription: "Upgrade subscription"
    }
  }
};
