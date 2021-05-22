MyGame.objects.Background = function(spec) {
    'use strict';

    let imageReady = true;
    let image = spec.imageAsset;

    let api = {
        get imageReady() { return imageReady; },
        get image() { return image; },
        get center() { return spec.center; },
        get size() { return spec.size; }
    };

    return api;
}
