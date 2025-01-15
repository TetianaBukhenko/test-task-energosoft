import { fakeApplications } from '@/api/fakeApplications'
import { defineStore } from 'pinia'

export const useApplicationsStore = defineStore('applications', {
  state: () => ({
    applications: fakeApplications,
  }),

  actions: {
    saveApplicationsToLocalStorage() {
      localStorage.setItem('applications', JSON.stringify(this.applications))
    },

    getApplicationById(id) {
      console.log(this.applications)

      return this.applications.find((app) => app.applicationNumber === +id)
    },

    addNewApplication(newApplication) {
      const uniqueId = Math.random().toString().slice(2, 12)
      this.applications.push({ ...newApplication, id: uniqueId })
      this.saveApplicationsToLocalStorage()
    },

    editApplication(applicationId, data) {
      this.applications = this.applications.map((application) => {
        if (application.id === applicationId) {
          return { ...application, ...data }
        }
        return application
      })
      this.saveApplicationsToLocalStorage()
    },

    createFiftyApplications() {
      if (!this.applications.length) {
        return []
      }

      const firstApplication = this.applications[0]
      const generatedApps = new Array(50).fill(firstApplication).map((el, index) => {
        const date = new Date(el.creationDate)
        date.setDate(date.getDate() + index * 3)
        const uniqueIndex = Math.random().toString().slice(2, 12)
        console.log(el.file.name)

        return {
          ...el,
          id: uniqueIndex,
          applicationNumber: index,
          creationDate: new Date(date).toLocaleDateString('hi-IN'),
        }
      })

      this.applications = [...this.applications, ...generatedApps]
      this.saveApplicationsToLocalStorage()

      return generatedApps
    },
  },
})
