class Endboss extends MoveableObject {
    height = 400;
    width = 250;
    y = 55;
    speed = 3;
    hadFirstContact = false;
    endbossIsDead = false;
    endbossHurt_sound = new Audio('audio/endbossHurt.mp3');
    endbossDead_sound = new Audio('audio/endbossDead.mp3');
    win_sound = new Audio('audio/success.mp3');
    IMAGES_WALKING = [
        'img/4_enemie_boss_chicken/1_walk/G1.png',
        'img/4_enemie_boss_chicken/1_walk/G2.png',
        'img/4_enemie_boss_chicken/1_walk/G3.png',
        'img/4_enemie_boss_chicken/1_walk/G4.png'
    ];
    IMAGES_ALERT = [
        'img/4_enemie_boss_chicken/2_alert/G5.png',
        'img/4_enemie_boss_chicken/2_alert/G6.png',
        'img/4_enemie_boss_chicken/2_alert/G7.png',
        'img/4_enemie_boss_chicken/2_alert/G8.png',
        'img/4_enemie_boss_chicken/2_alert/G9.png',
        'img/4_enemie_boss_chicken/2_alert/G10.png',
        'img/4_enemie_boss_chicken/2_alert/G11.png',
        'img/4_enemie_boss_chicken/2_alert/G12.png'
    ];
    IMAGES_ATTACK = [
        'img/4_enemie_boss_chicken/3_attack/G13.png',
        'img/4_enemie_boss_chicken/3_attack/G14.png',
        'img/4_enemie_boss_chicken/3_attack/G15.png',
        'img/4_enemie_boss_chicken/3_attack/G16.png',
        'img/4_enemie_boss_chicken/3_attack/G17.png',
        'img/4_enemie_boss_chicken/3_attack/G18.png',
        'img/4_enemie_boss_chicken/3_attack/G19.png',
        'img/4_enemie_boss_chicken/3_attack/G20.png'
    ];
    IMAGES_HURT = [
        'img/4_enemie_boss_chicken/4_hurt/G21.png',
        'img/4_enemie_boss_chicken/4_hurt/G22.png',
        'img/4_enemie_boss_chicken/4_hurt/G23.png'
    ];
    IMAGES_DEAD = [
        'img/4_enemie_boss_chicken/5_dead/G24.png',
        'img/4_enemie_boss_chicken/5_dead/G25.png',
        'img/4_enemie_boss_chicken/5_dead/G26.png'
    ];


    /**
     * Constructor for a endboss object
     */
    constructor() {
        super().loadImage(this.IMAGES_WALKING[0]);
        this.loadImages(this.IMAGES_WALKING);
        this.loadImages(this.IMAGES_ALERT);
        this.loadImages(this.IMAGES_ATTACK);
        this.loadImages(this.IMAGES_HURT);
        this.loadImages(this.IMAGES_DEAD);
        this.x = 2600;
        this.animate();
    }


    /**
     * This function executes all the animation for the endboss
     */
    animate() {
        setInterval(() => {
            this.firstContactWithEndboss();
        }, 150);

        setInterval(() => {
            this.playEndbossAnimations();
        }, 150);
    }


    /**
     * This function lets move the endboss left after he had a first contact with the character
     */
    firstContactWithEndboss() {
        if (world.character.x > 2000 && !this.hadFirstContact) {
            this.hadFirstContact = true;
            console.log('first contact is:', this.hadFirstContact);
        } else if (!this.isDead() && this.hadFirstContact) {
            this.moveLeft();
            this.speed = 3;
        }
    }


    /**
     * This function plays the animations for the endboss
     */
    playEndbossAnimations() {
        if (this.isDead() && !this.endbossIsDead) {
            this.deadEndboss();
        } else if (this.isHurt() && !this.endbossIsDead) {
            this.playAnimation(this.IMAGES_HURT);
            playAudio(this.endbossHurt_sound);
            this.speed = 0;
        } else if (!this.endbossIsDead) {
            this.playAnimation(this.IMAGES_WALKING);
        }
    }


    /**
     * This function plays the sound and the animation when the endboss ist dead and it executes another function
     */
    deadEndboss() {
        this.endbossIsDead = true;

        setTimeout(() => {
            playAudio(this.endbossDead_sound);
        }, 150);

        setInterval(() => {
            this.playAnimation(this.IMAGES_DEAD);
            this.y += 25;
        }, 150);

        this.showGameOverScreen();
    }


    /**
     * This function shows the "Game Over" screen after the endboss died
     */
    showGameOverScreen() {
        setTimeout(() => {
            playAudio(this.win_sound);
            document.getElementById('gameOverScreen').classList.remove('d-none');
            document.getElementById('gameOverScreen').classList.add('gameOverScreen');
        }, 2500);
    }
}