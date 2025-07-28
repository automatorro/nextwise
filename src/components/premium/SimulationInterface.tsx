
import React, { useState, useEffect, useRef } from 'react';
import { useParams, useNavigate } from 'react-router-dom';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Textarea } from '@/components/ui/textarea';
import { Badge } from '@/components/ui/badge';
import { useLanguage } from '@/hooks/useLanguage';
import { useAISimulations } from '@/hooks/useAISimulations';
import { Loader2, Send, ArrowLeft, User, Bot } from 'lucide-react';

const SimulationInterface = () => {
  const { simulationId } = useParams<{ simulationId: string }>();
  const navigate = useNavigate();
  const { language } = useLanguage();
  const { activeSimulation, sendResponse, isLoading, error } = useAISimulations();
  const [userInput, setUserInput] = useState('');
  const messagesEndRef = useRef<HTMLDivElement>(null);

  const scrollToBottom = () => {
    messagesEndRef.current?.scrollIntoView({ behavior: 'smooth' });
  };

  useEffect(() => {
    scrollToBottom();
  }, [activeSimulation?.conversation_log]);

  const handleSendResponse = async () => {
    if (!userInput.trim() || !activeSimulation || isLoading) return;

    try {
      await sendResponse(userInput.trim());
      setUserInput('');
    } catch (error) {
      console.error('Error sending response:', error);
    }
  };

  const handleKeyPress = (e: React.KeyboardEvent) => {
    if (e.key === 'Enter' && !e.shiftKey) {
      e.preventDefault();
      handleSendResponse();
    }
  };

  // Translation texts
  const texts = {
    ro: {
      simulation: 'Simulare',
      completed: 'Completată',
      inProgress: 'În desfășurare',
      backToSimulations: 'Înapoi la Simulări',
      conversation: 'Conversație',
      you: 'Tu',
      ai: 'AI',
      responseHere: 'Scrie răspunsul tău aici...',
      sendResponse: 'Trimite Răspuns',
      finalFeedback: 'Feedback Final',
      clarity: 'Claritate',
      empathy: 'Empatie',
      conviction: 'Convingere',
      structure: 'Structură',
      noActiveSimulation: 'Nu s-a găsit nicio simulare activă.'
    },
    en: {
      simulation: 'Simulation',
      completed: 'Completed',
      inProgress: 'In Progress',
      backToSimulations: 'Back to Simulations',
      conversation: 'Conversation',
      you: 'You',
      ai: 'AI',
      responseHere: 'Write your response here...',
      sendResponse: 'Send Response',
      finalFeedback: 'Final Feedback',
      clarity: 'Clarity',
      empathy: 'Empathy',
      conviction: 'Conviction',
      structure: 'Structure',
      noActiveSimulation: 'No active simulation found.'
    }
  };

  const t = texts[language];

  if (!activeSimulation) {
    return (
      <div className="container mx-auto px-4 py-8">
        <Card>
          <CardContent className="pt-6">
            <div className="text-center">
              <p className="text-muted-foreground mb-4">
                {t.noActiveSimulation}
              </p>
              <Button onClick={() => navigate('/career-paths')}>
                <ArrowLeft className="w-4 h-4 mr-2" />
                {t.backToSimulations}
              </Button>
            </div>
          </CardContent>
        </Card>
      </div>
    );
  }

  return (
    <div className="container mx-auto px-4 py-8 max-w-4xl">
      <div className="mb-4">
        <Button
          variant="ghost"
          onClick={() => navigate('/career-paths')}
          className="mb-4"
        >
          <ArrowLeft className="w-4 h-4 mr-2" />
          {t.backToSimulations}
        </Button>
        
        <Card>
          <CardHeader>
            <CardTitle className="flex items-center justify-between">
              <span>{t.simulation}: {activeSimulation.simulation_type}</span>
              <Badge variant="secondary">
                {activeSimulation.is_completed ? t.completed : t.inProgress}
              </Badge>
            </CardTitle>
          </CardHeader>
        </Card>
      </div>

      <Card className="mb-4">
        <CardHeader>
          <CardTitle>{t.conversation}</CardTitle>
        </CardHeader>
        <CardContent>
          <div className="space-y-4 max-h-96 overflow-y-auto">
            {activeSimulation.conversation_log?.map((message: any, index: number) => (
              <div
                key={index}
                className={`flex ${message.sender === 'user' ? 'justify-end' : 'justify-start'}`}
              >
                <div
                  className={`max-w-[80%] p-3 rounded-lg ${
                    message.sender === 'user'
                      ? 'bg-blue-500 text-white ml-4'
                      : 'bg-muted mr-4'
                  }`}
                >
                  <div className="flex items-center gap-2 mb-1">
                    {message.sender === 'user' ? (
                      <User className="w-4 h-4" />
                    ) : (
                      <Bot className="w-4 h-4" />
                    )}
                    <span className="text-sm font-medium">
                      {message.sender === 'user' ? t.you : t.ai}
                    </span>
                  </div>
                  <p className="text-sm whitespace-pre-wrap">{message.content}</p>
                </div>
              </div>
            ))}
            <div ref={messagesEndRef} />
          </div>
        </CardContent>
      </Card>

      {!activeSimulation.is_completed && (
        <Card>
          <CardContent className="pt-6">
            <div className="space-y-4">
              <Textarea
                value={userInput}
                onChange={(e) => setUserInput(e.target.value)}
                onKeyPress={handleKeyPress}
                placeholder={t.responseHere}
                className="min-h-[100px]"
                disabled={isLoading}
              />
              <div className="flex justify-end">
                <Button
                  onClick={handleSendResponse}
                  disabled={!userInput.trim() || isLoading}
                >
                  {isLoading ? (
                    <Loader2 className="w-4 h-4 animate-spin mr-2" />
                  ) : (
                    <Send className="w-4 h-4 mr-2" />
                  )}
                  {t.sendResponse}
                </Button>
              </div>
            </div>
          </CardContent>
        </Card>
      )}

      {activeSimulation.is_completed && activeSimulation.ai_feedback && (
        <Card className="mt-4">
          <CardHeader>
            <CardTitle>{t.finalFeedback}</CardTitle>
          </CardHeader>
          <CardContent>
            <div className="space-y-4">
              <p className="text-sm">{activeSimulation.ai_feedback}</p>
              
              {activeSimulation.overall_score && (
                <div className="grid grid-cols-2 md:grid-cols-4 gap-4 mt-4">
                  <div className="text-center">
                    <div className="text-2xl font-bold text-blue-600">
                      {activeSimulation.clarity_score || 0}
                    </div>
                    <div className="text-sm text-muted-foreground">{t.clarity}</div>
                  </div>
                  <div className="text-center">
                    <div className="text-2xl font-bold text-green-600">
                      {activeSimulation.empathy_score || 0}
                    </div>
                    <div className="text-sm text-muted-foreground">{t.empathy}</div>
                  </div>
                  <div className="text-center">
                    <div className="text-2xl font-bold text-orange-600">
                      {activeSimulation.conviction_score || 0}
                    </div>
                    <div className="text-sm text-muted-foreground">{t.conviction}</div>
                  </div>
                  <div className="text-center">
                    <div className="text-2xl font-bold text-purple-600">
                      {activeSimulation.structure_score || 0}
                    </div>
                    <div className="text-sm text-muted-foreground">{t.structure}</div>
                  </div>
                </div>
              )}
            </div>
          </CardContent>
        </Card>
      )}

      {error && (
        <Card className="mt-4 border-red-200 bg-red-50">
          <CardContent className="pt-6">
            <p className="text-red-600 text-sm">{error}</p>
          </CardContent>
        </Card>
      )}
    </div>
  );
};

export default SimulationInterface;
