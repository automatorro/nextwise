
import React from 'react';
import { useLanguage } from '@/hooks/useLanguage';
import { useAuth } from '@/contexts/AuthContext';
import HeroSection from '@/components/home/HeroSection';
import FeaturesSection from '@/components/home/FeaturesSection';
import TestCategoriesSection from '@/components/home/TestCategoriesSection';
import CareerJourneySection from '@/components/home/CareerJourneySection';
import PricingSection from '@/components/home/PricingSection';
import CTASection from '@/components/home/CTASection';
import Footer from '@/components/home/Footer';
import HomeNavigation from '@/components/home/HomeNavigation';
import LoadingSkeleton from '@/components/home/LoadingSkeleton';
import UserDashboard from '@/components/home/UserDashboard';

const Index = () => {
  const { loading } = useLanguage();
  const { user } = useAuth();

  // Show loading skeleton only while initial translations are being loaded
  if (loading) {
    return <LoadingSkeleton />;
  }

  // If user is logged in, show personalized dashboard
  if (user) {
    return (
      <div className="min-h-screen bg-gradient-to-br from-blue-50 via-white to-indigo-50">
        <HomeNavigation />
        <UserDashboard />
        <Footer />
      </div>
    );
  }

  // If user is not logged in, show landing page
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
