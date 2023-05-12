import { DateTime } from 'luxon'
import { BaseModel, column } from '@ioc:Adonis/Lucid/Orm'

export default class IndicatorRubric extends BaseModel {
  public static table = 'indicators_rubrics'

  @column({ isPrimary: true })
  public id: number

  @column()
  public id_rubric: number

  @column()
  public id_indicator: number

  @column.dateTime({ autoCreate: true })
  public createdAt: DateTime

  @column.dateTime({ autoCreate: true, autoUpdate: true })
  public updatedAt: DateTime
}
