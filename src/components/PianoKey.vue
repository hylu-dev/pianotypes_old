<template>
    <div :class="applyKeyStyles"  @mouseover="isHover=true" @mouseout="isHover=false" @mouseenter="emitClickDown($event)" @mousedown="emitClickDown($event)" @mouseup="emitClickRelease($event)" @mouseleave="emitClickRelease($event)">
        <h1 v-if="showBindings">{{keyConfig.binding}}</h1>
    </div>
</template>

<script>
export default {
    name: 'piano-key',
    created() {
        window.addEventListener('keydown', this.emitKeyDown),
        window.addEventListener('keyup', this.emitKeyRelease),
        window.addEventListener('blur', this.clearKeyStates)
    },
    emits: ['pressed', 'released'],
    props: {
        keyConfig: {
            type: Object,
            required: true
        }
    },
    data() { 
        return {
            isPressed: false,
            isHover: false,
            showBindings: true
        }
    },
    methods: {
        emitClickDown(e) {
            if (e.buttons > 0) {
                this.$emit('pressed', { note: this.keyConfig.note, binding: this.keyConfig.binding, e: e });
                this.isPressed = true;
            }
        },
        emitClickRelease(e) {
            if (e.type == "mouseup" || e.buttons > 0) {
                this.$emit('released');
                this.isPressed = false;
            }
        },
        emitKeyDown(e) {
            if (e.repeat) { return } // Disable automatic keypress when key is held
            if (this.keyConfig.binding.includes(e.key.toLowerCase())) {
                this.$emit('pressed', { note: this.keyConfig.note, binding: this.keyConfig.binding, e: e });
                this.isPressed = true;
            }

        },
        emitKeyRelease(e) {
            if (this.keyConfig.binding.includes(e.key.toLowerCase())) {
                this.$emit('released');
                this.isPressed = false;
            }
        },
        clearKeyStates() {
            this.$emit('released');
            this.isPressed = false;
        }
    },
    computed: {
        applyKeyStyles() {
            let classBinding = {}
            let regex = /[cCdDfFgGaA#]/g;
            this.keyConfig.note.search(regex) >= 0 ? classBinding["offset-key"] = true : classBinding["offset-key"] = false; // offset margin if key precedes|is a black key
            // add styles depending on key colour
            if (this.keyConfig.note.includes('#')) {
                classBinding['black-key'] = true;
                classBinding['black-key--hover'] = this.isHover;
                classBinding['black-key--pressed'] = this.isPressed;
            } else {
                classBinding['white-key'] = true;
                classBinding['white-key--hover'] = this.isHover;
                classBinding['white-key--pressed'] = this.isPressed;
            }
            return classBinding
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
        background: lightcyan;
        background-clip: padding-box;
    }

    .white-key--pressed {
        background: palegreen;
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
        color: rgba(255, 255, 255, 0.2);
        align-self: flex-end;
        user-select: none;
        font-size: var(--key-label-size);
        font-family: Lato, Helvetica, Arial, sans-serif;
    }

    .black-key--hover {
        background: slategray;
    }

    .black-key--pressed {
        background: steelblue;
    }
</style>