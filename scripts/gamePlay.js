MyGame.screens['game-play'] = (function(game, objects, renderer, graphics, input, assets) {
    'use strict';

    let score;
    let level;
    let lives;
    let gameAudio;
    let hopAudio;
    let squashAudio;
    let plunkAudio;
    let timeAudio;
    let timeLeft;
    let lastTimeStamp = performance.now();
    let cancelNextRequest = true;
    let finishedLevel = true;
    let carList = [];
    let logList = [];
    let turtleList = [];
    let gatorList = [];
    let frogList = [];
    let pondList = [];
    let pondTime;
    let totalLanded;

    const SPEED_ONE = 150 / 1000;
    const SPEED_TWO = 100 / 1000;
    const SPEED_THREE = 165 / 1000;
    const SPEED_FOUR = 450 / 1000;
    const SPEED_FIVE = 75 / 1000;
    const SPEED_SIX = 200 / 1000;
    const SPEED_SEVEN = 70 / 1000;
    const SPEED_EIGHT = 150 / 1000;
    const SPEED_NINE = 125 / 1000;
    const SPEED_TEN = 150 /1000;
    const GRID_SIZE = 14;
    const BONUS_TIME = 4000;

    /*
    ----------------------------------------------------------------------------
    BEGIN OBJECT DECLARATIONS
    ----------------------------------------------------------------------------
    */
    let myKeyboard = input.Keyboard();

    let myBackground = objects.Background({
      imageAsset: assets['background'],
      center: { x: graphics.canvas.width / 2, y: graphics.canvas.height / 2 },
      size: { width: 1000, height: 1000 }
    });

    let myScore = objects.Text({
      text: "",
      font: '50pt Arial',
      fillStyle: 'rgba(29, 195, 0, 1)',
      strokeStyle: 'rgba(0, 0, 0, 1)',
      position: { x: 480, y: (.6 * (1000 / GRID_SIZE)) - ((1000 / GRID_SIZE) / 2) }
    });

    let myTime = objects.Text({
      text: "",
      font: '50pt Arial',
      fillStyle: 'rgba(29, 195, 0, 1)',
      strokeStyle: 'rgba(0, 0, 0, 1)',
      position: { x: 800, y: (.6 * (1000 / GRID_SIZE)) - ((1000 / GRID_SIZE) / 2) }
    });

    let myFrog = objects.Frog({
        imageAsset: assets['singleFrog'],
        center:{x: (7 * (1000 / GRID_SIZE)) - ((1000 / GRID_SIZE) / 2), y: (14 * (1000 / GRID_SIZE)) - ((1000 / GRID_SIZE) / 2)},
        size: {width: (1000 / GRID_SIZE) - 10, height: (1000 / GRID_SIZE) - 10},
        squareSize: 1000 / GRID_SIZE,
    });
    frogList.push(myFrog);

    for (var i = 1; i < 8; i++) {
      let lifeFrog = objects.Frog({
        imageAsset: assets['singleFrog'],
        center:{x: (i * (1000 / GRID_SIZE)) - ((1000 / GRID_SIZE) / 2), y: (1 * (1000 / GRID_SIZE)) - ((1000 / GRID_SIZE) / 2)},
        size: {width: (1000 / GRID_SIZE) - 10, height: (1000 / GRID_SIZE) - 10},
        squareSize: 1000 / GRID_SIZE,
      });
      frogList.push(lifeFrog);
    }


    // ponds
    let pond1 = objects.Pond({
      imageList: [assets['pond'], assets['fullPond'], assets['flyPond'], assets['gatorPond']],
      center:{x: (1 * (1000 / GRID_SIZE)) - ((1000 / GRID_SIZE) / 2) + 75, y: (2 * (1000 / GRID_SIZE)) - ((1000 / GRID_SIZE) / 2)},
      size: {width: (1000 / GRID_SIZE) + 50, height: (1000 / GRID_SIZE)},
      squareSize: 1000 / GRID_SIZE,
    });
    pondList.push(pond1);

    let pond2 = objects.Pond({
      imageList: [assets['pond'], assets['fullPond'], assets['flyPond'], assets['gatorPond']],
      center:{x: (4 * (1000 / GRID_SIZE)) - ((1000 / GRID_SIZE) / 2) + 50, y: (2 * (1000 / GRID_SIZE)) - ((1000 / GRID_SIZE) / 2)},
      size: {width: (1000 / GRID_SIZE) + 50, height: (1000 / GRID_SIZE)},
      squareSize: 1000 / GRID_SIZE,
    });
    pondList.push(pond2);

    let pond3 = objects.Pond({
      imageList: [assets['pond'], assets['fullPond'], assets['flyPond'], assets['gatorPond']],
      center:{x: (7 * (1000 / GRID_SIZE)) - ((1000 / GRID_SIZE) / 2) + 50, y: (2 * (1000 / GRID_SIZE)) - ((1000 / GRID_SIZE) / 2)},
      size: {width: (1000 / GRID_SIZE) + 50, height: (1000 / GRID_SIZE)},
      squareSize: 1000 / GRID_SIZE,
    });
    pondList.push(pond3);

    let pond4 = objects.Pond({
      imageList: [assets['pond'], assets['fullPond'], assets['flyPond'], assets['gatorPond']],
      center:{x: (10 * (1000 / GRID_SIZE)) - ((1000 / GRID_SIZE) / 2) + 50, y: (2 * (1000 / GRID_SIZE)) - ((1000 / GRID_SIZE) / 2)},
      size: {width: (1000 / GRID_SIZE)+ 50, height: (1000 / GRID_SIZE)},
      squareSize: 1000 / GRID_SIZE,
    });
    pondList.push(pond4);

    let pond5 = objects.Pond({
      imageList: [assets['pond'], assets['fullPond'], assets['flyPond'], assets['gatorPond']],
      center:{x: (13 * (1000 / GRID_SIZE)) - ((1000 / GRID_SIZE) / 2) + 50, y: (2 * (1000 / GRID_SIZE)) - ((1000 / GRID_SIZE) / 2)},
      size: {width: (1000 / GRID_SIZE) + 50, height: (1000 / GRID_SIZE)},
      squareSize: 1000 / GRID_SIZE,
    });
    pondList.push(pond5);



    // row 1 of cars
    let car1 = objects.Car({
      imageAsset: assets['carOne'],
      center:{x: (8 * (1000 / GRID_SIZE)) - ((1000 / GRID_SIZE) / 2), y: (13 * (1000 / GRID_SIZE)) - ((1000 / GRID_SIZE) / 2)},
      size: {width: (1000 / GRID_SIZE) - 10, height: (1000 / GRID_SIZE) - 10},
      speed: SPEED_ONE,
      direction: -1
    });
    carList.push(car1);

    let car2 = objects.Car({
      imageAsset: assets['carOne'],
      center:{x: (10 * (1000 / GRID_SIZE)) - ((1000 / GRID_SIZE) / 2), y: (13 * (1000 / GRID_SIZE)) - ((1000 / GRID_SIZE) / 2)},
      size: {width: (1000 / GRID_SIZE) - 10, height: (1000 / GRID_SIZE) - 10},
      speed: SPEED_ONE,
      direction: -1
    });
    carList.push(car2);

    let car3 = objects.Car({
      imageAsset: assets['carOne'],
      center:{x: (4 * (1000 / GRID_SIZE)) - ((1000 / GRID_SIZE) / 2), y: (13 * (1000 / GRID_SIZE)) - ((1000 / GRID_SIZE) / 2)},
      size: {width: (1000 / GRID_SIZE) - 10, height: (1000 / GRID_SIZE) - 10},
      speed: SPEED_ONE,
      direction: -1
    });
    carList.push(car3);

    let car4 = objects.Car({
      imageAsset: assets['carOne'],
      center:{x: (14 * (1000 / GRID_SIZE)) - ((1000 / GRID_SIZE) / 2), y: (13 * (1000 / GRID_SIZE)) - ((1000 / GRID_SIZE) / 2)},
      size: {width: (1000 / GRID_SIZE) - 10, height: (1000 / GRID_SIZE) - 10},
      speed: SPEED_ONE,
      direction: -1
    });
    carList.push(car4);

    // row 2 of cars
    let car5 = objects.Car({
      imageAsset: assets['carTwo'],
      center:{x: (1 * (1000 / GRID_SIZE)) - ((1000 / GRID_SIZE) / 2), y: (12 * (1000 / GRID_SIZE)) - ((1000 / GRID_SIZE) / 2)},
      size: {width: (1000 / GRID_SIZE) - 10, height: (1000 / GRID_SIZE) - 10},
      speed: SPEED_TWO,
      direction: 1
    });
    carList.push(car5);

    let car6 = objects.Car({
      imageAsset: assets['carTwo'],
      center:{x: (5 * (1000 / GRID_SIZE)) - ((1000 / GRID_SIZE) / 2), y: (12 * (1000 / GRID_SIZE)) - ((1000 / GRID_SIZE) / 2)},
      size: {width: (1000 / GRID_SIZE) - 10, height: (1000 / GRID_SIZE) - 10},
      speed: SPEED_TWO,
      direction: 1
    });
    carList.push(car6);

    let car7 = objects.Car({
      imageAsset: assets['carTwo'],
      center:{x: (9 * (1000 / GRID_SIZE)) - ((1000 / GRID_SIZE) / 2), y: (12 * (1000 / GRID_SIZE)) - ((1000 / GRID_SIZE) / 2)},
      size: {width: (1000 / GRID_SIZE) - 10, height: (1000 / GRID_SIZE) - 10},
      speed: SPEED_TWO,
      direction: 1
    });
    carList.push(car7);

    let car8 = objects.Car({
      imageAsset: assets['carTwo'],
      center:{x: (13 * (1000 / GRID_SIZE)) - ((1000 / GRID_SIZE) / 2), y: (12 * (1000 / GRID_SIZE)) - ((1000 / GRID_SIZE) / 2)},
      size: {width: (1000 / GRID_SIZE) - 10, height: (1000 / GRID_SIZE) - 10},
      speed: SPEED_TWO,
      direction: 1
    });
    carList.push(car8);

    // row 3
    let car9 = objects.Car({
      imageAsset: assets['carThree'],
      center:{x: (4 * (1000 / GRID_SIZE)) - ((1000 / GRID_SIZE) / 2), y: (11 * (1000 / GRID_SIZE)) - ((1000 / GRID_SIZE) / 2)},
      size: {width: (1000 / GRID_SIZE) - 10, height: (1000 / GRID_SIZE) - 10},
      speed: SPEED_THREE,
      direction: -1
    });
    carList.push(car9);

    let car10 = objects.Car({
      imageAsset: assets['carThree'],
      center:{x: (8 * (1000 / GRID_SIZE)) - ((1000 / GRID_SIZE) / 2), y: (11 * (1000 / GRID_SIZE)) - ((1000 / GRID_SIZE) / 2)},
      size: {width: (1000 / GRID_SIZE) - 10, height: (1000 / GRID_SIZE) - 10},
      speed: SPEED_THREE,
      direction: -1
    });
    carList.push(car10);

    let car11 = objects.Car({
      imageAsset: assets['carThree'],
      center:{x: (10 * (1000 / GRID_SIZE)) - ((1000 / GRID_SIZE) / 2), y: (11 * (1000 / GRID_SIZE)) - ((1000 / GRID_SIZE) / 2)},
      size: {width: (1000 / GRID_SIZE) - 10, height: (1000 / GRID_SIZE) - 10},
      speed: SPEED_THREE,
      direction: -1
    });
    carList.push(car11);

    let car12 = objects.Car({
      imageAsset: assets['carThree'],
      center:{x: (14 * (1000 / GRID_SIZE)) - ((1000 / GRID_SIZE) / 2), y: (11 * (1000 / GRID_SIZE)) - ((1000 / GRID_SIZE) / 2)},
      size: {width: (1000 / GRID_SIZE) - 10, height: (1000 / GRID_SIZE) - 10},
      speed: SPEED_THREE,
      direction: -1
    });
    carList.push(car12);

    // row 4
    let car13 = objects.Car({
      imageAsset: assets['carFour'],
      center:{x: (4 * (1000 / GRID_SIZE)) - ((1000 / GRID_SIZE) / 2), y: (10 * (1000 / GRID_SIZE)) - ((1000 / GRID_SIZE) / 2)},
      size: {width: (1000 / GRID_SIZE) - 10, height: (1000 / GRID_SIZE) - 10},
      speed: SPEED_FOUR,
      direction: 1
    });
    carList.push(car13);

    let car14 = objects.Car({
      imageAsset: assets['carFour'],
      center:{x: (6 * (1000 / GRID_SIZE)) - ((1000 / GRID_SIZE) / 2), y: (10 * (1000 / GRID_SIZE)) - ((1000 / GRID_SIZE) / 2)},
      size: {width: (1000 / GRID_SIZE) - 10, height: (1000 / GRID_SIZE) - 10},
      speed: SPEED_FOUR,
      direction: 1
    });
    carList.push(car14);

    // row 5
    let car15 = objects.Car({
      imageAsset: assets['truck'],
      center:{x: (2 * (1000 / GRID_SIZE)), y: (9 * (1000 / GRID_SIZE)) - ((1000 / GRID_SIZE) / 2)},
      size: {width: 2000 / GRID_SIZE, height: (1000 / GRID_SIZE) - 10},
      speed: SPEED_FIVE,
      direction: -1
    });
    carList.push(car15);

    let car16 = objects.Car({
      imageAsset: assets['truck'],
      center:{x: (7 * (1000 / GRID_SIZE)), y: (9 * (1000 / GRID_SIZE)) - ((1000 / GRID_SIZE) / 2)},
      size: {width: 2000 / GRID_SIZE, height: (1000 / GRID_SIZE) - 10},
      speed: SPEED_FIVE,
      direction: -1
    });
    carList.push(car16);

    let car17 = objects.Car({
      imageAsset: assets['truck'],
      center:{x: (12 * (1000 / GRID_SIZE)), y: (9 * (1000 / GRID_SIZE)) - ((1000 / GRID_SIZE) / 2)},
      size: {width: 2000 / GRID_SIZE, height: (1000 / GRID_SIZE) - 10},
      speed: SPEED_FIVE,
      direction: -1
    });
    carList.push(car17);


    // logs
    // 3 long logs
    let log1 = objects.Log({
      imageAsset: assets['log'],
      center:{x: (12 * (1000 / GRID_SIZE)), y: (6 * (1000 / GRID_SIZE)) - ((1000 / GRID_SIZE) / 2)},
      size: {width: 3000 / GRID_SIZE, height: (1000 / GRID_SIZE) - 10},
      speed: SPEED_SEVEN,
      direction: 1
    });
    logList.push(log1);

    let log2 = objects.Log({
      imageAsset: assets['log'],
      center:{x: (7 * (1000 / GRID_SIZE)), y: (6 * (1000 / GRID_SIZE)) - ((1000 / GRID_SIZE) / 2)},
      size: {width: 3000 / GRID_SIZE, height: (1000 / GRID_SIZE) - 10},
      speed: SPEED_SEVEN,
      direction: 1
    });
    logList.push(log2);

    let log3 = objects.Log({
      imageAsset: assets['log'],
      center:{x: (1 * (1000 / GRID_SIZE)), y: (6 * (1000 / GRID_SIZE)) - ((1000 / GRID_SIZE) / 2)},
      size: {width: 3000 / GRID_SIZE, height: (1000 / GRID_SIZE) - 10},
      speed: SPEED_SEVEN,
      direction: 1
    });
    logList.push(log3);

    // 6 long log
    let log4 = objects.Log({
      imageAsset: assets['log'],
      center:{x: (4 * (1000 / GRID_SIZE)), y: (5 * (1000 / GRID_SIZE)) - ((1000 / GRID_SIZE) / 2)},
      size: {width: 3000 / GRID_SIZE, height: (1000 / GRID_SIZE) - 10},
      speed: SPEED_EIGHT,
      direction: 1
    });
    logList.push(log4);

    let log7 = objects.Log({
      imageAsset: assets['log'],
      center:{x: (6 * (1000 / GRID_SIZE)), y: (5 * (1000 / GRID_SIZE)) - ((1000 / GRID_SIZE) / 2)},
      size: {width: 3000 / GRID_SIZE, height: (1000 / GRID_SIZE) - 10},
      speed: SPEED_EIGHT,
      direction: 1
    });
    logList.push(log7);

    // 2 4-long logs

    let log8 = objects.Log({
      imageAsset: assets['log'],
      center:{x: (1 * (1000 / GRID_SIZE)), y: (3 * (1000 / GRID_SIZE)) - ((1000 / GRID_SIZE) / 2)},
      size: {width: 2000 / GRID_SIZE, height: (1000 / GRID_SIZE) - 10},
      speed: SPEED_TEN,
      direction: 1
    });
    logList.push(log8);

    let log5 = objects.Log({
      imageAsset: assets['log'],
      center:{x: (2 * (1000 / GRID_SIZE)), y: (3 * (1000 / GRID_SIZE)) - ((1000 / GRID_SIZE) / 2)},
      size: {width: 2000 / GRID_SIZE, height: (1000 / GRID_SIZE) - 10},
      speed: SPEED_TEN,
      direction: 1
    });
    logList.push(log5);

    let log9 = objects.Log({
      imageAsset: assets['log'],
      center:{x: (11 * (1000 / GRID_SIZE)), y: (3 * (1000 / GRID_SIZE)) - ((1000 / GRID_SIZE) / 2)},
      size: {width: 2000 / GRID_SIZE, height: (1000 / GRID_SIZE) - 10},
      speed: SPEED_TEN,
      direction: 1
    });
    logList.push(log9);

    let log6 = objects.Log({
      imageAsset: assets['log'],
      center:{x: (12 * (1000 / GRID_SIZE)), y: (3 * (1000 / GRID_SIZE)) - ((1000 / GRID_SIZE) / 2)},
      size: {width: 2000 / GRID_SIZE, height: (1000 / GRID_SIZE) - 10},
      speed: SPEED_TEN,
      direction: 1
    });
    logList.push(log6);


    // turtles
    let turtle1 = objects.Turtle({
      imageList: [assets['turtle'], assets['turtle2'], assets['turtle3'], assets['turtle2']],
      center:{x: (14 * (1000 / GRID_SIZE)), y: (7 * (1000 / GRID_SIZE)) - ((1000 / GRID_SIZE) / 2)},
      size: {width: (1000 / GRID_SIZE) - 10, height: (1000 / GRID_SIZE) - 10},
      speed: SPEED_SIX,
      direction: -1,
      sink: 0
    })
    turtleList.push(turtle1);

    let turtle2 = objects.Turtle({
      imageList: [assets['turtle'], assets['turtle2'], assets['turtle3'], assets['turtle2']],
      center:{x: (13 * (1000 / GRID_SIZE)), y: (7 * (1000 / GRID_SIZE)) - ((1000 / GRID_SIZE) / 2)},
      size: {width: (1000 / GRID_SIZE) - 10, height: (1000 / GRID_SIZE) - 10},
      speed: SPEED_SIX,
      direction: -1,
      sink: 0
    })
    turtleList.push(turtle2);

    let turtle3 = objects.Turtle({
      imageList: [assets['turtle'], assets['turtle2'], assets['turtle3'], assets['turtle2']],
      center:{x: (12 * (1000 / GRID_SIZE)), y: (7 * (1000 / GRID_SIZE)) - ((1000 / GRID_SIZE) / 2)},
      size: {width: (1000 / GRID_SIZE) - 10, height: (1000 / GRID_SIZE) - 10},
      speed: SPEED_SIX,
      direction: -1,
      sink: 0
    })
    turtleList.push(turtle3);

    let turtle4 = objects.Turtle({
      imageList: [assets['turtle'], assets['turtle2'], assets['turtle3'], assets['turtle2']],
      center:{x: (9 * (1000 / GRID_SIZE)), y: (7 * (1000 / GRID_SIZE)) - ((1000 / GRID_SIZE) / 2)},
      size: {width: (1000 / GRID_SIZE) - 10, height: (1000 / GRID_SIZE) - 10},
      speed: SPEED_SIX,
      direction: -1,
      sink: 1
    })
    turtleList.push(turtle4);

    let turtle5 = objects.Turtle({
      imageList: [assets['turtle'], assets['turtle2'], assets['turtle3'], assets['turtle2']],
      center:{x: (8 * (1000 / GRID_SIZE)), y: (7 * (1000 / GRID_SIZE)) - ((1000 / GRID_SIZE) / 2)},
      size: {width: (1000 / GRID_SIZE) - 10, height: (1000 / GRID_SIZE) - 10},
      speed: SPEED_SIX,
      direction: -1,
      sink: 1
    })
    turtleList.push(turtle5);

    let turtle6 = objects.Turtle({
      imageList: [assets['turtle'], assets['turtle2'], assets['turtle3'], assets['turtle2']],
      center:{x: (7 * (1000 / GRID_SIZE)), y: (7 * (1000 / GRID_SIZE)) - ((1000 / GRID_SIZE) / 2)},
      size: {width: (1000 / GRID_SIZE) - 10, height: (1000 / GRID_SIZE) - 10},
      speed: SPEED_SIX,
      direction: -1,
      sink: 1
    })
    turtleList.push(turtle6);

    let turtle7 = objects.Turtle({
      imageList: [assets['turtle'], assets['turtle2'], assets['turtle3'], assets['turtle2']],
      center:{x: (4 * (1000 / GRID_SIZE)), y: (7 * (1000 / GRID_SIZE)) - ((1000 / GRID_SIZE) / 2)},
      size: {width: (1000 / GRID_SIZE) - 10, height: (1000 / GRID_SIZE) - 10},
      speed: SPEED_SIX,
      direction: -1,
      sink: 0
    })
    turtleList.push(turtle7);

    let turtle8 = objects.Turtle({
      imageList: [assets['turtle'], assets['turtle2'], assets['turtle3'], assets['turtle2']],
      center:{x: (3 * (1000 / GRID_SIZE)), y: (7 * (1000 / GRID_SIZE)) - ((1000 / GRID_SIZE) / 2)},
      size: {width: (1000 / GRID_SIZE) - 10, height: (1000 / GRID_SIZE) - 10},
      speed: SPEED_SIX,
      direction: -1,
      sink: 0
    })
    turtleList.push(turtle8);

    let turtle9 = objects.Turtle({
      imageList: [assets['turtle'], assets['turtle2'], assets['turtle3'], assets['turtle2']],
      center:{x: (2 * (1000 / GRID_SIZE)), y: (7 * (1000 / GRID_SIZE)) - ((1000 / GRID_SIZE) / 2)},
      size: {width: (1000 / GRID_SIZE) - 10, height: (1000 / GRID_SIZE) - 10},
      speed: SPEED_SIX,
      direction: -1,
      sink: 0
    })
    turtleList.push(turtle9);

    // row 9 turtles
    let turtle10 = objects.Turtle({
      imageList: [assets['turtle'], assets['turtle2'], assets['turtle3'], assets['turtle2']],
      center:{x: (2 * (1000 / GRID_SIZE)), y: (4 * (1000 / GRID_SIZE)) - ((1000 / GRID_SIZE) / 2)},
      size: {width: (1000 / GRID_SIZE) - 10, height: (1000 / GRID_SIZE) - 10},
      speed: SPEED_NINE,
      direction: -1,
      sink: 1
    })
    turtleList.push(turtle10);

    let turtle11 = objects.Turtle({
      imageList: [assets['turtle'], assets['turtle2'], assets['turtle3'], assets['turtle2']],
      center:{x: (3 * (1000 / GRID_SIZE)), y: (4 * (1000 / GRID_SIZE)) - ((1000 / GRID_SIZE) / 2)},
      size: {width: (1000 / GRID_SIZE) - 10, height: (1000 / GRID_SIZE) - 10},
      speed: SPEED_NINE,
      direction: -1,
      sink: 1
    })
    turtleList.push(turtle11);

    let turtle12 = objects.Turtle({
      imageList: [assets['turtle'], assets['turtle2'], assets['turtle3'], assets['turtle2']],
      center:{x: (7 * (1000 / GRID_SIZE)), y: (4 * (1000 / GRID_SIZE)) - ((1000 / GRID_SIZE) / 2)},
      size: {width: (1000 / GRID_SIZE) - 10, height: (1000 / GRID_SIZE) - 10},
      speed: SPEED_NINE,
      direction: -1,
      sink: 0
    })
    turtleList.push(turtle12);

    let turtle13 = objects.Turtle({
      imageList: [assets['turtle'], assets['turtle2'], assets['turtle3'], assets['turtle2']],
      center:{x: (8 * (1000 / GRID_SIZE)), y: (4 * (1000 / GRID_SIZE)) - ((1000 / GRID_SIZE) / 2)},
      size: {width: (1000 / GRID_SIZE) - 10, height: (1000 / GRID_SIZE) - 10},
      speed: SPEED_NINE,
      direction: -1,
      sink: 0
    })
    turtleList.push(turtle13);

    let turtle14 = objects.Turtle({
      imageList: [assets['turtle'], assets['turtle2'], assets['turtle3'], assets['turtle2']],
      center:{x: (12 * (1000 / GRID_SIZE)), y: (4 * (1000 / GRID_SIZE)) - ((1000 / GRID_SIZE) / 2)},
      size: {width: (1000 / GRID_SIZE) - 10, height: (1000 / GRID_SIZE) - 10},
      speed: SPEED_NINE,
      direction: -1,
      sink: 0
    })
    turtleList.push(turtle14);

    let turtle15 = objects.Turtle({
      imageList: [assets['turtle'], assets['turtle2'], assets['turtle3'], assets['turtle2']],
      center:{x: (13 * (1000 / GRID_SIZE)), y: (4 * (1000 / GRID_SIZE)) - ((1000 / GRID_SIZE) / 2)},
      size: {width: (1000 / GRID_SIZE) - 10, height: (1000 / GRID_SIZE) - 10},
      speed: SPEED_NINE,
      direction: -1,
      sink: 0
    })
    turtleList.push(turtle15);


    // Gator
    let gator1 = objects.Gator({
      imageList: [assets['gator1'], assets['gator2']],
      center:{x: (7 * (1000 / GRID_SIZE)), y: (3 * (1000 / GRID_SIZE)) - ((1000 / GRID_SIZE) / 2)},
      size: {width: 4000 / GRID_SIZE, height: (1000 / GRID_SIZE) - 10},
      speed: SPEED_TEN,
      direction: 1,
    })
    gatorList.push(gator1);

    /*
    ----------------------------------------------------------------------------
    END OBJECT DECLARATIONS
    ----------------------------------------------------------------------------
    */


    function processInput(elapsedTime) {
        myKeyboard.update(elapsedTime);
    }


    function update(elapsedTime) {
        myFrog.updateFrog(elapsedTime);
        updateCars(elapsedTime);
        updateLogs(elapsedTime);
        updateTurtles(elapsedTime);
        updateGators(elapsedTime);
        updateCollisions(elapsedTime);
        updateText(elapsedTime);
        updateTime(elapsedTime);
        updatePonds(elapsedTime);
    }


    function updateTime(elapsedTime){
      if (timeLeft < 5000) {
        timeAudio.play();
      }
      if (timeLeft < 0) {
        timeLeft = 32000;
        squashAudio.play();
        myFrog.setPosition(1100, 1100);

        death();
        setTimeout(() => {myFrog.setPosition((7 * (1000 / GRID_SIZE)) - ((1000 / GRID_SIZE) / 2), (14 * (1000 / GRID_SIZE)) - ((1000 / GRID_SIZE) / 2));}, 1000);
        setTimeout(() => {timeLeft = 31000;}, 1000);
      }
    }

    function updatePonds(elapsedTime) {
      pondTime += elapsedTime;
      if (pondTime < BONUS_TIME) {
        return;
      }
      pondTime = 0;
      for (var i = 0; i < pondList.length; i++) {
        pondList[i].emptyBonus();
      }
      let selectPond = Math.floor(Math.random() * 7);
      console.log("Pond: " + selectPond);
      if (selectPond > 4) {
        return;
      }

      if (pondList[selectPond].isFull === 1) {
        return;
      }
      let selectItem = Math.floor(Math.random() * 2);
      if (selectItem === 0) {
        pondList[selectPond].fillFly();
      } else {
        pondList[selectPond].fillGator();
      }
    }


    function updateText(elapsedTime) {
        let fColor = 'rgba(29, 195, 0, 1)';
        myScore.updateText(score, fColor);
        timeLeft -= elapsedTime;
        let displayTime = Math.trunc(timeLeft / 1000);
        myTime.updateText(displayTime + " s", fColor);

    }


    function updateGators(elapsedTime) {
      for (var i = 0; i < gatorList.length; i++) {
        gatorList[i].updateGator(elapsedTime);
      }
    }


    function updateTurtles(elapsedTime) {
      for (var i = 0; i < turtleList.length; i++) {
        turtleList[i].updateTurtle(elapsedTime);
      }
    }


    function updateCars(elapsedTime){
      for (var i = 0; i < carList.length; i++) {
        carList[i].updateCar(elapsedTime);
      }
    }


    function updateLogs(elapsedTime){
      for (var i = 0; i < logList.length; i++) {
        logList[i].updateLog(elapsedTime);
      }
    }


    function updateCollisions(elapsedTime){
      // solid land
      if (myFrog.center.y > 530) {
        carCollision(elapsedTime);

        // water
      } else if (myFrog.center.y < 534 ) {
        if (!logCollision(elapsedTime) && !turtleCollision(elapsedTime) && !gatorCollision(elapsedTime) && !pondCollision(elapsedTime)) {
          plunkAudio.play();
          death();
          myFrog.setPosition(1100, 1100);
          setTimeout(() => {myFrog.setPosition((7 * (1000 / GRID_SIZE)) - ((1000 / GRID_SIZE) / 2), (14 * (1000 / GRID_SIZE)) - ((1000 / GRID_SIZE) / 2));}, 1000);
          setTimeout(() => {timeLeft = 31000;}, 1000);
        } else {

        }
      }
    }


    function pondCollision(elapsedTime) {
      for (var i = 0; i < pondList.length; i++) {
        if (Math.abs(pondList[i].center.x - myFrog.center.x) < 15 && !pondList[i].isFull && myFrog.center.y < 150) {


            if (pondList[i].isGator === 1) {
                plunkAudio.play();
                death();
                myFrog.setPosition(1100, 1100);
                setTimeout(() => {myFrog.setPosition((7 * (1000 / GRID_SIZE)) - ((1000 / GRID_SIZE) / 2), (14 * (1000 / GRID_SIZE)) - ((1000 / GRID_SIZE) / 2));}, 1000);
                setTimeout(() => {timeLeft = 31000;}, 1000);
                return false;
            } else {

                if (pondList[i].isFly === 1) {
                  score += 200;
                }

                pondList[i].fill();
                totalLanded += 1
                score += Math.trunc((timeLeft / 1000)  * 2 * 10);
                score += 50;
                myFrog.setPosition(1100, 1100);

                if (totalLanded === 5) {
                  score += 1000;
                  setTimeout(() => {run(score, lives)}, 1000);
                  return true;
                }
                setTimeout(() => {myFrog.setPosition((7 * (1000 / GRID_SIZE)) - ((1000 / GRID_SIZE) / 2), (14 * (1000 / GRID_SIZE)) - ((1000 / GRID_SIZE) / 2));}, 1000);
                setTimeout(() => {timeLeft = 31000;}, 1000);
                return true;
            }
        }

      }
      return false;
    }


    function carCollision(elapsedTime){
      for (var i = 0; i < carList.length; i++) {
        if (testCollision(myFrog, carList[i])) {
          // hit by car
          squashAudio.play();
          myFrog.setPosition(1100, 1100);

          death();
          setTimeout(() => {myFrog.setPosition((7 * (1000 / GRID_SIZE)) - ((1000 / GRID_SIZE) / 2), (14 * (1000 / GRID_SIZE)) - ((1000 / GRID_SIZE) / 2));}, 1000);
          setTimeout(() => {timeLeft = 31000;}, 1000);
        }
      }
    }


    function turtleCollision(elapsedTime){
      for (var i = 0; i < turtleList.length; i++) {
        if (testCollision(myFrog, turtleList[i]) && turtleList[i].phase != 2) {
          myFrog.floatFrog(elapsedTime, turtleList[i].speed, turtleList[i].direction);
          return true;
        }
      }
      return false;
    }


    function logCollision(elapsedTime){
      for (var i = 0; i < logList.length; i++) {
        if (testCollision(myFrog, logList[i])) {
          myFrog.floatFrog(elapsedTime, logList[i].speed, logList[i].direction);
          return true;
        } else {

        }
      }
      return false;
    }


    function gatorCollision(elapsedTime){
      for (var i = 0; i < gatorList.length; i++) {
        if (testCollision(myFrog, gatorList[i])) {
          plunkAudio.play();
          myFrog.setPosition(1100, 1100);
          death();
          setTimeout(() => {myFrog.setPosition((7 * (1000 / GRID_SIZE)) - ((1000 / GRID_SIZE) / 2), (14 * (1000 / GRID_SIZE)) - ((1000 / GRID_SIZE) / 2));}, 1000);
          setTimeout(() => {timeLeft = 31000;}, 1000);
          return true;
        }
      }
      return false;
    }


    // tests collision between rectangles - https://developer.mozilla.org/en-US/docs/Games/Techniques/2D_collision_detection
    function testCollision(rect1, rect2){
      if (rect1.center.x < rect2.center.x + rect2.size.width && rect1.center.x + rect1.size.width > rect2.center.x && rect1.center.y < rect2.center.y + rect2.size.height && rect1.center.y + rect1.size.height > rect2.center.y) {
        return true;
      } else {
        return false;
      }
    }


    function death(){
      lives -= 1;
      if (lives < 0) {
        let scores = JSON.parse(window.localStorage.getItem("scores"));
        scores.push(score);
        var temp = JSON.stringify(scores);
        window.localStorage.setItem("scores", temp);

        cancelNextRequest = true;
        gameAudio.pause();
        gameAudio.currentTime = 0;
        setTimeout(() => {game.showScreen('main-menu');}, 3000);
      }
    }

    function win(){

      let scores = JSON.parse(window.localStorage.getItem("scores"));
      scores.push(score);
      var temp = JSON.stringify(scores);
      window.localStorage.setItem("scores", temp);



      setTimeout(() => {gameAudio.pause();}, 3000);
      setTimeout(() => {gameAudio.currentTime = 0;}, 3000);
      setTimeout(() => {cancelNextRequest = true;}, 3000);
      setTimeout(() => {game.showScreen('main-menu');}, 3100);

    }


    function render() {
        graphics.clear();
        renderer.Background.render(myBackground);
        renderCars();
        renderLogs();
        renderTurtles();
        renderGators();
        renderPonds();
        renderFrogs();
        renderer.Text.render(myScore);
        renderer.Text.render(myTime);
    }


    function renderFrogs(){
      for (var i = 0; i < lives + 1; i++) {
        renderer.Frog.render(frogList[i]);
      }
    }


    function renderPonds() {
      for (var i = 0; i < pondList.length; i++) {
        renderer.Pond.render(pondList[i]);
      }
    }


    function renderGators(){
      for (var i = 0; i < gatorList.length; i++) {
        renderer.Gator.render(gatorList[i]);
      }
    }


    function renderTurtles() {
      for (var i = 0; i < turtleList.length; i++) {
        renderer.Turtle.render(turtleList[i]);
      }
    }


    function renderCars(){
      for (var i = 0; i < carList.length; i++) {
        renderer.Car.render(carList[i]);
      }
    }


    function renderLogs(){
      for (var i = 0; i < logList.length; i++) {
        renderer.Log.render(logList[i]);
      }
    }


    function gameLoop(time) {

        let elapsedTime = time - lastTimeStamp;
        lastTimeStamp = time;

        processInput(elapsedTime);
        update(elapsedTime);
        render();

        if (!cancelNextRequest) {
            requestAnimationFrame(gameLoop);
        }
    }


    function moveLeft(elapsedTime){
      if (myFrog.moveLeft(elapsedTime)) {
        score += 0;
      }
      hopAudio.play();
    }


    function moveRight(elapsedTime){
      if (myFrog.moveRight(elapsedTime)) {
        score += 0;
      }
      hopAudio.play();
    }


    function moveUp(elapsedTime){
      if (myFrog.moveUp(elapsedTime)) {
        score += 10;
      }
      hopAudio.play();
    }


    function moveDown(elapsedTime){
      if (myFrog.moveDown(elapsedTime)) {
        score += 0;
      }
      hopAudio.play();
    }


    function initialize() {

        myKeyboard.register('Escape', function() {
            console.log("escape pressed");
            //
            // Stop the game loop by canceling the request for the next animation frame
            cancelNextRequest = true;
            gameAudio.pause();
            gameAudio.currentTime = 0;
            //
            // Then, return to the main menu
            game.showScreen('main-menu');
        });

        let canvas = document.getElementById('id-canvas');

    }


    function run(scr=0, lv=6) {

      for (var i = 0; i < pondList.length; i++) {
        pondList[i].empty();
      }

      gameAudio = assets['gameAudio'];
      gameAudio.addEventListener('ended', function() {
        this.currentTime = 0;
        this.play();
      }, false);
      gameAudio.volume = 0.35;
      gameAudio.play();

      hopAudio = assets['hopAudio'];
      hopAudio.addEventListener('ended', function() {
        this.currentTime = 0;
      }, false);
      hopAudio.volume = 0.35;

      squashAudio = assets['squashAudio'];
      squashAudio.addEventListener('ended', function() {
        this.currentTime = 0;
      }, false);
      squashAudio.volume = 0.35;

      plunkAudio = assets['plunkAudio'];
      plunkAudio.addEventListener('ended', function() {
        this.currentTime = 0;
      }, false);
      plunkAudio.volume = 0.35;

      timeAudio = assets['timeAudio'];
      timeAudio.addEventListener('ended', function() {
        this.currentTime = 0;
      }, false);
      timeAudio.volume = 0.8;

      score = scr;
      lives = lv;
      timeLeft = 31000;
      pondTime = 0;
      totalLanded = 0;

      myFrog.setPosition((7 * (1000 / GRID_SIZE)) - ((1000 / GRID_SIZE) / 2), (14 * (1000 / GRID_SIZE)) - ((1000 / GRID_SIZE) / 2));

      // check if controls are saved
      if (window.localStorage.getItem("controls") === null) {
        let cItem = {
          left: 'ArrowLeft',
          right: 'ArrowRight',
          up: "ArrowUp",
          down: 'ArrowDown'
        };
        let temp = JSON.stringify(cItem);
        window.localStorage.setItem("controls", temp);
        myKeyboard.register(cItem.left, moveLeft);
        myKeyboard.register(cItem.right, moveRight);
        myKeyboard.register(cItem.up, moveUp);
        myKeyboard.register(cItem.down, moveDown);
      } else {
        // and set them if they are
        var cItem = JSON.parse(window.localStorage.getItem("controls"));
        myKeyboard.register(cItem.left, moveLeft);
        myKeyboard.register(cItem.right, moveRight);
        myKeyboard.register(cItem.up, moveUp);
        myKeyboard.register(cItem.down, moveDown);
      }

      cancelNextRequest = false;
      lastTimeStamp = performance.now();
      requestAnimationFrame(gameLoop);

    }

    return {
        initialize : initialize,
        run : run
    };

}(MyGame.game, MyGame.objects, MyGame.render, MyGame.graphics, MyGame.input, MyGame.assets));
