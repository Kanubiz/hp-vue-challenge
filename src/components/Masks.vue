<template>
    <div v-if="allMasks.length>0">
        <FilterMasks/>
        <div class="masks">
             <MaskItem v-for="mask in allMasks" :key="mask._id" :mask='mask'/>
        </div>
    </div>
    <div v-else>
        <span>no masks</span>
    </div>
</template>

<script>
    import {mapGetters,mapActions} from 'vuex'
    import FilterMasks from './FilterMasks.vue'
    import MaskItem from './MaskItem.vue'
    
    export default {
        name: 'Masks',
        components: {FilterMasks, MaskItem},
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
    .masks {
        display: grid;
        grid-template-columns: repeat(auto-fit, minmax(300px, 1fr));
        grid-gap: 1rem;
        margin-left: 2%;
    }
</style>