<template>
    <div :class="ribbonShooterClasses">
        <midi-ribbon v-for="(value, id) in ribbons" :key="id" :id="id" :isWhiteKey="isWhiteKey" :isReleased="isPressed" @destroy="destroyRibbon"></midi-ribbon>
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
            ids: 0,
            sharedKeyState: KeyStateStore.state,
            ribbons: {}
        }
    },
    methods: {
        destroyRibbon(id) {
            delete this.ribbons[id];
        }
    },
    computed: {
        isWhiteKey: function() {
            return this.note.includes('#') ? false : true;
        },
        ribbonShooterClasses: function() {
            let classBinding = {}
            const regex = /[cCdDfFgGaA#]/g;
            this.note.search(regex) >= 0 ? classBinding["offset-key"] = true : classBinding["offset-key"] = false; // offset margin if key precedes|is a black key
            // add styles depending on key colour
            classBinding['ribbon-shooter'] = true;
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
                this.ribbons[this.ids] = this.isWhiteKey;
                this.ids++;
            }
        }
    }
}
</script>

<style scoped>
    .ribbon-shooter {
        position: relative;
        display: flex;
        justify-content: center;
        height: 0;
        z-index: 2;
    }

    .offset-key {
        margin-right: calc(var(--black-key-width)/-2);
    }

    .white-key {
        width: calc(var(--white-key-width));
        border-left: var(--white-key-border-width) solid transparent;
        border-right: var(--white-key-border-width) solid transparent;
    }

    .white-key--glow {
        box-shadow: 0 0 12px 6px goldenrod;
    }

    .black-key {
        width: var(--black-key-width);
    }

    .black-key--glow {
        box-shadow: 0 -2px 12px 6px goldenrod;
    }



</style>