<template>
    <div>
        <note-display v-if="showDisplay" id="note-display"></note-display>
        <ribbon-lane id="ribbon-lane" v-for="note in sharedKeyState.keyboard.getKeyboard()" :key="note" :note="note"></ribbon-lane>
    </div>
</template>

<script>

import { defineAsyncComponent } from 'vue'
import RibbonLane from './RibbonLane'
import KeyStateStore from '../../stores/KeyStateStore'

export default {
    name: 'ribbon-panel',
    components: {
        RibbonLane,
        NoteDisplay: defineAsyncComponent(() => import(/* webpackChunkName: "note-display" */ './NoteDisplay'))
    },
    data() {
        return {
            sharedKeyState: KeyStateStore.state,
            showDisplay: true
        }
    },
    methods: {
    },
    computed: {}
}
</script>

<style scoped>
    #ribbon-panel {
        display: flex;
        flex-flow: row;
        width: 100vw;
        align-items: flex-end;
        justify-content: center;
    }
</style>