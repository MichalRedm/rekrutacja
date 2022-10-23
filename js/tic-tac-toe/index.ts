type Turn    = "x" | "o";
type Symbols = "" | "x" | "o";

/** `true` if the game is ongoing, `false` if either of the players has already won. */
let gamePending: boolean = true;
/** Current turn. */
let turn: Turn = "x";
/** Variable conatining data about the current state of the board. */
const symbols: Symbols[][] = [["", "", ""], ["", "", ""], ["", "", ""]];

/** An element that contains the entire board. */
const board:    HTMLDivElement     = document.querySelector(".board")!;
/** An array containing single board tiles. */
const tiles:    HTMLDivElement[]   = Array.from(document.querySelectorAll(".tile"));
/** `h1` element with class `turn`, containing info about who's turn is it. */
const turnElem: HTMLHeadingElement = document.querySelector(".turn")!;
/** Button that allows to reset the game. */
const resetBtn: HTMLButtonElement  = document.querySelector(".reset")!;

board.addEventListener("click", event => {

    // If the game has already ended, disallow any interaction with the board.
    if (!gamePending) {
        return;
    }

    const target = event.target as HTMLDivElement;
    const classes = Array.from(target.classList);
    if (classes.includes("tile") && classes.length !== 1) return;

    const idx = tiles.indexOf(target);

    target.classList.add(`tile-${turn}`);
    symbols[idx % 3][Math.floor(idx / 3)] = turn;
    turn = turn == "x" ? "o" : "x";

    displayTurn(turn);

    checkWin();
    
});

resetBtn.addEventListener("click", reset);

/**
 * Modifies the text in the `h1.turn` element depending on who's turn is it.
 * 
 * @param turn Current turn.
 */
function displayTurn(turn: Turn) {
    turnElem.innerText = `${turn.toUpperCase()} Turn`;
}

/** Checks if any of the players has won the game. */
function checkWin(): void {

    const result: Symbols = (() => {

        // Check the rows and columns.
        for (let i = 0; i < 3; i++) {
            if (same(symbols[i][0], symbols[i][1], symbols[i][2]) ||
                same(symbols[0][i], symbols[1][i], symbols[2][i])) {
                return symbols[i][i];
            }
        }
    
        // Check the diagonals.
        if (same(symbols[0][0], symbols[1][1], symbols[2][2]) ||
            same(symbols[2][0], symbols[1][1], symbols[0][2])) {
            return symbols[1][1];
        }
    
        // If none of the players has won.
        return "";

    })();

    // If either of the players has won the game, end it and display the alert.
    if (result) {
        gamePending = false;
        setTimeout(() => alert(`Player ${result.toUpperCase()} has won the game!`), 50);
    }
    
}

/** Resets the game. */
function reset(): void {

    // Reset the state of the `symbols` variable.
    for (let i = 0; i < 3; i++) {
        symbols[i] = ["", "", ""];
    }

    // Set the `turn` variable back to it's initial value.
    turn = "x";

    // Remove extra classes for all the board tiles to remove X and O symbols from the board.
    tiles.forEach(elem => elem.setAttribute("class", "tile"));

    // Set the game state to pending.
    gamePending = true;

}

/**
 * Determines whether the all of the three provided symbols are equal (but set).
 * 
 * @param a First symbol.
 * @param b Second symbol.
 * @param c Third symbol.
 * @returns `true` if all the parameters are equal (but not empty), `false` otherwise.
 */
function same(a: Symbols, b: Symbols, c: Symbols): boolean {
    return a == b && a == c && a != "";
}
