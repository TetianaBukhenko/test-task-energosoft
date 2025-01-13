'use strict'

import { formatDate } from './formatDate'

export const filterApplications = ({ start, end, applications }) => {
  if (!start && !end) {
    return applications
  }

  const normalizedStart = start ? formatDate.UAtoDateObject(start) : null
  const normalizedEnd = end ? formatDate.UAtoDateObject(end) : null

  return applications.filter((app) => {
    const normalizedDate = formatDate.UAtoDateObject(app.creationDate)

    if (normalizedStart && !normalizedEnd) {
      return normalizedDate >= normalizedStart
    }

    if (!normalizedStart && normalizedEnd) {
      return normalizedDate <= normalizedEnd
    }

    return normalizedDate >= normalizedStart && normalizedDate <= normalizedEnd
  })
}
