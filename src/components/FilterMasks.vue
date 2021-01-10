<template>
    <div>
        <div class="md-layout md-gutter">

            <div class="md-layout-item">
                <md-field id="filter-field">
                    <label for="filter">Filter by:</label>
                    <md-select v-model="filter" name="filter" id="filter" placeholder="Filter by">
                        <md-option value="australia">Australia</md-option>
                        <md-option value="brazil">Brazil</md-option>
                        <md-option value="japan">Japan</md-option>
                        <md-option value="united-states">United States</md-option>
                    </md-select>
                </md-field>
            </div>
            <div class="md-layout-item">
                <md-field id='number-field'>
                    <label for="number">Show:</label>
                    <md-select v-model="limit" name="number" id="number" placeholder="Show: 200" @md-selected="filterMasks(limit)">
                        <md-option  v-for="number in limits" :key="number" :value="number">{{number}}</md-option>
                    </md-select>
                </md-field>
            </div>
        </div>
    </div>
</template>

<script>
    import {
        mapActions
    } from 'vuex'
    export default {
        name: 'FilterMasks',
        methods: mapActions(['filterMasks']),
        data: () => ({
            limit: '200',
            limits: [200, 100, 50, 20, 10],
            filter: null
        })
    }
</script>

<style lang="scss" scoped>
    .md-field {
        margin-top: 10px;

        &#filter-field {
            max-width: 300px;
            margin-left: 10px;
        }

        &#number-field {
            float: right;
            margin-right: 10px;
            max-width: 110px;
        }

    }
</style>