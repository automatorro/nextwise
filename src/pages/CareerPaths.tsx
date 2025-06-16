
import React from 'react';
import { useAuth } from '@/contexts/AuthContext';
import { useSubscription } from '@/hooks/useSubscription';
import { Button } from '@/components/ui/button';
import { Badge } from '@/components/ui/badge';
import { 
  Target, 
  MessageCircle,
  BarChart3,
  Sparkles
} from 'lucide-react';
import CareerDashboardReal from '@/components/career/CareerDashboardReal';
import CreateCareerPlan from '@/components/career/CreateCareerPlan';
import AIMentoring from '@/components/career/AIMentoring';

const CareerPaths = () => {
  const { user } = useAuth();
  const { subscription } = useSubscription();
  const [activeTab, setActiveTab] = React.useState('dashboard');

  const getSubscriptionFeatures = () => {
    if (!subscription) return { maxPlans: 1, hasAI: false, hasAnalytics: false };
    
    switch (subscription.subscription_type) {
      case 'premium':
        return { maxPlans: 999, hasAI: true, hasAnalytics: true };
      case 'professional':
        return { maxPlans: 999, hasAI: false, hasAnalytics: true };
      default:
        return { maxPlans: 1, hasAI: false, hasAnalytics: false };
    }
  };

  const features = getSubscriptionFeatures();

  return (
    <div className="min-h-screen bg-gray-50">
      {/* Hero Section */}
      <section className="bg-gradient-to-br from-blue-50 via-white to-indigo-50 py-12 px-4 sm:px-6 lg:px-8">
        <div className="max-w-7xl mx-auto">
          <div className="text-center mb-8">
            <Badge className="mb-4 bg-blue-100 text-blue-700 hover:bg-blue-200">
              <Sparkles className="w-3 h-3 mr-1" />
              Planuri Personalizate AI
            </Badge>
            <h1 className="text-4xl font-bold text-gray-900 mb-4">
              Planurile tale de <span className="bg-gradient-to-r from-blue-600 to-indigo-600 bg-clip-text text-transparent">carieră personalizate</span>
            </h1>
            <p className="text-xl text-gray-600 max-w-3xl mx-auto mb-8">
              Inteligența artificială creează planuri de carieră bazate pe rezultatele testelor tale, 
              oferindu-ți un drumul clar către obiectivele profesionale.
            </p>
          </div>

          {/* Navigation Tabs */}
          <div className="flex justify-center mb-8">
            <div className="bg-white rounded-lg p-1 shadow-sm border">
              <Button
                variant={activeTab === 'dashboard' ? 'default' : 'ghost'}
                onClick={() => setActiveTab('dashboard')}
                className="flex items-center space-x-2"
              >
                <BarChart3 className="w-4 h-4" />
                <span>Dashboard</span>
              </Button>
              <Button
                variant={activeTab === 'create' ? 'default' : 'ghost'}
                onClick={() => setActiveTab('create')}
                className="flex items-center space-x-2"
              >
                <Target className="w-4 h-4" />
                <span>Plan Nou</span>
              </Button>
              {features.hasAI && (
                <Button
                  variant={activeTab === 'mentoring' ? 'default' : 'ghost'}
                  onClick={() => setActiveTab('mentoring')}
                  className="flex items-center space-x-2"
                >
                  <MessageCircle className="w-4 h-4" />
                  <span>Mentoring AI</span>
                </Button>
              )}
            </div>
          </div>
        </div>
      </section>

      {/* Main Content */}
      <section className="py-8 px-4 sm:px-6 lg:px-8">
        <div className="max-w-7xl mx-auto">
          {activeTab === 'dashboard' && <CareerDashboardReal />}
          
          {activeTab === 'create' && (
            <CreateCareerPlan 
              maxPlans={features.maxPlans}
              currentPlansCount={0}
            />
          )}
          
          {activeTab === 'mentoring' && features.hasAI && <AIMentoring />}
        </div>
      </section>
    </div>
  );
};

export default CareerPaths;
