class MoveableObject {
    x = 120;
    y = 250;
    img;
    height = 150;
    width = 100;


    // loadImage('img/test.png');
    loadImage(path) {
        this.img = new Image(); // Erklärung: this.img = document.getElementById('image') <img id="image" src="">
        this.img.src = path;
    }


    moveRight() {
        console.log('Moving right!');
    }


    moveLeft() {
        
    }
}