<template>
    <div :class="keyClasses">
        <ribbon-block v-for="(value, id) in ribbons" :key="id" :ribbonID="id" :isWhiteKey="isWhiteKey" :released="!isPressed" @destroy="destroyRibbon"></ribbon-block>
        <div :style="glowStyles"></div>
    </div>
</template>

<script>
import RibbonBlock from './RibbonBlock'
import PianoStateStore from '@/stores/PianoStateStore'
import { Note } from "@tonaljs/tonal"

export default {
    name: 'ribbon-lane',
    components: {
        RibbonBlock
    },
    props : {
        note: String
    },
    data() {
        return {
            ids: 0,
            ribbons: {},
            sharedKeyboard: PianoStateStore.state.keyboard
        }
    },
    methods: {
        destroyRibbon(id) {
            delete this.ribbons[id];
        }
    },
    computed: {
        isWhiteKey: function() {
            return Note.accidentals(this.note) ? false : true;
        },
        keyClasses: function() {
            let classBinding = {}
            classBinding["offset-key"] = Note.accidentals(Note.transpose(this.note, "2m")) ? true : false; // offset margin if key precedes|is a black key
            // add styles depending on key colour
            if (this.isWhiteKey) {
                classBinding['white-key'] = true;
            } else {
                classBinding['black-key'] = true;
            }
            return classBinding
        },
        glowStyles: function() {
            return this.isPressed ? { height: 0, alignSelf: 'flex-end', boxShadow: '0 0 25px 15px goldenrod', zIndex: 2 } : {};
        },
        isPressed: function() {
            if (this.sharedKeyboard.getIsPressed(this.note)) {
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
    #ribbon-lane {
        position: relative;
        display: flex;
        justify-content: center;
        height: 100%;
        z-index: 2;
    }

    .offset-key {
        margin-right: calc(var(--black-key-width)/-2);
    }

    .white-key {
        width: var(--white-key-width);
        border-left: var(--white-key-border-width) solid transparent;
        border-right: var(--white-key-border-width) solid transparent;
        z-index: 0;
    }

    .black-key {
        width: var(--black-key-width);
    }

</style>