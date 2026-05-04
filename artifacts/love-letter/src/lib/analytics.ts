// Analytics utility to track user interactions
export interface AnalyticsEvent {
  type: 'page_view' | 'interaction';
  timestamp: string;
  userAgent: string;
  referrer: string;
  deviceType: string;
  operatingSystem: string;
  browser: string;
  screenResolution: string;
}

// Parse user agent to extract device, OS, and browser info
const parseUserAgent = (ua: string) => {
  // Detect device type
  let deviceType = 'Desktop';
  if (/Mobile|Android|iPhone|iPad|iPod|webOS|BlackBerry|IEMobile|Opera Mini/i.test(ua)) {
    if (/iPad|Tablet/i.test(ua)) {
      deviceType = 'Tablet';
    } else {
      deviceType = 'Mobile';
    }
  }

  // Detect operating system
  let operatingSystem = 'Unknown';
  if (/Windows NT 10/i.test(ua)) operatingSystem = 'Windows 10/11';
  else if (/Windows NT 6.3/i.test(ua)) operatingSystem = 'Windows 8.1';
  else if (/Windows NT 6.2/i.test(ua)) operatingSystem = 'Windows 8';
  else if (/Windows NT 6.1/i.test(ua)) operatingSystem = 'Windows 7';
  else if (/Windows/i.test(ua)) operatingSystem = 'Windows';
  else if (/Mac OS X/i.test(ua)) {
    const match = ua.match(/Mac OS X (\d+[._]\d+)/);
    operatingSystem = match ? `macOS ${match[1].replace('_', '.')}` : 'macOS';
  }
  else if (/Android (\d+\.?\d*)/i.test(ua)) {
    const match = ua.match(/Android (\d+\.?\d*)/i);
    operatingSystem = match ? `Android ${match[1]}` : 'Android';
  }
  else if (/iPhone OS (\d+)/i.test(ua) || /iPad.*OS (\d+)/i.test(ua)) {
    const match = ua.match(/(?:iPhone|iPad).*OS (\d+)/i);
    operatingSystem = match ? `iOS ${match[1]}` : 'iOS';
  }
  else if (/Linux/i.test(ua)) operatingSystem = 'Linux';
  else if (/CrOS/i.test(ua)) operatingSystem = 'Chrome OS';

  // Detect browser
  let browser = 'Unknown';
  if (/Edg\//i.test(ua)) browser = 'Edge';
  else if (/OPR\//i.test(ua) || /Opera/i.test(ua)) browser = 'Opera';
  else if (/Chrome/i.test(ua) && !/Chromium/i.test(ua)) browser = 'Chrome';
  else if (/Safari/i.test(ua) && !/Chrome/i.test(ua)) browser = 'Safari';
  else if (/Firefox/i.test(ua)) browser = 'Firefox';
  else if (/MSIE|Trident/i.test(ua)) browser = 'Internet Explorer';

  return { deviceType, operatingSystem, browser };
};

export const trackPageView = async () => {
  const { deviceType, operatingSystem, browser } = parseUserAgent(navigator.userAgent);
  
  const event: AnalyticsEvent = {
    type: 'page_view',
    timestamp: new Date().toISOString(),
    userAgent: navigator.userAgent,
    referrer: document.referrer || 'direct',
    deviceType,
    operatingSystem,
    browser,
    screenResolution: `${window.screen.width}x${window.screen.height}`,
  };

  // Send to analytics endpoint
  try {
    const apiUrl = import.meta.env.VITE_API_URL || 'http://localhost:3001';
    await fetch(`${apiUrl}/api/analytics`, {
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
