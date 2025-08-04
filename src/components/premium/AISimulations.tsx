
import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Badge } from '@/components/ui/badge';
import { useLanguage } from '@/hooks/useLanguage';
import { useAISimulations } from '@/hooks/useAISimulations';
import { Loader2, Play, Users, Target, Clock } from 'lucide-react';

const AISimulations = () => {
  const { t, language } = useLanguage();
  const navigate = useNavigate();
  const { simulations = [], activeSimulation, startSimulation, isLoading, error } = useAISimulations();
  const [selectedScenario, setSelectedScenario] = useState<string | null>(null);

  const scenarios = [
    {
      id: 'job_interview',
      title: t('careerPaths.simulations.jobInterview'),
      description: t('careerPaths.simulations.jobInterviewDesc'),
      roles: [t('careerPaths.simulations.roles.recruiter'), t('careerPaths.simulations.roles.manager'), t('careerPaths.simulations.roles.teamMember')],
      duration: '15-30 min',
      difficulty: t('careerPaths.simulations.difficulty.medium')
    },
    {
      id: 'salary_negotiation',
      title: t('careerPaths.simulations.salaryNegotiation'),
      description: t('careerPaths.simulations.salaryNegotiationDesc'),
      roles: [t('careerPaths.simulations.roles.hrManager'), t('careerPaths.simulations.roles.teamLead'), t('careerPaths.simulations.roles.client')],
      duration: '20-40 min',
      difficulty: t('careerPaths.simulations.difficulty.hard')
    },
    {
      id: 'team_conflict',
      title: t('careerPaths.simulations.teamConflict'),
      description: t('careerPaths.simulations.teamConflictDesc'),
      roles: [t('careerPaths.simulations.roles.manager'), t('careerPaths.simulations.roles.teamMember'), t('careerPaths.simulations.roles.stakeholder')],
      duration: '10-20 min',
      difficulty: t('careerPaths.simulations.difficulty.easy')
    },
    {
      id: 'management_promotion',
      title: t('careerPaths.simulations.managementPromotion'),
      description: t('careerPaths.simulations.managementPromotionDesc'),
      roles: [t('careerPaths.simulations.roles.hrManager'), t('careerPaths.simulations.roles.seniorManager'), t('careerPaths.simulations.roles.teamLead')],
      duration: '25-35 min',
      difficulty: t('careerPaths.simulations.difficulty.hard')
    }
  ];

  const handleStartSimulation = async (scenarioId: string) => {
    console.log('🚀 Starting simulation with ID:', scenarioId);
    
    setSelectedScenario(scenarioId);
    
    try {
      console.log('🔄 Calling startSimulation...');
      const newSimulation = await startSimulation(scenarioId, language);
      console.log('✅ Simulation started successfully:', newSimulation);
      
      if (newSimulation && newSimulation.id) {
        navigate(`/simulation/${newSimulation.id}`);
      }
      
      setSelectedScenario(null);
    } catch (err) {
      console.error('❌ Error starting simulation:', err);
      setSelectedScenario(null);
    }
  };

  const handleResumeSimulation = () => {
    if (activeSimulation) {
      navigate(`/simulation/${activeSimulation.id}`);
    }
  };

  const getDifficultyColor = (difficulty: string) => {
    if (difficulty === t('careerPaths.simulations.difficulty.easy')) return 'bg-green-100 text-green-800';
    if (difficulty === t('careerPaths.simulations.difficulty.medium')) return 'bg-yellow-100 text-yellow-800';
    if (difficulty === t('careerPaths.simulations.difficulty.hard')) return 'bg-red-100 text-red-800';
    return 'bg-gray-100 text-gray-800';
  };

  return (
    <div className="space-y-6">
      <div className="text-center">
        <h2 className="text-2xl font-bold mb-2">{t('careerPaths.simulations.title')}</h2>
        <p className="text-muted-foreground">{t('careerPaths.simulations.subtitle')}</p>
      </div>

      {activeSimulation && (
        <Card className="border-blue-200 bg-blue-50">
          <CardContent className="pt-6">
            <div className="flex items-center justify-between">
              <div>
                <div className="flex items-center gap-2 mb-2">
                  <div className="w-2 h-2 bg-blue-500 rounded-full animate-pulse"></div>
                  <p className="text-blue-800 font-medium">{t('careerPaths.simulations.activeSimulation')}</p>
                </div>
                <p className="text-blue-700 text-sm">
                  {t('careerPaths.simulations.type')}: {activeSimulation.simulation_type} | 
                  {t('careerPaths.simulations.messages')}: {activeSimulation.conversation_log?.length || 0} | 
                  {t('careerPaths.simulations.responses')}: {activeSimulation.user_responses?.length || 0}
                </p>
              </div>
              <Button onClick={handleResumeSimulation} variant="outline" size="sm">
                {t('careerPaths.simulations.continueSimulation')}
              </Button>
            </div>
          </CardContent>
        </Card>
      )}

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
                  <span className="text-sm font-medium">{t('careerPaths.simulations.roles')}:</span>
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
                {t('careerPaths.simulations.startSimulation')}
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
            <CardTitle>{t('careerPaths.simulations.recentSimulations')}</CardTitle>
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
                      {simulation.is_completed ? t('careerPaths.simulations.completed') : t('careerPaths.simulations.inProgress')}
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
