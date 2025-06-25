
import React from 'react';
import { useLanguage } from '@/hooks/useLanguage';
import { Link } from 'react-router-dom';
import { Button } from '@/components/ui/button';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { Badge } from '@/components/ui/badge';
import { Brain, BarChart3, Target, Users, Heart, Star, CheckCircle, ArrowRight, Zap } from 'lucide-react';

const Index = () => {
  const { t } = useLanguage();

  const features = [
    {
      icon: Brain,
      title: t('features.psychologicalEvaluations'),
      description: t('features.psychologicalEvaluationsDesc')
    },
    {
      icon: Target,
      title: t('features.personalizedCareerPlans'),
      description: t('features.personalizedCareerPlansDesc')
    },
    {
      icon: BarChart3,
      title: t('features.advancedAnalytics'),
      description: t('features.advancedAnalyticsDesc')
    },
    {
      icon: Users,
      title: t('features.aiMentoring'),
      description: t('features.aiMentoringDesc')
    }
  ];

  const subscriptionPlans = [
    {
      name: t('plans.basic.name'),
      price: t('plans.basic.price'),
      description: t('plans.basic.description'),
      features: t('plans.basic.features'),
      highlight: false,
      button: t('plans.basic.button')
    },
    {
      name: t('plans.professional.name'),
      price: t('plans.professional.price'),
      description: t('plans.professional.description'),
      features: t('plans.professional.features'),
      highlight: true,
      button: t('plans.professional.button')
    },
    {
      name: t('plans.premium.name'),
      price: t('plans.premium.price'),
      description: t('plans.premium.description'),
      features: t('plans.premium.features'),
      highlight: false,
      button: t('plans.premium.button')
    }
  ];

  const testCategories = [
    {
      name: t('testCategories.emotionalIntelligence'),
      icon: '🧠',
      count: 1
    },
    {
      name: t('testCategories.personality'),
      icon: '👤',
      count: 5
    },
    {
      name: t('testCategories.leadership'),
      icon: '👥',
      count: 1
    },
    {
      name: t('testCategories.technicalSkills'),
      icon: '💻',
      count: 1
    },
    {
      name: t('testCategories.wellness'),
      icon: '🌱',
      count: 2
    },
    {
      name: t('testCategories.cognitive'),
      icon: '🎯',
      count: 1
    },
    {
      name: t('testCategories.digital'),
      icon: '📊',
      count: 1
    },
    {
      name: t('testCategories.sensory'),
      icon: '👁️',
      count: 1
    }
  ];

  return (
    <div className="min-h-screen bg-gradient-to-br from-blue-50 via-white to-indigo-50">
      {/* Navigation */}
      <nav className="fixed top-4 left-1/2 transform -translate-x-1/2 z-50 w-[95%] max-w-6xl">
        <div className="bg-white/80 backdrop-blur-md shadow-lg border border-white/30 rounded-2xl">
          <div className="px-6 lg:px-8">
            <div className="flex justify-between h-16">
              <div className="flex items-center space-x-2">
                <div className="w-8 h-8 bg-gradient-to-r from-blue-600 to-indigo-600 rounded-lg flex items-center justify-center">
                  <span className="text-white font-bold text-sm">EC</span>
                </div>
                <span className="font-bold text-xl text-gray-900">EmpowerCareer</span>
              </div>
              <div className="flex items-center space-x-4">
                <Link to="/auth">
                  <Button variant="ghost" className="hover:bg-white/60 transition-colors">
                    {t('nav.login')}
                  </Button>
                </Link>
                <Link to="/auth">
                  <Button className="bg-gradient-to-r from-blue-600 to-indigo-600 hover:from-blue-700 hover:to-indigo-700">
                    {t('nav.startFree')}
                  </Button>
                </Link>
              </div>
            </div>
          </div>
        </div>
      </nav>

      {/* Hero Section */}
      <section className="py-20 px-4 sm:px-6 lg:px-8 pt-28">
        <div className="max-w-7xl mx-auto text-center">
          <Badge className="mb-4 bg-blue-100 text-blue-700 hover:bg-blue-200">
            <Zap className="w-3 h-3 mr-1" />
            {t('common.poweredByAI')}
          </Badge>
          <h1 className="text-4xl md:text-6xl font-bold text-gray-900 mb-6">
            {t('home.title')}
          </h1>
          <p className="text-xl text-gray-600 mb-8 max-w-3xl mx-auto">
            {t('home.subtitle')}
          </p>
          <div className="flex flex-col sm:flex-row gap-4 justify-center">
            <Link to="/auth">
              <Button size="lg" className="bg-gradient-to-r from-blue-600 to-indigo-600 hover:from-blue-700 hover:to-indigo-700">
                {t('home.ctaButton')}
                <ArrowRight className="w-4 h-4 ml-2" />
              </Button>
            </Link>
            <Button size="lg" variant="outline">
              {t('home.demoButton')}
            </Button>
          </div>
        </div>
      </section>

      {/* Features Section */}
      <section className="py-16 px-4 sm:px-6 lg:px-8 bg-white">
        <div className="max-w-7xl mx-auto">
          <div className="text-center mb-12">
            <h2 className="text-3xl font-bold text-gray-900 mb-4">{t('home.featuresTitle')}</h2>
            <p className="text-gray-600 max-w-2xl mx-auto">
              {t('home.featuresSubtitle')}
            </p>
          </div>
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8">
            {features.map((feature, index) => (
              <Card key={index} className="border-0 shadow-lg hover:shadow-xl transition-shadow">
                <CardHeader>
                  <div className="w-12 h-12 bg-gradient-to-r from-blue-100 to-indigo-100 rounded-lg flex items-center justify-center mb-4">
                    <feature.icon className="w-6 h-6 text-blue-600" />
                  </div>
                  <CardTitle className="text-lg">{feature.title}</CardTitle>
                </CardHeader>
                <CardContent>
                  <p className="text-gray-600">{feature.description}</p>
                </CardContent>
              </Card>
            ))}
          </div>
        </div>
      </section>

      {/* Test Categories */}
      <section className="py-16 px-4 sm:px-6 lg:px-8">
        <div className="max-w-7xl mx-auto">
          <div className="text-center mb-12">
            <h2 className="text-3xl font-bold text-gray-900 mb-4">
              {t('home.categoriesTitle')}
            </h2>
            <p className="text-gray-600 max-w-2xl mx-auto">
              {t('home.categoriesSubtitle')}
            </p>
          </div>
          <div className="grid grid-cols-2 md:grid-cols-4 gap-6">
            {testCategories.map((category, index) => (
              <Card key={index} className="text-center hover:shadow-lg transition-shadow">
                <CardContent className="p-6">
                  <div className="text-4xl mb-3">{category.icon}</div>
                  <h3 className="font-semibold text-gray-900 mb-2">{category.name}</h3>
                  <Badge variant="secondary">
                    {category.count} {category.count === 1 ? t('dashboard.categories.test') : t('dashboard.categories.tests')}
                  </Badge>
                </CardContent>
              </Card>
            ))}
          </div>
        </div>
      </section>

      {/* Pricing Section */}
      <section className="py-16 px-4 sm:px-6 lg:px-8 bg-gray-50">
        <div className="max-w-7xl mx-auto">
          <div className="text-center mb-12">
            <h2 className="text-3xl font-bold text-gray-900 mb-4">
              {t('home.pricingTitle')}
            </h2>
            <p className="text-gray-600 max-w-2xl mx-auto">
              {t('home.pricingSubtitle')}
            </p>
          </div>
          <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
            {subscriptionPlans.map((plan, index) => (
              <Card key={index} className={`relative ${plan.highlight ? 'border-2 border-blue-500 shadow-xl scale-105' : ''}`}>
                {plan.highlight && (
                  <div className="absolute top-0 left-1/2 transform -translate-x-1/2 -translate-y-1/2">
                    <Badge className="bg-blue-500 text-white">
                      <Star className="w-3 h-3 mr-1" />
                      {t('plans.mostPopular')}
                    </Badge>
                  </div>
                )}
                <CardHeader className="text-center">
                  <CardTitle className="text-xl">{plan.name}</CardTitle>
                  <div className="text-3xl font-bold text-gray-900 mt-2">{plan.price}</div>
                  <CardDescription>{plan.description}</CardDescription>
                </CardHeader>
                <CardContent>
                  <ul className="space-y-3 mb-6">
                    {plan.features.map((feature, idx) => (
                      <li key={idx} className="flex items-center">
                        <CheckCircle className="w-4 h-4 text-green-500 mr-3" />
                        <span className="text-sm text-gray-600">{feature}</span>
                      </li>
                    ))}
                  </ul>
                  <Link to="/auth">
                    <Button 
                      className={`w-full ${plan.highlight ? 'bg-gradient-to-r from-blue-600 to-indigo-600 hover:from-blue-700 hover:to-indigo-700' : ''}`} 
                      variant={plan.highlight ? 'default' : 'outline'}
                    >
                      {plan.button}
                    </Button>
                  </Link>
                </CardContent>
              </Card>
            ))}
          </div>
        </div>
      </section>

      {/* CTA Section */}
      <section className="py-16 px-4 sm:px-6 lg:px-8 bg-gradient-to-r from-blue-600 to-indigo-600">
        <div className="max-w-4xl mx-auto text-center">
          <h2 className="text-3xl font-bold text-white mb-4">
            {t('home.ctaFinalTitle')}
          </h2>
          <p className="text-blue-100 text-lg mb-8">
            {t('home.ctaFinalSubtitle')}
          </p>
          <Link to="/auth">
            <Button size="lg" className="bg-white text-blue-600 hover:bg-gray-100">
              {t('home.ctaFinalButton')}
              <ArrowRight className="w-4 h-4 ml-2" />
            </Button>
          </Link>
        </div>
      </section>

      {/* Footer */}
      <footer className="bg-gray-900 text-white py-12 px-4 sm:px-6 lg:px-8">
        <div className="max-w-7xl mx-auto text-center">
          <div className="flex items-center justify-center space-x-2 mb-4">
            <div className="w-8 h-8 bg-gradient-to-r from-blue-600 to-indigo-600 rounded-lg flex items-center justify-center">
              <span className="text-white font-bold text-sm">EC</span>
            </div>
            <span className="font-bold text-xl">EmpowerCareer</span>
          </div>
          <p className="text-gray-400 mb-8">
            {t('home.footerText')}
          </p>
          <div className="border-t border-gray-800 pt-8">
            <p className="text-gray-500">
              {t('home.footerCopyright')}
            </p>
          </div>
        </div>
      </footer>
    </div>
  );
};

export default Index;
