MyGame.objects.Gator = function(spec) {
    'use strict';

    let rotation = 0;
    let phase = 0;
    let posX = 0;
    let posY = 0;
    let row = 0;
    let col = 0;
    let lastMove = 0;
    let inPhase = 0;

    let imageReady = true;
    let image = spec.imageList[phase];

    const TIME_PER_PHASE = 800;
    const NUM_PHASES = 2;

    function setRotation(angle) {
        rotation = howMuch;
    }




    function updateGator(elapsedTime){
      updatePhase(elapsedTime);
      if (spec.center.x <= -150) {
        spec.center.x += 1150;
      } else if (spec.center.x > 1150) {
        spec.center.x -= 1150;
      }
      spec.center.x += elapsedTime * spec.speed * spec.direction;
    }

    function updatePhase(elapsedTime){
      if (inPhase > TIME_PER_PHASE) {
        phase += 1;
        if (phase === NUM_PHASES) {
          phase = 0;
        }
        inPhase = 0;
        updateImage();
      } else {
        inPhase += elapsedTime;
      }
    }

    function updateImage(){
      image = spec.imageList[phase];
    }






    let api = {
        setRotation: setRotation,
        updateGator: updateGator,
        get imageReady() { return imageReady; },
        get rotation() { return (rotation * (Math.PI / 180)); },
        get position() { return spec.position; },
        get center() { return spec.center; },
        get size() { return spec.size; },
        get image() { return image; },
    };

    return api;
}
