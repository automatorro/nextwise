
import React, { useState, useEffect, useRef } from 'react';
import { Button } from '@/components/ui/button';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { Badge } from '@/components/ui/badge';
import { Input } from '@/components/ui/input';
import { 
  MessageCircle, 
  Brain, 
  Send,
  Sparkles,
  User,
  Bot,
  Loader2
} from 'lucide-react';
import { useAIChat } from '@/hooks/useAIChat';
import { useSessionId } from '@/hooks/useSessionId';

const AIMentoring = () => {
  const [newMessage, setNewMessage] = useState('');
  const messagesEndRef = useRef<HTMLDivElement>(null);
  const sessionId = useSessionId();
  
  const { 
    messages, 
    isLoadingHistory, 
    isLoading, 
    sendMessage 
  } = useAIChat(sessionId);

  // Auto-scroll to bottom when new messages arrive
  useEffect(() => {
    messagesEndRef.current?.scrollIntoView({ behavior: 'smooth' });
  }, [messages]);

  const handleSendMessage = () => {
    if (!newMessage.trim() || isLoading) return;
    
    sendMessage(newMessage);
    setNewMessage('');
  };

  const handleKeyPress = (e: React.KeyboardEvent) => {
    if (e.key === 'Enter' && !e.shiftKey) {
      e.preventDefault();
      handleSendMessage();
    }
  };

  const predefinedQuestions = [
    "Care sunt următorii pași în cariera mea?",
    "Cum pot îmbunătăți competențele de leadership?",
    "Ce certificări îmi recomanzi pentru rolul meu?",
    "Cum pot face tranziția către management?"
  ];

  // Show initial AI message if no messages exist
  const displayMessages = messages.length === 0 ? [{
    id: 'initial',
    message_type: 'ai' as const,
    content: 'Salut! Sunt mentorul tău AI personal. Sunt aici să te ajut cu planificarea carierei, dezvoltarea competențelor și orice întrebări legate de evoluția ta profesională. Cu ce te pot ajuta astăzi?',
    created_at: new Date().toISOString()
  }] : messages;

  return (
    <div className="space-y-6">
      {/* Header */}
      <Card className="bg-gradient-to-r from-blue-50 to-indigo-50 border-blue-200">
        <CardHeader>
          <CardTitle className="flex items-center space-x-2">
            <Brain className="w-6 h-6 text-blue-600" />
            <span>Mentoring AI Premium</span>
            <Badge className="bg-blue-600 text-white">
              <Sparkles className="w-3 h-3 mr-1" />
              Exclusiv Premium
            </Badge>
          </CardTitle>
          <CardDescription>
            Consiliere personalizată cu inteligență artificială, adaptată profilului tău unic și rezultatelor din teste
          </CardDescription>
        </CardHeader>
      </Card>

      <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
        {/* Chat Interface */}
        <div className="lg:col-span-2">
          <Card className="h-[600px] flex flex-col">
            <CardHeader>
              <CardTitle className="text-lg">Conversația ta cu mentorul AI</CardTitle>
            </CardHeader>
            <CardContent className="flex-1 flex flex-col">
              {/* Messages */}
              <div className="flex-1 overflow-y-auto space-y-4 mb-4">
                {isLoadingHistory ? (
                  <div className="flex justify-center items-center h-32">
                    <Loader2 className="w-6 h-6 animate-spin text-blue-600" />
                    <span className="ml-2 text-gray-500">Se încarcă conversația...</span>
                  </div>
                ) : (
                  displayMessages.map((message) => (
                    <div
                      key={message.id}
                      className={`flex ${message.message_type === 'user' ? 'justify-end' : 'justify-start'}`}
                    >
                      <div
                        className={`max-w-[80%] rounded-lg p-3 ${
                          message.message_type === 'user'
                            ? 'bg-blue-600 text-white'
                            : 'bg-gray-100 text-gray-900'
                        }`}
                      >
                        <div className="flex items-start space-x-2">
                          {message.message_type === 'ai' && (
                            <Bot className="w-4 h-4 mt-1 text-blue-600" />
                          )}
                          {message.message_type === 'user' && (
                            <User className="w-4 h-4 mt-1" />
                          )}
                          <div className="flex-1">
                            <p className="text-sm whitespace-pre-wrap">{message.content}</p>
                            <p className={`text-xs mt-1 ${
                              message.message_type === 'user' ? 'text-blue-100' : 'text-gray-500'
                            }`}>
                              {new Date(message.created_at).toLocaleTimeString('ro-RO', { 
                                hour: '2-digit', 
                                minute: '2-digit' 
                              })}
                            </p>
                          </div>
                        </div>
                      </div>
                    </div>
                  ))
                )}
                
                {isLoading && (
                  <div className="flex justify-start">
                    <div className="bg-gray-100 rounded-lg p-3">
                      <div className="flex items-center space-x-2">
                        <Bot className="w-4 h-4 text-blue-600" />
                        <Loader2 className="w-4 h-4 animate-spin text-blue-600" />
                        <div className="text-sm text-gray-600">Mentorul gândește...</div>
                      </div>
                    </div>
                  </div>
                )}
                
                <div ref={messagesEndRef} />
              </div>

              {/* Input */}
              <div className="flex space-x-2">
                <Input
                  placeholder="Scrie întrebarea ta aici..."
                  value={newMessage}
                  onChange={(e) => setNewMessage(e.target.value)}
                  onKeyPress={handleKeyPress}
                  disabled={isLoading}
                  className="flex-1"
                />
                <Button 
                  onClick={handleSendMessage} 
                  disabled={!newMessage.trim() || isLoading}
                >
                  {isLoading ? (
                    <Loader2 className="w-4 h-4 animate-spin" />
                  ) : (
                    <Send className="w-4 h-4" />
                  )}
                </Button>
              </div>
            </CardContent>
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
                  onClick={() => setNewMessage(question)}
                  disabled={isLoading}
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

export default AIMentoring;
