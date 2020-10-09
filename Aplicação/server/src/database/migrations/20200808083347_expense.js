
exports.up = function(knex) {
    return knex.schema.createTable('expense', (table) => {
        table.increments()

        table.string('description').notNullable()
        table.string('status').notNullable()
        table.timestamp('date').notNullable()
        table.decimal('value').notNullable()
        table.string('category').notNullable()

        table.string('id_user').notNullable()
         
        table.foreign('id_user').references('id').inTable('users')
    })
};

exports.down = function(knex) {
    return knex.schema.dropTable('expense')
};
