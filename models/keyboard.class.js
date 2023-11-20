class Keyboard {
    LEFT = false;
    RIGHT = false;
    SPACE = false;
    D = false;
}


window.addEventListener("keydown", (e) => {
    if (world.character.characterIsDead) {
        keyboard.LEFT = false;
    } else if (e.keyCode == 37) {
        keyboard.LEFT = true;
    }

    if (world.character.characterIsDead) {
        keyboard.RIGHT = false;
    } else if (e.keyCode == 39) {
        keyboard.RIGHT = true;
    }

    if (world.character.characterIsDead) {
        keyboard.SPACE = false;
    } else if (e.keyCode == 32) {
        keyboard.SPACE = true;
    }

    if (world.character.characterIsDead) {
        keyboard.D = false;
    } else if (e.keyCode == 68) {
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

    if (e.keyCode == 32) {
        keyboard.SPACE = false;
    }

    if (e.keyCode == 68) {
        keyboard.D = false;
    }
})