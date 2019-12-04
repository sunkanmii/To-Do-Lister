let weekDates = document.getElementById("dateWeeks");

// function displayWeeks(){
    
// }

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

//Console methods
const laptops = [
    {
        name: "Dell"    
    },
    {
        name: "Hp"
    },
    {
        name: "Acer"
    },
    {
        name: "Apple"
    }
];

console.table(laptops);
