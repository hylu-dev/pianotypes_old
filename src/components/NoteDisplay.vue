<template>
  <div>{{ currentNote }}</div>
</template>

<script>
import KeyStateStore from '../stores/KeyStateStore'

export default {
    name: 'note-display',
    computed: {
        currentNote: function() {
            return KeyStateStore.state.lastKey;
        }
    }
}
</script>

<style>
    #note-display {
        position: absolute;
        align-self: center;
        font-size: 10rem;
        color: var(--tertiary-text-colour);
    }
</style>