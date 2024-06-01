<template>
    <div class="board">
        <div v-for="e, colIndex in 7" class="holes-col" ref='columns' @mouseenter="enterDraggingOverCol(colIndex)"
            @mouseleave="leaveDraggingOverCol(colIndex)" @mouseup="addItem(colIndex)">
            <div v-for="e, holeIndex in 6" ref="holes">
                <GridItem :key="holeIndex" />
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

.holes-col:hover {
    border-color: red;

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