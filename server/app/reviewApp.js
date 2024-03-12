const express = require("express");
const app = express();
const db = require("../db.js");
const sql = require("../db/sql.js");

//전체조회
app.get("/", async (request, response) => {
  let result = await db.connection("reviewsql", "reviewList").catch(err => console.log(err));
  response.send(result);
});

//관리자용 급하게 만든 조회기능
app.get("/manage/:member_code", async (request, response) => {
  let result = await db.connection("reviewsql", "reviewManage").catch(err => console.log(err));
  response.send(result);
});

//페이징된 전체조회
app.get('/list/:limit/:offset', async (request, response) => {
  let limit = Number(request.params.limit);
  let offset = Number(request.params.offset);

  let data = [limit, offset]
  let result = await db.connection('reviewsql', 'reviewListPage', data)
    .catch(err => console.log(err));
  response.send(result);
});

//페이징된 상품별 조회
app.get('/detaillist/:product_code/:limit/:offset', async (request, response) => {
  let pcode = request.params.product_code;
  let limit = Number(request.params.limit);
  let offset = Number(request.params.offset);

  let data = [pcode, limit, offset]
  let result = await db.connection('reviewsql', 'detailReviewPage', data)
    .catch(err => console.log(err));
  response.send(result);
});

// 게시물 수 조회
app.get('/count', async (request, response) => {
  let result = await db.connection('reviewsql', 'reviewListCount')
    .catch(err => console.log(err));
  response.send(result);
});

//상품별조회
app.get("/detailreview/:product_code", async (request, response) => {
  let data = request.params.product_code;
  let result = await db.connection("reviewsql", "detailReview", data).catch(err => console.log(err));
  response.send(result);
});

// 단건조회
app.get("/detail/:review_code", async (request, response) => {
  let data = request.params.review_code;
  let result = await db.connection("reviewsql", "reviewInfo", data)
    .catch(err => console.log(err))
  response.send(result[0]);
});


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

//상품평 개수(상품상세)
app.get("/reviewCnt/:product_code", async (request, response) => {
  let data = request.params.product_code;
  let result = await db.connection("reviewsql", "reviewCnt", data);
  response.send(result);
});

//평균별점(상품상세)
app.get("/avgStars/:product_code", async (request, response) => {
  let data = request.params.product_code;
  let result = await db.connection("reviewsql", "avgStars", data);
  response.send(result);
});

//리뷰체크
app.get("/checkReview/:detail_code", async (request, response) => {
  let data = request.params.detail_code;
  let result = await db.connection("reviewsql", "checkReview", data);
  response.send(result);
});

//삭제
app.delete("/:review_code", async (request, response) => {
  let data = request.params.review_code;
  let result = await db.connection("reviewsql", "reviewDelete", data);
  response.send(result);
});

//수정
app.put("/:review_code", async (request, response) => {
  let data = [request.body.param, request.params.review_code];
  let result = await db.connection("reviewsql", "reviewUpdate", data)
    .catch((err) => {
      console.log(err);
    });
  response.send(result);
})
module.exports = app;
