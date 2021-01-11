<template>
  <div id="app">
    <md-toolbar md-elevation="1">
      <router-link class="nav-item" to="/"><img alt="helloprint" src="./assets/hp.svg"></router-link>
      <router-link class="nav-item" to="/add">Add a new mask</router-link>
    </md-toolbar>
    <md-content class="md-transparent">
      <router-view />
    </md-content>
  </div>
</template>

<script>
  export default {
    name: 'App'
  }
</script>

<style lang="scss">
  @import url('https://fonts.googleapis.com/css2?family=Open+Sans&display=swap');
  @import url('https://fonts.googleapis.com/icon?family=Material+Icons');
  @import "~vue-material/dist/theme/engine"; // Import the theme engine

  @include md-register-theme("default", (
      primary: #004B78, // The primary color of your brand
      accent: #F11A1A // The secondary color of your brand
    ));

  @import "~vue-material/dist/theme/all";

  #app {
    font-family: Open Sans;
    -webkit-font-smoothing: antialiased;
    -moz-osx-font-smoothing: grayscale;

    .nav-item {
      &:nth-of-type(1) {
        margin-right: 20px;
      }

      &:nth-of-type(2) {
        margin-top: 10px;

        color: #004B78;
        font-weight: bold;

        &:hover {
          color: #F11A1A;
        }

        &.router-link-active {
          display: none;
        }
      }

    }
  }
</style>