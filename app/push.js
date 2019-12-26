"use strict";
//Steps
//1 - Configure push
//2 - Send message
//3 - Receive message
const pubKey = "BKJC2M-kJVirp6rbpgPa8l96ZvakoYUxXnShzZ_kDArS7rSZlNSAQwV5HXSB_Gkv8UWd_IkivGd4dgmt6m7YIh8";
const pNotiButton = document.querySelector("#PNoti");
var sp = {
    sw: ""
}
// priKey = zO1ViVGwNTkdAvhCMWL_m4mRZS3s7-KCawZOjy_VnA4

if("serviceWorker" in navigator && "PushManager" in window){
    pNotiButton.classList.remove('hidden');

    if(Notification.permission !== 'denied') {
        pNotiButton.disabled = false;
    }

    navigator.serviceWorker.ready.then(sw => {
        sp.sw = sw;
        sw.pushManager.getSubscription().then(s => {
            let isSubscribed = s !== null;

            pNotiButton.style.backgroundColor = isSubscribed ? "lightblue" : "red"; 
        })
    })
};

pNotiButton.addEventListener('click', function(event){
    this.disabled = true;

    sp.sw.pushManager.getSubscription().then(s => {
        if(s !== null){
            s.unsubscribe();

            pNotiButton.style.backgroundColor = "red";
            this.disabled = false;
        }
        else{
            sp.sw.pushManager.subscribe({
                userVisibleOnly: true,
                applicationServerKey: urlB64ToUint8Array(pubKey)
            })
            .then(s => fetch('api/subscription', {
                headers: { 'Content-Type': 'application/json'},
                method: 'POST',
                credentials: 'same-origin',
                body: JSON.stringify(s)
            }))
            .then(res => {
                pNotiButton.style.backgroundColor = "lightblue";
                this.disabled = false;
            })
        }
    })
})

function urlB64ToUint8Array(base64String) {
    const padding = '='.repeat((4 - base64String.length % 4) % 4);
    const base64 = (base64String + padding)
      .replace(/\-/g, '+')
      .replace(/_/g, '/');
  
    const rawData = window.atob(base64);
    const outputArray = new Uint8Array(rawData.length);
  
    for (let i = 0; i < rawData.length; ++i) {
      outputArray[i] = rawData.charCodeAt(i);
    }

    return outputArray;
}