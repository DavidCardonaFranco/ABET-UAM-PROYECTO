import { DateTime } from 'luxon'
import { BaseModel, BelongsTo, belongsTo, column } from '@ioc:Adonis/Lucid/Orm'
import Activity from './Activity'

export default class Evaluation extends BaseModel {
  @column({ isPrimary: true })
  public id: number

  @column()
  public grade: number

  @column()
  public activity_id: number

  @column.dateTime({ autoCreate: true })
  public createdAt: DateTime

  @column.dateTime({ autoCreate: true, autoUpdate: true })
  public updatedAt: DateTime

  @belongsTo(() => Activity, {
    foreignKey: 'activity_id',
  })
  public Activity: BelongsTo<typeof Activity>
}
