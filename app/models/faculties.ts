import { FacultySchema } from '#database/schema'
import Major from './major.ts'
import { hasMany } from '@adonisjs/lucid/orm'
import type { HasMany } from '@adonisjs/lucid/types/relations'

export default class Faculties extends FacultySchema {
  @hasMany(() => Major, {
    foreignKey: 'facultyId', // defaults to userId
  })
  declare majors: HasMany<typeof Major>
}