import { BaseSchema } from '@adonisjs/lucid/schema'

export default class extends BaseSchema {
  protected tableName = 'siswas'

  async up() {
    this.schema.createTable(this.tableName, (table) => {
      table.engine('MyISAM')
      table.charset('utf8')
      table.collate('utf8_unicode_ci')
      table.uuid('id').primary().notNullable()
      table.uuid('kelas_id').notNullable().references('id').inTable('kelas').onDelete('CASCADE')
      table.string('siswa_name').nullable()
      table.date('date_of_birth').nullable()
      table.enum('gender', ['L', 'P']).notNullable().defaultTo('L')
      table.string('address').nullable()
      table.string('student_image').nullable()

      table.timestamp('created_at').defaultTo(this.now())
      table.timestamp('updated_at').defaultTo(this.now())
      table.timestamp('deleted_at').nullable().defaultTo(null)
    })
  }

  async down() {
    this.schema.dropTable(this.tableName)
  }
}