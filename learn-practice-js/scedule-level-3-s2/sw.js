const CACHE_NAME = "schedule-app-v" + Date.now();
const ASSETS = [
  "./",
  "./index.html",
  "./manifest.json",
  "./schedule-data.json",
  "./app.js",
  "./modules/Config.js",
  "./modules/Utils.js",
  "./modules/CustomSelect.js",
  "./modules/DataService.js",
  "./modules/FilterManager.js",
  "./modules/UIManager.js",
  "./modules/Icons.js",
  "./modules/DOMUtils.js",
  "./modules/LiveDashboard.js",
  "./modules/components/ScheduleTable.js",
  "./modules/utils/ScheduleProcessor.js",
  "./modules/utils/TimeUtils.js",
  "./modules/workers/SearchWorker.js",
  "./css/base/reset.css",
  "./css/base/variables.css",
  "./css/layout/layout.css",
  "./css/components/search.css",
  "./css/components/table.css",
  "./css/components/inputs.css",
  "./css/components/tags.css",
  "./css/components/buttons.css",
  "./css/components/utilities.css",
  "./css/components/pagination.css",
  "./css/components/live-dashboard.css",
  "./assets/meme-friday-1.webp",
  "./assets/meme-friday-2.webp",
  "./assets/meme-friday-3.webp",
  "./assets/meme-friday-4.webp",
  "./assets/meme-friday-5.webp",
];

self.addEventListener("install", (e) => {
  e.waitUntil(caches.open(CACHE_NAME).then((cache) => cache.addAll(ASSETS)));
  self.skipWaiting();
});

self.addEventListener("activate", (e) => {
  e.waitUntil(
    caches.keys().then((keys) => {
      return Promise.all(
        keys.map((key) => {
          if (key !== CACHE_NAME) return caches.delete(key);
        }),
      );
    }),
  );
  self.clients.claim();
});

// Strategy:
// 1. Dev (localhost): Network Only (Always fresh)
// 2. Production: Stale-While-Revalidate (Fast load, updates in background)

self.addEventListener("fetch", (e) => {
  const url = new URL(e.request.url);

  // 1. Ignore unsupported schemes (chrome-extension, etc.)
  if (url.protocol !== "http:" && url.protocol !== "https:") {
    return;
  }

  // 2. Dev (localhost): Network Only (Always fresh)
  // Simply return without calling respondWith() to let browser handle natively
  const isDev = url.hostname === "localhost" || url.hostname === "127.0.0.1";
  if (isDev) {
    return;
  }

  // PRODUCTION MODE: Stale-While-Revalidate
  // 1. Return cached version immediately (Fast)
  // 2. Fetch new version in background & update cache (Maintenance)
  e.respondWith(
    caches.open(CACHE_NAME).then(async (cache) => {
      const cachedResponse = await cache.match(e.request);

      const fetchPromise = fetch(e.request)
        .then((networkResponse) => {
          // Update cache with new version
          if (networkResponse && networkResponse.status === 200) {
            cache.put(e.request, networkResponse.clone());
          }
          return networkResponse;
        })
        .catch(() => {
          // If offline and no cache, returns undefined (handled by browser usually)
        });

      // Return cached response if available, otherwise wait for network
      return cachedResponse || fetchPromise;
    }),
  );
});
