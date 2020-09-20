
exports.up = function(knex) {
    return knex.schema.createTable('recep', (table) => {
        table.increments()

        table.string('description').notNullable()
        table.timestamp('date').notNullable()
        table.decimal('value').notNullable()

        table.string('id_user').notNullable()
         
        table.foreign('id_user').references('id').inTable('users')
    })
};

exports.down = function(knex) {
    return knex.schema.dropTable('recep')
};
