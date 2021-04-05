<template>
    <div class="flex-col-container">
        <div class="flex-row-container">
            <select v-model="this.selectedInstrument" @keypress="$event.target.blur()">
                <option v-for="instr in instruments" :key="instr">{{ instr }}</option>
            </select>
        </div>
        <div class="flex-row-container">
            <input type="text" id="min" v-model="this.minNote" maxlength="3" @keypress.enter="$event.target.blur()">
            ›
            <input type="text" id="max" v-model="this.maxNote" maxlength="3" @keypress.enter="$event.target.blur()">
        </div>
        <div class="flex-row-container">
            <!-- <input type="text" id="max" v-model="this.noteBinding" maxlength="3" @keypress.enter="$event.target.blur()"> -->
            <div class="icon-keyboard-invert" :class="{'icon--active': isNormalMode}" @click="setNormalMode"></div>
            <div class="icon-split-keyboard-invert" :class="{'icon--active': isSplitMode}" @click="setSplitMode"></div>
        </div> 
    </div>
</template>

<script>
import PianoStateStore from '@/stores/PianoStateStore'
import KeyBindingStore from '@/stores/KeyBindingStore'
import { Note } from "@tonaljs/tonal";
import instrumentsJSON from "@/json/musyngkite.json"

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
            sharedBindings: KeyBindingStore.state.pianoBindings,
            instruments: instrumentsJSON
        }
    },
    methods: {
        controller(e) {
            let interval;
            e.shiftKey ? interval = "8P" : interval = "2m";
            if (e.keyCode == 37) {
                this.sharedKeyboard.updateKeyboard();
                this.sharedBindings.setBase(Note.transpose(this.sharedBindings.getBase(), "-"+interval))
            } else if (e.keyCode == 39) {
                this.sharedKeyboard.updateKeyboard();
                this.sharedBindings.setBase(Note.transpose(this.sharedBindings.getBase(), interval))
            } else if (e.keyCode == 38) {
                this.sharedKeyboard.updateKeyboard();
                this.sharedKeyboard.setMax(Note.transpose(this.sharedKeyboard.getMax(), interval))
                this.sharedKeyboard.setMin(Note.transpose(this.sharedKeyboard.getMin(), "-"+interval))
            } else if (e.keyCode == 40) {
                this.sharedKeyboard.updateKeyboard();
                this.sharedKeyboard.setMax(Note.transpose(this.sharedKeyboard.getMax(), "-"+interval))
                this.sharedKeyboard.setMin(Note.transpose(this.sharedKeyboard.getMin(), interval))
            }
        },
        setNormalMode() {
            this.sharedBindings.setMode(1);
        },
        setSplitMode() {
            this.sharedBindings.setMode(2);
        }
    },
    computed: {
        selectedInstrument: {
            set(instrument) {
                this.sharedKeyboard.setInstrument(instrument)
            },
            get() {
                return this.sharedKeyboard.getInstrument();
            }
        },
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
    .flex-col-container {
        display: flex;
        justify-content: center;
        flex-flow: column;
        user-select: none;
        padding: 1rem;
        gap: 1ch;
    }

    .flex-row-container {
        display: flex;
        justify-content: space-evenly;
        align-items: center;
        flex-flow: row;
        font-size: 2vw;
        border: none;
        gap: 1vw;
    }

    input[type=text] {
        width: 4ch;
        height: 2ch;
        font-size: 1vw;
        text-align: center;
        font-weight: 600;
    }

    select {
        font-size: clamp(1vw, 1rem);
        width: 95%;
    }

    .icon-keyboard-invert, .icon-split-keyboard-invert {
        font-size: 2vw;
        color: var(--secondary-text-colour);
        transition: all .3s cubic-bezier(0.075, 0.82, 0.165, 1);
    }

    .icon-keyboard-invert:hover, .icon-split-keyboard-invert:hover {
        filter: brightness(1.1);
        transform: scale(1.1);
    }

    .icon--active {
        color: var(--primary-text-colour);
    }
</style>