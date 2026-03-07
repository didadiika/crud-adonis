import { BaseSchema } from '@adonisjs/lucid/schema'

export default class extends BaseSchema {
  protected tableName = 'jurusans'

  async up() {
    this.schema.createTable(this.tableName, (table) => {
      table.engine('MyISAM')
      table.charset('utf8')
      table.collate('utf8_unicode_ci')
      table.uuid('id').primary().notNullable()
      table.string('jurusan_name').notNullable()

      table.timestamp('created_at').defaultTo(this.now())
      table.timestamp('updated_at').defaultTo(this.now())
      table.timestamp('deleted_at').nullable().defaultTo(null)
    })
  }

  async down() {
    this.schema.dropTable(this.tableName)
  }
}