
import React from 'react';
import { useAuth } from '@/contexts/AuthContext';
import { Link } from 'react-router-dom';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Badge } from '@/components/ui/badge';
import { 
  Brain, 
  BarChart3, 
  Target, 
  Trophy,
  TrendingUp,
  Clock,
  Users,
  Heart
} from 'lucide-react';

const Dashboard = () => {
  const { user } = useAuth();

  const testCategories = [
    {
      icon: Brain,
      title: 'Inteligență Emoțională',
      description: 'Evaluează-ți capacitatea de a gestiona emoțiile',
      color: 'bg-blue-100 text-blue-600',
      tests: 1
    },
    {
      icon: Users,
      title: 'Personalitate',
      description: 'Descoperă tipul tău de personalitate',
      color: 'bg-purple-100 text-purple-600',
      tests: 5
    },
    {
      icon: Target,
      title: 'Leadership & Echipă',
      description: 'Identifică rolurile tale în echipă',
      color: 'bg-green-100 text-green-600',
      tests: 1
    },
    {
      icon: Heart,
      title: 'Wellness Psihologic',
      description: 'Evaluează-ți starea de bine',
      color: 'bg-pink-100 text-pink-600',
      tests: 2
    }
  ];

  const quickStats = [
    {
      title: 'Teste completate',
      value: '0',
      icon: BarChart3,
      color: 'text-blue-600'
    },
    {
      title: 'Planuri de carieră',
      value: '0',
      icon: Target,
      color: 'text-green-600'
    },
    {
      title: 'Timpul economisit',
      value: '0h',
      icon: Clock,
      color: 'text-orange-600'
    },
    {
      title: 'Progres carieră',
      value: '0%',
      icon: TrendingUp,
      color: 'text-purple-600'
    }
  ];

  return (
    <div className="min-h-screen bg-gray-50">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
        {/* Welcome Section */}
        <div className="mb-8">
          <h1 className="text-3xl font-bold text-gray-900">
            Bună ziua, {user?.user_metadata?.full_name || 'Utilizator'}! 👋
          </h1>
          <p className="text-gray-600 mt-2">
            Să începem călătoria către dezvoltarea ta profesională
          </p>
        </div>

        {/* Quick Stats */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6 mb-8">
          {quickStats.map((stat, index) => (
            <Card key={index}>
              <CardContent className="p-6">
                <div className="flex items-center justify-between">
                  <div>
                    <p className="text-sm font-medium text-gray-600">{stat.title}</p>
                    <p className="text-2xl font-bold text-gray-900">{stat.value}</p>
                  </div>
                  <stat.icon className={`w-8 h-8 ${stat.color}`} />
                </div>
              </CardContent>
            </Card>
          ))}
        </div>

        {/* Main Actions */}
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-8 mb-8">
          {/* Start Test */}
          <Card className="border-2 border-dashed border-blue-200 hover:border-blue-400 transition-colors">
            <CardHeader>
              <div className="flex items-center space-x-2">
                <BarChart3 className="w-6 h-6 text-blue-600" />
                <CardTitle className="text-xl">Începe primul test</CardTitle>
              </div>
              <CardDescription>
                Începe cu un test de evaluare pentru a-ți cunoaște mai bine abilitățile
              </CardDescription>
            </CardHeader>
            <CardContent>
              <Link to="/teste">
                <Button className="w-full bg-blue-600 hover:bg-blue-700">
                  Explorează Testele
                </Button>
              </Link>
            </CardContent>
          </Card>

          {/* Career Path */}
          <Card className="border-2 border-dashed border-green-200 hover:border-green-400 transition-colors">
            <CardHeader>
              <div className="flex items-center space-x-2">
                <Target className="w-6 h-6 text-green-600" />
                <CardTitle className="text-xl">Planifică-ți cariera</CardTitle>
              </div>
              <CardDescription>
                Creează un plan personalizat de dezvoltare profesională
              </CardDescription>
            </CardHeader>
            <CardContent>
              <Link to="/career-paths">
                <Button className="w-full bg-green-600 hover:bg-green-700">
                  Începe Planul de Carieră
                </Button>
              </Link>
            </CardContent>
          </Card>
        </div>

        {/* Test Categories Preview */}
        <Card>
          <CardHeader>
            <CardTitle className="flex items-center space-x-2">
              <Trophy className="w-6 h-6 text-yellow-600" />
              <span>Categorii de Evaluări</span>
            </CardTitle>
            <CardDescription>
              Descoperă toate tipurile de teste disponibile
            </CardDescription>
          </CardHeader>
          <CardContent>
            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
              {testCategories.map((category, index) => (
                <div key={index} className="p-4 border rounded-lg hover:shadow-md transition-shadow">
                  <div className="flex items-start space-x-3">
                    <div className={`p-2 rounded-lg ${category.color}`}>
                      <category.icon className="w-5 h-5" />
                    </div>
                    <div className="flex-1">
                      <h3 className="font-semibold text-gray-900">{category.title}</h3>
                      <p className="text-sm text-gray-600 mt-1">{category.description}</p>
                      <Badge variant="secondary" className="mt-2">
                        {category.tests} {category.tests === 1 ? 'test' : 'teste'}
                      </Badge>
                    </div>
                  </div>
                </div>
              ))}
            </div>
            <div className="mt-6">
              <Link to="/teste">
                <Button variant="outline" className="w-full">
                  Vezi Toate Testele
                </Button>
              </Link>
            </div>
          </CardContent>
        </Card>
      </div>
    </div>
  );
};

export default Dashboard;
