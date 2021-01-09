<template>
    <div>
        <div class="masks">
            <div class="mask" v-for="todo in allTodos" v-bind:key="todo.id">
                {{todo.title}}
                <span class="delete" v-on:click="deleteTodo(todo.id)">
                    <md-icon>delete_forever</md-icon>
                </span>

            </div>
        </div>
    </div>
</template>

<script>
    import {
        mapGetters,
        mapActions
    } from 'vuex'
    export default {
        name: 'Masks',
        computed: mapGetters(['allTodos']),
        methods: {
            ...mapActions(['fetchTodos', 'deleteTodo'])
        },
        created() {
            this.fetchTodos()
        }
    }
</script>

<style scoped>
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


    }

    .md-icon {
        cursor: pointer;
    }
</style>