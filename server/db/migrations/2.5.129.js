
exports.up = function(knex) {
  return knex.schema
    .createTable('procedures', table => {
      table.increments('id').primary()
      table.string('filename').notNullable()
      table.integer('pageId').unsigned().references('id').inTable('pages')
    })
};

exports.down = function(knex) {
  return knex.schema
    .dropTableIfExists('procedures')

};

