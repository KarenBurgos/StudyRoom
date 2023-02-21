//........................variables.................................//
var buttonsound = document.getElementsByClassName("sound")

// background sounds//
var rain = new Audio("./sounds/Lluvia.mp3")
rain.loop = true 
var flagrain = false // set if it's playing

var keyboard = new Audio("./sounds/keyboard.mp3")
keyboard.loop = true
var flagkey = false

var wind = new Audio("./sounds/wind.mp3")
wind.loop = true
var flagwind = false

var bolt = new Audio("./sounds/bolt.mp3")
bolt.loop = true
var flagbolt = false

var clock = new Audio("./sounds/clock.mp3")
clock.loop = true
var flagclock = false

var fire = new Audio("./sounds/fire.mp3")
fire.loop = true
var flagfire = false

//........................listeners.................................//
for (var i = 0; i < buttonsound.length; i++)
    buttonsound[i].addEventListener("click", addsound)

//........................ Functions .................................//
function addsound(e) {
    var item = e.target

    switch (item.id) {
        case "rain":
            if (flagrain) {
                rain.pause()
                flagrain = false
            }
            else {
                rain.play();
                rain.volume = 0.5
                flagrain = true
            }
            break;

        case "keyboard":
            if (flagkey) {
                keyboard.pause()
                flagkey = false
            }
            else {
                keyboard.play()
                flagkey = true
            }
            break;

        case "wind":
            if (flagwind) {
                wind.pause()
                flagwind = false
            }
            else {
                wind.play()
                wind.volume = 1
                flagwind = true
            }
            break;

        case "bolt":
            if (flagbolt) {
                bolt.pause()
                flagbolt = false
            }
            else {
                bolt.play()
                bolt.volume = 0.2
                flagbolt = true
            }
            break;

        case "clock":
            if (flagclock) {
                clock.pause()
                flagclock = false
            }
            else {
                clock.play()
                flagclock = true
            }
            break;

        case "campfire":
            if (flagfire) {
                fire.pause()
                flagfire = false
            }
            else {
                fire.play()
                fire.volume = 0.3
                flagfire = true
            }
            break;
            
        default:
            break;
    }
    item.classList.toggle("selected-sound")
}