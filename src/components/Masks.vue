<template>
    <div>
        <FilterMasks/>
                    <div class="legend">
                <span>Double click to mark as complete</span>
                <span ><span class="incomplete-box"></span> = Incomplete</span>
                <span ><span class="complete-box"></span> = Complete</span>
            </div>
        <div class="masks">

            <div @dblclick="onDblClick(todo)" class="mask" v-for="todo in allTodos" v-bind:key="todo.id" v-bind:class="{'is-complete':todo.completed}">
                {{todo.title}}
                <span class="delete" v-on:click="deleteTodo(todo.id)">
                    <md-icon>delete_forever</md-icon>
                </span>

            </div>
        </div>
    </div>
</template>

<script>
    import {mapGetters,mapActions} from 'vuex'
    import FilterMasks from './FilterMasks.vue'
    
    export default {
        name: 'Masks',
        components: {FilterMasks},
        computed: mapGetters(['allTodos']),
        methods: {
            ...mapActions(['fetchTodos', 'deleteTodo', 'updateTodo']),
            onDblClick(todo){
                const updTodo = {
                    id: todo.id,
                    title: todo.title,
                    completed: !todo.completed
                }
                this.updateTodo(updTodo)
            }
        },
        created() {
            this.fetchTodos()
        }
    }
</script>

<style lang="scss" scoped>
    .masks {
        display: grid;
        grid-template-columns: repeat(3, 1fr);
        grid-gap: 1rem;
    }

    .mask {
        padding: 1rem;
        border-radius: 5px;
        text-align: center;
        position: relative;
        background: #41b883;
        &.is-complete{
            background: #35495e;
        }

    }

    .md-icon {
        cursor: pointer;
    }
    .legend{
        display: flex;
        justify-content: space-around;
        margin-bottom: 1rem;
    }
    .complete-box{
        display: inline-block;
        width: 10px;
        height: 10px;
        background: #35495e;
    }    
    .incomplete-box{
        display: inline-block;
        width: 10px;
        height: 10px;
        background: #41b883;
    }
</style>