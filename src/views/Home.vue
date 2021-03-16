<template>
  <div class="grid-container">
    <ribbon-panel v-if="showRibbonPanel" id="ribbon-panel"></ribbon-panel>
    <div class="piano-shadow"></div>
    <piano-pedal id="piano-pedal"></piano-pedal>
    <piano-keyboard v-if="true" id="piano-keyboard"></piano-keyboard>
    <piano-controller id="piano-controller"></piano-controller>
  </div>
</template>

<script>
import PianoKeyboard from '../components/Piano/PianoKeyboard'
import PianoController from '../components/Piano/PianoController'
import PianoPedal from '../components/Piano/PianoPedal'
import RibbonPanel from '../components/Ribbon/RibbonPanel'

export default {
  name: 'Home',
  data() {
    return {
      showRibbonPanel: true
    }
  },
  components: {
    PianoKeyboard,
    PianoController,
    PianoPedal,
    RibbonPanel
  }
}
</script>

<style scoped>
  .grid-container {
    height: 100%;
    width: 100vw;
    display: grid;
    grid-template-rows: 5fr var(--piano-height);
    grid-template-columns: [col-start] 1fr minmax(0, 5fr) 1fr [col-end];
    grid-template-areas: 
    "panel-left main-panel panel-right"
    "piano-left piano piano-right";
  }

  #ribbon-panel {
    grid-area: main-panel;
  }

  .piano-shadow {
    grid-area: 2 / col-start / 2 / col-end;
    box-shadow: 0 0 10px black;
  }

  #piano-pedal {
    grid-area: piano-left;
    background: var(--secondary-bg-colour);
  }

  #piano-keyboard {
    grid-area: piano;
    box-sizing: border-box;
    background: var(--tertiary-bg-colour);
    box-shadow: inset 0 0 5px rgba(0, 0, 0, .5);
  }

  #piano-controller {
    grid-area: piano-right;
    background: var(--secondary-bg-colour);
  }
</style>