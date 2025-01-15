<script>
import { store } from '@/stores/store'
import { generateFileUrl } from '@/utils/generateFileUrl'

export default {
  name: 'SingleClientModаl',
  props: {
    selectedClient: Number,
  },
  emits: ['closeModаl'],
  data() {},
  computed: {
    clientOrders() {
      return store.getters.getApplicationsByClient(this.selectedClient)
    },
    clientName() {
      if (!this.clientOrders[0]) {
        return
      }
      return `${this.clientOrders[0].firstName} ${this.clientOrders[0].lastName}`
    },
  },
  methods: {
    closeModаl() {
      this.$emit('closeModаl')
    },

    getFileLink(file) {
      return generateFileUrl(file)
    },
  },
}
</script>
<template>
  <div class="modal d-block">
    <div class="modal-dialog" style="max-width: fit-content">
      <div class="modal-content p-5">
        <div class="modal-header border-0">
          <h5 class="modal-title" id="exampleModalLabel">Замовленя клієнта: {{ clientName }}</h5>
          <button
            type="button"
            class="btn-close"
            data-bs-dismiss="modal"
            aria-label="Close"
            @click="closeModаl"
          ></button>
        </div>
        <div class="modal-body  ">
          <table class="table table-bordered">
            <thead>
              <tr class=" ">
                <th scope="col" style="width: 10%">Номер заяви</th>
                <th scope="col" style="width: 15%">Дата створення</th>
                <th scope="col" style="width: 20%">Причина звернення</th>
                <th scope="col" style="width: 15%">Об'єм потужностей</th>
                <th scope="col" style="width: 10%">Файл</th>
                <th scope="col" style="width: 10%">Коментар</th>
              </tr>
            </thead>
            <tbody>
              <tr
                v-for="application in clientOrders"
                :key="application.applicationNumber"
                @dblclick="goToEdit(application.applicationNumber)"
                style="cursor: pointer"
              >
                <td>{{ application.applicationNumber }}</td>
                <td>{{ application.creationDate }}</td>
                <td>{{ application.reason }}</td>
                <td>{{ application.power }}</td>
                <td>
                  <a
                    v-if="application.file && application.file.name"
                    :href="getFileLink(application.file)"
                    target="_blank"
                  >
                    {{ application.file.name }}
                  </a>

                  <p v-else>Файл не прикріплено</p>
                </td>
                <td>{{ application.comment }}</td>
              </tr>
            </tbody>
          </table>
        </div>
        <div class="modal-footer border-0">
          <button
            type="button"
            class="btn btn-secondary"
            @click="closeModаl"
            data-bs-dismiss="modal"
          >
            Закрити
          </button>
        </div>
      </div>
    </div>
  </div>
</template>
<style></style>
