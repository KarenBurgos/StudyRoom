/*........................... Elements ..........................*/
var taskname = document.getElementById("taskname")
var newtaskbutton = document.getElementById("newtaskbutton")
var tasksection = document.getElementById("tasksection")
var form = document.getElementById("form");
var hide = document.getElementById("hide")
var hiddenFlag = false

/* ..................... event listeners ........................*/
window.addEventListener("load", showStoragedTasks)
newtaskbutton.addEventListener("click", AddNewTAsk)
form.addEventListener("submit", AddNewTAsk)
tasksection.addEventListener("click", taskFunctions)
hide.addEventListener("click", hideElements)

/* ......................... functions ......................... */

function CreateStructutrTask(element) {
    var divtask = document.createElement("div")
    var check = document.createElement("input")
    var text = document.createElement("p")
    var editbutton = document.createElement("i")
    var deletebutton = document.createElement("i")

    // container of tasks //
    divtask.classList.add("container-task")

    //checkbox properties//
    check.type = "checkbox"
    check.name = "task-done"
    check.classList = "task-done"

    //delete icon properties
    deletebutton.classList.add("delete-button")
    deletebutton.classList.add("fa-solid") //FontAwesome
    deletebutton.classList.add("fa-trash") //FontAwesome

    // task name //
    text.innerText = element
    text.classList.add("task-name")

    // edit task //
    editbutton.classList.add("edit-button")
    editbutton.classList.add("fa-solid") //FontAwesome
    editbutton.classList.add("fa-pen-to-square") //FontAwesome

    divtask.appendChild(check)
    divtask.appendChild(text)
    divtask.appendChild(deletebutton)
    divtask.appendChild(editbutton)

    tasksection.appendChild(divtask)
}

function AddNewTAsk(e) {
    e.preventDefault();

    CreateStructutrTask(taskname.value)
    setLocalStorage(taskname.value)

    taskname.value = ""
}

function editTask(task) {
    var check = task.querySelector(".task-done")
    var editinput = document.createElement("input")
    var finishbutton = document.createElement("button")
    var i = document.querySelector(".edit-button")
    var nametask = task.querySelector(".task-name")
    
    //button properties
    finishbutton.innerText = "ok"
    finishbutton.classList = "accept-changes"

    //input properties
    editinput.type = "text"
    editinput.classList = "change"
    editinput.value = nametask.innerText

    //hide actual task name
    nametask.style.visibility = "hidden";
    check.style.visibility = "hidden";
    i.style.visibility = "hidden"

    //insert input and button to edit task
    check.after(editinput)
    editinput.after(finishbutton)


    finishbutton.addEventListener("click", function () {
        updateLocalStorage(nametask.textContent, editinput.value)
        
        nametask.innerText = editinput.value // change new name of tasj

        finishbutton.remove()//delete edit elements
        editinput.remove()

        nametask.style.visibility = "visible"
        check.style.visibility = "visible";
        i.style.visibility = "visible"
    })
}

function taskFunctions(e) {
    const item = e.target //clicked element
    const task = item.parentElement;

    if (item.classList[0] === "delete-button") {
        var taskItem = task.querySelector(".task-name")
        deleteLocalStorage(taskItem.textContent)
        task.remove()
    }
    else if (item.classList[0] === "edit-button") {
        editTask(task)
    }
    else if (item.classList[0] === "task-done") {
        var nametask = task.querySelector(".task-name")
        var i = task.querySelector("i")
        nametask.classList.toggle("checked")
        task.classList.toggle("checked-div")
    }
}


/* ........................ local storage .......................*/
function getLocalStorage() {
    let tasks

    if(localStorage.getItem('tasks') === null)
        tasks = []
    else
        tasks = JSON.parse(localStorage.getItem('tasks'))

    return tasks
}

function showStoragedTasks() {
    let tasks = getLocalStorage()

    if(tasks.length != 0) {
        for (var i = 0; i < tasks.length; i++){
            var task = JSON.stringify(tasks[i])
            CreateStructutrTask(task.slice(1, -1))
        }
    }
}

function setLocalStorage(task){
    let tasks = getLocalStorage()
    
    tasks.push(task)
    localStorage.setItem('tasks',JSON.stringify(tasks))
}

function deleteLocalStorage(taskItem) {
    let tasks = getLocalStorage()

    tasks.forEach(function(task, index) {
        if(taskItem === task) {
            tasks.splice(index, 1)
        }
    });
    localStorage.setItem('tasks',JSON.stringify(tasks))
}

function updateLocalStorage(taskold, taskNew) {
    let tasks = getLocalStorage()

    tasks.forEach(function(task, index) {
        if(taskold === task) {
            tasks[index] = taskNew
        }
    });

    localStorage.setItem('tasks',JSON.stringify(tasks))
}

/* ........................... clock ...........................*/
function currentTime() {

    var date = new Date(); //current date
    var hour = date.getHours(); //current hour
    var minute = date.getMinutes(); //current minutes
    var second = date.getSeconds(); //current seconds

    if (hour < 10) 
        hour = "0" + hour;
    if (minute < 10)
        minute = "0" + minute;
    if (second < 10)
        second = "0" + second;

    clock = hour + " : " + minute + " : " + second;
    return clock;
}

var h2 = document.createElement("h2") //to display clock

function UpdateTime() { 
    var time = currentTime();
    var timeText = time.toString()

    h2.innerText = timeText
    h2.classList.add("clock")
    console.log(h2)

    var divclock = document.getElementById("reloj");
    divclock.appendChild(h2);
}

setInterval(UpdateTime, 1000);

/* ......................... hide elements ........................*/
function hideElements() {
    var leftcontainer = document.getElementById("container-form")
    var rightcontainer = document.getElementById("widget")
    var animatedBackground = document.getElementById("canvas")

    if (hiddenFlag) {
        leftcontainer.style.visibility = "visible";
        rightcontainer.style.visibility = "visible";
        animatedBackground.className = "hidden"
        hiddenFlag = false
    } 
    else {
        leftcontainer.style.visibility = "hidden";
        rightcontainer.style.visibility = "hidden";
        animatedBackground.removeAttribute("class")
        hiddenFlag = true
    }
}