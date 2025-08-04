
import React, { useState } from 'react';
import { useQuery, useMutation, useQueryClient } from '@tanstack/react-query';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Badge } from '@/components/ui/badge';
import { PlayCircle, Clock, Users, Trophy, Target, Briefcase } from 'lucide-react';
import { supabase } from '@/integrations/supabase/client';
import { useAuth } from '@/contexts/AuthContext';
import { useLanguage } from '@/hooks/useLanguage';
import { useToast } from '@/hooks/use-toast';
import { useNavigate } from 'react-router-dom';

const AISimulations = () => {
  const { user } = useAuth();
  const { t, language } = useLanguage();
  const { toast } = useToast();
  const navigate = useNavigate();
  const queryClient = useQueryClient();
  const [startingSimulation, setStartingSimulation] = useState(false);

  const simulationTypes = [
    {
      id: 'job_interview',
      title: t('aiSimulations.jobInterview.title'),
      description: t('aiSimulations.jobInterview.description'),
      duration: '15 ' + t('aiSimulations.duration.minutes'),
      difficulty: t('aiSimulations.difficulty.medium'),
      icon: Users,
      color: 'bg-blue-100 text-blue-600'
    },
    {
      id: 'salary_negotiation',
      title: 'Negociere Salarială',
      description: 'Practică negocierea salariului într-un mediu sigur',
      duration: '20 ' + t('aiSimulations.duration.minutes'),
      difficulty: t('aiSimulations.difficulty.medium'),
      icon: Briefcase,
      color: 'bg-green-100 text-green-600'
    },
    {
      id: 'team_conflict',
      title: 'Rezolvare Conflicte',
      description: 'Învață să gestionezi conflictele în echipă',
      duration: '15 ' + t('aiSimulations.duration.minutes'),
      difficulty: t('aiSimulations.difficulty.hard'),
      icon: Target,
      color: 'bg-orange-100 text-orange-600'
    },
    {
      id: 'management_promotion',
      title: 'Promovare în Management',
      description: 'Pregătește-te pentru un rol de leadership',
      duration: '25 ' + t('aiSimulations.duration.minutes'),
      difficulty: t('aiSimulations.difficulty.hard'),
      icon: Trophy,
      color: 'bg-purple-100 text-purple-600'
    }
  ];

  const { data: previousSimulations, isLoading } = useQuery({
    queryKey: ['ai-simulations', user?.id],
    queryFn: async () => {
      if (!user?.id) return [];
      
      const { data, error } = await supabase
        .from('ai_simulations')
        .select('*')
        .eq('user_id', user.id)
        .order('created_at', { ascending: false });

      if (error) throw error;
      return data;
    },
    enabled: !!user?.id
  });

  const startSimulation = useMutation({
    mutationFn: async (simulationType: string) => {
      if (!user?.id) throw new Error('User not authenticated');

      console.log('Starting simulation with type:', simulationType, 'and language:', language);

      const { data, error } = await supabase.functions.invoke('start-simulation', {
        body: { 
          simulationType,
          language
        }
      });

      if (error) {
        console.error('Supabase function error:', error);
        throw error;
      }

      console.log('Simulation started successfully:', data);
      return data;
    },
    onSuccess: (data) => {
      console.log('Simulation created, navigating to:', `/simulation/${data.id}`);
      queryClient.invalidateQueries({ queryKey: ['ai-simulations'] });
      navigate(`/simulation/${data.id}`);
    },
    onError: (error) => {
      console.error('Error starting simulation:', error);
      toast({
        title: t('common.error'),
        description: t('aiSimulations.messages.startError'),
        variant: "destructive"
      });
    }
  });

  const handleStartSimulation = async (simulationType: string) => {
    console.log('handleStartSimulation called with:', simulationType);
    setStartingSimulation(true);
    try {
      await startSimulation.mutateAsync(simulationType);
    } finally {
      setStartingSimulation(false);
    }
  };

  return (
    <div className="space-y-6">
      {/* Available Simulations */}
      <div>
        <h3 className="text-lg font-semibold mb-4">{t('aiSimulations.availableTitle')}</h3>
        <div className="grid gap-4 md:grid-cols-2 lg:grid-cols-3">
          {simulationTypes.map((simulation) => (
            <Card key={simulation.id} className="hover:shadow-md transition-shadow">
              <CardHeader>
                <div className="flex items-center space-x-3">
                  <div className={`p-2 rounded-lg ${simulation.color}`}>
                    <simulation.icon className="w-5 h-5" />
                  </div>
                  <div className="flex-1">
                    <CardTitle className="text-base">{simulation.title}</CardTitle>
                  </div>
                </div>
              </CardHeader>
              <CardContent>
                <CardDescription className="mb-4">{simulation.description}</CardDescription>
                
                <div className="flex items-center gap-4 mb-4 text-sm text-gray-600">
                  <div className="flex items-center gap-1">
                    <Clock className="w-4 h-4" />
                    <span>{simulation.duration}</span>
                  </div>
                  <Badge variant="outline">{simulation.difficulty}</Badge>
                </div>

                <Button 
                  onClick={() => handleStartSimulation(simulation.id)}
                  disabled={startingSimulation}
                  className="w-full"
                >
                  <PlayCircle className="w-4 h-4 mr-2" />
                  {startingSimulation ? t('aiSimulations.starting') : t('aiSimulations.startButton')}
                </Button>
              </CardContent>
            </Card>
          ))}
        </div>
      </div>

      {/* Previous Simulations */}
      {previousSimulations && previousSimulations.length > 0 && (
        <div>
          <h3 className="text-lg font-semibold mb-4">{t('aiSimulations.previousTitle')}</h3>
          <div className="space-y-3">
            {previousSimulations.slice(0, 5).map((simulation) => (
              <Card key={simulation.id}>
                <CardContent className="p-4">
                  <div className="flex items-center justify-between">
                    <div className="flex-1">
                      <h4 className="font-medium">{simulation.simulation_type}</h4>
                      <p className="text-sm text-gray-600">
                        {new Date(simulation.created_at).toLocaleDateString(language)}
                      </p>
                    </div>
                    <div className="flex items-center gap-3">
                      {simulation.overall_score && (
                        <Badge variant="secondary">
                          {t('aiSimulations.score')}: {simulation.overall_score}/100
                        </Badge>
                      )}
                      <Button 
                        variant="outline" 
                        size="sm"
                        onClick={() => navigate(`/simulation/${simulation.id}`)}
                      >
                        {t('aiSimulations.viewDetails')}
                      </Button>
                    </div>
                  </div>
                </CardContent>
              </Card>
            ))}
          </div>
        </div>
      )}

      {isLoading && (
        <div className="text-center py-8">
          <p className="text-gray-600">{t('common.loading')}</p>
        </div>
      )}
    </div>
  );
};

export default AISimulations;
