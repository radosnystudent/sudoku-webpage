const valueInSquare = (square, value) => {
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
        this.counter = 1;
        this.possibleNumbers = [1, 2, 3, 4, 5, 6, 7, 8, 9];
    }

    getGrid() {
        return this.grid;
    }

    checkIsFull() {
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
        for (let i = 0; i < 9; i++) {
            if (value === this.grid[i][col]) {
                return true;
            }
        }
        return false;
    }

    getSquare(start, end, startingCol) {
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
        for (let i = 0; i < row.length; i++) {
            if (row[i] === value) {
                return true;
            }
        }
        return false;
    }

    fillGrid() {
        let row;
        let col;

        for (let i = 0; i < 81; i++) {
            row = Math.floor(i / 9);
            col = i % 9;

            if (this.grid[row][col] === 0) {
                shuffleArray(this.possibleNumbers);

                for (const value of this.possibleNumbers) {
                    if (!this.alreadyInRow(grid[row], value)) {
                        if (!this.alreadyInColumn(col, value)) {
                            let square;
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

                            if (!valueInSquare(square, value)) {
                                this.grid[row][col] = value;

                                if (this.checkIsFull()) {
                                    return true;
                                } else {
                                    if (this.fillGrid()) {
                                        return true;
                                    }
                                }
                            }
                        }
                    }
                }
                break;
            }
        }
        this.grid[row][col] = 0;
    }
}
