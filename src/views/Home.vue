<template>
  <div class="midi-keyboard-container">
    <div class="ribbon-panel-wrapper">
      <ribbon-panel v-if="true" id="ribbon-panel"></ribbon-panel>
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
    return {}
  },
  components: {
    PianoKeyboard,
    RibbonPanel
  }
}
</script>

<style scoped>
  .midi-keyboard-container {
    background: var(--main-bg-colour);
    position: absolute;
    display: flex;
    flex-flow: column;
    justify-content: center;
    width: 100%;
    bottom: 0;
    z-index: -1;
  }

  .keyboard-wrapper {
    display: flex;
    justify-content: center;
    width: 100%;
    box-shadow: 0 0 10px black;
  }

  .ribbon-panel-wrapper {
    display: flex;
    justify-content: center;
  }
</style>