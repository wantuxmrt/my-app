// tracker.ts
export class AnalyticsTracker {
  private static instance: AnalyticsTracker;
  private enabled = true;

  private constructor() {}

  static getInstance(): AnalyticsTracker {
    if (!AnalyticsTracker.instance) {
      AnalyticsTracker.instance = new AnalyticsTracker();
    }
    return AnalyticsTracker.instance;
  }

  trackEvent(eventName: string, properties: Record<string, any> = {}) {
    if (!this.enabled || !window.analytics) return;
    
    try {
      window.analytics.track(eventName, {
        ...properties,
        timestamp: new Date().toISOString()
      });
    } catch (error) {
      console.error('Analytics tracking error:', error);
    }
  }

  identifyUser(userId: string, traits: Record<string, any> = {}) {
    if (!this.enabled || !window.analytics) return;
    
    try {
      window.analytics.identify(userId, traits);
    } catch (error) {
      console.error('Analytics identify error:', error);
    }
  }

  disable() {
    this.enabled = false;
  }

  enable() {
    this.enabled = true;
  }
}

export const analytics = AnalyticsTracker.getInstance();