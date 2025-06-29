
import React from 'react';
import { useLanguage } from '@/hooks/useLanguage';
import { Link } from 'react-router-dom';
import { Button } from '@/components/ui/button';
import { ArrowRight } from 'lucide-react';

const CTASection = () => {
  const { t } = useLanguage();

  return (
    <section className="py-16 px-4 sm:px-6 lg:px-8 bg-gradient-to-r from-blue-600 to-indigo-600">
      <div className="max-w-4xl mx-auto text-center">
        <h2 className="text-3xl font-bold text-white mb-4">
          {t('home.ctaFinalTitle')}
        </h2>
        <p className="text-blue-100 text-lg mb-8">
          {t('home.ctaFinalSubtitle')}
        </p>
        <Button 
          asChild 
          size="lg" 
          className="bg-white text-blue-600 hover:bg-gray-100 active:bg-gray-200 font-semibold shadow-lg hover:shadow-xl transition-all duration-200"
        >
          <Link to="/auth" className="no-underline">
            {t('home.ctaFinalButton')}
            <ArrowRight className="w-4 h-4 ml-2" />
          </Link>
        </Button>
      </div>
    </section>
  );
};

export default CTASection;
