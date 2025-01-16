import { createRouter, createWebHistory } from 'vue-router'
import ApplicationForm from '@/components/ApplicationForm.vue'
import ApplicationsTable from '@/components/ApplicationsTable.vue'
import CustomersTable from '@/components/CustomersTable.vue'

const router = createRouter({
  history: createWebHistory(import.meta.env.BASE_URL),
  routes: [
    {
      path: '/',
      name: 'applications',
      component: ApplicationsTable,
    },
    {
      path: '/customers',
      name: 'customers',
      component: CustomersTable,
    },
    {
      path: '/:id/edit',
      name: 'edit',
      component: ApplicationForm,
    },
    {
      path: '/new',
      name: 'new',
      component: ApplicationForm,
    },
  ],
})

export default router
