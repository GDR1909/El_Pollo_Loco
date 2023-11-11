class Character extends MoveableObject {
    height = 280;
    width = 120;
    y = 50;
    speed = 10;
    characterIsHurt = false;
    characterIsDead = false;
    IMAGES_IDLE = [
        'img/2_character_pepe/1_idle/idle/I-1.png',
        'img/2_character_pepe/1_idle/idle/I-2.png',
        'img/2_character_pepe/1_idle/idle/I-3.png',
        'img/2_character_pepe/1_idle/idle/I-4.png',
        'img/2_character_pepe/1_idle/idle/I-5.png',
        'img/2_character_pepe/1_idle/idle/I-6.png',
        'img/2_character_pepe/1_idle/idle/I-7.png',
        'img/2_character_pepe/1_idle/idle/I-8.png',
        'img/2_character_pepe/1_idle/idle/I-9.png',
        'img/2_character_pepe/1_idle/idle/I-10.png',
        'img/2_character_pepe/1_idle/long_idle/I-11.png',
        'img/2_character_pepe/1_idle/long_idle/I-12.png',
        'img/2_character_pepe/1_idle/long_idle/I-13.png',
        'img/2_character_pepe/1_idle/long_idle/I-14.png',
        'img/2_character_pepe/1_idle/long_idle/I-15.png',
        'img/2_character_pepe/1_idle/long_idle/I-16.png',
        'img/2_character_pepe/1_idle/long_idle/I-17.png',
        'img/2_character_pepe/1_idle/long_idle/I-18.png',
        'img/2_character_pepe/1_idle/long_idle/I-19.png',
        'img/2_character_pepe/1_idle/long_idle/I-20.png'
    ];
    IMAGES_WALKING = [
        'img/2_character_pepe/2_walk/W-21.png',
        'img/2_character_pepe/2_walk/W-22.png',
        'img/2_character_pepe/2_walk/W-23.png',
        'img/2_character_pepe/2_walk/W-24.png',
        'img/2_character_pepe/2_walk/W-25.png',
        'img/2_character_pepe/2_walk/W-26.png'
    ];
    IMAGES_JUMPING = [
        'img/2_character_pepe/3_jump/J-31.png',
        'img/2_character_pepe/3_jump/J-32.png',
        'img/2_character_pepe/3_jump/J-33.png',
        'img/2_character_pepe/3_jump/J-34.png',
        'img/2_character_pepe/3_jump/J-35.png',
        'img/2_character_pepe/3_jump/J-36.png',
        'img/2_character_pepe/3_jump/J-37.png',
        'img/2_character_pepe/3_jump/J-38.png',
        'img/2_character_pepe/3_jump/J-39.png'

    ];
    IMAGES_HURT = [
        'img/2_character_pepe/4_hurt/H-41.png',
        'img/2_character_pepe/4_hurt/H-42.png',
        'img/2_character_pepe/4_hurt/H-43.png'
    ];
    IMAGES_DEAD = [
        'img/2_character_pepe/5_dead/D-51.png',
        'img/2_character_pepe/5_dead/D-52.png',
        'img/2_character_pepe/5_dead/D-53.png',
        'img/2_character_pepe/5_dead/D-54.png',
        'img/2_character_pepe/5_dead/D-55.png',
        'img/2_character_pepe/5_dead/D-56.png',
        'img/2_character_pepe/5_dead/D-57.png'
    ];
    world;
    idle_sound = new Audio('audio/idle.mp3');
    walking_sound = new Audio('audio/running.mp3');
    jumping_sound = new Audio('audio/jump.mp3');
    hurting_sound = new Audio('audio/hurt.mp3');
    characterDead_sound = new Audio('audio/characterDead.mp3');
    lose_sound = new Audio('audio/failure.mp3');

    // offset = {
    //     top: 20,
    //     bottom: 30,
    //     left: 40,
    //     right: 30
    // };


    constructor() {
        super().loadImage('img/2_character_pepe/2_walk/W-21.png');
        this.loadImages(this.IMAGES_IDLE);
        this.loadImages(this.IMAGES_WALKING);
        this.loadImages(this.IMAGES_JUMPING);
        this.loadImages(this.IMAGES_HURT);
        this.loadImages(this.IMAGES_DEAD);
        this.applyGravity();
        this.animate();
    }


    animate() {
        setInterval(() => {
            this.walking_sound.pause();
            if (this.world.keyboard.RIGHT && this.x < this.world.level.level_end_x) {
                this.moveRight();
                this.otherDirection = false;
                this.walking_sound.play();
            }

            if (this.world.keyboard.LEFT && this.x > 0) {
                this.moveLeft();
                this.otherDirection = true;
                this.walking_sound.play();
            }

            if (this.world.keyboard.SPACE && !this.isAboveGround()) {
                this.jump();
                this.jumping_sound.play();
            }

            this.world.camera_x = -this.x + 100;
        }, 1000 / 60);

        setInterval(() => {
            this.idle_sound.pause();
            if (this.isDead() && !this.characterIsDead) {
                this.characterIsDead = true;
                this.characterDead();
            } else if (this.isHurt()) {
                this.playAnimation(this.IMAGES_HURT);
                this.hurting_sound.play();
                this.speed = 2;
                this.characterIsHurt = true;
                setTimeout(() => {
                    this.speed = 5;
                    this.characterIsHurt = false;
                }, 1500);
            } else if (this.isAboveGround()) {
                this.playAnimation(this.IMAGES_JUMPING);
            } else if (this.world.keyboard.RIGHT || this.world.keyboard.LEFT) { // Das "||" bedeutet in JavaScript bei einer if-Abfrage logisches "oder".
                this.playAnimation(this.IMAGES_WALKING);
            } else {
                setTimeout(() => {
                    this.isIdle();
                }, 2000);
            }
        }, 100);
    }


    isIdle() {
        let right = this.world.keyboard.RIGHT;
        let left = this.world.keyboard.LEFT;
        let space = this.world.keyboard.SPACE;
        let d = this.world.keyboard.D;

        if (right == false && left == false && space == false && d == false && !this.characterIsDead) {
            this.playAnimation(this.IMAGES_IDLE);
            this.idle_sound.play();
        }
    }


    characterDead() {
        setTimeout(() => {
            this.characterDead_sound.play();
        }, 150);

        setInterval(() => {
            this.speed = 0;
            this.playAnimation(this.IMAGES_DEAD);
            this.y += 20;
        }, 150);

        this.showYouLostScreen();
    }


    showYouLostScreen() {
        document.getElementById('canvas').style.filter = 'grayscale(100%)';
        document.getElementById('canvas').style.transition = 'filter 2s ease-in-out';

        setTimeout(() => {
            this.lose_sound.play();
            document.getElementById('youLostScreen').classList.remove('d-none');
            document.getElementById('youLostScreen').classList.add('youLostScreen');
        }, 2500);
    }
}