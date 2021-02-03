<template>
    <Key :instrument="getPiano"></Key>
</template>

<script>
import Key from './Key'

export default {
    name: 'Keyboard',
    components: {
        Key
    },
    props: {},
    data() {
        return {
            sf: require('soundfont-player'),
            ac: new AudioContext(),
        }
    },
    methods: {},
    computed: {
        getPiano() {
            return this.sf.instrument(this.ac, 'acoustic_grand_piano', {
                soundfont: 'FluidR3_GM'
                });
        }
    }
}
</script>

<style scoped>

</style>