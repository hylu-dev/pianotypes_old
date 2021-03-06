<template>
    <div v-if="active" :class="ribbonClasses" :style="styleObject" ></div>
</template>

<script>
export default {
    mounted() {
        this.timer = setInterval(() => { this.height+=this.speed; }, 1);
    },
    beforeUnmount() {
        // Cleanup interval
        clearInterval(this.timer);
    },
    name: 'midi-ribbon',
    emits: ['destroy'],
    data() {
        return {
            timer: null,
            yPos: 0,
            height: 0,
            speed: 1.5, // move at 1000/<speed>px per second
            maxHeight: window.innerHeight,
            active: true,
            released: false
        }
    },
    props: {
        ribbonID: String,
        isWhiteKey: Boolean,
        isReleased: Boolean
    },
    methods: {
        releaseRibbon() {
            clearInterval(this.timer);
            this.timer = setInterval(() => { this.yPos+=this.speed; }, 1);
        },
        emitDestroy() {
            this.$emit('destroy', this.ribbonID);
            this.active = false;
        }
    },
    computed: {
        ribbonClasses: function() {
            let classBinding = {};
            classBinding['white-ribbon'] = this.isWhiteKey;
            classBinding['black-ribbon'] = !this.isWhiteKey;
            return classBinding;
        },
        styleObject: function() {
            return {
                height: this.height+'px',
                transform: 'translateY('+ -this.yPos +'px)'
            }
        }
    },
    watch: {
        isReleased() {
            this.released = true;
            this.releaseRibbon();
        },
        yPos() {
            if (this.yPos >= this.maxHeight) {
                this.emitDestroy();
            }
        }
    }
}
</script>

<style scoped>
    #ribbon {
        position: absolute;
        width: inherit;
        border-radius: 7px;
        box-sizing: none;
        bottom: -6px;
        box-shadow: 0 0 5px 1px #111;
    }

    .white-ribbon {
        background-color: var(--white-key-active-colour);
        z-index: 0;
    }

    .black-ribbon {
        background-color: var(--black-key-active-colour);;
        z-index: 1;
    }
</style>