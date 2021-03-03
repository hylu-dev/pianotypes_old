<template>
    <div class="ribbon-panel">
        <ribbon-shooter class="ribbon-shooter" v-for="(value, key) in sharedKeyState.keyStates" :key="value" :note="key"></ribbon-shooter>
    </div>
</template>

<script>

import RibbonShooter from './RibbonShooter'
import KeyStateStore from '../stores/KeyStateStore'

export default {
    name: 'ribbon-panel',
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
    .ribbon-panel {
        display: flex;
        flex-flow: row;
        background-color: rgb(22, 22, 22);
        width: 100vw;
        height: 100vh;
        align-items: flex-end;
        justify-content: center;
    }

    .ribbon-shooter {
        position: relative;
        height: 0;
        z-index: 2;
    }
</style>