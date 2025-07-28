
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
  const { t } = useLanguage();
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

  if (!activeSimulation) {
    return (
      <div className="container mx-auto px-4 py-8">
        <Card>
          <CardContent className="pt-6">
            <div className="text-center">
              <p className="text-muted-foreground mb-4">
                Nu s-a găsit nicio simulare activă.
              </p>
              <Button onClick={() => navigate('/career-paths')}>
                <ArrowLeft className="w-4 h-4 mr-2" />
                Înapoi la Simulări
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
          Înapoi la Simulări
        </Button>
        
        <Card>
          <CardHeader>
            <CardTitle className="flex items-center justify-between">
              <span>Simulare: {activeSimulation.simulation_type}</span>
              <Badge variant="secondary">
                {activeSimulation.is_completed ? 'Completată' : 'În desfășurare'}
              </Badge>
            </CardTitle>
          </CardHeader>
        </Card>
      </div>

      <Card className="mb-4">
        <CardHeader>
          <CardTitle>Conversație</CardTitle>
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
                      {message.sender === 'user' ? 'Tu' : 'AI'}
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
                placeholder="Scrie răspunsul tău aici..."
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
                  Trimite Răspuns
                </Button>
              </div>
            </div>
          </CardContent>
        </Card>
      )}

      {activeSimulation.is_completed && activeSimulation.ai_feedback && (
        <Card className="mt-4">
          <CardHeader>
            <CardTitle>Feedback Final</CardTitle>
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
                    <div className="text-sm text-muted-foreground">Claritate</div>
                  </div>
                  <div className="text-center">
                    <div className="text-2xl font-bold text-green-600">
                      {activeSimulation.empathy_score || 0}
                    </div>
                    <div className="text-sm text-muted-foreground">Empatie</div>
                  </div>
                  <div className="text-center">
                    <div className="text-2xl font-bold text-orange-600">
                      {activeSimulation.conviction_score || 0}
                    </div>
                    <div className="text-sm text-muted-foreground">Convingere</div>
                  </div>
                  <div className="text-center">
                    <div className="text-2xl font-bold text-purple-600">
                      {activeSimulation.structure_score || 0}
                    </div>
                    <div className="text-sm text-muted-foreground">Structură</div>
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
