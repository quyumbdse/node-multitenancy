// Update with your config settings.

module.exports = {

  development: {
    client: 'mysql',
    connection: process.env.DATABASE_URL || {
        host: 'localhost',
        user: 'multutenancy',
        password: 'multutenancy',
        database: 'multutenancy'
    }
  }
} 