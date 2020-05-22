importScripts(
  "https://storage.googleapis.com/workbox-cdn/releases/3.6.3/workbox-sw.js"
);

if (workbox) console.log(`Workbox berhasil dimuat`);
else console.log(`Workbox gagal dimuat`);

workbox.precaching.precacheAndRoute(
  [
    { url: "/manifest.json", revision: "1" },
    { url: "/nav.html", revision: "1" },
    { url: "/index.html", revision: "1" },
    { url: "/team.html", revision: "1" },
    { url: "/pages/home.html", revision: "1" },
    { url: "/pages/teams.html", revision: "1" },
    { url: "/pages/favorite.html", revision: "1" },
    { url: "/css/custom.css", revision: "1" },
    { url: "/css/materialize.min.css", revision: "1" },
    { url: "/js/api.js", revision: "1" },
    { url: "/js/db.js", revision: "1" },
    { url: "/js/dom.js", revision: "1" },
    { url: "/js/idb.js", revision: "1" },
    { url: "/js/materialize.min.js", revision: "1" },
    { url: "/js/nav.js", revision: "1" },
    { url: "/js/notification.js", revision: "1" },
    { url: "/img/background.jpg", revision: "1" },
    { url: "/img/na.png", revision: "1" },
    { url: "/img/icons/icon-72x72.png", revision: "1" },
    { url: "/img/icons/icon-96x96.png", revision: "1" },
    { url: "/img/icons/icon-128x128.png", revision: "1" },
    { url: "/img/icons/icon-144x144.png", revision: "1" },
    { url: "/img/icons/icon-152x152.png", revision: "1" },
    { url: "/img/icons/icon-192x192.png", revision: "1" },
    { url: "/img/icons/icon-384x384.png", revision: "1" },
    { url: "/img/icons/icon-512x512.png", revision: "1" },
  ]
);

workbox.routing.registerRoute(
  new RegExp("/"),
  workbox.strategies.staleWhileRevalidate({
    cacheName: "footballnet-cache"
  })
);

workbox.routing.registerRoute(
  new RegExp("https://api.football-data.org/v2/"),
  workbox.strategies.staleWhileRevalidate({
    cacheName: "footballnet-content",
    ignoreURLParametersMatching: [/.*/],
  })
);

workbox.routing.registerRoute(
  /\.(?:png|jpg|jpeg|svg)$/,
  workbox.strategies.cacheFirst({
    cacheName: "footballnet-images",
    plugins: [
      new workbox.expiration.Plugin({
        maxEntries: 60,
        maxAgeSeconds: 30 * 24 * 60 * 60, // 30 hari
      }),
    ],
  })
);

//PUSH NOTIFICATION
self.addEventListener("push", function (event) {
  let body;
  if (event.data) {
    body = event.data.text();
  } else {
    body = "Push message no payload";
  }
  const options = {
    body: body,
    icon: "img/icons/icon-144x144.png",
    vibrate: [100, 50, 100],
    data: {
      dateOfArrival: Date.now(),
      primaryKey: 1,
    },
  };
  event.waitUntil(
    self.registration.showNotification("Push Notification", options)
  );
});
