const express = require("express");
const app = express();
const db = require("../db.js");
const sql = require("../db/sql.js");

//전체조회
app.get("/", async (request, response) => {
  let result = await db.connection("reviewsql", "reviewList").catch(err => console.log(err));
  response.send(result);
});

//상품별조회
app.get("/detailreview/:product_code", async (request, response) => {
  let data = request.params.product_code;
  let result = await db.connection("reviewsql", "detailReview", data).catch(err => console.log(err));
  response.send(result);
});

//단건조회
// app.get("/:member_code", async (request, response) => {
//   let data = request.params.member_code;
//   let result = await db.connection("reviewsql", "reviewInfo", data);
//   response.send(result);
// });


//마이페이지에서 본인 리뷰 조회.
app.get("/:member_code", async (request, response) => {
  let data = request.params.member_code;
  let result = await db.connection("reviewsql", "uReview", data);
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
