<script lang="ts" setup></script>

<template>
  <div class="container">
    <div class=" token player-one"></div>

    <div class="board">
      <div v-for="i in 42" class="holes"></div>
    </div>

    <div class=" token player-two"></div>
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

.board {
  display: flex;
  flex-wrap: wrap;
  gap: 34px;
  row-gap: 30px;
  justify-content: center;
  align-items: center;
  padding: 24px 0;

  background-color: #D9D9D9;
  border-radius: 10px;
  width: 938px;
  max-height: 788px;

  box-shadow: 0 8px 10px rgba(0, 0, 0, 0.35);
}

.holes {
  background-color: #3C3E46;
  width: 95px;
  height: 95px;
  border-radius: 95px;
  clip-path: circle(50%);
  box-shadow: inset 0 -4px 10px rgba(0, 0, 0, 0.35);
}
</style>
