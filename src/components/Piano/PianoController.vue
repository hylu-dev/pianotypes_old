<template>
    <form>
        <label>Range: </label>
        <input type="text" id="min" v-model="this.minNote">
        →
        <input type="text" id="max" v-model="this.maxNote">
    </form>
</template>

<script>
import KeyStateStore from '@/stores/KeyStateStore'
import KeyBindingStore from '@/stores/KeyBindingStore'

export default {
    name: 'piano-controller',
    data() {
        return {
            sharedKeyboard: KeyStateStore.state.keyboard,
            sharedBindingState: KeyBindingStore.state
        }
    },
    computed: {
        minNote: {
            set(minNote) {
                this.sharedKeyboard.setMin(minNote)
            },
            get() {
                return this.sharedKeyboard.getMin();
            }
        },
        maxNote: {
            set(maxNote) {
                this.sharedKeyboard.setMax(maxNote)
            },
            get() {
                return this.sharedKeyboard.getMax();
            }
        }
    }
}

</script>

<style>
    form {
        padding: 10%;
    }

    input[type=text] {
        width: 3ch;
    }
</style>