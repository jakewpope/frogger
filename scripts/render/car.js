MyGame.render.Car = (function(graphics) {
    'use strict';

    function render(spec) {
        if (spec.imageReady) {

            graphics.drawTexture(spec.image, spec.center,  spec.rotation, spec.size);

        } else {

        }
    }

    return {
        render: render
    };
}(MyGame.graphics));
