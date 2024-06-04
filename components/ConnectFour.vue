<template>
  <div>
    <div class="container">
      <div class="player-container">
        <div v-if="playerOneTurn" class="turn">
          <SvgDownArrow />
        </div>
        <DraggableItem :disabled="!playerOneTurn">
          <div class=" token player-one"></div>
        </DraggableItem>
      </div>

      <Grid @token-placed="switchTurns" @player-win="showModalWin" />

      <div class="player-container">
        <div v-if="!playerOneTurn" class="turn">
          <SvgDownArrow />
        </div>
        <DraggableItem :disabled="playerOneTurn">
          <div class=" token player-two"></div>
        </DraggableItem>
      </div>
    </div>
    <ModalWin v-if="showWin" v-model="showWin" :player="player" @play-again="reset" />
  </div>
</template>

<script setup>
const showWin = ref(false)

const player = ref(null)

const playerOneTurn = ref(true)

const switchTurns = () => {
  playerOneTurn.value = !playerOneTurn.value
}

const showModalWin = ({ player: playerClass }) => {
  player.value = playerClass
  showWin.value = true
}

const reset = () => {
  reloadNuxtApp()
}
</script>

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
  text-align: center;
}

.turn {
  animation: MoveUpDown 1s linear 1;
  position: absolute;
  top: -2rem;

  margin-left: auto;
  margin-right: auto;
}

.turn:hover {
  animation: MoveUpDown 1s linear 1;
}

@keyframes MoveUpDown {

  0%,
  100% {
    top: -2rem;
  }

  50% {
    top: -3rem;
  }
}


.token {
  margin: .5rem .75rem;
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
