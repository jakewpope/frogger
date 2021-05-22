MyGame.screens['controls'] = (function(game) {
    'use strict';

    function initialize() {
        if (window.localStorage.getItem("controls") === null) {
          let cItem = {
            down: 'ArrowDown',
            left: 'ArrowLeft',
            right: 'ArrowRight',
            up: 'ArrowUp',
          };
          let temp = JSON.stringify(cItem);
          window.localStorage.setItem("controls", temp);

        }
        var cItem = JSON.parse(window.localStorage.getItem("controls"));
        document.getElementById('id-controls-left').textContent = 'Left: ' + cItem.left;
        document.getElementById('id-controls-right').textContent = 'Right: ' + cItem.right;
        document.getElementById('id-controls-up').textContent = 'Up: ' + cItem.up;
        document.getElementById('id-controls-down').textContent = 'Down: ' + cItem.down;

        document.getElementById('id-controls-back').addEventListener(
            'click',
            function() { game.showScreen('main-menu'); });

        function recordLeftKey(key) {
          var cItem = JSON.parse(window.localStorage.getItem("controls"));
          cItem.left = key.key;
          let temp = JSON.stringify(cItem);
          window.localStorage.setItem("controls", temp);
          document.removeEventListener('keydown', recordLeftKey);
          var cItem = JSON.parse(window.localStorage.getItem("controls"));
          document.getElementById('id-controls-left').textContent = 'Left: ' + cItem.left;
        }

        function recordRightKey(key) {
          var cItem = JSON.parse(window.localStorage.getItem("controls"));
          cItem.right = key.key;
          let temp = JSON.stringify(cItem);
          window.localStorage.setItem("controls", temp);
          document.removeEventListener('keydown', recordRightKey);
          var cItem = JSON.parse(window.localStorage.getItem("controls"));
          document.getElementById('id-controls-right').textContent = 'Right: ' + cItem.right;
        }

        function recordUpKey(key) {
          var cItem = JSON.parse(window.localStorage.getItem("controls"));
          cItem.up = key.key;
          let temp = JSON.stringify(cItem);
          window.localStorage.setItem("controls", temp);
          document.removeEventListener('keydown', recordUpKey);
          var cItem = JSON.parse(window.localStorage.getItem("controls"));
          document.getElementById('id-controls-up').textContent = 'Up: ' + cItem.up;
        }

        function recordDownKey(key) {
          var cItem = JSON.parse(window.localStorage.getItem("controls"));
          cItem.down = key.key;
          let temp = JSON.stringify(cItem);
          window.localStorage.setItem("controls", temp);
          document.removeEventListener('keydown', recordDownKey);
          var cItem = JSON.parse(window.localStorage.getItem("controls"));
          document.getElementById('id-controls-down').textContent = 'Down: ' + cItem.down;
        }

        document.getElementById("id-controls-left").addEventListener(
          'click',
          function() {
            document.addEventListener('keydown', recordLeftKey);
          });

        document.getElementById("id-controls-right").addEventListener(
          'click',
          function() {
            document.addEventListener('keydown', recordRightKey);
          });

          document.getElementById("id-controls-up").addEventListener(
            'click',
            function() {
              document.addEventListener('keydown', recordUpKey);
            });

          document.getElementById("id-controls-down").addEventListener(
            'click',
            function() {
              document.addEventListener('keydown', recordDownKey);
            });
    }

    function run() {

    }

    return {
        initialize : initialize,
        run : run
    };
}(MyGame.game));
