const express = require("express");
const app = express();
const db = require("../db.js");
/*1:1*/


//게시글 단건조회
app.get("/inquirydetail/:inquiry_code", async (request, response) => {
  let data = request.params.inquiry_code;
  let result = await db.connection("inquirysql", "InquiryInfo", data)
    .catch(err => console.log(err))
  response.send(result[0]);
});

//전체조회(테스트or관리자용)
app.get("/test", async (request, response) => {
  let result = await db.connection("inquirysql", "InquiryAll").catch(err => console.log(err));
  response.send(result);
});
//등록

app.post("/member/:member_code", async (request, response) => {
  let data = request.body.param;
  let result = await db
    .connection("inquirysql", "inquiryInsert", data)
    .catch((err) => {
      console.log(err);
    });
  response.send(result);
});
//자기 문의 조회(회원)

app.get("/member/:member_code", async (request, response) => {
  let data = request.params.member_code;
  let result = await db.connection("inquirysql", "sinquiryList", data);
  response.send(result);
});
//전체 조회(관리자)
// app.get("/", async (request, response) => {
//   let data = request.params.member_code;
//   let result = await db.connection("inquirysql", "sinquiryList", data);
//   response.send(result);
// })
/*상품*/

//관리자 문의 전체 조회.

//상품 건별 조회.

app.get("/:product_code", async (request, response) => {
  let data = request.params.product_code;
  let result = await db.connection("inquirysql", "inquirylist", data);
  response.send(result);
});

//게시글 단건조회
app.get("/detail/:inquiry_code", async (request, response) => {
  let data = request.params.inquiry_code;
  let result = await db.connection("inquirysql", "pInquiryInfo", data)
    .catch(err => console.log(err))
  response.send(result[0]);
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
