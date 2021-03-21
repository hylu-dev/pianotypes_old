<template>
    <div ref="ribbon" v-if="active" :class="ribbonClasses"></div>
</template>

<script>
export default {
    mounted() {
        this.el = this.$refs.ribbon;
        this.ribbonClientHeight = this.el.clientHeight;
        this.ribbonAnimation = this.el.animate(this.ribbonExtend, this.ribbonDuration);
        this.el.animate(this.ribbonRounded, this.ribbonDuration)
    },
    name: 'ribbon-block',
    emits: ['destroy'],
    data() {
        return {
            el: null,
            active: true,
            ribbonClientHeight: 0,
            ribbonAnimation: null,
            ribbonExtend: [
                { transform: 'translateY(50%)scaleY(0)' },
                { transform: 'none' }
            ],
            ribbonDuration: 3000, //millis
            isReleased: false,
            minHeight: 5 //px
        }
    },
    props: {
        ribbonID: String,
        isWhiteKey: Boolean,
        released: Boolean
    },
    methods: {
        releaseRibbon() {
            this.ribbonAnimation.oncancel = () => {
                let anime = this.el.animate(this.ribbonRelease, this.ribbonDuration);
                anime.onfinish = this.emitDestroy;   
            };
            this.el.style.height = this.ribbonHeight;
            requestAnimationFrame(() => {
                this.ribbonAnimation.cancel();
            })
        },
        emitDestroy() {
            this.active = false;
            this.$emit('destroy', this.ribbonID);
        }
    },
    computed: {
        ribbonClasses: function() {
            let classBinding = {};
            classBinding['white-ribbon'] = this.isWhiteKey;
            classBinding['black-ribbon'] = !this.isWhiteKey;
            return classBinding;
        },
        ribbonHeight: function() {
            let currentHeight = this.el.getBoundingClientRect().bottom - this.el.getBoundingClientRect().y;
            return currentHeight < this.minHeight ? this.minHeight+'px' : currentHeight+'px';
        },
        ribbonRelease: function() {
            return [
                { transform: 'none' },
                { transform: 'translateY(' + -this.ribbonClientHeight + 'px)' }];
        }
    },
    watch: {
        released() {
            if (!this.isReleased) {
                this.ribbonAnimation.pause();
                this.isReleased = true;
                this.releaseRibbon();
            } 
        }
    }
}
</script>

<style scoped>
    #ribbon {
        position: absolute;
        width: 100%;
        height: calc(100% + 1rem);
        box-sizing: none;
        bottom: 0px;
        box-shadow: 0 0 7px 4px #111;
        border-radius: .5vw;
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