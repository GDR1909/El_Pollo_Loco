class MoveableObject extends DrawableObject {
    speed = 0.15;
    otherDirection = false;
    speedY = 0;
    acceleration = 2.5;
    energy = 100;
    lastHit = 0;

    // offset = {
    //     top: 0,
    //     bottom: 0,
    //     left: 0,
    //     right: 0
    // };


    applyGravity() {
        setInterval(() => {
            if (this.isAboveGround() || this.speedY > 0) {
                this.y -= this.speedY;
                this.speedY -= this.acceleration;
            }
        }, 1000 / 25);
    }


    isAboveGround() {
        if (this instanceof ThrowableObject) { //Throwable objects should always fall
            return this.y < 360
        } else {
            return this.y < 150
        }
    }


    // character.isColliding(chicken);
    isColliding(mo) {
        // return  this.x + this.width - this.offset.right > mo.x + mo.offset.left &&
        //         this.y + this.height - this.offset.bottom > mo.y + mo.offset.top &&
        //         this.x + this.offset.left < mo.x + mo.width - mo.offset.right &&
        //         this.y + this.offset.top < mo.y + mo.height - mo.offset.bottom;


        return this.x + this.width > mo.x &&
            this.y + this.height > mo.y &&
            this.x < mo.x + mo.width &&
            this.y < mo.y + mo.height;
    }


    hit() {
        this.energy -= 20;
        if (this.energy < 0) {
            this.energy = 0;
        } else {
            this.lastHit = new Date().getTime();
        }
    }


    isHurt() {
        let timepassed = new Date().getTime() - this.lastHit; //Differenz in Millisekunden
        timepassed = timepassed / 1000; //Differenz in Sekunden
        return timepassed < 1;
    }


    isDead() {
        return this.energy == 0;
    }


    playAnimation(images) {
        let i = this.currentImage % images.length; // % (ausgesprochen: Modulu) Das ist der mathematische Rest // let i = 7 % 6; => 1, Rest 1
        // i = 0, 1, 2, 3, 4, 5, 0, 1, 2, 3, 4, 5, 0, 1, 2, 3, 4, 5, 0, 1, 2, 3, 4, 5, 0, 1, 2, 3, ...
        let path = images[i];
        this.img = this.imageCache[path];
        this.currentImage++;
    }


    moveRight() {
        this.x += this.speed;
    }


    moveLeft() {
        this.x -= this.speed;
    }


    jump() {
        this.speedY = 30;
    }


    smallJump() {
        this.speedY = 15;
    }


    killChicken() {
        // this.dead_sound.play();
        playAudio(this.dead_sound);
        this.energy = 0;
    }
}