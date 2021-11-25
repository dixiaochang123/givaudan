const state = {
  // 要购买的商品id列表
  ids: [],
  orders:[]
}

const mutations = {
  SET_IDS(state, ids) {
    state.ids = ids
  },
  OR_DERS(state, orders) {
    state.orders = orders
  }
}

const actions = {
  setIds({ commit, state }, ids) {
    commit('SET_IDS', ids)
    localStorage.setItem('ids', JSON.stringify(ids))
  },
  setOrders({ commit, state }, orders) {
    commit('SET_IDS', orders)
    localStorage.setItem('orders', JSON.stringify(orders))
  }
}

export default {
  namespaced: true,
  state,
  mutations,
  actions
}
