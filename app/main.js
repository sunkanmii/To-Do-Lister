"use strict";
if ('serviceWorker' in navigator) {
    window.addEventListener("load", () => {
        navigator.serviceWorker.register("./service-worker.js")
        .then(registration => {
            console.log("SW successfully registered: ", registration);
        })
        .catch(err => {
            console.log("Error: ", err);
        });
    });
}
else{
    console.log("service worker not supported.");
}

navigator.serviceWorker.register('/service-worker.js', {
    scope: '/'
});

let worker = new Worker('custom-webworker.js');