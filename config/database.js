
const mysql = require('mysql2/promise');
let pool;

pool = mysql.createPool({
    host:process.env.MYSQL_HOST,
    port:process.env.MYSQL_PORT,
    user:process.env.MYSQL_USER,
    password:process.env.MYSQL_PASSWORD,
    database:process.env.MYSQL_DATABASE,
    connectionLimit:5,
    insecureAuth : true
});

module.exports.pool = pool;

/* REPOSTA EM INSERT -> 
    //INSERIDO
    {
        "response":"",
        "message":""
    }
    //DEU ERRO
    {
        error:"",
    }

*/

