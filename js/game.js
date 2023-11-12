let canvas;
let world;
let keyboard = new Keyboard();
let music = new Audio('audio/music.mp3');
music.loop = true;


function init() {
    canvas = document.getElementById('canvas');
    world = new World(canvas, keyboard);

    console.log('My Character is:', world.character);
}


function start() {
    // music.play();
    initLevel();
    init();
    document.getElementById('startScreen').classList.remove('startScreen');
    document.getElementById('startScreen').classList.add('d-none');
    document.getElementById('h1').classList.remove('v-hidden');
    document.getElementById('canvas').classList.remove('d-none');
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