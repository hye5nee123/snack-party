const express = require("express");
const app = express.Router();
const db = require("../db.js");

//전체조회
app.get('/list', async (request, response) => {
  let result = await db.connection('noticesql', 'noticeList')
                       .catch(err => console.log(err));
  response.send(result);
});

//전체조회(pagination)
app.get('/list/:no', async (request, response) => {
  let data = request.params.no;
  data =  Number(data);
  let result = await db.connection('noticesql', 'noticeListPage', data)
                       .catch(err => console.log(err));
  response.send(result);
});

// 게시물 수 조회
app.get('/count', async (request, response) => {
  let result = await db.connection('noticesql', 'noticeListCount')
                       .catch(err => console.log(err));
  response.send(result);
});

// 단건조회(수정)
app.get("/info/:no", async (request, response) => {
  let data = request.params.no;
  let result = await db.connection('noticesql', 'noticeInfo', data);
  response.send(result);
});

// 등록 : post => body
app.post("/", async (request, response)=>{
  let data = request.body.param; // { param : { .. } }
  let result = await db.connection('noticesql', 'noticeInsert', data);
  response.send(result);
});

// 삭제
app.delete("/:no", async (request, response)=>{
  let data = request.params.no; // { param : { .. } }
  let result = await db.connection('noticesql', 'noticeDelete', data);
  response.send(result);
});
module.exports = app;
