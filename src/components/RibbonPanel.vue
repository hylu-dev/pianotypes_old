<template>
    <div>
        <note-display v-if="showDisplay" id="note-display"></note-display>
        <ribbon-shooter id="ribbon-shooter" v-for="note in sharedKeyState.keyboard.getKeyboard()" :key="note" :note="note"></ribbon-shooter>
    </div>
</template>

<script>

import RibbonShooter from './RibbonShooter'
import NoteDisplay from './NoteDisplay'
import KeyStateStore from '../stores/KeyStateStore'

export default {
    name: 'ribbon-panel',
    components: {
        RibbonShooter,
        NoteDisplay
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