grid = {
	width: null,  /* number, the number of columns */
	height: null, /* number, the number of rows */
	_grid: null,  /* Array<any>, data representation */

    /** Initiate and fill a c x r grid with the value of d */
	init: function(d, c, r) {
		this.width = c;
		this.height = r;
		this._grid = [];
		for (var x=0; x < c; x++) {
			this._grid.push([]);
			for (var y=0; y < r; y++) {
				this._grid[x].push(d);
			}
		}
	},
    /** Set the value of the grid cell at (x, y) */
	set: function(val, x, y) {
		this._grid[x][y] = val;
	},
    /** Get the value of the cell at (x, y) */
	get: function(x, y) {
		return this._grid[x][y];
	}
}
