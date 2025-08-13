import React, { useState } from 'react';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Badge } from '@/components/ui/badge';
import { Textarea } from '@/components/ui/textarea';
import { useLanguage } from '@/hooks/useLanguage';
import { useAIPrograms } from '@/hooks/useAIPrograms';
import { useProgressTracking } from '@/hooks/useProgressTracking';
import { Calendar, Clock, CheckCircle, Play, Target, BookOpen, ArrowLeft, Zap, Crown, Mic, Compass, Loader2 } from 'lucide-react';
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
      icon: Zap,
      gradient: 'from-blue-500 to-cyan-500',
      bgClass: 'bg-gradient-to-br from-blue-50 to-cyan-50 dark:from-blue-950/20 dark:to-cyan-950/20',
      iconColor: 'text-blue-600 dark:text-blue-400',
      badgeColor: 'bg-blue-100 text-blue-800 dark:bg-blue-900/30 dark:text-blue-300',
      borderColor: 'border-blue-200 dark:border-blue-800',
      title: 'Resetare Motivație',
      description: 'Program de 14 zile pentru redescoperirea motivației și entuziasmului în carieră',
      features: ['Self-assessment energie', 'Redefinirea obiectivelor', 'Obiceiuri energizante', 'Plan de menținere'],
      phase: {
        1: 'Identificarea blocajelor motivaționale',
        2: 'Redefinirea obiectivelor personale', 
        3: 'Implementarea rutinelor energizante',
        4: 'Consolidarea obiceiurilor noi'
      }
    },
    {
      id: 'leadership_transition',
      icon: Crown,
      gradient: 'from-purple-500 to-pink-500',
      bgClass: 'bg-gradient-to-br from-purple-50 to-pink-50 dark:from-purple-950/20 dark:to-pink-950/20',
      iconColor: 'text-purple-600 dark:text-purple-400',
      badgeColor: 'bg-purple-100 text-purple-800 dark:bg-purple-900/30 dark:text-purple-300',
      borderColor: 'border-purple-200 dark:border-purple-800',
      title: 'Tranziție în Leadership',
      description: 'Dezvoltă abilitățile de leadership și pregătește-te pentru roluri de conducere',
      features: ['Stiluri de leadership', 'Comunicare în echipă', 'Delegare eficientă', 'Luarea deciziilor'],
      phase: {
        1: 'Evaluarea stilului de leadership actual',
        2: 'Practicarea abilităților de comunicare',
        3: 'Managementul conflictelor și decizii',
        4: 'Crearea viziunii de echipă'
      }
    },
    {
      id: 'interview_training',
      icon: Mic,
      gradient: 'from-green-500 to-emerald-500',
      bgClass: 'bg-gradient-to-br from-green-50 to-emerald-50 dark:from-green-950/20 dark:to-emerald-950/20',
      iconColor: 'text-green-600 dark:text-green-400',
      badgeColor: 'bg-green-100 text-green-800 dark:bg-green-900/30 dark:text-green-300',
      borderColor: 'border-green-200 dark:border-green-800',
      title: 'Pregătire Interviuri',
      description: 'Antrenament intensiv pentru interviul perfect și comunicare eficientă',
      features: ['Analiza profilului', 'Storytelling eficient', 'Simulări de interviuri', 'Gestionarea stresului'],
      phase: {
        1: 'Analiza profilului profesional',
        2: 'Practicarea răspunsurilor comune',
        3: 'Simularea interviurilor reale',
        4: 'Pregătirea pentru tipuri diferite'
      }
    },
    {
      id: 'career_clarity',
      icon: Compass,
      gradient: 'from-orange-500 to-red-500',
      bgClass: 'bg-gradient-to-br from-orange-50 to-red-50 dark:from-orange-950/20 dark:to-red-950/20',
      iconColor: 'text-orange-600 dark:text-orange-400',
      badgeColor: 'bg-orange-100 text-orange-800 dark:bg-orange-900/30 dark:text-orange-300',
      borderColor: 'border-orange-200 dark:border-orange-800',
      title: 'Claritate în Carieră',
      description: 'Descoperă-ți pasiunea și direcția clară pentru dezvoltarea carierei',
      features: ['Autodescoperire', 'Explorarea opțiunilor', 'Obiective pe termen lung', 'Plan de acțiune'],
      phase: {
        1: 'Autodescoperirea valorilor și aptitudinilor',
        2: 'Explorarea opțiunilor de carieră',
        3: 'Definirea obiectivelor clare',
        4: 'Crearea planului de acțiune'
      }
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
    const IconComponent = programConfig?.icon || Target;
    
    const getPhaseDescription = (day: number) => {
      if (day <= 3) return programConfig?.phase[1] || 'Faza de introducere';
      if (day <= 7) return programConfig?.phase[2] || 'Faza de dezvoltare';
      if (day <= 10) return programConfig?.phase[3] || 'Faza de consolidare';
      return programConfig?.phase[4] || 'Faza finală';
    };

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

        <div className={`${programConfig?.bgClass || 'bg-gradient-to-r from-blue-50 to-purple-50 dark:from-blue-950/20 dark:to-purple-950/20'} p-6 rounded-xl border ${programConfig?.borderColor || 'border-blue-200'}`}>
          <div className="flex items-center justify-between mb-4">
            <div className="flex items-center space-x-3">
              <div className={`p-3 rounded-xl bg-gradient-to-br ${programConfig?.gradient || 'from-blue-500 to-purple-500'} shadow-lg`}>
                <IconComponent className="h-6 w-6 text-white" />
              </div>
              <div>
                <h2 className="text-xl font-semibold">{programConfig?.title || activeProgram.program_type}</h2>
                <p className="text-sm text-muted-foreground">
                  {getPhaseDescription(currentDay)}
                </p>
              </div>
            </div>
            <Badge className={programConfig?.badgeColor || 'bg-blue-100 text-blue-800'}>
              Ziua {currentDay}/14
            </Badge>
          </div>
          
          <div className="w-full bg-secondary rounded-full h-3 mb-2">
            <div 
              className={`h-3 rounded-full transition-all duration-300 bg-gradient-to-r ${programConfig?.gradient || 'from-blue-500 to-purple-500'}`}
              style={{ width: `${(currentDay / 14) * 100}%` }}
            />
          </div>
          <p className="text-sm text-muted-foreground">
            {Math.round((currentDay / 14) * 100)}% completat
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
              <div className={`p-4 ${programConfig?.bgClass || 'bg-blue-50'} rounded-lg border ${programConfig?.borderColor || 'border-blue-200'}`}>
                <h3 className={`font-medium mb-2 ${programConfig?.iconColor || 'text-blue-900'}`}>{dailyTask.title}</h3>
                <p className={`${programConfig?.iconColor || 'text-blue-800'} leading-relaxed`}>{dailyTask.task}</p>
                {dailyTask.estimated_duration && (
                  <div className={`flex items-center gap-1 mt-3 text-sm ${programConfig?.iconColor || 'text-blue-600'}`}>
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
        {programTypes.map((program) => {
          const IconComponent = program.icon;
          return (
            <Card key={program.id} className={`${program.bgClass} hover:shadow-lg transition-all duration-300 border-0 cursor-pointer group`}>
              <CardHeader>
                <CardTitle className="flex items-center gap-3">
                  <div className={`p-3 rounded-xl bg-gradient-to-br ${program.gradient} shadow-lg group-hover:scale-110 transition-transform duration-300`}>
                    <IconComponent className="h-6 w-6 text-white" />
                  </div>
                  <div>
                    <h3 className="font-semibold">{program.title}</h3>
                    <Badge className={`${program.badgeColor} mt-1`}>Premium</Badge>
                  </div>
                </CardTitle>
              </CardHeader>
              <CardContent className="space-y-4">
                <p className="text-sm text-muted-foreground leading-relaxed">
                  {program.description}
                </p>
                
                <div className="space-y-2">
                  <h4 className="text-sm font-medium text-muted-foreground">Ce vei dezvolta:</h4>
                  <ul className="space-y-1">
                    {program.features.map((feature, index) => (
                      <li key={index} className="text-sm flex items-center">
                        <CheckCircle className={`h-3 w-3 mr-2 ${program.iconColor}`} />
                        {feature}
                      </li>
                    ))}
                  </ul>
                </div>

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
                  className={`w-full bg-gradient-to-r ${program.gradient} hover:shadow-lg transition-all duration-300`}
                >
                  {isLoading ? (
                    <>
                      <Loader2 className="w-4 h-4 mr-2 animate-spin" />
                      Se inițializează...
                    </>
                  ) : (
                    <>
                      <Play className="w-4 h-4 mr-2" />
                      Începe Programul
                    </>
                  )}
                </Button>
              </CardContent>
            </Card>
          );
        })}
      </div>
    </div>
  );
};

export default AIPrograms14Days;
