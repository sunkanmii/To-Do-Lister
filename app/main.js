"use strict";
if(!('serviceWorker' in navigator)){
    console.log('sw not supported.');
}
navigator.serviceWorker.register('/service-worker.js')
.then(function(registration){
    console.log('SW registered! Scope is:', registration.scope);
}).catch((err) => {
    console.log("Error :", err);
})

navigator.serviceWorker.register('/service-worker.js', {scope: '/'});

let worker = new Worker('custom-webworker.js');