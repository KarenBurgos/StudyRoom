// Elements //
var taskname = document.getElementById("taskname")
var newtaskbutton = document.getElementById("newtaskbutton")
var tasksection = document.getElementById("tasksection")
var form = document.getElementById("form");

// Functions //
//document.addEventListener("DOMContentLoaded", getTasks)
newtaskbutton.addEventListener("click", NewTask)
tasksection.addEventListener("click", taskremove)
form.addEventListener("submit", NewTask)
window.addEventListener("load", reloj)
window.addEventListener("load", showLocalStorage)


function actual() {
    var hour = document.createElement("h2")
    var minute = document.createElement("h2")
    var second = document.createElement("h2")
    var div = document.createElement("div")

    var hora, minuto, segundo, fecha, mireloj;

    fecha = new Date(); //Actualizar fecha
    hora = fecha.getHours(); //hora actual
    minuto = fecha.getMinutes(); //minuto actual
    segundo = fecha.getSeconds(); //segundo actual

    if (hora < 10) { //dos cifras para la hora
        hora = "0" + hora;
    }
    if (minuto < 10) { //dos cifras para el minuto
        minuto = "0" + minuto;
    }
    if (segundo < 10) { //dos cifras para el segundo
        segundo = "0" + segundo;
    }


    mireloj = hora + " : " + minuto + " : " + segundo;
    return mireloj;
}

var h2 = document.createElement("h2")
    
function actualizarHora() { //función del temporizador
    mihora = actual(); //recoger hora actual
    var hora = mihora.toString()

    h2.innerText = hora
    h2.classList.add("clock")

    mireloj = document.getElementById("reloj"); //buscar elemento reloj
    
    mireloj.appendChild(h2); //incluir hora en elemento
}

setInterval(actualizarHora, 1000); //iniciar temporizador

function showLocalStorage() { //TODO: separar el agregar tareas  a una funcion aparte
    let tasks = getLocalStorage()
    var num = tasks.length

    if(num != 0) {
        for (var i = 0; i < num; i++){
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
            var task = JSON.stringify(tasks[i])

            text.innerText = task.slice(1, -1)
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
    }
}

function getLocalStorage() {
    let tasks

    if(localStorage.getItem('tasks') === null)
        tasks = []
    else
        tasks = JSON.parse(localStorage.getItem('tasks'))

    return tasks
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

function updateLocalStorage(taskold, taskNew) { //TODO: arreglar
    let tasks = getLocalStorage()

    tasks.forEach(function(task, index) {
        if(taskold === task) {
            tasks[index] = taskNew
        }
    });

    localStorage.setItem('tasks',JSON.stringify(tasks))
}

function NewTask(e) {
    e.preventDefault();
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
    text.innerText = taskname.value
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

    setLocalStorage(taskname.value)

    taskname.value = ""
    //ctrl + K               ctrl +C comentar U descomentar
}

function editTask(task) {
    var checked = task.querySelector(".task-done") //check from task
    var editinput = document.createElement("input") //input to edit task
    var finishbutton = document.createElement("button") // button to confirm changes
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
    // nametask.style.visibility = "hidden";
    checked.style.visibility = "hidden";
    i.style.visibility = "hidden"


    //insert input and button to edit task
    checked.after(editinput)
    editinput.after(finishbutton)


    finishbutton.addEventListener("click", function () {
        updateLocalStorage(nametask.textContent, editinput.value)
        nametask.innerText = editinput.value // change new name of tasj
        //delete edit elements
        finishbutton.remove()
        editinput.remove()
        //make new name visible
        nametask.style.visibility = "visible";
        checked.style.visibility = "visible";
        i.style.visibility = "visible"
    })
}

function taskremove(e) {
    const item = e.target
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

