<script>
import { filterApplications } from '@/utils/filterApplications'
import { formatDate } from '@/utils/formatDate'
import { generateFileUrl } from '@/utils/generateFileUrl'
import SingleClientModаl from './SingleClientModal.vue'
import { store } from '@/stores/store'

export default {
  components: { SingleClientModаl },
  data() {
    return {
      start: '',
      end: '',
      selectedClient: 0,
    }
  },
  computed: {
    applications() {
      return store.state.applications
    },

    filteredApplications() {
      return filterApplications({
        start: this.start,
        end: this.end,
        applications: this.applications,
      })
    },
  },

  watch: {
    selectedClient() {
      console.log(this.selectedClient)
    },
  },

  methods: {
    updateStartDate(e) {
      this.start = formatDate.ISOtoUA(e.target.value)
    },
    updateEndDate(e) {
      this.end = formatDate.ISOtoUA(e.target.value)
    },

    normalizeDate(dateString) {
      return formatDate.UAtoISO(dateString)
    },

    getFileLink(file) {
      return generateFileUrl(file)
    },

    goToEdit(applicationNumber) {
      this.$router.push(`/${applicationNumber}/edit`)
    },

    showApplications(userId) {
      this.selectedClient = userId
    },
  },
}
</script>
<template>
  <section class="container px-3" v-if="filteredApplications.length > 0">
    <div class="py-3">
      <p>Всі заяви в період з:</p>
      <div class="d-flex gap-3">
        <div class="d-flex position-relative">
          <input
            class="form-control bg-white"
            :value="start"
            readOnly
            type="text"
            id="date"
            placeholder="dd/mm/yyyy"
          />
          <input type="date" class="date" :max="normalizeDate(end)" @change="updateStartDate" />
        </div>
        <div class="d-flex position-relative">
          <input
            class="form-control bg-white"
            :value="end"
            readOnly
            type="text"
            id="date"
            placeholder="dd/mm/yyyy"
          />
          <input type="date" :min="normalizeDate(start)" class="date" @change="updateEndDate" />
        </div>
      </div>
    </div>
    <div class="table-responsive">
      <table class="table table-hover">
        <thead>
          <tr class=" ">
            <th scope="col" style="width: 15%">Дата створення</th>
            <th scope="col" style="width: 15%">Замовник</th>
            <th scope="col" style="width: 15%">Адреса замовника</th>
            <th scope="col" style="width: 15%">Об'єм потужностей</th>
          </tr>
        </thead>
        <tbody>
          <tr
            v-for="application in filteredApplications"
            :key="application.applicationNumber"
            @dblclick="showApplications(application.clientId)"
            style="cursor: pointer"
          >
            <td>{{ application.creationDate }}</td>
            <td >
              {{ application.lastName + ' ' + application.firstName }}
            </td>
            <td>{{ application.address }}</td>
            <td>
              {{ application.power }}
            </td>
          </tr>
        </tbody>
      </table>
    </div>
    <SingleClientModаl
      v-if="selectedClient > 0"
      :selectedClient="selectedClient"
      @close-modаl="selectedClient = 0"
    />
  </section>

  <div class="text-bold fs-1 py-3 text-center" v-else>
    <p>Нажаль заяв поки немає.</p>
    <RouterLink to="/new" class="nav-link" aria-current="New Application">
      <button class="btn btn-primary me-2">Подати заяву</button>
    </RouterLink>
  </div>
</template>
<style>
.edit-icon {
  height: 20px;
  width: 20px;
  margin: auto;
}

@media print {
  @page {
    size: A4 landscape;
    padding: 24px;
  }

  .table {
    width: 100% !important;
    font-size: 12pt;
  }

  .btn,
  .navbar,
  .footer {
    display: none !important;
  }
}

.control-date {
  min-width: 20%;
  max-width: 200px;
}

.date {
  width: 20px;
  outline: none;
  border: none;
  position: absolute;
  transform: scale(1.2);
  right: 20px;
  top: 25%;
  background-color: #fff;
}

.name-link:hover {
  font-weight: 600;
}
</style>
