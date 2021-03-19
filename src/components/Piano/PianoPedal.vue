<template>
    <div>
        <h3>Pedal:</h3>
        <h3>{{ sharedKeyboard.getPedal() }}</h3>
    </div>
</template>

<script>
import PianoStateStore from '@/stores/PianoStateStore'

export default {
    created() {
        window.addEventListener('keydown', this.downPedal),
        window.addEventListener('keyup', this.upPedal)
    },
    beforeUnmount() {
        window.removeEventListener('keydown', this.downPedal),
        window.removeEventListener('keyup', this.upPedal)
    },
    name:"piano-pedal",
    data() {
        return {
            sharedKeyboard: PianoStateStore.state.keyboard
        }
    },
    methods: {
        downPedal(e) {
            if (e.key == ' ') { 
                this.sharedKeyboard.pressPedal();
            }
        },
        upPedal(e) {
            if (e.key == ' ') {
                this.sharedKeyboard.liftPedal();
            }
        }
    }
}
</script>

<style>
    #piano-pedal {
        user-select: none;
        display: flex;
        justify-content: center;
        flex-flow: column nowrap;
    }

    #piano-pedal h3 {
        text-align: center;
        line-height: 0;
    }
</style>