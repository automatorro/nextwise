
import React from 'react';
import { useNavigate } from 'react-router-dom';
import { useLanguage } from '@/hooks/useLanguage';
import { useAuth } from '@/contexts/AuthContext';
import { Button } from '@/components/ui/button';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { Badge } from '@/components/ui/badge';
import { 
  UserPlus, 
  BarChart3, 
  Brain, 
  TrendingUp, 
  Target, 
  Sparkles, 
  User,
  CreditCard,
  ArrowRight,
  CheckCircle
} from 'lucide-react';
import HomeNavigation from '@/components/home/HomeNavigation';
import Footer from '@/components/home/Footer';

const HowItWorks = () => {
  const { t } = useLanguage();
  const { user } = useAuth();
  const navigate = useNavigate();

  const handleNavigation = (path: string) => {
    if (path === '/auth' && user) {
      navigate('/dashboard');
    } else {
      navigate(path);
    }
  };

  const steps = [
    {
      icon: UserPlus,
      title: t('howItWorks.step1.title'),
      subtitle: t('howItWorks.step1.subtitle'),
      description: t('howItWorks.step1.description'),
      features: t('howItWorks.step1.features'),
      cta: t('howItWorks.step1.cta'),
      path: '/auth',
      color: 'from-blue-500 to-blue-600'
    },
    {
      icon: BarChart3,
      title: t('howItWorks.step2.title'),
      subtitle: t('howItWorks.step2.subtitle'),
      description: t('howItWorks.step2.description'),
      features: t('howItWorks.step2.features'),
      cta: t('howItWorks.step2.cta'),
      path: '/dashboard',
      color: 'from-green-500 to-green-600'
    },
    {
      icon: Brain,
      title: t('howItWorks.step3.title'),
      subtitle: t('howItWorks.step3.subtitle'),
      description: t('howItWorks.step3.description'),
      features: t('howItWorks.step3.features'),
      cta: t('howItWorks.step3.cta'),
      path: '/tests',
      color: 'from-purple-500 to-purple-600'
    },
    {
      icon: TrendingUp,
      title: t('howItWorks.step4.title'),
      subtitle: t('howItWorks.step4.subtitle'),
      description: t('howItWorks.step4.description'),
      features: t('howItWorks.step4.features'),
      cta: t('howItWorks.step4.cta'),
      path: '/test-result/demo',
      color: 'from-orange-500 to-orange-600'
    },
    {
      icon: Target,
      title: t('howItWorks.step5.title'),
      subtitle: t('howItWorks.step5.subtitle'),
      description: t('howItWorks.step5.description'),
      features: t('howItWorks.step5.features'),
      cta: t('howItWorks.step5.cta'),
      path: '/career-paths',
      color: 'from-red-500 to-red-600'
    },
    {
      icon: Sparkles,
      title: t('howItWorks.step6.title'),
      subtitle: t('howItWorks.step6.subtitle'),
      description: t('howItWorks.step6.description'),
      features: t('howItWorks.step6.features'),
      cta: t('howItWorks.step6.cta'),
      path: '/career-paths/simulations',
      color: 'from-indigo-500 to-indigo-600',
      premium: true
    },
    {
      icon: User,
      title: t('howItWorks.step7.title'),
      subtitle: t('howItWorks.step7.subtitle'),
      description: t('howItWorks.step7.description'),
      features: t('howItWorks.step7.features'),
      cta: t('howItWorks.step7.cta'),
      path: '/my-profile',
      color: 'from-teal-500 to-teal-600'
    }
  ];

  return (
    <div className="min-h-screen bg-gray-50">
      <HomeNavigation />
      
      <div className="pt-20">
        {/* Hero Section */}
        <section className="py-20 bg-gradient-to-br from-blue-50 to-indigo-100">
          <div className="container mx-auto px-4">
            <div className="text-center max-w-4xl mx-auto">
              <h1 className="text-4xl md:text-5xl font-bold text-gray-900 mb-6">
                {t('howItWorks.title')}
              </h1>
              <p className="text-xl text-gray-600 mb-8 leading-relaxed">
                {t('howItWorks.subtitle')}
              </p>
              <Button 
                size="lg" 
                className="bg-gradient-to-r from-blue-600 to-indigo-600 hover:from-blue-700 hover:to-indigo-700 text-white px-8 py-3"
                onClick={() => handleNavigation('/auth')}
              >
                {t('howItWorks.cta.button')}
                <ArrowRight className="ml-2 h-5 w-5" />
              </Button>
            </div>
          </div>
        </section>

        {/* Steps Section */}
        <section className="py-20">
          <div className="container mx-auto px-4">
            <div className="space-y-20">
              {steps.map((step, index) => {
                const Icon = step.icon;
                const isEven = index % 2 === 0;
                
                return (
                  <div key={index} className={`flex flex-col ${isEven ? 'lg:flex-row' : 'lg:flex-row-reverse'} items-center gap-12`}>
                    {/* Content */}
                    <div className="flex-1 space-y-6">
                      <div className="flex items-center gap-4">
                        <div className={`p-3 rounded-full bg-gradient-to-r ${step.color} text-white`}>
                          <Icon className="h-8 w-8" />
                        </div>
                        {step.premium && (
                          <Badge className="bg-gradient-to-r from-yellow-400 to-orange-500 text-white">
                            {t('howItWorks.step6.premium')}
                          </Badge>
                        )}
                      </div>
                      
                      <div>
                        <h2 className="text-3xl font-bold text-gray-900 mb-2">
                          {step.title}
                        </h2>
                        <p className="text-xl text-gray-600 mb-4">
                          {step.subtitle}
                        </p>
                        <p className="text-gray-700 leading-relaxed mb-6">
                          {step.description}
                        </p>
                      </div>

                      <div className="space-y-3">
                        {step.features.map((feature: string, featureIndex: number) => (
                          <div key={featureIndex} className="flex items-start gap-3">
                            <CheckCircle className="h-5 w-5 text-green-500 mt-0.5 flex-shrink-0" />
                            <span className="text-gray-700">{feature}</span>
                          </div>
                        ))}
                      </div>

                      <Button 
                        className={`bg-gradient-to-r ${step.color} text-white hover:opacity-90 transition-opacity`}
                        onClick={() => handleNavigation(step.path)}
                      >
                        {step.cta}
                        <ArrowRight className="ml-2 h-4 w-4" />
                      </Button>
                    </div>

                    {/* Visual Card */}
                    <div className="flex-1 max-w-md">
                      <Card className="shadow-xl border-0 bg-gradient-to-br from-white to-gray-50">
                        <CardHeader className="text-center">
                          <div className={`w-16 h-16 mx-auto rounded-full bg-gradient-to-r ${step.color} flex items-center justify-center mb-4`}>
                            <Icon className="h-8 w-8 text-white" />
                          </div>
                          <CardTitle className="text-lg font-semibold">
                            {step.title.replace(/^Pasul \d+: |^Step \d+: /, '')}
                          </CardTitle>
                          <CardDescription>
                            {step.subtitle}
                          </CardDescription>
                        </CardHeader>
                        <CardContent className="space-y-2">
                          {step.features.slice(0, 3).map((feature: string, featureIndex: number) => (
                            <div key={featureIndex} className="flex items-center gap-2 text-sm text-gray-600">
                              <CheckCircle className="h-4 w-4 text-green-500 flex-shrink-0" />
                              <span>{feature}</span>
                            </div>
                          ))}
                        </CardContent>
                      </Card>
                    </div>
                  </div>
                );
              })}
            </div>
          </div>
        </section>

        {/* Subscription Section */}
        <section className="py-20 bg-gradient-to-br from-gray-50 to-blue-50">
          <div className="container mx-auto px-4 text-center">
            <div className="max-w-3xl mx-auto">
              <CreditCard className="h-16 w-16 mx-auto text-blue-600 mb-6" />
              <h2 className="text-3xl font-bold text-gray-900 mb-4">
                {t('howItWorks.subscription.title')}
              </h2>
              <p className="text-xl text-gray-600 mb-6">
                {t('howItWorks.subscription.subtitle')}
              </p>
              <p className="text-gray-700 mb-8 leading-relaxed">
                {t('howItWorks.subscription.description')}
              </p>
              <Button 
                size="lg" 
                variant="outline"
                className="border-blue-600 text-blue-600 hover:bg-blue-600 hover:text-white"
                onClick={() => handleNavigation('/subscription')}
              >
                {t('howItWorks.subscription.cta')}
                <ArrowRight className="ml-2 h-5 w-5" />
              </Button>
            </div>
          </div>
        </section>

        {/* Final CTA Section */}
        <section className="py-20 bg-gradient-to-r from-blue-600 to-indigo-600 text-white">
          <div className="container mx-auto px-4 text-center">
            <div className="max-w-3xl mx-auto">
              <h2 className="text-3xl md:text-4xl font-bold mb-4">
                {t('howItWorks.cta.title')}
              </h2>
              <p className="text-xl mb-8 opacity-90">
                {t('howItWorks.cta.subtitle')}
              </p>
              <Button 
                size="lg" 
                className="bg-white text-blue-600 hover:bg-gray-100 px-8 py-3 text-lg font-semibold"
                onClick={() => handleNavigation('/auth')}
              >
                {t('howItWorks.cta.button')}
                <ArrowRight className="ml-2 h-5 w-5" />
              </Button>
            </div>
          </div>
        </section>
      </div>

      <Footer />
    </div>
  );
};

export default HowItWorks;
