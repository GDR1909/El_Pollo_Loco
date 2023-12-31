class Coin extends MoveableObject {
    height = 100;
    width = 100;
    IMAGES_COINS = [
        'img/8_coin/coin_1.png',
        'img/8_coin/coin_2.png'
    ];


    /**
     * Constructor for a coin object
     */
    constructor() {
        super().loadImage('img/8_coin/coin_1.png');
        this.loadImages(this.IMAGES_COINS);
        this.x = 200 + Math.random() * 2000;
        this.y = 350 - Math.random() * 300;
        this.animate();
        this.offset = {
            top: 35,
            bottom: 35,
            left: 35,
            right: 35
        };
    }


    /**
     * This function executes the animation for all coins
     */
    animate() {
        setInterval(() => {
            this.playAnimation(this.IMAGES_COINS);
        }, 200);
    }
}