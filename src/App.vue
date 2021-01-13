<template>
  <div id="app">
    <Toolbar/>
    <md-content class="md-transparent">
      <router-view />
    </md-content>
  </div>
</template>

<script>
  import Toolbar from './components/Toolbar.vue'
  export default {

    name: 'App',
    components: {
      Toolbar
    },
  }
</script>

<style lang="scss">
  @import url('https://fonts.googleapis.com/css2?family=Open+Sans&display=swap');
  @import url('https://fonts.googleapis.com/icon?family=Material+Icons');
  @import "~vue-material/dist/theme/engine"; // Import the theme engine
  @import "./styles/_variables.scss";
  @include md-register-theme("default", (primary: $hp-blue, // The primary color of your brand
      accent: $hp-red // The secondary color of your brand
    ));

  @import "~vue-material/dist/theme/all";

  #app {
    font-family: Open Sans;
    -webkit-font-smoothing: antialiased;
    -moz-osx-font-smoothing: grayscale;
  }
</style>