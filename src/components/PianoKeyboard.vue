<template>
    <div class="keyboard">
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
        window.addEventListener('blur', this.clearKeyStates)
    },
    components: {
        PianoKey
    },
    data() {
        let ac = new AudioContext()
        return {
            ac: ac,
            instrument: require('soundfont-player').instrument(ac, 'acoustic_grand_piano', {
                soundfont: 'FluidR3_GM'
                }),
            isPedal: false,
            sharedKeyState: KeyStateStore.state,
            sharedBindingState: KeyBindingStore.state
        }
    },
    methods: {
        pressKey(e) {
            if (e.repeat) { return }
            let note = KeyBindingStore.getKeyNoteBinding(e.key);
            if (note) {
                this.instrument.then(function (instr) { instr.play(note, 0, 1); });
                KeyStateStore.updateKeyPressed(note);
            }
        },
        releaseKey(e) {
            if (e.repeat) { return }
            let note = KeyBindingStore.getKeyNoteBinding(e.key);
            if (note) {
                this.instrument.then(function (instr) { instr.stop(); })
                KeyStateStore.updateKeyReleased(note);
            }
        },
        clickPressKey(note) {
            if (note) {
                this.instrument.then(function (instr) { instr.play(note, 0, 1); });
                KeyStateStore.updateKeyPressed(note);
            }
        },
        clickReleaseKey(note) {
            if (note) {
                this.instrument.then(function (instr) { instr.stop(); })
                KeyStateStore.updateKeyReleased(note);
            }
        },
        clearKeyStates() {
            KeyStateStore.resetKeyStates();
        }
    },
    computed: {}
}
</script>

<style scoped>
    .keyboard {
        height: var(--piano-height);
        display: flex;
        flex-flow: row;
    }
</style>