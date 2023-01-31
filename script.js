// Elements //
var taskname = document.getElementById("taskname")
var newtaskbutton = document.getElementById("newtaskbutton")
var tasksection = document.getElementById("tasksection")

// Functions //
//document.addEventListener("DOMContentLoaded", getTasks)
newtaskbutton.addEventListener("click", NewTask)
tasksection.addEventListener("click", taskremove)

function NewTask() {

    var divtask = document.createElement("div")
    var check = document.createElement("input")
    var text = document.createElement("p")
    var deletebutton = document.createElement("button")
    var editbutton = document.createElement("button")

    // container of tasks //
    divtask.classList.add("container-task")

    // input //
    check.type = "checkbox"
    check.name = "task-done"
    check.classList = "task-done"

    // task name //
    text.innerText = taskname.value
    text.classList.add("text")
    // delete task //
    deletebutton.innerText = "Eliminar"
    deletebutton.classList.add("delete-button")

    // edit task //
    editbutton.innerText = "Editar"
    editbutton.classList.add("edit-button")

    divtask.appendChild(check)
    divtask.appendChild(text)
    divtask.appendChild(deletebutton)
    divtask.appendChild(editbutton)

    tasksection.appendChild(divtask)
    //ctrl + K               ctrl +C comentar U descomentar
}



function editTask(task) {
    var nametask = task.querySelector(".text") //task to change
    var checked = task.querySelector(".task-done") //check from task
    var editinput = document.createElement("input") //input to edit task
    var finishbutton = document.createElement("button") // button to confirm changes

    //button properties
    finishbutton.innerText = "ok"
    
    //input properties
    editinput.type = "text"
    editinput.classList = "change"

    //hide actual task name
    nametask.style.visibility = "hidden";

    //insert input and button to edit task
    checked.after(editinput)
    editinput.after(finishbutton)


    finishbutton.addEventListener("click", function() {
        nametask.innerText = editinput.value // change new name of tasj
        //delete edit elements
        finishbutton.remove() 
        editinput.remove()
        //make new name visible
        nametask.style.visibility = "visible";
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
        var nametask = task.querySelector(".text")
        nametask.classList.toggle("checked")
    }
}

