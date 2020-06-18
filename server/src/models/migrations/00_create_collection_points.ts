import Knex from 'knex';

export async function up(knex: Knex) {
    // criar tabela
    return knex.schema.createTable('collection_points', table => {
        table.increments('id').primary();
        table.string('name').notNullable();
        table.string('img_url').notNullable();
        table.string('email').notNullable();
        table.string('whatsapp').notNullable();
        table.string('city').notNullable();
        table.string('uf', 2).notNullable();
        table.string('street').notNullable();
        table.integer('number').notNullable();
        table.string('complement').notNullable();
        table.decimal('latitude').notNullable();
        table.decimal('longitude').notNullable();
    });
}

export async function down(knex: Knex) {
    // voltar atrás (deleter tabela)
    return knex.schema.dropTable('collection_points');
}