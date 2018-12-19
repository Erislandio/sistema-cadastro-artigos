
exports.up = function (knex, Promise) {
    knex.schema, createTable('articles', table => {
        table.increments('id').primary()
        table.string('name').notNull()
        table.string('discription', 1000).notNull()
        table.string('imageUrl', 1000)
        table.binary('content').notNull()
        table.integer('userId').references('id')
            .inTable('users')
    })

    exports.down = function (knex, Promise) {
        knex.schema.dropTable('articles')
    };
}
