
import React, { useState } from 'react';
import { Button } from '@/components/ui/button';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { Input } from '@/components/ui/input';
import { Badge } from '@/components/ui/badge';
import { ScrollArea } from '@/components/ui/scroll-area';
import { Separator } from '@/components/ui/separator';
import { 
  Brain, 
  Send, 
  User, 
  Bot, 
  Clock, 
  Crown,
  MessageCircle,
  ArrowRight
} from 'lucide-react';
import { useAIChat } from '@/hooks/useAIChat';
import { useSessionId } from '@/hooks/useSessionId';

const AIMentoringWithLimits = () => {
  const sessionId = useSessionId();
  const {
    messages,
    isLoadingHistory,
    isLoading,
    sendMessage,
    messageCount,
    canSendMessage,
    hasPremiumAccess,
    remainingMessages
  } = useAIChat(sessionId);
  
  const [input, setInput] = useState('');

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (!input.trim() || !canSendMessage) return;
    
    sendMessage(input);
    setInput('');
  };

  const formatTime = (dateString: string) => {
    return new Date(dateString).toLocaleTimeString('ro-RO', {
      hour: '2-digit',
      minute: '2-digit'
    });
  };

  if (isLoadingHistory) {
    return (
      <Card>
        <CardContent className="flex items-center justify-center py-12">
          <div className="text-center">
            <Brain className="w-8 h-8 animate-pulse mx-auto mb-2 text-blue-600" />
            <p>Se încarcă mentoring-ul AI...</p>
          </div>
        </CardContent>
      </Card>
    );
  }

  const predefinedQuestions = [
    "Care sunt următorii pași în cariera mea?",
    "Cum pot îmbunătăți competențele de leadership?",
    "Ce certificări îmi recomanzi pentru rolul meu?",
    "Cum pot face tranziția către management?"
  ];

  return (
    <div className="space-y-6">
      {/* Header with Premium Status */}
      <Card>
        <CardHeader>
          <div className="flex items-center justify-between">
            <div className="flex items-center space-x-3">
              <div className="p-2 bg-gradient-to-r from-blue-100 to-indigo-100 rounded-lg">
                <Brain className="w-6 h-6 text-blue-600" />
              </div>
              <div>
                <CardTitle className="flex items-center space-x-2">
                  <span>Mentoring AI</span>
                  {hasPremiumAccess && (
                    <Badge className="bg-gradient-to-r from-yellow-400 to-orange-500">
                      <Crown className="w-3 h-3 mr-1" />
                      Premium
                    </Badge>
                  )}
                </CardTitle>
                <CardDescription>
                  Consilier personal AI pentru dezvoltarea carierei tale
                </CardDescription>
              </div>
            </div>
            {!hasPremiumAccess && (
              <div className="text-right">
                <div className="text-sm text-gray-600">
                  {remainingMessages} mesaje rămase
                </div>
                <Button variant="outline" size="sm" className="mt-1">
                  <Crown className="w-4 h-4 mr-2" />
                  Upgrade Premium
                </Button>
              </div>
            )}
          </div>
        </CardHeader>
      </Card>

      <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
        {/* Chat Messages */}
        <div className="lg:col-span-2">
          <Card className="h-[500px] flex flex-col">
            <CardHeader className="pb-3">
              <div className="flex items-center justify-between">
                <div className="flex items-center space-x-2">
                  <MessageCircle className="w-5 h-5 text-blue-600" />
                  <span className="font-medium">Conversație</span>
                </div>
                <Badge variant="secondary">
                  {messageCount} mesaje trimise
                </Badge>
              </div>
            </CardHeader>
            
            <Separator />
            
            <CardContent className="flex-1 p-0">
              <ScrollArea className="h-full p-4">
                {messages.length === 0 ? (
                  <div className="text-center py-12">
                    <Bot className="w-12 h-12 mx-auto mb-4 text-gray-300" />
                    <h3 className="text-lg font-medium text-gray-900 mb-2">
                      Bună! Sunt mentorul tău AI.
                    </h3>
                    <p className="text-gray-600 mb-4">
                      Sunt aici să te ajut cu dezvoltarea carierei. Poți să mă întrebi orice despre:
                    </p>
                    <div className="grid grid-cols-1 md:grid-cols-2 gap-2 text-sm text-gray-600">
                      <div>• Planificarea carierei</div>
                      <div>• Dezvoltarea competențelor</div>
                      <div>• Interpretarea testelor</div>
                      <div>• Strategii de progres</div>
                    </div>
                  </div>
                ) : (
                  <div className="space-y-4">
                    {messages.map((message) => (
                      <div
                        key={message.id}
                        className={`flex items-start space-x-3 ${
                          message.message_type === 'user' ? 'flex-row-reverse space-x-reverse' : ''
                        }`}
                      >
                        <div className={`p-2 rounded-lg ${
                          message.message_type === 'user' 
                            ? 'bg-blue-100' 
                            : 'bg-gray-100'
                        }`}>
                          {message.message_type === 'user' ? (
                            <User className="w-4 h-4 text-blue-600" />
                          ) : (
                            <Bot className="w-4 h-4 text-gray-600" />
                          )}
                        </div>
                        <div className={`flex-1 ${
                          message.message_type === 'user' ? 'text-right' : ''
                        }`}>
                          <div className={`p-3 rounded-lg max-w-[80%] ${
                            message.message_type === 'user'
                              ? 'bg-blue-600 text-white ml-auto'
                              : 'bg-white border border-gray-200'
                          }`}>
                            <p className="text-sm whitespace-pre-wrap">{message.content}</p>
                          </div>
                          <div className={`text-xs text-gray-500 mt-1 flex items-center space-x-1 ${
                            message.message_type === 'user' ? 'justify-end' : ''
                          }`}>
                            <Clock className="w-3 h-3" />
                            <span>{formatTime(message.created_at)}</span>
                          </div>
                        </div>
                      </div>
                    ))}
                  </div>
                )}
              </ScrollArea>
            </CardContent>
            
            <Separator />
            
            {/* Message Input */}
            <div className="p-4">
              {!canSendMessage && !hasPremiumAccess ? (
                <div className="text-center py-4">
                  <div className="mb-3">
                    <Crown className="w-8 h-8 mx-auto text-yellow-500" />
                  </div>
                  <h4 className="font-medium text-gray-900 mb-2">
                    Ai atins limita de mesaje gratuite
                  </h4>
                  <p className="text-sm text-gray-600 mb-4">
                    Upgrade la Premium pentru acces nelimitat la mentoring AI
                  </p>
                  <Button className="bg-gradient-to-r from-yellow-400 to-orange-500 hover:from-yellow-500 hover:to-orange-600">
                    <Crown className="w-4 h-4 mr-2" />
                    Upgrade la Premium
                    <ArrowRight className="w-4 h-4 ml-2" />
                  </Button>
                </div>
              ) : (
                <form onSubmit={handleSubmit} className="flex space-x-2">
                  <Input
                    value={input}
                    onChange={(e) => setInput(e.target.value)}
                    placeholder="Scrie mesajul tău aici..."
                    disabled={isLoading || !canSendMessage}
                    className="flex-1"
                  />
                  <Button 
                    type="submit" 
                    disabled={isLoading || !input.trim() || !canSendMessage}
                    size="sm"
                  >
                    {isLoading ? (
                      <div className="w-4 h-4 animate-spin border-2 border-white border-t-transparent rounded-full" />
                    ) : (
                      <Send className="w-4 h-4" />
                    )}
                  </Button>
                </form>
              )}
              
              {!hasPremiumAccess && canSendMessage && (
                <div className="text-xs text-gray-500 mt-2 text-center">
                  {remainingMessages} mesaje gratuite rămase
                </div>
              )}
            </div>
          </Card>
        </div>

        {/* Suggestions & Info */}
        <div className="space-y-6">
          {/* Quick Questions */}
          <Card>
            <CardHeader>
              <CardTitle className="text-lg">Întrebări frecvente</CardTitle>
              <CardDescription>Apasă pentru a întreba rapid</CardDescription>
            </CardHeader>
            <CardContent className="space-y-2">
              {predefinedQuestions.map((question, index) => (
                <Button
                  key={index}
                  variant="outline"
                  className="w-full text-left justify-start h-auto p-3"
                  onClick={() => setInput(question)}
                  disabled={isLoading || !canSendMessage}
                >
                  <MessageCircle className="w-4 h-4 mr-2 text-blue-600" />
                  <span className="text-sm">{question}</span>
                </Button>
              ))}
            </CardContent>
          </Card>

          {/* AI Capabilities */}
          <Card>
            <CardHeader>
              <CardTitle className="text-lg">Cum te poate ajuta mentorul AI</CardTitle>
            </CardHeader>
            <CardContent>
              <ul className="space-y-3 text-sm">
                <li className="flex items-start space-x-2">
                  <div className="w-2 h-2 bg-blue-600 rounded-full mt-2"></div>
                  <span>Analizează rezultatele testelor tale pentru recomandări personalizate</span>
                </li>
                <li className="flex items-start space-x-2">
                  <div className="w-2 h-2 bg-blue-600 rounded-full mt-2"></div>
                  <span>Oferă strategii pentru dezvoltarea competențelor</span>
                </li>
                <li className="flex items-start space-x-2">
                  <div className="w-2 h-2 bg-blue-600 rounded-full mt-2"></div>
                  <span>Sugerează resurse și cursuri relevante</span>
                </li>
                <li className="flex items-start space-x-2">
                  <div className="w-2 h-2 bg-blue-600 rounded-full mt-2"></div>
                  <span>Ajută la planificarea tranziției de carieră</span>
                </li>
              </ul>
            </CardContent>
          </Card>
        </div>
      </div>
    </div>
  );
};

export default AIMentoringWithLimits;
