const ACTIVE_CELL_CLS = 'activeCell'

window.BoardUI = {
    makeActive: (event) => {
        /* Adds the ACTIVE_CELL_CLS to an element, and removing it from other elements which may currently
        hold it. In this way, the ACTIVE_CELL_CLS can only ever be on one cell at a time.
         */
        console.log(event.target)
        let cell = event.target.classList.contains('cell') ? event.target : event.target.parentElement;
        console.log('cell is ', cell);
        this._activeElement?.classList.remove(ACTIVE_CELL_CLS);
        cell.classList.add(ACTIVE_CELL_CLS);
        this._activeElement = cell;

    },

    _activeElement: null
}