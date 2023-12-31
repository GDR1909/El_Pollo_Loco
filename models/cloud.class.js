class Cloud extends MoveableObject {
    y = 20;
    width = 500;
    height = 250;


    /**
     * Constructor for a cloud object
     */
    constructor() {
        super().loadImage('img/5_background/layers/4_clouds/1.png');
        this.x = Math.random() * 500; // zufällige Zahl zwischen 200 und 700
        this.animate();
    }


    /**
     * This function lets the clouds moving left
     */
    animate() {
        this.moveLeft();
    }
}