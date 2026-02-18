const CACHE_NAME = 'bis-schedule-v5';
const DATA_CACHE_NAME = 'bis-schedule-data-v5';

const ASSETS_TO_CACHE = [
    './',
    './index.html',
    './manifest.json',
    './css/base/variables.css',
    './css/base/reset.css',
    './css/layout/layout.css',
    './css/components/utilities.css',
    './css/components/buttons.css',
    './css/components/inputs.css',
    './css/components/search.css',
    './css/components/tags.css',
    './css/components/table.css',
    './css/components/pagination.css',
    './css/components/view-switcher.css',
    './app.js',
    './modules/Config.js',
    './modules/Utils.js',
    './modules/Icons.js',
    './modules/UIManager.js',
    './modules/CustomSelect.js',
    './modules/DataService.js',
    'https://cdnjs.cloudflare.com/ajax/libs/font-awesome/6.4.0/css/all.min.css',
    'https://cdn.jsdelivr.net/npm/fuse.js@7.0.0'
];

// Install Event: Pre-cache static assets
self.addEventListener('install', (evt) => {
    evt.waitUntil(
        caches.open(CACHE_NAME).then((cache) => {
            console.log('Pre-caching offline pages');
            return cache.addAll(ASSETS_TO_CACHE);
        })
    );
    self.skipWaiting();
});

// Activate Event: Cleanup old caches
self.addEventListener('activate', (evt) => {
    evt.waitUntil(
        caches.keys().then((keyList) => {
            return Promise.all(keyList.map((key) => {
                if (key !== CACHE_NAME && key !== DATA_CACHE_NAME) {
                    console.log('Removing old cache', key);
                    return caches.delete(key);
                }
            }));
        })
    );
    self.clients.claim();
});

// Fetch Event: Handle requests
self.addEventListener('fetch', (evt) => {
    // 1. Handle JSON Data (Stale-While-Revalidate)
    if (evt.request.url.includes('scedule-data.json')) {
        evt.respondWith(
            caches.open(DATA_CACHE_NAME).then((cache) => {
                return cache.match(evt.request).then((cachedResponse) => {
                    const networkFetch = fetch(evt.request).then((networkResponse) => {
                        cache.put(evt.request, networkResponse.clone());
                        return networkResponse;
                    });

                    // Return cached data immediately if available, otherwise wait for network
                    return cachedResponse || networkFetch;
                });
            })
        );
        return;
    }

    // 2. Handle Static Assets (Cache-First)
    evt.respondWith(
        caches.open(CACHE_NAME).then((cache) => {
            return cache.match(evt.request).then((response) => {
                return response || fetch(evt.request);
            });
        })
    );
});
