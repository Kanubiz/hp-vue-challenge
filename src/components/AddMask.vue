<template>
    <div class="add">
        <form @submit="onSubmit">
            <input type="text" v-model="title" placeholder="Add masks">
            <input type="submit" value="Submit">
        </form>
    </div>
</template>

<script>
    import {
        mapActions
    } from 'vuex'
    export default {
        name: 'AddMasks',
        methods: {
            ...mapActions(['addMask']),
            onSubmit(e) {
                e.preventDefault();
                this.addMask(this.title)
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
        cursor: pointer;
        background: #41b883
    }
</style>