import { BaseSchema } from '@adonisjs/lucid/schema'

export default class extends BaseSchema {
  protected tableName = 'faculties'

  async up() {
    this.schema.createTable(this.tableName, (table) => {
      table.engine('MyISAM')
      table.uuid('id').primary()
      table.text('faculty_code').nullable().defaultTo(null)
      table.text('faculty_name').nullable().defaultTo(null)

      table.timestamp('created_at', { useTz: true }).defaultTo(this.now())
      table.timestamp('updated_at', { useTz: true }).nullable().defaultTo(null)
      table.timestamp('deleted_at', { useTz: true }).nullable().defaultTo(null)
    })
  }

  async down() {
    this.schema.dropTable(this.tableName)
  }
}