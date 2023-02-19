//........................variables.................................//
//song information
var song = document.getElementById("song"); //audio that is playing
var namesong = document.getElementById("name-song-player")
var artistsong = document.getElementById("artist-song-player")
var imgsongplayer = document.getElementById("img-song-player")
//player control
var controls = document.getElementsByClassName("icon-control")
var playbutton = document.getElementById("play");
var volumecontrol = document.getElementById("volume-control")
var volumeicon = document.getElementById("volume-icon")
var flagVolume = true; // to control if a song has volume
var flagPlay = false; // to control if a song is playing

var listsongs = [
    {
        "title": "September",
        "artist": "Sparky Deathcap",
        "src": "./music/september - sparky deathcap.mp3",
        "img": "./player.gif",
        "playing": false
    },
    {
        "title": "Fallen down",
        "artist": "Undertale OST",
        "src": "./music/fallendown.mp3",
        "img": "https://i.pinimg.com/originals/2b/dd/02/2bdd028bbe24f69c778e172eb1f25fc3.gif",
        "playing": false
    },
    {
        "title": "Chandelier",
        "artist": "Will Paquin",
        "src": "./music/Paquin - Chandelier.mp3",
        "img": "https://i.pinimg.com/originals/27/7d/89/277d894fef3831e44d0718d7d9a40eb2.gif",
        "playing": false
    },
    {
        "title": "My feelings are fatal",
        "artist": "Mxmtoon",
        "src": "./music/My feelings are fatal - Mxmtoon.mp3",
        "img": "./player.gif",
        "playing": false
    },
    {
        "title": "Sweet boy",
        "artist": "Chevy",
        "src": "./music/Sweet Boi - Chevy.mp3",
        "img": "./player.gif",
        "playing": false
    },
    {
        "title": "Soldier, Poet, king",
        "artist": "The Oh Hellos",
        "src": "./music/Soldier, Poet, King-The Oh Hellos.mp3",
        "img": "./player.gif",
        "playing": false
    },
    {
        "title": "First Date",
        "artist": "Frad",
        "src": "./music/frad - First Date.mp3",
        "img": "./player.gif",
        "playing": false
    },
    {
        "title": "je te laisserai des mots",
        "artist": "Patrick Watson",
        "src": "./music/je te laisserai des mots.mp3",
        "img": "./player.gif",
        "playing": false
    },
    {
        "title": "Sept 6th",
        "artist": "Kavv",
        "src": "./music/kavv - Sept 6th.mp3",
        "img": "./player.gif",
        "playing": false
    },
    {
        "title": "Soldier, Poet, king",
        "artist": "The Oh Hellos",
        "src": "./music/Soldier, Poet, King-The Oh Hellos.mp3",
        "img": "./player.gif",
        "playing": false
    },
    {
        "title": "marshmallow",
        "artist": "lukrembo",
        "src": "./music/lukrembo - marshmallow.mp3",
        "img": "./player.gif",
        "playing": false
    },
    {
        "title": "Oblivion",
        "artist": "Rufi-o",
        "src": "./music/Rufi-o - Oblivion.mp3",
        "img": "./player.gif",
        "playing": false
    },
    {
        "title": "School Rooftop",
        "artist": "hisohkah",
        "src": "./music/School Rooftop.mp3",
        "img": "./player.gif",
        "playing": false
    },
    {
        "title": "The Lost Ones Weeping",
        "artist": "Vocaloid",
        "src": "./music/The Lost Ones Weeping - vocaloid.mp3",
        "img": "./player.gif",
        "playing": false
    },
    {
        "title": "Ultimately",
        "artist": "Khai Dreams",
        "src": "./music/Ultimately - Khai Dreams .mp3",
        "img": "./player.gif",
        "playing": false
    },
    {
        "title": "Watashi no R",
        "artist": "Vocaloid",
        "src": "./music/Watashi no R - vocaloid.mp3",
        "img": "./player.gif",
        "playing": false
    }
]

//........................listeners.................................//
window.addEventListener("load", createPlaylist)
volumecontrol.addEventListener("change", setVolumen);

for (let i = 0; i < controls.length; i++) {
    controls[i].addEventListener("click", evalcontrol)
}
//........................ Functions .................................//

function playSong(title, artist, img, audio) {
    namesong.innerText = title
    artistsong.innerText = artist
    imgsongplayer.src = "" //delete previous song
    imgsongplayer.src = img
    song.src = audio
    song.loop = true
    flagPlay = true

    changeiconplaypause(flagPlay)//change icon to playing
    song.play()
}

function createPlaylist() { //display playlist section
    var playlistsection = document.getElementById("songs-section")

    listsongs.forEach(function (element, index) {
        var div = document.createElement("div")
        var audio = document.createElement("audio")
        var songname = document.createElement("p")
        var artist = document.createElement("p")
        var img = document.createElement("img")

        div.className = "song-div"
        audio.className = "song"
        audio.src = element.src
        audio.id = index
        songname.innerText = element.title
        songname.className = "song-name"
        artist.innerText = element.artist
        artist.className = "artist"
        img.src = element.img
        img.className = "img-playlist"

        div.appendChild(audio)
        div.appendChild(img)
        div.appendChild(songname)
        div.appendChild(artist)

        playlistsection.appendChild(div)
        div.addEventListener("click", changeSong) //change to the selected song in playlist
    });

    playSong(listsongs[0].title, listsongs[0].artist, listsongs[0].img, listsongs[0].src) //play fisrt song when the page load
}

function changeSong(e) { 
    var item = e.target
    var parent = item.parentElement

    var newsong = parent.querySelector('.song').src
    var newnamesong = parent.querySelector('.song-name').textContent
    var newsongartist = parent.querySelector('.artist').textContent
    var newimg = parent.querySelector('.img-playlist').src

    playSong(newnamesong, newsongartist, newimg, newsong)
}

function evalcontrol(e) {
    var item = e.target //clicked element
    
    if(item.id == "play") //play button
        playPause()
    else if(item.id == "volume-icon") //volume icon to mute song
        mute()
    else { //next or previous song button
        var index = 0;
        listsongs.forEach(function (element, position) { 
            if (namesong.innerText == element.title) //find current playing song index in list songs
                index = position
        });
        
        if (item.id == "move-forward" && index < listsongs.length - 1)
            index = index + 1
        else if (item.id == "move-backward" && index > 0)
            index = index - 1
        
        playSong(listsongs[index].title, listsongs[index].artist, listsongs[index].img, listsongs[index].src)
    }
}

function mute() {
    if (flagVolume) {
        song.volume = 0
        volumecontrol.value = 0
        volumeicon.removeAttribute("class")
        volumeicon.classList.add("fa-solid")
        volumeicon.classList.add("fa-volume-xmark")
        flagVolume = false
    }
    else {
        song.volume = 0.5
        volumecontrol.value = 0.5
        volumeicon.removeAttribute("class")
        volumeicon.classList.add("fa-solid")
        volumeicon.classList.add("fa-volume-high")
        flagVolume = true
    }
}

function setVolumen( ) {
    song.volume = volumecontrol.value
    var sound = song.volume
    volumeicon.removeAttribute("class")

    if (sound == 0) {
        volumeicon.classList.add("fa-solid")
        volumeicon.classList.add("fa-volume-xmark")
    }
    else if (sound > 0 && sound < 0.5) {
        volumeicon.classList.add("fa-solid")
        volumeicon.classList.add("fa-volume-low")
    }
    else if (sound => 0.5 && sound <= 1) {
        volumeicon.classList.add("fa-solid")
        volumeicon.classList.add("fa-volume-high")
    }
}

function playPause() {
    if (flagPlay) {
        song.pause()
        flagPlay = false //it's in pause
        changeiconplaypause(flagPlay)
    }
    else {
        song.play()
        flagPlay = true //it's playing
        changeiconplaypause(flagPlay)
    }
}

function changeiconplaypause(flagPlay) {
    if (flagPlay) {
        playbutton.removeAttribute("class")
        playbutton.classList.add("fa-solid")
        playbutton.classList.add("fa-pause")
        playbutton.classList.add("icon-control")
    }
    else {
        playbutton.removeAttribute("class")
        playbutton.classList.add("fa-solid")
        playbutton.classList.add("fa-play")
        playbutton.classList.add("icon-control")
    }
}