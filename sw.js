// Мактабча: keeps the whole game on the phone so it works without internet.
// Bump VERSION whenever any file changes, so phones pick up the new build.
const VERSION = "maktabcha-v1";
const FILES = [
  "./",
  "index.html",
  "manifest.webmanifest",
  "assets/cat.webp",
  "assets/fonts/nunito-cyrillic-ext-wght-normal.woff2",
  "assets/fonts/nunito-cyrillic-wght-normal.woff2",
  "assets/fonts/nunito-latin-wght-normal.woff2",
  "icons/icon-192.png",
  "icons/icon-512.png",
  "icons/maskable-512.png",
  "icons/apple-touch-icon.png",
  "icons/favicon.png"
];

self.addEventListener("install", (event) => {
  event.waitUntil(caches.open(VERSION).then((cache) => cache.addAll(FILES)).then(() => self.skipWaiting()));
});

self.addEventListener("activate", (event) => {
  event.waitUntil(
    caches.keys()
      .then((keys) => Promise.all(keys.filter((k) => k !== VERSION).map((k) => caches.delete(k))))
      .then(() => self.clients.claim())
  );
});

self.addEventListener("fetch", (event) => {
  if (event.request.method !== "GET") return;
  event.respondWith(
    caches.match(event.request, { ignoreSearch: true }).then((hit) => hit || fetch(event.request))
  );
});
