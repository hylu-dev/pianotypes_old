<template>
    <div class="pedal-container">
        <div class="pedal-box">
            <div class="icon-soft-pedal"></div>
            <div class="icon-sostenuto-pedal"></div>
            <div class="icon-sustain-pedal" :class="{ pressed: isSustain }" @click="downSustainPedal"></div>
        </div>
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
            if (e.keyCode == 32 && !e.shiftKey) {
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
        justify-content: center;
        align-items: center;
        padding-bottom: 3rem;
        padding-top: 1rem;
    }

    .pedal-box {
        display: flex;  
        flex-flow: row;
        justify-content: center;
        align-items: flex-start;
        gap: 1vh;
        height: 2.5vw;
        border-radius: .3vw;
        box-sizing: border-box;
        background: var(--tertiary-bg-colour);
    }

    .icon-soft-pedal, .icon-sostenuto-pedal, .icon-sustain-pedal {
        font-size: min(5vw, 5rem);
        color: var(--tertiary-text-colour);
        transform: rotate3d(1, 0, 0, 45deg);
        transition: all .4s cubic-bezier(0.075, 0.82, 0.165, 1);
    }

    .icon-soft-pedal:hover, .icon-sostenuto-pedal:hover, .icon-sustain-pedal:hover {
        filter: brightness(1.3);
    }

    .pressed {
        color: var(--primary-text-colour);
        transform: rotate3d(1, 0, 0, 50deg);
    }
</style>