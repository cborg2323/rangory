import { Knex } from 'knex';

export async function up(knex: Knex) {
    // criar tabela
    return knex.schema.createTable('products_list', table => {
        table.increments('id').primary();
        table.string('name').notNullable();
        table.string('img_url').notNullable();
    });
}

export async function down(knex: Knex) {
    // voltar atrás (deleter tabela)
    return knex.schema.dropTable('products_list');
}