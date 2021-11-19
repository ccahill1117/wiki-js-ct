
exports.up = function(knex) {
  return knex.schema
  .alterTable('procedures', table => {
    table.string('createdAt').notNullable()
    table.string('updatedAt').notNullable()
  })
};

exports.down = function(knex) {

};
