
import React from 'react';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';

interface HexacoExplanationProps {
  score?: any;
  language?: string;
}

export const HexacoExplanation: React.FC<HexacoExplanationProps> = ({ score, language = 'ro' }) => {
  return (
    <Card className="mb-6">
      <CardHeader>
        <CardTitle>
          {language === 'en' ? 'About the HEXACO Test' : 'Despre Testul HEXACO'}
        </CardTitle>
      </CardHeader>
      <CardContent>
        <div className="space-y-4">
          <p className="text-gray-700">
            {language === 'en' 
              ? 'The HEXACO personality test evaluates 6 major dimensions of personality: Honesty-Humility, Emotionality, Extraversion, Agreeableness, Conscientiousness, and Openness to Experience.'
              : 'Testul de personalitate HEXACO evaluează 6 dimensiuni majore ale personalității: Onestitate-Umilința, Emotivitate, Extraversiune, Agreabilitate, Conștiinciozitate și Deschidere către Experiență.'}
          </p>
          
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            <div className="space-y-2">
              <h4 className="font-semibold text-blue-600">
                {language === 'en' ? 'Honesty-Humility (H)' : 'Onestitate-Umilința (H)'}
              </h4>
              <p className="text-sm text-gray-600">
                {language === 'en' 
                  ? 'Sincerity, fairness, greed avoidance, and modesty'
                  : 'Sinceritate, echitate, evitarea lăcomiei și modestia'}
              </p>
            </div>
            
            <div className="space-y-2">
              <h4 className="font-semibold text-purple-600">
                {language === 'en' ? 'Emotionality (E)' : 'Emotivitate (E)'}
              </h4>
              <p className="text-sm text-gray-600">
                {language === 'en' 
                  ? 'Anxiety, vulnerability, empathy, and emotional attachment'
                  : 'Anxietate, vulnerabilitate, empatie și atașament emoțional'}
              </p>
            </div>
            
            <div className="space-y-2">
              <h4 className="font-semibold text-green-600">
                {language === 'en' ? 'Extraversion (X)' : 'Extraversiune (X)'}
              </h4>
              <p className="text-sm text-gray-600">
                {language === 'en' 
                  ? 'Sociability, social confidence, energy, and positive emotions'
                  : 'Sociabilitate, încredere socială, energie și emoții pozitive'}
              </p>
            </div>
            
            <div className="space-y-2">
              <h4 className="font-semibold text-orange-600">
                {language === 'en' ? 'Agreeableness (A)' : 'Agreabilitate (A)'}
              </h4>
              <p className="text-sm text-gray-600">
                {language === 'en' 
                  ? 'Tolerance, patience, cooperation, and conflict avoidance'
                  : 'Toleranță, răbdare, cooperare și evitarea conflictelor'}
              </p>
            </div>
            
            <div className="space-y-2">
              <h4 className="font-semibold text-red-600">
                {language === 'en' ? 'Conscientiousness (C)' : 'Conștiinciozitate (C)'}
              </h4>
              <p className="text-sm text-gray-600">
                {language === 'en' 
                  ? 'Organization, discipline, perfectionism, and perseverance'
                  : 'Organizare, disciplină, perfecționism și perseverență'}
              </p>
            </div>
            
            <div className="space-y-2">
              <h4 className="font-semibold text-indigo-600">
                {language === 'en' ? 'Openness (O)' : 'Deschidere (O)'}
              </h4>
              <p className="text-sm text-gray-600">
                {language === 'en' 
                  ? 'Creativity, curiosity, unconventionality, and aesthetic appreciation'
                  : 'Creativitate, curiositate, neconvenționalitate și apreciere estetică'}
              </p>
            </div>
          </div>
        </div>
      </CardContent>
    </Card>
  );
};

export default HexacoExplanation;
