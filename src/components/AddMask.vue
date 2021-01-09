<template>
    <div class="add">
        <form @submit="onSubmit">
            <input type="text" v-model="title" placeholder="Add todos">
            <input type="submit" value="Submit">
        </form>
    </div>
</template>

<script>
    import {
        mapActions
    } from 'vuex'
    export default {
        name: 'AddTodos',
        methods: {
            ...mapActions(['addTodo']),
            onSubmit(e) {
                e.preventDefault();
                this.addTodo(this.title)
            }
        },
        data() {
            return {
                title: ''
            }
        }
    }
</script>

<style>
    .todos {
        display: grid;
        grid-template-columns: repeat(3, 1fr);
        grid-gap: 1rem;
    }

    .todo {
        padding: 1rem;
        border-radius: 5px;
        text-align: center;
        position: relative;
        cursor: pointer;
        background: #41b883
    }
</style>