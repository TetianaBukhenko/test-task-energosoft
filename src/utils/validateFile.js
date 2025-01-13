export const validateFile = (file) => {
  const allowedExtensions = [
    'application/pdf',
    'application/msword',
    'application/vnd.openxmlformats-officedocument.wordprocessingml.document',
  ]

  if (!file) {
    return { error: 'No file provided', valid: false, file: null }
  }

  if (!allowedExtensions.includes(file.type)) {
    return {
      error: 'Допустимі файли: PDF, DOC, DOCX',
      valid: false,
      file: null,
    }
  }

  return { error: null, valid: true, file }
}

export function generateFilePreviewUrl(file) {
  if (!file) return null
  return URL.createObjectURL(file)
}
