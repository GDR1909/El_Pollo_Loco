class Coin extends MoveableObject {
    height = 100;
    width = 100;


    constructor(imagePath) {
        super().loadImage(imagePath);
        this.x = 200 + Math.random() * 2000;
        this.y = 350 - Math.random() * 300;
    }
}