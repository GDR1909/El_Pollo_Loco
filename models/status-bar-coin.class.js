class StatusBarCoin extends DrawableObject {
    IMAGES_COIN = [
        'img/7_statusbars/1_statusbar/1_statusbar_coin/green/0.png',
        'img/7_statusbars/1_statusbar/1_statusbar_coin/green/20.png',
        'img/7_statusbars/1_statusbar/1_statusbar_coin/green/40.png',
        'img/7_statusbars/1_statusbar/1_statusbar_coin/green/60.png',
        'img/7_statusbars/1_statusbar/1_statusbar_coin/green/80.png',
        'img/7_statusbars/1_statusbar/1_statusbar_coin/green/100.png',
    ];
    percentage = 0;
    coinAmount = 0;


    constructor() {
        super();
        this.loadImages(this.IMAGES_COIN);
        this.x = 5;
        this.y = 80;
        this.width = 200;
        this.height = 50;
        this.setPercentage(0);
    }


    /**
     * This function increases the amount of coins by 20 when it isn't 100
     */
    collectCoin() {
        this.coinAmount += 20;
        if (this.coinAmount > 100) {
            this.coinAmount = 100;
        }
    }


    /**
     * This function sets the percentage for the coin satusbar
     * @param {Percentage} percentage 
     */
    setPercentage(percentage) { //Bsp: setPercentage(50);
        this.percentage = percentage; // => 0 ... 5
        let path = this.IMAGES_COIN[this.resolveImageIndex()];
        this.img = this.imageCache[path];
    }


    /**
     * This function displays the correct value for the statusbar
     * @returns the position of the image in the array "IMAGES_COIN"
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