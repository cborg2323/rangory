import { Knex } from 'knex';

export async function up(knex: Knex) {

    return knex.schema.alterTable('products', table => {

        table.string('status').notNullable().defaultTo("Disponível");

    });
}

export async function down(knex: Knex) {
    // voltar atrás (deleter tabela)
    return knex.schema.table('products', table => {

        table.dropColumn('status');

    });
}