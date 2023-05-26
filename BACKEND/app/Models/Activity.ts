import { DateTime } from 'luxon'
import { BaseModel, BelongsTo, HasMany, belongsTo, column, hasMany } from '@ioc:Adonis/Lucid/Orm'
import Subject from './Subject'
import Evaluation from './Evaluation'

export default class Activity extends BaseModel {
  @column({ isPrimary: true })
  public id: number

  @column()
  public name: String

  @column()
  public description: String

  @column()
  public start_date: Date

  @column()
  public end_date: Date

  @column()
  public subject_id: number

  @belongsTo(() => Subject, {
    foreignKey: 'subject_id',
  })
  public subject: BelongsTo<typeof Subject>

  @column.dateTime({ autoCreate: true })
  public createdAt: DateTime

  @column.dateTime({ autoCreate: true, autoUpdate: true })
  public updatedAt: DateTime

  @hasMany(() => Evaluation,{
    foreignKey: 'activity_id',
  })
  public evaluations: HasMany<typeof Evaluation>
}
