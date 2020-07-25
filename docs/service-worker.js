importScripts('https://storage.googleapis.com/workbox-cdn/releases/3.6.3/workbox-sw.js');
if(workbox){
    workbox.precaching.precacheAndRoute([
        { url: '/', revision: '1' },
        { url: '/index.html', revision: '1' },
        { url: '/sidnav.html', revision: '1' },
        { url: '/manifest.json', revision: '1' },
        { url: '/assets/css/materialize/materialize.min.css', revision: '1' },
        { url: '/assets/css/style.css', revision: '1' },
        { url: '/assets/img/no-pict-01.png', revision: '1' },
        { url: '/assets/img/icons/icon-72x72.png', revision: '1' },
        { url: '/assets/img/icons/icon-96x96.png', revision: '1' },
        { url: '/assets/img/icons/icon-128x128.png', revision: '1' },
        { url: '/assets/img/icons/icon-144x144.png', revision: '1' },
        { url: '/assets/img/icons/icon-152x152.png', revision: '1' },
        { url: '/assets/img/icons/icon-192x192.png', revision: '1' },
        { url: '/assets/img/icons/icon-384x384.png', revision: '1' },
        { url: '/assets/img/icons/icon-512x512.png', revision: '1' },
        { url: '/assets/js/materialize/materialize.min.js', revision: '1' },
        { url: '/assets/js/api.js', revision: '1' },
        { url: '/assets/js/core.js', revision: '1' },
        { url: '/assets/js/idb.js', revision: '1' },
        { url: '/assets/js/sidnav.js', revision: '1' },
        { url: '/assets/js/register.js', revision: '1' },
    ]);

    // strategi network first
    workbox.routing.registerRoute(
        new RegExp('https://api.football-data.org/v2/'),
        workbox.strategies.networkFirst({
            networkTimeoutSeconds: 1,
            cacheName: 'aisb'
        })
    )

    // batasi penyimpnan cache
    workbox.routing.registerRoute(
        /.*(?:png|gif|jpg|jpeg|svg)$/,
        workbox.strategies.cacheFirst({
            cacheName: 'img',
            plugins: [
                new workbox.cacheableResponse.Plugin({
                    statuses: [0, 200]
                }),
                new workbox.expiration.Plugin({
                    maxEntries: 100,
                    maxAgeSeconds: 30 * 24 * 60 * 60, //30day
                }),
            ],
        }),
    )
}else{
    console.log('workbox gagal diproses');
}

self.addEventListener('push', e => {
    var body;
    if(e.data) {
        body = e.data.text();
    }else{
        body = 'This is pushmessage nopayload';
    }
    var options = {
        body: body,
        icon: 'assets/img/icons/icon-144x144.png',
        vibrate: [100, 50, 100],
        data: {
            dateOfArrival: Date.now(),
            primaryKey: 1
        }
    };
    e.waitUntil(
        self.registration.showNotification('Push Notification', options)
    );
});