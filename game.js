function createBoard() {
    let result = [];
    for (let y = 0; y < 9; y++) {
        let row = [];
        for (let x = 0; x < 9; x++) {
            row.push('_');
        }
        result.push(row);
    }
    return result;
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

    populate() {
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

    populateOld() {
        for (let i = 0; i < 81; i++) {
            const num = ((i % 8) + 1).toString();

            let tries = 0;
            while (true) {
                let area = [Math.round(Math.random() * 8), Math.round(Math.random() * 8)];
                // area[y][x]

                if (this.isEmpty(...area) &&
                    !this.isInColumn(num, area[1]) &&
                    !this.isInRow(num, area[0]) &&
                    !this.isInQuadrant(num, Math.floor(area[0] / 3), Math.floor(area[1] / 3))
                ) {
                    this.add(...area, num);
                    break;
                }

                if (tries++ > 1000) {
                    this.isImpossible = true;
                    return;
                }
            }
        }
    }
}

const b = new Board();
b.populate();
console.log(b.data);
try {
    window.BOARD = b.data;
}
catch (e) {

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

const testBoard = new Board();
testBoard.data = testData;

console.log(testBoard.isInRow('8', 0))