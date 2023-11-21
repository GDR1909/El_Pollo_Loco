// hier weiter machen mit js doc

class Chicken extends MoveableObject {
    height = 60;
    width = 60;
    y = 360;
    energy = 20;
    IMAGES_WALKING = [
        'img/3_enemies_chicken/chicken_normal/1_walk/1_w.png',
        'img/3_enemies_chicken/chicken_normal/1_walk/2_w.png',
        'img/3_enemies_chicken/chicken_normal/1_walk/3_w.png'
    ];
    IMAGE_DEAD = ['img/3_enemies_chicken/chicken_normal/2_dead/dead.png'];
    dead_sound = new Audio('audio/chickenDead.mp3');


    constructor() {
        super().loadImage('img/3_enemies_chicken/chicken_normal/1_walk/1_w.png');
        this.loadImages(this.IMAGES_WALKING);
        this.loadImages(this.IMAGE_DEAD);

        this.x = 200 + Math.random() * 2000; // zufällige Zahl zwischen 200 und 700
        this.speed = 0.15 + Math.random() * 0.5;

        this.animate();
    }


    animate() {
        setInterval(() => {
            if (!this.isDead()) {
                this.moveLeft();
            }
        }, 1000 / 60);
        
        setInterval(() => {
            if (this.isDead()) {
                this.playAnimation(this.IMAGE_DEAD);
            } else {
                this.playAnimation(this.IMAGES_WALKING);
            }
        }, 200);
    }
}