class DrawableObject {
    img;
    imageCache = {};
    currentImage = 0;
    x = 120;
    y = 280;
    height = 150;
    width = 100;


    /**
     * This function loads the first image of an object
     * @param {imageSrc} path 
     */
    loadImage(path) { // loadImage('img/test.png');
        this.img = new Image(); // Erklärung: this.img = document.getElementById('image') <img id="image" src="">
        this.img.src = path;
    }


    /**
     * This function draws the image on the canvas
     * @param {context} ctx 
     */
    draw(ctx) {
        try {
            ctx.drawImage(this.img, this.x, this.y, this.width, this.height);
        } catch (e) {
            console.warn('Error loading image:', e);
            console.log('Could not load image:', this.img.src);
        }
    }


    /**
     * This function draws a frame around a moveable object
     * @param {context} ctx 
     */
    drawFrame(ctx) {
        if (this instanceof Character || this instanceof Chicken || this instanceof SmallChicken || this instanceof Endboss || this instanceof Coin || this instanceof Bottle || this instanceof ThrowableObject) {
            ctx.beginPath();
            ctx.lineWidth = '1';
            ctx.strokeStyle = 'blue';
            ctx.rect(this.x, this.y, this.width, this.height);
            ctx.stroke();
        }
    }


    /**
     * This function loads the images from arrays that are needed for the animations
     * @param {Array} arr - ['img/image1.png', 'img/image2.png', ...]
     */
    loadImages(arr) {
        arr.forEach((path) => {
            let img = new Image();
            img.src = path;
            this.imageCache[path] = img;
        });
    }
}