MyGame.objects.Text = function(spec) {
    'use strict';

    let rotation = 0;

    function updateRotation(howMuch) {
        rotation += howMuch;
    }

    function updateText(value, color){
      spec.text = value;
      spec.fillStyle = color;
    }

    let api = {
        updateRotation: updateRotation,
        updateText: updateText,
        get rotation() { return rotation; },
        get position() { return spec.position; },
        get text() { return spec.text; },
        get font() { return spec.font; },
        get fillStyle() { return spec.fillStyle; },
        get strokeStyle() { return spec.strokeStyle; }
    };

    return api;
}
