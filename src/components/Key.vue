<template>
    <div :class="keyType"  @mousedown="emitPressed($event)" @mouseup="emitReleased($event)"></div>
</template>

<script>
export default {
    name: 'Key',
    created() {
        window.addEventListener('keydown', this.emitPressed), // window event listener to catch global keyboard events
        window.addEventListener('keyup', this.emitReleased)
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
            keyPressed: false
        }
    },
    methods: {
        emitPressed(e) {
            if (e.repeat) { return } // Disable automatic keypress when key is held
            if (e.type == "mousedown" || this.keyConfig.binding.includes(e.key.toLowerCase())) {
                this.$emit('pressed', { note: this.keyConfig.note, binding: this.keyConfig.binding, e: e });
                this.keyPressed = true;
            }

        },
        emitReleased(e) {
            if (e.type == "mouseup" || this.keyConfig.binding.includes(e.key.toLowerCase())) {
                this.$emit('released', { note: this.keyConfig.note, binding: this.keyConfig.binding, e: e });
                this.keyPressed = false;
            }
        }
    },
    computed: {
        keyType() {
            let classBinding = {}
            let regex = /[cCdDfFgGaA#]/g;
            this.keyConfig.note.search(regex) >= 0 ? classBinding["offset-key"] = true : classBinding["offset-key"] = false; // offset margin if key precedes|is a black key
            // add styles depending on key colour
            if (this.keyConfig.note.includes('#')) {
                classBinding['black-key'] = true
                classBinding['black-key--pressed'] = this.keyPressed;
            } else {
                classBinding['white-key'] = true
                classBinding['white-key--pressed'] = this.keyPressed;
            }
            return classBinding
        }
    }
}
</script>

<style scoped>
    .offset-key {
        margin-right: calc(-20px);
    }

    .white-key {
        width:70px;
        border-left: 2px solid transparent;
        border-right: 2px solid transparent;
        background: white;
        background-clip: padding-box;
        z-index: 0;
    }

    .white-key:hover {
        background: lightcyan;
        background-clip: padding-box;
    }

    .white-key--pressed {
        background: palegreen;
        background-clip: padding-box;
    }

    .black-key {
        width: 40px;
        height: 50%;
        background: rgb(28, 28, 28);
        z-index: 1;
    }

    .black-key:hover {
        background: slategray;
    }

    .black-key--pressed {
        background: steelblue;
    }
</style>