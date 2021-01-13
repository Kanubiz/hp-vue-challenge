<template>
    <md-toolbar md-elevation="1">
      <router-link class="nav-item" to="/"><img alt="helloprint" src="./../assets/hp.svg"></router-link>
      <router-link class="nav-item" to="/add">Add a new mask</router-link>
    </md-toolbar>
</template>

<script>
  export default {
    name: 'Toolbar'
  }
</script>

<style lang="scss" scoped>
  @import "./../styles/_variables.scss";

  .nav-item {
      &:nth-of-type(1) {
          margin-right: 20px;
      }

      &:nth-of-type(2) {
          margin-top: 10px;

          color: $hp-blue;
          font-weight: bold;

          &:hover {
              color: $hp-red;
          }

          &.router-link-active {
              display: none;
          }
      }

  }
</style>