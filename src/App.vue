<template>
  <div class="vertical-flex-container">
    <nav>
      <div class="author-links">

      </div>

      <div class="title-link">
        <router-link to="/">
          <h1>pianotypes</h1>
        </router-link>
      </div>

      <div class="menu-container">
        <router-link :to="{ name: 'Settings' }">
          <i class="icon-options"></i> 
        </router-link>
        <router-link :to="{ name: 'About' }">
          <i class="icon-info"></i>
        </router-link>
      </div>

    </nav>

    <div class="vertical-flex-child">
      <router-view v-slot="{ Component }">
        <transition name="fade" mode="out-in">
          <component :is="Component" />
        </transition>
      </router-view>
    </div>
  </div>
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
  }

  .vertical-flex-container {
    display: flex;
    flex-flow: column;
    height: 100vh;
  }

  .vertical-flex-child {
    flex: 1 0 auto;
  }

  nav {
    display: flex;
    background: var(--secondary-bg-colour);
    border: none;
    width: 100%;
    height: 60px;
    font-size: 1rem;
    justify-content: space-around;
    align-items: center; /* align vertical */
    box-shadow: 0 0 10px black;
    user-select: none;
    padding: 5px;
    line-height: 0;
    z-index: 3;
  }

  nav h1 {
    align-self: center;
    font-size: 1.7rem;
  }

  nav h1:focus {
    outline: 4px solid var(--primary-text-colour);
  }

  nav a.router-link-active {
    color: var(--primary-text-colour);
  }

  nav .menu-container a{
    transition: all .4s ease-in-out;
  }

  nav a:focus {
    outline: none;
    text-decoration: underline;
    color: var(--primary-text-colour);
    transform: scale(1.1);
  }

  .author-links {
    display: flex;
  }

  .menu-container {
    display: flex;
    justify-content: flex-end;
    font-size: 2rem;
    gap: 1rem;
  }

  .icon-options, .icon-info {
    display: inline-block;
    transition: all .4s ease-in-out;
  }

  .icon-options:hover {
    color: var(--primary-text-colour);
    transform: rotate(90deg);
  }

  .icon-info:hover {
    color: var(--primary-text-colour);
    transform: rotate(360deg);
  }

  .fade-enter-active, .fade-leave-active {
    transition: all .3s ease-in-out;
  }
  .fade-enter-from, .fade-leave-to {
    opacity: 0;
    transform: translateY(5em);
  }

  @media only screen and (max-width: 600px) {
    .title-panel {
      padding-left: 5%;
      justify-content: left;
    }
  }
</style>

