// Travel Manager - Service Worker v2.4.0
const CACHE_NAME = 'travel-manager-v2.4.0';
const STATIC_CACHE = 'travel-manager-static-v2.4.0';
const DYNAMIC_CACHE = 'travel-manager-dynamic-v2.4.0';

// Files to cache immediately on install
const STATIC_FILES = [
    '/',
    '/index.html',
    '/manifest.json',
    '/icon-192.png',
    '/icon-512.png'
];

// External resources to cache
const EXTERNAL_RESOURCES = [
    'https://unpkg.com/react@18/umd/react.production.min.js',
    'https://unpkg.com/react-dom@18/umd/react-dom.production.min.js',
    'https://unpkg.com/@babel/standalone/babel.min.js',
    'https://unpkg.com/leaflet@1.9.4/dist/leaflet.css',
    'https://unpkg.com/leaflet@1.9.4/dist/leaflet.js'
];

// Install event - cache static files
self.addEventListener('install', event => {
    console.log('[SW] Installing Service Worker v2.4.0...');
    event.waitUntil(
        Promise.all([
            caches.open(STATIC_CACHE).then(cache => {
                console.log('[SW] Caching static files...');
                return cache.addAll(STATIC_FILES);
            }),
            caches.open(DYNAMIC_CACHE).then(cache => {
                console.log('[SW] Caching external resources...');
                return Promise.allSettled(
                    EXTERNAL_RESOURCES.map(url => 
                        fetch(url).then(response => {
                            if (response.ok) {
                                return cache.put(url, response);
                            }
                        }).catch(() => console.log('[SW] Could not cache:', url))
                    )
                );
            })
        ]).then(() => {
            console.log('[SW] Installation complete');
            return self.skipWaiting();
        })
    );
});

// Activate event - clean old caches
self.addEventListener('activate', event => {
    console.log('[SW] Activating Service Worker v2.4.0...');
    event.waitUntil(
        caches.keys().then(cacheNames => {
            return Promise.all(
                cacheNames.map(cacheName => {
                    if (cacheName !== STATIC_CACHE && cacheName !== DYNAMIC_CACHE && cacheName !== CACHE_NAME) {
                        console.log('[SW] Deleting old cache:', cacheName);
                        return caches.delete(cacheName);
                    }
                })
            );
        }).then(() => {
            console.log('[SW] Activation complete');
            return self.clients.claim();
        })
    );
});

// Fetch event - serve from cache, fallback to network
self.addEventListener('fetch', event => {
    const { request } = event;
    const url = new URL(request.url);

    // Skip non-GET requests
    if (request.method !== 'GET') {
        return;
    }

    // API requests (weather, geocoding) - Network first, cache fallback
    if (url.hostname.includes('open-meteo.com')) {
        event.respondWith(
            fetch(request)
                .then(response => {
                    const responseClone = response.clone();
                    caches.open(DYNAMIC_CACHE).then(cache => {
                        cache.put(request, responseClone);
                    });
                    return response;
                })
                .catch(() => {
                    return caches.match(request).then(cachedResponse => {
                        if (cachedResponse) {
                            console.log('[SW] Serving weather from cache:', url.pathname);
                            return cachedResponse;
                        }
                        return new Response(JSON.stringify({ error: 'Offline' }), {
                            headers: { 'Content-Type': 'application/json' }
                        });
                    });
                })
        );
        return;
    }

    // OpenStreetMap tiles - Cache first, network fallback
    if (url.hostname.includes('tile.openstreetmap.org')) {
        event.respondWith(
            caches.match(request).then(cachedResponse => {
                if (cachedResponse) {
                    return cachedResponse;
                }
                return fetch(request).then(response => {
                    const responseClone = response.clone();
                    caches.open(DYNAMIC_CACHE).then(cache => {
                        cache.put(request, responseClone);
                    });
                    return response;
                });
            })
        );
        return;
    }

    // Static files - Cache first with stale-while-revalidate
    event.respondWith(
        caches.match(request).then(cachedResponse => {
            if (cachedResponse) {
                if (url.origin === location.origin) {
                    fetch(request).then(response => {
                        if (response.ok) {
                            caches.open(STATIC_CACHE).then(cache => {
                                cache.put(request, response);
                            });
                        }
                    }).catch(() => {});
                }
                return cachedResponse;
            }

            return fetch(request).then(response => {
                if (response.ok) {
                    const responseClone = response.clone();
                    caches.open(DYNAMIC_CACHE).then(cache => {
                        cache.put(request, responseClone);
                    });
                }
                return response;
            }).catch(error => {
                console.log('[SW] Fetch failed:', error);
                if (request.mode === 'navigate') {
                    return caches.match('/index.html');
                }
                throw error;
            });
        })
    );
});

// Background sync for future use
self.addEventListener('sync', event => {
    if (event.tag === 'sync-trips') {
        console.log('[SW] Background sync triggered');
    }
});

// Push notifications for future use
self.addEventListener('push', event => {
    if (event.data) {
        const data = event.data.json();
        console.log('[SW] Push notification received:', data);
    }
});

console.log('[SW] Service Worker v2.4.0 loaded');
