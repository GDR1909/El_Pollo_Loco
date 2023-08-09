class Bottle extends MoveableObject {
    height = 50;
    width = 50;
    y = 380;


    constructor(imagePath) {
        super().loadImage(imagePath);
        this.x = 200 + Math.random() * 2000;
    }
}