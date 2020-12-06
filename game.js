// function createBoard() {
//     let result = [];
//     for (let y = 0; y < 9; y++) {
//         let row = [];
//         for (let x = 0; x < 9; x++) {
//             row.push('_');
//         }
//         result.push(row);
//     }
//     return result;
// }

function createBoard(y=0, x=0, choice=null, board=null) {

    board = board || new Board();
    choice = choice || randomNumber();

    if (board.isInColumn(choice, x) ||
        board.isInRow(choice, y) ||
        board.isInQuadrant(choice, Math.floor(y / 3), Math.floor(x / 3))
    ) {
        // choice was illegal
        return null;
    }
    board.add(y, x, choice);

    if (x === 8 && y === 8) {
        return board;
    }

    // increment to next step
    let nextX = x;
    let nextY = y;
    if (x === 8) {
        nextX = 0;
        nextY++;
    }
    else {
        nextX++;
    }
    // recursive call
    let tries = randomRow();
    for (let i = 0; i < tries.length; i++) {
        let result = createBoard(nextY, nextX, tries[i], board.copy());
        if (result) {
            return result;
        }
    }
}

function randomRow() {
    let row = [];
    for (let i = 1; i <= 9; i++) {
        let val = i.toString();
        let index = Math.round(Math.random() * 8);
        while (row[index]) {
            index = Math.round(Math.random() * 8);
        }
        row[index] = val;
    }
    return row;
}

function randomNumber() {
    return (Math.round(Math.random() * 8) + 1).toString();
}

class Board {
    constructor() {
        let result = [];
        for (let y = 0; y < 9; y++) {
            let row = [];
            for (let x = 0; x < 9; x++) {
                row.push('_');
            }
            result.push(row);
        }
        this.data = result;
        this.isImpossible = null;
    }

    add(y, x, val) {
        this.data[y][x] = val;
    }

    isInRow(val, rowNum) {
        const theRow = this.data[rowNum];
        console.log('checking orow ', theRow);
        return theRow.includes(val);
    }

    isInColumn(val, colNum) {
        for (let i = 0; i < 9; i++) {
            if (this.data[i][colNum] === val) {
                return true;
            }
        }
        return false;
    }

    isInQuadrant(val, yq, xq) {
        /* Quadrant is in a 3x3 grid (but zero index)
        */
        const ystart = yq * 3;
        const yend = ystart + 3;
        const xstart = xq * 3;
        const xend = xstart + 3;
        for (let y = ystart; y < yend; y++) {
            for (let x = xstart; x < xend; x++) {
                if (this.data[y][x] === val) {
                    return true;
                }
            }
        }
        return false;
    }

    isEmpty(y, x) {
        return this.data[y][x] === '_';
    }

    randomNumber() {
        return randomNumber();
    }

    copy() {
        let boardCopy = new Board();
        for (let y = 0; y < this.data.length; y++) {
            for (let x = 0; x < this.data[0].length; x++) {
                boardCopy.data[y][x] = this.data[y][x]
            }
        }
        return boardCopy;
    }
    populate(y = 0, x = 0, choice = this.randomNumber()) {

        if (this.isInColumn(candidate, x) ||
            this.isInRow(candidate, y) ||
            this.isInQuadrant(candidate, Math.floor(y / 3), Math.floor(x / 3))
        ) {
            return null;
        }


        while (tried.includes(choice)) {
            choice = this.randomNumber();
        }

    }

    populateOld() {
        for (let y = 0; y < this.data.length; y++) {
            for (let x = 0; x < this.data[y].length; x++) {
                let count = 0;
                while (true) {
                    let candidate = (Math.round(Math.random() * 8) + 1).toString();
                    if (!this.isInColumn(candidate, x) &&
                        !this.isInRow(candidate, y) &&
                        !this.isInQuadrant(candidate, Math.floor(y / 3), Math.floor(x / 3))
                    ) {
                        this.add(y, x, candidate)
                        break;
                    }
                    if (count++ > 100) {
                        return;
                    }
                }
            }
        }
    }
}

// const b = new Board();
// b.populate();
const b = createBoard();
console.log(b.data);
try {
    window.BOARD = b.data;
} catch (e) {

}

const testData = [
    [
        '_', '_', '6',
        '_', '8', '8',
        '3', '6', '1'
    ],
    [
        '4', '_', '6',
        '2', '7', '5',
        '5', '7', '4'
    ],
    [
        '5', '8', '3',
        '8', '7', '8',
        '8', '7', '5'
    ],
    [
        '5', '3', '_',
        '7', '5', '_',
        '5', '5', '3'
    ],
    [
        '_', '3', '6',
        '4', '_', '_',
        '3', '6', '4'
    ],
    [
        '4', '1', '1',
        '2', '2', '_',
        '6', '7', '3'
    ],
    [
        '4', '_', '1',
        '4', '1', '_',
        '7', '4', '1'
    ],
    [
        '2', '3', '2',
        '1', '1', '_',
        '2', '8', '1'
    ],
    [
        '2', '_', '2',
        '6', '7', '_',
        '8', '6', '_'
    ]
]
//
// const testBoard = new Board();
// testBoard.data = testData;
