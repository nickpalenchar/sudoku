/** Functions related to updating board UI **/

function hint(board) {
    [y, x, answer] = board.giveHint();
    fillCell(y, x, answer);
    board.updateFromUI();
}