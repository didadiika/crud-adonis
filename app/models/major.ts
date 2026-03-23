import { MajorSchema } from '#database/schema'
import Faculties from './faculties.ts'
import Student from './student.ts'
import { belongsTo, hasMany } from '@adonisjs/lucid/orm'
import type { BelongsTo, HasMany } from '@adonisjs/lucid/types/relations'
import { column } from '@adonisjs/lucid/orm'

export default class Major extends MajorSchema {
  @column({ columnName: 'faculty_id' })
  public facultyId: string | null | undefined

  @belongsTo(() => Faculties, {
    foreignKey: 'facultyId', // ambil dari Major
    localKey: 'id', // ambil dari Faculties
})
  public faculty: BelongsTo<typeof Faculties> | undefined

  @hasMany(() => Student, {
      foreignKey: 'majorId', // defaults to userId
    })
    declare students: HasMany<typeof Student>
}