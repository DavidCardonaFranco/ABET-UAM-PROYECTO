import { DateTime } from 'luxon'
import Hash from '@ioc:Adonis/Core/Hash'
import { column, beforeSave, BaseModel, belongsTo, BelongsTo, hasMany, HasMany, manyToMany, ManyToMany, hasOne, HasOne } from '@ioc:Adonis/Lucid/Orm'
import Role from './Role'
import ApiToken from './ApiToken'
import Subject from './Subject'
import StudentOutcome from './StudentOutcome'

export default class User extends BaseModel {
  @column({ isPrimary: true })
  public id: number

  @column()
  public name: string

  @column()
  public email: string

  @column({ serializeAs: null })
  public password: string

  @column()
  public role_id: number;

  @column()
  public rememberMeToken: string | null

  @column.dateTime({ autoCreate: true })
  public createdAt: DateTime

  @column.dateTime({ autoCreate: true, autoUpdate: true })
  public updatedAt: DateTime

  @beforeSave()
  public static async hashPassword (user: User) {
    if (user.$dirty.password) {
      user.password = await Hash.make(user.password)
    }
  }

  @belongsTo(() => Role, {foreignKey: 'role_id'})
  public role: BelongsTo<typeof Role>

  @hasMany(() => ApiToken,{
    foreignKey: 'user_id',
  })
  public users: HasMany<typeof ApiToken>

  @manyToMany(() => Subject, {
    pivotTable: 'proffesors_subjects',
    pivotForeignKey: 'proffesor_id',
    pivotRelatedForeignKey: 'subject_id',
  })
  public subjects: ManyToMany<typeof Subject>

  @hasOne(() => StudentOutcome, {
    foreignKey: 'id_leader',
  })
  public StudentOutcome: HasOne<typeof StudentOutcome>
}
