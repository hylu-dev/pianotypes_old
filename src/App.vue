<template>
  <div class="title-panel">
    <h1>PianoType</h1>
  </div>

  <div class="midi-keyboard-container">
    <div class="midi-panel-wrapper">
      <midi-panel></midi-panel>
    </div>

    <div class="keyboard-wrapper">
      <piano-keyboard></piano-keyboard>
    </div>
  </div>


  

</template>

<script>
import PianoKeyboard from './components/PianoKeyboard'
import MidiPanel from './components/MidiPanel'

export default {  
  name: 'App',
  data() {
    return {}
  },
  components: {
    PianoKeyboard,
    MidiPanel
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
    background: #333;
    width: 100%;
    height: 7vh;
    font-size: calc(1vh*2);
    display: flex;
    justify-content: left; /* align horizontal */
    box-shadow: 0 0 10px #111;
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
  }

  .keyboard-wrapper {
    align-self: center;
  }

  .midi-panel-wrapper {
    align-self: center;
  }



</style>
