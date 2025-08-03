
import React from 'react';
import { useAuth } from '@/contexts/AuthContext';
import { useUserRole } from '@/hooks/useUserRole';
import { useProfileData } from '@/hooks/useProfileData';
import { useLanguage } from '@/hooks/useLanguage';
import { Loader2 } from 'lucide-react';
import HomeNavigation from '@/components/home/HomeNavigation';
import Footer from '@/components/home/Footer';
import ProfileHeader from '@/components/profile/ProfileHeader';
import StatsCards from '@/components/profile/StatsCards';
import AdminNotice from '@/components/profile/AdminNotice';
import RecentTestResults from '@/components/profile/RecentTestResults';
import ProfileInfoCard from '@/components/profile/ProfileInfoCard';
import ProgressOverview from '@/components/profile/ProgressOverview';
import QuickActions from '@/components/profile/QuickActions';

const MyPage = () => {
  const { user } = useAuth();
  const { t } = useLanguage();
  const { isAdmin, loading: roleLoading } = useUserRole();
  const { testResults, profile, userStats, isLoading } = useProfileData();

  if (isLoading || roleLoading) {
    return (
      <div>
        <HomeNavigation />
        <div className="pt-28">
          <div className="min-h-screen bg-gray-50 flex items-center justify-center">
            <Loader2 className="w-8 h-8 animate-spin" />
          </div>
        </div>
        <Footer />
      </div>
    );
  }

  return (
    <div>
      <HomeNavigation />
      <div className="pt-28">
        <div className="min-h-screen bg-gray-50">
          <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
            {/* Profile Header */}
            <div className="mb-8">
              <h1 className="text-3xl font-bold text-gray-900">
                {t('profile.title')}
              </h1>
              <div className="mt-2">
                <p className="text-xl text-gray-600">
                  {t('profile.welcome')} {profile?.full_name || user?.email}! 👋
                </p>
                <p className="text-gray-600">
                  {t('profile.welcomeMessage')}
                </p>
                {isAdmin() && (
                  <div className="mt-2">
                    <span className="inline-flex items-center px-3 py-1 rounded-full text-sm font-medium bg-purple-100 text-purple-800">
                      {t('profile.administrator')}
                    </span>
                  </div>
                )}
              </div>
            </div>

            <StatsCards userStats={userStats} isAdmin={isAdmin()} />

            {isAdmin() && (
              <div className="mb-8">
                <div className="bg-purple-50 border border-purple-200 rounded-lg p-4">
                  <p className="text-purple-800">
                    {t('profile.admin.notice')}
                  </p>
                </div>
              </div>
            )}

            <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
              <div className="lg:col-span-2">
                <RecentTestResults testResults={testResults} />
              </div>

              <div className="space-y-6">
                <ProfileInfoCard 
                  fullName={profile?.full_name}
                  email={user?.email}
                  isAdmin={isAdmin()}
                  createdAt={profile?.created_at}
                />
                <ProgressOverview userStats={userStats} isAdmin={isAdmin()} />
                <QuickActions isAdmin={isAdmin()} />
              </div>
            </div>
          </div>
        </div>
      </div>
      <Footer />
    </div>
  );
};

export default MyPage;
