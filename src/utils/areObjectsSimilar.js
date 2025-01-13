export const areObjectsSimilar = (initialForm, currentForm) => {
  return JSON.stringify(initialForm) == JSON.stringify(currentForm)
}
