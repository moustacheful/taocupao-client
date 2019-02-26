import Clock from '../lib/clock'
const firebaseDB = require('../lib/firebase')

export const state = () => ({
  time: 0,
  statuses: {},
  health: {
    heartbeat: 0
  }
})

export const mutations = {
  setTime(state, time) {
    state.time = time
  },

  setHealth(state, heartbeat) {
    state.health = heartbeat
  },

  setStatuses(state, status) {
    state.statuses = status
  }
}

export const actions = {
  startListening(store) {
    const clock = new Clock()
    clock.on('tick', ({ timestamp }) => {
      store.commit('setTime', timestamp)
    })

    firebaseDB.ref().on('value', r => {
      const { health, status } = r.val()

      store.commit('setHealth', health)
      store.commit('setStatuses', status)
    })
  },

  nuxtServerInit(store, context) {
    if (context.req.state) {
      const { health, status } = context.req.state

      store.commit('setTime', Date.now())
      store.commit('setHealth', health)
      store.commit('setStatuses', status)
    }
  }
}
