
import React from 'react';
import { useLanguage } from '@/hooks/useLanguage';
import { Link } from 'react-router-dom';
import { Button } from '@/components/ui/button';
import { Badge } from '@/components/ui/badge';
import { Zap, ArrowRight } from 'lucide-react';

const HeroSection = () => {
  const { t } = useLanguage();

  return (
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
  );
};

export default HeroSection;
