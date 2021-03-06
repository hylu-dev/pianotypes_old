<template>
  <nav>
    <div class="author-links">Placeholder</div>
      <router-link to="/">
        <h1>pianotype</h1>
      </router-link>
    <div class="settings">
      <router-link :to="{ name: 'Settings' }">
        <i class="icofont-options"></i>
      </router-link>
      <i class="icofont-info-circle"></i>
    </div>
  </nav>
  <router-view v-slot="{ Component }">
    <transition name="fade" mode="out-in">
      <component :is="Component" />
    </transition>
  </router-view>    
  
</template>

<script>
export default {  
  name: 'App',
  data() {
    return {}
  },
  components: {}
}
</script>

<style>
  #app {
    -webkit-font-smoothing: antialiased;
    -moz-osx-font-smoothing: grayscale;
    text-align: center;
    overflow: hidden;
  }

  nav {
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

  nav h1 {
    align-self: center;
    font-size: 1.7rem;
  }

  nav a.router-link-exact-active {
    color: var(--primary-text-colour);
  }

  .settings {
    display: flex;
    justify-content: space-evenly;
    font-size: 2rem;
  }

  .icofont-options, .icofont-info-circle {
    display: inline-block;
    transition: all 0.3s ease-in;
  }

  .icofont-options:hover {
    color: var(--primary-text-colour);
    transform: rotate(90deg);
  }

  .icofont-info-circle:hover {
    color: var(--primary-text-colour);
    transform: rotate(-360deg);
  }

  .fade-enter-active, .fade-leave-active {
    transition: all .5s ease-in-out;
  }
  .fade-enter, .fade-leave-to {
    opacity: 0;
    transform: translateX(5em);
  }

  @media only screen and (max-width: 600px) {
    .title-panel {
      padding-left: 5%;
      justify-content: left;
    }
  }
</style>

