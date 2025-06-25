
import { useState, useEffect } from 'react';

interface TestProgress {
  testId: string;
  currentQuestionIndex: number;
  answers: { [questionId: string]: number };
  startedAt: string;
}

export const useTestProgress = (testId: string) => {
  const [savedProgress, setSavedProgress] = useState<TestProgress | null>(null);

  const getStorageKey = (id: string) => `test_progress_${id}`;

  // Check for existing progress when hook initializes
  useEffect(() => {
    if (!testId) return;
    
    const storageKey = getStorageKey(testId);
    const saved = localStorage.getItem(storageKey);
    
    if (saved) {
      try {
        const progress = JSON.parse(saved) as TestProgress;
        // Only consider progress if it's less than 24 hours old
        const startedTime = new Date(progress.startedAt).getTime();
        const now = new Date().getTime();
        const hoursDiff = (now - startedTime) / (1000 * 60 * 60);
        
        if (hoursDiff < 24) {
          setSavedProgress(progress);
        } else {
          // Clean up old progress
          localStorage.removeItem(storageKey);
        }
      } catch (error) {
        console.error('Error parsing saved test progress:', error);
        localStorage.removeItem(storageKey);
      }
    }
  }, [testId]);

  const saveProgress = (currentQuestionIndex: number, answers: { [questionId: string]: number }) => {
    if (!testId) return;
    
    const progress: TestProgress = {
      testId,
      currentQuestionIndex,
      answers,
      startedAt: savedProgress?.startedAt || new Date().toISOString()
    };
    
    const storageKey = getStorageKey(testId);
    localStorage.setItem(storageKey, JSON.stringify(progress));
    console.log('Test progress saved:', progress);
  };

  const clearProgress = () => {
    if (!testId) return;
    
    const storageKey = getStorageKey(testId);
    localStorage.removeItem(storageKey);
    setSavedProgress(null);
    console.log('Test progress cleared for test:', testId);
  };

  const restoreProgress = () => {
    return savedProgress;
  };

  const hasSavedProgress = () => {
    return savedProgress !== null && Object.keys(savedProgress.answers).length > 0;
  };

  return {
    hasSavedProgress: hasSavedProgress(),
    savedProgress,
    saveProgress,
    clearProgress,
    restoreProgress
  };
};
