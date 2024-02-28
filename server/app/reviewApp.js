const express = require("express");
const app = express();
const db = require("../db.js");
const sql = require("../db/sql.js");

//전체조회
app.get("/review", async (request, response) => {
  let result = db
    .connection(sql.reviewsql.reviewList)
    .then((result) => {
      response.send(result);
    })
    .catch((err) => {
      console.log(err);
    });
});

module.exports = app;
