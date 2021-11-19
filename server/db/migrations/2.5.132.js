
exports.up = function(knex) {
  return knex.schema
  .createTable('procedureSteps', table => {
    table.increments('id').primary()
    table.integer('stepNumber')
    table.string('instructions')
    table.integer('procedureId').references('id').inTable('procedures')
    table.integer('createdBy').references('id').inTable('users')
    table.integer('completedBy').references('id').inTable('users')

    table.timestamp('createdAt')
    table.timestamp('updatedAt')
  })

  .alterTable('procedures', table => {
    table.integer('createdBy').references('id').inTable('users')
  })
};

exports.down = function(knex) {

};
