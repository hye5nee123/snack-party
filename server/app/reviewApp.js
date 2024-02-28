const express = require("express");
const app = express();
const db = require("../db.js");
const sql = require("../db/sql.js");

// app.use(express.json());
//전체조회
app.get("/", async (request, response) => {
  let result = await db
    .connection(sql.reviewsql.reviewList)
    .then((result) => {
      response.send(result);
    })
    .catch((err) => {
      console.log(err);
    });
});

//등록
app.post("/", async (request, response) => {
  let data = request.body.param;
  let result = await db
    .connection(sql.reviewsql.reviewInsert, data)
    .then((result) => {
      response.send(result);
    })
    .catch((err) => {
      console.log(err);
    });
});

module.exports = app;
