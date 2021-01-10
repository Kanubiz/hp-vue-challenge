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
    }) {
        const response = await axios.get('https://jsonplaceholder.typicode.com/todos')
        commit('setMasks', response.data)
    },
    async addMask({
        commit
    }, title) {
        const response = await axios.post('https://jsonplaceholder.typicode.com/todos', {
            title,
            completed: false
        })
        commit('newMask', response.data)
    },
    async deleteMask({
        commit
    }, id) {
        await axios.delete(`https://jsonplaceholder.typicode.com/todos/${id}`)
        commit('removeMask', id)
    },
    async filterMasks({
        commit
    }, _limit) {
        const limit = parseInt(_limit)
        const response = await axios.get(`https://jsonplaceholder.typicode.com/todos?_limit=${limit}`)
        commit('setMasks', response.data)
    },

    async updateMask({
        commit
    }, updMask) {
        const response = await axios.put(`https://jsonplaceholder.typicode.com/todos/${updMask.id}`, updMask)
        commit('updateMask', response.data)
    }
};
const mutations = {
    setMasks: (state, masks) => (state.masks = masks),
    newMask: (state, mask) => state.masks.unshift(mask),
    removeMask: (state, id) => (state.masks = state.masks.filter(mask => mask.id !== id)),
    updateMask: (state, updMask) => {
        const index = state.masks.findIndex(mask => mask.id === updMask.id)
        if (index !== -1) {
            state.masks.splice(index, 1, updMask)
        }
    }
};

export default {
    state,
    getters,
    actions,
    mutations
}