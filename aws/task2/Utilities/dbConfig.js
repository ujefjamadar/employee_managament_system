const { createPool, createConnection } = require('mysql')

// const pool = createPool({
//     port:process.env.DB_PORT,
//     host:process.env.DB_HOST,
//     user:process.env.DB_USER,
//     password:process.env.DB_PASSWORD,
//     database:process.env.DB_NAME,
//     connectionLimit:10
// });



const connection = createConnection({
    port: process.env.DB_PORT,
    host: process.env.DB_HOST,
    user: process.env.DB_USER,
    password: process.env.DB_PASSWORD,
    database: process.env.DB_NAME,
    timezone: 'IST',
    multipleStatements: true,
    charset: 'UTF8MB4_GENERAL_CI',
    connectionLimit: 10
});

// pool.query('SELECT 1',(err,result)=>{
//     if(err){
//         console.log(err);

//     } else{
//         console.log('db connected ',result);

//     }
// })

module.exports = connection;