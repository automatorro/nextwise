
import React from 'react';
import { useAuth } from '@/contexts/AuthContext';
import { useUserRole } from '@/hooks/useUserRole';
import { useProfileData } from '@/hooks/useProfileData';
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
            <ProfileHeader 
              isAdmin={isAdmin()} 
              profileName={profile?.full_name} 
              userEmail={user?.email} 
            />

            <StatsCards userStats={userStats} isAdmin={isAdmin()} />

            {isAdmin() && <AdminNotice />}

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
