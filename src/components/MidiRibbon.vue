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
    name: 'midi-ribbon',
    emits: ['destroy'],
    data() {
        return {
            el: null,
            active: true,
            ribbonClientHeight: 0,
            ribbonAnimation: null,
            ribbonExtend: [
                { height: '0' },
                { height: '100%' }
            ],
            ribbonDuration: 2000,
            isReleased: false,
        }
    },
    props: {
        ribbonID: String,
        isWhiteKey: Boolean,
        released: Boolean
    },
    methods: {
        async releaseRibbon() {
            this.ribbonAnimation.oncancel = () => {
                let anime = this.el.animate(this.ribbonRelease, this.ribbonDuration);
                anime.onfinish = this.emitDestroy;   
            };
            this.el.style.height = this.ribbonHeight+'px';
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
            return this.el.getBoundingClientRect().bottom - this.el.getBoundingClientRect().y;
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
        width: inherit;
        height: calc(100% + 1rem);
        bottom: 0;
        box-shadow: 0 0 5px 1px #111;
        border-radius: 5px;
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