const express = require("express");
const app = express();
const db = require("../db.js");
const sql = require("../db/sql.js");

//전체조회
app.get("/", async (request, response) => {
  let result = await db.connection("reviewsql", "reviewList");
  response.send(result);
});

//단건조회
app.get("/:member_code", async (request, response) => {
  let data = request.params.member_code;
  let result = await db.connection("reviewsql", "reviewInfo", data);
  response.send(result);
});
//등록
app.post("/", async (request, response) => {
  let data = request.body.param;
  let result = await db
    .connection("reviewsql", "reviewInsert", data)
    .catch((err) => {
      console.log(err);
    });
  response.send(result);
});

module.exports = app;
