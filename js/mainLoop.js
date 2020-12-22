// Constants
var COLS = 40 , ROWS = 29;
var EMPTY = 0, SNAKE = 1, FRUIT = 2;
var LEFT  = 0, UP = 1, RIGHT = 2, DOWN  = 3;
var KEY_LEFT  = 37, KEY_UP = 38, KEY_RIGHT = 39, KEY_DOWN  = 40;

// Game Objects
var canvas;	  /* HTMLCanvas */
var ctx;	  /* CanvasRenderingContext2d */
var keystate; /* Object, used for keyboard inputs */
var frames;   /* number, used for animation */
var score;	  /* number, keep track of the player score */

/**
 * Starts the game
 */
function main() {
	// create and initiate the canvas element
	canvas = document.createElement("canvas");
	canvas.width = COLS * 20;
	canvas.height = ROWS * 20;
	ctx = canvas.getContext("2d");
	// add the canvas element to the body of the document
	document.body.appendChild(canvas);
	// sets an base font for bigger score display
	ctx.font = "12px Helvetica";
	frames = 0;
	keystate = {};
	// keeps track of the keybourd input
	document.addEventListener("keydown", function(evt) {
		keystate[evt.keyCode] = true;
	});
	document.addEventListener("keyup", function(evt) {
		delete keystate[evt.keyCode];
	});
	// intatiate game objects and starts the game loop
	init();
	loop();
}
/**
 * Resets and inits game objects
 */
function init() {
	score = 0;
	grid.init(EMPTY, COLS, ROWS);
	var sp = {x:Math.floor(COLS/2), y:ROWS-1};
	snake.init(UP, sp.x, sp.y);
	grid.set(SNAKE, sp.x, sp.y);
	setFood();
}
/**
 * The game loop function, used for game updates and rendering
 */
function loop() {
	update();
	draw();
	// When ready to redraw the canvas call the loop function
	// first. Runs about 60 frames a second
	window.requestAnimationFrame(loop, canvas);
}
/**
 * Updates the game logic
 */
function update() {
	frames++;
	// changing direction of the snake depending on which keys
	// that are pressed
	if (keystate[KEY_LEFT] && snake.direction !== RIGHT) {
		snake.direction = LEFT;
	} else if (keystate[KEY_UP] && snake.direction !== DOWN) {
		snake.direction = UP;
	} else if (keystate[KEY_RIGHT] && snake.direction !== LEFT) {
		snake.direction = RIGHT;
	} else if (keystate[KEY_DOWN] && snake.direction !== UP) {
		snake.direction = DOWN;
	}
	// each five frames update the game state.
	if (frames % 5 === 0) {
		// pop the last element from the snake queue i.e. the
		// head
		var nx = snake.last.x;
		var ny = snake.last.y;
		// updates the position depending on the snake direction
		switch (snake.direction) {
			case LEFT:
				nx--;
				break;
			case UP:
				ny--;
				break;
			case RIGHT:
				nx++;
				break;
			case DOWN:
				ny++;
				break;
		}
		// checks all gameover conditions
		if (0 > nx || nx > grid.width-1  ||
			0 > ny || ny > grid.height-1 ||
			grid.get(nx, ny) === SNAKE
		) {
			return init();
		}
		// check wheter the new position are on the fruit item
		if (grid.get(nx, ny) === FRUIT) {
			// increment the score and sets a new fruit position
			score++;
			setFood();
		} else {
			// take out the first item from the snake queue i.e
			// the tail and remove id from grid
			var tail = snake.remove();
			grid.set(EMPTY, tail.x, tail.y);
		}
		// add a snake id at the new position and append it to
		// the snake queue
		grid.set(SNAKE, nx, ny);
		snake.insert(nx, ny);
	}
}
/**
 * Render the grid to the canvas.
 */
function draw() {
	// calculate tile-width and -height
	var tw = canvas.width/grid.width;
	var th = canvas.height/grid.height;
	// iterate through the grid and draw all cells
	for (var x=0; x < grid.width; x++) {
		for (var y=0; y < grid.height; y++) {
			// sets the fillstyle depending on the id of
			// each cell
			switch (grid.get(x, y)) {
				case EMPTY:
					if (Number.isInteger(x / 2)) { // x is even
                        if (Number.isInteger(y / 2)) { //y is even
                            ctx.fillStyle = "#EEFF41";
                        } else { //y is odd
                            ctx.fillStyle = "#C6FF00";
                        }
					} else { // x is odd
                        if (!Number.isInteger(y / 2)) { //y is odd
                            ctx.fillStyle = "#EEFF41";
                        } else { //y is even
                            ctx.fillStyle = "#C6FF00";
                        }
                    }
					break;
				case SNAKE:
					ctx.fillStyle = "#0ff";
					break;
				case FRUIT:
					ctx.fillStyle = "#f00";
					break;
			}
			ctx.fillRect(x*tw, y*th, tw, th);
		}
	}
	// changes the fillstyle once more and draws the score
	// message to the canvas
	ctx.fillStyle = "#000";
	ctx.fillText("SCORE: " + score, 10, canvas.height-10);
}
// start and run the game
main();
