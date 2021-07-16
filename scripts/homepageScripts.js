const buttons = document.querySelectorAll(".menu-button");

buttons.forEach((button) => {
    button.addEventListener("click", function () {
        location.href = `sudoku.html?diff=${button.value[0]}`;
        // console.log(button.value);
    });
});
