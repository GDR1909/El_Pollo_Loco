class World {
    character = new Character();
    level = level1;
    canvas;
    ctx;
    keyboard;
    camera_x = 0;
    statusBarHealth = new StatusBarHealth();
    statusBarBottle = new StatusBarBottle();
    statusBarCoin = new StatusBarCoin();
    statusBarEndboss = new StatusBarEndboss();
    ICON_HEALTH_ENDBOSS = new IconHealthEndboss();
    collectedBottles = [];
    ThrowableObjects = [];
    collecting_coin_sound = new Audio('audio/coin.mp3');
    collecting_bottle_sound = new Audio('audio/bottle.mp3');
    bottleIsFlying = false;


    /**
     * Constructor for the World class
     * @param {HTMLCanvasElement} canvas - The canvas element for rendering
     * @param {Keyboard} keyboard - The keyboard input for the game
     */
    constructor(canvas, keyboard) {
        this.ctx = canvas.getContext('2d');
        this.canvas = canvas;
        this.keyboard = keyboard;
        this.draw();
        this.setWorld();
        this.run();
        this.updateThrowableObjects();
    }


    /**
     * This function removes bottle after they were thrown and splashed
     */
    updateThrowableObjects() {
        setInterval(() => {
            this.ThrowableObjects = this.ThrowableObjects.filter(to => !to.removed);
        }, 100);
    }


    /**
     * This function puts the character in the game
     */
    setWorld() {
        this.character.world = this;
    }


    /**
     * This function checks every 0.1 seconds if a collision happened and if a bottle were thrown
     */
    run() {
        setInterval(() => {
            this.checkCollisions();
            this.checkThrowObjects();
        }, 100); //200
    }


    /**
     * This function removes the chicken and small chicken after they get killed
     * @param {enemies} enemy 
     */
    chickenToDelete(enemy) {
        setTimeout(() => {
            this.level.enemies.splice(this.level.enemies.indexOf(enemy), 1);
        }, 750);
    }


    /**
     * This functions checks if the character collides with an enemy or with a coin or with a bottle
     */
    checkCollisions() {
        this.collisionWithEnemy();
        this.collisionWithCoin();
        this.collisionWithBottle();
    }


    /**
     * This function checks if the character collides with an enemy
     */
    collisionWithEnemy() {
        this.level.enemies.forEach((enemy) => {
            if (this.enemyNotDeadAndCharacterIsCollidingWithEnemy(enemy)) {
                if (this.character.isAboveGround()) {
                    this.enemyGetKilled(enemy);
                } else {
                    if (!this.character.characterIsHurt) {
                        this.characterGetHitted();
                    }
                }
            }
        });
    }


    /**
     * This function returns the condition for the collision between the enemy and the character
     * @param {enemies} enemy
     */
    enemyNotDeadAndCharacterIsCollidingWithEnemy(enemy) {
        return !enemy.isDead() && this.character.isColliding(enemy);
    }


    /**
     * This function plays the animation when the enemy get killed
     * @param {enemies} enemy 
     */
    enemyGetKilled(enemy) {
        console.log(enemy, 'gets jumped on!');
        enemy.killChicken();
        this.chickenToDelete(enemy);
        this.character.smallJump();
    }


    /**
     * This function plays the animation when the character get hitted
     */
    characterGetHitted() {
        this.character.hit()
        this.statusBarHealth.setPercentage(this.character.energy);
    }


    /**
     * This function checks if the character collides with a coin and removes it from the level
     */
    collisionWithCoin() {
        this.level.coins = this.level.coins.filter((coin) => {
            if (this.character.isColliding(coin)) {
                playAudio(this.collecting_coin_sound);
                this.statusBarCoin.collectCoin();
                this.statusBarCoin.setPercentage(this.statusBarCoin.coinAmount);
                return false;
            }
            return true;
        });
    }


    /**
     * This function checks if the character collides with a bottle and removes it from the level
     */
    collisionWithBottle() {
        this.level.bottles = this.level.bottles.filter((bottle) => {
            if (this.character.isColliding(bottle)) {
                playAudio(this.collecting_bottle_sound);
                this.collectedBottles.push(bottle);
                this.statusBarBottle.collectBottle();
                this.statusBarBottle.setPercentage(this.statusBarBottle.bottleAmount);
                return false;
            }
            return true;
        });
    }


    /**
     * This function lets the character only throw bottle if he collected some before. the statusbar of the bottles will change too
     */
    checkThrowObjects() {
        if (this.collectedBottles == 0) {
            this.keyboard.D = false;
        } else if (this.keyboard.D && !this.bottleIsFlying) {
            this.checkBottleIsFlying();
            let bottle = new ThrowableObject(this.character.x + 100, this.character.y + 100);
            this.ThrowableObjects.push(bottle);
            this.collectedBottles.splice(0, 1);
            this.statusBarBottle.removeBottle();
            this.statusBarBottle.setPercentage(this.statusBarBottle.bottleAmount);
        }
        this.checkIfFlyingBottleHitsEnemy();
    }


    /**
     * This function allows you to throw only one bottle per second
     */
    checkBottleIsFlying() {
        this.bottleIsFlying = true;
        console.log('the bottle is flying:', this.bottleIsFlying);
        setTimeout(() => {
            this.bottleIsFlying = false;
            console.log('the bottle is flying:', this.bottleIsFlying);
        }, 1000);
    }


    /**
     * This function checks if the flying bottle hits the endboss. if it hits the endboss his statusbar will change
     */
    checkIfFlyingBottleHitsEnemy() {
        this.ThrowableObjects.forEach(bottle => {
            this.level.enemies.forEach(enemy => {
                if (bottle.isColliding(enemy)) {
                    bottle.hitted = true;
                    console.log('Enemy hitted with flying bottle!');
                    this.updateThrowableObjects();
                    enemy.hit();
                    this.statusBarEndboss.setPercentage(enemy.energy);
                }
            });
        });
    }


    /**
     * This function adds all the objects to the game level
     */
    draw() {
        this.ctx.clearRect(0, 0, this.canvas.width, this.canvas.height);

        this.ctx.translate(this.camera_x, 0);
        this.addObjectsToMap(this.level.backgroundObjects);

        this.ctx.translate(-this.camera_x, 0);
        // ----- Space for fixed objects -----
        this.addToMap(this.statusBarHealth);
        this.addToMap(this.statusBarBottle);
        this.addToMap(this.statusBarCoin);
        this.addToMap(this.statusBarEndboss);
        this.addToMap(this.ICON_HEALTH_ENDBOSS);
        this.ctx.translate(this.camera_x, 0);

        this.addToMap(this.character);
        this.addObjectsToMap(this.level.enemies);
        this.addObjectsToMap(this.level.clouds);
        this.addObjectsToMap(this.level.bottles);
        this.addObjectsToMap(this.level.coins);
        this.addObjectsToMap(this.ThrowableObjects);

        this.ctx.translate(-this.camera_x, 0);

        // draw() wird immer wieder aufgerufen
        let self = this;
        requestAnimationFrame(function () {
            self.draw();
        });
    }


    /**
     * This function adds objects that are moveable to the map
     * @param {enemies / clouds / bottles / coins / ThrowableObjects} objects 
     */
    addObjectsToMap(objects) {
        objects.forEach(o => {
            this.addToMap(o);
        });
    }


    /**
     * This function adds objects that are fixed to the map
     * @param {moveableObjects} mo 
     */
    addToMap(mo) {
        if (mo.otherDirection) {
            this.flipImage(mo);
        }
        mo.draw(this.ctx);
        mo.drawFrame(this.ctx);

        if (mo.otherDirection) {
            this.flipImageBack(mo);
        }
    }


    /**
     * This function flips the image of the character when he moves left
     * @param {moveableObject} mo 
     */
    flipImage(mo) {
        this.ctx.save();
        this.ctx.translate(mo.width, 0);
        this.ctx.scale(-1, 1);
        mo.x = mo.x * -1;
    }


    /**
     * This function flips the image of the character back when he move right again
     * @param {moveableObject} mo 
     */
    flipImageBack(mo) {
        mo.x = mo.x * -1;
        this.ctx.restore();
    }
}