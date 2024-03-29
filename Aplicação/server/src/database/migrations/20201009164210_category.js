
exports.up = function(knex) {
  return knex.schema.createTable('category', table => {
    table.increments('id').primary()
    table.string('category').notNullable()
    table.string('id_user').notNullable()
         
    table.foreign('id_user').references('id').inTable('users')
  

  })
};

exports.down = function(knex) {
  return knex.schema.dropTable('category')
};
