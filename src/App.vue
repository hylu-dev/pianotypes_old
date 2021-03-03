<template>
  <div class="title-panel">
    <h1>pianotype</h1>
  </div>

  <div class="midi-keyboard-container">
    <div class="ribbon-panel-wrapper">
      <ribbon-panel></ribbon-panel>
    </div>

    <div class="keyboard-wrapper">
      <piano-keyboard></piano-keyboard>
    </div>
  </div>


  

</template>

<script>
import PianoKeyboard from './components/PianoKeyboard'
import RibbonPanel from './components/RibbonPanel'

export default {  
  name: 'App',
  data() {
    return {}
  },
  components: {
    PianoKeyboard,
    RibbonPanel
  }
}
</script>

<style>
  #app {
    -webkit-font-smoothing: antialiased;
    -moz-osx-font-smoothing: grayscale;
    text-align: center;
  }

  .title-panel {
    background: #222;
    width: 100%;
    height: 8vh;
    font-size: calc(1vh*2);
    display: flex;
    justify-content: left; /* align horizontal */
    align-items: center; /* align vertical */
    box-sizing: border-box;
    padding-left: 3%;
    margin-bottom: 50px;
  }

  .midi-keyboard-container {
    position: absolute;
    display: flex;
    flex-flow: column;
    justify-content: center;
    width: 100%;
    bottom: 0;
    z-index: -1;
  }

  .keyboard-wrapper {
    align-self: center;
  }

  .ribbon-panel-wrapper {
    align-self: center;
  }



</style>
