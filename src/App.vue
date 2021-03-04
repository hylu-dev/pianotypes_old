<template>
  <div class="title-panel">
    <div class="author-links">Placeholder</div>
    <h1>pianotype</h1>
    <div class="settings">
      <router-link to="/Settings">
        <svg xmlns="http://www.w3.org/2000/svg" width="20" height="20" fill="currentColor" class="bi bi-gear-fill" viewBox="0 0 16 16">
          <use href="/assets/icons.svg#gear-fill"/>
        </svg>
      </router-link>
    </div>
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
    background: var(--main-bg-colour);
    width: 100%;
    height: 60px;
    font-size: 1rem;
    justify-content: space-evenly;
    align-items: center; /* align vertical */
    box-shadow: 0 0 10px black;
    user-select: none;
    padding: 5px;
    line-height: 0;
  }

  .title-panel h1 {
    align-self: center;
    
  }

  .settings {
    display: flex;
    width: 10rem;
    height: 10rem;
    color: white;
  }

  @media only screen and (max-width: 600px) {
    .title-panel {
      padding-left: 5%;
      justify-content: left;
    }
  }

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

