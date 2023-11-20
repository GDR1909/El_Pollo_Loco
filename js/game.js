let canvas;
let world;
let keyboard = new Keyboard();
let soundIsActive = true;
let music = new Audio('audio/music.mp3');
music.loop = true;


function init() {
    canvas = document.getElementById('canvas');
    world = new World(canvas, keyboard);
    mobileButtonsTouchEvent();

    console.log('My Character is:', world.character);
}


function start() {
    music.play();
    initLevel();
    init();
    document.getElementById('startScreen').classList.remove('startScreen');
    document.getElementById('startScreen').classList.add('d-none');
    document.getElementById('h1').classList.remove('v-hidden');
    document.getElementById('canvas').classList.remove('d-none');
    document.getElementById('hudOverlay').classList.remove('d-none');
    document.getElementById('hudOverlay').classList.add('hudOverlay');
}


function restart() {
    window.location.reload();
}


function showSettings() {
    document.getElementById('settingsContainer').classList.remove('d-none');
    document.getElementById('settingsContainer').classList.add('settingsAndStoryContainer');
}


function showStory() {
    document.getElementById('storyContainer').classList.remove('d-none');
    document.getElementById('storyContainer').classList.add('settingsAndStoryContainer');
}


// function turnSoundOnOff(imagePath) {
//     document.getElementById('sound').src = imagePath;
//     if (imagePath == 'img/sound-off.png') {
//         document.getElementById('sound').setAttribute("onClick", "turnSoundOnOff('img/sound-on.png')");
//         music.pause();
//     } else {
//         document.getElementById('sound').setAttribute("onClick", "turnSoundOnOff('img/sound-off.png')");
//         music.play();
//     }
// }


function toggleSoundActive() {
    soundIsActive = !soundIsActive;

    if (soundIsActive) {
        music.play();
        document.getElementById('sound').src = 'img/sound-on.png';
    } else {
        music.pause();
        document.getElementById('sound').src = 'img/sound-off.png';
    }
}


function playAudio(audio) {
    if (soundIsActive) {
        audio.play();
    }
}


function back(sc) {
    document.getElementById(sc).classList.remove('settingsAndStoryContainer');
    document.getElementById(sc).classList.add('d-none');
}


function mobileButtonsTouchEvent() {
    document.getElementById('moveLeftBtn').addEventListener('touchstart', (e) => {
        e.preventDefault();
        keyboard.LEFT = true;
    });
    document.getElementById('moveLeftBtn').addEventListener('touchend', (e) => {
        e.preventDefault();
        keyboard.LEFT = false;
    });
    document.getElementById('moveRightBtn').addEventListener('touchstart', (e) => {
        e.preventDefault();
        keyboard.RIGHT = true;
    });
    document.getElementById('moveRightBtn').addEventListener('touchend', (e) => {
        e.preventDefault();
        keyboard.RIGHT = false;
    });
    document.getElementById('jumpBtn').addEventListener('touchstart', (e) => {
        e.preventDefault();
        keyboard.SPACE = true;
    });
    document.getElementById('jumpBtn').addEventListener('touchend', (e) => {
        e.preventDefault();
        keyboard.SPACE = false;
    });
    document.getElementById('throwBottleBtn').addEventListener('touchstart', (e) => {
        e.preventDefault();
        keyboard.D = true;
    });
    document.getElementById('throwBottleBtn').addEventListener('touchend', (e) => {
        e.preventDefault();
        keyboard.D = false;
    });
}


function openFullscreen() {
    let fullscreen = document.getElementById('fullscreen');
    enterFullscreen(fullscreen);
    setFullscreenForLevel();
}


function enterFullscreen(element) {
    if (element.requestFullscreen) {
        element.requestFullscreen();
    } else if (element.msRequestFullscreen) {      // for IE11 (remove June 15, 2022)
        element.msRequestFullscreen();
    } else if (element.webkitRequestFullscreen) {  // iOS Safari
        element.webkitRequestFullscreen();
    }
}


function setFullscreenForLevel() {
    document.getElementById('canvas').classList.add('fullscreen');
    document.getElementById('fullScreenIcon').src = 'img/minimizeIcon.png';
    document.getElementById('fullScreenIcon').setAttribute('onClick', 'removeFullscreenForLevel()');
}


function removeFullscreenForLevel() {
    document.getElementById('canvas').classList.remove('fullscreen');
    document.getElementById('fullScreenIcon').src = 'img/fullScreenIcon.png';
    document.getElementById('fullScreenIcon').setAttribute('onClick', 'openFullscreen()');
    exitFullscreen();
}


function exitFullscreen() {
    if (document.exitFullscreen) {
        document.exitFullscreen();
    } else if (document.webkitExitFullscreen) {
        document.webkitExitFullscreen();
    }
}