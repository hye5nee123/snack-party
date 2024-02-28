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

//등록
router.post("/", async (req, res) => {
  let data = req.body.param;
  let result = await mysql.query("qnaInsert", data);
  res.send(result);
});

module.exports = app;
