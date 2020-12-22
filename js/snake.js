snake = {
	direction: null, /* number, the direction */
	last: null,		 /* Object, pointer to the last element in the queue */
	_queue: null,	 /* Array<number>, data representation*/

    /** Clears the queue and sets the start position and direction */
	init: function(d, x, y) {
		this.direction = d;
		this._queue = [];
		this.insert(x, y);
        this.insert(x, y++);
	},
    /** Adds an element to the queue */
	insert: function(x, y) {
		// unshift prepends an element to an array
		this._queue.unshift({x:x, y:y});
		this.last = this._queue[0];
	},
    /** Removes and returns the first element in the queue */
	remove: function() {
		// pop returns the last element of an array
		return this._queue.pop();
	}
};
