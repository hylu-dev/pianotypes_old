<template>
    <div style="position: absolute; bottom: 5%;left: 5%;">
        <p>Pedal On: {{isPedal}}</p>
    </div>
    <div ref="keyboard" class="keyboard" :style="{}">
        <piano-key v-for="(value, key) in sharedKeyState.keyStates" :key="value" :note="key" :id="key" @pressed="clickPressKey" @released="clickReleaseKey"></piano-key>
    </div>
</template>

<script>
import PianoKey from './PianoKey'   
import KeyStateStore from '../stores/KeyStateStore'
import KeyBindingStore from '../stores/KeyBindingStore'

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
    components: {
        PianoKey
    },
    data() {
        return {
            instrument: require('soundfont-player').instrument(new AudioContext(), 'acoustic_grand_piano', {
                soundfont: 'FluidR3_GM'
                }),
            isPedal: false,
            sharedKeyState: KeyStateStore.state,
            sharedBindingState: KeyBindingStore.state,
            isMounted: false,
            gainNodes: {}
        }
    },
    methods: {
        pressKey(e) {
            if (e.repeat) { return }
            let note = KeyBindingStore.getKeyNoteBinding(e.key);
            if (note) {
                this.instrument.then((instr) => { this.gainNodes[note] = instr.play(note, 0, 1); });
                KeyStateStore.updateKeyPressed(note);
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
            if (e.key == ' ') { this.isPedal = true; }
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
    .keyboard {
        height: var(--piano-height);
        display: flex;
        flex-flow: row;
    }
</style>