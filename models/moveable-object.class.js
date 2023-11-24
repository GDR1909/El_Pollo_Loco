class MoveableObject extends DrawableObject {
    speed = 0.15;
    otherDirection = false;
    speedY = 0;
    acceleration = 2.5;
    energy = 100;
    lastHit = 0;


    /**
     * This function applies gravity
     */
    applyGravity() {
        setInterval(() => {
            if (this.isAboveGround() || this.speedY > 0) {
                this.y -= this.speedY;
                this.speedY -= this.acceleration;
            }
        }, 1000 / 25);
    }


    /**
     * This function checks if an object is above the ground
     * @returns the height of the ground
     */
    isAboveGround() {
        if (this instanceof ThrowableObject) { //Throwable objects should always fall
            return this.y < 360
        } else {
            return this.y < 150
        }
    }


    /**
     * This function returns the dimensions of the character and the moveable objects
     * @param {MoveableObject} mo 
     * @returns the dimensions of every single moveable object
     */
    isColliding(mo) { // character.isColliding(chicken);
        return  this.x + this.width - this.offset.right > mo.x + mo.offset.left &&
                this.y + this.height - this.offset.bottom > mo.y + mo.offset.top &&
                this.x + this.offset.left < mo.x + mo.width - mo.offset.right &&
                this.y + this.offset.top < mo.y + mo.height - mo.offset.bottom;


        // return this.x + this.width > mo.x &&
        //     this.y + this.height > mo.y &&
        //     this.x < mo.x + mo.width &&
        //     this.y < mo.y + mo.height;
    }


    /**
     * This function checks if the energy is higher than 0 and decrease it then by 20
     */
    hit() {
        this.energy -= 20;
        if (this.energy < 0) {
            this.energy = 0;
        } else {
            this.lastHit = new Date().getTime();
        }
    }


    /**
     * This function checks if the last hit is more than one second ago
     * @returns one second
     */
    isHurt() {
        let timepassed = new Date().getTime() - this.lastHit; //Differenz in Millisekunden
        timepassed = timepassed / 1000; //Differenz in Sekunden
        return timepassed < 1;
    }


    /**
     * This function gets executed when the character or an enemy dies
     * @returns the value 0 for energy
     */
    isDead() {
        return this.energy == 0;
    }


    /**
     * This function iterates through the arrays so it can play the animations
     * @param {array} images 
     */
    playAnimation(images) {
        let i = this.currentImage % images.length; // % (ausgesprochen: Modulu) Das ist der mathematische Rest // let i = 7 % 6; => 1, Rest 1
        // i = 0, 1, 2, 3, 4, 5, 0, 1, 2, 3, 4, 5, 0, 1, 2, 3, 4, 5, 0, 1, 2, 3, 4, 5, 0, 1, 2, 3, ...
        let path = images[i];
        this.img = this.imageCache[path];
        this.currentImage++;
    }


    /**
     * This function is for moving right
     */
    moveRight() {
        this.x += this.speed;
    }


    /**
     * This function is for moving left
     */
    moveLeft() {
        this.x -= this.speed;
    }


    /**
     * This function is for jumping
     */
    jump() {
        this.speedY = 30;
    }


    /**
     * This function gets executed after the character kills a cicken or a small chicken
     */
    smallJump() {
        this.speedY = 15;
    }


    /**
     * This function plays the sound when a chicken gets killed and its energy gets set to 0
     */
    killChicken() {
        playAudio(this.dead_sound);
        this.energy = 0;
    }
}