import { StudentSchema } from '#database/schema'
import Major from './major.ts'
import { belongsTo } from '@adonisjs/lucid/orm'
import type { BelongsTo } from '@adonisjs/lucid/types/relations'


export default class Student extends StudentSchema {
    
      @belongsTo(() => Major, {
        foreignKey: 'majorId', // ambil dari Major
        localKey: 'id', // ambil dari Faculties
    })
      public major: BelongsTo<typeof Major> | undefined
}