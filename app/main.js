"use strict";
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

function doAsync(){
    let p = new Promise(function (resolve, reject) {
        console.log('in promise code');

        setTimeout(function(){
            console.log("There is fun in function :).");
        }, 200)
    })
}

//Review
//ES2015 concepts and syntax.
//Asynchronous functions with error handling
function doAsync(){
    let x = 1;
    
    let p = new Promise(function(resolve, reject){
        if(x === 1){
            resolve("x is equal to 1.");
            return "Jackson";
        }
        else{
            reject("x is not equal to 1.");
        }
    })

    p.then(x => {
        console.log(x);
    }).catch(err => {
        console.log(err);
    })
};

doAsync();

// You can make no mistakes only if you concentrate on the task at hand.
// Declaring variables
// console.log(aVariable);

var aVariable = "time 1";

if (aVariable === "time 1") {
    var aVariable = "time 2"
    // If this were to be declared with const or let, 
    // block scoping would have taken effect.
}

// If a variable declared using let were to be inside a for loop
// and was returned to a function, it would print out the final value (because it
// takes the function as a closure).

let updateFunctions = [];

for(var i = 0; i < 2; i++) {
    updateFunctions.push(function() { return i; }); //2 returned
}

for(let i = 0; i < 2; i++) {
    updateFunctions.push(function() { return i; }); //1 returned
}

console.log(updateFunctions[0]());

console.log(aVariable);
// let does away with hoisting.
// Block scoping effect is now in JS.

let title = "Sunkanami Fafowora";

console.log(title.startsWith("Sunkanmi"));

// Side - Octal values begin with the letter 0 followed by 
// the letter o;

// Template Literals (or string template with interpolated variables 
// and expressions)
  
let age = '40';
console.log(`Age is ${age}`);

//By escaping the $ sign no interpolation takes place.
console.log(`Age is \${age}`);
                                //rest operator
function processInvoice(segments, ...values) {
    console.log(segments);
    console.log(values);
}
 
let invoiceNum = '1350';
let amount = '2000';

processInvoice `Invoice: ${invoiceNum} for ${amount}`;

// Arrow Functions.
let arrFunc = () => 5.99;
console.log(arrFunc);

var invoice = {
    number: 123,
    //When using arrow functions, the value of the 'this' keyword does
    //change.

    process: function() {
        return () => console.log(this.number);
    }
};

var newInvoice = {
    number: 456
};

invoice.process().bind(newInvoice)();

// for...of loop
let names = [ "Sunkanmi", "Precious" ];

for(var item in names){
    console.log(item);
}
