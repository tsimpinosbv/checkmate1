// Check Mate service worker: η εφαρμογή ανοίγει και χωρίς σήμα στο γήπεδο.
// Άλλαξε τον αριθμό έκδοσης όταν ανεβάζεις νέα αρχεία, για να ανανεωθούν τα κινητά.
const CACHE = "checkmate-v1";
const SHELL = ["./", "./index.html", "./app.html", "./config.js", "./manifest.webmanifest",
  "./icons/logo.svg", "./icons/favicon.png", "./icons/icon-192.png", "./icons/icon-512.png", "./icons/apple-touch-icon.png"];

self.addEventListener("install", e => {
  e.waitUntil(caches.open(CACHE).then(c => c.addAll(SHELL)).then(() => self.skipWaiting()));
});
self.addEventListener("activate", e => {
  e.waitUntil(caches.keys().then(keys => Promise.all(keys.filter(k => k !== CACHE).map(k => caches.delete(k))))
    .then(() => self.clients.claim()));
});
self.addEventListener("fetch", e => {
  const req = e.request;
  if (req.method !== "GET") return;
  const url = new URL(req.url);
  // Αρχεία της εφαρμογής: πρώτα δίκτυο (για ενημερώσεις), αλλιώς cache.
  if (url.origin === location.origin) {
    e.respondWith(fetch(req).then(res => {
      const copy = res.clone(); caches.open(CACHE).then(c => c.put(req, copy)); return res;
    }).catch(() => caches.match(req, { ignoreSearch: true })));
    return;
  }
  // Γραμματοσειρές και βιβλιοθήκη Firebase: πρώτα cache.
  if (url.hostname === "fonts.googleapis.com" || url.hostname === "fonts.gstatic.com" || url.pathname.includes("/firebasejs/")) {
    e.respondWith(caches.match(req).then(hit => hit || fetch(req).then(res => {
      const copy = res.clone(); caches.open(CACHE).then(c => c.put(req, copy)); return res;
    })));
  }
  // Όλα τα υπόλοιπα (π.χ. Firestore, σύνδεση Google) περνούν κανονικά.
});
