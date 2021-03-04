<template>
    <div>
        <ribbon-shooter id="ribbon-shooter" v-for="(value, key) in sharedKeyState.keyStates" :key="value" :note="key"></ribbon-shooter>
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
    #ribbon-panel {
        display: flex;
        flex-flow: row;
        background-color: var(--secondary-bg-colour);
        width: 100vw;
        height: 100vh;
        align-items: flex-end;
        justify-content: center;
    }
</style>