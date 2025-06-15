
import React from 'react';
import { useQuery } from '@tanstack/react-query';
import { supabase } from '@/integrations/supabase/client';
import { useAuth } from '@/contexts/AuthContext';
import { useUserRole } from '@/hooks/useUserRole';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Badge } from '@/components/ui/badge';
import { Progress } from '@/components/ui/progress';
import { Button } from '@/components/ui/button';
import { Loader2, Trophy, TrendingUp, User, Calendar, Award, BookOpen, Shield } from 'lucide-react';
import { useNavigate } from 'react-router-dom';

interface TestResult {
  id: string;
  score: any;
  completed_at: string;
  test_types: {
    name: string;
    description: string;
  };
}

interface UserStats {
  totalTests: number;
  averageScore: number;
  completedThisMonth: number;
  bestCategory: string;
}

const MyPage = () => {
  const { user } = useAuth();
  const { isAdmin, loading: roleLoading } = useUserRole();
  const navigate = useNavigate();

  // Fetch user's test results
  const { data: testResults, isLoading: resultsLoading } = useQuery({
    queryKey: ['user-test-results', user?.id],
    queryFn: async () => {
      const { data, error } = await supabase
        .from('test_results')
        .select(`
          *,
          test_types (
            name,
            description
          )
        `)
        .eq('user_id', user?.id)
        .order('completed_at', { ascending: false });
      
      if (error) throw error;
      return data as TestResult[];
    },
    enabled: !!user?.id
  });

  // Fetch user profile
  const { data: profile, isLoading: profileLoading } = useQuery({
    queryKey: ['user-profile', user?.id],
    queryFn: async () => {
      const { data, error } = await supabase
        .from('profiles')
        .select('*')
        .eq('id', user?.id)
        .single();
      
      if (error) throw error;
      return data;
    },
    enabled: !!user?.id
  });

  // Calculate user statistics
  const userStats: UserStats = React.useMemo(() => {
    if (!testResults) return { totalTests: 0, averageScore: 0, completedThisMonth: 0, bestCategory: 'N/A' };

    const totalTests = testResults.length;
    const averageScore = testResults.length > 0 
      ? Math.round(testResults.reduce((sum, result) => sum + (result.score?.overall || 0), 0) / testResults.length)
      : 0;

    const currentMonth = new Date().getMonth();
    const currentYear = new Date().getFullYear();
    const completedThisMonth = testResults.filter(result => {
      const resultDate = new Date(result.completed_at);
      return resultDate.getMonth() === currentMonth && resultDate.getFullYear() === currentYear;
    }).length;

    // Find best performing category (simplified)
    const categoryScores: { [key: string]: number[] } = {};
    testResults.forEach(result => {
      const category = result.test_types.name;
      if (!categoryScores[category]) categoryScores[category] = [];
      categoryScores[category].push(result.score?.overall || 0);
    });

    let bestCategory = 'N/A';
    let bestAverage = 0;
    Object.entries(categoryScores).forEach(([category, scores]) => {
      const average = scores.reduce((sum, score) => sum + score, 0) / scores.length;
      if (average > bestAverage) {
        bestAverage = average;
        bestCategory = category;
      }
    });

    return { totalTests, averageScore, completedThisMonth, bestCategory };
  }, [testResults]);

  const getScoreColor = (score: number) => {
    if (score >= 80) return 'text-green-600';
    if (score >= 60) return 'text-yellow-600';
    return 'text-red-600';
  };

  const getScoreBadgeVariant = (score: number) => {
    if (score >= 80) return 'default';
    if (score >= 60) return 'secondary';
    return 'destructive';
  };

  if (resultsLoading || profileLoading || roleLoading) {
    return (
      <div className="min-h-screen bg-gray-50 flex items-center justify-center">
        <Loader2 className="w-8 h-8 animate-spin" />
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-gray-50">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
        {/* Header */}
        <div className="mb-8">
          <div className="flex items-center space-x-3">
            <h1 className="text-3xl font-bold text-gray-900">Pagina Mea</h1>
            {isAdmin() && (
              <Badge variant="destructive" className="flex items-center space-x-1">
                <Shield className="w-3 h-3" />
                <span>Administrator</span>
              </Badge>
            )}
          </div>
          <p className="text-gray-600 mt-2">
            Bun venit, {profile?.full_name || user?.email}! Aici poți vedea progresul tău și rezultatele testelor.
          </p>
        </div>

        {/* Stats Cards */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6 mb-8">
          <Card>
            <CardContent className="p-6">
              <div className="flex items-center">
                <Trophy className="h-8 w-8 text-yellow-600" />
                <div className="ml-4">
                  <p className="text-sm font-medium text-gray-600">Teste Completate</p>
                  <p className="text-2xl font-bold text-gray-900">{userStats.totalTests}</p>
                </div>
              </div>
            </CardContent>
          </Card>

          <Card>
            <CardContent className="p-6">
              <div className="flex items-center">
                <TrendingUp className="h-8 w-8 text-blue-600" />
                <div className="ml-4">
                  <p className="text-sm font-medium text-gray-600">Scor Mediu</p>
                  <p className={`text-2xl font-bold ${getScoreColor(userStats.averageScore)}`}>
                    {userStats.averageScore}%
                  </p>
                </div>
              </div>
            </CardContent>
          </Card>

          <Card>
            <CardContent className="p-6">
              <div className="flex items-center">
                <Calendar className="h-8 w-8 text-green-600" />
                <div className="ml-4">
                  <p className="text-sm font-medium text-gray-600">Luna Aceasta</p>
                  <p className="text-2xl font-bold text-gray-900">{userStats.completedThisMonth}</p>
                </div>
              </div>
            </CardContent>
          </Card>

          <Card>
            <CardContent className="p-6">
              <div className="flex items-center">
                <Award className="h-8 w-8 text-purple-600" />
                <div className="ml-4">
                  <p className="text-sm font-medium text-gray-600">
                    {isAdmin() ? 'Status' : 'Cel Mai Bun La'}
                  </p>
                  <p className="text-sm font-bold text-gray-900">
                    {isAdmin() ? 'Administrator' : userStats.bestCategory}
                  </p>
                </div>
              </div>
            </CardContent>
          </Card>
        </div>

        {/* Admin Notice */}
        {isAdmin() && (
          <Card className="mb-8 border-orange-200 bg-orange-50">
            <CardContent className="p-6">
              <div className="flex items-center space-x-3">
                <Shield className="h-6 w-6 text-orange-600" />
                <div>
                  <h3 className="font-semibold text-orange-900">Acces Administrator</h3>
                  <p className="text-orange-700 text-sm">
                    Ai acces nelimitat la toate testele și funcționalitățile platformei.
                  </p>
                </div>
              </div>
            </CardContent>
          </Card>
        )}

        <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
          {/* Recent Test Results */}
          <div className="lg:col-span-2">
            <Card>
              <CardHeader>
                <CardTitle className="flex items-center">
                  <BookOpen className="w-5 h-5 mr-2" />
                  Rezultatele Testelor Recente
                </CardTitle>
              </CardHeader>
              <CardContent>
                {testResults && testResults.length > 0 ? (
                  <div className="space-y-4">
                    {testResults.slice(0, 6).map((result) => (
                      <div
                        key={result.id}
                        className="flex items-center justify-between p-4 border rounded-lg hover:bg-gray-50 cursor-pointer"
                        onClick={() => navigate(`/test-result/${result.id}`)}
                      >
                        <div className="flex-1">
                          <h3 className="font-medium text-gray-900">
                            {result.test_types.name}
                          </h3>
                          <p className="text-sm text-gray-600">
                            {new Date(result.completed_at).toLocaleDateString('ro-RO')}
                          </p>
                        </div>
                        <div className="flex items-center space-x-2">
                          <Badge variant={getScoreBadgeVariant(result.score?.overall || 0)}>
                            {result.score?.overall || 0}%
                          </Badge>
                        </div>
                      </div>
                    ))}
                    {testResults.length > 6 && (
                      <Button 
                        variant="outline" 
                        className="w-full"
                        onClick={() => navigate('/teste')}
                      >
                        Vezi Toate Rezultatele
                      </Button>
                    )}
                  </div>
                ) : (
                  <div className="text-center py-8">
                    <BookOpen className="mx-auto h-12 w-12 text-gray-400" />
                    <h3 className="mt-2 text-sm font-medium text-gray-900">
                      Niciun test completat
                    </h3>
                    <p className="mt-1 text-sm text-gray-500">
                      Începe cu primul tău test pentru a vedea rezultatele aici.
                    </p>
                    <div className="mt-6">
                      <Button onClick={() => navigate('/teste')}>
                        Încearcă un Test
                      </Button>
                    </div>
                  </div>
                )}
              </CardContent>
            </Card>
          </div>

          {/* Profile & Progress */}
          <div className="space-y-6">
            {/* Profile Info */}
            <Card>
              <CardHeader>
                <CardTitle className="flex items-center">
                  <User className="w-5 h-5 mr-2" />
                  Informații Profil
                </CardTitle>
              </CardHeader>
              <CardContent>
                <div className="space-y-4">
                  <div>
                    <label className="text-sm font-medium text-gray-600">Nume</label>
                    <p className="text-gray-900">{profile?.full_name || 'Nu este setat'}</p>
                  </div>
                  <div>
                    <label className="text-sm font-medium text-gray-600">Email</label>
                    <p className="text-gray-900">{user?.email}</p>
                  </div>
                  {isAdmin() && (
                    <div>
                      <label className="text-sm font-medium text-gray-600">Rol</label>
                      <div className="flex items-center space-x-2 mt-1">
                        <Shield className="w-4 h-4 text-red-600" />
                        <span className="text-red-600 font-medium">Administrator</span>
                      </div>
                    </div>
                  )}
                  <div>
                    <label className="text-sm font-medium text-gray-600">Membru din</label>
                    <p className="text-gray-900">
                      {profile?.created_at 
                        ? new Date(profile.created_at).toLocaleDateString('ro-RO')
                        : 'Nu este disponibil'
                      }
                    </p>
                  </div>
                </div>
              </CardContent>
            </Card>

            {/* Progress Overview */}
            <Card>
              <CardHeader>
                <CardTitle>Progresul Tău</CardTitle>
              </CardHeader>
              <CardContent>
                <div className="space-y-4">
                  <div>
                    <div className="flex justify-between text-sm mb-2">
                      <span>Progres General</span>
                      <span>{userStats.averageScore}%</span>
                    </div>
                    <Progress value={userStats.averageScore} className="w-full" />
                  </div>
                  <div>
                    <div className="flex justify-between text-sm mb-2">
                      <span>Teste Completate</span>
                      <span>
                        {isAdmin() 
                          ? `${userStats.totalTests}/∞` 
                          : `${userStats.totalTests}/10`
                        }
                      </span>
                    </div>
                    <Progress 
                      value={isAdmin() ? 100 : Math.min((userStats.totalTests / 10) * 100, 100)} 
                      className="w-full" 
                    />
                  </div>
                </div>
              </CardContent>
            </Card>

            {/* Quick Actions */}
            <Card>
              <CardHeader>
                <CardTitle>Acțiuni Rapide</CardTitle>
              </CardHeader>
              <CardContent>
                <div className="space-y-3">
                  <Button 
                    className="w-full" 
                    onClick={() => navigate('/teste')}
                  >
                    Încearcă un Test Nou
                  </Button>
                  <Button 
                    variant="outline" 
                    className="w-full"
                    onClick={() => navigate('/dashboard')}
                  >
                    Mergi la Dashboard
                  </Button>
                  {!isAdmin() && (
                    <Button 
                      variant="outline" 
                      className="w-full"
                      onClick={() => navigate('/abonament')}
                    >
                      Vezi Abonamentul
                    </Button>
                  )}
                </div>
              </CardContent>
            </Card>
          </div>
        </div>
      </div>
    </div>
  );
};

export default MyPage;
