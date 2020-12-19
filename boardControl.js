/** Functions related to updating board UI **/

function handleInput(event) {
    event.preventDefault();
    const val = event.key;
    if (!/[1-9\s]/.test(event.key)) {
        return
    }
    const [y, x] = event.target.id.split('-')
    const cell = fillCell(y, x, event.key);
    cell.blur();
}

function hint(board) {
    [y, x, answer] = board.giveHint();
    fillCell(y, x, answer);
    board.updateFromUI();
}