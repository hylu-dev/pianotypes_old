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
import PianoStateStore from '@/stores/PianoStateStore'
import KeyBindingStore from '@/stores/KeyBindingStore'

export default {
    name: 'piano-keyboard',
    created() {
        window.addEventListener('keydown', this.pressKey);
        window.addEventListener('keyup', this.releaseKey);
        window.addEventListener('blur', this.clearKeyStates);
    },
    beforeUnmount() {
        window.removeEventListener('keydown', this.pressKey);
        window.removeEventListener('keyup', this.releaseKey);
        window.removeEventListener('blur', this.clearKeyStates);
        this.clearKeyStates();
    },
    components: {
        PianoKey
    },
    data() {
        return {
            sharedKeyboard: PianoStateStore.state.keyboard,
            sharedBindings: KeyBindingStore.state.pianoBindings
        }
    },
    methods: {
        pressKey(e) {
            // override quickfind on firefox
            if ("'/".includes(e.key)) {
                e.preventDefault();
            }
            if (e.repeat) { return }
            let note = this.sharedBindings.getKeyNoteBinding(e.key);
            if (note) { this.sharedKeyboard.pressKey(note); }   
        },
        releaseKey(e) {
            if (e.repeat) { return }
            let note = this.sharedBindings.getKeyNoteBinding(e.key);
            if (note) { this.sharedKeyboard.releaseKey(note); }
        },
        clickPressKey(note) {
            if (note) { this.sharedKeyboard.pressKey(note); }  
        },
        clickReleaseKey(note) {
            if (note) { this.sharedKeyboard.releaseKey(note); }
        },
        clearKeyStates() {
            this.sharedKeyboard.init()
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
        flex-flow: row nowrap;
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