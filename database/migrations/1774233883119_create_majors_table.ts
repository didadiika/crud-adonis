import { BaseSchema } from '@adonisjs/lucid/schema'

export default class extends BaseSchema {
  protected tableName = 'majors'

  async up() {
    this.schema.createTable(this.tableName, (table) => {
      table.engine('MyISAM')
      table.charset('utf8mb4')
      table.collate('utf8mb4_unicode_ci')
      table.uuid('id').primary()
      table.uuid('faculty_id').index().references('faculties.id')
      table.text('major_code').nullable().defaultTo(null)
      table.text('major_name').nullable().defaultTo(null)

      table.timestamp('created_at', { useTz: true }).defaultTo(this.now())
      table.timestamp('updated_at', { useTz: true }).nullable().defaultTo(null)
      table.timestamp('deleted_at', { useTz: true }).nullable().defaultTo(null)
    })
  }

  async down() {
    this.schema.dropTable(this.tableName)
  }
}