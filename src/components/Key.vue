<template>
    <div id="white-key"  @mousedown="emitPressed($event)"></div>
</template>

<script>
export default {
    name: 'Key',
    created() {
        window.addEventListener('keydown', this.emitPressed)
        //window.addEventListener('keyup', this.emitpressed)
        },
    emits: ['pressed'],
    props: {
        keyConfig: {
            type: Object,
            required: true  
        }
    },
    data() {
        return {}
    },
    methods: {
        emitPressed(e) {
            console.log(e.key, e.type)
            if (e.repeat) { return } // Disable automatic keypress when key is held
            if (e.key == this.keyConfig.binding || e.type == "mousedown") {
                this.$emit('pressed', { note: this.keyConfig.note, binding: this.keyConfig.binding, e: e });
            }            
        },
        emitReleased() {} //WIP
    },
    computed: {}
}
</script>

<style scoped>
    #white-key {
        width: 100px;
        height: 300px;
        border: 7px solid #222;
        background: white;
        border-radius: 20px;
    }

    #white-key:hover {
        background: lightgrey;
    }

    #white-key:active {
        background: rgb(102, 102, 102);
    }
</style>