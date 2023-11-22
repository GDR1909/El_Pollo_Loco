class StatusBarBottle extends DrawableObject {
    IMAGES_BOTTLE = [
        'img/7_statusbars/1_statusbar/3_statusbar_bottle/green/0.png',
        'img/7_statusbars/1_statusbar/3_statusbar_bottle/green/20.png',
        'img/7_statusbars/1_statusbar/3_statusbar_bottle/green/40.png',
        'img/7_statusbars/1_statusbar/3_statusbar_bottle/green/60.png',
        'img/7_statusbars/1_statusbar/3_statusbar_bottle/green/80.png',
        'img/7_statusbars/1_statusbar/3_statusbar_bottle/green/100.png'
    ];
    percentage = 0;
    bottleAmount = 0;


    constructor() {
        super();
        this.loadImages(this.IMAGES_BOTTLE);
        this.x = 5;
        this.y = 35;
        this.width = 200;
        this.height = 50;
        this.setPercentage(0);
    }


    /**
     * This function increases the amount of bottles by 20 when it isn't 100
     */
    collectBottle() {
        this.bottleAmount += 20;
        if (this.bottleAmount > 100) {
            this.bottleAmount = 100;
        }
    }


    /**
     * This function decreases the amount of bottles by 20 when it isn't 0
     */
    removeBottle() {
        this.bottleAmount -= 20;
        if (this.bottleAmount < 0) {
            this.bottleAmount = 0;
        }
    }


    /**
     * This function sets the percentage for the bottle satusbar
     * @param {Percentage} percentage 
     */
    setPercentage(percentage) { //Bsp: setPercentage(50);
        this.percentage = percentage; // => 0 ... 5
        let path = this.IMAGES_BOTTLE[this.resolveImageIndex()];
        this.img = this.imageCache[path];
    }


    /**
     * This function displays the correct value for the statusbar
     * @returns the position of the image in the array "IMAGES_BOTTLE"
     */
    resolveImageIndex() {
        if (this.percentage == 100) {
            return 5;
        } else if (this.percentage > 79) {
            return 4;
        } else if (this.percentage > 59) {
            return 3;
        } else if (this.percentage > 39) {
            return 2;
        } else if (this.percentage > 19) {
            return 1;
        } else {
            return 0;
        }
    }
}