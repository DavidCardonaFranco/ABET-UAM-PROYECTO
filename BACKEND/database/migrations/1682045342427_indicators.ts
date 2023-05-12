import BaseSchema from '@ioc:Adonis/Lucid/Schema'

export default class extends BaseSchema {
  protected tableName = 'indicators'

  public async up() {
    this.schema.createTable(this.tableName, (table) => {
      table.increments('id')
      table.string('name')
      table
        .enum('expected_value', [
          'NotTurnedIn',
          'Insufficient',
          'Approved',
          'Noticeable',
          'Outstanding',
        ])
        .notNullable()
      table
        .enum('real_value', [
          'NotTurnedIn',
          'Insufficient',
          'Approved',
          'Noticeable',
          'Outstanding',
        ])
        .notNullable()
      table.integer('id_outcome').unsigned().references('id').inTable('students_outcomes').notNullable()
      /**
       * Uses timestamptz for PostgreSQL and DATETIME2 for MSSQL
       */
      table.timestamp('created_at', { useTz: true })
      table.timestamp('updated_at', { useTz: true })
    })
  }

  public async down() {
    this.schema.dropTable(this.tableName)
  }
}
