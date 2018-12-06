export const state = () => ({
  username: '',
  users: []
})

export const getters = {
  getUser: state => state.username,
  getUsers: state => {
    const users = state.users.filter(user => {
      const username = sessionStorage.getItem('username')
      console.log('Username:', username)
      return user !== username
    })
    console.log('[Vuex] Users:')
    return users
  }
}

export const mutations = {
  mutateUser: (state, username) => {
    state.username = username
  },
  mutateUsers: (state, users) => {
    state.users = users
  }
}

export const actions = {
  updateUser: ({ commit }, username) => commit('mutateUser', username),
  updateUsers: ({ commit }, users) => commit('mutateUsers', users),
  socket_userConnected: ({ commit }, { uname, users }) => commit('mutateUsers', users),
  socket_userDisconnected: ({ commit }, { users }) => commit('mutateUsers', users)
}