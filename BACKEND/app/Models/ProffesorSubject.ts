import { DateTime } from 'luxon'
import { BaseModel, column } from '@ioc:Adonis/Lucid/Orm'

export default class ProffesorSubject extends BaseModel {
  public static table = 'proffesors_subjects'
  @column({ isPrimary: true })
  public id: number

  @column()
  public proffesor_id: number

  @column()
  public subject_id: number

  @column.dateTime({ autoCreate: true })
  public createdAt: DateTime

  @column.dateTime({ autoCreate: true, autoUpdate: true })
  public updatedAt: DateTime
}
