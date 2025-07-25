
import { useEffect } from 'react';
import { useAuth } from '@/contexts/AuthContext';
import { toast } from 'sonner';

export const SecurityMonitor = () => {
  const { user } = useAuth();

  useEffect(() => {
    if (!user) return;

    // Monitor for suspicious activities
    const monitorSessionActivity = () => {
      let lastActivity = Date.now();
      const SESSION_TIMEOUT = 30 * 60 * 1000; // 30 minutes
      
      const updateActivity = () => {
        lastActivity = Date.now();
      };
      
      const checkSessionTimeout = () => {
        if (Date.now() - lastActivity > SESSION_TIMEOUT) {
          toast.warning('Session expired due to inactivity. Please sign in again.');
          // In a real app, you would sign out the user here
        }
      };
      
      // Track user activity
      const events = ['mousedown', 'mousemove', 'keypress', 'scroll', 'touchstart'];
      events.forEach(event => {
        document.addEventListener(event, updateActivity, true);
      });
      
      // Check session timeout every minute
      const timeoutInterval = setInterval(checkSessionTimeout, 60000);
      
      return () => {
        events.forEach(event => {
          document.removeEventListener(event, updateActivity, true);
        });
        clearInterval(timeoutInterval);
      };
    };

    // Monitor for multiple tab sessions
    const monitorMultipleTabs = () => {
      const channel = new BroadcastChannel('auth-channel');
      
      channel.addEventListener('message', (event) => {
        if (event.data.type === 'user-signed-in' && event.data.userId !== user.id) {
          toast.warning('This account is being used in another tab or window.');
        }
      });
      
      // Announce this user's session
      channel.postMessage({
        type: 'user-signed-in',
        userId: user.id,
        timestamp: Date.now()
      });
      
      return () => {
        channel.close();
      };
    };

    // Monitor for unusual patterns
    const monitorUnusualActivity = () => {
      const startTime = Date.now();
      let pageViews = 0;
      let rapidClicks = 0;
      let lastClickTime = 0;
      
      const trackPageView = () => {
        pageViews++;
        if (pageViews > 50) { // Unusual number of page views
          console.warn('Unusual activity detected: High page view count');
        }
      };
      
      const trackRapidClicks = () => {
        const now = Date.now();
        if (now - lastClickTime < 100) { // Clicks faster than 100ms
          rapidClicks++;
          if (rapidClicks > 10) {
            console.warn('Unusual activity detected: Rapid clicking pattern');
          }
        } else {
          rapidClicks = 0;
        }
        lastClickTime = now;
      };
      
      document.addEventListener('click', trackRapidClicks);
      window.addEventListener('popstate', trackPageView);
      
      return () => {
        document.removeEventListener('click', trackRapidClicks);
        window.removeEventListener('popstate', trackPageView);
      };
    };

    const cleanupSession = monitorSessionActivity();
    const cleanupTabs = monitorMultipleTabs();
    const cleanupActivity = monitorUnusualActivity();

    return () => {
      cleanupSession();
      cleanupTabs();
      cleanupActivity();
    };
  }, [user]);

  return null; // This component doesn't render anything
};
