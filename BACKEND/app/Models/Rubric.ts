import { DateTime } from 'luxon'
import { BaseModel, ManyToMany, column, manyToMany } from '@ioc:Adonis/Lucid/Orm'
import Indicator from './Indicator'

export default class Rubric extends BaseModel {
  @column({ isPrimary: true })
  public id: number

  @column()
  public name: string

  @column()
  public description: string

  @column.dateTime({ autoCreate: true })
  public createdAt: DateTime

  @column.dateTime({ autoCreate: true, autoUpdate: true })
  public updatedAt: DateTime

  @manyToMany(() => Indicator, {
    pivotTable: 'indicators_rubrics',
    pivotForeignKey: 'id_rubric',
    pivotRelatedForeignKey: 'id_indicator',
  })
  public indicators: ManyToMany<typeof Indicator>
}
