MyGame.screens['high-scores'] = (function(game) {
    'use strict';

    function initialize() {
        if (window.localStorage.getItem("scores") === null) {
          let sItem = [100, 10, 15, 35, 40];

          let temp = JSON.stringify(sItem);
          window.localStorage.setItem("scores", temp);
        }


        document.getElementById('id-high-scores-back').addEventListener(
            'click',
            function() { game.showScreen('main-menu'); });
    }

    function run() {
      var sItem = JSON.parse(window.localStorage.getItem("scores"));
      sItem.sort(function(a, b) {
        return b - a;
      });

      if (sItem[0] != null) {
        document.getElementById('id-score-5').textContent = sItem[0];
      }
      if (sItem[1] != null) {
        document.getElementById('id-score-4').textContent = sItem[1];
      }
      if (sItem[2] != null) {
        document.getElementById('id-score-3').textContent = sItem[2];
      }
      if (sItem[3] != null) {
        document.getElementById('id-score-2').textContent = sItem[3];
      }
      if (sItem[4] != null) {
        document.getElementById('id-score-1').textContent = sItem[4];
      }

    }

    return {
        initialize : initialize,
        run : run
    };
}(MyGame.game));
