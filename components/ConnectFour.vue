<script lang="ts" setup>
import DraggableItem from './Draggable/DraggableItem.vue';

const drag = useDragNDrop();


</script>

<template>
  <div class="container">
    <div class="player-container">
      <div v-if="true" class="turn"> Your Turn </div>
      <DraggableItem>
        <div class=" token player-one"></div>
      </DraggableItem>
    </div>

    <Grid />

    <div class="player-container">
      <div v-if="false" class="turn"> Your Turn </div>
      <DraggableItem>
        <div class=" token player-two"></div>
      </DraggableItem>
    </div>
  </div>
</template>

<style scoped>
.container {
  margin: auto;
  width: 90%;
  height: 96vh;

  display: flex;
  flex-direction: row;
  justify-content: space-around;
  align-items: center;
}

.player-container {
  position: relative;
  display: flex;
  flex-direction: column;
  align-items: center;
}

.turn {
  position: absolute;
  top: -5rem;
  font-family: sans-serif;
  font-weight: 600;
  color: #D9D9D9;
  padding: 2rem;
}

.token {
  box-shadow: inset 0 0 10px rgba(0, 0, 0, 0.35);
  width: 95px;
  height: 95px;
  border-radius: 95px;
}

.player-one {
  background-color: #E03434;
}

.player-two {
  background-color: #E0CF34;
}
</style>
