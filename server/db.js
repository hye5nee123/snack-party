const mysql = require('mysql');
const sql = require('./db/sql.js')

const dbInfo = {
    connetionLimit : process.env.MYSQL_LIMIT,
    host : process.env.MYSQL_HOST,
    port: process.env.MYSQL_PORT,
    database : process.env.MYSQL_DATABASE,    
    user : process.env.MYSQL_USERNAME,
    password : process.env.MYSQL_PASSWORD,
}

const dbPool = mysql.createPool(dbInfo);
// const file = process.env.FILE_PATH;

module.exports = {
  connection(table, alias, param = [], where="") {
    return new Promise((resolve, reject) => dbPool.query(sql[table][alias] + where, param, (error, results) => {
      if (error) {         
        reject({
          error
        });
      } else { 
      resolve(results);
     console.log(results)
    }
    }));
  }
};
