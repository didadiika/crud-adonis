import { BaseSeeder } from '@adonisjs/lucid/seeders'
import User from '#models/user'
import { DateTime } from 'luxon'

const users = [
  {
    first_name: 'John',
    email: 'john@example.com',
    password: 'password',
    created_at: DateTime.now(),
  },
  {
    first_name: 'Jane',
    email: 'jane@example.com',
    password: 'password',
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