import { DateTime } from 'luxon'
import { BaseModel, column } from '@ioc:Adonis/Lucid/Orm'

export default class OutcomeSubject extends BaseModel {
  public static table = 'outcomes_subjects'
  @column({ isPrimary: true })
  public id: number

  @column()
  public id_outcome: number

  @column()
  public subject_id: number

  @column.dateTime({ autoCreate: true })
  public createdAt: DateTime

  @column.dateTime({ autoCreate: true, autoUpdate: true })
  public updatedAt: DateTime
}
