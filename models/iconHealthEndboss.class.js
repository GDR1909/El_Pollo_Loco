class IconHealthEndboss extends DrawableObject {
    ICON_HEALTH_ENDBOSS = 'img/7_statusbars/3_icons/icon_health_endboss.png';


    /**
     * Constructor for an endboss health icon object
     */
    constructor() {
        super();
        this.loadImage(this.ICON_HEALTH_ENDBOSS);
        this.x = 504;
        this.y = -3;
        this.height = 50;
        this.width = 50;
    }
}