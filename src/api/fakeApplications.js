import { faker } from '@faker-js/faker'

export const fakeApplications = Array.from({ length: 10 }, () => ({
  applicationNumber: Math.floor(Math.random() * 9000) + 1000,
  comment: 'test',
  creationDate: '14/01/2025',
  file: null,
  firstName: faker.person.firstName(),
  id: faker.number.int({ min: 1000000000, max: 9999999999 }).toString(),
  clientId: Math.floor(Math.random() * 9000) + 1000,
  lastName: faker.person.lastName(),
  address: 'Київ',
  power: faker.number.int({ min: 100000, max: 999999 }),
  reason: 'Нове підключення',
}))
