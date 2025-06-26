
export function getScoreBadgeVariant(score: number, testName?: string): "default" | "secondary" | "destructive" | "outline" {
  const testKey = testName?.toLowerCase() || '';
  
  // Algoritm specific pentru GAD-7 (corectare critică!)
  if (testKey.includes('gad-7') || testKey.includes('anxietate')) {
    if (score >= 71) return "destructive"; // Severe anxiety
    if (score >= 48) return "outline";     // Moderate anxiety  
    if (score >= 24) return "secondary";   // Mild anxiety
    return "default";                      // Minimal anxiety
  }
  
  // Algoritm specific pentru PHQ-9 (depresie)
  if (testKey.includes('phq-9') || testKey.includes('depresie')) {
    if (score >= 80) return "destructive"; // Severe depression
    if (score >= 60) return "outline";     // Moderate depression
    if (score >= 40) return "secondary";   // Mild depression
    return "default";                      // Minimal depression
  }
  
  // Algoritm default pentru alte teste
  if (score >= 80) return "default";
  if (score >= 60) return "secondary";  
  if (score >= 40) return "outline";
  return "destructive";
}
