<template>
    <div class="board">
        <div v-for="e, colIndex in 7" class="holes-col" ref='columns' @mouseenter="enterDraggingOverCol(colIndex)"
            @mouseleave="leaveDraggingOverCol(colIndex)" @mouseup="addItem(colIndex)">
            <div v-for="e, holeIndex in 6" ref="holes">
                <GridItem :key="`${colIndex}${holeIndex}`" :id="`${colIndex}${holeIndex}`" />
            </div>
        </div>
    </div>
</template>

<script setup>
const drag = useDragNDrop();
const columns = ref(null);

// event listener callbacks
const enterDraggingOverCol = (index) => {
    if (!drag.value.isDragging || drag.value.draggingOverColumn !== null) return;
    drag.value.draggingOverColumn = index;

    if (drag.value.draggedData && columns.value) {
        const bottomHole = getOpenHoleForCol(index)
        if (!bottomHole) {
            drag.value.draggingOverColumn = null
            return
        }

        drag.value.previousData = bottomHole

        const token = drag.value.draggedData.cloneNode(true)
        token.id = bottomHole.firstChild.id

        bottomHole.replaceWith(token)
    }
}
const leaveDraggingOverCol = (index) => {
    if (!drag.value.isDragging || drag.value.draggingOverColumn === null) return;


    if (drag.value.draggedData && columns.value) {
        const bottomHole = getTakenHoleForCol(drag.value.draggingOverColumn)
        if (!bottomHole) return
        bottomHole.replaceWith(drag.value.previousData)
    }

    drag.value.draggingOverColumn = null;
}
const addItem = (index) => {
    if (!drag.value.isDragging ||
        !drag.value.draggedData ||
        drag.value.draggingOverColumn !== index ||
        !columns.value
    ) return;

    const bottomHole = getTakenHoleForCol(index)
    drag.value.draggingOverColumn = null
    if (!bottomHole) return

    bottomHole.style.opacity = 1
    if (checkWin(bottomHole)) {
        const player = bottomHole.firstElementChild.className.split(' ')[1]
        console.log(player, 'you win!')
    }
}

// methods
const getOpenHoleForCol = (colIndex) => {
    const columnChildren = columns.value[colIndex].children

    const holes = [...columnChildren]
    if (holes[0].className === 'draggable-item') return null

    const reverseHoles = holes.reverse()
    for (const hole of reverseHoles) {
        if (hole.className !== 'draggable-item') {
            return hole
        }
    }

    return -1
}
const getTakenHoleForCol = (colIndex) => {
    const columnChildren = columns.value[colIndex].children
    const holes = [...columnChildren]

    if (holes[0].style.opacity === '0.5') return holes[0]

    if (holes[0].className === 'draggable-item') return null

    for (const hole of holes) {
        if (hole.className === 'draggable-item') {
            return hole
        }
    }

}

// check if player won the game
const checkWin = (hole) => {
    const col = parseInt(hole.id[0])
    const row = parseInt(hole.id[1])
    const player = hole.firstElementChild.className.split(' ')[1]

    //check vertical
    if (hasWonVertically(player, col, row)) {
        return true
    }
    //check horizontal
    if (hasWonHorizontally(player, col, row)) {
        return true
    }

    //check diagnal
    if (hasWonDiagonally(player, col, row)) {
        return true
    }

    return false
}
const hasWonVertically = (player, col, row) => {
    // dont check up ; there will never be one above
    // check down
    if (countTokens(player, col, row, 1, true) === 3) {
        return true
    }

    return false
}
const hasWonHorizontally = (player, col, row) => {
    const leftTokens = countTokens(player, col, row, -1)
    const rightTokens = countTokens(player, col, row, 1)

    if (leftTokens + rightTokens === 3) {
        return true
    }

    return false
}
const hasWonDiagonally = (player, col, row) => {
    const positiveLTRCount = countDiagonalTokens(player, col, row, 1)
    const positiveRTLCount = countDiagonalTokens(player, col, row, -1)

    if (positiveLTRCount + positiveRTLCount === 3) return true

    const negativeLTRCount = countDiagonalTokens(player, col, row, 1, -1)
    const negativeRTLCount = countDiagonalTokens(player, col, row, -1, -1)

    if (negativeLTRCount + negativeRTLCount === 3) return true
}

// Recursive helper function
const countTokens = (player, col, row, direction, useRow = false, count = 0) => {
    // direction is either +1 or -1
    // if useRow is true, then column will be constant
    let nextCol = col + direction
    let nextRow = row
    let nextIndex = addIndex(col, row, direction, 0)

    if (useRow) {
        nextCol = col
        nextRow = row + direction
        nextIndex = addIndex(col, row, 0, direction)
    }

    if (!nextIndex) return count

    const nextToken = document.getElementById(nextIndex)?.firstElementChild?.className
    if (!nextToken.includes(player)) {
        return count
    }

    return countTokens(player, nextCol, nextRow, direction, useRow, count + 1)

}
const countDiagonalTokens = (player, col, row, direction, slope = 1, count = 0) => {
    // direction is either +1 or -1
    // multiply row times slop
    const nextCol = col + direction
    const nextRow = row + (direction * slope)
    const nextIndex = addIndex(col, row, direction, (direction * slope))

    if (!nextIndex) return count

    const nextToken = document.getElementById(nextIndex)?.firstElementChild?.className
    if (!nextToken.includes(player)) {
        return count
    }

    return countDiagonalTokens(player, nextCol, nextRow, direction, slope, count + 1)
}
const addIndex = (col, row, addColBy, addRowBy) => {
    col += addColBy
    row += addRowBy

    if (col < 0 || col > 6 || row < 0 || row > 5) {
        return null;
    }

    return `${col}${row}`
}
</script>

<style>
.board {
    /* 6 holes 95px and spacing top and bottom .5rem */
    height: calc(6*95px + 12*.5rem);

    display: flex;
    justify-content: center;
    align-items: center;
    padding: .75rem;

    background-color: #D9D9D9;
    border-radius: 10px;

    box-shadow: 0 8px 10px rgba(0, 0, 0, 0.35);
}

.holes-col {
    display: flex;
    flex-direction: column;
    justify-content: center;
    height: 90vh;

    border: solid;
    border-color: rgba(0, 0, 0, 0);

}

.holes {
    margin: .5rem .75rem;
    background-color: #3C3E46;
    width: 95px;
    height: 95px;
    border-radius: 95px;
    clip-path: circle(50%);
    box-shadow: inset 0 -4px 10px rgba(0, 0, 0, 0.35);
}
</style>