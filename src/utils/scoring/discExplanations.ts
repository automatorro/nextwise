
export const getDISCExplanation = (): string => {
  return `
<div class="space-y-6">
  <div class="bg-blue-50 p-4 rounded-lg">
    <h3 class="text-lg font-semibold mb-2 text-blue-800">Ce este DISC Assessment?</h3>
    <p class="text-blue-700">
      DISC este un instrument de evaluare comportamentală care măsoară patru dimensiuni principale ale personalității: 
      Dominanța, Influența, Stabilitatea și Conștiinciozitatea.
    </p>
  </div>

  <div class="bg-white p-4 rounded-lg border">
    <h3 class="text-lg font-semibold mb-3 text-gray-800">Cele 4 Stiluri DISC:</h3>
    <div class="grid md:grid-cols-2 gap-4">
      <div class="space-y-3">
        <div class="p-3 bg-red-50 rounded">
          <h4 class="font-medium text-red-800">D - Dominanță</h4>
          <p class="text-sm text-red-600">Orientat către rezultate, direct, hotărât și competitiv.</p>
        </div>
        <div class="p-3 bg-yellow-50 rounded">
          <h4 class="font-medium text-yellow-800">I - Influență</h4>
          <p class="text-sm text-yellow-600">Sociabil, optimist, persuasiv și orientat către oameni.</p>
        </div>
      </div>
      <div class="space-y-3">
        <div class="p-3 bg-green-50 rounded">
          <h4 class="font-medium text-green-800">S - Stabilitate</h4>
          <p class="text-sm text-green-600">Calm, răbdător, cooperant și orientat către echipă.</p>
        </div>
        <div class="p-3 bg-blue-50 rounded">
          <h4 class="font-medium text-blue-800">C - Conștiinciozitate</h4>
          <p class="text-sm text-blue-600">Analitic, precis, sistematic și orientat către calitate.</p>
        </div>
      </div>
    </div>
  </div>

  <div class="bg-gray-50 p-4 rounded-lg">
    <h3 class="text-lg font-semibold mb-2 text-gray-800">Interpretarea Scorurilor:</h3>
    <div class="space-y-2 text-sm">
      <div class="flex justify-between"><span>Foarte ridicat (80-100%):</span><span class="text-green-600 font-medium">Trăsătură dominantă</span></div>
      <div class="flex justify-between"><span>Ridicat (60-79%):</span><span class="text-blue-600 font-medium">Trăsătură puternică</span></div>
      <div class="flex justify-between"><span>Mediu (40-59%):</span><span class="text-yellow-600 font-medium">Trăsătură moderată</span></div>
      <div class="flex justify-between"><span>Scăzut (0-39%):</span><span class="text-gray-600 font-medium">Trăsătură mai puțin prezentă</span></div>
    </div>
  </div>
</div>
`;
};

export const getDISCBadgeVariant = (scoreKey: string): string => {
  const variants: { [key: string]: string } = {
    'D': 'destructive', // Red for Dominance
    'I': 'default',     // Yellow for Influence  
    'S': 'secondary',   // Green for Steadiness
    'C': 'outline'      // Blue for Conscientiousness
  };
  
  return variants[scoreKey] || 'default';
};
