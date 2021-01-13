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
                    <md-select v-model="limit" name="number" id="number" @md-selected="allMasks">
                        <md-option v-for="number in limits" :key="number" :value="number">{{number}}</md-option>
                    </md-select>
                </md-field>
            </div>
        </div>
    </div>
</template>

<script>
    import {mapGetters} from 'vuex'
    export default {
        name: 'FilterMasks',
        methods: mapGetters(['allMasks']),
        data: () => ({
            limit: '10',
            limits: [10, 5, 3, 2, 1],
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