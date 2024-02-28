const express = require('express');
const app = express.Router();
const db = require('../db.js');
const sql = require('../db/sql.js');

// //전체조회
// app.get("/", async (request, response) => {
//   let result = await db.connection('notice', 'noticeList');
//   response.send(result);
// });

// 전체조회
app.get("/", async (request, response) => {
  let result = await db.connection(sql.noticesql.noticeList).then ( result => {
    response.send(result);
  }).catch ( err => {
    console.log(err);
  });
});

// 단건조회
app.get("/:no", async (request, response) => {
  let data = request.params.no;
  let result = await db.connection(sql.noticesql.noticeInfo, data).then ( result => {
    response.send(result);
  }).catch ( err => {
    console.log(err);
  });
});

// 등록 : post => body
app.post("/", async (request, response)=>{
  let data = request.body.param; // { param : { .. } }
  let result = await db.connection(sql.noticesql.noticeInsert, data).then ( result => {
    response.send(result);
  }).catch ( err => {
    console.log(err);
  });
});

module.exports = app;