<template>
    <div class="pedal-container">
        <div class="icon-soft-pedal"></div>
        <div class="icon-sostenuto-pedal"></div>
        <div class="icon-sustain-pedal" :class="{ pressed: isSustain }" @click="downSustainPedal"></div>
    </div>
</template>

<script>
import PianoStateStore from '@/stores/PianoStateStore'

export default {
    created() {
        window.addEventListener('keydown', this.downSustainPedal),
        window.addEventListener('keyup', this.upSustainPedal)
    },
    beforeUnmount() {
        window.removeEventListener('keydown', this.downSustainPedal),
        window.removeEventListener('keyup', this.upSustainPedal)
    },
    name:"piano-pedal",
    data() {
        return {
            sharedKeyboard: PianoStateStore.state.keyboard
        }
    },
    methods: {
        downSustainPedal(e) {
            if (e.keyCode == 32) { 
                this.sharedKeyboard.pressSustainPedal();
            } else if (!e.keyCode) { //if not a keypress than it is a click
                this.sharedKeyboard.getSustainPedal() ? this.sharedKeyboard.liftSustainPedal() : this.sharedKeyboard.pressSustainPedal();
            }
        },
        upSustainPedal(e) {
            if (e.keyCode == 32) {
                this.sharedKeyboard.liftSustainPedal();
            }
        }
    },
    computed: {
        isSustain: function() {
            return this.sharedKeyboard.getSustainPedal();
        }
    }
}
</script>

<style>
    #piano-pedal {
        user-select: none;
    }

    .pedal-container {
        display: flex;
        justify-content: space-evenly;
        align-items: center;
        padding: 20%;
    }

    .icon-soft-pedal, .icon-sostenuto-pedal, .icon-sustain-pedal {
        font-size: 5rem;
        color: var(--tertiary-text-colour);
        transition: all .3s ease-in-out;
    }

    .icon-soft-pedal:hover, .icon-sostenuto-pedal:hover, .icon-sustain-pedal:hover {
        filter: brightness(1.5);
    }

    .pressed {
        color: var(--primary-text-colour);
    }
</style>