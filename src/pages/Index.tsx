
import React from 'react';
import { useLanguage } from '@/hooks/useLanguage';
import HeroSection from '@/components/home/HeroSection';
import FeaturesSection from '@/components/home/FeaturesSection';
import TestCategoriesSection from '@/components/home/TestCategoriesSection';
import CareerJourneySection from '@/components/home/CareerJourneySection';
import PricingSection from '@/components/home/PricingSection';
import CTASection from '@/components/home/CTASection';
import Footer from '@/components/home/Footer';
import HomeNavigation from '@/components/home/HomeNavigation';
import LoadingSkeleton from '@/components/home/LoadingSkeleton';

const Index = () => {
  const { loading } = useLanguage();

  // Show loading skeleton only while initial translations are being loaded
  if (loading) {
    return <LoadingSkeleton />;
  }

  // Always show the landing page regardless of auth status
  return (
    <div className="min-h-screen bg-gradient-to-br from-blue-50 via-white to-indigo-50">
      <HomeNavigation />
      <HeroSection />
      <FeaturesSection />
      <TestCategoriesSection />
      <CareerJourneySection />
      <PricingSection />
      <CTASection />
      <Footer />
    </div>
  );
};

export default Index;
