var player = document.getElementById("player");
var player = document.getElementById("player");
// var playPause = document.getElementById("play-pause")
var volumen = document.getElementById("volume-control")
var icon = document.getElementById("volume-icon")
var flag = true;

volumen.addEventListener("change", setVolumen);
icon.addEventListener("click", mute)


function mute() {
    if (flag) {
        player.volume = 0
        volumen.value = 0

        icon.removeAttribute("class")
        
        icon.classList.add("fa-solid")
        icon.classList.add("fa-volume-xmark")

        flag = false
    }
    else {
        player.volume = 0.5
        volumen.value = 0.5

        icon.removeAttribute("class")
        
        icon.classList.add("fa-solid")
        icon.classList.add("fa-volume-high")

        flag = true
    }
    
}

function setVolumen(e) {
    player.volume=volumen.value
    var sound = player.volume

    icon.removeAttribute("class")
    
    if(sound == 0){
        icon.classList.add("fa-solid")
        icon.classList.add("fa-volume-xmark")
    }
    else if(sound > 0 && sound < 0.5){
        icon.classList.add("fa-solid")
        icon.classList.add("fa-volume-low")
    }
    else if(sound > 0.5 && sound < 1){
        icon.classList.add("fa-solid")
        icon.classList.add("fa-volume-high")
    }
}
