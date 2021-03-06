const getRemovedCells = (diff) => {
    /*
    function generate array contains
    random picked cells that will be removed from board
    */
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
const numberButtons = document.querySelectorAll(".number-button");
const squares = document.querySelectorAll("tr");
const message = document.querySelector("h3");
const menuButton = document.getElementById("menu-button");
const checkButton = document.getElementById("check-button");
const overlay = document.querySelector(".message-overlay");

title.innerText = `Poziom trudności: ${
    myParam === "e"
        ? "łatwy"
        : myParam === "m"
        ? "średni"
        : myParam === "h"
        ? "trudny"
        : "łatwy"
}`;

// create empty grid
const grid = [];
for (let i = 0; i < 9; i++) {
    grid.push([]);
    for (let j = 0; j < 9; j++) {
        grid[i].push(0);
    }
}

// generate sudoku board
const sudoku = new Sudoku(grid);
sudoku.fillGrid();
const filledGrid = sudoku.getGrid();
const board = filledGrid.map((arr) => {
    return arr.slice();
});

// get cells and remove them from board (replace number with 0)
// these will be the places for the numbers to be guessed by the player
const pickedCells = getRemovedCells(myParam);

pickedCells.forEach((cell) => {
    board[cell[0]][cell[1]] = 0;
});

// create array contains html table fields that represents game board
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
        // if cell is not 0 - write the number and make cell disable for the player
        if (board[i][j] !== 0) {
            htmlBoard[i][j].children[0].value = board[i][j];
            htmlBoard[i][j].children[0].disabled = true;
        } else {
            // if cell isn't empty then gets few listeners

            // 1) on change check if have red color (after click 'check solution' button
            // wrong answers will be coloured on red) set back to black (player changed his previous, wrong answer)
            // then check if any of highlight button is active and if button with number, that player just typed, is active
            // highlight this field too
            htmlBoard[i][j].children[0].addEventListener("change", () => {
                if (htmlBoard[i][j].children[0].style.color === "red") {
                    htmlBoard[i][j].children[0].style.color = "#000";
                }
                numberButtons.forEach((button) => {
                    if (
                        parseInt(button.firstChild.nodeValue, 10) ===
                        parseInt(htmlBoard[i][j].children[0].value, 10)
                    ) {
                        if (
                            button.classList.contains("number-button-clicked")
                        ) {
                            htmlBoard[i][j].classList.add("active-number");
                        }
                    }
                });
            });

            // 2) if cell is focus - clicked on input - highlight whole column and row
            htmlBoard[i][j].children[0].addEventListener("focusin", () => {
                for (let k = 0; k < 9; k++) {
                    htmlBoard[i][k].classList.add("active-td");
                    htmlBoard[k][j].classList.add("active-td");
                }
            });

            // 3) if cell is stop being focus - clicked on input - highlight whole column and row
            htmlBoard[i][j].children[0].addEventListener("focusout", () => {
                for (let k = 0; k < 9; k++) {
                    htmlBoard[i][k].classList.remove("active-td");
                    htmlBoard[k][j].classList.remove("active-td");
                }
            });
        }
    }
}

const isFilled = () => {
    // check if board is filled
    for (let i = 0; i < 9; i++) {
        for (let j = 0; j < 9; j++) {
            if (htmlBoard[i][j].children[0].value === "") {
                return false;
            }
        }
    }
    return true;
};

const checkSolution = () => {
    // solution is check only if board is fulled
    if (isFilled()) {
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
                        countCorrect++;
                    }
                }
            }
        }

        const toFill =
            myParam === "e" ? 25 : diff === "m" ? 35 : diff === "h" ? 45 : 25;

        if (countWrong !== 0) {
            overlay.style.display = "flex";
            message.innerText = `Liczba błędów: ${countWrong}`;
            message.style.color = "red";
            setTimeout(() => {
                overlay.style.display = "none";
            }, 1500);
        } else {
            message.innerText = "";
        }

        console.log(countCorrect);
        console.log(toFill);

        if (countCorrect === toFill) {
            overlay.style.display = "flex";
            message.innerText = `Gratulacje! Rozwiązałeś poprawnie!`;
            message.style.color = "green";
            setTimeout(() => {
                location.href = "index.html";
            }, 2000);
        }
    } else {
        message.innerText = `Nie wszystkie pola zostały uzupełnione!`;
        message.style.color = "red";
        setTimeout(() => {
            message.innerText = "";
        }, 1500);
    }
};

menuButton.addEventListener("click", () => {
    location.href = "index.html";
});

checkButton.addEventListener("click", () => checkSolution());

numberButtons.forEach((button) => {
    button.addEventListener("click", () => {
        button.classList.toggle("number-button-clicked");
        for (let i = 0; i < htmlBoard.length; i++) {
            for (let j = 0; j < htmlBoard.length; j++) {
                if (
                    parseInt(htmlBoard[i][j].children[0].value, 10) ===
                    parseInt(button.firstChild.nodeValue, 10)
                ) {
                    if (button.classList.contains("number-button-clicked")) {
                        htmlBoard[i][j].classList.add("active-number");
                    } else {
                        htmlBoard[i][j].classList.remove("active-number");
                    }
                } else {
                    htmlBoard[i][j].classList.remove("active-number");
                    numberButtons.forEach((btn) => {
                        if (
                            parseInt(btn.firstChild.nodeValue, 10) !==
                            parseInt(button.firstChild.nodeValue, 10)
                        ) {
                            btn.classList.remove("number-button-clicked");
                        }
                    });
                }
            }
        }
    });
});
