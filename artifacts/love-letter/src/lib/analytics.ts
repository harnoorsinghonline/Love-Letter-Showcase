// Analytics utility to track user interactions
export interface AnalyticsEvent {
  type: 'page_view' | 'interaction';
  timestamp: string;
  userAgent: string;
  referrer: string;
}

export const trackPageView = async () => {
  const event: AnalyticsEvent = {
    type: 'page_view',
    timestamp: new Date().toISOString(),
    userAgent: navigator.userAgent,
    referrer: document.referrer || 'direct',
  };

  // Send to analytics endpoint
  try {
    await fetch('/api/analytics', {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify(event),
    }).catch(() => {
      // Silently fail if endpoint not available
      console.log('[Analytics] Event tracked locally:', event);
    });
  } catch (error) {
    console.log('[Analytics] Error sending analytics:', error);
  }

  // Also store in localStorage for backup
  const events = JSON.parse(localStorage.getItem('analyticsEvents') || '[]');
  events.push(event);
  localStorage.setItem('analyticsEvents', JSON.stringify(events.slice(-100))); // Keep last 100 events
};

export const getAnalyticsEvents = (): AnalyticsEvent[] => {
  return JSON.parse(localStorage.getItem('analyticsEvents') || '[]');
};
