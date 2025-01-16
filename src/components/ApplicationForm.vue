<script>
import { areObjectsSimilar } from '@/utils/areObjectsSimilar'
import { formatDate } from '@/utils/formatDate'
import { generateFileUrl } from '@/utils/generateFileUrl'
import { validateFile } from '@/utils/validateFile'
import { validateForm } from '@/utils/validateForm'
import { store } from '@/stores/store'

const initialFormState = {
  applicationNumber: '',
  creationDate: '',
  reason: '',
  power: '',
  firstName: '',
  lastName: '',
  address: '',
  comment: '',
  clientId: '',
  file: null,
}

export default {

  data() {
    return {
      form: initialFormState,
      initialForm: {},
      errors: {},
      isEditing: false,
      selectedClient: null,
      query: '',
      suggestions: [],
      selectedCity: null,
    }
  },

  computed: {
    applications: () => {
      return store.state.applications
    },
  },

  beforeRouteLeave(to, from, next) {
    this.clearForm()
    next()
  },
  mounted() {
    this.clearForm()
    const { id } = this.$route.params
    if (id) {
      this.isEditing = true
      let selectedEl = store.getters.getApplicationById(id)

      if (selectedEl) {
        this.form = selectedEl
      }
      this.initalForm = selectedEl
    }
  },

  unmounted() {
    this.clearForm()
  },

  methods: {
    clearForm() {
      this.form = { ...initialFormState }
      this.errors = {}
      this.selectedClient = null
      this.isEditing = false
    },

    handleFileUpload(event) {
      const file = event.target.files[0]

      const validation = validateFile(file)

      if (!validation.valid) {
        this.errors.file = validation.error
        this.form.file = null
        this.filePreviewUrl = null
        return
      }

      this.form.file = file
      this.errors.file = null

      this.filePreviewUrl = generateFileUrl(file)
    },

    handleSubmit() {
      const errors = validateForm(this.form)

      const isFormInvalid = Object.values(errors).some((err) => err.length > 0)

      if (isFormInvalid) {
        this.errors = errors
        return
      }

      if (this.isEditing && !areObjectsSimilar(this.initialForm, this.form)) {
        alert('Заява успішно оновлена!')
        store.dispatch('editApplication', this.form)
        this.$router.push('../../')
        return
      }

      this.isEditing = false

      if (!this.isEditing) {
        store.dispatch('addNewApplication', this.form)
        alert('Заява успішно відправлена!')
        this.$router.push('../')
      }
    },

    updateDate(e) {
      this.form.creationDate = formatDate.ISOtoUA(e.target.value)
      this.errors.creationDate = ''
    },

    changeClient(e) {
      this.selectedClient = e
      this.form.firstName = e.firstName
      this.form.lastName = e.lastName
      this.form.clientId = e.clientId
      this.errors.firstName = ''
    },
  },
}
</script>

<template>
  <section class="row justify-content-center mw-100 py-5">
    <form @submit.prevent="handleSubmit" class="col-9 col-lg-5 pt-2" novalidate>
      <h1 class="mb-3">{{ isEditing ? 'Редагування заяви' : 'Нова заява' }}</h1>
      <div class="form-floating mb-3">
        <input
          v-model="form.applicationNumber"
          type="text"
          class="form-control"
          :class="{ 'is-invalid': errors.applicationNumber }"
          id="applicationNumber"
          placeholder="Номер заяви"
          @change="errors.applicationNumber = ''"
        />
        <label for="applicationNumber">Номер заяви</label>
        <div
          v-if="errors.applicationNumber && errors.applicationNumber.length > 0"
          class="invalid-feedback"
        >
          {{ errors.applicationNumber }}
        </div>
      </div>

      <div class="form-floating mb-3 d-flex position-relative w-100">
        <input
          class="form-control bg-white"
          :value="form.creationDate"
          readOnly
          type="text"
          id="creationDate"
          placeholder="dd/mm/yyyy"
        />
        <label for="creationDate">Дата створення</label>
        <input type="date" class="date" @change="updateDate" />
        <div v-if="errors.creationDate" class="invalid-feedback">
          {{ errors.creationDate }}
        </div>
      </div>

      <div class="form-floating mb-3">
        <select
          v-model="form.reason"
          class="form-select"
          :class="{ 'is-invalid': errors.reason }"
          id="reason"
          @change="errors.reason = ''"
        >
          <option disabled value="">Оберіть причину звернення:</option>
          <option value="Нове підключення">Нове підключення</option>
          <option value="Збільшення існуючої потужності">Збільшення існуючої потужності</option>
        </select>
        <label for="reason">Причина звернення</label>
        <div v-if="errors.reason" class="invalid-feedback">
          {{ errors.reason }}
        </div>
      </div>

      <div class="form-floating mb-3">
        <input
          v-model="form.power"
          type="number"
          step="100"
          min="0"
          class="form-control"
          :class="{ 'is-invalid': errors.power }"
          id="power"
          placeholder="Об'єм потужностей"
          @change="errors.power = ''"
        />
        <label for="power">Об'єм потужностей (кВт)</label>
        <div v-if="errors.power" class="invalid-feedback">
          {{ errors.power }}
        </div>
      </div>

      <div class="d-flex gap-3 mb-3">
        <div class="form-floating flex-grow-1">
          <input
            v-model="form.firstName"
            type="text"
            class="form-control"
            :class="{ 'is-invalid': errors.firstName }"
            id="applicationNumber"
            placeholder="Ім'я"
            @change="errors.firstName = ''"
          />
          <label for="applicationNumber">Ім'я</label>
          <div v-if="errors.firstName" class="invalid-feedback">
            {{ errors.firstName }}
          </div>
        </div>

        <div class="form-floating flex-grow-1">
          <input
            v-model="form.lastName"
            type="text"
            class="form-control"
            :class="{ 'is-invalid': errors.lastName }"
            id="applicationNumber"
            placeholder="Прізвище"
            @change="errors.lastName = ''"
          />
          <label for="applicationNumber">Прізвище</label>
          <div v-if="errors.firstName" class="invalid-feedback">
            {{ errors.lastName }}
          </div>
        </div>
      </div>

      <div class="form-floating mb-3">
        <input
          v-model="form.address"
          type="text"
          class="form-control"
          :class="{ 'is-invalid': errors.adress }"
          id="applicationNumber"
          placeholder="Адреса "
          @change="errors.adress = ''"
        />
        <label for="applicationNumber">Адреса</label>
        <div v-if="errors.adress" class="invalid-feedback">
          {{ errors.adress }}
        </div>
      </div>

      <div class="form-floating mb-3">
        <textarea
          v-model="form.comment"
          class="form-control"
          id="comment"
          placeholder="Leave a comment here"
        ></textarea>
        <label for="comment">Коментар</label>
      </div>

      <div class="mb-3 row">
        <div class="col-4 d-flex flex-column">
          <input
            type="file"
            id="fileInput"
            class="d-none col-3"
            accept=".pdf,.doc,.docx"
            @change="handleFileUpload"
            :class="{ 'is-invalid': errors.file }"
          />

          <label
            for="fileInput"
            class="btn btn-secondary me-2"
            :class="{ 'btn-danger': errors.file }"
          >
            Оберіть файл
          </label>
        </div>
        <div v-if="filePreviewUrl" class="mb-3 col-auto">
          <a class="btn btn-outline-primary me-2" :href="filePreviewUrl" target="_blank"
            >Переглянути файл</a
          >

          <p v-if="form.file.name">{{ form.file.name }}</p>
        </div>
      </div>

      <button class="btn btn-primary">{{ isEditing ? 'Оновити' : 'Надіслати' }}</button>
    </form>
  </section>
</template>

<style></style>
