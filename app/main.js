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

//main app
const create_new_task_button = document.querySelector("#create-new-task");
const user_tasks = document.querySelector("#user-tasks");    
let tasks_list = "";
let delete_tasks = "";

create_new_task_button.addEventListener("click", () => {
    const user_inputs = `
    <section class="tasks-created">
            <span class="important-marker">&#9733; <input type="number"/></span> 
            
            <!--
                An icon should be here.
            -->
            <button aria-label="delete task" class="delete-task">Delete task</button>
            
            <input aria-label="Please enter your task" type = "text" class="user-todo" placeholder="Please input your task"/>
            <input type = "checkbox" name="completed-mark"/>
            <sunkanmii-progress-circle><span aria-label="progress">0</span>%</sunkanmii-progress-circle>
            
            <section>
                <label class="stop-time-label">Stop Time:</label>
                <input aria-labelledby="stop-time-label" class="custom-time" type="time">
            </section>

            <section>
                <button class="done-button">Done</button>
                or
                <button class="subtask-button">Add subtask</button> 
            </section>
    </section>`;

    user_tasks.innerHTML += user_inputs;
    DeleteTask();
});

function DeleteTask(){
    delete_tasks = document.querySelectorAll(".delete-task");

    for(let i = 0; i < delete_tasks.length; i++){
        let element = delete_tasks[i];
        let childElement = user_tasks.children[i];

        element.addEventListener("click", () => {
            user_tasks.removeChild(childElement);
        })
    }
}
