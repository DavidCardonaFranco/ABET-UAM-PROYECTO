import { DateTime } from 'luxon'
import { BaseModel, ManyToMany, column, manyToMany } from '@ioc:Adonis/Lucid/Orm'
import Subject from './Subject'

export default class Proffesor extends BaseModel {
  @column({ isPrimary: true })
  public id: number

  @column()
  public name: string

  @column()
  public email: string

  @column()
  public password: string

  @column.dateTime({ autoCreate: true })
  public createdAt: DateTime

  @column.dateTime({ autoCreate: true, autoUpdate: true })
  public updatedAt: DateTime

  @manyToMany(() => Subject, {
    pivotTable: 'proffesors_subjects',
    pivotForeignKey: 'proffesor_id',
    pivotRelatedForeignKey: 'subject_id',
  })
  public subjects: ManyToMany<typeof Subject>
}
