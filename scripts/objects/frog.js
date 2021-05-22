MyGame.objects.Frog = function(spec) {
    'use strict';

    let rotation = 0;
    let moveRate = 175;
    let posX = 0;
    let posY = 0;
    let row = 0;
    let col = 0;
    let lastMove = 0;

    let imageReady = true;
    let image = spec.imageAsset;

    function setRotation(angle) {
        rotation = angle;
    }

    function moveLeft(elapsedTime){
      if (atEdge() === 2) {
        return;
      }
      if (lastMove < moveRate) {
        return false;
      }
      rotation = 270;

      spec.center.x -= spec.squareSize;
      lastMove = 0;
      return true;
    }

    function moveRight(elapsedTime){
      if (atEdge() === 1) {
        return;
      }
      if (lastMove < moveRate) {
        return false;
      }
      rotation = 90;

      spec.center.x += spec.squareSize;
      lastMove = 0;
      return true;
    }


    function moveUp(elapsedTime){
      if (atEdge() === 4) {
        return;
      }
      if (lastMove < moveRate) {
        return false;
      }
      rotation = 0;

      spec.center.y -= spec.squareSize;
      lastMove = 0;
      return true;
    }


    function moveDown(elapsedTime){
      if (atEdge() === 3) {
        return;
      }
      if (lastMove < moveRate) {
        return false;
      }
      rotation = 180;

      spec.center.y += spec.squareSize;
      lastMove = 0;
      return true;
    }


    function updateFrog(elapsedTime){
      lastMove += elapsedTime;
    }


    function atEdge(){
      if (spec.center.x > 960) {
        return 1;
      }
      if (spec.center.x < 40) {
        return 2;
      }
      if (spec.center.y > 960) {
        return 3;
      }
      if (spec.center.y < 120) {
        return 4;
      }
    }

    function floatFrog(elapsedTime, speed, direction){
      spec.center.x += elapsedTime * speed * direction;

    }


    function setPosition(x, y){
      spec.center.x = x;
      spec.center.y = y;
      setRotation(0);
    }




    let api = {
        setRotation: setRotation,
        moveLeft: moveLeft,
        moveRight: moveRight,
        moveUp: moveUp,
        moveDown: moveDown,
        updateFrog: updateFrog,
        floatFrog: floatFrog,
        setPosition: setPosition,
        get imageReady() { return imageReady; },
        get rotation() { return (rotation * (Math.PI / 180)); },
        get position() { return spec.position; },
        get center() { return spec.center; },
        get size() { return spec.size; },
        get image() { return image; },
    };

    return api;
}
