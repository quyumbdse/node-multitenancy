
exports.up = knex => {
    return knex.schema
    .createTable('tenants', table => {
        table.increments('id').primary();
        table.string('name');
    })
    .createTable('shops', table => {
        table.increments('id').primary();
        table.string('tenantId');
        table.string('name');
    })
    .createTable('products', table => {
        table.increments('id').primary();
        table.string('tenantId');
        table.string('name');
    })
    .createTable('users', table => {
        table.increments('id').primary();
        table.string('tenantId');
        table.string('email');
        table.string('password');
    })
}

exports.down = knex => {
  
};
