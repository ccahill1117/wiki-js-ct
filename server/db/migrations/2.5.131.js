
// .alter() to end to alter column
exports.up = function(knex) {
  return knex.schema
  .alterTable('procedures', table => {
    table.timestamp('createdAt').notNullable().alter()
    table.timestamp('updatedAt').notNullable().alter()
  })
};

exports.down = function(knex) {

};
