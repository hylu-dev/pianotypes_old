<template>
  <div class="grid-container">
    <tabs id="tabs">
      <div class="icon-filled-panel"></div>
      <div class="icon-ribbon-panel-invert"></div>
      <div class="icon-typing-panel-invert"></div>
    </tabs>
    <note-display v-if="renderDisplay" id="note-display"></note-display>
    <ribbon-panel v-if="renderRibbonPanel" id="ribbon-panel"></ribbon-panel>
    <piano-pedal v-if="renderPedal" id="piano-pedal"></piano-pedal>
    <piano-keyboard v-if="renderPiano" id="piano-keyboard"></piano-keyboard>
    <piano-controller v-if="renderController" id="piano-controller"></piano-controller>
  </div>
</template>

<script>
import { defineAsyncComponent } from 'vue'
import PianoKeyboard from '@/components/Piano/PianoKeyboard'
import PianoController from '@/components/Piano/PianoController'
import PianoPedal from '@/components/Piano/PianoPedal'
import RibbonPanel from '@/components/Ribbon/RibbonPanel'
import Tabs from '@/components/Tabs'

export default {
  name: 'Home',
  data() {
    return {
      renderDisplay: true,
      renderRibbonPanel: true,
      renderPedal: true,
      renderPiano: true,
      renderController: true,
    }
  },
  components: {
    PianoKeyboard,
    PianoController,
    PianoPedal,
    RibbonPanel,
    Tabs,
    NoteDisplay: defineAsyncComponent(() => import(/* webpackChunkName: "note-display" */ '../components/NoteDisplay'))
  }
}
</script>

<style scoped>
  .grid-container {
    height: 100%;
    width: 100%;
    display: grid;
    grid-template-rows: [row-start] 5fr var(--piano-height) [row-end];
    grid-template-columns: [col-start] 1fr minmax(0, 5fr) 1fr [col-end];
    grid-template-areas: 
    "panel-left main-panel panel-right"
    "piano-left piano piano-right";
  }

  .icon-filled-panel, .icon-ribbon-panel-invert, .icon-typing-panel-invert {
    font-size: 2rem;
    transition: all .3s cubic-bezier(0.075, 0.82, 0.165, 1);
  }

  /* .icon-filled-panel:hover, .icon-ribbon-panel-invert:hover, .icon-typing-panel-invert:hover {
    filter: brightness(1.1);
    transform: scale(1.1);
  } */

  #tabs {
    grid-area: main-panel;
    place-self: start right;
  }

  #note-display {
    grid-area: main-panel;
  }

  #ribbon-panel {
    grid-area: main-panel;
  }

  #piano-pedal {
    grid-area: piano-left;
    background: var(--secondary-bg-colour);
  }

  #piano-keyboard {
    grid-area: piano;
    box-sizing: border-box;
    background: var(--tertiary-bg-colour);
  }

  #piano-controller {
    grid-area: piano-right;
    background: var(--secondary-bg-colour);
  }

  @media only screen and (max-width: 800px) {
    #piano-pedal {
      display: none;
    }
    #piano-keyboard {
      grid-area: 2 / col-start / 2 / col-end;
      width: 100vw;
    }
    #ribbon-panel {
      grid-area: 1 / col-start / 1 / col-end;
      width: 100vw;
    }
    #piano-controller {
      display: none;
    }
}
</style>