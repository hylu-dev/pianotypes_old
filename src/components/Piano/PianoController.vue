<template>
    <div class="flex-container">
        <div class="input-container">
            <input type="text" id="min" v-model="this.minNote" maxlength="3" @keypress.enter="$event.target.blur()">
            ›
            <input type="text" id="max" v-model="this.maxNote" maxlength="3" @keypress.enter="$event.target.blur()">
        </div>
        <div class="input-container">
            <div class="temp" :class="{temp__active: isNormalMode}" @click="setNormalMode"></div>
            <input type="text" id="max" v-model="this.noteBinding" maxlength="3" @keypress.enter="$event.target.blur()">
            <div class="temp" :class="{temp__active: isSplitMode}" @click="setSplitMode"></div>
        </div> 
    </div>
</template>

<script>
import PianoStateStore from '@/stores/PianoStateStore'
import KeyBindingStore from '@/stores/KeyBindingStore'
import { Note } from "@tonaljs/tonal";

export default {
    created() {
        window.addEventListener('keydown', this.controller);
    },
    beforeUnmount() {
        window.removeEventListener('keydown', this.controller)
    },
    name: 'piano-controller',
    data() {
        return {
            sharedKeyboard: PianoStateStore.state.keyboard,
            sharedBindings: KeyBindingStore.state.pianoBindings
        }
    },
    methods: {
        controller(e) {
            let interval;
            e.shiftKey ? interval = "8P" : interval = "2m";
            if (e.keyCode == 37) {
                this.sharedKeyboard.init();
                this.sharedBindings.setBase(Note.transpose(this.sharedBindings.getBase(), "-"+interval))
            } else if (e.keyCode == 39) {
                this.sharedKeyboard.init();
                this.sharedBindings.setBase(Note.transpose(this.sharedBindings.getBase(), interval))
            } else if (e.keyCode == 38) {
                this.sharedKeyboard.init();
                this.sharedKeyboard.setMax(Note.transpose(this.sharedKeyboard.getMax(), interval))
                this.sharedKeyboard.setMin(Note.transpose(this.sharedKeyboard.getMin(), "-"+interval))
            } else if (e.keyCode == 40) {
                this.sharedKeyboard.init();
                this.sharedKeyboard.setMax(Note.transpose(this.sharedKeyboard.getMax(), "-"+interval))
                this.sharedKeyboard.setMin(Note.transpose(this.sharedKeyboard.getMin(), interval))
            }
        },
        setNormalMode(e) {
            console.log(e);
            this.sharedBindings.setMode(1);
        },
        setSplitMode(e) {
            console.log(e);
            this.sharedBindings.setMode(2);
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
        },
        isNormalMode: function() {
            return this.sharedBindings.getMode() == 1 ? true : false;
        },
        isSplitMode: function() {
            return this.sharedBindings.getMode() == 2 ? true : false;
        }
    }
}

</script>

<style>
    .flex-container {
        display: flex;
        justify-content: center;
        flex-flow: column;
        user-select: none;
    }

    .input-container {
        display: flex;
        justify-content: center;
        align-items: center;
        flex-flow: row;
        padding: .5vw;
        gap: 1vw;
        font-size: 2vw;
    }

    input[type=text] {
        width: 4ch;
        height: 2ch;
        font-size: 1vw;
        text-align: center;
        font-weight: 600;
    }

    .temp {
        width: 2ch;
        height: 1ch;
        border-radius: 5px;
        background: var(--secondary-text-colour);
        transition: all .4s cubic-bezier(0.075, 0.82, 0.165, 1);
    }
    .temp:hover {
        filter: brightness(0.8);

    }
    .temp__active {
        background: var(--primary-text-colour);
        box-shadow: inset 0 0 3px black;
        filter: brightness(0.8);
    }
</style>