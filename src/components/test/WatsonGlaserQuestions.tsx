
import React from 'react';
import { WATSON_GLASER_QUESTIONS } from '@/utils/testCalculations/watsonGlaserQuestions';

// Export întrebările pentru utilizare în TestRunner
export { WATSON_GLASER_QUESTIONS };

// Componentă pentru afișarea întrebărilor Watson-Glaser
const WatsonGlaserQuestions = () => {
  return (
    <div className="space-y-6">
      <div className="text-center">
        <h2 className="text-2xl font-bold mb-2">Watson-Glaser Critical Thinking Appraisal</h2>
        <p className="text-gray-600">
          Testul evaluează 5 dimensiuni ale gândirii critice prin 40 de întrebări
        </p>
      </div>
      
      <div className="grid grid-cols-1 md:grid-cols-2 gap-4 text-sm">
        <div className="bg-blue-50 p-4 rounded-lg">
          <h3 className="font-semibold mb-2">Secțiuni evaluate:</h3>
          <ul className="space-y-1">
            <li>• Inferențe (1-8)</li>
            <li>• Asumpții (9-16)</li>
            <li>• Deducție (17-24)</li>
            <li>• Interpretarea (25-32)</li>
            <li>• Evaluarea argumentelor (33-40)</li>
          </ul>
        </div>
        
        <div className="bg-green-50 p-4 rounded-lg">
          <h3 className="font-semibold mb-2">Informații:</h3>
          <ul className="space-y-1">
            <li>• 40 de întrebări în total</li>
            <li>• Timp estimat: 35 minute</li>
            <li>• Fără timp limitat</li>
            <li>• Citește cu atenție fiecare întrebare</li>
          </ul>
        </div>
      </div>
    </div>
  );
};

export default WatsonGlaserQuestions;
