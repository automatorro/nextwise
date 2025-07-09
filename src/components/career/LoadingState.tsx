import React from 'react';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { Badge } from '@/components/ui/badge';
import { Progress } from '@/components/ui/progress';
import { Button } from '@/components/ui/button';
import { 
  Brain, 
  Lightbulb, 
  Sparkles, 
  TrendingUp,
  Target,
  CheckCircle,
  Clock,
  RefreshCw
} from 'lucide-react';

interface LoadingStateProps {
  type: 'plan' | 'recommendations';
  message?: string;
}

const LoadingState = ({ type, message }: LoadingStateProps) => {
  const Icon = type === 'plan' ? Brain : Lightbulb;
  const defaultMessage = type === 'plan' 
    ? 'Generez planul tău de carieră personalizat...' 
    : 'Actualizez recomandările pe baza profilului tău...';

  return (
    <Card className="bg-gradient-to-r from-blue-50 to-indigo-50 border-blue-200">
      <CardContent className="p-8 text-center">
        <div className="flex justify-center mb-4">
          <div className="relative">
            <Icon className="w-12 h-12 text-blue-600 animate-pulse" />
            <RefreshCw className="w-4 h-4 text-blue-400 absolute -top-1 -right-1 animate-spin" />
          </div>
        </div>
        
        <h3 className="text-lg font-semibold text-blue-900 mb-2">
          {type === 'plan' ? 'Generăm planul tău...' : 'Actualizăm recomandările...'}
        </h3>
        
        <p className="text-blue-700 mb-4">
          {message || defaultMessage}
        </p>

        <div className="space-y-3">
          <Progress value={33} className="w-full h-2" />
          <div className="flex justify-center space-x-4 text-xs text-blue-600">
            <div className="flex items-center space-x-1">
              <Target className="w-3 h-3" />
              <span>Analizez profilul</span>
            </div>
            <div className="flex items-center space-x-1">
              <TrendingUp className="w-3 h-3" />
              <span>Caut resurse</span>
            </div>
            <div className="flex items-center space-x-1">
              <CheckCircle className="w-3 h-3" />
              <span>Finalizez</span>
            </div>
          </div>
        </div>

        <div className="mt-6 p-4 bg-white/50 rounded-lg">
          <div className="flex items-center justify-center space-x-2 text-sm text-blue-700">
            <Clock className="w-4 h-4" />
            <span>Estimare: {type === 'plan' ? '30-60 secunde' : '15-30 secunde'}</span>
          </div>
        </div>
      </CardContent>
    </Card>
  );
};

export default LoadingState;