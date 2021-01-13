<template>
    <div>
        <div class="md-layout md-gutter">
            <div class="md-layout-item">
                <md-field id="filter-field">
                    <label for="filter">Filter by:</label>
                    <md-select v-model="filter.filterBy" name="filter" id="filter" placeholder="Filter by"
                        @md-selected="filterMasks">
                        <md-option value="" v-if="filter.filterBy"></md-option>
                        <md-option v-for="filterVal in filters" :key="filterVal" :value="filterVal.toLowerCase()">
                            {{filterVal}}</md-option>
                    </md-select>
                </md-field>
            </div>
            <div class="md-layout-item">
                <md-field id="filter-field">
                    <label for="tags">Tags:</label>
                    <md-select v-model="filter.tags" name="tags" id="tags" placeholder="Tags" @md-selected="filterMasks"
                        multiple>
                        <md-option v-for="tag in tags" :key="tag" :value="tag">{{tag}}</md-option>
                    </md-select>
                </md-field>
            </div>
            <div class="md-layout-item">
                <md-field id='number-field'>
                    <label for="number">Show:</label>
                    <md-select v-model="filter.limit" name="number" id="number" @md-selected="filterMasks">
                        <md-option value="" v-if="filter.limit">All</md-option>
                        <md-option v-for="number in limits" :key="number" :value="number">{{number}}</md-option>
                    </md-select>
                </md-field>
            </div>
        </div>
    </div>
</template>

<script>
    import {mapActions} from 'vuex'
    export default {
        name: 'FilterMasks',
        data: () => ({
            filter: {
                limit: null,
                filterBy: '',
                tags: []
            },
            limits: [10, 5, 3, 2, 1],
            filters: ["Name", "Price", "Date"],
            tags: ["Microfiber", "Light", "Polyester", "Double Layer", "Closed", "Triple Layer", "For Kids"]
        }),
        methods: {
            ...mapActions(['fetchMasks']),
            filterMasks() {
                this.fetchMasks(this.filter)
            }
        }

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