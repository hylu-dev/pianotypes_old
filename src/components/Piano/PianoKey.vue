<template>
    <div :class="getKeyClasses"  @mouseover="isHover=true" @mouseout="isHover=false" @mouseenter="emitKeyPress" @mousedown="emitKeyPress" @mouseup="emitKeyRelease" @mouseleave="emitKeyRelease">
        <h1 v-if="showBindings">{{ binding }}</h1>
    </div>
</template>

<script>
import PianoStateStore from '@/stores/PianoStateStore'
import KeyBindingStore from '@/stores/KeyBindingStore'
import { Note } from "@tonaljs/tonal"

export default {
    name: 'piano-key',
    emits: ['pressed', 'released'],
    props: {
        note: String
    },
    data() { 
        return {
            isHover: false,
            showBindings: true,
            sharedKeyboard: PianoStateStore.state.keyboard,
            sharedBindings: KeyBindingStore.state.keybindings
        }
    },
    methods: {
        emitKeyPress(e) {
            if (e.buttons > 0) {
                this.$emit('pressed', this.note);
            }
        },
        emitKeyRelease(e) {
            if (e.type == "mouseup" || e.buttons > 0) {
                this.$emit('released', this.note);
            }
        }
    },
    computed: {
        isWhiteKey: function() {
            return Note.accidentals(this.note) ? false : true;
        },
        getKeyClasses() {
            let classBinding = {};
            classBinding["offset-key"] = Note.accidentals(Note.transpose(this.note, "2m")) ? true : false; // offset margin if key precedes a black key
            // add styles depending on key colour
            if (this.isWhiteKey) {
                classBinding['white-key'] = true;
                classBinding['white-key--hover'] = this.isHover;
                classBinding['white-key--pressed'] = this.isPressed;
            } else {
                classBinding['black-key'] = true;
                classBinding['black-key--hover'] = this.isHover;
                classBinding['black-key--pressed'] = this.isPressed;
            }
            return classBinding;
        },
        isPressed: function() {
            if (this.sharedKeyboard.getIsPressed(this.note)) {
                return true;
            }
            return false;
        },
        binding: function() {
            return KeyBindingStore.getNoteKeyBinding(this.note);
        }
    }
}
</script>

<style scoped>
    #piano-key {
        display: flex;
        justify-content: center;
    }

    .offset-key {
        margin-right: calc(var(--black-key-width)/-2);
    }

    .white-key {
        width: var(--white-key-width);
        border-left: var(--white-key-border-width) solid transparent;
        border-right: var(--white-key-border-width) solid transparent;
        background: var(--white-key-colour);
        background-clip: padding-box;
        z-index: 2;
    }

    .white-key h1 {
        color: rgba(0, 0, 0, 0.2);
        align-self: flex-end;
        user-select: none;
        font-size: var(--key-label-size);
        font-family: var(--key-label-font-family);
        font-weight: var(--key-label-font-weight);
    }

    .white-key--hover {
        background: var(--white-key-hover-colour);
        background-clip: padding-box;
    }

    .white-key--pressed {
        background: var(--white-key-active-colour);
        background-clip: padding-box;
    }

    .black-key {
        min-width: var(--black-key-width);
        height: 50%;
        background: var(--black-key-colour);
        z-index: 3;
        box-shadow: 0px 1px 3px rgba(0,0,0,0.5);
    }

    .black-key h1 {
        color: rgba(255, 255, 255, 0.3);
        user-select: none;
        align-self: flex-end;
        font-size: var(--key-label-size);
        font-family: var(--key-label-font-family);
        font-weight: var(--key-label-font-weight);
    }

    .black-key--hover {
        background: var(--black-key-hover-colour);
    }

    .black-key--pressed {
        background: var(--black-key-active-colour);
    }
</style>