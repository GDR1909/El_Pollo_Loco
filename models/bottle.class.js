class Bottle extends MoveableObject {
    height = 50;
    width = 50;
    y = 380;


    /**
     * Constructor for a bottle object
     * @param {string} imagePath - The path to the image of the bottle
     */
    constructor(imagePath) {
        super().loadImage(imagePath);
        this.x = 200 + Math.random() * 2000;
        this.offset = {
            top: 10,
            bottom: 5,
            left: 15,
            right: 15
        };
    }
}