<template>
    <div :class="getRibbonClasses">
        <midi-ribbon></midi-ribbon>
    </div>
</template>

<script>

import MidiRibbon from './MidiRibbon'
import KeyStateStore from '../stores/KeyStateStore'

export default {
    name: 'ribbon-shooter',
    components: {
        MidiRibbon
    },
    props : {
        note: String
    },
    data() {
        return {
            sharedKeyState: KeyStateStore.state,
            ribbons: Object,
            idCounter: 0
        }
    },
    methods: {},
    computed: {
        isWhiteKey: function() {
            return this.note.includes('#') ? false : true;
        },
        getRibbonClasses() {
            let classBinding = {}
            const regex = /[cCdDfFgGaA#]/g;
            this.note.search(regex) >= 0 ? classBinding["offset-key"] = true : classBinding["offset-key"] = false; // offset margin if key precedes|is a black key
            // add styles depending on key colour
            if (this.isWhiteKey) {
                classBinding['white-key'] = true;
                classBinding['white-key--glow'] = this.isPressed;
            } else {
                classBinding['black-key'] = true;
                classBinding['black-key--glow'] = this.isPressed;
            }
            return classBinding
        },
        isPressed: function() {
            if (this.sharedKeyState.keyStates[this.note].isPressed) {
                return true;
            }
            return false;
        }
    },
    watch: {
        isPressed(bool) {
            if (bool) {
                this.ribbons[this.idCounter] = true;
                this.idCounter++;
            }
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
        width: calc(var(--white-key-width) + var(--white-key-border-width));
        box-sizing: border-box;
    }

    .white-key--glow {
        box-shadow: 0 0 10px 2px greenyellow;
    }

    .white-ribbon {
        background-color: var(--white-key-active-colour);;
    }

    .black-key {
        display: flex;
        justify-content: center;
        width: var(--black-key-width);
        box-sizing: border-box;
    }

    .black-key--glow {
        box-shadow: 0 -2px 7px 3px royalblue;
    }

    .black-ribbon {
        background-color: var(--black-key-active-colour);;
    }

</style>