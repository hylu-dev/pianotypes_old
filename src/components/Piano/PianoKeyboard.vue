<template>
    <div ref="keyboard" :style="{}">
        <div class="key-container">
            <transition-group name="list">
                <piano-key id="piano-key" v-for="note in sharedKeyboard.getKeyboard()" :key="note" :note="note" @pressed="clickPressKey" @released="clickReleaseKey"></piano-key>
            </transition-group>
        </div>
    </div>
</template>

<script>
import PianoKey from './PianoKey'   
import KeyStateStore from '@/stores/KeyStateStore'
import KeyBindingStore from '@/stores/KeyBindingStore'

export default {
    name: 'piano-keyboard',
    created() {
        window.addEventListener('keydown', this.pressKey),
        window.addEventListener('keyup', this.releaseKey),
        window.addEventListener('keydown', this.downPedal),
        window.addEventListener('keyup', this.upPedal),
        window.addEventListener('blur', this.clearKeyStates)
    },
    mounted() {
        this.isMounted = true
    },
    beforeUnmount() {
        window.removeEventListener('keydown', this.pressKey),
        window.removeEventListener('keyup', this.releaseKey),
        window.removeEventListener('keydown', this.downPedal),
        window.removeEventListener('keyup', this.upPedal),
        window.removeEventListener('blur', this.clearKeyStates)
        this.clearKeyStates();
    },
    components: {
        PianoKey
    },
    data() {
        return {
            instrument: require('soundfont-player').instrument(new AudioContext(), 'acoustic_grand_piano', {
                soundfont: 'MusyngKite',
                gain: 2
                }),
            isPedal: false,
            sharedKeyboard: KeyStateStore.state.keyboard,
            isMounted: false,
            gainNodes: {}
        }
    },
    methods: {
        pressKey(e) {
            if (e.repeat) { return }
            let note = KeyBindingStore.getKeyNoteBinding(e.key);
            if (KeyStateStore.updateKeyPressed(note)) {
                if (this.gainNodes[note]) { this.gainNodes[note].stop(); }
                this.instrument.then((instr) => { this.gainNodes[note] = instr.play(note, 0, 1); });
            }        
        },
        releaseKey(e) {
            if (e.repeat) { return }
            let note = KeyBindingStore.getKeyNoteBinding(e.key);
            if (note) {
                this.instrument.then(() => { if (!this.isPedal && this.gainNodes[note]) { this.gainNodes[note].stop(); delete this.gainNodes[note]; } })
                KeyStateStore.updateKeyReleased(note);
            }
        },
        clickPressKey(note) {
            if (note) {
                if (this.gainNodes[note]) { this.gainNodes[note].stop(); }
                this.instrument.then((instr) => { this.gainNodes[note] = instr.play(note, 0, 1); });
                KeyStateStore.updateKeyPressed(note);
            }
        },
        clickReleaseKey(note) {
            if (note) {
                this.instrument.then(() => { if (!this.isPedal && this.gainNodes[note]) { this.gainNodes[note].stop(); delete this.gainNodes[note]; } })
                KeyStateStore.updateKeyReleased(note);
            }
        },
        downPedal(e) {
            if (e.key == ' ') { 
                this.isPedal = true;
            }
        },
        upPedal(e) {
            if (e.key == ' ') {
                this.isPedal = false;
                for (let note in this.gainNodes) {
                    if (KeyStateStore.getKeyPressedState(note) == false) {
                        this.gainNodes[note].stop();
                        delete this.gainNodes[note];
                    }
                }
            }
        },
        clearKeyStates() {
            KeyStateStore.resetKeyStates();
            this.gainNodes = {};
            this.instrument.then( (instr) => instr.stop());
            this.isPedal = false;
        }
    },
    computed: {
        proportionalHeight: function() {
            return this.isMounted ? this.$refs.keyboard.clientWidth/5.5 : 0;
        }
    }
}
</script>

<style scoped>
    #piano-keyboard {
        display: flex;
        justify-content: center;
        align-items: center;
    }

    .key-container {
        width: 100%;
        height: 100%;
        display: flex;
        justify-content: center;
        flex-flow: row;
    }

    .list-enter-active,
    .list-leave-active {
        transition: all .8s cubic-bezier(0.19, 1, 0.22, 1);   
    }
    .list-enter-from,
    .list-leave-to {
        opacity: 0;
        transform: translateY(30px)scale(0)rotate(45deg);
    }
    .list-move {
        transition: transform .8s ease;
    }


</style>