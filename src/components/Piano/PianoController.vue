<template>
    <div class="flex-container">
        <form>
        <input type="text" id="min" v-model="this.minNote" maxlength="3">
        →
        <input type="text" id="max" v-model="this.maxNote" maxlength="3">
    </form>
    </div>
</template>

<script>
import PianoStateStore from '@/stores/PianoStateStore'
import KeyBindingStore from '@/stores/KeyBindingStore'

export default {
    name: 'piano-controller',
    data() {
        return {
            sharedKeyboard: PianoStateStore.state.keyboard,
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
    .flex-container {
        display: flex;
        justify-content: center;
        user-select: none;
    }

    form {
        padding: 10%;
    }

    input[type=text] {
        width: 3ch;
    }
</style>