import fxlaser from "./sounds/laser.m4a";
import fxexplode from "./sounds/explode.m4a";
import fxhit from "./sounds/hit.m4a";


const AsteroidsGameEngine = (props) => {
    const FPS = 30; // frames per second
    const FRICTION = 0.7; // friction coefficient of space (0 = no friction, 1 = lots of friction)
    const GAME_LIVES = 3; //total Lives in game
    const LASER_DIST = 0.6; // max distance laser can travel as fraction of screen width
    const LASER_EXPLODE_DUR = 0.1; // duration of the lasers' explosion in seconds
    const LASER_MAX = 10; // maximum number of lasers on screen at once
    const LASER_SPD = 500; // speed of lasers in pixels per second
    const ROIDS_JAG = 0.4; // jaggedness of the asteroids
    const ROIDS_PTS_LGE = 20; // POINTS for large asteroid
    const ROIDS_PTS_M = 50; // POINTS for large asteroid
    const ROIDS_PTS_SM = 100; // POINTS for large asteroid
    const ROIDS_NUM = 1; // starting number of asteroids
    const ROIDS_SIZE = 100; // starting size of asteroids in pixels
    const ROIDS_SPD = 45; // Speed of Asteroids
    const ROIDS_VERT = 10; //Number of vertices per asteroid
    const SAVE_KEY_SCORE = "Hi score"; //Fetches high score from cache
    const SHIP_BLINK_DUR = 0.1; // duration in seconds of a single blink during ship's invisibility
    const SHIP_EXPLODE_DUR = 0.3; // duration of the ship's explosion in seconds
    const SHIP_INV_DUR = 3; // duration of the ship's invisibility in seconds
    const SHIP_SIZE = 30; // ship height in pixels
    const SHIP_THRUST = 5; // acceleration of the ship in pixels per second per second
    const TURN_SPEED = 360; // turn speed in degrees per second
    const SHOW_BOUNDING = false; // show or hide collision bounding
    const SHOW_CENTRE_DOT = true; // show or hide ship's centre dot
    const TEXT_FADE_TIME = 2.5; // Text fad in seconds
    const TEXT_SIZE = 125; // Text fad in seconds
    const SFX_VOLUME = 0.2;


    var canv = document.getElementById("game");
    var ctx = canv.getContext("2d");

    //setup sound effects
    var fxLaser = new Audio(fxlaser);
    var fxExplode = new Audio(fxexplode);
    var fxHit = new Audio(fxhit);
    //setup the gamer parameters

    var level, lives, roids, score, hiScore, ship, text, textAlpha;

    newGame();


    // var roids = [];
    // createAsteroidBelt();

    document.addEventListener("keyup", keyUp);
    document.addEventListener("keydown", keyDown);

    // canv.addEventListener("click", CloseFunction);
    // function CloseFunction() {
    //     console.log('clicked')
    // }

    // set up the game loop
    setInterval(update, 1000 / FPS);

    function createAsteroidBelt() {
        roids = [];
        var x, y;
        var i = 0;
        for (i; i < ROIDS_NUM + level; i++) {
            do {
                x = Math.floor(Math.random() * canv.width);
                y = Math.floor(Math.random() * canv.height);
            } while (distBetweenPoints(ship.x, ship.y, x, y) < ROIDS_SIZE * 2 + ship.r);
            roids.push(newAsteroid(x, y, Math.ceil(ROIDS_SIZE / 2)));
        }
    }

    function fullscreen(){
        // console.log(param);
        if(canv.webkitRequestFullScreen) {
            canv.webkitRequestFullScreen();
        }
        else {
            canv.mozRequestFullScreen();
        }

    }


    function newGame() {
        level = 0;
        lives = GAME_LIVES;

        score = 0;
        // set up the spaceship object
        ship = newShip();

        var scoreStr = localStorage.getItem(SAVE_KEY_SCORE);

        if (scoreStr == null) {
            hiScore = 0;

        } else {
            hiScore = parseInt(scoreStr);
        }
        newLevel();
    }

    function newLevel() {
        text = "Level " + (level + 1);
        textAlpha = 1.0;
        createAsteroidBelt();
    }

    function newAsteroid(x, y, r) {
        var lvlMult = 1 + 0.1 * level;
        var roid = {
            x: x,
            y: y,
            xv: Math.random() * ROIDS_SPD * lvlMult / FPS * (Math.random() < 0.5 ? 1 : -1),
            yv: Math.random() * ROIDS_SPD * lvlMult / FPS * (Math.random() < 0.5 ? 1 : -1),
            r: r,
            a: Math.random() * Math.PI * 2, //IN radians
            vert: Math.floor(Math.random() * (ROIDS_VERT + 1) + ROIDS_VERT / 2),
            offs: []
        };

        for (var i = 0; i < roid.vert; i++) {
            roid.offs.push(Math.random() * ROIDS_JAG * 2 + 1 - ROIDS_JAG);
        }

        return roid;
    }

    function newShip() {
        return {
            x: canv.width / 2,
            y: canv.height / 2,
            a: 90 / 180 * Math.PI, // convert to radians
            r: SHIP_SIZE / 2,
            blinkNum: Math.ceil(SHIP_INV_DUR / SHIP_BLINK_DUR),
            blinkTime: Math.ceil(SHIP_BLINK_DUR * FPS),
            canShoot: true,
            dead: false,
            explodeTime: 0,
            lasers: [],
            rot: 0,
            thrusting: false,
            thrust: {
                x: 0,
                y: 0
            }
        }
    }

    function quitGame() {

        if (canv.exitFullscreen) {
            canv.exitFullscreen();
            console.log('ddd');
        } else if (document.mozCancelFullScreen) {
            document.mozCancelFullScreen();
        } else if (document.webkitExitFullscreen) {
            document.webkitExitFullscreen();
        } else if (document.msExitFullscreen) {
            document.msExitFullscreen();
        }
    }

    function shootLaser() {
        // create laser object
        if (ship.canShoot && ship.lasers.length < LASER_MAX) {
            ship.lasers.push({
                x: ship.x + 4 / 3 * ship.r * Math.cos(ship.a),
                y: ship.y - 4 / 3 * ship.r * Math.sin(ship.a),
                xv: LASER_SPD * Math.cos(ship.a) / FPS,
                yv: -LASER_SPD * Math.sin(ship.a) / FPS,
                dist: 0,
                explodeTime: 0
            });

            fxLaser.play();
            fxLaser.volume = SFX_VOLUME;
        }
        ship.canShoot = false;
    }

    function destroyAsteroid(index) {
        var x = roids[index].x;
        var y = roids[index].y;
        var r = roids[index].r;

        // split the asteroid in two if necessary
        if (r == Math.ceil(ROIDS_SIZE / 2)) { // large asteroid
            roids.push(newAsteroid(x, y, Math.ceil(ROIDS_SIZE / 4)));
            roids.push(newAsteroid(x, y, Math.ceil(ROIDS_SIZE / 4)));
            score += ROIDS_PTS_LGE;
        } else if (r == Math.ceil(ROIDS_SIZE / 4)) { // medium asteroid
            roids.push(newAsteroid(x, y, Math.ceil(ROIDS_SIZE / 8)));
            roids.push(newAsteroid(x, y, Math.ceil(ROIDS_SIZE / 8)));
            score += ROIDS_PTS_M;
        } else {
            score += ROIDS_PTS_SM;
        }

        //check high score

        if (score > hiScore) {
            hiScore = score;
            localStorage.setItem("Hi score", hiScore);
        }

        // destroy the asteroid
        roids.splice(index, 1);

        if (roids.length == 0) {
            level++;
            newLevel();
        }
    }

    function distBetweenPoints(x1, y1, x2, y2) {
        return Math.sqrt(Math.pow(x2 - x1, 2) + Math.pow(y2 - y1, 2))
    }

    function explodeShip() {
        ship.explodeTime = Math.ceil(SHIP_EXPLODE_DUR * FPS);
        fxExplode.volume = SFX_VOLUME;
        fxExplode.play();

    }

    function gameOver() {
        //TODO:
        ship.dead = true;
        text = "Game Over";
        textAlpha = 1.0;
    }


    function keyDown(ev) {
        if (ship.dead) {
            return
        }
        switch (ev.keyCode) {
            case 32: // Spacebar shoot laser
                shootLaser();
                break;
            case 37: // left arrow (rotate ship left)
                ship.rot = TURN_SPEED / 180 * Math.PI / FPS;
                break;
            case 38: // up arrow (thrust the ship forward)
                ship.thrusting = true;
                break;
            case 39: // right arrow (rotate ship right)
                ship.rot = -TURN_SPEED / 180 * Math.PI / FPS;
                break;
            case 81:
                quitGame();
                break;
        }
    }

    function keyUp(ev) {
        if (ship.dead) {
            return
        }

        switch (ev.keyCode) {
            case 32: // Spacebar (sllow shooting again)
                ship.canShoot = true;
                break;
            case 37: // left arrow (stop rotating left)
                ship.rot = 0;
                break;
            case 38: // up arrow (stop thrusting)
                ship.thrusting = false;
                break;
            case 39: // right arrow (stop rotating right)
                ship.rot = 0;
                break;
            case 81:
                break;
        }
    }

    function drawShip(x, y, r, a, colour = "white") {
        ctx.strokeStyle = colour;
        ctx.lineWidth = SHIP_SIZE / 20;
        ctx.shadowBlur = 10;
        ctx.shadowColor = colour;

        ctx.beginPath();
        ctx.moveTo(
            //nose of ship
            x + 4 / 3 * r * Math.cos(a),
            y - 4 / 3 * r * Math.sin(a)
        );
        ctx.lineTo(
            //rear left
            x - r * (2 / 3 * Math.cos(a) + Math.sin(a)),
            y + r * (2 / 3 * Math.sin(a) - Math.cos(a))
        );
        ctx.lineTo(
            //rear right
            x - r * (2 / 3 * Math.cos(a) - Math.sin(a)),
            y + r * (2 / 3 * Math.sin(a) + Math.cos(a))
        );
        ctx.closePath();
        ctx.stroke();
    }

    function shipBuild(blinkOn, exploding) {
        if (!exploding) {
            if (blinkOn && !ship.dead) {
                drawShip(ship.x, ship.y, ship.r, ship.a);
            }

            // handle blinking
            if (ship.blinkNum > 0) {

                // reduce the blink time
                ship.blinkTime--;

                // reduce the blink num
                if (ship.blinkTime == 0 && !ship.dead) {
                    ship.blinkTime = Math.ceil(SHIP_BLINK_DUR * FPS);
                    ship.blinkNum--;
                }
            }
        } else {
            // draw explosion
            ctx.fillStyle = "darkred";
            ctx.beginPath();
            ctx.arc(ship.x, ship.y, ship.r * 1.7, 0, Math.PI * 2, false);
            ctx.fill();

            ctx.fillStyle = "red";
            ctx.beginPath();
            ctx.arc(ship.x, ship.y, ship.r * 1.5, 0, Math.PI * 2, false);
            ctx.fill();

            ctx.fillStyle = "orange";
            ctx.beginPath();
            ctx.arc(ship.x, ship.y, ship.r * 1.2, 0, Math.PI * 2, false);
            ctx.fill();

            ctx.fillStyle = "yellow";
            ctx.beginPath();
            ctx.arc(ship.x, ship.y, ship.r * 0.9, 0, Math.PI * 2, false);
            ctx.fill();

            ctx.fillStyle = "white";
            ctx.beginPath();
            ctx.arc(ship.x, ship.y, ship.r * 0.6, 0, Math.PI * 2, false);
            ctx.fill();
        }

        // show ship's collision circle
        if (SHOW_BOUNDING) {
            ctx.strokeStyle = "lime";
            ctx.beginPath();
            ctx.arc(ship.x, ship.y, ship.r, 0, Math.PI * 2, false);
            ctx.stroke();
        }

        // show ship's centre dot
        if (SHOW_CENTRE_DOT && !ship.dead) {
            //cockpit
            ctx.fillStyle = "red";
            ctx.fillRect(ship.x - 1, ship.y - 2, 2, 2);
        }

        // Draw the lasers
        for (var i = 0; i < ship.lasers.length; i++) {
            if (ship.lasers[i].explodeTime == 0) {
                ctx.fillStyle = "salmon";
                ctx.beginPath();
                ctx.arc(ship.lasers[i].x, ship.lasers[i].y, SHIP_SIZE / 15, 0, Math.PI * 2, false);
                ctx.fill();
            } else {
                // draw the eplosion
                ctx.fillStyle = "orangered";
                ctx.beginPath();
                ctx.arc(ship.lasers[i].x, ship.lasers[i].y, ship.r * 0.75, 0, Math.PI * 2, false);
                ctx.fill();
                ctx.fillStyle = "salmon";
                ctx.beginPath();
                ctx.arc(ship.lasers[i].x, ship.lasers[i].y, ship.r * 0.5, 0, Math.PI * 2, false);
                ctx.fill();
                ctx.fillStyle = "pink";
                ctx.beginPath();
                ctx.arc(ship.lasers[i].x, ship.lasers[i].y, ship.r * 0.25, 0, Math.PI * 2, false);
                ctx.fill();
            }
        }


        // detect laser hits on asteroids
        var ax, ay, ar, lx, ly;
        for (var i = roids.length - 1; i >= 0; i--) {

            // grab the asteroid properties
            ax = roids[i].x;
            ay = roids[i].y;
            ar = roids[i].r;

            // loop over the lasers
            for (var j = ship.lasers.length - 1; j >= 0; j--) {

                // grab the laser properties
                lx = ship.lasers[j].x;
                ly = ship.lasers[j].y;

                // detect hits
                if (ship.lasers[j].explodeTime == 0 && distBetweenPoints(ax, ay, lx, ly) < ar) {

                    // destroy the asteroid and activate the laser explosion
                    destroyAsteroid(i);
                    fxHit.play();
                    fxHit.volume = SFX_VOLUME;
                    ship.lasers[j].explodeTime = Math.ceil(LASER_EXPLODE_DUR * FPS);
                    break;
                }
            }
        }


        //Check for asteroid collisions (when not exploding)
        if (!exploding) {
            if (ship.blinkNum == 0) {
                for (var i = 0; i < roids.length; i++) {
                    if (distBetweenPoints(ship.x, ship.y, roids[i].x, roids[i].y) < ship.r + roids[i].r) {
                        console.log("hits");
                        explodeShip();
                        destroyAsteroid(i);
                    }
                }
            }

            // rotate the ship
            ship.a += ship.rot;

            // move the ship
            ship.x += ship.thrust.x;
            ship.y += ship.thrust.y;
        } else {
            // reduce the explode time
            ship.explodeTime--;

            // reset the ship after the explosion has finished
            if (ship.explodeTime == 0) {
                lives--;
                if (lives == 0) {
                    gameOver()
                } else {
                    ship = newShip();
                }
            }
        }

        // handle edge of screen
        if (ship.x < 0 - ship.r) {
            ship.x = canv.width + ship.r;
        } else if (ship.x > canv.width + ship.r) {
            ship.x = 0 - ship.r;
        }
        if (ship.y < 0 - ship.r) {
            ship.y = canv.height + ship.r;
        } else if (ship.y > canv.height + ship.r) {
            ship.y = 0 - ship.r;
        }
    }

    function asteroidInit() {
        //draw asteroids
        var a, r, x, y, vert, offs;
        for (var i = 0; i < roids.length; i++) {
            //get asteroid properties;
            ctx.strokeStyle = "white";
            ctx.lineWidth = SHIP_SIZE / 20;
            ctx.shadowBlur = 10;
            ctx.shadowColor = "white";

            a = roids[i].a;
            r = roids[i].r;
            x = roids[i].x;
            y = roids[i].y;
            offs = roids[i].offs;
            vert = roids[i].vert;

            //draw the path
            ctx.beginPath();
            ctx.moveTo(
                x + r * offs[0] * Math.cos(a),
                y + r * offs[0] * Math.sin(a),
            );

            // draw the polygon
            for (var j = 0; j < vert; j++) {
                ctx.lineTo(
                    x + r * offs[j] * Math.cos(a + j * Math.PI * 2 / vert),
                    y + r * offs[j] * Math.sin(a + j * Math.PI * 2 / vert)
                );
            }
            ctx.closePath();
            ctx.stroke();

            // show asteroid's collision circle
            if (SHOW_BOUNDING) {
                ctx.strokeStyle = "Red";
                ctx.beginPath();
                ctx.arc(x, y, r, 0, Math.PI * 2, false);
                ctx.stroke();
            }
        }
    }

    function thrusters(blinkOn, exploding) {
        // thrust the ship
        if (ship.thrusting && !ship.dead) {
            ship.thrust.x += SHIP_THRUST * Math.cos(ship.a) / FPS;
            ship.thrust.y -= SHIP_THRUST * Math.sin(ship.a) / FPS;

            // draw the thruster
            if (!exploding && blinkOn) {
                ctx.fillStyle = "red";
                ctx.strokeStyle = "yellow";
                ctx.lineWidth = SHIP_SIZE / 10;
                ctx.beginPath();
                ctx.moveTo( // rear left
                    ship.x - ship.r * (2 / 3 * Math.cos(ship.a) + 0.5 * Math.sin(ship.a)),
                    ship.y + ship.r * (2 / 3 * Math.sin(ship.a) - 0.5 * Math.cos(ship.a))
                );
                ctx.lineTo( // rear centre (behind the ship)
                    ship.x - ship.r * 5 / 3 * Math.cos(ship.a),
                    ship.y + ship.r * 5 / 3 * Math.sin(ship.a)
                );
                ctx.lineTo( // rear right
                    ship.x - ship.r * (2 / 3 * Math.cos(ship.a) - 0.5 * Math.sin(ship.a)),
                    ship.y + ship.r * (2 / 3 * Math.sin(ship.a) + 0.5 * Math.cos(ship.a))
                );
                ctx.closePath();
                ctx.fill();
                ctx.stroke();
            }
        } else {
            // apply friction (slow the ship down when not thrusting)
            ship.thrust.x -= FRICTION * ship.thrust.x / FPS;
            ship.thrust.y -= FRICTION * ship.thrust.y / FPS;
        }


    }

    function asteroidVelocity() {
        for (var i = 0; i < roids.length; i++) {
            roids[i].x += roids[i].xv;
            roids[i].y += roids[i].yv;

            //handles edge of screen
            // handle asteroid edge of screen
            if (roids[i].x < 0 - roids[i].r) {// move the lasers
                roids[i].x = canv.width + roids[i].r;
            } else if (roids[i].x > canv.width + roids[i].r) {
                roids[i].x = 0 - roids[i].r
            }
            if (roids[i].y < 0 - roids[i].r) {
                roids[i].y = canv.height + roids[i].r;
            } else if (roids[i].y > canv.height + roids[i].r) {
                roids[i].y = 0 - roids[i].r
            }
        }

    }

    function laserVelocity() {
        // move lasers
        for (var i = ship.lasers.length - 1; i >= 0; i--) {

            // check distance travelled
            if (ship.lasers[i].dist > LASER_DIST * canv.width) {
                ship.lasers.splice(i, 1);
                continue;
            }

            // handle the explosion
            if (ship.lasers[i].explodeTime > 0) {
                ship.lasers[i].explodeTime--;

                // destroy the laser after the duration is up
                if (ship.lasers[i].explodeTime == 0) {
                    ship.lasers.splice(i, 1);
                    continue;
                }
            } else {
                // move the laser
                ship.lasers[i].x += ship.lasers[i].xv;
                ship.lasers[i].y += ship.lasers[i].yv;

                // calculate the distance travelled
                ship.lasers[i].dist += Math.sqrt(Math.pow(ship.lasers[i].xv, 2) + Math.pow(ship.lasers[i].yv, 2));
            }

            // handle edge of screen
            if (ship.lasers[i].x < 0) {
                ship.lasers[i].x = canv.width;
            } else if (ship.lasers[i].x > canv.width) {
                ship.lasers[i].x = 0;
            }
            if (ship.lasers[i].y < 0) {
                ship.lasers[i].y = canv.height;
            } else if (ship.lasers[i].y > canv.height) {
                ship.lasers[i].y = 0;
            }
        }
    }

    function gameHUD(exploding) {
        //    Game level text
        if (textAlpha >= 0) {
            ctx.textAlign = "center";
            ctx.baseAlign = "middle";
            ctx.fillStyle = "rgba(255, 255, 255," + textAlpha + ")";
            ctx.font = "small-caps " + TEXT_SIZE + "px dejavu sans mono";
            ctx.fillText(text, canv.width / 2, canv.height * 0.75);
            textAlpha -= (1.0 / TEXT_FADE_TIME / FPS);
        } else if (ship.dead) {
            newGame();
        }
        //    life counter

        var lifeColour;
        for (var i = 0; i < lives; i++) {
            lifeColour = exploding && i == lives - 1 ? "red" : "white";
            drawShip(SHIP_SIZE + [i] * SHIP_SIZE * 1.2, SHIP_SIZE, SHIP_SIZE / 2.5, 0.5 * Math.PI, lifeColour);
        }


        //score counter

        ctx.textAlign = "right";
        ctx.baseAlign = "middle";
        ctx.fillStyle = "white";
        ctx.shadowBlur = 10;
        ctx.shadowColor = "white";
        ctx.font = TEXT_SIZE / 3 + "px dejavu sans mono";
        ctx.fillText(score, canv.width - SHIP_SIZE / 2, SHIP_SIZE + 10);

        // hi score counter

        ctx.textAlign = "center";
        ctx.baseAlign = "middle";
        ctx.fillStyle = "white";
        ctx.shadowBlur = 10;
        ctx.shadowColor = "white";
        ctx.font = TEXT_SIZE / 4 + "px dejavu sans mono";
        ctx.fillText("Hi: " + hiScore, canv.width / 2, SHIP_SIZE + 10);


        ctx.beginPath();
        ctx.rect(canv.width - SHIP_SIZE / 2 - 100, canv.height - SHIP_SIZE / 2 - 100, 50, 50);
        ctx.font = TEXT_SIZE / 7 + "px dejavu sans mono";
        ctx.fillText("up", canv.width - SHIP_SIZE / 2 - 75, canv.height - SHIP_SIZE / 2 - 75);
        ctx.stroke();


        ctx.beginPath();
        ctx.rect(canv.width - SHIP_SIZE / 2 - 50, canv.height - SHIP_SIZE / 2 - 50, 50, 50);
        ctx.font = TEXT_SIZE / 7 + "px dejavu sans mono";
        ctx.fillText("right", canv.width - SHIP_SIZE / 2 - 25, canv.height - SHIP_SIZE / 2 - 20);
        ctx.stroke();

        ctx.beginPath();
        ctx.rect(canv.width - SHIP_SIZE / 2 - 100, canv.height - SHIP_SIZE / 2 - 50, 50, 50);
        ctx.font = TEXT_SIZE / 7 + "px dejavu sans mono";
        ctx.fillText("down", canv.width - SHIP_SIZE / 2 - 75, canv.height - SHIP_SIZE / 2 - 20);
        ctx.stroke();

        ctx.beginPath();
        ctx.font = TEXT_SIZE / 7 + "px dejavu sans mono";
        ctx.rect(canv.width - SHIP_SIZE / 2 - 150, canv.height - SHIP_SIZE / 2 - 50, 50, 50);
        ctx.fillText("left", canv.width - SHIP_SIZE / 2 - 125, canv.height - SHIP_SIZE / 2 - 20);
        ctx.stroke();

        ctx.beginPath();
        ctx.font = TEXT_SIZE / 7 + "px dejavu sans mono";
        ctx.rect(canv.width - SHIP_SIZE / 2 - 100, canv.height - SHIP_SIZE / 2 - 250, 50, 50);
        ctx.fillText("SPC", canv.width - SHIP_SIZE / 2 - 75, canv.height - SHIP_SIZE / 2 - 220);
        ctx.fillText("Shoot", canv.width - SHIP_SIZE / 2 - 20, canv.height - SHIP_SIZE / 2 - 220);
        ctx.stroke();

        ctx.beginPath();
        ctx.font = TEXT_SIZE / 7 + "px dejavu sans mono";
        ctx.rect(canv.width - SHIP_SIZE / 2 - 100, canv.height - SHIP_SIZE / 2 - 200, 50, 50);
        ctx.fillText("Q", canv.width - SHIP_SIZE / 2 - 75, canv.height - SHIP_SIZE / 2 - 170);
        ctx.fillText("Quit", canv.width - SHIP_SIZE / 2 - 25, canv.height - SHIP_SIZE / 2 - 170);
        ctx.stroke();

        ctx.font = TEXT_SIZE / 7 + "px dejavu sans mono";
        ctx.fillText("Directions", canv.width - SHIP_SIZE / 2 - 75, canv.height - SHIP_SIZE / 2 - 122);
        ctx.stroke();


    }

    function update() {
        var blinkOn = ship.blinkNum % 2 == 0;
        var exploding = ship.explodeTime > 0;
        ctx.fillStyle = '#222222';
        ctx.fillRect(0, 0, canv.width, canv.height);
        //asteroids
        asteroidInit();
        thrusters(blinkOn, exploding);
        //ship
        shipBuild(blinkOn, exploding);
        laserVelocity();
        asteroidVelocity();
        // draw game test

        gameHUD(exploding);
        //move the asteroid

        //thrusters
    }

    function init() {
        document.addEventListener("fullscreenchange", onFullScreenChange, false);
        document.addEventListener("webkitfullscreenchange", onFullScreenChange, false);
        document.addEventListener("mozfullscreenchange", onFullScreenChange, false);

       function onFullScreenChange() {
            var fullscreenElement = document.fullscreenElement || document.mozFullScreenElement || document.webkitFullscreenElement;

            if(!fullscreenElement) {
                quitGame();
            }
            // if in fullscreen mode fullscreenElement won't be null
        }

        fullscreen();

    }

    init();
};

export default AsteroidsGameEngine;