import React, { useState } from 'react';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Badge } from '@/components/ui/badge';
import { Textarea } from '@/components/ui/textarea';
import { useLanguage } from '@/hooks/useLanguage';
import { useAIPrograms } from '@/hooks/useAIPrograms';
import { useProgressTracking } from '@/hooks/useProgressTracking';
import { Calendar, Clock, CheckCircle, Play, Target, BookOpen, ArrowLeft } from 'lucide-react';
import { useToast } from '@/components/ui/use-toast';

const AIPrograms14Days = () => {
  const { t } = useLanguage();
  const { toast } = useToast();
  const { activeProgram, startProgram, submitReflection, isLoading } = useAIPrograms();
  const { trackProgress } = useProgressTracking();
  const [reflection, setReflection] = useState('');
  const [showProgramList, setShowProgramList] = useState(!activeProgram);

  const programTypes = [
    {
      id: 'motivation_reset',
      icon: '🎯',
      color: 'bg-blue-500',
      title: 'Resetare Motivație',
      description: 'Program de 14 zile pentru redescoperirea motivației și entuziasmului în carieră'
    },
    {
      id: 'leadership_transition',
      icon: '👑',
      color: 'bg-purple-500',
      title: 'Tranziție în Leadership',
      description: 'Dezvoltă abilitățile de leadership și pregătește-te pentru roluri de conducere'
    },
    {
      id: 'interview_training',
      icon: '💼',
      color: 'bg-green-500',
      title: 'Pregătire Interviuri',
      description: 'Antrenament intensiv pentru interviul perfect și comunicare eficientă'
    },
    {
      id: 'career_clarity',
      icon: '🔍',
      color: 'bg-orange-500',
      title: 'Claritate în Carieră',
      description: 'Descoperă-ți pasiunea și direcția clară pentru dezvoltarea carierei'
    }
  ];

  const handleStartProgram = async (programType: string) => {
    try {
      await startProgram(programType);
      setShowProgramList(false);
      toast({
        title: t('common.success'),
        description: 'Programul a fost pornit cu succes!',
      });
    } catch (error) {
      console.error('Error starting program:', error);
      toast({
        title: t('common.error'),
        description: 'Eroare la pornirea programului',
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
        description: 'Reflecția a fost trimisă cu succes!',
      });
    } catch (error) {
      console.error('Error submitting reflection:', error);
      toast({
        title: t('common.error'),
        description: 'Eroare la trimiterea reflecției',
        variant: 'destructive',
      });
    }
  };

  const handleBackToPrograms = () => {
    setShowProgramList(true);
  };

  if (isLoading && !activeProgram) {
    return (
      <div className="flex items-center justify-center min-h-[400px]">
        <div className="animate-spin rounded-full h-8 w-8 border-b-2 border-primary"></div>
      </div>
    );
  }

  if (activeProgram && !showProgramList) {
    const currentDay = activeProgram.current_day;
    const isCompleted = activeProgram.is_completed;
    const dailyTask = activeProgram.daily_tasks[currentDay - 1];
    const programConfig = programTypes.find(p => p.id === activeProgram.program_type);

    return (
      <div className="space-y-6">
        <div className="flex items-center justify-between">
          <div className="flex items-center gap-4">
            <Button
              variant="ghost"
              size="sm"
              onClick={handleBackToPrograms}
              className="flex items-center gap-2"
            >
              <ArrowLeft className="w-4 h-4" />
              Înapoi la Programe
            </Button>
          </div>
          {isCompleted && (
            <Badge variant="secondary" className="bg-green-100 text-green-800">
              <CheckCircle className="w-4 h-4 mr-1" />
              Program Finalizat
            </Badge>
          )}
        </div>

        <div>
          <h2 className="text-2xl font-bold text-foreground flex items-center gap-3">
            <span className="text-3xl">{programConfig?.icon}</span>
            {programConfig?.title || activeProgram.program_type}
          </h2>
          <p className="text-muted-foreground">
            Ziua {currentDay} din 14
          </p>
        </div>

        {/* Improved Progress Section */}
        <Card>
          <CardContent className="p-6">
            <div className="flex items-center justify-between mb-4">
              <h3 className="font-semibold text-lg">Progresul tău în program</h3>
              <span className="text-sm text-muted-foreground">{Math.round((currentDay / 14) * 100)}% completat</span>
            </div>
            
            {/* Main progress bar */}
            <div className="w-full bg-muted rounded-full h-4 mb-6">
              <div 
                className="bg-primary h-4 rounded-full transition-all duration-300 flex items-center justify-end pr-2" 
                style={{ width: `${(currentDay / 14) * 100}%` }}
              >
                {currentDay > 0 && (
                  <span className="text-xs text-white font-medium">Ziua {currentDay}</span>
                )}
              </div>
            </div>

            {/* Days visualization */}
            <div className="space-y-3">
              <h4 className="text-sm font-medium text-muted-foreground">Zilele programului:</h4>
              <div className="grid grid-cols-7 gap-2">
                {Array.from({ length: 14 }, (_, i) => {
                  const dayNumber = i + 1;
                  const isCurrentDay = dayNumber === currentDay;
                  const isCompleted = dayNumber < currentDay;
                  const isFuture = dayNumber > currentDay;
                  
                  return (
                    <div
                      key={i}
                      className={`
                        h-8 w-8 rounded-full flex items-center justify-center text-xs font-medium border-2 transition-all
                        ${isCurrentDay 
                          ? 'bg-primary text-white border-primary shadow-lg scale-110' 
                          : isCompleted 
                          ? 'bg-green-100 text-green-700 border-green-300' 
                          : 'bg-muted text-muted-foreground border-muted'
                        }
                      `}
                      title={`Ziua ${dayNumber}${isCurrentDay ? ' (astăzi)' : isCompleted ? ' (completată)' : ' (viitoare)'}`}
                    >
                      {isCompleted ? '✓' : dayNumber}
                    </div>
                  );
                })}
              </div>
              <div className="flex items-center gap-4 text-xs text-muted-foreground">
                <div className="flex items-center gap-1">
                  <div className="w-3 h-3 bg-green-100 border border-green-300 rounded-full"></div>
                  <span>Completate</span>
                </div>
                <div className="flex items-center gap-1">
                  <div className="w-3 h-3 bg-primary rounded-full"></div>
                  <span>Astăzi</span>
                </div>
                <div className="flex items-center gap-1">
                  <div className="w-3 h-3 bg-muted border border-muted rounded-full"></div>
                  <span>Viitoare</span>
                </div>
              </div>
            </div>
          </CardContent>
        </Card>

        {!isCompleted && dailyTask && (
          <Card>
            <CardHeader>
              <CardTitle className="flex items-center gap-2">
                <Target className="w-5 h-5" />
                Sarcina Zilei {currentDay}
              </CardTitle>
            </CardHeader>
            <CardContent className="space-y-4">
              <div className="p-4 bg-blue-50 rounded-lg border border-blue-200">
                <h3 className="font-medium mb-2 text-blue-900">{dailyTask.title}</h3>
                <p className="text-blue-800 leading-relaxed">{dailyTask.task}</p>
                {dailyTask.estimated_duration && (
                  <div className="flex items-center gap-1 mt-3 text-sm text-blue-600">
                    <Clock className="w-4 h-4" />
                    Timp estimat: {dailyTask.estimated_duration}
                  </div>
                )}
              </div>
              
              <div className="space-y-3">
                <div className="flex items-center gap-2">
                  <BookOpen className="w-4 h-4 text-primary" />
                  <h4 className="font-medium">Reflecția ta</h4>
                </div>
                <p className="text-sm text-muted-foreground">{dailyTask.reflection_question}</p>
                <Textarea
                  id="reflection"
                  name="reflection"
                  value={reflection}
                  onChange={(e) => setReflection(e.target.value)}
                  placeholder="Scrie aici reflecția ta despre sarcina de astăzi..."
                  className="min-h-[120px]"
                />
                <Button 
                  onClick={handleSubmitReflection}
                  disabled={!reflection.trim() || isLoading}
                  className="w-full"
                >
                  {isLoading ? 'Se procesează...' : 'Trimite Reflecția'}
                </Button>
              </div>
            </CardContent>
          </Card>
        )}

        {isCompleted && activeProgram.final_feedback && (
          <Card>
            <CardHeader>
              <CardTitle className="flex items-center gap-2 text-green-700">
                <CheckCircle className="w-5 h-5" />
                Evaluare Finală
              </CardTitle>
            </CardHeader>
            <CardContent className="space-y-4">
              <div className="p-4 bg-green-50 rounded-lg border border-green-200">
                <h4 className="font-medium text-green-900 mb-2">Feedback-ul tău</h4>
                <p className="text-green-800">{activeProgram.final_feedback}</p>
              </div>
              {activeProgram.final_score && (
                <div className="text-center p-4 bg-primary/10 rounded-lg">
                  <div className="text-3xl font-bold text-primary mb-1">{activeProgram.final_score}/100</div>
                  <div className="text-sm text-muted-foreground">Scor Final</div>
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
        <h2 className="text-2xl font-bold text-foreground">Programe AI de 14 Zile</h2>
        <p className="text-muted-foreground">
          Alege un program structurat pentru dezvoltarea ta profesională cu ghidaj AI personalizat zilnic
        </p>
      </div>

      <div className="grid gap-6 md:grid-cols-2">
        {programTypes.map((program) => (
          <Card key={program.id} className="cursor-pointer hover:shadow-lg transition-all duration-200">
            <CardHeader>
              <CardTitle className="flex items-center gap-3">
                <div className={`w-12 h-12 rounded-full ${program.color} flex items-center justify-center text-white text-xl`}>
                  {program.icon}
                </div>
                {program.title}
              </CardTitle>
            </CardHeader>
            <CardContent className="space-y-4">
              <p className="text-sm text-muted-foreground leading-relaxed">
                {program.description}
              </p>
              <div className="flex items-center gap-4 text-sm text-muted-foreground">
                <div className="flex items-center gap-1">
                  <Calendar className="w-4 h-4" />
                  14 zile
                </div>
                <div className="flex items-center gap-1">
                  <Clock className="w-4 h-4" />
                  15-30 min/zi
                </div>
              </div>
              <Button 
                onClick={() => handleStartProgram(program.id)}
                disabled={isLoading}
                className="w-full"
              >
                <Play className="w-4 h-4 mr-2" />
                Începe Programul
              </Button>
            </CardContent>
          </Card>
        ))}
      </div>
    </div>
  );
};

export default AIPrograms14Days;
