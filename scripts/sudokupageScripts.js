const getRemovedCells = (diff) => {
    const isCellNotPicked = (pickedCells, cell) => {
        if (pickedCells.length === 0) {
            return true;
        }
        for (const checkCell of pickedCells) {
            if (checkCell[0] === cell[0] && checkCell[1] === cell[1]) {
                return false;
            }
        }
        return true;
    };

    let cellsNumber =
        diff === "e" ? 25 : diff === "m" ? 35 : diff === "h" ? 45 : 25;

    const pickedCells = [];

    while (true) {
        let row = Math.floor((Math.random() * 10) % 9);
        let col = Math.floor((Math.random() * 10) % 9);
        if (isCellNotPicked(pickedCells, [row, col])) {
            pickedCells.push([row, col]);
            cellsNumber--;
        }
        if (cellsNumber === 0) {
            break;
        }
    }
    return pickedCells;
};

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
const pickedCells = getRemovedCells(myParam);

pickedCells.forEach((cell) => {
    board[cell[0]][cell[1]] = 0;
});

const htmlBoard = [];
let counter = 0;
squares.forEach((square) => {
    htmlBoard.push([]);
    for (const item of square.children) {
        htmlBoard[counter].push(item);
    }
    counter++;
});

for (let i = 0; i < 9; i++) {
    for (let j = 0; j < 9; j++) {
        if (board[i][j] !== 0) {
            htmlBoard[i][j].children[0].value = board[i][j];
            htmlBoard[i][j].children[0].disabled = true;
        } else {
            htmlBoard[i][j].children[0].addEventListener("change", () => {
                if (htmlBoard[i][j].children[0].style.color === "red") {
                    htmlBoard[i][j].children[0].style.color = "#000";
                }
            });
            htmlBoard[i][j].children[0].addEventListener("focusin", () => {
                for (let k = 0; k < 9; k++) {
                    htmlBoard[i][k].classList.add("active-td");
                    htmlBoard[k][j].classList.add("active-td");
                }
            });
            htmlBoard[i][j].children[0].addEventListener("focusout", () => {
                for (let k = 0; k < 9; k++) {
                    htmlBoard[i][k].classList.remove("active-td");
                    htmlBoard[k][j].classList.remove("active-td");
                }
            });
        }
    }
}

const message = document.querySelector("h3");

const checkSolution = () => {
    let countWrong = 0;
    let countCorrect = 0;
    for (let i = 0; i < 9; i++) {
        for (let j = 0; j < 9; j++) {
            if (
                parseInt(htmlBoard[i][j].children[0].value, 10) !==
                    filledGrid[i][j] &&
                htmlBoard[i][j].children[0].value !== ""
            ) {
                htmlBoard[i][j].children[0].style.color = "red";
                countWrong++;
            } else {
                if (
                    !htmlBoard[i][j].children[0].disabled &&
                    parseInt(htmlBoard[i][j].children[0].value, 10) ===
                        filledGrid[i][j]
                ) {
                    htmlBoard[i][j].children[0].style.color = "black";
                    console.log(i, " ", j);
                    countCorrect++;
                }
            }
        }
    }

    const toFill =
        myParam === "e" ? 25 : diff === "m" ? 35 : diff === "h" ? 45 : 25;

    if (countWrong !== 0) {
        message.innerText = `Liczba błędów: ${countWrong}`;
        message.style.color = "red";
    } else {
        message.innerText = "";
    }
    if (countCorrect === toFill) {
        message.innerText = `Gratulacje! Rozwiązałeś poprawnie!`;
        message.style.color = "green";
        setTimeout(() => {
            location.href = "index.html";
        }, 2000);
    }
};

const menuButton = document.getElementById("menu-button");
menuButton.addEventListener("click", () => {
    location.href = "index.html";
});

const checkButton = document.getElementById("check-button");
checkButton.addEventListener("click", () => checkSolution());
