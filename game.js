const EMPTY = '_';

function createBoard(y=0, x=0, _choice=null, _board=null) {

    _board = _board || new Board();
    _choice = _choice || randomNumber();

    if (_board.isInColumn(_choice, x) ||
        _board.isInRow(_choice, y) ||
        _board.isInQuadrant(_choice, Math.floor(y / 3), Math.floor(x / 3))
    ) {
        // choice was illegal
        return null;
    }
    _board.add(y, x, _choice);

    if (x === 8 && y === 8) {
        return _board;
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
        let result = createBoard(nextY, nextX, tries[i], _board.copy());
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
        this.answer = result;

    }

    add(y, x, val) {
        this.answer[y][x] = val;
    }

    isInRow(val, rowNum) {
        return Board._getRow(this.answer, rowNum).includes(val)
    }

    isInColumn(val, colNum) {
        return Board._getCol(this.answer, colNum).includes(val);
    }

    isInQuadrant(val, yq, xq) {
        /* Quadrant is in a 3x3 grid (but zero index)
        */
        return Board._getQuadrant(this.answer, yq, xq).includes(val);
    }

    static _getRow(board, rowNum) {
        return board[rowNum];
    }
    static _getCol(board, colNum) {
        return board.map(row => row[colNum]);
    }
    static _getQuadrant(board, y, x) {
        const ystart = y * 3;
        const yend = ystart + 3;
        const xstart = x * 3;
        const xend = xstart + 3;
        let result = [];
        for (let y = ystart; y < yend; y++) {
            for (let x = xstart; x < xend; x++) {
                result.push(board[y][x])
            }
        }
        return result;
    }

    isEmpty(y, x) {
        return this.answer[y][x] === '_';
    }

    copy() {
        let boardCopy = new Board();
        for (let y = 0; y < this.answer.length; y++) {
            for (let x = 0; x < this.answer[0].length; x++) {
                boardCopy.answer[y][x] = this.answer[y][x]
            }
        }
        return boardCopy;
    }

    newFromAnswer() {

    }
}


const b = createBoard();
console.log(b.answer);
try {
    window.BOARD = b.answer;
} catch (e) {

}

