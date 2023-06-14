// Đây là tên của cache mà Service Worker sử dụng để lưu trữ các tệp tin được cache.
let cacheName = 'hello-pwa';
// Đây là danh sách các tệp tin mà bạn muốn cache trong ứng dụng.
let filesToCache = [
  '/',
  '/index.html',
  '/css/style.css',
  '/js/main.js'
];

self.addEventListener('install', function(e) {
  e.waitUntil(
    caches.open(cacheName).then(function(cache) {
      return cache.addAll(filesToCache);
    })
  );
  // để bỏ qua các quy trình cài đặt khác và kích hoạt ngay lập tức.
  self.skipWaiting();
});


self.addEventListener('fetch', function(e) {
  e.respondWith(
    caches.match(e.request).then(function(response) {
      return response || fetch(e.request);
    })
  );
});