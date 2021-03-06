const valueInSquare = (square, value) => {
    /* Check if value is already in given square */
    for (let i = 0; i < square.length; i++) {
        for (let j = 0; j < square.length; j++) {
            if (square[i][j] === value) {
                return true;
            }
        }
    }
    return false;
};

const shuffleArray = (array) => {
    for (let i = array.length - 1; i > 0; i--) {
        const j = Math.floor(Math.random() * (i + 1));
        const temp = array[i];
        array[i] = array[j];
        array[j] = temp;
    }
};

class Sudoku {
    constructor(grid) {
        this.grid = grid;
        this.possibleNumbers = [1, 2, 3, 4, 5, 6, 7, 8, 9];
    }

    getGrid() {
        return this.grid;
    }

    checkIsFull() {
        /* Check if all cells are filled */
        for (let i = 0; i < 9; i++) {
            for (let j = 0; j < 9; j++) {
                if (this.grid[i][j] === 0) {
                    return false;
                }
            }
        }
        return true;
    }

    alreadyInColumn(col, value) {
        /* Check if value is already in column */
        for (let i = 0; i < 9; i++) {
            if (value === this.grid[i][col]) {
                return true;
            }
        }
        return false;
    }

    getSquare(start, end, startingCol) {
        /*
        get specific square
        'start' and 'end' are numbers for first and last row of square,
        'startingCol' is variable for the first column of the square
        */
        const square = [];
        for (let i = start; i < end; i++) {
            square.push([
                this.grid[i][startingCol],
                this.grid[i][startingCol + 1],
                this.grid[i][startingCol + 2],
            ]);
        }
        return square;
    }

    alreadyInRow(row, value) {
        /* Check if value is already in a row */
        for (let i = 0; i < row.length; i++) {
            if (row[i] === value) {
                return true;
            }
        }
        return false;
    }

    fillGrid() {
        /* Recursive function to fill board  */
        let row;
        let col;

        for (let i = 0; i < 81; i++) {
            /* gets rows and columns from 0-9 */
            row = Math.floor(i / 9);
            col = i % 9;

            // check if this cell is not filled
            if (this.grid[row][col] === 0) {
                shuffleArray(this.possibleNumbers);

                // iterate over array contains every possible number that can be in cell
                for (const value of this.possibleNumbers) {
                    // check if row and column don't have this value already
                    if (!this.alreadyInRow(grid[row], value)) {
                        if (!this.alreadyInColumn(col, value)) {
                            let square;

                            //get square contains actual cell -> grid[row][col]
                            if (row < 3) {
                                if (col < 3) {
                                    square = this.getSquare(0, 3, 0);
                                } else if (col >= 3 && col < 6) {
                                    square = this.getSquare(0, 3, 3);
                                } else {
                                    square = this.getSquare(0, 3, 6);
                                }
                            } else if (row >= 3 && row < 6) {
                                if (col < 3) {
                                    square = this.getSquare(3, 6, 0);
                                } else if (col < 6) {
                                    square = this.getSquare(3, 6, 3);
                                } else {
                                    square = this.getSquare(3, 6, 6);
                                }
                            } else {
                                if (col < 3) {
                                    square = this.getSquare(6, 9, 0);
                                } else if (col >= 3 && col < 6) {
                                    square = this.getSquare(6, 9, 3);
                                } else {
                                    square = this.getSquare(6, 9, 6);
                                }
                            }

                            // check if value is not in square already
                            // if not - fill the cell with this value
                            if (!valueInSquare(square, value)) {
                                this.grid[row][col] = value;

                                // if board is fulled, this return will end the function
                                if (this.checkIsFull()) {
                                    return true;
                                } else {
                                    // recursive call of the function
                                    if (this.fillGrid()) {
                                        return true;
                                    }
                                }
                            }
                        }
                    }
                }
                // if all values ??????have been checked - break the loop
                break;
            }
        }
        this.grid[row][col] = 0;
    }
}
