class Level {
    enemies;
    clouds;
    backgroundObjects;
    level_end_x = 2200;
    bottles;
    coins;


    /**
     * Constructor for a level object
     * @param {array} enemies - Array of enemy objects
     * @param {array} clouds - Array of cloud objects
     * @param {array} backgroundObjects - Array of background objects
     * @param {array} bottles - Array of bottle objects
     * @param {array} coins - Array of coin objects
     */
    constructor(enemies, clouds, backgroundObjects, bottles, coins) {
        this.enemies = enemies;
        this.clouds = clouds;
        this.backgroundObjects = backgroundObjects;
        this.bottles = bottles;
        this.coins = coins;
    }
}