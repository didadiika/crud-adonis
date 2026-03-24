import { BaseSchema } from '@adonisjs/lucid/schema'

export default class extends BaseSchema {
  protected tableName = 'students'

  async up() {
    this.schema.createTable(this.tableName, (table) => {
      table.engine('MyISAM')
      table.charset('utf8mb4')
      table.collate('utf8mb4_unicode_ci')
      table.uuid('id').primary()
      table.uuid('major_id').index().references('majors.id')
      table.text('uid').nullable().defaultTo(null)
      table.text('student_name').nullable().defaultTo(null)
      table.date('date_of_birth').nullable().defaultTo(null)
      table.text('address').nullable().defaultTo(null)
      table.enum('gender', ['L', 'P']).notNullable().defaultTo('L')
      table.text('photo').nullable().defaultTo(null)

      table.timestamp('created_at', { useTz: true }).defaultTo(this.now())
      table.timestamp('updated_at', { useTz: true }).nullable().defaultTo(null)
      table.timestamp('deleted_at', { useTz: true }).nullable().defaultTo(null)
    })
    this.schema.alterTable('students', (table) => {
      table.foreign('major_id').references('majors.id')
    })
  }

  async down() {
    this.schema.dropTable(this.tableName)
  }
}