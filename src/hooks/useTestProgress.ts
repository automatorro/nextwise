
import { useState, useEffect, useCallback, useRef } from 'react';

interface TestProgress {
  testId: string;
  currentQuestionIndex: number;
  answers: { [questionId: string]: number };
  startedAt: string;
}

export const useTestProgress = (testId: string) => {
  const [savedProgress, setSavedProgress] = useState<TestProgress | null>(null);
  const [isInitialized, setIsInitialized] = useState(false);
  const mounted = useRef(true);

  const getStorageKey = useCallback((id: string) => `test_progress_${id}`, []);

  // Check for existing progress when hook initializes - only once
  useEffect(() => {
    if (!testId || isInitialized) return;
    
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
          if (mounted.current) {
            setSavedProgress(progress);
          }
        } else {
          // Clean up old progress
          localStorage.removeItem(storageKey);
        }
      } catch (error) {
        console.error('Error parsing saved test progress:', error);
        localStorage.removeItem(storageKey);
      }
    }
    
    setIsInitialized(true);
  }, [testId, getStorageKey, isInitialized]);

  const saveProgress = useCallback((currentQuestionIndex: number, answers: { [questionId: string]: number }) => {
    if (!testId || !isInitialized) return;
    
    const progress: TestProgress = {
      testId,
      currentQuestionIndex,
      answers,
      startedAt: savedProgress?.startedAt || new Date().toISOString()
    };
    
    const storageKey = getStorageKey(testId);
    localStorage.setItem(storageKey, JSON.stringify(progress));
    console.log('Test progress saved:', progress);
  }, [testId, savedProgress?.startedAt, getStorageKey, isInitialized]);

  const clearProgress = useCallback(() => {
    if (!testId) return;
    
    const storageKey = getStorageKey(testId);
    localStorage.removeItem(storageKey);
    setSavedProgress(null);
    console.log('Test progress cleared for test:', testId);
  }, [testId, getStorageKey]);

  const restoreProgress = useCallback(() => {
    return savedProgress;
  }, [savedProgress]);

  const hasSavedProgress = useCallback(() => {
    return savedProgress !== null && Object.keys(savedProgress.answers || {}).length > 0;
  }, [savedProgress]);

  // Cleanup on unmount
  useEffect(() => {
    return () => {
      mounted.current = false;
    };
  }, []);

  return {
    hasSavedProgress: hasSavedProgress(),
    savedProgress,
    saveProgress,
    clearProgress,
    restoreProgress,
    isInitialized
  };
};
