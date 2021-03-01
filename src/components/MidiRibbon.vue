<template>
    <div v:if="keyActive" :class="getRibbonClasses" :style="{ bottom: yPos+'px', height: height+'px' }"></div>
    <!-- <div :style="{ width: 50+'px', height: 50+'px', backgroundColor:'grey' }" @click="keyActive = !keyActive"> Test </div> -->
</template>

<script>
export default {
    name: 'midi-ribbon',
    data() {
        return {
            id: null,
            timer: null,
            yPos: 0,
            height: 0,
            keyActive: false,
            speed: 5 // move at 1000/<speed>px per second
        }
    },
    methods: {
        extendRibbon() {
            clearInterval(this.timer);
            this.timer = setInterval(() => { this.height++; }, this.speed);
        },
        releaseRibbon() {
            clearInterval(this.timer);
            this.timer = setInterval(() => { this.yPos++; }, this.speed);
        }
    },
    computed: {
        getRibbonClasses() {
            let classBinding = {};
            classBinding['ribbon'] = true;
            classBinding['white-ribbon'] = true;
            return classBinding;
        },
    },
    watch: {
        keyActive() {
            if (this.keyActive) {
                this.extendRibbon()
            } else {
                this.releaseRibbon()
            }
        }
    }
}
</script>

<style scoped>
    .ribbon {
        position: absolute;
        width: inherit;
    }
</style>