
import React from 'react';
import { useTranslation } from '@/hooks/useTranslation';
import { useNavigate } from 'react-router-dom';
import { Button } from '@/components/ui/button';
import { ArrowRight } from 'lucide-react';

const CTASection = () => {
  const { t } = useTranslation();
  const navigate = useNavigate();

  const handleFinalCTAClick = (e: React.MouseEvent<HTMLButtonElement>) => {
    console.log('CTASection: Final CTA button clicked - START');
    e.preventDefault();
    e.stopPropagation();
    
    try {
      console.log('CTASection: Attempting navigation to /auth');
      navigate('/auth');
      console.log('CTASection: Navigation completed');
    } catch (error) {
      console.error('CTASection: Navigation failed:', error);
    }
  };

  console.log('CTASection: Component rendered');

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
          size="lg" 
          className="bg-white text-blue-600 hover:bg-gray-100 font-semibold shadow-lg min-h-[48px] px-8"
          onClick={handleFinalCTAClick}
          onTouchStart={() => console.log('CTASection: Final CTA touch start')}
          onTouchEnd={() => console.log('CTASection: Final CTA touch end')}
          style={{ 
            WebkitTapHighlightColor: 'transparent',
            touchAction: 'manipulation',
            userSelect: 'none',
            cursor: 'pointer'
          }}
        >
          {t('home.ctaFinalButton')}
          <ArrowRight className="w-4 h-4 ml-2" />
        </Button>
      </div>
    </section>
  );
};

export default CTASection;
