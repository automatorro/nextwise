# FRAMEWORK COMPLET PENTRU IMPLEMENTAREA TESTELOR PSIHOLOGICE

## OVERVIEW
Acest document oferă un framework exhaustiv pentru implementarea testelor psihologice în platformă, bazat pe experiența acumulată din implementările anterioare și pe înțelegerea completă a arhitecturii sistemului.

## PRINCIPII FUNDAMENTALE

### 1. Înțelegerea Ecosistemului de Tabele
Sistemul nostru este format din mai multe tabele interconectate:
- **test_categories**: Categoriile de teste (Personalitate, Cognitive, etc.)
- **test_types**: Tipurile de teste (Big Five, Watson-Glaser, etc.)
- **test_questions**: Întrebările pentru fiecare test
- **test_results**: Rezultatele utilizatorilor
- **subscriptions**: Nivelurile de abonament pentru accesul la teste

### 2. Tipuri de Teste și Structuri de Date
Sistemul suportă mai multe tipuri de teste cu structuri diferite:

#### A. Teste de Personalitate (Likert Scale)
- **Exemple**: Big Five, Cattell 16PF, DISC, HEXACO
- **Tip întrebări**: `likert_scale`
- **Răspunsuri**: Scale 1-5 (Complet dezacord → Complet de acord)
- **Scoring**: Bazat pe dimensiuni multiple cu scoring_weights

#### B. Teste Cognitive/Situationale
- **Exemple**: Watson-Glaser, SJT, Competențe Manageriale
- **Tip întrebări**: `multiple_choice` sau `scenario_based`
- **Răspunsuri**: Opțiuni specifice fiecărui test
- **Scoring**: Răspunsuri corecte/incorecte sau eficiență

#### C. Teste Clinice
- **Exemple**: GAD-7, Beck Depression
- **Tip întrebări**: `frequency_scale`
- **Răspunsuri**: Frecvența simptomelor
- **Scoring**: Punctaje cumulative cu praguri clinice

#### D. Teste de Echipă
- **Exemple**: Belbin Team Roles
- **Tip întrebări**: `preference_ranking`
- **Răspunsuri**: Preferințe comportamentale
- **Scoring**: Profiluri de rol în echipă

### 3. Consistența în Implementare
- Toate testele urmează același pattern de bază
- Adaptarea se face în funcție de tipul testului
- Reutilizarea componentelor existente

## PROCEDURA COMPLETĂ PAS CU PAS

### ETAPA 0: ANALIZA PRELIMINARĂ

#### 0.1 Identificarea Tipului de Test
```
□ Tip de test identificat:
  □ Personalitate (Likert Scale)
  □ Cognitive/Situational (Multiple Choice)
  □ Clinic (Frequency Scale)
  □ Echipă (Preference Ranking)
  □ Altul (specificați)

□ Structura răspunsurilor:
  □ Scale standard (1-5)
  □ Opțiuni custom
  □ Răspunsuri corecte/incorecte
  □ Ranguri de preferință
```

#### 0.2 Determinarea Categoriei
```
□ Categoria determinată:
  □ Personalitate (UUID: vezi în baza de date)
  □ Aptitudini Cognitive (UUID: 13f9d37c-2a3b-4e55-8707-e0372b3b2581)
  □ Inteligență Emoțională (UUID: vezi în baza de date)
  □ Teamwork (UUID: vezi în baza de date)
  □ Altă categorie existentă
  □ Categorie nouă (necesită creare)
```

#### 0.3 Determinarea Nivelului de Abonament
```
□ Nivelul de abonament:
  □ basic (gratuit)
  □ professional (plătit)
  □ premium (plătit)
```

### ETAPA 1: VERIFICAREA INFRASTRUCTURII

#### 1.1 Verificarea Categoriei în Baza de Date
```sql
-- Verifică categoriile existente
SELECT id, name, description FROM test_categories;

-- Dacă categoria nu există, creează-o
INSERT INTO test_categories (id, name, description, icon) 
VALUES (gen_random_uuid(), 'Numele Categoriei', 'Descriere', 'icon-name');
```

#### 1.2 Verificarea Testelor Existente
```sql
-- Verifică testele existente în categoria dorită
SELECT tt.id, tt.name, tc.name as category_name 
FROM test_types tt 
JOIN test_categories tc ON tt.category_id = tc.id 
WHERE tc.name ILIKE '%categoria%';
```

#### 1.3 Planificarea ID-urilor
```
□ ID test planificat: (ex: 'watson-glaser-critical-thinking-2024')
□ ID-uri întrebări: Se generează automat cu gen_random_uuid()
□ Structură consistentă menținută
```

### ETAPA 2: CREAREA TESTULUI ÎN BAZA DE DATE

#### 2.1 Inserarea Testului
```sql
-- Template pentru inserarea testului
INSERT INTO test_types (
  id,
  name,
  description,
  category_id,
  questions_count,
  estimated_duration,
  subscription_required
) VALUES (
  'test-id-unique',
  'Numele Testului',
  'Descrierea testului în română',
  'uuid-categoria',
  numărul_întrebărilor,
  durata_în_minute,
  'basic'::subscription_type -- sau 'professional'/'premium'
);
```

#### 2.2 Verificarea Inserării
```sql
-- Verifică că testul a fost inserat corect
SELECT * FROM test_types WHERE id = 'test-id-unique';
```

### ETAPA 3: CREAREA ÎNTREBĂRILOR

#### 3.1 Structura Întrebărilor pentru Teste de Personalitate
```sql
-- Template pentru întrebări Likert Scale
INSERT INTO test_questions (
  test_type_id,
  question_text_ro,
  question_text_en,
  question_order,
  question_type,
  options,
  options_en,
  scoring_weights
) VALUES (
  'test-id-unique',
  'Textul întrebării în română',
  'Question text in English',
  1,
  'likert_scale',
  '["Complet dezacord", "Dezacord", "Neutru", "Acord", "Complet de acord"]'::jsonb,
  '["Strongly Disagree", "Disagree", "Neutral", "Agree", "Strongly Agree"]'::jsonb,
  '{"dimensiune1": [1, 2, 3, 4, 5], "dimensiune2": [5, 4, 3, 2, 1]}'::jsonb
);
```

#### 3.2 Structura Întrebărilor pentru Teste Cognitive
```sql
-- Template pentru întrebări Multiple Choice
INSERT INTO test_questions (
  test_type_id,
  question_text_ro,
  question_text_en,
  question_order,
  question_type,
  options,
  options_en,
  scoring_weights
) VALUES (
  'test-id-unique',
  'Textul întrebării sau scenariului',
  'Question text or scenario',
  1,
  'multiple_choice',
  '["Opțiunea A", "Opțiunea B", "Opțiunea C", "Opțiunea D"]'::jsonb,
  '["Option A", "Option B", "Option C", "Option D"]'::jsonb,
  '[0, 1, 0, 0]'::jsonb -- 1 = răspuns corect, 0 = incorect
);
```

#### 3.3 Structura Întrebărilor pentru Teste Clinice
```sql
-- Template pentru întrebări Frequency Scale
INSERT INTO test_questions (
  test_type_id,
  question_text_ro,
  question_text_en,
  question_order,
  question_type,
  options,
  options_en,
  scoring_weights
) VALUES (
  'test-id-unique',
  'Cât de des ați experimentat...?',
  'How often have you experienced...?',
  1,
  'frequency_scale',
  '["Deloc", "Câteva zile", "Mai mult de jumătate din zile", "Aproape zilnic"]'::jsonb,
  '["Not at all", "Several days", "More than half the days", "Nearly every day"]'::jsonb,
  '[0, 1, 2, 3]'::jsonb -- Scoring progresiv
);
```

### ETAPA 4: IMPLEMENTAREA LOGICII DE CALCULARE

#### 4.1 Crearea Hook-ului de Calculare
```typescript
// src/hooks/useTestNameCalculation.ts
import { useMemo } from 'react';

export const useTestNameCalculation = (answers?: Record<string, number>, questions?: any[]) => {
  return useMemo(() => {
    if (!answers || !questions || Object.keys(answers).length === 0) {
      return null;
    }

    console.log('Calculating TestName scores for answers:', answers);
    console.log('Using questions:', questions);

    // Pentru teste de personalitate cu dimensiuni multiple
    if (isPersonalityTest) {
      const dimensionScores: Record<string, number> = {};
      const dimensionCounts: Record<string, number> = {};

      Object.entries(answers).forEach(([questionId, answerValue]) => {
        const question = questions.find(q => q.id === questionId);
        
        if (question?.scoring_weights && typeof question.scoring_weights === 'object') {
          const weights = question.scoring_weights as Record<string, number[]>;
          
          Object.entries(weights).forEach(([dimension, dimensionWeights]) => {
            if (Array.isArray(dimensionWeights) && answerValue < dimensionWeights.length) {
              dimensionScores[dimension] = (dimensionScores[dimension] || 0) + dimensionWeights[answerValue];
              dimensionCounts[dimension] = (dimensionCounts[dimension] || 0) + 1;
            }
          });
        }
      });

      // Normalizarea scorurilor
      const normalizedScores: Record<string, number> = {};
      Object.entries(dimensionScores).forEach(([dimension, score]) => {
        const count = dimensionCounts[dimension];
        if (count > 0) {
          const maxPossibleScore = count * getMaxScorePerQuestion(questions[0]);
          normalizedScores[dimension] = Math.round((score / maxPossibleScore) * 100);
        }
      });

      return normalizedScores;
    }

    // Pentru teste cognitive cu răspunsuri corecte/incorecte
    if (isCognitiveTest) {
      let totalScore = 0;
      let maxScore = 0;

      Object.entries(answers).forEach(([questionId, answerValue]) => {
        const question = questions.find(q => q.id === questionId);
        
        if (question?.scoring_weights && Array.isArray(question.scoring_weights)) {
          const weights = question.scoring_weights as number[];
          if (answerValue < weights.length) {
            totalScore += weights[answerValue];
            maxScore += Math.max(...weights);
          }
        }
      });

      return {
        raw_score: totalScore,
        max_score: maxScore,
        percentage: Math.round((totalScore / maxScore) * 100)
      };
    }

    // Pentru teste clinice cu scoring cumulativ
    if (isClinicalTest) {
      let totalScore = 0;

      Object.entries(answers).forEach(([questionId, answerValue]) => {
        const question = questions.find(q => q.id === questionId);
        
        if (question?.scoring_weights && Array.isArray(question.scoring_weights)) {
          const weights = question.scoring_weights as number[];
          if (answerValue < weights.length) {
            totalScore += weights[answerValue];
          }
        }
      });

      return {
        total_score: totalScore,
        severity_level: getSeverityLevel(totalScore),
        interpretation: getInterpretation(totalScore)
      };
    }

    return null;
  }, [answers, questions]);
};

// Funcții helper
function getMaxScorePerQuestion(sampleQuestion: any): number {
  if (!sampleQuestion?.scoring_weights) return 5;
  
  const weights = sampleQuestion.scoring_weights;
  if (typeof weights === 'object' && !Array.isArray(weights)) {
    // Pentru teste de personalitate
    const dimensionWeights = Object.values(weights)[0] as number[];
    return Math.max(...dimensionWeights);
  }
  
  if (Array.isArray(weights)) {
    // Pentru teste cognitive
    return Math.max(...weights);
  }
  
  return 5;
}

function getSeverityLevel(score: number): string {
  // Implementează logica specifică testului clinic
  if (score >= 15) return 'Severe';
  if (score >= 10) return 'Moderate';
  if (score >= 5) return 'Mild';
  return 'Minimal';
}

function getInterpretation(score: number): string {
  // Implementează interpretarea specifică testului clinic
  return `Scor total: ${score}`;
}
```

#### 4.2 Crearea Fișierului de Calculare
```typescript
// src/utils/testCalculations/testNameCalculation.ts
export interface TestNameScore {
  overall?: number;
  raw_score?: number;
  max_score?: number;
  total_score?: number;
  dimensions?: Record<string, number>;
  section_scores?: Record<string, number>;
  interpretation: string;
  level?: string;
  severity_level?: string;
  detailed_interpretations?: Record<string, string>;
  recommendations?: string[];
}

export const calculateTestNameScore = (
  answers: Record<string, number>, 
  questions: any[]
): TestNameScore => {
  console.log('Calculating TestName score for answers:', answers);
  
  // Determină tipul testului bazat pe prima întrebare
  const firstQuestion = questions[0];
  const testType = determineTestType(firstQuestion);
  
  switch (testType) {
    case 'personality':
      return calculatePersonalityScore(answers, questions);
    case 'cognitive':
      return calculateCognitiveScore(answers, questions);
    case 'clinical':
      return calculateClinicalScore(answers, questions);
    case 'team':
      return calculateTeamScore(answers, questions);
    default:
      return { interpretation: 'Tip de test necunoscut' };
  }
};

function determineTestType(question: any): string {
  if (!question?.scoring_weights) return 'unknown';
  
  const weights = question.scoring_weights;
  
  // Teste de personalitate au scoring_weights ca obiect cu dimensiuni
  if (typeof weights === 'object' && !Array.isArray(weights)) {
    return 'personality';
  }
  
  // Teste cognitive au scoring_weights ca array cu 0/1
  if (Array.isArray(weights) && weights.every(w => w === 0 || w === 1)) {
    return 'cognitive';
  }
  
  // Teste clinice au scoring_weights ca array progresiv
  if (Array.isArray(weights) && weights.every((w, i) => w === i)) {
    return 'clinical';
  }
  
  return 'unknown';
}

function calculatePersonalityScore(answers: Record<string, number>, questions: any[]): TestNameScore {
  const dimensionScores: Record<string, number> = {};
  const dimensionCounts: Record<string, number> = {};

  Object.entries(answers).forEach(([questionId, answerValue]) => {
    const question = questions.find(q => q.id === questionId);
    
    if (question?.scoring_weights && typeof question.scoring_weights === 'object') {
      const weights = question.scoring_weights as Record<string, number[]>;
      
      Object.entries(weights).forEach(([dimension, dimensionWeights]) => {
        if (Array.isArray(dimensionWeights) && answerValue < dimensionWeights.length) {
          dimensionScores[dimension] = (dimensionScores[dimension] || 0) + dimensionWeights[answerValue];
          dimensionCounts[dimension] = (dimensionCounts[dimension] || 0) + 1;
        }
      });
    }
  });

  const normalizedScores: Record<string, number> = {};
  Object.entries(dimensionScores).forEach(([dimension, score]) => {
    const count = dimensionCounts[dimension];
    if (count > 0) {
      const maxPossibleScore = count * 5; // Assuming 5-point scale
      normalizedScores[dimension] = Math.round((score / maxPossibleScore) * 100);
    }
  });

  const overall = Math.round(
    Object.values(normalizedScores).reduce((sum, score) => sum + score, 0) / 
    Object.values(normalizedScores).length
  );

  return {
    overall,
    dimensions: normalizedScores,
    interpretation: generatePersonalityInterpretation(overall),
    detailed_interpretations: generateDetailedInterpretations(normalizedScores),
    recommendations: generateRecommendations(normalizedScores)
  };
}

function calculateCognitiveScore(answers: Record<string, number>, questions: any[]): TestNameScore {
  let totalScore = 0;
  let maxScore = 0;
  const sectionScores: Record<string, number> = {};

  Object.entries(answers).forEach(([questionId, answerValue]) => {
    const question = questions.find(q => q.id === questionId);
    
    if (question?.scoring_weights && Array.isArray(question.scoring_weights)) {
      const weights = question.scoring_weights as number[];
      if (answerValue < weights.length) {
        const score = weights[answerValue];
        totalScore += score;
        maxScore += Math.max(...weights);
        
        // Adaugă la secțiunea corespunzătoare
        const section = determineSection(question.question_order);
        sectionScores[section] = (sectionScores[section] || 0) + score;
      }
    }
  });

  const overall = Math.round((totalScore / maxScore) * 100);

  return {
    overall,
    raw_score: totalScore,
    max_score: maxScore,
    section_scores: sectionScores,
    interpretation: generateCognitiveInterpretation(overall),
    level: getCognitiveLevel(overall)
  };
}

function calculateClinicalScore(answers: Record<string, number>, questions: any[]): TestNameScore {
  let totalScore = 0;

  Object.entries(answers).forEach(([questionId, answerValue]) => {
    const question = questions.find(q => q.id === questionId);
    
    if (question?.scoring_weights && Array.isArray(question.scoring_weights)) {
      const weights = question.scoring_weights as number[];
      if (answerValue < weights.length) {
        totalScore += weights[answerValue];
      }
    }
  });

  return {
    total_score: totalScore,
    severity_level: getClinicalSeverityLevel(totalScore),
    interpretation: generateClinicalInterpretation(totalScore),
    recommendations: generateClinicalRecommendations(totalScore)
  };
}

function calculateTeamScore(answers: Record<string, number>, questions: any[]): TestNameScore {
  const roleScores: Record<string, number> = {};

  Object.entries(answers).forEach(([questionId, answerValue]) => {
    const question = questions.find(q => q.id === questionId);
    
    if (question?.scoring_weights && typeof question.scoring_weights === 'object') {
      const weights = question.scoring_weights as Record<string, number[]>;
      
      Object.entries(weights).forEach(([role, roleWeights]) => {
        if (Array.isArray(roleWeights) && answerValue < roleWeights.length) {
          roleScores[role] = (roleScores[role] || 0) + roleWeights[answerValue];
        }
      });
    }
  });

  const dominantRole = Object.entries(roleScores).reduce((a, b) => 
    roleScores[a[0]] > roleScores[b[0]] ? a : b
  )[0];

  return {
    dimensions: roleScores,
    interpretation: generateTeamInterpretation(dominantRole),
    detailed_interpretations: generateTeamDetailedInterpretations(roleScores)
  };
}

// Funcții helper pentru generarea interpretărilor
function generatePersonalityInterpretation(overall: number): string {
  if (overall >= 75) return 'Profil de personalitate foarte dezvoltat';
  if (overall >= 60) return 'Profil de personalitate bun';
  if (overall >= 40) return 'Profil de personalitate mediu';
  return 'Profil de personalitate cu potențial de dezvoltare';
}

function generateCognitiveInterpretation(overall: number): string {
  if (overall >= 80) return 'Abilități cognitive foarte dezvoltate';
  if (overall >= 65) return 'Abilități cognitive bune';
  if (overall >= 50) return 'Abilități cognitive medii';
  return 'Abilități cognitive cu potențial de îmbunătățire';
}

function generateClinicalInterpretation(totalScore: number): string {
  return `Scor total: ${totalScore}. Consultați un specialist pentru interpretarea detaliată.`;
}

function generateTeamInterpretation(dominantRole: string): string {
  return `Rolul tău dominant în echipă este: ${dominantRole}`;
}

function generateDetailedInterpretations(scores: Record<string, number>): Record<string, string> {
  const interpretations: Record<string, string> = {};
  
  Object.entries(scores).forEach(([dimension, score]) => {
    if (score >= 75) {
      interpretations[dimension] = `Scor foarte ridicat la ${dimension}`;
    } else if (score >= 60) {
      interpretations[dimension] = `Scor ridicat la ${dimension}`;
    } else if (score >= 40) {
      interpretations[dimension] = `Scor mediu la ${dimension}`;
    } else {
      interpretations[dimension] = `Scor scăzut la ${dimension}`;
    }
  });
  
  return interpretations;
}

function generateRecommendations(scores: Record<string, number>): string[] {
  const recommendations: string[] = [];
  
  Object.entries(scores).forEach(([dimension, score]) => {
    if (score < 40) {
      recommendations.push(`Dezvoltă competențele în ${dimension}`);
    } else if (score >= 75) {
      recommendations.push(`Valorifică punctele forte în ${dimension}`);
    }
  });
  
  return recommendations;
}

function generateClinicalRecommendations(totalScore: number): string[] {
  const recommendations: string[] = [];
  
  if (totalScore >= 15) {
    recommendations.push('Consultați un specialist în sănătate mentală');
    recommendations.push('Considerați opțiuni de tratament');
  } else if (totalScore >= 10) {
    recommendations.push('Monitorizați simptomele');
    recommendations.push('Aplicați tehnici de gestionare a stresului');
  } else if (totalScore >= 5) {
    recommendations.push('Menținți un stil de viață sănătos');
    recommendations.push('Practicați tehnici de relaxare');
  }
  
  return recommendations;
}

function generateTeamDetailedInterpretations(scores: Record<string, number>): Record<string, string> {
  const interpretations: Record<string, string> = {};
  
  Object.entries(scores).forEach(([role, score]) => {
    interpretations[role] = `Tendință către rolul de ${role}: ${score} puncte`;
  });
  
  return interpretations;
}

function determineSection(questionOrder: number): string {
  // Implementează logica pentru determinarea secțiunii bazată pe ordinea întrebării
  if (questionOrder <= 8) return 'Section1';
  if (questionOrder <= 16) return 'Section2';
  if (questionOrder <= 24) return 'Section3';
  if (questionOrder <= 32) return 'Section4';
  return 'Section5';
}

function getCognitiveLevel(score: number): string {
  if (score >= 80) return 'Excelent';
  if (score >= 65) return 'Bun';
  if (score >= 50) return 'Mediu';
  return 'Sub medie';
}

function getClinicalSeverityLevel(score: number): string {
  if (score >= 15) return 'Sever';
  if (score >= 10) return 'Moderat';
  if (score >= 5) return 'Ușor';
  return 'Minimal';
}
```

#### 4.3 Integrarea în Index
```typescript
// src/utils/testCalculations/index.ts
// Adăugați exportul
export { calculateTestNameScore } from './testNameCalculation';
```

### ETAPA 5: INTEGRAREA ÎN SISTEM

#### 5.1 Integrarea în useTestSubmission
```typescript
// În src/hooks/useTestSubmission.ts
import { calculateTestNameScore } from '@/utils/testCalculations';

// În logica de calculare
if (testName.includes('test-keyword') || testName.includes('alt-keyword')) {
  console.log('Calculating TestName score for answers:', answers);
  score = calculateTestNameScore(answers, questions);
  console.log('TestName score calculated:', score);
}
```

#### 5.2 Integrarea în TestResult.tsx
```typescript
// În src/pages/TestResult.tsx
import { useTestNameCalculation } from '@/hooks/useTestNameCalculation';

// În componenta TestResult
const isTestNameTest = result?.test_types.name.toLowerCase().includes('test-keyword');
const testNameDimensions = useTestNameCalculation(result?.answers, questions);

// În JSX
{isTestNameTest && testNameDimensions && (
  <TestNameResults 
    score={{
      overall: calculateOverallFromDimensions(testNameDimensions),
      dimensions: testNameDimensions,
      interpretation: result.score.interpretation || 'Scor calculat',
      detailed_interpretations: result.score.detailed_interpretations,
      recommendations: result.score.recommendations
    }}
  />
)}
```

### ETAPA 6: CREAREA COMPONENTELOR DE AFIȘARE

#### 6.1 Componenta Results
```typescript
// src/components/test-result/TestNameResults.tsx
import React from 'react';
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { TestNameRadarChart } from '../charts/TestNameRadarChart';

interface TestNameResultsProps {
  score: {
    overall?: number;
    raw_score?: number;
    max_score?: number;
    total_score?: number;
    dimensions?: Record<string, number>;
    section_scores?: Record<string, number>;
    interpretation: string;
    level?: string;
    severity_level?: string;
    detailed_interpretations?: Record<string, string>;
    recommendations?: string[];
  };
}

export const TestNameResults: React.FC<TestNameResultsProps> = ({ score }) => {
  const getScoreLevel = (value: number) => {
    if (value >= 75) return { level: 'Foarte ridicat', variant: 'default' as const };
    if (value >= 60) return { level: 'Ridicat', variant: 'secondary' as const };
    if (value >= 40) return { level: 'Mediu', variant: 'outline' as const };
    return { level: 'Scăzut', variant: 'destructive' as const };
  };

  const getSeverityLevel = (level: string) => {
    switch (level) {
      case 'Minimal': return { variant: 'default' as const };
      case 'Ușor': return { variant: 'secondary' as const };
      case 'Moderat': return { variant: 'outline' as const };
      case 'Sever': return { variant: 'destructive' as const };
      default: return { variant: 'outline' as const };
    }
  };

  return (
    <div className="space-y-6">
      {/* Rezultat General */}
      <Card>
        <CardHeader>
          <CardTitle>Rezultat General TestName</CardTitle>
        </CardHeader>
        <CardContent>
          <div className="text-center space-y-4">
            {score.overall && (
              <div className="text-4xl font-bold text-blue-600">{score.overall}%</div>
            )}
            {score.raw_score && score.max_score && (
              <div className="text-2xl font-bold text-blue-600">
                {score.raw_score} / {score.max_score}
              </div>
            )}
            {score.total_score && (
              <div className="text-2xl font-bold text-blue-600">
                {score.total_score} puncte
              </div>
            )}
            <p className="text-gray-700">{score.interpretation}</p>
            {score.level && (
              <Badge variant="outline">{score.level}</Badge>
            )}
            {score.severity_level && (
              <Badge variant={getSeverityLevel(score.severity_level).variant}>
                {score.severity_level}
              </Badge>
            )}
          </div>
        </CardContent>
      </Card>

      {/* Radar Chart pentru teste de personalitate */}
      {score.dimensions && (
        <TestNameRadarChart data={score.dimensions} />
      )}

      {/* Analiza Dimensiunilor */}
      {score.dimensions && (
        <Card>
          <CardHeader>
            <CardTitle>Analiza Dimensiunilor</CardTitle>
          </CardHeader>
          <CardContent className="space-y-4">
            {Object.entries(score.dimensions).map(([key, value]) => {
              const scoreLevel = getScoreLevel(value);
              
              return (
                <div key={key} className="border rounded-lg p-4">
                  <div className="flex justify-between items-center mb-2">
                    <h4 className="font-medium">{key}</h4>
                    <div className="flex items-center gap-2">
                      <Badge variant={scoreLevel.variant}>{scoreLevel.level}</Badge>
                      <span className="font-bold text-blue-600">{value}%</span>
                    </div>
                  </div>
                  <p className="text-sm text-gray-800">
                    {score.detailed_interpretations?.[key] || 'Interpretare generală'}
                  </p>
                </div>
              );
            })}
          </CardContent>
        </Card>
      )}

      {/* Analiza Secțiunilor pentru teste cognitive */}
      {score.section_scores && (
        <Card>
          <CardHeader>
            <CardTitle>Analiza pe Secțiuni</CardTitle>
          </CardHeader>
          <CardContent className="space-y-4">
            {Object.entries(score.section_scores).map(([section, sectionScore]) => (
              <div key={section} className="border rounded-lg p-4">
                <div className="flex justify-between items-center mb-2">
                  <h4 className="font-medium">{section}</h4>
                  <span className="font-bold text-blue-600">{sectionScore} puncte</span>
                </div>
              </div>
            ))}
          </CardContent>
        </Card>
      )}

      {/* Recomandări */}
      {score.recommendations && score.recommendations.length > 0 && (
        <Card>
          <CardHeader>
            <CardTitle>Recomandări</CardTitle>
          </CardHeader>
          <CardContent>
            <ul className="space-y-2">
              {score.recommendations.map((recommendation, index) => (
                <li key={index} className="flex items-start gap-2">
                  <span className="text-blue-600 font-bold">•</span>
                  <span className="text-gray-700">{recommendation}</span>
                </li>
              ))}
            </ul>
          </CardContent>
        </Card>
      )}
    </div>
  );
};
```

#### 6.2 Componenta Radar Chart
```typescript
// src/components/charts/TestNameRadarChart.tsx
import React from 'react';
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { 
  RadarChart, 
  PolarGrid, 
  PolarAngleAxis, 
  PolarRadiusAxis, 
  Radar, 
  ResponsiveContainer 
} from 'recharts';

interface TestNameRadarChartProps {
  data: Record<string, number>;
}

export const TestNameRadarChart: React.FC<TestNameRadarChartProps> = ({ data }) => {
  const chartData = Object.entries(data).map(([key, value]) => ({
    dimension: key,
    value: value,
    fullMark: 100
  }));

  return (
    <Card>
      <CardHeader>
        <CardTitle>Profilul TestName</CardTitle>
      </CardHeader>
      <CardContent>
        <div className="h-96">
          <ResponsiveContainer width="100%" height="100%">
            <RadarChart data={chartData}>
              <PolarGrid />
              <PolarAngleAxis dataKey="dimension" />
              <PolarRadiusAxis domain={[0, 100]} />
              <Radar
                name="TestName"
                dataKey="value"
                stroke="#3b82f6"
                fill="#3b82f6"
                fillOpacity={0.3}
              />
            </RadarChart>
          </ResponsiveContainer>
        </div>
      </CardContent>
    </Card>
  );
};
```

### ETAPA 7: INTEGRAREA ÎN TESTRESULTCHARTS

#### 7.1 Adăugarea în TestResultCharts
```typescript
// În src/components/test-result/TestResultCharts.tsx
import { TestNameRadarChart } from '../charts/TestNameRadarChart';

// În componenta TestResultCharts
if (testName.toLowerCase().includes('test-keyword')) {
  return <TestNameRadarChart data={score.dimensions} />;
}
```

### ETAPA 8: COMPONENTA DE EXPLICAȚII

#### 8.1 Crearea Componentei de Explicații
```typescript
// src/components/tests/explanations/TestNameExplanation.tsx
import React from 'react';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Badge } from '@/components/ui/badge';
import { Progress } from '@/components/ui/progress';

interface TestNameExplanationProps {
  score: any;
  language: string;
}

const TestNameExplanation: React.FC<TestNameExplanationProps> = ({ score, language }) => {
  console.log('TestNameExplanation score:', score);
  
  // Adaptează în funcție de tipul testului
  const hasValidDimensions = score?.dimensions && Object.keys(score.dimensions).length > 0;
  const hasValidSections = score?.section_scores && Object.keys(score.section_scores).length > 0;
  const hasValidClinicalScore = score?.total_score !== undefined;
  
  if (!hasValidDimensions && !hasValidSections && !hasValidClinicalScore) {
    return (
      <Card className="mb-6">
        <CardHeader>
          <CardTitle>
            {language === 'en' ? 'TestName Results' : 'Rezultate TestName'}
          </CardTitle>
        </CardHeader>
        <CardContent>
          <p className="text-gray-600">
            {language === 'en' 
              ? 'Test results are being processed...'
              : 'Rezultatele testului sunt în procesare...'}
          </p>
        </CardContent>
      </Card>
    );
  }

  return (
    <Card className="mb-6">
      <CardHeader>
        <CardTitle className="flex items-center gap-2">
          {language === 'en' ? 'TestName Results' : 'Rezultate TestName'}
          <Badge variant="outline">
            {language === 'en' ? 'Assessment' : 'Evaluare'}
          </Badge>
        </CardTitle>
      </CardHeader>
      <CardContent className="space-y-6">
        {/* Informații despre test */}
        <div className="bg-blue-50 p-4 rounded-lg">
          <h3 className="font-semibold text-blue-900 mb-2">
            {language === 'en' ? 'About this test' : 'Despre acest test'}
          </h3>
          <p className="text-blue-800 text-sm">
            {language === 'en' 
              ? 'This test evaluates...'
              : 'Acest test evaluează...'}
          </p>
        </div>

        {/* Pentru teste de personalitate */}
        {hasValidDimensions && (
          <div>
            <h3 className="font-semibold mb-4">
              {language === 'en' ? 'Dimension Scores' : 'Scoruri pe Dimensiuni'}
            </h3>
            <div className="space-y-3">
              {Object.entries(score.dimensions)
                .sort(([,a], [,b]) => {
                  const aScore = typeof a === 'number' ? a : 0;
                  const bScore = typeof b === 'number' ? b : 0;
                  return bScore - aScore;
                })
                .map(([dimension, dimensionScore]) => {
                  const scoreValue = typeof dimensionScore === 'number' ? dimensionScore : 0;
                  
                  return (
                    <div key={dimension} className="space-y-2">
                      <div className="flex justify-between items-center">
                        <span className="font-medium text-gray-700">{dimension}</span>
                        <span className="text-sm font-semibold text-gray-900">
                          {Math.round(scoreValue)}%
                        </span>
                      </div>
                      <Progress value={scoreValue} className="h-2" />
                    </div>
                  );
                })}
            </div>
          </div>
        )}

        {/* Pentru teste cognitive */}
        {hasValidSections && (
          <div>
            <h3 className="font-semibold mb-4">
              {language === 'en' ? 'Section Scores' : 'Scoruri pe Secțiuni'}
            </h3>
            <div className="space-y-3">
              {Object.entries(score.section_scores).map(([section, sectionScore]) => {
                const scoreValue = typeof sectionScore === 'number' ? sectionScore : 0;
                
                return (
                  <div key={section} className="flex justify-between items-center">
                    <span className="font-medium text-gray-700">{section}</span>
                    <span className="text-sm font-semibold text-gray-900">
                      {Math.round(scoreValue)} {language === 'en' ? 'pts' : 'pct'}
                    </span>
                  </div>
                );
              })}
            </div>
          </div>
        )}

        {/* Pentru teste clinice */}
        {hasValidClinicalScore && (
          <div>
            <h3 className="font-semibold mb-3">
              {language === 'en' ? 'Clinical Score' : 'Scor Clinic'}
            </h3>
            <div className="flex items-center gap-3 mb-3">
              <Badge variant="default" className="text-lg px-4 py-2">
                {score.total_score} {language === 'en' ? 'points' : 'puncte'}
              </Badge>
              {score.severity_level && (
                <Badge variant="outline">
                  {score.severity_level}
                </Badge>
              )}
            </div>
          </div>
        )}

        {/* Interpretarea rezultatelor */}
        <div className="bg-green-50 p-4 rounded-lg">
          <h4 className="font-semibold text-green-900 mb-2">
            {language === 'en' ? 'How to interpret your results' : 'Cum să îți interpretezi rezultatele'}
          </h4>
          <ul className="text-green-800 text-sm space-y-1">
            <li>• {language === 'en' ? 'Results reflect your current state' : 'Rezultatele reflectă starea ta actuală'}</li>
            <li>• {language === 'en' ? 'Use insights for personal development' : 'Folosește aceste insight-uri pentru dezvoltare personală'}</li>
            <li>• {language === 'en' ? 'Consider professional guidance if needed' : 'Consideră îndrumarea profesională dacă este necesar'}</li>
          </ul>
        </div>
      </CardContent>
    </Card>
  );
};

export default TestNameExplanation;
```

#### 8.2 Integrarea în TestExplanations
```typescript
// În src/components/tests/TestExplanations.tsx
import TestNameExplanation from './explanations/TestNameExplanation';

// În componenta TestExplanations
if (testName.toLowerCase().includes('test-keyword')) {
  return <TestNameExplanation score={score} language={language} />;
}
```

### ETAPA 9: TRADUCERI ȘI INTEGRĂRI

#### 9.1 Adăugarea Traducerilor
```typescript
// În src/utils/testTranslationMapping.ts
export const testNameTranslations = {
  'Opțiunea română': 'English option',
  'Altă opțiune': 'Another option'
};

// În src/utils/testOptionsTranslations.ts
import { testNameTranslations } from './testTranslationMapping';

// Adăugați în funcția translateTestOptions
if (testName.includes('test-keyword')) {
  return options.map(option => {
    if (targetLanguage === 'en') {
      return testNameTranslations[option as keyof typeof testNameTranslations] || option;
    }
    return option;
  });
}
```

#### 9.2 Actualizarea getTestTranslation
```typescript
// În src/utils/testTranslationMapping.ts
export const getTestTranslation = (testName: string, language: string) => {
  const translations: Record<string, { ro: { name: string; description: string }, en: { name: string; description: string } }> = {
    // ... existing translations
    'TestName': {
      ro: {
        name: 'Numele Testului în Română',
        description: 'Descrierea testului în română.'
      },
      en: {
        name: 'TestName in English',
        description: 'Test description in English.'
      }
    }
  };

  // ... rest of function
};
```

## CHECKLIST FINAL DE VERIFICARE

### Verificări Database
```sql
-- Verifică că testul există
SELECT * FROM test_types WHERE id = 'test-id-unique';

-- Verifică întrebările
SELECT COUNT(*) FROM test_questions WHERE test_type_id = 'test-id-unique';

-- Verifică structura scoring_weights
SELECT question_order, scoring_weights FROM test_questions 
WHERE test_type_id = 'test-id-unique' 
ORDER BY question_order 
LIMIT 5;

-- Verifică că categoria există
SELECT tc.name, tt.name FROM test_types tt 
JOIN test_categories tc ON tt.category_id = tc.id 
WHERE tt.id = 'test-id-unique';
```

### Verificări Cod
- [ ] Hook-ul de calculare implementat și funcțional
- [ ] Logica de calculare adaptată tipului de test
- [ ] Componenta Results creată și stilizată
- [ ] Radar chart creat (dacă se aplică)
- [ ] Traduceri adăugate și testate
- [ ] Integrare în TestResult.tsx
- [ ] Integrare în useTestSubmission.ts
- [ ] Integrare în TestResultCharts.tsx
- [ ] Componenta de explicații creată
- [ ] Integrare în TestExplanations.tsx

### Verificări Funcționale
- [ ] Testul apare în categoria corectă
- [ ] Testul poate fi început
- [ ] Întrebările se afișează corect
- [ ] Răspunsurile se salvează
- [ ] Scorul se calculează corect
- [ ] Rezultatele se afișează complet
- [ ] Traducerile funcționează
- [ ] Explicațiile sunt utile
- [ ] Nu apar erori în consolă

### Verificări de Calitate
- [ ] Codul urmează pattern-urile existente
- [ ] Logging adecvat pentru debugging
- [ ] Componente responsive
- [ ] Interpretări și recomandări relevante
- [ ] Gestionarea erorilor implementată
- [ ] Performanță optimizată

## TIPURI DE GREȘELI COMUNE ȘI SOLUȚII

### 1. Probleme cu ID-urile
**Greșeala**: ID-uri duplicate sau inconsistente
**Soluția**: Verifică întotdeauna unicitatea ID-urilor în baza de date

### 2. Probleme cu Scoring Weights
**Greșeala**: Structură inconsistentă în scoring_weights
**Soluția**: Verifică că toate întrebările au aceeași structură

### 3. Probleme cu Traducerile
**Greșeala**: Traduceri lipsă sau incorecte
**Soluția**: Testează în ambele limbi și verifică toate opțiunile

### 4. Probleme cu Hook-urile
**Greșeala**: Hook-uri care nu se actualizează
**Soluția**: Verifică dependențele useMemo și useState

### 5. Probleme cu Componentele
**Greșeala**: Componente care nu se redau
**Soluția**: Verifică props-urile și structura datelor

## PRINCIPII DE MENȚINERE

### 1. Documentație
- Documentează toate schimbările
- Menține comentarii în cod
- Actualizează documentația

### 2. Testare
- Testează fiecare funcționalitate
- Verifică în ambele limbi
- Testează pe diferite dispozitive

### 3. Monitoring
- Monitorizează erorile
- Verifică performanța
- Colectează feedback

### 4. Evoluție
- Adaptează la noi cerințe
- Îmbunătățește componente existente
- Optimizează performanța

---

**IMPORTANT**: Urmează întotdeauna această procedură completă pentru a evita erorile și pentru a menține consistența sistemului!
