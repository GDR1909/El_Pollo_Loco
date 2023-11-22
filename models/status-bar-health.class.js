class StatusBarHealth extends DrawableObject {
    IMAGES_HEALTH = [
        'img/7_statusbars/1_statusbar/2_statusbar_health/green/0.png',
        'img/7_statusbars/1_statusbar/2_statusbar_health/green/20.png',
        'img/7_statusbars/1_statusbar/2_statusbar_health/green/40.png',
        'img/7_statusbars/1_statusbar/2_statusbar_health/green/60.png',
        'img/7_statusbars/1_statusbar/2_statusbar_health/green/80.png',
        'img/7_statusbars/1_statusbar/2_statusbar_health/green/100.png'
    ];
    percentage = 100;


    constructor() {
        super();
        this.loadImages(this.IMAGES_HEALTH);
        this.x = 5;
        this.y = -10;
        this.width = 200;
        this.height = 50;
        this.setPercentage(100);
    }


    /**
     * This function sets the percentage for the character's health satusbar
     * @param {percentage} percentage 
     */
    setPercentage(percentage) { //Bsp: setPercentage(50);
        this.percentage = percentage; // => 0 ... 5
        let path = this.IMAGES_HEALTH[this.resolveImageIndex()];
        this.img = this.imageCache[path];
    }


    /**
     * This function displays the correct value for the statusbar
     * @returns the position of the image in the array "IMAGES_HEALTH"
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