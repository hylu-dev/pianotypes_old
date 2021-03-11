<template>
  <div class="midi-keyboard-container">
    <div class="ribbon-panel-wrapper">
      <ribbon-panel v-if="showRibbonPanel" id="ribbon-panel"></ribbon-panel>
    </div>
    <div class="keyboard-wrapper">
      <piano-keyboard id="keyboard"></piano-keyboard>    
    </div>
  </div>
</template>

<script>
import PianoKeyboard from '../components/PianoKeyboard'
import RibbonPanel from '../components/RibbonPanel'

export default {
  name: 'Home',
  data() {
    return {
      showRibbonPanel: true
    }
  },
  components: {
    PianoKeyboard,
    RibbonPanel
  }
}
</script>

<style scoped>
  .midi-keyboard-container {
    display: flex;
    flex-flow: column;
    justify-content: flex-end;
    width: 100%;
    height:100%;
    flex-basis: auto;
    z-index: -1;
  }

  .ribbon-panel-wrapper {
    display: flex;
    flex: 1 1 auto;
    justify-content: center;
  }

  .keyboard-wrapper {
    background: var(--secondary-bg-colour);
    flex: 0 1 auto;
    display: flex;
    justify-content: center;
    width: 100%;
    box-shadow: 0 0 5px black;
  }
</style>