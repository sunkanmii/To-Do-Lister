//main app
"use strict";

const create_new_task_button = document.querySelector("#create-new-task");
let user_tasks = document.querySelector("#user-tasks");
let tasks_list = "";
let delete_tasks = "";

if (typeof (Storage) == "undefined") {
    console.log("Storage not supported");
} else if (localStorage.getItem("user_tasks") != null) {
    user_tasks.innerHTML = JSON.parse(localStorage.getItem("user_tasks"));
}

create_new_task_button.addEventListener("click", () => {
    const user_inputs = `
    <section class="tasks-created"> 
    <span class="important-marker">&#9733;</span> <input class="level-of-importance" type="number"/> 
    <p class="LOR-error-message"></p>
    <!--
        An icon should be here.
    -->
    <button aria-label="delete task" class="delete-task" onclick="DeleteTask()">Delete task</button>
    
    <input aria-label="Please enter your task" type = "text" class="user-todo" placeholder="Please input your task"/>
    <input type = "checkbox" class="checkbox-tasks-done" onclick="IncreasePercentage()"/>
    <sunkanmii-progress-circle><span aria-label="progress">0</span>%</sunkanmii-progress-circle>
    
    <section>
        <label class="stop-time-label">Stop Time:</label>
        <input aria-labelledby="stop-time-label" class="custom-time" type="time">
    </section>

    <section class="subtasks">
    <button class="done-button" onclick="SaveTask()">Done</button>
        or
    <button class="add-subtask-button" onclick="AddSubtask()">Add subtask</button> 
    </section>
    </section>`;

    user_tasks = document.querySelector("#user-tasks");

    user_tasks.innerHTML += user_inputs;
    AddSubtask();
    DeleteTask();
    localStorage.setItem("user_tasks", JSON.stringify(user_tasks.innerHTML));

});

function DeleteTask() {
    delete_tasks = document.querySelectorAll(".delete-task");

    for (let i = 0; i < delete_tasks.length; i++) {
        let element = delete_tasks[i];
        let childElement = user_tasks.children[i];

        element.addEventListener("click", () => {
            user_tasks.removeChild(childElement);
        })
    }
        localStorage.setItem("user_tasks", JSON.stringify(user_tasks.innerHTML));
}

function DeleteSubTask() {
    delete_tasks = document.querySelectorAll(".delete-sub-task");

    for (let i = 0; i < delete_tasks.length; i++) {
        let element = delete_tasks[i];
        let childElement = user_tasks.children[i];
        let parentElement = delete_tasks.parentNode.parentNode;
        element.addEventListener("click", () => {
            user_tasks.removeChild(childElement);
        })
    }

    localStorage.removeItem("user_tasks");
    localStorage.setItem("user_tasks", JSON.stringify(document.querySelector("#user-tasks").innerHTML));
}

function AddSubtask() {
    let subtask = `    
    <section class="user-subtask">
        <!--
        An icon should be here.
        -->
        <button aria-label="delete task" class="delete-task">Delete subtask</button>
    
        <input aria-label="Please enter your task" type = "text" class="user-todo" placeholder="Please input your task"/>
        <input type = "checkbox" class="checkbox-subtasks"/>
        <sunkanmii-progress-circle><span aria-label="progress">0</span>%</sunkanmii-progress-circle>
        
        <section>
            <label class="stop-time-label">Stop Time:</label>
            <input aria-labelledby="stop-time-label" class="custom-time" type="time">
        </section>
            
            <section>
                <button class="done-button">Done</button> 
            </section>
    </section>
            `
    let subtaskButtons = document.querySelectorAll(".add-subtask-button");

    for (let i = 0; i < subtaskButtons.length; i++) {
        let element = subtaskButtons[i];

        element.addEventListener("click", () => {
            subtask += subtaskButtons[i].parentNode.innerHTML;
            subtaskButtons[i].parentNode.innerHTML = subtask;
        })
    }

    localStorage.removeItem("user_tasks");
    localStorage.setItem("user_tasks", JSON.stringify(document.querySelector("#user-tasks").innerHTML));
}

function IncreasePercentage() {
    let progressCheckboxs = document.querySelectorAll(".checkbox-tasks-done");
    let progressNums = document.querySelectorAll(".tasks-created sunkanmii-progress-circle span");

    if (document.querySelectorAll(".checkbox-subtasks").length != 0) {
        let userSubtasks = document.querySelectorAll(".subtasks");
        let checkboxSubtasks = document.querySelectorAll(".checkbox-subtasks");
        let subtasksProgressNums = document.querySelectorAll(".user-subtask sunkanmii-progress-circle span");

        for (let i = 0; i < progressCheckboxs.length; i++) {

            if (userSubtasks[i].children.length == 2) {
                progressNums[i].innerHTML = "100";
            } else {
                progressNums[i].innerHTML = "100";

                for (let j = 0; j < userSubtasks[i].children.length - 2; j++) {
                    checkboxSubtasks[j].checked = true;
                    subtasksProgressNums[j].innerHTML = "100";
                }
            }
        }
    } else {
        for (let i = 0; i < progressCheckboxs.length; i++) {
            if (progressCheckboxs[i].checked == true) {
                progressNums[i].innerHTML = 100;
            } else {
                progressCheckboxs[i].checked = true;
                progressNums[i].innerHTML = 0;
            }
        }
    }
}

function SaveTask() {
    let levelOfRelevance = document.querySelectorAll(".level-of-importance");
    let levelOfRelevanceErrMsg = document.querySelectorAll(".LOR-error-message");
    let levelOfRelevanceVal = 0;
    
    let i = 0;
    let LORLen = levelOfRelevance.length;
    let LORErrMsgLen = levelOfRelevanceErrMsg.length;
    try{
        for(let i = 0; i < LORLen; i++){
            levelOfRelevanceVal = levelOfRelevance[i].innerHTML;
        }
    }
    catch(err){
        for(let i = 0; i < LORErrMsgLen; i++){
            levelOfRelevanceErrMsg[i].innerHTML = `Error: ${err}`; 
        }    
    }
}

