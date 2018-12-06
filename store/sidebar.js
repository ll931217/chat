export const state = () => ({
  minimised: false
})

export const getters = {
  getMinimised: state => state.minimised
}

export const mutations = {
  mutateMinimised: state => state.minimised = !state.minimised
}

export const actions = {
  toggleMini: ({ commit }) => commit('mutateMinimised')
}