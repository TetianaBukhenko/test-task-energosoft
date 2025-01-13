export const validationRules = {
  required: (value, message) => (value ? null : message),
  minValue: (value, min, message) => (value >= min ? null : message),
  // file: (value, message) =>
  //   value && ['pdf', 'doc', 'docx'].includes(value.split('.').pop().toLowerCase())
  //     ? null
  //     : message,
}
