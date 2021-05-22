let MyGame = {
    screens : {},
    systems : {},
    input: {},
    objects: {},
    render: [],
    assets: {}
};

//------------------------------------------------------------------
//
// Purpose of this code is to bootstrap (maybe I should use that as the name)
// the rest of the application.  Only this file is specified in the index.html
// file, then the code in this file gets all the other code and assets
// loaded.
//
//------------------------------------------------------------------
MyGame.loader = (function() {
    'use strict';
    let scriptOrder = [{
            scripts: ['random'],
            message: 'Random number generator loaded',
            onComplete: null
        }, {
            scripts: ['Render/core'],
            message: 'Rendering core loaded',
            onComplete: null
        }, {
            scripts: ['Render/background'],
            message: 'Background renderer loaded',
            onComplete: null
        }, {
            scripts: ['Render/particle-system'],
            message: 'PS renderer loaded',
            onComplete: null
        }, {
            scripts: ['Render/text'],
            message: 'Text renderer loaded',
            onComplete: null
        }, {
            scripts: ['Render/turtle'],
            message: 'Turtle renderer loaded',
            onComplete: null
        }, {
            scripts: ['Render/frog'],
            message: 'Frog renderer loaded',
            onComplete: null
        }, {
            scripts: ['Render/log'],
            message: 'Log renderer loaded',
            onComplete: null
        }, {
            scripts: ['Render/car'],
            message: 'Car renderer loaded',
            onComplete: null
        }, {
            scripts: ['Render/gator'],
            message: 'Gator renderer loaded',
            onComplete: null
        }, {
            scripts: ['Render/pond'],
            message: 'Pond renderer loaded',
            onComplete: null
        }, {
            scripts: ['systems/particle-system'],
            message: 'PS loaded',
            onComplete: null
        }, {
            scripts: ['objects/background'],
            message: 'Background object loaded',
            onComplete: null
        }, {
            scripts: ['objects/turtle'],
            message: 'Turtle object loaded',
            onComplete: null
        }, {
            scripts: ['objects/text'],
            message: 'Text object loaded',
            onComplete: null
        }, {
            scripts: ['objects/log'],
            message: 'Log object loaded',
            onComplete: null
        }, {
            scripts: ['objects/pond'],
            message: 'Pond object loaded',
            onComplete: null
        }, {
            scripts: ['objects/frog'],
            message: 'Frog Object Loaded',
            onComplete: null
        }, {
            scripts: ['objects/gator'],
            message: 'Gator Object Loaded',
            onComplete: null
        }, {
            scripts: ['objects/car'],
            message: 'Car Object Loaded',
            onComplete: null
        }, {
            scripts: ['game'],
            message: 'Game loop and model loaded',
            onComplete: null
        }, {
            scripts: ['keyboardInput'],
            message: 'keyboardInput loaded',
            onComplete: null
        }, {
            scripts: ['controls'],
            message: 'Controls Loaded',
            onComplete: null
        }, {
            scripts: ['credits'],
            message: 'Credits loaded',
            onComplete: null
        }, {
            scripts: ['mainMenu'],
            message: 'Main Menu loaded',
            onComplete: null
        }, {
            scripts: ['highScores'],
            message: 'High Scores loaded',
            onComplete: null
        }, {
            scripts: ['gamePlay'],
            message: 'Gameplay loaded',
            onComplete: null
        }, {
            scripts: ['controls'],
            message: 'Controls loaded',
            onComplete: null
        }];

    let assetOrder = [{
            key: 'background',
            source: '/assets/background.png'
        }, {
            key: 'singleFrog',
            source: '/assets/singlefrog.png'
        }, {
            key: 'carOne',
            source: '/assets/carOne.png'
        }, {
            key: 'carTwo',
            source: '/assets/carTwo.png'
        }, {
            key: 'carThree',
            source: '/assets/carThree.png'
        }, {
            key: 'carFour',
            source: '/assets/carFour.png'
        }, {
            key: 'truck',
            source: '/assets/truck.png'
        }, {
            key: 'turtles',
            source: '/assets/turtles.png'
        }, {
            key: 'turtle',
            source: '/assets/singleturtle.png'
        }, {
            key: 'turtle2',
            source: '/assets/singleturtle2.png'
        }, {
            key: 'turtle3',
            source: '/assets/singleturtle3.png'
        }, {
            key: 'gator1',
            source: '/assets/gatorone.png'
        }, {
            key: 'gator2',
            source: '/assets/gatortwo.png'
        }, {
            key: 'pond',
            source: '/assets/pond.png'
        }, {
            key: 'fullPond',
            source: '/assets/fullpond.png'
        }, {
            key: 'flyPond',
            source: '/assets/flypond.png'
        }, {
            key: 'gatorPond',
            source: '/assets/gatorpond.png'
        }, {
            key: 'log',
            source: '/assets/log.png'
        }, {
            key: 'gameAudio',
            source: '/audio/gameAudio.mp3'
        }, {
            key: 'hopAudio',
            source: '/audio/hop.mp3'
        }, {
            key: 'plunkAudio',
            source: '/audio/plunk.mp3'
        }, {
            key: 'squashAudio',
            source: '/audio/squash.mp3'
        }, {
            key: 'timeAudio',
            source: '/audio/time.mp3'
        }];

    //------------------------------------------------------------------
    //
    // Helper function used to load scripts in the order specified by the
    // 'scripts' parameter.  'scripts' expects an array of objects with
    // the following format...
    //    {
    //        scripts: [script1, script2, ...],
    //        message: 'Console message displayed after loading is complete',
    //        onComplete: function to call when loading is complete, may be null
    //    }
    //
    //------------------------------------------------------------------
    function loadScripts(scripts, onComplete) {
        //
        // When we run out of things to load, that is when we call onComplete.
        if (scripts.length > 0) {
            let entry = scripts[0];
            require(entry.scripts, function() {
                console.log(entry.message);
                if (entry.onComplete) {
                    entry.onComplete();
                }
                scripts.shift();    // Alternatively: scripts.splice(0, 1);
                loadScripts(scripts, onComplete);
            });
        } else {
            onComplete();
        }
    }

    //------------------------------------------------------------------
    //
    // Helper function used to load assets in the order specified by the
    // 'assets' parameter.  'assets' expects an array of objects with
    // the following format...
    //    {
    //        key: 'asset-1',
    //        source: 'asset/.../asset.png'
    //    }
    //
    // onSuccess is invoked per asset as: onSuccess(key, asset)
    // onError is invoked per asset as: onError(error)
    // onComplete is invoked once per 'assets' array as: onComplete()
    //
    //------------------------------------------------------------------
    function loadAssets(assets, onSuccess, onError, onComplete) {
        //
        // When we run out of things to load, that is when we call onComplete.
        if (assets.length > 0) {
            let entry = assets[0];
            loadAsset(entry.source,
                function(asset) {
                    onSuccess(entry, asset);
                    assets.shift();    // Alternatively: assets.splice(0, 1);
                    loadAssets(assets, onSuccess, onError, onComplete);
                },
                function(error) {
                    onError(error);
                    assets.shift();    // Alternatively: assets.splice(0, 1);
                    loadAssets(assets, onSuccess, onError, onComplete);
                });
        } else {
            onComplete();
        }
    }

    //------------------------------------------------------------------
    //
    // This function is used to asynchronously load image and audio assets.
    // On success the asset is provided through the onSuccess callback.
    // Reference: http://www.html5rocks.com/en/tutorials/file/xhr2/
    //
    //------------------------------------------------------------------
    function loadAsset(source, onSuccess, onError) {
        let xhr = new XMLHttpRequest();
        let fileExtension = source.substr(source.lastIndexOf('.') + 1);    // Source: http://stackoverflow.com/questions/680929/how-to-extract-extension-from-filename-string-in-javascript

        if (fileExtension) {
            xhr.open('GET', source, true);
            xhr.responseType = 'blob';

            xhr.onload = function() {
                let asset = null;
                if (xhr.status === 200) {
                    if (fileExtension === 'png' || fileExtension === 'jpg') {
                        asset = new Image();
                    } else if (fileExtension === 'mp3') {
                        asset = new Audio();
                    } else {
                        if (onError) { onError('Unknown file extension: ' + fileExtension); }
                    }
                    asset.onload = function() {
                        window.URL.revokeObjectURL(asset.src);
                    };
                    asset.src = window.URL.createObjectURL(xhr.response);
                    if (onSuccess) { onSuccess(asset); }
                } else {
                    if (onError) { onError('Failed to retrieve: ' + source); }
                }
            };
        } else {
            if (onError) { onError('Unknown file extension: ' + fileExtension); }
        }

        xhr.send();
    }

    //------------------------------------------------------------------
    //
    // Called when all the scripts are loaded, it kicks off the demo app.
    //
    //------------------------------------------------------------------
    function mainComplete() {
        console.log('It is all loaded up');
        MyGame.game.initialize();
    }

    //
    // Start with loading the assets, then the scripts.
    console.log('Starting to dynamically load project assets');
    loadAssets(assetOrder,
        function(source, asset) {    // Store it on success
            MyGame.assets[source.key] = asset;
            console.log("ASSET: " + MyGame.assets[source.key]);
        },
        function(error) {
            console.log(error);

        },
        function() {
            console.log('All game assets loaded');
            console.log('Starting to dynamically load project scripts');
            loadScripts(scriptOrder, mainComplete);
        }
    );

}());
