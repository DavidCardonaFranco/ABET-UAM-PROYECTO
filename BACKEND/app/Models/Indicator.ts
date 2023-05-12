import { DateTime } from 'luxon'
import { BaseModel, HasOne, ManyToMany, column, hasOne, manyToMany } from '@ioc:Adonis/Lucid/Orm'
import StudentOutcome from './StudentOutcome'
import Rubric from './Rubric'

// eslint-disable-next-line @typescript-eslint/naming-convention
enum realValues {
  NotTurnedIn = 'Not Turned In',
  Insufficient = 'Insufficient',
  Approved = 'Approved',
  Noticeable = 'Noticeable',
  Outstanding = 'Outstanding',
}

export default class Indicator extends BaseModel {
  @column({ isPrimary: true })
  public id: number

  @column()
  public name: String

  @column()
  public expected_value: realValues

  @column()
  public real_value: realValues

  @column()
  public id_outcome: number

  @column.dateTime({ autoCreate: true })
  public createdAt: DateTime

  @column.dateTime({ autoCreate: true, autoUpdate: true })
  public updatedAt: DateTime

  @hasOne(() => StudentOutcome, {
    foreignKey: 'id_outcome',
  })
  public StudentOutcome: HasOne<typeof StudentOutcome>

  @manyToMany(() => Rubric, {
    pivotTable: 'indicators_rubrics',
    pivotForeignKey: 'id_indicator',
    pivotRelatedForeignKey: 'id_rubric',
  })
  public rubrics: ManyToMany<typeof Rubric>
}
