
import Vuex from 'vuex'
import Vue from 'vue'
const actions = {
  add({commit}, number) {
    commit('ADD', number)
  }
}
const mutations = {
  ADD(state, number) {
    state.count+= number
  }
}
const state = {
  count: 2
}

Vue.use(Vuex)
export default new Vuex.Store({
  actions,
  mutations,
  state
})