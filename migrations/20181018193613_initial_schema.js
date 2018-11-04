
exports.up = knex => {
    return knex.schema
    .createTable('tenants', table => {
        table.increments('id');
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

    .createTable('orders', table => {
        table.increments('id').primary();
        table.string('tenantId');
        table.string('name');
        table.string('status');
    })

    .createTable('shops_products', table => {
        table.increments('id').primary();
        table
          .integer('shopId')
          .unsigned()
          .references('id')
          .inTable('shops')
          .onDelete('CASCADE');
        table
          .integer('productId')
          .unsigned()
          .references('id')
          .inTable('products')
          .onDelete('CASCADE');
      })

      .createTable('orders_products', table => {
        table.increments('id').primary();
        table
          .integer('orderId')
          .unsigned()
          .references('id')
          .inTable('orders')
          .onDelete('CASCADE');
        table
          .integer('productId')
          .unsigned()
          .references('id')
          .inTable('products')
          .onDelete('CASCADE');
      })
  
    .createTable('users', table => {
        table.increments('id').primary();
        table.string('shopId');
        table.string('email');
        table.string('password');
        table.boolean('isAdmin');
    })
}

exports.down = knex => {
    return knex.schema
    .dropTableIfExist('shops')
    .dropTableIfExists('shops_products')
    .dropTableIfExists('products')
    .dropTableIfExists('users')
    .dropTableIfExists('tenants');
};
