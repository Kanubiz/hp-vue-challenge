<template>
    <div v-if="allMasks.length>0">
        <FilterMasks />
        <div class="masks">
            <MaskItem v-for="mask in allMasks" :key="mask._id" :mask='mask' />
        </div>
    </div>
    <div v-else>
        <a href="#" class="arrow up">Up</a>
    </div>
</template>

<script>
    import {mapGetters,mapActions} from 'vuex'
    import FilterMasks from './FilterMasks.vue'
    import MaskItem from './MaskItem.vue'
    
    export default {
        name: 'Masks',
        components: {
            FilterMasks,
            MaskItem
        },
        computed: mapGetters(['allMasks']),
        methods: {
            ...mapActions(['fetchMasks']),
        },
        created() {
            this.fetchMasks()
        }
    }
</script>

<style lang="scss" scoped>
  @import "./../styles/_variables.scss";

  .masks {
      display: grid;
      grid-template-columns: repeat(auto-fit, minmax(300px, 1fr));
      grid-gap: 1rem;
      margin-left: 2%;
  }

  @keyframes uparrow {
      0% {
          -webkit-transform: translateY(0);
          opacity: 0.4
      }

      100% {
          -webkit-transform: translateY(-0.4em);
          opacity: 0.9
      }
  }


  .arrow {
      border-color: transparent;
      border-style: solid;
      border-width: 0 2em;
      display: block;
      height: 0;
      margin: 1em auto;
      left: 170px;
      opacity: 0.4;
      text-indent: -9999px;
      transform-origin: 50% 50%;
      width: 0;
      position: absolute;
  }

  .up {
      -webkit-animation: uparrow 0.6s infinite alternate ease-in-out;
      border-bottom: 2em solid $hp-blue;
  }

</style>