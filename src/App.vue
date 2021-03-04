<template>
  <div class="title-panel">
    <div class="author-links">Placeholder</div>
    <h1>pianotype</h1>
    <div class="settings">Settings</div>
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
    display: flex;
    background: #222;
    width: 100%;
    height: 60px;
    font-size: 1rem;
    justify-content: space-evenly;
    align-items: center; /* align vertical */
    padding-bottom: 5px;
    box-shadow: 0 0 10px black;
    user-select: none;
  }

  .title-panel h1 {
    align-self: center;
  }


  @media only screen and (max-width: 600px) {
    .title-panel {
      padding-left: 5%;
      justify-content: left;
    }
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
