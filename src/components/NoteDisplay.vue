<template>
    <transition name="slide-fade">
        <div :key="currentNote">{{ currentNote }}</div>
    </transition>
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
        user-select: none;
        color: var(--tertiary-text-colour);
    }
    .slide-fade-enter-active, .slide-fade-leave-active {
        transition: all .8s cubic-bezier(0.19, 1, 0.22, 1);
    }
    .slide-fade-enter, .slide-fade-leave-to
    {
        opacity: 0;
        transform: scale(1.1);
    }
</style>