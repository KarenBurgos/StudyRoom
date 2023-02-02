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


function actual() {
    var hour = document.createElement("h2")
    var minute = document.createElement("h2")
    var second = document.createElement("h2")
    var div = document.createElement("div")

    var hora, minuto, segundo, fecha, mireloj;

    fecha = new Date(); //Actualizar fecha.
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

// function actual() {
//     var hour = document.createElement("h2")
//     var minute = document.createElement("h2")
//     var second = document.createElement("h2")
//     var reloj = document.createElement("div")

//     var hora, minuto, segundo, fecha;

//     fecha = new Date(); //Actualizar fecha.
//     hora = fecha.getHours(); //hora actual
//     minuto = fecha.getMinutes(); //minuto actual
//     segundo = fecha.getSeconds(); //segundo actual

//     if (hora < 10) { //dos cifras para la hora
//         // hora = "0" + hora;
//         hour.innerText("0" + hora)
//     }
//     if (minuto < 10) { //dos cifras para el minuto
//         // minuto = "0" + minuto;
//         minute.innerText("0" + minuto)
//     }
//     if (segundo < 10) { //dos cifras para el segundo
//         // segundo = "0" + segundo;
//         second.innerText("0" + second)
//     }
//     reloj.appendChild(hour)
//     reloj.appendChild(":")
//     reloj.appendChild(minute)
//     reloj.appendChild(":")
//     reloj.appendChild(second)

//     return reloj;
// }
    var h2 = document.createElement("h2")
    

function actualizar() { //función del temporizador
    mihora = actual(); //recoger hora actual
    var hora = mihora.toString()

    h2.innerText = hora
    h2.classList.add("clock")

    mireloj = document.getElementById("reloj"); //buscar elemento reloj
    
    mireloj.appendChild(h2); //incluir hora en elemento
}

setInterval(actualizar, 1000); //iniciar temporizador


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

