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
    <button aria-label="delete task" class="delete-task" onclick="DeleteTask(this)">Delete task</button>
    
    <input aria-label="Please enter your task" type = "text" class="user-todo" placeholder="Please input your task"/>
    <input type = "checkbox" class="checkbox-tasks-done" onclick="CompleteTask(this)"/>
    <sunkanmii-progress-circle><span aria-label="progress">0</span>%</sunkanmii-progress-circle>
    
    <section>
        <label class="stop-time-label">Stop Time:</label>
        <input aria-labelledby="stop-time-label" class="custom-time" type="time">
    </section>

    <section class="subtasks">
    <button class="done-button" onclick="SaveTask(this)">Done</button>
        or
    <button class="add-subtask-button" onclick="AddSubtask(this)">Add subtask</button>
    </section>
    </section>`;

    user_tasks.insertAdjacentHTML("beforeend", user_inputs);

    user_tasks = document.querySelector("#user-tasks");
    localStorage.setItem("user_tasks", JSON.stringify(user_tasks.innerHTML));
});

function DeleteTask() {
    delete_tasks = document.querySelectorAll(".delete-task");

    for (let i = 0; i < delete_tasks.length; i++) {
        let element = delete_tasks[i];
        let childElement = user_tasks.children[i];
        user_tasks.removeChild(childElement);
    }

    localStorage.setItem("user_tasks", JSON.stringify(document.querySelector("#user-tasks").innerHTML));
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

    localStorage.clear();
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
        <input type = "checkbox" onclick="CompleteSubtask(this)"/>
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
        subtask += subtaskButtons[i].parentNode.innerHTML;
        subtaskButtons[i].parentNode.innerHTML = subtask;
    }

    localStorage.clear();
    localStorage.setItem("user_tasks", JSON.stringify(document.querySelector("#user-tasks").innerHTML));
}

function CompleteTask(element) {
    let progressNum = element.parentNode.children[6].children[0];
    const subtaskParentNode = element.parentNode.children[8]; //subtasks class node.
    let subtaskChildren = subtaskParentNode.children; //All children in subtasks node.
    const subtaskChildrenLen = subtaskChildren.length;

    if (element.checked === true) {
        progressNum.innerHTML = 100;
        if (subtaskChildren.length != 2) {

            for (let i = 0; i < (subtaskChildrenLen - 2); i++) {
                for (let j = 0; j < 1; j++) {
                    subtaskChildren[i].children[2].checked = true;
                    subtaskChildren[i].children[3].children[0].innerHTML = 100;
                }
            }
        }
    } else {
        progressNum.innerHTML = 0;

        if (subtaskChildren.length != 2) {

            for (let i = 0; i < subtaskChildrenLen - 2; i++) {
                for (let j = 0; j < 1; j++) {
                    subtaskChildren[i].children[2].checked = false;
                    subtaskChildren[i].children[3].children[0].innerHTML = 0;
                }
            }
        }
    }

    localStorage.setItem("user_tasks", JSON.stringify(user_tasks.innerHTML));
}

function CompleteSubtask(element){
    const subtaskParentNode = element.parentNode;
    const subtaskAncestor = element.parentNode.parentNode.parentNode;
    const mainTaskCheckbox = subtaskAncestor.children[5];
    const allSubtasksLen = subtaskAncestor.children[8].children.length - 2;
    let subtaskCompletionQuota = 100 / allSubtasksLen;
    
    const mainTaskCompletionPercentNode = subtaskAncestor.children[6].children[0];
    let mainTaskCompletionPercent = Number(mainTaskCompletionPercentNode.textContent);
    
    if(element.checked === true){
        mainTaskCompletionPercent += subtaskCompletionQuota;
        subtaskParentNode.children[3].children[0].innerHTML = subtaskCompletionQuota.toPrecision(3);
        mainTaskCompletionPercentNode.innerHTML = mainTaskCompletionPercent.toPrecision(3);
    }
    else{
        mainTaskCompletionPercent -= subtaskCompletionQuota;
        subtaskParentNode.children[3].children[0].innerHTML = 0;
        mainTaskCompletionPercentNode.innerHTML = mainTaskCompletionPercent.toPrecision(3);
    }

    if(Number(mainTaskCompletionPercentNode.innerHTML) === 100) {
        mainTaskCheckbox.checked = true;
    }

    localStorage.setItem("user_tasks", JSON.stringify(user_tasks.innerHTML));
}

function SaveTask(element) {
    let taskParentNode = element.parentNode.parentNode;
    let errorMessageNode = taskParentNode.children[2];
    let levelOfRelevanceNode = taskParentNode.children[1];
    let levelOfRelevanceVal = levelOfRelevanceNode.value;
    const userTaskNode = taskParentNode.children[4];
    const userTaskValue = userTaskNode.value;
  
    const levelOfRelevanceValElement = document.createElement("p");
    const lvlOfRelNode = document.createTextNode(levelOfRelevanceVal);
    levelOfRelevanceValElement.appendChild(lvlOfRelNode);

    try {
        if (levelOfRelevanceVal === "" || userTaskValue === ""
            ) {
            throw new Error("Parameter cannot be empty.");
        }
        levelOfRelevanceNode.disabled = "true";
        levelOfRelevanceNode.style.backgroundColor = "white";

        levelOfRelevanceNode.style.border = "none";
    } catch (err) {
        errorMessageNode.textContent = `${err}`;
    }

    localStorage.setItem("user_tasks", JSON.stringify(user_tasks.innerHTML));
}
