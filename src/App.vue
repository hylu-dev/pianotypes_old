<template>
  <div class="title-panel">
    <h1>PianoType</h1>
  </div>
  <div class="keyboard-wrapper">
    <keyboard></keyboard>
  </div>
  

</template>

<script>
import Keyboard from './components/Keyboard'

export default {  
  name: 'App',
  data() {
    return {}
  },
  components: {
    Keyboard
  }
}
</script>

<style>
  #app {
    -webkit-font-smoothing: antialiased;
    -moz-osx-font-smoothing: grayscale;
    text-align: center;
    color: #fff;
  }

  .title-panel {
    background: #333;
    width: 100%;
    display: flex;
    justify-content: left; /* align horizontal */
    box-shadow: 0 0 10px black;
    align-items: center; /* align vertical */
    padding-left: 50px;
    margin-bottom: 50px;
  }

  .keyboard-wrapper {
    position: absolute;
    display: flex;
    justify-content: center;
    width: 100vw;
    bottom: 0;
  }



</style>
