import React, { useState } from 'react';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Badge } from '@/components/ui/badge';
import { Textarea } from '@/components/ui/textarea';
import { useLanguage } from '@/hooks/useLanguage';
import { useAIPrograms } from '@/hooks/useAIPrograms';
import { useProgressTracking } from '@/hooks/useProgressTracking';
import { Calendar, Clock, CheckCircle, Play, ArrowRight } from 'lucide-react';
import { useToast } from '@/components/ui/use-toast';

const AIPrograms14Days = () => {
  const { t } = useLanguage();
  const { toast } = useToast();
  const { activeProgram, availablePrograms, startProgram, submitReflection, isLoading } = useAIPrograms();
  const { trackProgress } = useProgressTracking();
  const [reflection, setReflection] = useState('');

  const programTypes = [
    {
      id: 'motivation_reset',
      icon: '🎯',
      color: 'bg-blue-500'
    },
    {
      id: 'leadership_transition',
      icon: '👑',
      color: 'bg-purple-500'
    },
    {
      id: 'interview_training',
      icon: '💼',
      color: 'bg-green-500'
    },
    {
      id: 'career_clarity',
      icon: '🔍',
      color: 'bg-orange-500'
    }
  ];

  const handleStartProgram = async (programType: string) => {
    try {
      await startProgram(programType);
      toast({
        title: t('common.success'),
        description: t('premiumFeatures.aiPrograms.startProgram'),
      });
    } catch (error) {
      toast({
        title: t('common.error'),
        description: 'Error starting program',
        variant: 'destructive',
      });
    }
  };

  const handleSubmitReflection = async () => {
    if (!reflection.trim()) return;
    
    try {
      await submitReflection(reflection);
      setReflection('');
      
      // Track progress
      await trackProgress({
        steps_completed: 1,
        achievement_description: `Completed day ${activeProgram?.current_day} of ${activeProgram?.program_type} program`
      });
      
      toast({
        title: t('common.success'),
        description: t('premiumFeatures.aiPrograms.reflectionSubmitted'),
      });
    } catch (error) {
      toast({
        title: t('common.error'),
        description: 'Error submitting reflection',
        variant: 'destructive',
      });
    }
  };

  if (activeProgram) {
    const currentDay = activeProgram.current_day;
    const isCompleted = activeProgram.is_completed;
    const dailyTask = activeProgram.daily_tasks[currentDay - 1];

    return (
      <div className="space-y-6">
        <div className="flex items-center justify-between">
          <div>
            <h2 className="text-2xl font-bold text-foreground">
              {t(`premiumFeatures.aiPrograms.${activeProgram.program_type}`)}
            </h2>
            <p className="text-muted-foreground">
              Day {currentDay} of 14
            </p>
          </div>
          {isCompleted && (
            <Badge variant="secondary" className="bg-green-100 text-green-800">
              <CheckCircle className="w-4 h-4 mr-1" />
              {t('premiumFeatures.aiPrograms.completed')}
            </Badge>
          )}
        </div>

        {/* Progress Bar */}
        <Card>
          <CardContent className="p-4">
            <div className="flex items-center justify-between mb-2">
              <span className="text-sm font-medium">{t('premiumFeatures.aiPrograms.progress')}</span>
              <span className="text-sm text-muted-foreground">{Math.round((currentDay / 14) * 100)}%</span>
            </div>
            <div className="w-full bg-muted rounded-full h-2">
              <div 
                className="bg-primary h-2 rounded-full transition-all duration-300" 
                style={{ width: `${(currentDay / 14) * 100}%` }}
              ></div>
            </div>
            <div className="grid grid-cols-7 gap-1 mt-3">
              {Array.from({ length: 14 }, (_, i) => (
                <div
                  key={i}
                  className={`h-2 rounded-full ${
                    i < currentDay ? 'bg-primary' : i === currentDay ? 'bg-primary/50' : 'bg-muted'
                  }`}
                  title={`Day ${i + 1}`}
                />
              ))}
            </div>
          </CardContent>
        </Card>

        {!isCompleted && dailyTask && (
          <Card>
            <CardHeader>
              <CardTitle className="flex items-center gap-2">
                <Clock className="w-5 h-5" />
                {t('premiumFeatures.aiPrograms.dailyTask')}
              </CardTitle>
            </CardHeader>
            <CardContent className="space-y-4">
              <div className="p-4 bg-muted rounded-lg">
                <h3 className="font-medium mb-2">{dailyTask.title}</h3>
                <p className="text-foreground">{dailyTask.task}</p>
                {dailyTask.estimated_duration && (
                  <div className="flex items-center gap-1 mt-2 text-sm text-muted-foreground">
                    <Clock className="w-4 h-4" />
                    {dailyTask.estimated_duration}
                  </div>
                )}
              </div>
              
              <div>
                <h4 className="font-medium mb-2">{t('premiumFeatures.aiPrograms.reflection')}</h4>
                <p className="text-sm text-muted-foreground mb-3">{dailyTask.reflection_question}</p>
                <Textarea
                  value={reflection}
                  onChange={(e) => setReflection(e.target.value)}
                  placeholder={t('premiumFeatures.aiPrograms.reflectionPlaceholder')}
                  className="min-h-[100px]"
                />
                <Button 
                  onClick={handleSubmitReflection}
                  disabled={!reflection.trim() || isLoading}
                  className="mt-3"
                >
                  {isLoading ? t('premiumFeatures.aiPrograms.processing') : t('premiumFeatures.aiPrograms.submitReflection')}
                </Button>
              </div>
            </CardContent>
          </Card>
        )}

        {!isCompleted && !dailyTask && (
          <Card>
            <CardContent className="py-8 text-center">
              <div className="animate-spin rounded-full h-8 w-8 border-b-2 border-primary mx-auto mb-4"></div>
              <p className="text-muted-foreground">{t('premiumFeatures.aiPrograms.generatingTask')}</p>
            </CardContent>
          </Card>
        )}

        {currentDay === 7 && !activeProgram.intermediate_feedback && (
          <Card>
            <CardHeader>
              <CardTitle>{t('premiumFeatures.aiPrograms.intermediateEvaluation')}</CardTitle>
            </CardHeader>
            <CardContent>
              <p className="text-muted-foreground">
                {t('premiumFeatures.aiPrograms.feedback')}
              </p>
            </CardContent>
          </Card>
        )}

        {isCompleted && activeProgram.final_feedback && (
          <Card>
            <CardHeader>
              <CardTitle>{t('premiumFeatures.aiPrograms.finalEvaluation')}</CardTitle>
            </CardHeader>
            <CardContent className="space-y-4">
              <div>
                <h4 className="font-medium">{t('premiumFeatures.aiPrograms.feedback')}</h4>
                <p className="text-muted-foreground">{activeProgram.final_feedback}</p>
              </div>
              {activeProgram.final_score && (
                <div>
                  <h4 className="font-medium">{t('premiumFeatures.aiPrograms.score')}</h4>
                  <div className="text-2xl font-bold text-primary">{activeProgram.final_score}/100</div>
                </div>
              )}
            </CardContent>
          </Card>
        )}
      </div>
    );
  }

  return (
    <div className="space-y-6">
      <div>
        <h2 className="text-2xl font-bold text-foreground">{t('premiumFeatures.aiPrograms.title')}</h2>
        <p className="text-muted-foreground">{t('premiumFeatures.aiPrograms.subtitle')}</p>
      </div>

      <div>
        <h3 className="text-lg font-medium mb-4">{t('premiumFeatures.aiPrograms.selectProgram')}</h3>
        <div className="grid gap-4 md:grid-cols-2">
          {programTypes.map((program) => (
            <Card key={program.id} className="cursor-pointer hover:shadow-md transition-shadow">
              <CardHeader>
                <CardTitle className="flex items-center gap-3">
                  <div className={`w-10 h-10 rounded-full ${program.color} flex items-center justify-center text-white text-lg`}>
                    {program.icon}
                  </div>
                  {t(`premiumFeatures.aiPrograms.${program.id}`)}
                </CardTitle>
              </CardHeader>
              <CardContent className="space-y-4">
                <p className="text-sm text-muted-foreground">
                  {t(`premiumFeatures.aiPrograms.programDescription.${program.id}`)}
                </p>
                <div className="flex items-center gap-4 text-sm text-muted-foreground">
                  <div className="flex items-center gap-1">
                    <Calendar className="w-4 h-4" />
                    14 {t('dashboard.stats.days')}
                  </div>
                  <div className="flex items-center gap-1">
                    <Clock className="w-4 h-4" />
                    10 min/day
                  </div>
                </div>
                <Button 
                  onClick={() => handleStartProgram(program.id)}
                  disabled={isLoading}
                  className="w-full"
                >
                  <Play className="w-4 h-4 mr-2" />
                  {t('premiumFeatures.aiPrograms.startProgram')}
                </Button>
              </CardContent>
            </Card>
          ))}
        </div>
      </div>
    </div>
  );
};

export default AIPrograms14Days;