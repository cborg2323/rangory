import { Knex } from 'knex';

export async function up(knex: Knex) {
    // criar tabela
    return knex.schema.createTable('products', table => {
        table.increments('id').primary();
        table.string('name').notNullable();
        table.string('img_url').notNullable();
        table.decimal('price').notNullable();
        table.date('validity').notNullable();
        table.integer('collection_point_id')
            .notNullable()
            .references('id')
            .inTable('collection_points');
    });
}

export async function down(knex: Knex) {
    // voltar atrás (deleter tabela)
    return knex.schema.dropTable('products');
}