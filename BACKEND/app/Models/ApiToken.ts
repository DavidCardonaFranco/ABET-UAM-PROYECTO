import { DateTime } from 'luxon'
import {
  BaseModel,
  column,
  belongsTo,
  BelongsTo } from '@ioc:Adonis/Lucid/Orm'
import User from './User'

export default class ApiToken extends BaseModel {
  public static table = 'api_tokens'
  @column({ isPrimary: true })
  public id: number
  @column()
  public user_id: number

  @column()
  public name: string

  @column()
  public type: string

  @column()
  public token: string

  @column.dateTime({ autoCreate: true })
  public createdAt: DateTime

  @column.dateTime()
  public expires_at: DateTime

  @belongsTo(() => User,{
    localKey: 'user_id',
  })
  public rol: BelongsTo<typeof User>
}
