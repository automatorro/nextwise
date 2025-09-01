
import React from 'react';
import { useAuth } from '@/contexts/AuthContext';
import { useUserRole } from '@/hooks/useUserRole';
import { useProfileData } from '@/hooks/useProfileData';
import { useTranslation } from '@/hooks/useTranslation';
import { Loader2 } from 'lucide-react';
import HomeNavigation from '@/components/home/HomeNavigation';
import Footer from '@/components/home/Footer';
import ProfileHeader from '@/components/profile/ProfileHeader';
import ProfileInfoCard from '@/components/profile/ProfileInfoCard';
import ProgressOverview from '@/components/profile/ProgressOverview';
import QuickActions from '@/components/profile/QuickActions';
import RecentTestResults from '@/components/profile/RecentTestResults';
import StatsCards from '@/components/profile/StatsCards';
import AdminNotice from '@/components/profile/AdminNotice';

const MyPage = () => {
  const { user } = useAuth();
  const { t } = useTranslation();
  const { isAdmin, loading: roleLoading } = useUserRole();
  const { testResults, profile, userStats, isLoading } = useProfileData();

  if (isLoading || roleLoading) {
    return (
      <div className="min-h-screen bg-gray-50 flex items-center justify-center">
        <div className="flex items-center space-x-2">
          <Loader2 className="w-6 h-6 animate-spin" />
          <span>{t('common.loading')}</span>
        </div>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-gray-50">
      <HomeNavigation />
      
      <div className="pt-20">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
          {/* Header Section */}
          <div className="mb-8">
            <h1 className="text-3xl font-bold text-gray-900 mb-2">
              {t('profile.myProfile')}
            </h1>
            <p className="text-gray-600">
              {t('profile.profileDescription')}
            </p>
          </div>

          <ProfileHeader 
            user={{
              full_name: profile?.full_name,
              email: user?.email,
              role: profile?.role
            }}
            isAdmin={isAdmin()}
          />

          {/* Admin Notice */}
          {isAdmin() && <AdminNotice isAdmin={isAdmin()} />}

          {/* Main Content Grid */}
          <div className="grid grid-cols-1 lg:grid-cols-3 gap-8 mt-8">
            {/* Left Column - Profile & Stats */}
            <div className="lg:col-span-1">
              <div className="space-y-6">
                {/* Stats Cards */}
                <StatsCards userStats={userStats} isAdmin={isAdmin()} />
              </div>
            </div>

            {/* Middle Column - Profile Info & Progress */}
            <div className="lg:col-span-1">
              <div className="space-y-6">
                <ProfileInfoCard 
                  user={{
                    full_name: profile?.full_name,
                    email: user?.email,
                    created_at: profile?.created_at,
                    last_sign_in_at: user?.last_sign_in_at
                  }}
                  isAdmin={isAdmin()}
                />
                <ProgressOverview userStats={userStats} isAdmin={isAdmin()} />
                <QuickActions isAdmin={isAdmin()} />
              </div>
            </div>

            {/* Right Column - Recent Results */}
            <div className="lg:col-span-1">
              <RecentTestResults testResults={testResults} />
            </div>
          </div>
        </div>
      </div>
      
      <Footer />
    </div>
  );
};

export default MyPage;
