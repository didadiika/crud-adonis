import { MajorSchema } from '#database/schema'
import Faculties from './faculties.ts'
import { belongsTo } from '@adonisjs/lucid/orm'
import type { BelongsTo } from '@adonisjs/lucid/types/relations'
import { column } from '@adonisjs/lucid/orm'

export default class Major extends MajorSchema {
  @column({ columnName: 'faculty_id' })
  public facultyId: string | null | undefined

  @belongsTo(() => Faculties, {
    foreignKey: 'facultyId', // ambil dari Major
    localKey: 'id', // ambil dari Faculties
})
  public faculty: BelongsTo<typeof Faculties> | undefined
}