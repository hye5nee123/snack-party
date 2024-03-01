const express = require("express");
const app = express();
const db = require("../db.js");
// const multer = require("multer");
const sql = require("../db/sql.js");
const { request, response } = require("./reviewApp.js");

//qna 전체 조회.
app.get("/", async (request, response) => {
  let data = request.params.detail;
  let list = await db
    .connection(sql.qnawsql.qnaList, data)
    .then((list) => {
      response.send(list);
    })
    .catch((err) => {
      console.log(err);
    });
});
