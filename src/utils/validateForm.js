import { errorMessages } from '@/constants/errorMessages'
import { validationRules } from '@/constants/validationRules'

export const validateForm = (form) => {
  const errors = {}
  errors.applicationNumber = validationRules.required(
    form.applicationNumber,
    errorMessages.applicationNumber,
  )
  errors.creationDate = validationRules.required(form.creationDate, errorMessages.creationDate)

  errors.reason = validationRules.required(form.reason, errorMessages.reason)

  errors.power = validationRules.minValue(form.power, 1, errorMessages.power)

  errors.fullName = validationRules.required(form.firstName, errorMessages.name)
  errors.file = validationRules.required(form.file, errorMessages.file)

  Object.keys(errors).forEach((key) => {
    if (errors[key] === null) {
      delete errors[key]
    }
  })

  return errors
}
