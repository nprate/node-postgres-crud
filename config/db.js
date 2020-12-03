const pg = require('pg');

//LOCAL
// const USER = "postgres";
// const HOST = "127.0.0.1";
// const DATABASE = "postgres";
// const PASSWORD = "1234";
// const PORT = "5432";

//PROD
const USER = "ashqsgtuqrhtss";
const HOST = "ec2-54-236-122-55.compute-1.amazonaws.com";
const DATABASE = "d5t8apequasnj2";
const PASSWORD = "fc9ff56871cf66280eecad085e957a45df181e87b98c6328f0be6b0c9416912c";
const PORT = "5432";


const pool = new pg.Pool({
    user: USER,
    host: HOST,
    database: DATABASE,
    password: PASSWORD,
    port: PORT
});

module.exports = pool;
    

