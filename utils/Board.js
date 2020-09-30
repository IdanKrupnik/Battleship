function getMatrix(rows, cols, initValue) {
    let matrix = new Array(rows);
    for (let i = 0; i < rows; i++) {
        matrix.push(new Array(cols).fill(initValue));
    }

    return matrix;
}

module.exports = class Board {
    constructor(name, rowLength, colLength) {
        this.name = name;
        this.rowLength = rowLength;
        this.colLength = colLength;
        this.boardMatrix = getMatrix(this.rowLength, this.colLength, 0);
    }
}