import Knex from 'knex';

export async function up(knex: Knex) {
  return knex.schema.createTable('example', (table) => {
    table.increments('id').primary();
    //others fields of the db
  });
}
export async function down(knex: Knex) {
  return knex.schema.dropTable('example');
}
