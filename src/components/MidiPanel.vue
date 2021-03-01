<template>
    <div class="midi-panel">
        <ribbon-shooter v-for="(value, key) in sharedKeyState.keyStates" :key="value" :note="key"></ribbon-shooter>
    </div>
</template>

<script>

import RibbonShooter from './RibbonShooter'
import KeyStateStore from '../stores/KeyStateStore'

export default {
    name: 'midi-panel',
    components: {
        RibbonShooter
    },
    data() {
        return {
            sharedKeyState: KeyStateStore.state
        }
    },
    methods: {
    },
    computed: {}
}
</script>

<style scoped>
    .midi-panel {
        display: flex;
        flex-flow: row;
        background-color: rgb(22, 22, 22);
        width: 100vw;
        height: 100vh;
        align-items: flex-end;
        justify-content: center;
    }
</style>