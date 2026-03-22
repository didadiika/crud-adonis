import { BaseSeeder } from '@adonisjs/lucid/seeders'
import User from '#models/user'
import { DateTime } from 'luxon'
// import Hash from '@adonisjs/core/services/hash'

const users = [
  {
    first_name: 'Dika',
    email: 'didadiika@gmail.com',
    password: '12345678',
    created_at: DateTime.now(),
  }
]

export default class extends BaseSeeder {
  async run() {
    // Write your database queries inside the run method
    try {
      await User.createMany(users)
      console.info('Users seeded successfully')
    } catch (error) {
      console.error('Error seeding users:', error)
    }
  }
}