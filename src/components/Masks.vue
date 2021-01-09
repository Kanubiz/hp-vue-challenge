<template>
<div>
    <div class="masks">
        <div class="mask" v-for="todo in allTodos" v-bind:key="todo.id">
            {{todo.title}}
            <md-icon>delete_forever</md-icon>
        </div>
    </div>
</div>
</template>

<script>
import { mapGetters, mapActions} from  'vuex'
export default {
    name: 'Masks',
    computed: mapGetters(['allTodos']),
    methods: {
        ...mapActions(['fetchTodos'])
    },
    created(){
        this.fetchTodos()
    }
}
</script>

<style scoped>
.masks{
    display: grid;
    grid-template-columns: repeat(3, 1fr);
    grid-gap: 1rem;
}
.mask{
    padding: 1rem;
    border-radius: 5px;
    text-align: center;
    position: relative;
    cursor: pointer;
    background: #41b883
}
</style>