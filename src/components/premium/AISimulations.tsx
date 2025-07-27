
import React, { useState } from 'react';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Badge } from '@/components/ui/badge';
import { useLanguage } from '@/hooks/useLanguage';
import { useAISimulations } from '@/hooks/useAISimulations';
import { Loader2, Play, Users, Target, Clock } from 'lucide-react';

const AISimulations = () => {
  const { t } = useLanguage();
  const { simulations = [], startSimulation, isLoading, error } = useAISimulations();
  const [selectedScenario, setSelectedScenario] = useState<string | null>(null);

  const scenarios = [
    {
      id: 'job_interview',
      title: t('premiumFeatures.simulations.job_interview') || 'Job Interview',
      description: t('premiumFeatures.simulations.simulationDescription.job_interview') || 'Practice for a job interview in a safe environment',
      roles: ['Recruiter', 'Manager', 'Team Member'],
      duration: '15-30 min',
      difficulty: 'Medium'
    },
    {
      id: 'salary_negotiation',
      title: t('premiumFeatures.simulations.salary_negotiation') || 'Salary Negotiation',
      description: t('premiumFeatures.simulations.simulationDescription.salary_negotiation') || 'Develop your negotiation skills',
      roles: ['HR Manager', 'Team Lead', 'Client'],
      duration: '20-40 min',
      difficulty: 'Hard'
    },
    {
      id: 'team_conflict',
      title: t('premiumFeatures.simulations.team_conflict') || 'Team Conflict',
      description: t('premiumFeatures.simulations.simulationDescription.team_conflict') || 'Learn to manage team conflicts',
      roles: ['Manager', 'Team Member', 'Stakeholder'],
      duration: '10-20 min',
      difficulty: 'Easy'
    },
    {
      id: 'management_promotion',
      title: t('premiumFeatures.simulations.management_promotion') || 'Management Promotion',
      description: t('premiumFeatures.simulations.simulationDescription.management_promotion') || 'Prepare for a management promotion',
      roles: ['HR Manager', 'Senior Manager', 'Team Lead'],
      duration: '25-35 min',
      difficulty: 'Hard'
    }
  ];

  const handleStartSimulation = async (scenarioId: string) => {
    console.log('🚀 Starting simulation with ID:', scenarioId);
    console.log('📊 Hook state - isLoading:', isLoading, 'error:', error);
    
    setSelectedScenario(scenarioId);
    
    try {
      console.log('🔄 Calling startSimulation...');
      await startSimulation(scenarioId);
      console.log('✅ Simulation started successfully');
    } catch (err) {
      console.error('❌ Error starting simulation:', err);
    }
  };

  const getDifficultyColor = (difficulty: string) => {
    switch (difficulty) {
      case 'Easy': return 'bg-green-100 text-green-800';
      case 'Medium': return 'bg-yellow-100 text-yellow-800';
      case 'Hard': return 'bg-red-100 text-red-800';
      default: return 'bg-gray-100 text-gray-800';
    }
  };

  console.log('🎯 AISimulations component rendered');
  console.log('📋 Hook data:', { simulations, isLoading, error });

  return (
    <div className="space-y-6">
      <div className="text-center">
        <h2 className="text-2xl font-bold mb-2">{t('premiumFeatures.simulations.title') || 'AI Simulations'}</h2>
        <p className="text-muted-foreground">{t('premiumFeatures.simulations.subtitle') || 'Practice professional scenarios with AI'}</p>
      </div>

      <div className="grid gap-6 md:grid-cols-2 lg:grid-cols-2">
        {scenarios.map((scenario) => (
          <Card key={scenario.id} className="hover:shadow-lg transition-shadow">
            <CardHeader>
              <CardTitle className="flex items-center gap-2">
                <Target className="w-5 h-5" />
                {scenario.title}
              </CardTitle>
            </CardHeader>
            <CardContent className="space-y-4">
              <p className="text-sm text-muted-foreground">
                {scenario.description}
              </p>
              
              <div className="space-y-2">
                <div className="flex items-center gap-2">
                  <Users className="w-4 h-4 text-blue-500" />
                  <span className="text-sm font-medium">Roles:</span>
                </div>
                <div className="flex flex-wrap gap-1">
                  {scenario.roles.map((role, index) => (
                    <Badge key={index} variant="secondary" className="text-xs">
                      {role}
                    </Badge>
                  ))}
                </div>
              </div>

              <div className="flex items-center justify-between">
                <div className="flex items-center gap-2">
                  <Clock className="w-4 h-4 text-gray-500" />
                  <span className="text-sm text-muted-foreground">{scenario.duration}</span>
                </div>
                <Badge className={`text-xs ${getDifficultyColor(scenario.difficulty)}`}>
                  {scenario.difficulty}
                </Badge>
              </div>

              <Button 
                onClick={() => handleStartSimulation(scenario.id)}
                disabled={isLoading || selectedScenario === scenario.id}
                className="w-full"
              >
                {isLoading && selectedScenario === scenario.id ? (
                  <Loader2 className="w-4 h-4 animate-spin mr-2" />
                ) : (
                  <Play className="w-4 h-4 mr-2" />
                )}
                {t('premiumFeatures.simulations.startSimulation') || 'Start Simulation'}
              </Button>
            </CardContent>
          </Card>
        ))}
      </div>

      {error && (
        <Card className="border-red-200 bg-red-50">
          <CardContent className="pt-6">
            <p className="text-red-600 text-sm">{error}</p>
          </CardContent>
        </Card>
      )}

      {simulations && simulations.length > 0 && (
        <Card>
          <CardHeader>
            <CardTitle>Simulări Recente</CardTitle>
          </CardHeader>
          <CardContent>
            <div className="space-y-4">
              {simulations.map((simulation) => (
                <div key={simulation.id} className="border rounded-lg p-4">
                  <div className="flex items-center justify-between">
                    <div>
                      <h3 className="font-medium">{simulation.simulation_type}</h3>
                      <p className="text-sm text-muted-foreground">
                        {new Date(simulation.created_at).toLocaleDateString()}
                      </p>
                    </div>
                    <Badge variant={simulation.is_completed ? 'default' : 'secondary'}>
                      {simulation.is_completed ? 'Completed' : 'In Progress'}
                    </Badge>
                  </div>
                  {simulation.ai_feedback && (
                    <div className="mt-2 p-3 bg-muted rounded-md">
                      <p className="text-sm">{simulation.ai_feedback}</p>
                    </div>
                  )}
                </div>
              ))}
            </div>
          </CardContent>
        </Card>
      )}
    </div>
  );
};

export default AISimulations;
