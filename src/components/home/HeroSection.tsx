
import React from 'react';
import { useLanguage } from '@/hooks/useLanguage';
import { useNavigate } from 'react-router-dom';
import { Button } from '@/components/ui/button';
import { Badge } from '@/components/ui/badge';
import { Zap, ArrowRight } from 'lucide-react';

const HeroSection = () => {
  const { t } = useLanguage();
  const navigate = useNavigate();

  const handleCTAClick = (e: React.MouseEvent<HTMLButtonElement>) => {
    console.log('HeroSection: CTA button clicked - START');
    e.preventDefault();
    e.stopPropagation();
    
    try {
      console.log('HeroSection: Attempting navigation to /auth');
      navigate('/auth');
      console.log('HeroSection: Navigation completed');
    } catch (error) {
      console.error('HeroSection: Navigation failed:', error);
    }
  };

  console.log('HeroSection: Component rendered');

  return (
    <section className="py-20 px-4 sm:px-6 lg:px-8 pt-28">
      <div className="max-w-7xl mx-auto text-center">
        <Badge className="mb-4 bg-blue-100 text-blue-700 hover:bg-blue-200">
          <Zap className="w-3 h-3 mr-1" />
          Powered by AI
        </Badge>
        <h1 className="text-4xl md:text-6xl font-bold text-gray-900 mb-6">
          {t('home.heroTitle')}
        </h1>
        <p className="text-xl text-gray-600 mb-8 max-w-3xl mx-auto">
          {t('home.heroSubtitle')}
        </p>
        <div className="flex justify-center">
          <Button 
            size="lg" 
            className="bg-gradient-to-r from-blue-600 to-indigo-600 hover:from-blue-700 hover:to-indigo-700 text-white font-semibold shadow-lg min-h-[48px] px-8"
            onClick={handleCTAClick}
            onTouchStart={() => console.log('HeroSection: CTA touch start')}
            onTouchEnd={() => console.log('HeroSection: CTA touch end')}
            style={{ 
              WebkitTapHighlightColor: 'transparent',
              touchAction: 'manipulation',
              userSelect: 'none',
              cursor: 'pointer'
            }}
          >
            {t('home.startFreeAssessment')}
            <ArrowRight className="w-4 h-4 ml-2" />
          </Button>
        </div>
      </div>
    </section>
  );
};

export default HeroSection;
