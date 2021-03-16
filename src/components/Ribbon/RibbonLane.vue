<template>
    <div :class="keyClasses">
        <ribbon-block id="ribbon" v-for="(value, id) in ribbons" :key="id" :ribbonID="id" :isWhiteKey="isWhiteKey" :released="!isPressed" @destroy="destroyRibbon"></ribbon-block>
        <div :style="glowStyles"></div>
    </div>
</template>

<script>
import RibbonBlock from './RibbonBlock'
import KeyStateStore from '@/stores/KeyStateStore'
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
            Note.accidentals(Note.transpose(this.note, "2m")) ? classBinding["offset-key"] = true : classBinding["offset-key"] = false; // offset margin if key precedes|is a black key
            // add styles depending on key colour
            if (this.isWhiteKey) {
                classBinding['white-key'] = true;
            } else {
                classBinding['black-key'] = true;
            }
            return classBinding
        },
        glowStyles: function() {
            return this.isPressed ? { height: 0, alignSelf: 'flex-end', boxShadow: '0 0 10px 5px rgba(218, 165, 32)', zIndex: 2 } : {};
        },
        isPressed: function() {
            if (KeyStateStore.getKeyPressedState(this.note)) {
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
    }

    .black-key {
        width: var(--black-key-width);
    }

</style>