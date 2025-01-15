<script>
import { useApplicationsStore } from '@/stores/applications'
import { filterApplications } from '@/utils/filterApplications'
import { formatDate } from '@/utils/formatDate'
import { generateFileUrl } from '@/utils/generateFileUrl'

export default {
  setup() {
    const store = useApplicationsStore()
    return { store }
  },

  data() {
    return {
      start: '',
      end: '',
    }
  },
  computed: {
    applications() {
      console.log(this.store.applications);

      return this.store.applications
    },

    filteredApplications() {

      console.log(this.applications);

      return filterApplications({
        start: this.start,
        end: this.end,
        applications: this.applications,
      })
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
  },
}
</script>
<template>
  <section class="px-3" v-if="filteredApplications.length > 0">
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
            <th scope="col" style="width: 10%">Номер заяви</th>
            <th scope="col" style="width: 15%">Дата створення</th>
            <th scope="col" style="width: 15%">Замовник</th>
            <th scope="col" style="width: 20%">Причина звернення</th>
            <th scope="col" style="width: 15%">Об'єм потужностей</th>
            <th scope="col" style="width: 10%">Файл</th>
            <th scope="col" style="width: 10%">Коментар</th>
          </tr>
        </thead>
        <tbody>
          <tr
            v-for="application in filteredApplications"
            :key="application.applicationNumber"
            @dblclick="goToEdit(application.applicationNumber)"
            style="cursor: pointer"
          >
            <td>{{ application.applicationNumber }}</td>
            <td>{{ application.creationDate }}</td>
            <td>{{ application.lastName + ' ' + application.firstName }}</td>
            <td>{{ application.reason }}</td>
            <td>{{ application.power }}</td>
            <td>
              <a v-if="application.file && application.file.name" :href="getFileLink(application.file)" target="_blank">
                {{ application.file.name }}
              </a>
            </td>
            <td>{{ application.comment }}</td>
          </tr>
        </tbody>
      </table>
    </div>
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
</style>
