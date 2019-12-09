exports.up = function(knex) {
    return knex.schema.createTable('quotes', quotes => {
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
        .references('id')
        .inTable('users')
        .onDelete('CASCADE')
        .onUpdate('CASCADE');

        quotes
        .timestamp("uploaded_at", { useTz: false })
        .notNullable()
        .defaultTo(knex.fn.now());
    })
};

exports.down = function(knex) {
    return knex.schema.dropTableIfExists('quotes')
};
