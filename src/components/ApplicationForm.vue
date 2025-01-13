<script>
import { useApplicationsStore } from '@/stores/applications'
import { areObjectsSimilar } from '@/utils/areObjectsSimilar'
import { formatDate } from '@/utils/formatDate'
import { generateFileUrl } from '@/utils/generateFileUrl'
import { validateFile } from '@/utils/validateFile'
import { validateForm } from '@/utils/validateForm'

const initialFormState = {
  applicationNumber: '',
  creationDate: '',
  reason: '',
  power: '',
  firstName: '',
  lastName: '',
  comment: '',
  file: null,
}

export default {
  setup() {
    const store = useApplicationsStore()
    return { store }
  },

  data() {
    return {
      form: initialFormState,
      errors: {},
      isEditing: false,
      filePreviewUrl: null,
      initialForm: {},
    }
  },

  created() {
    const { id } = this.$route.params
    if (id) {
      this.isEditing = true
      const selectedEl = this.store.getApplicationById(id)

      if (selectedEl) this.form = selectedEl
      this.initalForm = selectedEl
    }
  },

  methods: {
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
      console.log(errors, isFormInvalid)

      if (isFormInvalid) {
        this.errors = errors
        return
      }

      if (this.isEditing && !areObjectsSimilar(this.initialForm, this.form)) {
        alert('Заява успішно оновлена!')
        this.store.editApplication(this.form)
        this.form = initialFormState
        this.$router.push('../../')
        this.isEditing = false
      }

      if (!this.isEditing) {
        alert('Заява успішно відправлена!')
        this.store.addNewApplication(this.form)
        this.form = initialFormState
        this.$router.push('../')
      }
    },

    updateDate(e) {
      this.form.creationDate = formatDate.ISOtoUA(e.target.value)
      this.errors.creationDate = ''
    },
  },
}
</script>

<template>
  <section class="row justify-content-center mw-100 py-5">
    <form @submit.prevent="handleSubmit" class="col-9 col-lg-5 pt-2">
      <h1 class="mb-3">{{ isEditing ? 'Редагування заяви' : 'Нова заява' }}</h1>
      <div class="form-floating mb-3">
        <input
          v-model="form.applicationNumber"
          type="number"
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
          step="0.1"
          class="form-control"
          :class="{ 'is-invalid': errors.power }"
          id="power"
          min="0"
          placeholder="Об'єм потужностей"
          @change="errors.power = ''"
        />
        <label for="power">Об'єм потужностей (кВт)</label>
        <div v-if="errors.power" class="invalid-feedback">
          {{ errors.power }}
        </div>
      </div>

      <div class="row gap-3">
        <div class="col">
          <div class="form-floating mb-3">
            <input
              v-model="form.firstName"
              type="text"
              class="form-control"
              :class="{ 'is-invalid': errors.firstName }"
              id="firstName"
              placeholder="Ім'я"
              @change="errors.firstName = ''"
            />
            <label for="firstName">Ім'я</label>
            <div v-if="errors.firstName" class="invalid-feedback">
              {{ errors.firstName }}
            </div>
          </div>
        </div>
        <div class="col">
          <div class="form-floating mb-3">
            <input
              v-model="form.lastName"
              type="text"
              class="form-control"
              :class="{ 'is-invalid': errors.lastName }"
              id="lastName"
              placeholder="Прізвище"
              @change="errors.lastName = ''"
            />
            <label for="lastName">Прізвище</label>
            <div v-if="errors.lastName" class="invalid-feedback">
              {{ errors.lastName }}
            </div>
          </div>
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

          <label for="fileInput" class="btn btn-secondary me-2"> Оберіть файл </label>

          <span class="file-name">
            {{ (form.file && form.file.name) || 'Файл не обрано' }}
          </span>
        </div>
        <div v-if="filePreviewUrl" class="mb-3 col-auto">
          <a class="btn btn-outline-primary me-2" :href="filePreviewUrl" target="_blank"
            >Переглянути файл</a
          >
        </div>

        <div v-if="errors.file" class="invalid-feedback d-block">
          {{ errors.file }}
        </div>
      </div>

      <button class="btn btn-primary">{{ isEditing ? 'Оновити' : 'Надіслати' }}</button>
    </form>
  </section>
</template>

<style></style>
