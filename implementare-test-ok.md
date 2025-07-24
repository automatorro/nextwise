
# FRAMEWORK STANDARD PENTRU IMPLEMENTAREA TESTELOR PSIHOLOGICE

## OVERVIEW
Acest document oferă un framework standardizat pentru implementarea testelor psihologice în platformă, bazat pe lecțiile învățate din implementările anterioare și pe best practices-urile stabilite.

## PRINCIPII FUNDAMENTALE

### 1. Consistență în Implementare
- Toate testele urmează același pattern de implementare
- Reutilizăm componente și hook-uri existente
- Păstrăm aceeași structură de fișiere

### 2. Bazarea pe Scoring Weights din Baza de Date
- Nu hardcodăm logica de scoring în cod
- Folosim `scoring_weights` din baza de date pentru calcularea scorurilor
- Permitem flexibilitate în structura testelor

### 3. Separarea Responsabilităților
- Hook-uri pentru calcularea scorurilor
- Componente specializate pentru afișarea rezultatelor
- Fișiere separate pentru logica de calculare

## PROCEDURA PAS CU PAS

### ETAPA 1: PREGĂTIRE ȘI PLANIFICARE

#### 1.1 Verificarea Structurii în Baza de Date
- [ ] Testul este creat în `test_types` cu toate câmpurile
- [ ] Întrebările sunt în `test_questions` cu `scoring_weights` corect
- [ ] Scoring weights acoperă toate dimensiunile testului
- [ ] Verificarea că nu există conflicte cu testele existente

#### 1.2 Identificarea Dimensiunilor Testului
- [ ] Listarea tuturor dimensiunilor din `scoring_weights`
- [ ] Definirea intervalelor de interpretare pentru fiecare dimensiune
- [ ] Stabilirea logicii de calcul overall (dacă se aplică)

### ETAPA 2: IMPLEMENTAREA HOOK-ULUI DE CALCULARE

#### 2.1 Crearea Hook-ului Personalizat
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

    // Inițializarea scorurilor pentru fiecare dimensiune
    const dimensionScores: Record<string, number> = {};
    const dimensionCounts: Record<string, number> = {};

    // Calcularea scorurilor bazată pe scoring_weights din baza de date
    Object.entries(answers).forEach(([questionId, answerValue]) => {
      const question = questions.find(q => q.id === questionId);
      
      if (question?.scoring_weights) {
        const weights = question.scoring_weights as Record<string, number[]>;
        
        Object.entries(weights).forEach(([dimension, dimensionWeights]) => {
          if (answerValue < dimensionWeights.length) {
            dimensionScores[dimension] = (dimensionScores[dimension] || 0) + dimensionWeights[answerValue];
            dimensionCounts[dimension] = (dimensionCounts[dimension] || 0) + 1;
          }
        });
      }
    });

    // Normalizarea scorurilor la 0-100
    const normalizedScores: Record<string, number> = {};
    Object.entries(dimensionScores).forEach(([dimension, score]) => {
      const count = dimensionCounts[dimension];
      if (count > 0) {
        // Adaptați această logică în funcție de sistemul de scoring al testului
        const maxPossibleScore = count * (getMaxScorePerQuestion()); // Implementați această funcție
        normalizedScores[dimension] = Math.round((score / maxPossibleScore) * 100);
      }
    });

    console.log('TestName calculated scores:', normalizedScores);
    return normalizedScores;
  }, [answers, questions]);
};
```

#### 2.2 Checklist pentru Hook
- [ ] Hook-ul returnează `null` dacă nu există answers sau questions
- [ ] Calcularea se bazează pe `scoring_weights` din baza de date
- [ ] Scorurile sunt normalizate la 0-100
- [ ] Există console.log pentru debugging
- [ ] Hook-ul este optimizat cu `useMemo`

### ETAPA 3: IMPLEMENTAREA CALCULĂRII SCORULUI

#### 3.1 Crearea Fișierului de Calculare
```typescript
// src/utils/testCalculations/testNameCalculation.ts
export interface TestNameScore {
  overall: number;
  dimensions: Record<string, number>;
  interpretation: string;
  detailed_interpretations?: Record<string, string>;
  recommendations?: string[];
}

export const calculateTestNameScore = (answers: Record<string, number>, questions: any[]): TestNameScore => {
  console.log('Calculating TestName score for answers:', answers);
  
  // Calcularea dimensiunilor bazată pe scoring_weights
  const dimensionScores: Record<string, number> = {};
  const dimensionCounts: Record<string, number> = {};

  Object.entries(answers).forEach(([questionId, answerValue]) => {
    const question = questions.find(q => q.id === questionId);
    
    if (question?.scoring_weights) {
      const weights = question.scoring_weights as Record<string, number[]>;
      
      Object.entries(weights).forEach(([dimension, dimensionWeights]) => {
        if (answerValue < dimensionWeights.length) {
          dimensionScores[dimension] = (dimensionScores[dimension] || 0) + dimensionWeights[answerValue];
          dimensionCounts[dimension] = (dimensionCounts[dimension] || 0) + 1;
        }
      });
    }
  });

  // Normalizarea la 0-100
  const normalizedScores: Record<string, number> = {};
  Object.entries(dimensionScores).forEach(([dimension, score]) => {
    const count = dimensionCounts[dimension];
    if (count > 0) {
      const maxPossibleScore = count * getMaxScorePerQuestion();
      normalizedScores[dimension] = Math.round((score / maxPossibleScore) * 100);
    }
  });

  // Calcularea scorului general
  const overall = Math.round(
    Object.values(normalizedScores).reduce((sum, score) => sum + score, 0) / 
    Object.values(normalizedScores).length
  );

  // Generarea interpretării
  const interpretation = generateInterpretation(overall);

  return {
    overall,
    dimensions: normalizedScores,
    interpretation,
    detailed_interpretations: generateDetailedInterpretations(normalizedScores),
    recommendations: generateRecommendations(normalizedScores)
  };
};

// Funcții helper
function getMaxScorePerQuestion(): number {
  // Implementați în funcție de sistemul de scoring al testului
  return 5; // Exemplu pentru scale Likert 1-5
}

function generateInterpretation(overall: number): string {
  if (overall >= 75) return 'Scor foarte ridicat';
  if (overall >= 60) return 'Scor ridicat';
  if (overall >= 40) return 'Scor mediu';
  return 'Scor scăzut';
}

function generateDetailedInterpretations(dimensions: Record<string, number>): Record<string, string> {
  const interpretations: Record<string, string> = {};
  
  Object.entries(dimensions).forEach(([dimension, score]) => {
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

function generateRecommendations(dimensions: Record<string, number>): string[] {
  const recommendations: string[] = [];
  
  Object.entries(dimensions).forEach(([dimension, score]) => {
    if (score < 40) {
      recommendations.push(`Dezvoltă competențele în ${dimension}`);
    }
  });
  
  return recommendations;
}
```

#### 3.2 Integrarea în Index
```typescript
// src/utils/testCalculations/index.ts
// Adăugați exportul
export { calculateTestNameScore } from './testNameCalculation';
```

### ETAPA 4: INTEGRAREA ÎN TESTRESULT.TSX

#### 4.1 Adăugarea Logicii în TestResult
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
      interpretation: result.score.interpretation || 'Scor calculat'
    }}
  />
)}
```

### ETAPA 5: CREAREA COMPONENTEI RESULTS

#### 5.1 Componenta de Rezultate
```typescript
// src/components/test-result/TestNameResults.tsx
import React from 'react';
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { TestNameRadarChart } from '../charts/TestNameRadarChart';

interface TestNameResultsProps {
  score: {
    overall: number;
    dimensions: Record<string, number>;
    interpretation: string;
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

  return (
    <div className="space-y-6">
      <Card>
        <CardHeader>
          <CardTitle>Rezultat General TestName</CardTitle>
        </CardHeader>
        <CardContent>
          <div className="text-center space-y-4">
            <div className="text-4xl font-bold text-blue-600">{score.overall}%</div>
            <p className="text-gray-700">{score.interpretation}</p>
          </div>
        </CardContent>
      </Card>

      <TestNameRadarChart data={score.dimensions} />

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

      {score.recommendations && score.recommendations.length > 0 && (
        <Card>
          <CardHeader>
            <CardTitle>Recomandări de Dezvoltare</CardTitle>
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

### ETAPA 6: INTEGRAREA ÎN TESTSUBMISSION

#### 6.1 Adăugarea în useTestSubmission
```typescript
// În src/hooks/useTestSubmission.ts
import { calculateTestNameScore } from '@/utils/testCalculations';

// În logica de calculare
if (testName.includes('test-keyword')) {
  score = calculateTestNameScore(answers, questions);
}
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

### ETAPA 8: CREAREA RADAR CHART (OPȚIONAL)

#### 8.1 Componenta Radar Chart
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

## CHECKLIST FINAL DE IMPLEMENTARE

### Verificări Obligatorii
- [ ] Hook-ul de calculare este creat și funcțional
- [ ] Calcularea se bazează pe scoring_weights din baza de date
- [ ] Componenta Results afișează corect toate dimensiunile
- [ ] Testul este integrat în TestResult.tsx
- [ ] Testul este integrat în useTestSubmission.ts
- [ ] Radar chart este creat (dacă se aplică)
- [ ] Testul apare în TestResultCharts.tsx
- [ ] Nu există erori TypeScript
- [ ] Nu se strică funcționalitatea testelor existente

### Verificări de Calitate
- [ ] Codul urmează pattern-urile existente
- [ ] Există logging pentru debugging
- [ ] Componentele sunt responsive
- [ ] Interpretările sunt utile pentru utilizatori
- [ ] Recomandările sunt relevante
- [ ] Nu există hardcoding în calcularea scorurilor

### Testare
- [ ] Testul poate fi completat end-to-end
- [ ] Rezultatele se afișează corect
- [ ] Toate dimensiunile sunt calculate
- [ ] Interpretările se afișează
- [ ] Recomandările se afișează (dacă există)
- [ ] Radar chart funcționează (dacă există)

## PRINCIPII DE MENȚINERE

### 1. Flexibilitate
- Calcularea se bazează pe baza de date, nu pe cod hardcodat
- Ușor de modificat interpretările fără a schimba codul

### 2. Reutilizabilitate
- Componente care pot fi adaptate pentru alte teste
- Hook-uri care urmează același pattern

### 3. Scalabilitate
- Ușor de adăugat noi dimensiuni
- Suportă orice număr de întrebări

### 4. Maintainability
- Cod curat și documentat
- Separarea responsabilităților
- Pattern-uri consistente

## EXEMPLE DE UTILIZARE

Pentru a implementa un test nou, urmați acești pași:

1. Verificați că testul este în baza de date cu scoring_weights
2. Creați hook-ul de calculare
3. Creați fișierul de calculare
4. Creați componenta Results
5. Integrați în TestResult.tsx
6. Integrați în useTestSubmission.ts
7. Creați radar chart (opțional)
8. Testați end-to-end

**IMPORTANT**: Întotdeauna urmați această procedură pas cu pas pentru a evita erorile și inconsistențele!
