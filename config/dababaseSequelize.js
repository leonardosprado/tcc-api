// const { Sequelize } = require('sequelize');
// const config     = require('./default.json');
// const mysql = require('mysql2/promise');

// module.exports = db = {};

// initialize();

// async function initialize() {
//     const { host, port, user, password, database } = config.database;

//     const connection = await mysql.createConnection({host, port, user, password });
//     await connection.query(`CREATE DATABASE IF NOT EXISTS \`${database}\`;`);

//      // connect to db
//      const sequelize = new Sequelize(database, user, password, { dialect: 'mysql' });
//      db.usuario = require('../api/models/user/user.model')(sequelize);
//      db.monitor = require('../api/models/monitor/monitor.model')(sequelize);
//     //  var list = await db.monitor.findByPk(1);
//     // db.monitor.findAll().then(function(users) {
//     //     console.log(users)
//     //   })
//     //  console.log(list);
//      await sequelize.sync();
//     //  console.log(sequelize);
// }