<template>
    <div>
        <note-display v-if="showDisplay" id="note-display"></note-display>
        <div class="lane-container">
            <ribbon-lane id="ribbon-lane" v-for="note in sharedKeyboard.getKeyboard()" :key="note" :note="note"></ribbon-lane>
        </div>
    </div>
</template>

<script>

import { defineAsyncComponent } from 'vue'
import RibbonLane from './RibbonLane'
import PianoStateStore from '@/stores/PianoStateStore'

export default {
    name: 'ribbon-panel',
    components: {
        RibbonLane,
        NoteDisplay: defineAsyncComponent(() => import(/* webpackChunkName: "note-display" */ './NoteDisplay'))
    },
    data() {
        return {
            sharedKeyboard: PianoStateStore.state.keyboard,
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
        justify-content: center;
        align-items: flex-end;
    }

    .lane-container {
        width: 100%;
        height: 100%;
        display: flex;
        justify-content: center;
        flex-flow: row;
    }
</style>