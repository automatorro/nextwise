
import React from 'react';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Badge } from '@/components/ui/badge';
import { Progress } from '@/components/ui/progress';
import { BookOpen } from 'lucide-react';
import { getDimensionExplanation, getScoreColor, getDimensionLabel } from '@/utils/testResultHelpers';

interface DimensionExplanationsProps {
  testName: string;
  dimensions: { [key: string]: number };
}

const DimensionExplanations = ({ testName, dimensions }: DimensionExplanationsProps) => {
  if (!dimensions || Object.keys(dimensions).length === 0) return null;

  return (
    <Card className="mb-6">
      <CardHeader>
        <CardTitle className="flex items-center">
          <BookOpen className="w-5 h-5 mr-2 text-green-600" />
          Explicația Dimensiunilor
        </CardTitle>
        <p className="text-sm text-gray-600">
          Înțelege ce înseamnă fiecare dimensiune măsurată și cum să interpretezi scorurile tale.
        </p>
      </CardHeader>
      <CardContent>
        <div className="space-y-6">
          {Object.entries(dimensions).map(([key, value]) => {
            const explanation = getDimensionExplanation(testName, key);
            if (!explanation) return null;

            const scoreLevel = value >= 70 ? 'high' : value >= 30 ? 'moderate' : 'low';
            
            return (
              <div key={key} className="border-l-4 border-l-green-500 pl-4 pb-4 border-b border-gray-100 last:border-b-0">
                <div className="flex items-center justify-between mb-2">
                  <h3 className="font-semibold text-lg text-gray-900">
                    {getDimensionLabel(testName, key)}
                  </h3>
                  <div className="flex items-center gap-2">
                    <Badge variant={value >= 70 ? 'default' : value >= 30 ? 'secondary' : 'outline'}>
                      {value >= 70 ? 'Ridicat' : value >= 30 ? 'Moderat' : 'Scăzut'}
                    </Badge>
                    <span className={`font-bold ${getScoreColor(value)}`}>
                      {value}%
                    </span>
                  </div>
                </div>
                
                <Progress value={value} className="w-full mb-3" />
                
                <div className="space-y-2 text-sm">
                  <p className="text-gray-700">
                    <span className="font-medium">Ce măsoară:</span> {explanation.description}
                  </p>
                  
                  {explanation.interpretations && (
                    <div className="grid grid-cols-1 sm:grid-cols-2 gap-3 mt-3">
                      <div className="p-3 bg-green-50 rounded">
                        <span className="font-medium text-green-800">Scor ridicat:</span>
                        <p className="text-green-700 mt-1">{explanation.interpretations.high}</p>
                      </div>
                      <div className="p-3 bg-blue-50 rounded">
                        <span className="font-medium text-blue-800">Scor scăzut:</span>
                        <p className="text-blue-700 mt-1">{explanation.interpretations.low}</p>
                      </div>
                    </div>
                  )}
                  
                  {explanation.yourScore && (
                    <div className="mt-3 p-3 bg-gray-50 rounded">
                      <span className="font-medium text-gray-800">Scorul tău:</span>
                      <p className="text-gray-700 mt-1">
                        {explanation.yourScore[scoreLevel] || `Ai un scor ${scoreLevel} la această dimensiune.`}
                      </p>
                    </div>
                  )}
                </div>
              </div>
            );
          })}
        </div>
      </CardContent>
    </Card>
  );
};

export default DimensionExplanations;
