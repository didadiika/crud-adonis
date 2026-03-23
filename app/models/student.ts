import { StudentSchema } from '#database/schema'
import Major from './major.ts'
import { belongsTo } from '@adonisjs/lucid/orm'
import type { BelongsTo } from '@adonisjs/lucid/types/relations'
import { column } from '@adonisjs/lucid/orm'

export default class Student extends StudentSchema {
    @column({ columnName: 'major_id' })
      public majorId: string | null | undefined
    
      @belongsTo(() => Major, {
        foreignKey: 'majorId', // ambil dari Major
        localKey: 'id', // ambil dari Faculties
    })
      public major: BelongsTo<typeof Major> | undefined
}