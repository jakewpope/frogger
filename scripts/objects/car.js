MyGame.objects.Car = function(spec) {
    'use strict';

    let rotation = 0;
    let posX = 0;
    let posY = 0;
    let row = 0;
    let col = 0;
    let lastMove = 0;

    let imageReady = true;
    let image = spec.imageAsset;

    function setRotation(angle) {
        rotation = howMuch;
    }




    function updateCar(elapsedTime){
      if (spec.center.x <= -150) {
        spec.center.x += 1150;
      } else if (spec.center.x > 1150) {
        spec.center.x -= 1150;
      }
      spec.center.x += elapsedTime * spec.speed * spec.direction;
    }






    let api = {
        setRotation: setRotation,
        updateCar: updateCar,
        get imageReady() { return imageReady; },
        get rotation() { return (rotation * (Math.PI / 180)); },
        get position() { return spec.position; },
        get center() { return spec.center; },
        get size() { return spec.size; },
        get image() { return image; },
    };

    return api;
}
