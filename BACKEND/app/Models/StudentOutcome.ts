import { DateTime } from 'luxon'
import { BaseModel, HasOne, ManyToMany, column, hasOne, manyToMany } from '@ioc:Adonis/Lucid/Orm'
import Subject from './Subject'
import Leader from './Leader'

export default class StudentOutcome extends BaseModel {
  public static table = 'students_outcomes'

  @column({ isPrimary: true })
  public id: number

  @column()
  public name: String

  @column()
  public description: String

  @column()
  public grade: number

  @column()
  public id_leader: number

  @column.dateTime({ autoCreate: true })
  public createdAt: DateTime

  @column.dateTime({ autoCreate: true, autoUpdate: true })
  public updatedAt: DateTime

  @manyToMany(() => Subject, {
    pivotTable: 'outcomes_subjects',
    pivotForeignKey: 'id_outcome',
    pivotRelatedForeignKey: 'id_subject',
  })
  public Subjects: ManyToMany<typeof Subject>

  @hasOne(() => Leader, {
    foreignKey: 'id_leader',
  })
  public Leader: HasOne<typeof Leader>
}
