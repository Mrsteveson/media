exports.up = function(knex) {
    return knex.schema.createTable('users', images => {
        images.increments();
    
        images
        .string('title', 128)
        .notNullable();
    
        images
        .string('img_url')
        .notNullable();

        images
        .string('date', 128)

        images
        .string('caption', 128)

        images
        .varchar('uploaded_by')
        .unsigned()
        .notNullable()
        .references('username')
        .inTable('users')
        .onDelete('CASCADE')
        .onUpdate('CASCADE');

        images
        .timestamp("uploaded_at", { useTz: false })
        .notNullable()
        .defaultTo(knex.fn.now());
    })
};

exports.down = function(knex) {
    return knex.schema.dropTableIfExists('images')
};
