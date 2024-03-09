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
  },
  getConnecttion(){ //getconnection
    return new Promise((resolve, reject) => dbPool.getConnection( (error, conn) => { //conn: 실행문 직접 작성 
      if (error) { 
        reject({
          error
        });
      } else { 
      resolve(conn);
    }
    })); 
  },

  trConnection(conn, table, alias, param = [], where="") { //release단계 (transaction으로 처리한 결과 쌓기)
    return new Promise((resolve, reject) => conn.query(sql[table][alias] + where, param, (error, results) => {
      if (error) {         
        reject({
          error
        });
      } else { 
      resolve(results);
     console.log(results)
    }
    }));
  },

  excuteConnection(conn,cmd){ //실행문 작성
    return new Promise((resolve, reject) => conn.query(cmd, (error, results) => {
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
