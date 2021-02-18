<template>
    <div class="keyboard">
        <piano-key v-for="key in keyList" :key="key" :keyConfig="key" @pressed="pressKey" @released="releaseKey"></piano-key>
    </div>

</template>

<script>
import PianoKey from './PianoKey'
import kbjson from '../json/keyboard.json'

export default {
    name: 'piano-keyboard',
    components: {
        PianoKey
    },
    props: [],
    data() {
        let ac = new AudioContext()
        return {
            ac: ac,
            instrument: require('soundfont-player').instrument(ac, 'acoustic_grand_piano', {
                soundfont: 'FluidR3_GM'
                }),
            keyList: kbjson, //grabs keyboard json file
            isPedal: false
        }
    },
    methods: {
        pressKey({note}) {
            this.instrument.then(function (instr) { instr.play(note, 0, 1); })
        },
        releaseKey() {
            this.instrument.then(function (instr) {
            instr.stop();
            })
        }
    },
    computed: {}
}
</script>

<style scoped>
    .keyboard {
        height: var(--piano-height);
        display: flex;
        flex-flow: row;
    }
</style>