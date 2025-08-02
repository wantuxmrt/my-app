// cache.ts
const CACHE_VERSION = 'v1';
const CACHE_NAME = `app-cache-${CACHE_VERSION}`;

export const CacheService = {
  async get<T>(key: string): Promise<T | null> {
    if (!('caches' in window)) return null;
    
    try {
      const cache = await caches.open(CACHE_NAME);
      const response = await cache.match(key);
      
      if (!response) return null;
      
      return await response.json();
    } catch (error) {
      console.error('Cache get error:', error);
      return null;
    }
  },

  async set(key: string, data: any): Promise<void> {
    if (!('caches' in window)) return;
    
    try {
      const cache = await caches.open(CACHE_NAME);
      const response = new Response(JSON.stringify(data), {
        headers: { 'Content-Type': 'application/json' }
      });
      
      await cache.put(key, response);
    } catch (error) {
      console.error('Cache set error:', error);
    }
  },

  async delete(key: string): Promise<boolean> {
    if (!('caches' in window)) return false;
    
    try {
      const cache = await caches.open(CACHE_NAME);
      return await cache.delete(key);
    } catch (error) {
      console.error('Cache delete error:', error);
      return false;
    }
  },

  async clear(): Promise<void> {
    if (!('caches' in window)) return;
    
    try {
      const keys = await caches.keys();
      await Promise.all(
        keys.filter(key => key.startsWith('app-cache'))
             .map(key => caches.delete(key))
      );
    } catch (error) {
      console.error('Cache clear error:', error);
    }
  }
};