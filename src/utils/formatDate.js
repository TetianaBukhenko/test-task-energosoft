export const formatDate = {
  ISOtoUA(dateStr) {
    if (!dateStr) {
      return ''
    }

    const [year, month, day] = dateStr.split('-')
    return `${day}/${month}/${year}`
  },

  UAtoISO(dateStr) {
    if (!dateStr) {
      return ''
    }
    const [day, month, year] = dateStr.split('/')
    return `${year}-${month}-${day}`
  },
  UAtoDateObject(dateStr) {
    if (!dateStr) return null
    const [day, month, year] = dateStr.split('/').map(Number)
    return new Date(year, month - 1, day)
  },
}
