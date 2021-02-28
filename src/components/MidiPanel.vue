<template>
    <div class="midi-panel">
        <midi-ribbon v-for="ribbon in ribbons" :key="ribbon"></midi-ribbon>
    </div>
</template>

<script>
import MidiRibbon from './MidiRibbon'

export default {
    name: 'midi-panel',
    components: {
        MidiRibbon
    },
    data() {
        return {
            ribbons: [0] //each contained ribbon has note info
        }
    },
    methods: {
        createRibbon(e) {
            console.log(e);
        },
        releaseRibbon(e) {
            console.log(e);
        }
    },
    computed: {

    }
}
</script>

<style scoped>
    .midi-panel {
        display: block;
        background-color: rgb(22, 22, 22);
        width: 100vw;
        height: 70vh;
    }

</style>