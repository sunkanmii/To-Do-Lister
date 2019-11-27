const codeIsNotWorking = true;
const noErrors = false;

let n = new Promise((resolve, reject) => {
    if(codeIsNotWorking){
        reject("Code is not working.");
    }
    else if(noErrors){
        reject("Errors present in code");
    }
    else{
        resolve("Code is working.");
    }
});

n.then((message) => {
    console.log("Activity: ", message)
})