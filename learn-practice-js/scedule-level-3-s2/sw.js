const CACHE_NAME = 'schedule-app-v2';
const ASSETS = [
    '/',
    '/index.html',
    '/manifest.json',
    '/schedule-data.json',
    '/app.js?v=7',
    '/modules/Config.js?v=7',
    '/modules/Constants.js?v=7',
    '/modules/Router.js?v=7',
    '/modules/EventBus.js?v=7',
    '/modules/Utils.js?v=7',
    '/modules/CustomSelect.js?v=7',
    '/modules/DataService.js?v=7',
    '/modules/FilterManager.js?v=7',
    '/modules/UIManager.js?v=7',
    '/modules/Icons.js?v=7',
    '/modules/DOMUtils.js?v=7',
    '/modules/components/ScheduleTable.js?v=7',
    '/modules/components/RoomGrid.js?v=7',
    '/css/base/reset.css?v=4',
    '/css/base/variables.css?v=4',
    '/css/layout/layout.css?v=4',
    '/css/components/view-switcher.css?v=4',
    '/css/components/search.css?v=4',
    '/css/components/table.css?v=4',
    '/css/components/inputs.css?v=4',
    '/css/components/tags.css?v=4',
    '/css/components/buttons.css?v=4',
    '/css/components/utilities.css?v=4',
    '/css/components/toast.css?v=4',
    '/css/components/pagination.css?v=4',
    '/assets/meme-friday-1.webp',
    '/assets/meme-friday-2.webp',
    '/assets/meme-friday-3.webp',
    '/assets/meme-friday-4.webp',
    '/assets/meme-friday-5.webp'
];

self.addEventListener('install', (e) => {
    e.waitUntil(
        caches.open(CACHE_NAME).then(async (cache) => {
            for (const asset of ASSETS) {
                try {
                    await cache.add(asset);
                } catch (err) {
                    console.error('SW: Failed to cache', asset, err);
                }
            }
        })
    );
    self.skipWaiting();
});

self.addEventListener('activate', (e) => {
    e.waitUntil(
        caches.keys().then((keys) => {
            return Promise.all(
                keys.map((key) => {
                    if (key !== CACHE_NAME) return caches.delete(key);
                })
            );
        })
    );
    self.clients.claim();
});

self.addEventListener('fetch', (e) => {
    // Stale-While-Revalidate Strategy for JSON data
    if (e.request.url.includes('schedule-data.json')) {
        e.respondWith(
            caches.open(CACHE_NAME).then(async (cache) => {
                const cachedResponse = await cache.match(e.request);
                const fetchPromise = fetch(e.request).then((networkResponse) => {
                    cache.put(e.request, networkResponse.clone());
                    return networkResponse;
                });
                return cachedResponse || fetchPromise;
            })
        );
        return;
    }

    // Cache-First Strategy for static assets
    e.respondWith(
        caches.match(e.request).then((cached) => {
            return cached || fetch(e.request);
        })
    );
});
