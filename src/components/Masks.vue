<template>
<div>
    <div class="masks">
        <div class="mask" v-for="todo in allTodos" v-bind:key="todo.id">
            {{todo.title}}
        </div>
    </div>
</div>
</template>

<script>
import { mapGetters, mapActions} from  'vuex'
export default {
    name: 'Todos',
    computed: mapGetters(['allTodos']),
    methods: {
        ...mapActions(['fetchTodos'])
    },
    created(){
        this.fetchTodos()
    }
}
</script>

<style>
.todos{
    display: grid;
    grid-template-columns: repeat(3, 1fr);
    grid-gap: 1rem;
}
.todo{
    padding: 1rem;
    border-radius: 5px;
    text-align: center;
    position: relative;
    cursor: pointer;
    background: #41b883
}
</style>