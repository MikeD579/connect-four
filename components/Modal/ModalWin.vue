<template>
    <div>
        <teleport to='#teleports'>
            <div class="modal-container">
                <div class="modal">
                    {{ playerWin }} Wins!

                    <button @click="playAgain">
                        Play Again
                    </button>
                </div>
            </div>
        </teleport>
    </div>
</template>

<script setup>
const emit = defineEmits(['play-again'])

const props = defineProps({
    player: String
})

const playerWin = computed(() => {
    return props.player === 'player-one'
        ? 'Player One'
        : 'Player Two'
})

const playAgain = () => {
    emit('play-again')
}
</script>

<style>
.modal-container {
    position: fixed;
    top: 0;
    left: 0;
    background-color: rgba(0, 0, 0, .5);
    height: 100vh;
    width: 100vw;

    display: flex;
    justify-content: center;
    align-items: center;
}

.modal {
    width: 25%;
    height: 25%;
    border-radius: 10px;
    background-color: #3C3E46;
    color: white;
    font-family: sans-serif;
    font-size: 2rem;

    display: flex;
    flex-direction: column;
    justify-content: space-around;
    align-items: center;
}

button {
    border: none;
    border-radius: 10px;
    padding: .5rem 1rem;
    font-size: 1rem;
}
</style>