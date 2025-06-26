
export function getScoreColor(score: number, testName?: string): string {
  const testKey = testName?.toLowerCase() || '';
  
  // Culori specifice pentru teste clinice (inversate!)
  if (testKey.includes('gad-7') || testKey.includes('anxietate') || 
      testKey.includes('phq-9') || testKey.includes('depresie')) {
    if (score >= 71) return "text-red-700";    // Severe
    if (score >= 48) return "text-orange-700"; // Moderate  
    if (score >= 24) return "text-yellow-700"; // Mild
    return "text-green-700";                   // Minimal
  }
  
  // Culori default pentru teste pozitive
  if (score >= 80) return "text-green-700";
  if (score >= 60) return "text-blue-700"; 
  if (score >= 40) return "text-gray-700";
  return "text-red-700";
}
