<template>
    <div class="flex-container">
    <form>
        <input type="text" id="min" v-model="this.minNote" maxlength="3">
        →
        <input type="text" id="max" v-model="this.maxNote" maxlength="3">
    </form>
    <form>
    <input type="text" id="max" v-model="this.noteBinding" maxlength="3">
    </form>
    </div>
</template>

<script>
import PianoStateStore from '@/stores/PianoStateStore'
import KeyBindingStore from '@/stores/KeyBindingStore'
import { Note } from "@tonaljs/tonal";

export default {
    created() {
        window.addEventListener('keydown', this.shiftBindings);
    },
    beforeUnmount() {
        window.removeEventListener('keydown', this.shiftBindings)
    },
    name: 'piano-controller',
    data() {
        return {
            sharedKeyboard: PianoStateStore.state.keyboard,
            sharedBindings: KeyBindingStore.state.pianoBindings
        }
    },
    methods: {
        shiftBindings(e) {
            let interval;
            e.shiftKey ? interval = "8P" : interval = "2M";

            if (e.keyCode == 37) {
                this.sharedKeyboard.init();
                this.sharedBindings.setBase(Note.transpose(this.sharedBindings.getBase(), "-"+interval))
            } else if (e.keyCode == 39) {
                this.sharedKeyboard.init();
                this.sharedBindings.setBase(Note.transpose(this.sharedBindings.getBase(), interval))
            }
        }
    },
    computed: {
        minNote: {
            set(minNote) {
                this.sharedKeyboard.setMin(minNote)
            },
            get() {
                return this.sharedKeyboard.getMin();
            }
        },
        maxNote: {
            set(maxNote) {
                this.sharedKeyboard.setMax(maxNote)
            },
            get() {
                return this.sharedKeyboard.getMax();
            }
        },
        noteBinding: {
            set(note) {
                this.sharedBindings.setBase(note);
            },
            get() {
                return this.sharedBindings.getBase();
            }
        }
    }
}

</script>

<style>
    .flex-container {
        display: flex;
        justify-content: center;
        user-select: none;
        flex-flow: column;
    }

    form {
        padding: 10px;
        display: flex;
        justify-content: center;
        flex-flow: row nowrap;
    }

    input[type=text] {
        width: 4ch;
        text-align: center;
        text-transform: uppercase;
    }
</style>