<template>
    <div>
        <slot></slot>
    </div>
</template>

<script>
export default {
    created() {
        console.log(this.$children)
    },
    name: 'tabs',
    data() {
        return {
            tabs: []
        }
    }
}
</script>

<style>
    #tabs {
        display: flex;
        justify-content: center;
        align-items: center;
        gap: 1rem;
        padding-left: 1rem;
        padding-right: 1rem;
    }
</style>