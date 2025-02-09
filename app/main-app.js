//main app
"use strict";

const goal_tag = document.querySelector("#goal-tag");
const goal_input = document.querySelector("#goal-input");
const create_new_task_button = document.querySelector("#create-new-task");
const user_tasks = document.querySelector("#user-tasks");

const Counter = function () {
    let customCounter = 0;

    return {
        increment: function () {
            customCounter++;
        },
        setValue: function(newVal){
            customCounter = newVal;
        },
        value: function () {
            return customCounter;
        }
    };
};

const DictVals = function () {
    let cusDic = {};
    return {
        makeDict: function () {
            return cusDic;
        },
        setDict: function (obj) {
            cusDic = obj;
        }
    };
};

const myTasksDictFunc = DictVals();
const myTasksCounter = Counter();
const mySubTasksCounter = Counter();
const mySubTasksDict = DictVals().makeDict();
const completeTasksCounter = Counter();
const completeTasksDict = DictVals().makeDict();
const completeSubTasksCounter = Counter();
const completeSubTasksDict = DictVals().makeDict();

if (typeof (Storage) === "undefined") {
    console.log("Storage not supported");
} else if (localStorage.getItem("user_tasks") !== null || localStorage.getItem("user-goal") !== null) {
    user_tasks.innerHTML = JSON.parse(localStorage.getItem("user_tasks"));
    goal_input.value = JSON.parse(localStorage.getItem("user-goal"));
    DisplayUserValues();
}

create_new_task_button.addEventListener("click", () => {
    const user_inputs = `
    <section class="tasks-created">
    <section class="priority-level-section">
        <button aria-label="Priority marker" class="important-marker" onclick="ChangeColor(this)">&#9733;</button> <input class="priority-level" type="number" disabled/> 
    </section>
    
    <p class="LOR-error-message"></p>
    <!--
        An icon should be here.
    -->
    <button aria-label="delete task" class="delete-task" onclick="DeleteTask(this)">Delete task</button>
    
    <input aria-label="Please enter your task" type = "text" class="user-todo" placeholder="Please input your task"/>
    
    <section class="complete-task">
        <input type = "checkbox" class="checkbox-tasks-done" onclick="CompleteTask(this)" disabled/>
        <sunkanmii-progress-circle><span aria-label="progress">0</span>%</sunkanmii-progress-circle>
    </section>

    <section class="stop-time">
        <label class="stop-time-label">Stop Time:</label>
        <input aria-labelledby="stop-time-label" class="custom-time" type="time">
    </section>

    <section class="subtask">
        <button class="done-button" onclick="SaveTask(this)">Done</button>
        <!--Still in development-->
        <button class="add-subtask-button" onclick="AddSubtask(this)" style="display:none">Add subtask</button>
    </section>
    </section>
    `;

    user_tasks.insertAdjacentHTML("beforeend", user_inputs);

    localStorage.setItem("user_tasks", JSON.stringify(user_tasks.innerHTML));
});

function SaveGoal(element){
    if(element.textContent === "Save"){
        element.textContent = "Edit";
        localStorage.setItem("user-goal", JSON.stringify(goal_input.value));
        goal_input.disabled = true;
    }
    else{
        element.textContent = "Save";
        goal_input.removeAttribute("disabled");
    }
}

function ChangeColor(element) {
    const priorityButtonParentNode = element.parentNode;
    const priorityLvlNode = priorityButtonParentNode.children[1];

    if (priorityLvlNode.hasAttribute("disabled")) {
        element.style.color = "black";
        priorityLvlNode.removeAttribute("disabled");
    } else {
        element.style.color = "white";
        priorityLvlNode.disabled = true;
    }
}

function DeleteTask(element) {
    const userTaskParentNode = element.parentNode.parentNode;
    const userTaskNode = element.parentNode;

    userTaskParentNode.removeChild(userTaskNode);

    localStorage.removeItem("user_tasks");

    localStorage.setItem("user_tasks", JSON.stringify(user_tasks.innerHTML));
}

function DeleteSubTask(element) {
    const userSubTaskParentNode = element.parentNode.parentNode;
    const userSubTaskNode = element.parentNode;

    userSubTaskParentNode.removeChild(userSubTaskNode);

    localStorage.removeItem("user_tasks");

    localStorage.setItem("user_tasks", JSON.stringify(user_tasks.innerHTML));
}

function AddSubtask(element) {
    let subtask = `    
    <section class="user-subtask">
        <!--
        An icon should be here.
        -->
        <button aria-label="delete task" class="delete-subtask" onclick="DeleteSubTask(this)">Delete subtask</button>

        <input aria-label="Please enter your task" type = "text" class="user-todo" placeholder="Please input your task"/>
        
        <section class="complete-subtask">
            <input type = "checkbox" onclick="CompleteSubtask(this)" disabled/>
            <sunkanmii-progress-circle><span aria-label="progress">0</span>%</sunkanmii-progress-circle>
        </section>

        <section class="stop-time">
            <label class="stop-time-label">Stop Time:</label>
            <input aria-labelledby="stop-time-label" class="custom-time" type="time">
            <time></time>
        </section>
            
        <section class="save-subtask">
            <button class="done-button" onclick="SaveSubTask(this)">Done</button> 
        </section>
    </section>
            `
    const userSubTaskParentNode = element.parentNode;

    userSubTaskParentNode.insertAdjacentHTML("beforebegin", subtask);

    localStorage.clear();
    localStorage.setItem("user_tasks", JSON.stringify(user_tasks.innerHTML));
}

function CompleteTask(element) {
    let progressNum = element.parentNode.children[1].children[0];
    const subtaskParentNode = element.parentNode.parentNode.children[6]; //subtasks class node.
    let subtaskChildren = subtaskParentNode.children; //All children in subtasks node.
    const subtaskChildrenLen = subtaskChildren.length;

    if (element.checked === true) {
        progressNum.textContent = 100;

        //completeTasksDict[String()]

        localStorage.setItem("tasks_checked");
        if (subtaskChildren.length != 2) {

            for (let i = 0; i < (subtaskChildrenLen - 2); i++) {
                for (let j = 0; j < 1; j++) {
                    subtaskChildren[i].children[2].checked = true;
                    subtaskChildren[i].children[3].children[0].textContent = 100;
                }
            }
        }
    } else {
        progressNum.textContent = 0;

        completeTasksDict[String(completeTasksCounter.increment)] = element.checked;

        if (subtaskChildren.length != 2) {
            for (let i = 0; i < subtaskChildrenLen - 2; i++) {
                for (let j = 0; j < 1; j++) {
                    subtaskChildren[i].children[2].checked = false;
                    completeSubTasksDict[String(completeSubTasksCounter.increment)] = subtaskChildren[i].children[2].checked;
                    subtaskChildren[i].children[3].children[0].textContent = 0;
                }
            }
        }
    }

    localStorage.setItem("user_tasks", JSON.stringify(user_tasks.innerHTML));
}

function CompleteSubtask(element) {
    const subtaskParentNode = element.parentNode;
    const subtaskAncestor = element.parentNode.parentNode.parentNode;
    const mainTaskCheckbox = subtaskAncestor.children[5];
    const allSubtasksLen = subtaskAncestor.children[8].children.length - 2;
    let subtaskCompletionQuota = 100 / allSubtasksLen;

    const mainTaskCompletionPercentNode = subtaskAncestor.children[6].children[0];
    let mainTaskCompletionPercent = Number(mainTaskCompletionPercentNode.textContent);

    if (element.checked === true) {
        mainTaskCompletionPercent += subtaskCompletionQuota;
        subtaskParentNode.children[3].children[0].innerHTML = subtaskCompletionQuota.toPrecision(3);
        mainTaskCompletionPercentNode.innerHTML = mainTaskCompletionPercent.toPrecision(3);
    } else {
        mainTaskCompletionPercent -= subtaskCompletionQuota;
        subtaskParentNode.children[3].children[0].textContent = 0;
        mainTaskCompletionPercentNode.innerHTML = mainTaskCompletionPercent.toPrecision(3);
    }

    if (Number(mainTaskCompletionPercentNode.innerHTML) === 100) {
        mainTaskCheckbox.checked = true;
    }

    localStorage.setItem("user_tasks", JSON.stringify(user_tasks.innerHTML));
}

function SaveTask(element) {
    if(localStorage.getItem("user_tasks_values") !== null){
        let dictInStor = JSON.parse(localStorage.getItem("user_tasks_values"));
        myTasksDictFunc.setDict(dictInStor);
        myTasksCounter.setValue(Object.keys(dictInStor).length);
    }
    
    const myTasksDict = myTasksDictFunc.makeDict();
    const taskParentNode = element.parentNode.parentNode;
    const errorMessageNode = taskParentNode.children[1];
    const levelOfRelevanceNode = taskParentNode.children[0].children[1];
    const levelOfRelevanceValue = levelOfRelevanceNode.value;

    myTasksCounter.increment();
    myTasksDict[String(myTasksCounter.value())] = levelOfRelevanceValue;
    const userTaskNode = taskParentNode.children[3];
    const userTaskValue = userTaskNode.value;

    myTasksCounter.increment();
    myTasksDict[String(myTasksCounter.value())] = userTaskValue;
    const stopTimeNode = taskParentNode.children[5].children[1];
    const stopTimeValue = stopTimeNode.value;

    myTasksCounter.increment();
    myTasksDict[String(myTasksCounter.value())] = stopTimeValue;
    const completeTaskCheckBox = taskParentNode.children[4].children[0];

    try {
        if (userTaskValue === "" || stopTimeValue === "") {
            throw new InvalidArgumentException("Input cannot be empty.");
        } else if (element.textContent === "Edit") {
            errorMessageNode.style.display = "none";

            levelOfRelevanceNode.removeAttribute("disabled");
            levelOfRelevanceNode.style.border = "2px solid rgb(238, 238, 238)";

            userTaskNode.removeAttribute("disabled");
            userTaskNode.style.border = "2px solid rgb(238, 238, 238)";

            stopTimeNode.removeAttribute("disabled");
            stopTimeNode.style.border = "2px solid rgb(238, 238, 238)";

            completeTaskCheckBox.disabled = true;

            element.textContent = "Done";
        } else {
            errorMessageNode.style.display = "none";

            levelOfRelevanceNode.disabled = true;
            levelOfRelevanceNode.value = levelOfRelevanceValue; //To save user's value in localStorage
            levelOfRelevanceNode.style.border = "none";

            userTaskNode.disabled = true;
            userTaskNode.value = userTaskValue;
            userTaskNode.style.border = "none";

            stopTimeNode.disabled = true;
            stopTimeNode.value = stopTimeNode.value;
            stopTimeNode.style.border = "none";

            completeTaskCheckBox.removeAttribute("disabled");

            element.textContent = "Edit";
        }
    } catch (err) {
        errorMessageNode.style.display = "block";
        errorMessageNode.textContent = `${err}`;
    }

    localStorage.setItem("user_tasks", JSON.stringify(user_tasks.innerHTML));
    localStorage.setItem("user_tasks_values", JSON.stringify(myTasksDict));
}

//Still in development.
function SaveSubTask(element) {
    const subTaskParentNode = element.parentNode.parentNode;
    const errorMessageNode = subTaskParentNode.children[2];
    const userSubTaskNode = subTaskParentNode.children[1];
    const userSubTaskValue = userSubTaskNode.value;

    mySubTasksCounter.increment();
    mySubTasksDict[String(mySubTasksCounter.value())] = userSubTaskValue;

    console.log(dictVals[1]);
    const stopTimeNode = subTaskParentNode.children[3].children[1];
    const stopTimeValue = stopTimeNode.value;

    mySubTasksCounter.increment();
    mySubTasksDict[String(mySubTasksCounter.value())] = stopTimeValue;
    const completeSubTaskCheckBox = subTaskParentNode.children[2];

    try {
        if (userSubTaskValue === "" || stopTimeValue === "") {
            throw new Error("Parameter cannot be empty.");
        } else if (element.textContent === "Edit") {
            userSubTaskNode.removeAttribute("disabled");
            userSubTaskNode.style.border = "2px solid rgb(238, 238, 238)";

            stopTimeNode.removeAttribute("disabled");
            stopTimeNode.style.border = "2px solid rgb(238, 238, 238)";

            completeSubTaskCheckBox.disabled = true;

            element.textContent = "Done";
        } else {
            userSubTaskNode.disabled = true;
            userSubTaskNode.style.border = "none";

            stopTimeNode.disabled = true;
            stopTimeNode.style.border = "none";

            completeSubTaskCheckBox.removeAttribute("disabled");

            element.textContent = "Edit";
        }
    } catch (err) {
        errorMessageNode.textContent = `${err}`;
    }

    localStorage.setItem("user_tasks", JSON.stringify(user_tasks.innerHTML));
    localStorage.setItem("user_subtasks_values", JSON.stringify(mySubTasksDict));
}


function DisplayUserValues() {
    if (localStorage.getItem("user_tasks_values") !== null && localStorage.getItem("user_subtasks_values") !== null) {
        let dictVals = JSON.parse(localStorage.getItem("user_subtasks_values"));
        let userSubTasksHTML = user_tasks.children;
        userSubTasksHTML.children[1].value = dictVals[1];
    } else if (localStorage.getItem("user_tasks_values") !== null) {
        const dictVals = JSON.parse(localStorage.getItem("user_tasks_values"))
        const userTasksLen = user_tasks.childElementCount;

        let j = 0;
        for (let i = 0; i < userTasksLen; i++) {
            j++;
            //Priority level node
            user_tasks.children[i].children[0].children[1].value = Number(dictVals[j]);
            j++;
            //User task node
            user_tasks.children[i].children[3].value = dictVals[j];
            j++;
            //Stop time node
            user_tasks.children[i].children[5].children[1].value = dictVals[j];
        }
    }
}