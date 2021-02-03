<template>
    <Key :instrument="createInstrument('acoustic_grand_piano')"></Key>
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
    methods: {
            createInstrument(instrument) {
            console.log("test")
            console.log(instrument);
            return this.sf.instrument(this.ac, instrument, {
                soundfont: 'FluidR3_GM'
                });
        }
    },
    computed: {}
}
</script>

<style scoped>

</style>