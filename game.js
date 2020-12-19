const EMPTY = '&nbsp;';

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
        return Board.getRow(this.answer, rowNum).includes(val)
    }
    isInColumn(val, colNum) {
        return Board.getCol(this.answer, colNum).includes(val);
    }
    isInQuadrant(val, yq, xq) {
        /* Quadrant is in a 3x3 grid (but zero index)
        */
        return Board.getQuad(this.answer, yq, xq).includes(val);
    }

    static numInRow(board, row) {
        const theRow = Board.getRow(board, row);
        return theRow.reduce((acc, i) => acc + (i === EMPTY ? 0 : 1), 0);
    }
    static numInCol(board, col) {
        const theCol = Board.getCol(board, col);
        return theCol.reduce((acc, i) => acc + (i === EMPTY ? 0 : 1), 0);
    }
    static numInQuad(board, y, x) {
        const theQuad = Board.getQuad(board, y, x);
        return theQuad.reduce((acc, i) => acc + (i === EMPTY ? 0 : 1), 0);
    }


    static getRow(board, rowNum) {
        return board[rowNum];
    }
    static getCol(board, colNum) {
        return board.map(row => row[colNum]);
    }
    static getQuad(board, y, x) {
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

    static isEmpty(board, y, x) {
        return board[y][x] === EMPTY;
    }

    static getEmptyCoords(board) {
        let result = [];
        for (let y = 0; y < board.length; y++) {
            for (let x = 0; x < board[y].length; x++) {
                if (board[y][x] === EMPTY) {
                    result.push([y, x])
                }
            }
        }
        return result;
    }

    giveHint() {
        const emptyCoords = Board.getEmptyCoords(this.board);
        const target = Math.floor(Math.random() * emptyCoords.length);
        const [y, x] = emptyCoords[target];
        return [y, x, this.answer[y][x]];
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

    newFromAnswer(missing=35) {
        let toGo = missing;
        let board = this.copy().answer;
        while (toGo) {
            let choice = [Math.floor(Math.random() * 9), Math.floor(Math.random() * 9)]
            if (Board.isEmpty(board, choice[0], choice[1])) {
                continue;
            }
            if (Board.numInQuad(board, Math.floor(choice[0] / 3), Math.floor(choice[1] / 3)) < 2) {
                continue;
            }
            board[choice[0]][choice[1]] = EMPTY;
            toGo--;
        }
        this.board = board;
    }

    updateFromUI(id='board') {
        const rows = document.getElementById(id);
        for (let y = 0; y < rows.children.length; y++) {
            let row = rows.children[y];
            for (let x = 0; x < row.children.length; x++) {
                const val = row.children[x].children[0].innerHTML;
                this.board[y][x] = val;
            }
        }
    }
}

const b = createBoard();
b.newFromAnswer();
console.log(b.answer);
console.log(b.board);
try {
    window.BOARD = b.board;
} catch (e) {

}

