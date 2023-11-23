class BackgroundObject extends MoveableObject {
    width = 720;
    height = 480;

    
    /**
     * Constructor for a background object
     * @param {string} imagePath - The path to the object's image
     * @param {number} x - The X-coordinate of the object
     */
    constructor(imagePath, x) {
        super().loadImage(imagePath);
        this.x = x;
        this.y = 480 - this.height;
    }
}