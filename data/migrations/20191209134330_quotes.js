exports.up = function(knex) {
    return knex.schema.createTable('users', quotes => {
        quotes.increments();
    
        quotes
        .string('origin', 128)
        .notNullable()
    
        quotes
        .string('content', 256)

        quotes
        .string('date', 128)

        quotes
        .string('context', 258)

        quotes
        .varchar('uploaded_by')
        .unsigned()
        .notNullable()
        .references('username')
        .inTable('users')
        .onDelete('CASCADE')
        .onUpdate('CASCADE');

        quotes
        .timestamp("created_at", { useTz: false })
        .notNullable()
        .defaultTo(knex.fn.now());
    })
};

exports.down = function(knex) {
    return knex.schema.dropTableIfExists('quotes')
};
