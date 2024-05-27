<template>
    <div class="board">
        <div v-for="colIndex in 7" class="holes-col" @mouseenter="setDraggingOverCol(colIndex)"
            @mouseleave="resetDraggingOverCol" @mouseup="addItem(colIndex)">
            <div v-for="holeIndex in 6">
                <GridItem :key="holeIndex">
                    <!-- <div v-if="holeIndex === 3 && colIndex === 3 && "> hello</div> -->
                </GridItem>
            </div>
        </div>
    </div>
</template>

<script setup>
const drag = useDragNDrop();

const showingItems = ref([])

const setDraggingOverCol = (index) => {
    if (!drag.value.isDragging) return;
    drag.value.draggingOverColumn = index;
}
const resetDraggingOverCol = () => {
    if (!drag.value.isDragging) return;
    drag.value.draggingOverColumn = null;
}
const addItem = (index) => {
    if (!drag.value.isDragging ||
        !drag.value.draggedData ||
        drag.value.draggingOverColumn !== index
    ) return;

    console.log('drag', drag.value.draggedData)

    showingItems.value.push(drag.value.draggedData)
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