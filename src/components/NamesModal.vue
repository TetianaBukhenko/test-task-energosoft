<script>
export default {
  name: 'NamesModal',
  props: {
    clients: Array,
    selectedClient: Object,
  },
  data() {
    return {
      querty: ''
    }
  },
  emits: ['selectClient'],
  mounted() {
    console.log(this.clients);
  },
  computed: {
    filteredClients() {
      return this.clients.filter((client) => {
        const normalizedQuerty = this.querty.toLowerCase();
        return client.firstName.toLowerCase().includes(normalizedQuerty) || client.lastName.toLowerCase().includes(normalizedQuerty);
      })
    },
  }


}
</script>
<template>
  <div
    class="modal fade"
    id="exampleModal"
    tabindex="-1"
    aria-labelledby="exampleModalLabel"
    aria-hidden="true"
  >
    <div class="modal-dialog">
      <div class="modal-content">
        <div class="modal-header">
          <h5 class="modal-title" id="exampleModalLabel">Всі замовники</h5>
          <button
            type="button"
            class="btn-close"
            data-bs-dismiss="modal"
            aria-label="Close"
          ></button>
        </div>
        <div class="modal-body">
          <div class="input-group mb-3">
            <input
              class="form-control mr-sm-2"
              type="search"
              placeholder="Пошук"
              aria-label="Пошук"
              v-model="querty"
            />
          </div>
          <ul class="dropdown m-0 p-0 overflowY-scroll">
            <li
              v-for="client of filteredClients"
              :key="client.applicationNumber"
              class="dropdown-item"
              :class="{
                'bg-secondary':
                  selectedClient && selectedClient.applicationNumber == client.applicationNumber,
              }"
              @click="$emit('selectClient', client)"
            >
              {{ `${client.lastName} ${client.firstName}` }}
            </li>
          </ul>
        </div>
        <div class="modal-footer">
          <button type="button" class="btn btn-secondary" data-bs-dismiss="modal">Закрити</button>
        </div>
      </div>
    </div>
  </div>
</template>
<style></style>
