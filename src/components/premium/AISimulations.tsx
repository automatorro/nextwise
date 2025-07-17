import React, { useState } from 'react';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Textarea } from '@/components/ui/textarea';
import { Badge } from '@/components/ui/badge';
import { useLanguage } from '@/hooks/useLanguage';
import { useAISimulations } from '@/hooks/useAISimulations';
import { useProgressTracking } from '@/hooks/useProgressTracking';
import { MessageSquare, User, Bot, BarChart3, Play, Send } from 'lucide-react';
import { useToast } from '@/components/ui/use-toast';

const AISimulations = () => {
  const { t } = useLanguage();
  const { toast } = useToast();
  const { activeSimulation, startSimulation, sendResponse, isLoading } = useAISimulations();
  const { trackProgress } = useProgressTracking();
  const [userResponse, setUserResponse] = useState('');

  const simulationTypes = [
    {
      id: 'job_interview',
      icon: '💼',
      color: 'bg-blue-500',
      role: 'Recruiter'
    },
    {
      id: 'management_promotion',
      icon: '📈',
      color: 'bg-purple-500',
      role: 'Manager'
    },
    {
      id: 'team_conflict',
      icon: '⚖️',
      color: 'bg-orange-500',
      role: 'Team_Member'
    },
    {
      id: 'salary_negotiation',
      icon: '💰',
      color: 'bg-green-500',
      role: 'HR_Manager'
    }
  ];

  const handleStartSimulation = async (simulationType: string) => {
    try {
      await startSimulation(simulationType);
      toast({
        title: t('common.success'),
        description: t('premiumFeatures.simulations.startSimulation'),
      });
    } catch (error) {
      toast({
        title: t('common.error'),
        description: 'Error starting simulation',
        variant: 'destructive',
      });
    }
  };

  const handleSendResponse = async () => {
    if (!userResponse.trim()) return;
    
    try {
      await sendResponse(userResponse);
      setUserResponse('');
      
      // Track progress
      await trackProgress({
        steps_completed: 1,
        achievement_description: `Responded in ${activeSimulation?.simulation_type} simulation`
      });
      
      toast({
        title: t('common.success'),
        description: t('premiumFeatures.simulations.responseSent'),
      });
    } catch (error) {
      toast({
        title: t('common.error'),
        description: 'Error sending response',
        variant: 'destructive',
      });
    }
  };

  const getSimulationConfig = (type: string) => {
    return simulationTypes.find(sim => sim.id === type);
  };

  if (activeSimulation) {
    const config = getSimulationConfig(activeSimulation.simulation_type);
    const isCompleted = activeSimulation.is_completed;

    return (
      <div className="space-y-6">
        <div className="flex items-center justify-between">
          <div>
            <h2 className="text-2xl font-bold text-foreground">
              {t(`premiumFeatures.simulations.${activeSimulation.simulation_type}`)}
            </h2>
            <p className="text-muted-foreground">
              {t(`premiumFeatures.simulations.aiRole.${config?.role}`)}
            </p>
          </div>
          {isCompleted && (
            <Badge variant="secondary" className="bg-green-100 text-green-800">
              {t('premiumFeatures.simulations.completed')}
            </Badge>
          )}
        </div>

        <Card>
          <CardHeader>
            <CardTitle className="flex items-center gap-2">
              <MessageSquare className="w-5 h-5" />
              {t('premiumFeatures.simulations.simulation')}
            </CardTitle>
          </CardHeader>
          <CardContent>
            <div className="space-y-4 max-h-96 overflow-y-auto">
              {Array.isArray(activeSimulation.conversation_log) && activeSimulation.conversation_log.map((message, index) => (
                <div 
                  key={index}
                  className={`flex gap-3 ${message.sender === 'user' ? 'justify-end' : 'justify-start'}`}
                >
                  <div className={`flex gap-2 max-w-[80%] ${message.sender === 'user' ? 'flex-row-reverse' : ''}`}>
                    <div className={`w-8 h-8 rounded-full flex items-center justify-center ${
                      message.sender === 'user' ? 'bg-primary text-primary-foreground' : 'bg-muted'
                    }`}>
                      {message.sender === 'user' ? <User className="w-4 h-4" /> : <Bot className="w-4 h-4" />}
                    </div>
                    <div className={`p-3 rounded-lg ${
                      message.sender === 'user' 
                        ? 'bg-primary text-primary-foreground' 
                        : 'bg-muted'
                    }`}>
                      <p className="text-sm">{message.content}</p>
                      <p className="text-xs opacity-70 mt-1">
                        {message.timestamp ? new Date(message.timestamp).toLocaleTimeString() : ''}
                      </p>
                    </div>
                  </div>
                </div>
              ))}
              
              {(!activeSimulation.conversation_log || activeSimulation.conversation_log.length === 0) && (
                <div className="text-center py-8">
                  <Bot className="w-12 h-12 mx-auto text-muted-foreground mb-4" />
                  <p className="text-muted-foreground">{t('premiumFeatures.simulations.waitingForStart')}</p>
                </div>
              )}
            </div>

            {!isCompleted && (
              <div className="mt-4 space-y-3">
                <Textarea
                  value={userResponse}
                  onChange={(e) => setUserResponse(e.target.value)}
                  placeholder={t('premiumFeatures.simulations.myResponse')}
                  className="min-h-[100px]"
                />
                <Button 
                  onClick={handleSendResponse}
                  disabled={!userResponse.trim() || isLoading}
                  className="w-full"
                >
                  <Send className="w-4 h-4 mr-2" />
                  {t('premiumFeatures.simulations.sendResponse')}
                </Button>
              </div>
            )}
          </CardContent>
        </Card>

        {isCompleted && activeSimulation.ai_feedback && (
          <Card>
            <CardHeader>
              <CardTitle className="flex items-center gap-2">
                <BarChart3 className="w-5 h-5" />
                {t('premiumFeatures.simulations.feedback')}
              </CardTitle>
            </CardHeader>
            <CardContent className="space-y-6">
              <div>
                <h4 className="font-medium mb-2">{t('premiumFeatures.simulations.feedback')}</h4>
                <p className="text-muted-foreground">{activeSimulation.ai_feedback}</p>
              </div>

              <div>
                <h4 className="font-medium mb-4">{t('premiumFeatures.simulations.scores')}</h4>
                <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
                  {[
                    { key: 'clarity', score: activeSimulation.clarity_score },
                    { key: 'empathy', score: activeSimulation.empathy_score },
                    { key: 'conviction', score: activeSimulation.conviction_score },
                    { key: 'structure', score: activeSimulation.structure_score },
                  ].map(({ key, score }) => (
                    <div key={key} className="text-center p-3 bg-muted rounded-lg">
                      <div className="text-2xl font-bold text-primary">{score}/10</div>
                      <div className="text-sm text-muted-foreground">
                        {t(`premiumFeatures.simulations.${key}`)}
                      </div>
                    </div>
                  ))}
                </div>
                
                <div className="mt-4 text-center p-4 bg-primary/10 rounded-lg">
                  <div className="text-3xl font-bold text-primary">{activeSimulation.overall_score}/100</div>
                  <div className="text-sm text-muted-foreground">
                    {t('premiumFeatures.simulations.overall')}
                  </div>
                </div>
              </div>
            </CardContent>
          </Card>
        )}
      </div>
    );
  }

  return (
    <div className="space-y-6">
      <div>
        <h2 className="text-2xl font-bold text-foreground">{t('premiumFeatures.simulations.title')}</h2>
        <p className="text-muted-foreground">{t('premiumFeatures.simulations.subtitle')}</p>
      </div>

      <div>
        <h3 className="text-lg font-medium mb-4">{t('premiumFeatures.simulations.selectSimulation')}</h3>
        <div className="grid gap-4 md:grid-cols-2">
          {simulationTypes.map((simulation) => (
            <Card key={simulation.id} className="cursor-pointer hover:shadow-md transition-shadow">
              <CardHeader>
                <CardTitle className="flex items-center gap-3">
                  <div className={`w-10 h-10 rounded-full ${simulation.color} flex items-center justify-center text-white text-lg`}>
                    {simulation.icon}
                  </div>
                  {t(`premiumFeatures.simulations.${simulation.id}`)}
                </CardTitle>
              </CardHeader>
              <CardContent className="space-y-4">
                <p className="text-sm text-muted-foreground">
                  {t(`premiumFeatures.simulations.simulationDescription.${simulation.id}`)}
                </p>
                <div className="flex items-center gap-2 text-sm text-muted-foreground">
                  <Bot className="w-4 h-4" />
                  {t(`premiumFeatures.simulations.aiRole.${simulation.role}`)}
                </div>
                <Button 
                  onClick={() => handleStartSimulation(simulation.id)}
                  disabled={isLoading}
                  className="w-full"
                >
                  <Play className="w-4 h-4 mr-2" />
                  {t('premiumFeatures.simulations.startSimulation')}
                </Button>
              </CardContent>
            </Card>
          ))}
        </div>
      </div>
    </div>
  );
};

export default AISimulations;