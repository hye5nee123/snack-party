const express = require("express");
const app = express();
const db = require("../db.js");

//상품

//상품 건별 조회.
app.get("/:product_code", async (request, response) => {
  let data = request.params.product_code;
  let result = await db.connection("inquirysql", "inquirylist", data);
  response.send(result);
});

//등록
app.post("/", async (request, response) => {
  let data = request.body.param;
  let result = await db
    .connection("inquirysql", "inquiryInsert", data)
    .catch((err) => {
      console.log(err);
    });
  response.send(result);
});

module.exports = app;
