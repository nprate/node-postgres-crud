const pg = require('pg');
const pool = new pg.Pool({
    user: 'postgres',
    host: '127.0.0.1',
    database: 'postgres',
    password: '1234',
    port: '5432'
});

module.exports = pool;
    