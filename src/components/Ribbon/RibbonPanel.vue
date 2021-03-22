<template>
    <div>
        <div class="lane-container">
            <ribbon-lane id="ribbon-lane" v-for="note in sharedKeyboard.getKeyboard()" :key="note" :note="note"></ribbon-lane>
        </div>
    </div>
</template>

<script>

import RibbonLane from './RibbonLane'
import PianoStateStore from '@/stores/PianoStateStore'

export default {
    name: 'ribbon-panel',
    components: {
        RibbonLane
    },
    data() {
        return {
            sharedKeyboard: PianoStateStore.state.keyboard
        }
    },
    methods: {
    },
    computed: {}
}
</script>

<style scoped>
    #ribbon-panel {
        position: relative;
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