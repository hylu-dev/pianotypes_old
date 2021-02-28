<template>
    <div class="keyboard">
        <piano-key v-for="(value, key) in sharedKeyStates.keyboard" :key="value" :note="key" :id="key" @pressed="clickPressKey" @released="clickReleaseKey"></piano-key>
    </div>

</template>

<script>
import PianoKey from './PianoKey'   
import KeyStatesStore from '../stores/KeyStatesStore'
import KeyBindingsStore from '../stores/KeyBindingsStore'

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
    props: [],
    data() {
        let ac = new AudioContext()
        return {
            ac: ac,
            instrument: require('soundfont-player').instrument(ac, 'acoustic_grand_piano', {
                soundfont: 'FluidR3_GM'
                }),
            isPedal: false,
            sharedKeyStates: KeyStatesStore.state,
            sharedBindingState: KeyBindingsStore.state
        }
    },
    methods: {
        pressKey(e) {
            if (e.repeat) { return }
            let note = KeyBindingsStore.getKeyNoteBinding(e.key);
            if (note) {
                this.instrument.then(function (instr) { instr.play(note, 0, 1); });
                KeyStatesStore.updateKeyPressed(note);
            }
        },
        releaseKey(e) {
            if (e.repeat) { return }
            let note = KeyBindingsStore.getKeyNoteBinding(e.key);
            if (note) {
                this.instrument.then(function (instr) { instr.stop(); })
                KeyStatesStore.updateKeyReleased(note);
            }
        },
        clickPressKey(note) {
            if (note) {
                this.instrument.then(function (instr) { instr.play(note, 0, 1); });
                KeyStatesStore.updateKeyPressed(note);
            }
        },
        clickReleaseKey(note) {
            if (note) {
                this.instrument.then(function (instr) { instr.stop(); })
                KeyStatesStore.updateKeyReleased(note);
            }
        },
        clearKeyStates() {
            KeyStatesStore.resetKeyStates();
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