var CACHE_NAME = 'my-site-cache-v1';

//NOTE: Cached below are for the index.html page. Offline page offline.html can also be cached
var urlsToCache = [
    '/',
    '/index.html',
    '/css/style.css',
    '/images/don_transparent.png',
    '/images/gyudon.jpg',
    '/images/katsudon.jpg',
    '/images/tendon.jpg',
    '/images/icons/don.png',
    '/images/icons/don_logo.png',
];

//var offline_url = '/offline.html'

self.addEventListener('install', event => {
    event.waitUntil(
        caches.open(CACHE_NAME)
        .then(function(cache) {
            return cache.addAll(urlsToCache);
        })
    );
});


self.addEventListener('fetch', function(event) {
    event.respondWith(
        caches.match(event.request).then(async function(response) {
            return response || fetch(event.request)
        })
    );
});

//Below is the code to show the offline url instead of the index page
// self.addEventListener('fetch', function(event) {
//     fetch(evt.request)
//     .catch(() => {
//       return caches.open(CACHE_NAME)
//           .then((cache) => {
//             return cache.match(offline_url);
//           });
//     })
// });