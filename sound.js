var buttonsound = document.getElementsByClassName("sound")

// background sounds in loop, flag for play music in the begining false//
var rain = new Audio("./Lluvia.mp3")
rain.loop = true
var flagrain = false

var keyboard = new Audio("./keyboard.mp3")
keyboard.loop = true
var flagkey = false

var wind = new Audio("./wind.mp3")
wind.loop = true
var flagwind = false

var bolt = new Audio("./bolt.mp3")
bolt.loop = true
var flagbolt = false

var clock = new Audio("./clock.mp3")
clock.loop = true
var flagclock = false

var fire = new Audio("./fire.mp3")
fire.loop = true
var flagfire = false

//------------------------------------------//

for (var i = 0; i < buttonsound.length; i++) {
    buttonsound[i].addEventListener("click", addsound)
}

function addsound(e) {
    var item = e.target
    console.log(item.id)


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
}