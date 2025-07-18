
import React, { useState, useRef, useEffect } from 'react';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Textarea } from '@/components/ui/textarea';
import { Badge } from '@/components/ui/badge';
import { useLanguage } from '@/hooks/useLanguage';
import { useAISimulations } from '@/hooks/useAISimulations';
import { useProgressTracking } from '@/hooks/useProgressTracking';
import { MessageSquare, User, Bot, BarChart3, Play, Send, Target } from 'lucide-react';
import { useToast } from '@/components/ui/use-toast';

const AISimulations = () => {
  const { t } = useLanguage();
  const { toast } = useToast();
  const { activeSimulation, startSimulation, sendResponse, isLoading } = useAISimulations();
  const { trackProgress } = useProgressTracking();
  const [userResponse, setUserResponse] = useState('');
  const messagesEndRef = useRef<HTMLDivElement>(null);

  const simulationTypes = [
    {
      id: 'job_interview',
      icon: '💼',
      color: 'bg-blue-500',
      title: 'Interviu de Angajare',
      description: 'Exersează răspunsurile la întrebări comune de interviu și îmbunătățește-ți prezentarea',
      role: 'Intervievator'
    },
    {
      id: 'management_promotion',
      icon: '📈',
      color: 'bg-purple-500',
      title: 'Promovare în Management',
      description: 'Pregătește-te pentru roluri de leadership și discuții despre responsabilități manageriale',
      role: 'Manager Senior'
    },
    {
      id: 'team_conflict',
      icon: '⚖️',
      color: 'bg-orange-500',
      title: 'Conflict în Echipă',
      description: 'Învață să gestionezi conflictele interpersonale și să comunici eficient în situații tensionate',
      role: 'Coleg de Echipă'
    },
    {
      id: 'salary_negotiation',
      icon: '💰',
      color: 'bg-green-500',
      title: 'Negociere Salariu',
      description: 'Exersează tehnicile de negociere și argumentarea pentru măriri salariale',
      role: 'Manager HR'
    }
  ];

  const scrollToBottom = () => {
    messagesEndRef.current?.scrollIntoView({ behavior: "smooth" });
  };

  useEffect(() => {
    scrollToBottom();
  }, [activeSimulation?.conversation_log]);

  const handleStartSimulation = async (simulationType: string) => {
    try {
      await startSimulation(simulationType);
      toast({
        title: t('common.success'),
        description: 'Simularea a început cu succes!',
      });
    } catch (error) {
      console.error('Error starting simulation:', error);
      toast({
        title: t('common.error'),
        description: 'Eroare la pornirea simulării',
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
        achievement_description: `Participated in ${activeSimulation?.simulation_type} simulation`
      });
      
      toast({
        title: t('common.success'),
        description: 'Răspunsul a fost trimis!',
      });
    } catch (error) {
      console.error('Error sending response:', error);
      toast({
        title: t('common.error'),
        description: 'Eroare la trimiterea răspunsului',
        variant: 'destructive',
      });
    }
  };

  const getSimulationConfig = (type: string) => {
    return simulationTypes.find(sim => sim.id === type);
  };

  if (isLoading && !activeSimulation) {
    return (
      <div className="flex items-center justify-center min-h-[400px]">
        <div className="animate-spin rounded-full h-8 w-8 border-b-2 border-primary"></div>
      </div>
    );
  }

  if (activeSimulation) {
    const config = getSimulationConfig(activeSimulation.simulation_type);
    const isCompleted = activeSimulation.is_completed;

    return (
      <div className="space-y-6">
        <div className="flex items-center justify-between">
          <div>
            <h2 className="text-2xl font-bold text-foreground flex items-center gap-3">
              <span className="text-3xl">{config?.icon}</span>
              {config?.title}
            </h2>
            <p className="text-muted-foreground flex items-center gap-2">
              <Target className="w-4 h-4" />
              Rol AI: {config?.role}
            </p>
          </div>
          {isCompleted && (
            <Badge variant="secondary" className="bg-green-100 text-green-800">
              Finalizat
            </Badge>
          )}
        </div>

        <Card>
          <CardHeader>
            <CardTitle className="flex items-center gap-2">
              <MessageSquare className="w-5 h-5" />
              Conversația de Simulare
            </CardTitle>
          </CardHeader>
          <CardContent>
            <div className="space-y-4 max-h-96 overflow-y-auto bg-muted/20 p-4 rounded-lg">
              {activeSimulation.conversation_log && activeSimulation.conversation_log.length > 0 ? (
                activeSimulation.conversation_log.map((message: any, index: number) => (
                  <div 
                    key={index}
                    className={`flex gap-3 ${message.sender === 'user' ? 'justify-end' : 'justify-start'}`}
                  >
                    <div className={`flex gap-3 max-w-[85%] ${message.sender === 'user' ? 'flex-row-reverse' : ''}`}>
                      <div className={`w-8 h-8 rounded-full flex items-center justify-center flex-shrink-0 ${
                        message.sender === 'user' ? 'bg-primary text-primary-foreground' : 'bg-blue-500 text-white'
                      }`}>
                        {message.sender === 'user' ? <User className="w-4 h-4" /> : <Bot className="w-4 h-4" />}
                      </div>
                      <div className={`p-4 rounded-lg ${
                        message.sender === 'user' 
                          ? 'bg-primary text-primary-foreground' 
                          : 'bg-white border shadow-sm'
                      }`}>
                        <p className="text-sm leading-relaxed">{message.content}</p>
                        <p className="text-xs opacity-70 mt-2">
                          {message.timestamp ? new Date(message.timestamp).toLocaleTimeString('ro-RO', {
                            hour: '2-digit',
                            minute: '2-digit'
                          }) : ''}
                        </p>
                      </div>
                    </div>
                  </div>
                ))
              ) : (
                <div className="text-center py-8">
                  <Bot className="w-12 h-12 mx-auto text-muted-foreground mb-4" />
                  <p className="text-muted-foreground">Simularea se încarcă...</p>
                </div>
              )}
              <div ref={messagesEndRef} />
            </div>

            {!isCompleted && (
              <div className="mt-4 space-y-3">
                <Textarea
                  value={userResponse}
                  onChange={(e) => setUserResponse(e.target.value)}
                  placeholder="Scrie răspunsul tău aici..."
                  className="min-h-[100px]"
                  onKeyDown={(e) => {
                    if (e.key === 'Enter' && !e.shiftKey) {
                      e.preventDefault();
                      handleSendResponse();
                    }
                  }}
                />
                <Button 
                  onClick={handleSendResponse}
                  disabled={!userResponse.trim() || isLoading}
                  className="w-full"
                >
                  <Send className="w-4 h-4 mr-2" />
                  {isLoading ? 'Se trimite...' : 'Trimite Răspunsul'}
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
                Feedback și Evaluare
              </CardTitle>
            </CardHeader>
            <CardContent className="space-y-6">
              <div className="p-4 bg-blue-50 rounded-lg border border-blue-200">
                <h4 className="font-medium mb-2 text-blue-900">Feedback-ul AI</h4>
                <p className="text-blue-800">{activeSimulation.ai_feedback}</p>
              </div>

              <div>
                <h4 className="font-medium mb-4">Scorurile Tale</h4>
                <div className="grid grid-cols-2 md:grid-cols-4 gap-4 mb-4">
                  {[
                    { key: 'clarity', label: 'Claritate', score: activeSimulation.clarity_score },
                    { key: 'empathy', label: 'Empatie', score: activeSimulation.empathy_score },
                    { key: 'conviction', label: 'Convingere', score: activeSimulation.conviction_score },
                    { key: 'structure', label: 'Structură', score: activeSimulation.structure_score },
                  ].map(({ key, label, score }) => (
                    <div key={key} className="text-center p-3 bg-muted rounded-lg">
                      <div className="text-2xl font-bold text-primary">{score || 0}/10</div>
                      <div className="text-sm text-muted-foreground">{label}</div>
                    </div>
                  ))}
                </div>
                
                <div className="text-center p-4 bg-primary/10 rounded-lg">
                  <div className="text-3xl font-bold text-primary">{activeSimulation.overall_score || 0}/100</div>
                  <div className="text-sm text-muted-foreground">Scor General</div>
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
        <h2 className="text-2xl font-bold text-foreground">Simulări AI Interactive</h2>
        <p className="text-muted-foreground">
          Exersează situații profesionale reale cu AI și primește feedback personalizat
        </p>
      </div>

      <div className="grid gap-6 md:grid-cols-2">
        {simulationTypes.map((simulation) => (
          <Card key={simulation.id} className="cursor-pointer hover:shadow-lg transition-all duration-200">
            <CardHeader>
              <CardTitle className="flex items-center gap-3">
                <div className={`w-12 h-12 rounded-full ${simulation.color} flex items-center justify-center text-white text-xl`}>
                  {simulation.icon}
                </div>
                {simulation.title}
              </CardTitle>
            </CardHeader>
            <CardContent className="space-y-4">
              <p className="text-sm text-muted-foreground leading-relaxed">
                {simulation.description}
              </p>
              <div className="flex items-center gap-2 text-sm text-muted-foreground">
                <Bot className="w-4 h-4" />
                Rol AI: {simulation.role}
              </div>
              <Button 
                onClick={() => handleStartSimulation(simulation.id)}
                disabled={isLoading}
                className="w-full"
              >
                <Play className="w-4 h-4 mr-2" />
                Începe Simularea
              </Button>
            </CardContent>
          </Card>
        ))}
      </div>
    </div>
  );
};

export default AISimulations;
