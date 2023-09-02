let canvas;
let world;
let keyboard = new Keyboard();
// let music = new Audio('audio/music.mp3');
// music.loop = true;


function init() {
    canvas = document.getElementById('canvas');
    world = new World(canvas, keyboard);

    console.log('My Character is:', world.character);
}


window.addEventListener("keydown", (e) => {
    if (e.keyCode == 37) {
        keyboard.LEFT = true;
    }

    if (e.keyCode == 39) {
        keyboard.RIGHT = true;
    }

    if (e.keyCode == 38) {
        keyboard.UP = true;
    }

    if (e.keyCode == 40) {
        keyboard.DOWN = true;
    }

    if (e.keyCode == 32) {
        keyboard.SPACE = true;
    }

    if (e.keyCode == 68) {
        keyboard.D = true;
    }
})


window.addEventListener("keyup", (e) => {
    if (e.keyCode == 37) {
        keyboard.LEFT = false;
    }

    if (e.keyCode == 39) {
        keyboard.RIGHT = false;
    }

    if (e.keyCode == 38) {
        keyboard.UP = false;
    }

    if (e.keyCode == 40) {
        keyboard.DOWN = false;
    }

    if (e.keyCode == 32) {
        keyboard.SPACE = false;
    }

    if (e.keyCode == 68) {
        keyboard.D = false;
    }
})


function start() {
    // music.play();
    initLevel();
    init();
    document.getElementById('startScreen').classList.remove('startScreen');
    document.getElementById('startScreen').classList.add('d-none');
    document.getElementById('h1').classList.remove('v-hidden');
    document.getElementById('canvas').classList.remove('d-none');
}


function showSettings() {
    document.getElementById('settingsContainer').classList.remove('d-none');
    document.getElementById('settingsContainer').classList.add('settingsAndStoryContainer');
}


function showStory() {
    document.getElementById('storyContainer').classList.remove('d-none');
    document.getElementById('storyContainer').classList.add('settingsAndStoryContainer');
}


function turnSoundOnOff(imagePath) {
    document.getElementById('sound').src = imagePath;
    if (imagePath == 'img/sound-off.png') {
        document.getElementById('sound').setAttribute("onClick", "turnSoundOnOff('img/sound-on.png')");
        music.pause();
    } else {
        document.getElementById('sound').setAttribute("onClick", "turnSoundOnOff('img/sound-off.png')");
        music.play();
    }
}


function back(sc) {
    document.getElementById(sc).classList.remove('settingsAndStoryContainer');
    document.getElementById(sc).classList.add('d-none');
}