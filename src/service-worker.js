self.addEventListener("install", (event) => {
  event.waitUntil(
    caches.open("my-cache").then((cache) => {
      return cache.addAll(["/", "/index.html"]);
    })
  );
});

self.addEventListener("fetch", function (event) {
  event.respondWith(
    caches.open("my-cache").then((cache) => {
      return cache.match(event.request).then((response) => {
        if (response) return response;

        return fetch(event.request.clone()).then((response) => {
          if (response.status < 400 && response.headers.has("content-type")) {
            cache.put(event.request, response.clone());
          }
          return response;
        });
      });
    })
  );
});
