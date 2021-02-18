<template>
  <div class="title-panel">
    <h1>PianoType</h1>
  </div>
  <div class="keyboard-wrapper">
    <piano-keyboard></piano-keyboard>
  </div>
  

</template>

<script>
import PianoKeyboard from './components/PianoKeyboard'

export default {  
  name: 'App',
  data() {
    return {}
  },
  components: {
    PianoKeyboard
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
    display: flex;
    justify-content: left; /* align horizontal */
    box-shadow: 0 0 10px #111;
    align-items: center; /* align vertical */
    box-sizing: border-box;
    padding-left: 50px;
    margin-bottom: 50px;
  }

  .keyboard-wrapper {
    position: absolute;
    display: flex;
    justify-content: center;
    width: 100%;
    bottom: 0;
  }



</style>
