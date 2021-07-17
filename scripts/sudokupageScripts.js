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

const sudoku = new Sudoku(grid);

sudoku.fillGrid();
const filledGrid = sudoku.getGrid();
const board = filledGrid.map((arr) => {
    return arr.slice();
});

const squares = document.querySelectorAll("tr");

const htmlBoard = [];
let counter = 0;
squares.forEach((square) => {
    htmlBoard.push([]);
    console.log(square.children);
    for (const item of square.children) {
        htmlBoard[counter].push(item);
    }
    counter++;
});

for (let i = 0; i < 9; i++) {
    for (let j = 0; j < 9; j++) {
        htmlBoard[i][j].children[0].value = board[i][j];
    }
}

console.log(htmlBoard);
