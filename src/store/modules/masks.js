import axios from 'axios'

const state = {
    masks: []
};

const getters = {
    allMasks: (state) => state.masks
};

const actions = {
    async fetchMasks({
        commit
    }, limit=10) {
        const response = await axios.get('https://crudcrud.com/api/7c52af33b54f4f74ab57d04683679d2c/masks')
        var masks = response.data.slice(0, limit)
        commit('setMasks', masks)
    },
    async addMask({
        commit
    }, mask) {
        mask.date = new Date()
        const response = await axios.post('https://crudcrud.com/api/7c52af33b54f4f74ab57d04683679d2c/masks',mask)
        commit('newMask', response.data)
    },
    async deleteMask({
        commit
    }, mask) {
        await axios.delete(`https://crudcrud.com/api/7c52af33b54f4f74ab57d04683679d2c/masks/${mask._id}`)
        commit('removeMask', mask)
    },

    async updateMask({
        commit
    }, updMask) {
        const cloneMask = JSON.parse(JSON.stringify(updMask));
        const id = cloneMask._id;
        delete cloneMask._id;
        await axios.put(`https://crudcrud.com/api/7c52af33b54f4f74ab57d04683679d2c/masks/${id}`, cloneMask)
        commit('updateMask', updMask)
    }
};
const mutations = {
    setMasks: (state, masks) => (state.masks = masks),
    newMask: (state, mask) => state.masks.unshift(mask),
    removeMask: (state, delMask) => (state.masks = state.masks.filter(mask => delMask._id !== mask._id)),
    updateMask: (state, updMask) => {
        const index = state.masks.findIndex(mask => mask._id === updMask._id);
        if(index !== -1) {
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