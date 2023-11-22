let canvas;
let world;
let keyboard = new Keyboard();
let soundIsActive = true;
let music = new Audio('audio/music.mp3');
music.loop = true;


/**
 * This function initlize the website and executes another function
 */
function init() {
    canvas = document.getElementById('canvas');
    world = new World(canvas, keyboard);
    mobileButtonsTouchEvent();

    console.log('My Character is:', world.character);
}


/**
 * This function starts the game with background music beeing played and it executes two other functions
 */
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


/**With this function you can restart the game */
function restart() {
    window.location.reload();
}


/**This function shows the settings for the game */
function showSettings() {
    document.getElementById('settingsContainer').classList.remove('d-none');
    document.getElementById('settingsContainer').classList.add('settingsAndStoryContainer');
}


/**This function shows the story of the game */
function showStory() {
    document.getElementById('storyContainer').classList.remove('d-none');
    document.getElementById('storyContainer').classList.add('settingsAndStoryContainer');
}


/**
 * This function turns the music on and off and it switches the icon
 */
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


/**
 * This function checks and plays the audio when it's active
 */
function playAudio(audio) {
    if (soundIsActive) {
        audio.play();
    }
}


/**
 * This function gets you back to the start screen
 * @param {'settingsContainer' or 'storyContainer'} sc 
 */
function back(sc) {
    document.getElementById(sc).classList.remove('settingsAndStoryContainer');
    document.getElementById(sc).classList.add('d-none');
}


/**
 * This function is for the mobile touch buttons when you are using a mobile device
 */
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


/**
 * This function defines the variable "fullscreen" and executes two more functions
 */
function openFullscreen() {
    let fullscreen = document.getElementById('fullscreen');
    enterFullscreen(fullscreen);
    setFullscreenForLevel();
}


/**
 * This function enters the fullscreen mode
 * @param {fullscreen} element 
 */
function enterFullscreen(element) {
    if (element.requestFullscreen) {
        element.requestFullscreen();
    } else if (element.msRequestFullscreen) {      // for IE11 (remove June 15, 2022)
        element.msRequestFullscreen();
    } else if (element.webkitRequestFullscreen) {  // iOS Safari
        element.webkitRequestFullscreen();
    }
}


/**
 * This function sets the css-classes for the fullscreen mode
 */
function setFullscreenForLevel() {
    document.getElementById('canvas').classList.add('fullscreen');
    document.getElementById('hudOverlay').classList.add('hudOverlayForFullscreen');
    document.getElementById('fullScreenIcon').src = 'img/minimizeIcon.png';
    document.getElementById('fullScreenIcon').setAttribute('onClick', 'removeFullscreenForLevel()');
}


/**
 * This function removes the css-classes that are necessary for the fullscreen mode and executes another function
 */
function removeFullscreenForLevel() {
    document.getElementById('canvas').classList.remove('fullscreen');
    document.getElementById('hudOverlay').classList.remove('hudOverlayForFullscreen');
    document.getElementById('fullScreenIcon').src = 'img/fullScreenIcon.png';
    document.getElementById('fullScreenIcon').setAttribute('onClick', 'openFullscreen()');
    exitFullscreen();
}


/**
 * With this function you exit from the fullscreen mode
 */
function exitFullscreen() {
    if (document.exitFullscreen) {
        document.exitFullscreen();
    } else if (document.webkitExitFullscreen) {
        document.webkitExitFullscreen();
    }
}