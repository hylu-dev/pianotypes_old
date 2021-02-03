<template>
    <div id="white-key" v-on:click="play()"></div>
</template>

<script>
export default {
    name: 'Key',
    props: {
        instrument: {
            type: Object,
            required: true
        }
    },
    data() {
        return {}
    },
    methods: {
        play() {
            this.instrument.then(function (instr) {
            instr.play('C4', 0, 1);
            })
        }
    },
    computed: {

    }
}
</script>

<style scoped>
    #white-key {
        width: 50px;
        height: 150px;
        background: white;
    }
</style>