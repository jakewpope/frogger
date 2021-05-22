MyGame.objects.Pond = function(spec) {
    'use strict';

    let rotation = 0;
    let posX = 0;
    let posY = 0;
    let row = 0;
    let col = 0;
    let lastMove = 0;
    let isFull = 0;
    let isFly = 0;
    let isGator = 0;

    let imageReady = true;
    let image = spec.imageList[isFull];

    function setRotation(angle) {
        rotation = howMuch;
    }


    function fill(){
      isFull = 1;
      updateImage(1);
    }


    function empty(){
      isFull = 0;
      isFly = 0;
      isGator = 0;
      updateImage(0);
    }

    function emptyBonus(){
      isFly = 0;
      isGator = 0;
      if (isFull === 1) {
        updateImage(1);
      } else {
        updateImage(0);
      }

    }

    function fillFly(){
      isFly = 1;
      updateImage(2);
    }


    function fillGator(){
      isGator = 1;
      updateImage(3);
    }


    function updateImage(img){
      image = spec.imageList[img];
    }


    let api = {
        setRotation: setRotation,
        fill: fill,
        empty: empty,
        fillFly: fillFly,
        fillGator: fillGator,
        emptyBonus: emptyBonus,
        get isFly() {return isFly; },
        get isGator() {return isGator; },
        get isFull() {return isFull;},
        get imageReady() { return imageReady; },
        get rotation() { return (rotation * (Math.PI / 180)); },
        get position() { return spec.position; },
        get center() { return spec.center; },
        get size() { return spec.size; },
        get image() { return image; },
    };

    return api;
}
