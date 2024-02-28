const express = require("express");
const app = express();
const db = require("../db.js");
const sql = require("../db/sql.js");

// //전체조회
// app.get("/notice", async (request, response) => {
//   let result = await db.connection('noticeList');
//   response.send(result);
// });
console.log(sql);
console.log(sql["noticesql"]["noticeList"]);

//전체조회
app.get("/notice", async (request, response) => {
  let result = db
    .connection(sql.noticesql.noticeList)
    .then((result) => {
      response.send(result);
    })
    .catch((err) => {
      console.log(err);
    });
});

module.exports = app;
