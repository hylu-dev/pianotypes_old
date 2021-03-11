<template>
    <transition appear name="ribbon"
    @before-leave="ribbonBeforeLeave"
    @leave="ribbonLeave"
    @after-leave="emitDestroy">
            <div ref="ribbon" v-if="active" :class="ribbonClasses"></div>
    </transition>
</template>

<script>
export default {
    mounted() {
        this.ribbonClientHeight = this.$refs.ribbon.clientHeight;
    },
    name: 'midi-ribbon',
    emits: ['destroy'],
    data() {
        return {
            active: true,
            ribbonClientHeight: 0,
        }
    },
    props: {
        ribbonID: String,
        isWhiteKey: Boolean,
        released: Boolean
    },
    methods: {
        releaseRibbon() {
            this.active = false;
        },
        emitDestroy() {
            this.$emit('destroy', this.ribbonID);
        },
        ribbonBeforeLeave(el) {
            let rect = el.getBoundingClientRect();
            let lenRatio = (rect.bottom-rect.y)/this.ribbonClientHeight; // Ratio between actual height of ribbon and max height for ribbon
            let timeOffset = 2+(1-lenRatio); // this is required because smaller ribbons fly faster as the bottom of the ribbon needs to travel further
            el.style.transition = 'transform ' + timeOffset + 's linear';
        },
        ribbonLeave(el) {
            let rect = el.getBoundingClientRect();
            let lenRatio = (rect.bottom-rect.y)/this.ribbonClientHeight; // Ratio between actual height of ribbon and max height for ribbon
            el.style.transform = 'translateY(-100%)scaleY(' + lenRatio + ')';
        }
    },
    computed: {
        ribbonClasses: function() {
            let classBinding = {};
            classBinding['white-ribbon'] = this.isWhiteKey;
            classBinding['black-ribbon'] = !this.isWhiteKey;
            return classBinding;
        }
    },
    watch: {
        released() {
            this.releaseRibbon();
        }
    }
}
</script>

<style scoped>
    #ribbon {
        position: absolute;
        width: inherit;
        height: 100%;
        box-sizing: none;
        bottom: 0px;
        box-shadow: 0 0 5px 1px #111;
    }

    .ribbon-enter-active {
        transition: transform 2s linear;
    }

    .ribbon-enter-from {
        transform: translateY(50%)scaleY(0);
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