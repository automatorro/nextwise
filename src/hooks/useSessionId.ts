
import { useState, useEffect } from 'react';
import { useAuth } from '@/contexts/AuthContext';

export const useSessionId = () => {
  const { user } = useAuth();
  const [sessionId, setSessionId] = useState<string>('');

  useEffect(() => {
    if (user?.id) {
      // Generate a unique session ID for this mentoring session
      const newSessionId = `${user.id}-${Date.now()}-${Math.random().toString(36).substr(2, 9)}`;
      setSessionId(newSessionId);
    }
  }, [user?.id]);

  return sessionId;
};
