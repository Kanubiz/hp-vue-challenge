import { get, post, put, del } from '../../services/api'
const state = {
    masks: []
};

const getters = {
    allMasks: (state) => state.masks,
    getMask: (state) => (id) => {
        return state.masks.find(mask => mask._id === id)
    },
};

const actions = {
    async fetchMasks({
        commit
    }, limit = 10) {
        const response = await get()
        var masks = response.data.slice(0, limit)
        commit('setMasks', masks)
    },
    async addMask({
        commit
    }, mask) {
        mask.date = new Date()
        const response = await post(mask)
        commit('newMask', response.data)
    },
    async deleteMask({
        commit
    }, mask) {
        await del(mask._id)
        commit('removeMask', mask)
    },

    async updateMask({
        commit
    }, updMask) {
        //TODO
        const cloneMask = JSON.parse(JSON.stringify(updMask));
        const id = cloneMask._id;
        delete cloneMask._id;
        await put(id, cloneMask)
        commit('updateMask', updMask)
    }
};
const mutations = {
    setMasks: (state, masks) => (state.masks = masks),
    newMask: (state, mask) => state.masks.unshift(mask),
    removeMask: (state, delMask) => (state.masks = state.masks.filter(mask => delMask._id !== mask._id)),
    updateMask: (state, updMask) => {
        //TODO
        const index = state.masks.findIndex(mask => mask._id === updMask._id);
        if (index !== -1) {
            state.masks.splice(index, 1, updMask);
        }
    }
};

export default {
    state,
    getters,
    actions,
    mutations
}