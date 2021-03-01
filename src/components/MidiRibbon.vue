<template>
    <div v-if="active" :class="ribbonClasses" :style="styleObject" ></div>
</template>

<script>
export default {
    mounted() {
        this.timer = setInterval(() => { this.height++; }, this.speed);
    },
    name: 'midi-ribbon',
    emits: ['destroy'],
    data() {
        return {
            timer: null,
            yPos: 0,
            height: 0,
            speed: 2, // move at 1000/<speed>px per second
            maxHeight: window.innerHeight,
            active: true
        }
    },
    props: {
        id: String,
        isWhiteKey: Boolean,
        isReleased: Boolean
    },
    methods: {
        releaseRibbon() {
            clearInterval(this.timer);
            this.timer = setInterval(() => { this.yPos++; }, this.speed);
        },
        emitDestroy() {
            this.$emit('destroy', this.id);
            this.active = false;
        }
    },
    computed: {
        ribbonClasses: function() {
            let classBinding = {};
            classBinding['ribbon'] = true;
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
    .ribbon {
        position: absolute;
        width: inherit;
        border-radius: 7px;
        box-sizing: none;
        bottom: calc(var(--piano-height) - 5px);
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