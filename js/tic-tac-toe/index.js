"use strict";
let gamePending = true;
let turn = "x";
const symbols = [["", "", ""], ["", "", ""], ["", "", ""]];
const board = document.querySelector(".board");
const tiles = Array.from(document.querySelectorAll(".tile"));
const turnElem = document.querySelector(".turn");
const resetBtn = document.querySelector(".reset");
board.addEventListener("click", event => {
    if (!gamePending) {
        return;
    }
    const target = event.target;
    const classes = Array.from(target.classList);
    if (classes.includes("tile") && classes.length !== 1)
        return;
    const idx = tiles.indexOf(target);
    target.classList.add(`tile-${turn}`);
    symbols[idx % 3][Math.floor(idx / 3)] = turn;
    turn = turn == "x" ? "o" : "x";
    displayTurn(turn);
    checkWin();
});
resetBtn.addEventListener("click", reset);
function displayTurn(turn) {
    turnElem.innerText = `${turn.toUpperCase()} Turn`;
}
function checkWin() {
    const result = (() => {
        for (let i = 0; i < 3; i++) {
            if (same(symbols[i][0], symbols[i][1], symbols[i][2]) ||
                same(symbols[0][i], symbols[1][i], symbols[2][i])) {
                return symbols[i][i];
            }
        }
        if (same(symbols[0][0], symbols[1][1], symbols[2][2]) ||
            same(symbols[2][0], symbols[1][1], symbols[0][2])) {
            return symbols[1][1];
        }
        return "";
    })();
    if (result) {
        gamePending = false;
        setTimeout(() => alert(`Player ${result.toUpperCase()} has won the game!`), 50);
    }
}
function reset() {
    for (let i = 0; i < 3; i++) {
        symbols[i] = ["", "", ""];
    }
    turn = "x";
    tiles.forEach(elem => elem.setAttribute("class", "tile"));
    gamePending = true;
}
function same(a, b, c) {
    return a == b && a == c && a != "";
}
