
exports.up = function(knex) {
  return knex.schema.createTable('codeRecoveryPassword', table => {
      table.increments('id')
      table.string('code').notNullable()
      table.boolean('used').notNullable().defaultTo(false)
      
      table.string('id_user').notNullable()
         
      table.foreign('id_user').references('id').inTable('users')
      
  })
};

exports.down = function(knex) {
  
};
