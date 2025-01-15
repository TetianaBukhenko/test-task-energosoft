import { fakeApplications } from '@/api/fakeApplications'
import { createStore } from 'vuex'

export const store = createStore({
  state: {
    applications: fakeApplications,
  },
  getters: {
    getApplicationById: (state) => (id) => {
      return state.applications.find((app) => {
        console.log(app.applicationNumber)
        return app.applicationNumber === Number(id)
      })
    },
    getApplicationsByClient: (state) => (id) => {
      return state.applications.filter((app) => app.clientId === Number(id))
    },
  },

  mutations: {
    ADD_APPLICATION(state, payload) {
      state.applications.push(payload)
    },
    EDIT_APPLICATION(state, payload) {
      state.applications = state.applications.map((application) =>
        application.id === payload.id ? { ...application, ...payload } : application,
      )
    },
    SET_APPLICATIONS(state, applications) {
      state.applications = applications
    },
  },

  actions: {
    addNewApplication({ commit, state }, payload) {
      const uniqueId = Math.random().toString(36).slice(2, 12)
      const newApplication = { ...payload, id: uniqueId }
      commit('ADD_APPLICATION', newApplication)
      this.dispatch('saveApplicationsToLocalStorage', state.applications)
    },

    editApplication({ commit, state }, payload) {
      commit('EDIT_APPLICATION', payload)
      this.dispatch('saveApplicationsToLocalStorage', state.applications)
    },

    saveApplicationsToLocalStorage(_, applications) {
      localStorage.setItem('applications', JSON.stringify(applications))
    },

    loadApplicationsFromLocalStorage({ commit }) {
      const applications = JSON.parse(localStorage.getItem('applications')) || []
      commit('SET_APPLICATIONS', applications)
    },
  },
})
