import {
  getDISCExplanation,
  getDISCBadgeVariant,
} from "@/utils/scoring/discExplanations";
import {
  getBigFiveExplanation,
  getBigFiveBadgeVariant,
} from "@/utils/scoring/bigFiveExplanations";

// Default explanation
const defaultExplanation = `
<div class="space-y-4">
  <p class="text-gray-700">
    Ne pare rău, nu avem o explicație detaliată pentru acest test momentan.
  </p>
  <p class="text-gray-700">
    Însă, te încurajăm să explorezi alte teste și să revii mai târziu pentru a vedea dacă am adăugat informații suplimentare.
  </p>
</div>
`;

const watsonGlaserExplanation = `
<div class="space-y-6">
  <div class="bg-blue-50 p-4 rounded-lg">
    <h3 class="text-lg font-semibold mb-2 text-blue-800">Ce este Watson-Glaser Critical Thinking Appraisal?</h3>
    <p class="text-blue-700">
      Watson-Glaser este cel mai utilizat test pentru evaluarea gândirii critice, dezvoltat pentru a măsura 
      capacitatea de analiză obiectivă și luare a deciziilor informate în situații complexe.
    </p>
  </div>

  <div class="bg-white p-4 rounded-lg border">
    <h3 class="text-lg font-semibold mb-3 text-gray-800">Cele 5 Dimensiuni Evaluate:</h3>
    <div class="grid md:grid-cols-2 gap-4">
      <div class="space-y-3">
        <div class="p-3 bg-purple-50 rounded">
          <h4 class="font-medium text-purple-800">1. Inferențe</h4>
          <p class="text-sm text-purple-600">Capacitatea de a trage concluzii logice din informațiile disponibile.</p>
        </div>
        <div class="p-3 bg-green-50 rounded">
          <h4 class="font-medium text-green-800">2. Asumpții</h4>
          <p class="text-sm text-green-600">Identificarea premiselor implicite în argumentări și declarații.</p>
        </div>
        <div class="p-3 bg-yellow-50 rounded">
          <h4 class="font-medium text-yellow-800">3. Deducție</h4>
          <p class="text-sm text-yellow-600">Aplicarea principiilor logice pentru a determina validitatea concluziilor.</p>
        </div>
      </div>
      <div class="space-y-3">
        <div class="p-3 bg-blue-50 rounded">
          <h4 class="font-medium text-blue-800">4. Interpretare</h4>
          <p class="text-sm text-blue-600">Evaluarea și interpretarea corectă a informațiilor și datelor.</p>
        </div>
        <div class="p-3 bg-red-50 rounded">
          <h4 class="font-medium text-red-800">5. Evaluarea Argumentelor</h4>
          <p class="text-sm text-red-600">Distingerea între argumentele puternice și cele slabe în luarea deciziilor.</p>
        </div>
      </div>
    </div>
  </div>

  <div class="bg-gray-50 p-4 rounded-lg">
    <h3 class="text-lg font-semibold mb-2 text-gray-800">Interpretarea Scorurilor:</h3>
    <div class="space-y-2 text-sm">
      <div class="flex justify-between"><span>85-100%:</span><span class="text-green-600 font-medium">Superior - Abilități excepționale</span></div>
      <div class="flex justify-between"><span>70-84%:</span><span class="text-blue-600 font-medium">Peste medie - Abilități bune</span></div>
      <div class="flex justify-between"><span>55-69%:</span><span class="text-yellow-600 font-medium">Mediu - Abilități moderate</span></div>
      <div class="flex justify-between"><span>40-54%:</span><span class="text-orange-600 font-medium">Sub medie - Necesită dezvoltare</span></div>
      <div class="flex justify-between"><span>0-39%:</span><span class="text-red-600 font-medium">Scăzut - Necesită îmbunătățire semnificativă</span></div>
    </div>
  </div>

  <div class="bg-green-50 p-4 rounded-lg">
    <h3 class="text-lg font-semibold mb-2 text-green-800">Aplicabilitate Profesională:</h3>
    <ul class="text-sm text-green-700 space-y-1">
      <li>• Management și leadership</li>
      <li>• Consultanță și analiză</li>
      <li>• Luarea deciziilor strategice</li>
      <li>• Cercetare și dezvoltare</li>
      <li>• Educație și formare</li>
      <li>• Justiție și drept</li>
    </ul>
  </div>
</div>
`;

export const getTestScoringExplanation = (testName: string): string => {
  const normalizedTestName = testName.toLowerCase();
  
  if (normalizedTestName.includes('disc')) {
    return getDISCExplanation();
  }
  
  if (normalizedTestName.includes('big five')) {
    return getBigFiveExplanation();
  }
  
  if (normalizedTestName.includes('watson') || normalizedTestName.includes('glaser') || normalizedTestName.includes('critical thinking')) {
    return watsonGlaserExplanation;
  }
  
  return defaultExplanation;
};

export const getScoreBadgeVariant = (testName: string, scoreKey: string): string => {
  const normalizedTestName = testName.toLowerCase();

  if (normalizedTestName.includes('disc')) {
      return getDISCBadgeVariant(scoreKey);
  }

  if (normalizedTestName.includes('big five')) {
      return getBigFiveBadgeVariant(scoreKey);
  }

  return 'default';
};
