<template>
    <div ref="keyboard" :style="{}">
        <div style="position: absolute;bottom: 5%;left: 5%;user-select: none;">
            <h3>Pedal: {{isPedal}}</h3>
        </div>
        <transition-group name="list">
            <piano-key v-for="note in sharedKeyState.keyboard.getKeyboard()" :key="note" :note="note" @pressed="clickPressKey" @released="clickReleaseKey"></piano-key>
        </transition-group>
    </div>
</template>

<script>
import PianoKey from './PianoKey'   
import KeyStateStore from '../../stores/KeyStateStore'
import KeyBindingStore from '../../stores/KeyBindingStore'

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
            sharedKeyState: KeyStateStore.state,
            sharedBindingState: KeyBindingStore.state,
            isMounted: false,
            gainNodes: {},
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
    #keyboard {
        height: var(--piano-height);
        display: flex;
        flex-flow: row;
    }

    .list-enter-active,
    .list-leave-active {
        transition: all .8s cubic-bezier(0.19, 1, 0.22, 1);   
    }
    .list-enter-from,
    .list-leave-to {
        opacity: 0;
        transform: translateY(30px)scale(0)rotate(30deg);
    }
    .list-move {
        transition: transform .8s ease;
    }


</style>