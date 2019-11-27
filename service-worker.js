const cacheVersion = 'version 2';
const cacheFiles = ['/main/index.html', '/main/main.css', '/main/main.js', '/main/push.js'];

self.addEventListener('install', event => {
    event.waitUntil(
        caches.open(cacheVersion).then(cache => {
            cache.addAll(cacheFiles);
        }) //.then(() => { 
        // This activates the service worker and skips the 
        // waiting state for it regardless of any service worker
        // was activated.
        //self.skipWaiting()
        //})
    );
});

//Persistent notifications
self.registration.showNotification('Title 1', {
    actions: [{
        action: 'view',
        title: 'Action Title',
        icon: '/imgs/apple-touch-icon.png'
    }],
    body: 'body text',
    badge: '/img/apple-touch-icon.png',
    icon: '/img/apple-touch-icon.png',
    image: '/img/apple-touch-icon.png',
    //tag: "foo",
    //Makes every notificaion regardless of the tag to notify or 
    //make a sound or buzz  
    //renotify: true,
    data: {},
    requireInteration: false,
    //Only used in persistent notifications
    //actions: [{
    //  action: 'id',
    //  title: 'Action Title',
    //  icon: '/path/to/image.ext'
    //}],
    //Sound properties
    //silent: false,
    //sound: '/path/to/audio.ext',
    //vibrate: [200, 100, 200],
    dir: 'ltr',
    lang: 'en-US',
    //Timestamp that can be read back out in
    //the application
    timestamp: Date.now()
})

//Non-persistent notifications
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

self.addEventListener('notificationclick', event => {
    //if user clicks the body of the notification
    if (!event.action) {
        console.log("Notification body was clicked!");
        return;
    }

    switch (event.action) {
        case 'view':
            console.log('View action clicked!');
            break;
            //other cases for the actions(i.e action: view) can be added
        default:
            console.warn(`${event.action} action clicked!`);
            break;
    }
})

self.addEventListener('activate', event => {
    console.log('Service Worker: Activated');
    event.waitUntil(caches.keys().then(cacheFiles => {
        return Promise.all(cacheFiles.map(cache => {
            if (cache !== cacheVersion) {
                console.log('Service Worker: Clearing Old Cache');
                return caches.delete(cache);
            }
        }))
    }))
});


self.addEventListener('fetch', event => {
    event.respondWith(fetch(event.request).catch(() =>
        caches.match(event.request)
    ))

    //event.respondWith(fetch(event.request).then(res => {
    //    const resClone = res.clone();
    //    caches.open(cacheVersion).then(cache => {
    //        cache.put(event.request, resClone);
    //    });
    //    return res;
    //}).catch(err => caches.match(event.request).then(res => res))
    //)
});

//CacheStorage is an interface.