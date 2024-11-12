'use strict'

/** @type {import('@adonisjs/lucid/src/Schema')} */
const Schema = use('Schema')

class ProductSchema extends Schema {
  up () {
    this.create('products', (table) => {
      table.uuid('id').primary()
      table.uuid('category_id').index()
      table.text('name').nullable()
      table.text('description').nullable()
      table.decimal('price', 15, 2).notNullable().defaultTo(0)
      table.datetime('created_at').notNullable().defaultTo(this.fn.now())
      table.datetime('updated_at').nullable()
      table.datetime('deleted_at').nullable()
    })
  }

  down () {
    this.drop('products')
  }
}

module.exports = ProductSchema
