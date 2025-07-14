
import type { Language, Translations } from '@/types/language';

export const fallbackTranslations: Record<Language, Translations> = {
  ro: {
    common: {
      poweredByAI: "Alimentat de AI"
    },
    nav: {
      login: "Autentificare",
      startFree: "Începe Gratuit"
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
        description: "Ideal pentru profesionişti",
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
      }
    },
    premiumFeatures: {
      aiPrograms: {
        title: "Programe AI de 14 Zile",
        subtitle: "Mini-intervenții ghidate pentru dezvoltare rapidă"
      },
      progressSheets: {
        title: "Fișe de Progres AI",
        subtitle: "Evaluări vizuale și feedback personalizat"
      },
      simulations: {
        title: "Simulări AI",
        subtitle: "Exersează scenarii profesionale cu AI"
      },
      progressTracking: {
        title: "Analiza Progresului",
        subtitle: "Urmărește-ți evoluția în timp"
      }
    }
  },
  en: {
    common: {
      poweredByAI: "Powered by AI"
    },
    nav: {
      login: "Login",
      startFree: "Start Free"
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
      }
    },
    premiumFeatures: {
      aiPrograms: {
        title: "14-Day AI Programs",
        subtitle: "Guided mini-interventions for rapid development"
      },
      progressSheets: {
        title: "AI Progress Sheets",
        subtitle: "Visual assessments and personalized feedback"
      },
      simulations: {
        title: "AI Simulations",
        subtitle: "Practice professional scenarios with AI"
      },
      progressTracking: {
        title: "Progress Analytics",
        subtitle: "Track your evolution over time"
      }
    }
  }
};
