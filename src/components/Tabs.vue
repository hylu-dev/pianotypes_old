<script>
import { h } from 'vue'

export default {
    render() {
        this.$slots.default().forEach( (node) => this.tabs.push(node) )
        console.log(this.tabs);
        return h(
            'div',
            { class: 'tab' },
            this.$slots.default()
        )
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
        padding: 1rem;
    }

    .tab {
        transition: all .3s cubic-bezier(0.075, 0.82, 0.165, 1);
    }

    .tab__hover {
        filter: brightness(1.1);
        transform: scale(1.1);
    }


</style>