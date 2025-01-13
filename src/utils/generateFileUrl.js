export const generateFileUrl = (file) => {
  if (!file) {
    return null
  }
  return URL.createObjectURL(file)
}
