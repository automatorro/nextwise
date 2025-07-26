
export const getBigFiveExplanation = (): string => {
  return `
<div class="space-y-6">
  <div class="bg-purple-50 p-4 rounded-lg">
    <h3 class="text-lg font-semibold mb-2 text-purple-800">Ce este Big Five Personality Test?</h3>
    <p class="text-purple-700">
      Big Five este cel mai acceptat model științific pentru măsurarea personalității, evaluând cinci dimensiuni fundamentale 
      care descriu trăsăturile umane universale.
    </p>
  </div>

  <div class="bg-white p-4 rounded-lg border">
    <h3 class="text-lg font-semibold mb-3 text-gray-800">Cele 5 Dimensiuni Big Five:</h3>
    <div class="grid md:grid-cols-1 gap-3">
      <div class="p-3 bg-blue-50 rounded">
        <h4 class="font-medium text-blue-800">Deschiderea către Experiență</h4>
        <p class="text-sm text-blue-600">Creativitate, curiozitate intelectuală și deschidere către idei noi.</p>
      </div>
      <div class="p-3 bg-green-50 rounded">
        <h4 class="font-medium text-green-800">Conștiinciozitatea</h4>
        <p class="text-sm text-green-600">Organizare, disciplină, responsabilitate și orientare către obiective.</p>
      </div>
      <div class="p-3 bg-yellow-50 rounded">
        <h4 class="font-medium text-yellow-800">Extraversiunea</h4>
        <p class="text-sm text-yellow-600">Sociabilitate, energie, optimism și căutarea stimulării sociale.</p>
      </div>
      <div class="p-3 bg-pink-50 rounded">
        <h4 class="font-medium text-pink-800">Agreabilitatea</h4>
        <p class="text-sm text-pink-600">Cooperare, încredere, empatie și orientare către alții.</p>
      </div>
      <div class="p-3 bg-red-50 rounded">
        <h4 class="font-medium text-red-800">Neurotismul</h4>
        <p class="text-sm text-red-600">Stabilitate emoțională, gestionarea stresului și echilibrul psihic.</p>
      </div>
    </div>
  </div>

  <div class="bg-gray-50 p-4 rounded-lg">
    <h3 class="text-lg font-semibold mb-2 text-gray-800">Interpretarea Scorurilor:</h3>
    <div class="space-y-2 text-sm">
      <div class="flex justify-between"><span>Foarte ridicat (80-100%):</span><span class="text-green-600 font-medium">Trăsătură foarte pronunțată</span></div>
      <div class="flex justify-between"><span>Ridicat (60-79%):</span><span class="text-blue-600 font-medium">Trăsătură puternică</span></div>
      <div class="flex justify-between"><span>Mediu (40-59%):</span><span class="text-yellow-600 font-medium">Trăsătură moderată</span></div>
      <div class="flex justify-between"><span>Scăzut (20-39%):</span><span class="text-orange-600 font-medium">Trăsătură mai puțin prezentă</span></div>
      <div class="flex justify-between"><span>Foarte scăzut (0-19%):</span><span class="text-red-600 font-medium">Trăsătură foarte slabă</span></div>
    </div>
  </div>
</div>
`;
};

export const getBigFiveBadgeVariant = (scoreKey: string): string => {
  const variants: { [key: string]: string } = {
    'openness': 'default',
    'conscientiousness': 'secondary', 
    'extraversion': 'outline',
    'agreeableness': 'destructive',
    'neuroticism': 'default'
  };
  
  return variants[scoreKey] || 'default';
};
