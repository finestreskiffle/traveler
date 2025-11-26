// Travel Manager Service Worker v3.0.3
const CACHE_VERSION = 'v3.0.3';
const STATIC_CACHE = `travel-manager-static-${CACHE_VERSION}`;
const DYNAMIC_CACHE = `travel-manager-dynamic-${CACHE_VERSION}`;

// Static resources to cache on install
const STATIC_ASSETS = [
    '/',
    '/index.html',
    '/manifest.json',
    '/icon-192.png',
    '/icon-512.png',
    // React & Babel (CDN)
    'https://unpkg.com/react@18/umd/react.production.min.js',
    'https://unpkg.com/react-dom@18/umd/react-dom.production.min.js',
    'https://unpkg.com/@babel/standalone/babel.min.js',
    // Leaflet for maps
    'https://unpkg.com/leaflet@1.9.4/dist/leaflet.css',
    'https://unpkg.com/leaflet@1.9.4/dist/leaflet.js'
];

// API domains that should use network-first strategy
const API_DOMAINS = [
    'api.open-meteo.com',
    'geocoding-api.open-meteo.com'
];

// Install: Cache static assets
self.addEventListener('install', (event) => {
    console.log('[SW] Installing Service Worker v3.0.3');
    event.waitUntil(
        caches.open(STATIC_CACHE)
            .then((cache) => {
                console.log('[SW] Caching static assets');
                return cache.addAll(STATIC_ASSETS);
            })
            .then(() => self.skipWaiting())
    );
});

// Activate: Clean old caches
self.addEventListener('activate', (event) => {
    console.log('[SW] Activating Service Worker v3.0.3');
    event.waitUntil(
        caches.keys()
            .then((cacheNames) => {
                return Promise.all(
                    cacheNames
                        .filter((name) => {
                            return name.startsWith('travel-manager-') && 
                                   name !== STATIC_CACHE && 
                                   name !== DYNAMIC_CACHE;
                        })
                        .map((name) => {
                            console.log('[SW] Deleting old cache:', name);
                            return caches.delete(name);
                        })
                );
            })
            .then(() => self.clients.claim())
    );
});

// Fetch: Smart caching strategy
self.addEventListener('fetch', (event) => {
    const requestUrl = new URL(event.request.url);
    
    if (event.request.method !== 'GET') {
        return;
    }

    const isApiRequest = API_DOMAINS.some(domain => requestUrl.hostname.includes(domain));
    
    if (isApiRequest) {
        event.respondWith(networkFirst(event.request));
    } else if (requestUrl.origin === location.origin || 
               requestUrl.hostname.includes('unpkg.com') ||
               requestUrl.hostname.includes('tile.openstreetmap.org')) {
        event.respondWith(cacheFirst(event.request));
    } else {
        event.respondWith(fetch(event.request));
    }
});

// Cache-First Strategy
async function cacheFirst(request) {
    const cachedResponse = await caches.match(request);
    if (cachedResponse) {
        updateCache(request);
        return cachedResponse;
    }
    
    try {
        const networkResponse = await fetch(request);
        if (networkResponse.ok) {
            const cache = await caches.open(DYNAMIC_CACHE);
            cache.put(request, networkResponse.clone());
        }
        return networkResponse;
    } catch (error) {
        console.log('[SW] Network failed, no cache:', request.url);
        return new Response('Offline', { status: 503, statusText: 'Service Unavailable' });
    }
}

// Network-First Strategy
async function networkFirst(request) {
    try {
        const networkResponse = await fetch(request);
        if (networkResponse.ok) {
            const cache = await caches.open(DYNAMIC_CACHE);
            cache.put(request, networkResponse.clone());
        }
        return networkResponse;
    } catch (error) {
        console.log('[SW] Network failed, trying cache:', request.url);
        const cachedResponse = await caches.match(request);
        if (cachedResponse) {
            return cachedResponse;
        }
        return new Response(JSON.stringify({ error: 'offline', cached: false }), {
            status: 503,
            headers: { 'Content-Type': 'application/json' }
        });
    }
}

// Background cache update
async function updateCache(request) {
    try {
        const networkResponse = await fetch(request);
        if (networkResponse.ok) {
            const cache = await caches.open(DYNAMIC_CACHE);
            cache.put(request, networkResponse);
        }
    } catch (error) {
        // Silently fail
    }
}

// Handle messages
self.addEventListener('message', (event) => {
    if (event.data === 'skipWaiting') {
        self.skipWaiting();
    }
    if (event.data === 'clearCache') {
        caches.keys().then((names) => {
            names.forEach((name) => caches.delete(name));
        });
    }
});

console.log('[SW] Service Worker v3.0.3 loaded');
