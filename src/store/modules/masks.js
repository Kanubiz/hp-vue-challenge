import {
    get,
    post,
    put,
    del
} from '../../services/api'
const state = {
    masks: []
};

const getters = {
    allMasks: (state) => state.masks,
    getMask: (state) => (id) => state.masks.find(mask => mask._id === id),
};

const actions = {
    async fetchMasks({
        commit
    }, filter) {
        const response = await get()
        var masks = response.data

        if (filter) {
            masks = filter.limit ? masks.slice(0, filter.limit) : masks
            masks.sort((a, b) => {
                if (filter.filterBy == 'price') {
                    a[filter.filterBy] = parseInt(a[filter.filterBy])
                    b[filter.filterBy] = parseInt(b[filter.filterBy])
                }
                if (a[filter.filterBy] > b[filter.filterBy]) return 1;
                if (b[filter.filterBy] < a[filter.filterBy]) return -1;

                return 0;
            })

            masks = filter.tags.length > 0 ? masks.filter(mask => mask.tags.some(r => filter.tags.includes(r))) : masks
        }
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