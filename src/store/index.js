import Vue from 'vue';
import Vuex from 'vuex';
import masks from './modules/masks'
Vue.use(Vuex)


export default new Vuex.Store({
    modules: {
        masks
    }
})