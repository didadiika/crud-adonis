'use strict'

/** @type {import('@adonisjs/lucid/src/Schema')} */
const Schema = use('Schema')

class CategorySchema extends Schema {
  up () {
    this.create('categories', (table) => {
      table.uuid('id').primary()
      table.text('name').nullable()
      table.datetime('created_at').notNullable().defaultTo(this.fn.now())
      table.datetime('updated_at').defaultTo(null)
      table.datetime('deleted_at').defaulTo(null)
    })
  }

  down () {
    this.drop('categories')
  }
}

module.exports = CategorySchema
