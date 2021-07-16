const myParam = location.search.split("diff=")[1]
    ? location.search.split("diff=")[1]
    : "e";

const title = document.querySelector(".title");
title.innerText = `Poziom trudności: ${
    myParam === "e"
        ? "łatwy"
        : myParam === "m"
        ? "średni"
        : myParam === "h"
        ? "trudny"
        : "łatwy"
}`;

const grid = [];
for (let i = 0; i < 9; i++) {
    grid.push([]);
    for (let j = 0; j < 9; j++) {
        grid[i].push(0);
    }
}

console.log(grid);

const checkIsFull = (grid) => {
    // console.log(JSON.parse(JSON.stringify(grid)));
    for (let i = 0; i < 9; i++) {
        for (let j = 0; j < 9; j++) {
            if (grid[i][j] === 0) {
                return false;
            }
        }
    }
    return true;
};

const alreadyInColumn = (grid, col, value) => {
    for (let i = 0; i < 9; i++) {
        if (value === grid[i][col]) {
            return true;
        }
    }
    return false;
};

const getSquare = (grid, start, end, startingCol) => {
    const square = [];
    for (let i = start; i < end; i++) {
        square.push([
            grid[i][startingCol],
            grid[i][startingCol + 1],
            grid[i][startingCol + 2],
        ]);
    }
    return square;
};

let counter = 1;

const solveGrid = (grid) => {
    let row;
    let col;
    for (let i = 0; i < 81; i++) {
        row = Math.floor(i / 9);
        col = i % 9;

        if (grid[row][col] === 0) {
            for (let value = 1; value < 10; value++) {
                if (!grid[row].includes(value)) {
                    if (!alreadyInColumn(grid, col, value)) {
                        let square = [];
                        if (row < 3) {
                            if (col < 3) {
                                square = getSquare(grid, 0, 3, 0);
                            } else if (col < 6) {
                                square = getSquare(grid, 0, 3, 0);
                            } else {
                                square = getSquare(grid, 0, 3, 0);
                            }
                        } else if (row < 6) {
                            if (col < 3) {
                                square = getSquare(grid, 3, 6, 0);
                            } else if (col < 6) {
                                square = getSquare(grid, 3, 6, 0);
                            } else {
                                square = getSquare(grid, 3, 6, 0);
                            }
                        } else {
                            if (col < 3) {
                                square = getSquare(grid, 6, 9, 0);
                            } else if (col < 6) {
                                square = getSquare(grid, 6, 9, 0);
                            } else {
                                square = getSquare(grid, 6, 9, 0);
                            }
                        }
                        if (
                            !square[0].includes(value) &&
                            !square[1].includes(value) &&
                            !square[2].includes(value)
                        ) {
                            grid[row][col] = value;
                            if (checkIsFull(grid)) {
                                counter += 1;
                                break;
                            } else {
                                if (solveGrid(grid)) {
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
    grid[row][col] = 0;
};

const shuffleArray = (array) => {
    for (let i = array.length - 1; i > 0; i--) {
        const j = Math.floor(Math.random() * (i + 1));
        const temp = array[i];
        array[i] = array[j];
        array[j] = temp;
    }
};

const numberList = [1, 2, 3, 4, 5, 6, 7, 8, 9];
let lulw = 0;

const fillGrid = (grid) => {
    let row;
    let col;

    for (let i = 0; i < 81; i++) {
        row = Math.floor(i / 9);
        col = i % 9;

        if (grid[row][col] === 0) {
            shuffleArray(numberList);
            numberList.forEach((value) => {
                if (!grid[row].includes(value)) {
                    if (!alreadyInColumn(grid, col, value)) {
                        let square = [];
                        if (row < 3) {
                            if (col < 3) {
                                square = getSquare(grid, 0, 3, 0);
                            } else if (col < 6) {
                                square = getSquare(grid, 0, 3, 3);
                            } else {
                                square = getSquare(grid, 0, 3, 6);
                            }
                        } else if (row < 6) {
                            if (col < 3) {
                                square = getSquare(grid, 3, 6, 0);
                            } else if (col < 6) {
                                square = getSquare(grid, 3, 6, 3);
                            } else {
                                square = getSquare(grid, 3, 6, 6);
                            }
                        } else {
                            if (col < 3) {
                                square = getSquare(grid, 6, 9, 0);
                            } else if (col < 6) {
                                square = getSquare(grid, 6, 9, 3);
                            } else {
                                square = getSquare(grid, 6, 9, 6);
                            }
                        }

                        if (
                            !square[0].includes(value) &&
                            !square[1].includes(value) &&
                            !square[2].includes(value)
                        ) {
                            grid[row][col] = value;

                            if (checkIsFull(grid)) {
                                return [grid, true];
                            } else {
                                let [returnedGrid, check] = fillGrid(grid);
                                grid = returnedGrid;
                                if (check) {
                                    return [grid, true];
                                }
                            }
                        }
                    }
                }
            });

            break;
        }
    }
    grid[row][col] = 0;
    return [grid, true];
};

let [filledGrid, check] = fillGrid(grid);

console.log(filledGrid);
