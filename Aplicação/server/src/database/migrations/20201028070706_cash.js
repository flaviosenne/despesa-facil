
exports.up = function(knex) {
  return knex.schema.createTable('flow', table => {
    table.increments('id').primary()

    table.string('description').notNullable()
    table.string('type').notNullable()
    table.string('status').notNullable()
    table.date('date').notNullable()
    table.decimal('value').notNullable()    
    table.integer('category').notNullable()
    
    table.string('id_user').notNullable()
    
    table.foreign('id_user').references('id').inTable('users')
    table.foreign('category').references('id').inTable('category')
})
};

exports.down = function(knex) {
    return knex.schema.dropTable('cash')
};
