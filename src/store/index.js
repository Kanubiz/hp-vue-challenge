import Vue from 'vue';
import Vuex from 'vuex';
import masks from './modules/masks'
import { FilterMasks } from "./../components/FilterMasks.vue";

Vue.use(Vuex)
Vue.component('filter-masks', FilterMasks);

export default new Vuex.Store({
    modules: {
        masks
    }
})