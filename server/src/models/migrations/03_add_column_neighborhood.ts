import Knex from 'knex';

export async function up(knex: Knex) {

    return knex.schema.alterTable('collection_points', table => {

        table.string('neighborhood').notNullable().defaultTo("Centro");

    });
}

export async function down(knex: Knex) {
    // voltar atrás (deleter tabela)
    return knex.schema.table('collection_points', table => {

        table.dropColumn('neighborhood');

    });
}