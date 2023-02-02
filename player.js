var player = document.getElementById("player");
var playPause = document.getElementById("play-pause")
var volumenLess = document.getElementById("volumen-less")
var volumenPlus = document.getElementById("volumen-plus")
var flag = true;

playPause.addEventListener("click", play)
volumenLess.addEventListener("click", decrease)
volumenPlus.addEventListener("click", raise)


function play(){
    if(flag == true) {
        player.pause()
        flag = false
    } 
    else {
        player.play()
        flag = true
    }
    console.log(player)
}

function decrease() {
    
        player.volume-=0.1

    
}

function raise() {
    
        player.volume+=0.1
}