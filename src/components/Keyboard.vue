<template>
    <div class="key-board">
        <Key v-for="key in keyList" :key="key" :keyConfig="key" @pressed="pressKey"></Key>
    </div>

</template>

<script>
import Key from './Key'
import kbjson from '../json/keyboard.json'

export default {
    name: 'Keyboard',
    components: {
        Key
    },
    props: [],
    data() {
        return {
            instrument: require('soundfont-player').instrument(new AudioContext(), 'acoustic_grand_piano', {
                soundfont: 'FluidR3_GM'
                }),
            keyList: kbjson //grabs key configs
        }
    },
    methods: {
        pressKey({note}) {
            this.instrument.then(function (instr) {
            instr.play(note, 0, 1);
            })
        },
        releaseKey({note}) {
            this.instrument.then(function (instr) {
            instr.stop(note, 0, 1);
            })
        }
    },
    computed: {}
}
</script>

<style scoped>
    .key-board {
        display: flex;
        flex-flow: row;
    }
</style>