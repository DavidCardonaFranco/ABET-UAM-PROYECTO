import { DateTime } from 'luxon'
import { BaseModel, ManyToMany, column, manyToMany } from '@ioc:Adonis/Lucid/Orm'
import StudentOutcome from './StudentOutcome'
import Proffesor from './Proffesor'

export default class Subject extends BaseModel {
  @column({ isPrimary: true })
  public id: number

  @column()
  public code: number

  @column()
  public name: string

  @column()
  public description: string

  @column()
  public credits: number

  @column.dateTime({ autoCreate: true })
  public createdAt: DateTime

  @column.dateTime({ autoCreate: true, autoUpdate: true })
  public updatedAt: DateTime

  @manyToMany(() => StudentOutcome, {
    pivotTable: 'outcomes_subjects',
    pivotForeignKey: 'id_subject',
    pivotRelatedForeignKey: 'id_outcome',
  })
  public StudentOutcomes: ManyToMany<typeof StudentOutcome>

  @manyToMany(() => Proffesor, {
    pivotTable: 'proffesors_subjects',
    pivotForeignKey: 'subject_code',
    pivotRelatedForeignKey: 'proffesor_id',
  })
  public proffesors: ManyToMany<typeof Proffesor>
}
