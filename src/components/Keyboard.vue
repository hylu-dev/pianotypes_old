<template>
    <div class="key-board">
        <Key v-for="key in keyList" :key="key" :keyConfig="key" @pressed="pressKey" @released="releaseKey"></Key>
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
        updateKeysPressed(e) {
            console.log(e)
            this.isPressed = true
        },
        pressKey({note, e}) {
            console.log(e.key, e.type)
            this.instrument.then(function (instr) {
            instr.play(note, 0, 1);
            })
        },
        releaseKey(/*{note}*/) {
            this.instrument.then(function (instr) {
            instr.stop();
            })
        }
    },
    computed: {}
}
</script>

<style scoped>
    .key-board {
        height: 280px;
        display: flex;
        flex-flow: row;
    }
</style>