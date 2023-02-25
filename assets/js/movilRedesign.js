var background = document.getElementById("background")
var containersite = document.getElementById("container-site")
var reloj = document.getElementById("reloj")
var width = screen.width
var height = screen.height
var todolist = document.getElementById("left-container")
var todoflag = false //..todo list visible

window.addEventListener("load", redesign)

function redesign() {
    console.log(width)
    if(width <= 425 )
    {
        todolist.style.display = "none" // hide todo-list section
        var todolistbutton = document.createElement("i") // button to show todo-list section

        todolistbutton.classList.add("fa-sharp")
        todolistbutton.classList.add("fa-solid")
        todolistbutton.classList.add("fa-clipboard-list")
        todolistbutton.id = "todo-list-button"
        todolistbutton.addEventListener("click", showTodoList)

        todolist.style.position = "absolute" // let todo-list section be in the front
        todolist.style.zIndex = "2"
        todolist.style.width = "80vw"
        todolist.style.marginTop = "30%"

        reloj.appendChild(todolistbutton) // 

    }
}


function showTodoList() {
    if(todoflag) {
        todolist.style.display = "none"
        todoflag = false
    }
    else {
        todolist.style.display = "grid"
        todoflag = true
    }
}