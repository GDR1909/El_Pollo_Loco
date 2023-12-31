class ThrowableObject extends MoveableObject {
    hitted = false;
    removed = false;

    IMAGES_FLYING_BOTTLE = [
        'img/6_salsa_bottle/bottle_rotation/1_bottle_rotation.png',
        'img/6_salsa_bottle/bottle_rotation/2_bottle_rotation.png',
        'img/6_salsa_bottle/bottle_rotation/3_bottle_rotation.png',
        'img/6_salsa_bottle/bottle_rotation/4_bottle_rotation.png'
    ];
    IMAGAES_BOTTLE_SPLASH = [
        'img/6_salsa_bottle/bottle_rotation/bottle_splash/1_bottle_splash.png',
        'img/6_salsa_bottle/bottle_rotation/bottle_splash/2_bottle_splash.png',
        'img/6_salsa_bottle/bottle_rotation/bottle_splash/3_bottle_splash.png',
        'img/6_salsa_bottle/bottle_rotation/bottle_splash/4_bottle_splash.png',
        'img/6_salsa_bottle/bottle_rotation/bottle_splash/5_bottle_splash.png',
        'img/6_salsa_bottle/bottle_rotation/bottle_splash/6_bottle_splash.png'
    ];
    bottle_splash_sound = new Audio('audio/bottleSplash.mp3');


    /**
     * Constructor for a throwable object
     * @param {number} x - The initial x-coordinate of the throwable object
     * @param {number} y - The initial y-coordinate of the throwable object
     */
    constructor(x, y) {
        super().loadImage('img/6_salsa_bottle/bottle_rotation/1_bottle_rotation.png');
        this.loadImages(this.IMAGES_FLYING_BOTTLE);
        this.loadImages(this.IMAGAES_BOTTLE_SPLASH);
        this.x = x;
        this.y = y;
        this.height = 60;
        this.width = 50;
        this.throw();
        this.animate();
    }


    /**
     * With this function the character throws bottles. It checks if the bottle hits the ground or an enemy and then it gets removed
     */
    throw() {
        this.speedY = 30;
        this.applyGravity();
        setInterval(() => {
            this.x += 10;
            if (this.y > 360 || this.hitted) {
                this.removed = true;
            }
        }, 25);
    }


    /**
     * This function executes all the animations for the throwable object
     */
    animate() {
        let bottleSplashSoundPlayed = false;

        setInterval(() => {
            if ((this.y > 360 && !bottleSplashSoundPlayed) || this.hitted) {
                setTimeout(() => {
                    this.speedY = 0;
                    this.playAnimation(this.IMAGAES_BOTTLE_SPLASH);
                    playAudio(this.bottle_splash_sound);
                    bottleSplashSoundPlayed = true;
                    this.hitted = false;
                }, 10);
            } else {
                this.playAnimation(this.IMAGES_FLYING_BOTTLE);
            }
        }, 70);
    }
}