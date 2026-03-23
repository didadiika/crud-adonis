import { BaseSeeder } from '@adonisjs/lucid/seeders'
import Faculties from '#models/faculties'
import { faker } from '@faker-js/faker'
import { DateTime } from 'luxon'

export default class extends BaseSeeder {
  async run() {
    const data = []

    for (let i = 0; i < 1000; i++) {
      data.push({
        id: crypto.randomUUID(),
        faculty_name: faker.person.jobArea() + ' ' + faker.company.name(),
        faculty_code: faker.string.alphanumeric(5).toUpperCase(),
        created_at: DateTime.now(),
      })
    }

    await Faculties.createMany(data)
  }
}