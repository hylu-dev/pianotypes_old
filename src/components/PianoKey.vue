<template>
    <div :class="getKeyClasses"  @mouseover="isHover=true" @mouseout="isHover=false" @mouseenter="emitKeyPress" @mousedown="emitKeyPress" @mouseup="emitKeyRelease" @mouseleave="emitKeyRelease">
        <h1 v-if="showBindings">{{ binding }}</h1>
    </div>
</template>

<script>
import KeyStatesStore from '../stores/KeyStatesStore'
import KeyBindingsStore from '../stores/KeyBindingsStore'

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
            sharedKeyStates: KeyStatesStore.state,
            sharedBindingState: KeyBindingsStore.state
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
        getKeyClasses() {
            let classBinding = {}
            let regex = /[cCdDfFgGaA#]/g;
            this.note.search(regex) >= 0 ? classBinding["offset-key"] = true : classBinding["offset-key"] = false; // offset margin if key precedes|is a black key
            // add styles depending on key colour
            if (this.note.includes('#')) {
                classBinding['black-key'] = true;
                classBinding['black-key--hover'] = this.isHover;
                classBinding['black-key--pressed'] = this.isPressed;
            } else {
                classBinding['white-key'] = true;
                classBinding['white-key--hover'] = this.isHover;
                classBinding['white-key--pressed'] = this.isPressed;
            }
            return classBinding
        },
        isPressed: function() {
            if (this.sharedKeyStates.keyboard[this.note].isPressed) {
                return true;
            }
            return false;
        },
        binding: function() {
            return KeyBindingsStore.getNoteKeyBinding(this.note);
        }
    }
}
</script>

<style scoped>
    .offset-key {
        margin-right: calc(var(--black-key-width)/-2);
    }

    .white-key {
        display: flex;
        justify-content: center;
        width: var(--white-key-width);
        border-left: var(--white-key-border-width) solid transparent;
        border-right: var(--white-key-border-width) solid transparent;
        background: var(--white-key-colour);
        background-clip: padding-box;
        z-index: 0;
    }

    .white-key h1 {
        color: rgba(0, 0, 0, 0.2);
        align-self: flex-end;
        user-select: none;
        font-size: var(--key-label-size);
        font-family: Lato, Helvetica, Arial, sans-serif;
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
        display: flex;
        justify-content: center;
        width: var(--black-key-width);
        height: 50%;
        background: var(--black-key-colour);
        z-index: 1;
    }

    .black-key h1 {
        color: rgba(255, 255, 255, 0.3);
        align-self: flex-end;
        user-select: none;
        font-size: var(--key-label-size);
        font-family: Lato, Helvetica, Arial, sans-serif;
    }

    .black-key--hover {
        background: var(--black-key-hover-colour);
    }

    .black-key--pressed {
        background: var(--black-key-active-colour);
    }
</style>