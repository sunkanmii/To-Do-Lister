const cacheFiles = [
    "/",
    "/app/main-app.html",
    "/app/main-app.js",
    "/app/main-app-css.css",
    "/app/index.html",
    "/app/main.css",
    "/app/main.js",
    "/app/push.js"
];

const staticCacheName = "cache 2";

self.addEventListener("install", event => {
    self.skipWaiting();
    
    event.waitUntil(
        caches.open(staticCacheName)
        .then(cache => {
            return cache.addAll(cacheFiles);
        })
        );
        
});

self.addEventListener("activate", event => {
    console.log("Service worker activated.");

    const cacheWhitelist = [staticCacheName];

    event.waitUntil(
        caches.keys().then(cacheNames => {
            return Promise.all(
                cacheNames.map(cacheName => {
                    if (cacheWhitelist.indexOf(cacheName) === -1) {
                        return caches.delete(cacheName);
                    }
                })
            );
        })
    );
});

self.addEventListener("fetch", event => {
    event.respondWith(
        caches.match(event.request)
        .then(response => {
            if (response) {
                return response;
            }
            console.log("Network request for ", event.request.url);
            return fetch(event.request)
                .then(response => {
                    if (response.status === 404) {

                    }
                    return caches.open(staticCacheName).then(cache => {
                        cache.put(event.request.url, response.clone());
                        return response;
                    });
                });
        })
        .catch(error => {
            console.log("Failed to retrieve files: ", error);
        })
    );
})

//Stil in development.
//Persistent notifications
//self.registration.showNotification('Title 1', {
//    actions: [{
//        action: 'view',
//        title: 'Action Title',
//        icon: '/imgs/apple-touch-icon.png'
//    }],
//    body: 'body text',
//    badge: '/imgs/apple-touch-icon.png',
//    icon: '/imgs/apple-touch-icon.png',
//    image: '/imgs/apple-touch-icon.png',
//    //tag: "foo",
//    //Makes every notificaion regardless of the tag to notify or 
//    //make a sound or buzz  
//    //renotify: true,
//    data: {},
//    requireInteration: false,
//    //Only used in persistent notifications
//    //actions: [{
//    //  action: 'id',
//    //  title: 'Action Title',
//    //  icon: '/path/to/image.ext'
//    //}],
//    //Sound properties
//    //silent: false,
//    //sound: '/path/to/audio.ext',
//    //vibrate: [200, 100, 200],
//    dir: 'ltr',
//    lang: 'en-US',
//    //Timestamp that can be read back out in
//    //the application
//    timestamp: Date.now()
//})
//
////Non-persistent notifications
//let n = new Notification('Title 1', {
//    body: 'body text',
//    badge: '/path/to/image.ext',
//    icon: '/path/to/image.ext',
//    image: 'path/to/image.ext',
//    //tag: "foo",
//    //Makes every notificaion regardless of the tag to notify or 
//    //make a sound or buzz  
//    //renotify: true,
//    data: {},
//    requireInteration: false,
//    //Only used in persistent notifications
//    //actions: [{
//    //  action: 'id',
//    //  title: 'Action Title',
//    //  icon: '/path/to/image.ext'
//    //}],
//    //Sound properties
//    //silent: false,
//    //sound: '/path/to/audio.ext',
//    //vibrate: [200, 100, 200],
//    dir: 'ltr',
//    lang: 'en-US',
//    //Timestamp that can be read back out in
//    //the application
//    timestamp: Date.now() 
//});
//
//self.addEventListener('notificationclick', event => {
//    //if user clicks the body of the notification
//    if (!event.action) {
//        console.log("Notification body was clicked!");
//        return;
//    }
//
//    switch (event.action) {
//        case 'view':
//            console.log('View action clicked!');
//            break;
//            //other cases for the actions(i.e action: view) can be added
//        default:
//            console.warn(`${event.action} action clicked!`);
//            break;
//    }
//})