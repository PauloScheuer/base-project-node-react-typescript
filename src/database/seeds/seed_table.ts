import Knex from 'knex';

export async function seed(knex: Knex) {
  await knex('example').insert([
    //things to be inserted
  ]);
}
