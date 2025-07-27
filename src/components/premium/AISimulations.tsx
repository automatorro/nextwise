
import React, { useState } from 'react';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Badge } from '@/components/ui/badge';
import { useLanguage } from '@/hooks/useLanguage';
import { useAISimulations } from '@/hooks/useAISimulations';
import { Loader2, Play, Users, Target, Clock } from 'lucide-react';

const AISimulations = () => {
  const { t } = useLanguage();
  const { simulations, startSimulation, isLoading } = useAISimulations();
  const [selectedScenario, setSelectedScenario] = useState<string | null>(null);

  const scenarios = [
    {
      id: 'interview',
      title: t('premiumFeatures.simulations.scenarios.interview.title'),
      description: t('premiumFeatures.simulations.scenarios.interview.description'),
      roles: ['Recruiter', 'Manager', 'Team_Member'],
      duration: '15-30 min',
      difficulty: 'Medium'
    },
    {
      id: 'negotiation',
      title: t('premiumFeatures.simulations.scenarios.negotiation.title'),
      description: t('premiumFeatures.simulations.scenarios.negotiation.description'),
      roles: ['HR_Manager', 'Team_Lead', 'Client'],
      duration: '20-40 min',
      difficulty: 'Hard'
    },
    {
      id: 'team_meeting',
      title: t('premiumFeatures.simulations.scenarios.teamMeeting.title'),
      description: t('premiumFeatures.simulations.scenarios.teamMeeting.description'),
      roles: ['Manager', 'Team_Member', 'Stakeholder'],
      duration: '10-20 min',
      difficulty: 'Easy'
    }
  ];

  const handleStartSimulation = async (scenarioId: string) => {
    setSelectedScenario(scenarioId);
    await startSimulation(scenarioId);
  };

  const getDifficultyColor = (difficulty: string) => {
    switch (difficulty) {
      case 'Easy': return 'bg-green-100 text-green-800';
      case 'Medium': return 'bg-yellow-100 text-yellow-800';
      case 'Hard': return 'bg-red-100 text-red-800';
      default: return 'bg-gray-100 text-gray-800';
    }
  };

  return (
    <div className="space-y-6">
      <div className="text-center">
        <h2 className="text-2xl font-bold mb-2">{t('premiumFeatures.simulations.title')}</h2>
        <p className="text-muted-foreground">{t('premiumFeatures.simulations.description')}</p>
      </div>

      <div className="grid gap-6 md:grid-cols-2 lg:grid-cols-3">
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
                      {role.replace('_', ' ')}
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
                {t('premiumFeatures.simulations.startSimulation')}
              </Button>
            </CardContent>
          </Card>
        ))}
      </div>

      {simulations.length > 0 && (
        <Card>
          <CardHeader>
            <CardTitle>{t('premiumFeatures.simulations.recentSimulations')}</CardTitle>
          </CardHeader>
          <CardContent>
            <div className="space-y-4">
              {simulations.map((simulation) => (
                <div key={simulation.id} className="border rounded-lg p-4">
                  <div className="flex items-center justify-between">
                    <div>
                      <h3 className="font-medium">{simulation.scenario_type}</h3>
                      <p className="text-sm text-muted-foreground">
                        {new Date(simulation.created_at).toLocaleDateString()}
                      </p>
                    </div>
                    <Badge variant={simulation.status === 'completed' ? 'default' : 'secondary'}>
                      {simulation.status}
                    </Badge>
                  </div>
                  {simulation.feedback && (
                    <div className="mt-2 p-3 bg-muted rounded-md">
                      <p className="text-sm">{simulation.feedback}</p>
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
