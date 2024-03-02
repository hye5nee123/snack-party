const express = require('express');
const app = express();
const db = require('../db.js');
const sql = require('../db/sql.js');

// 전체조회
app.get("/", async(request, response) => {
    let result = await db.connection('membersql', 'memberList');
    response.send(result);
});

// 단건조회
app.get("/:member_code", async(request, response) => {
    let data = request.params.member_code;
    let result = await db.connection('membersql', 'memberInfo', data);
    response.send(result);
})

// 등록
app.post("/", async(request, response) => {
    let data = request.body.param;
    let result = await db.connection('membersql', 'memberInsert', data);
    response.send(result);
})

// 수정
app.put("/:member_code", async(request, response) => {
    let data = [request.body.param, request.params.member_code];
    let result = await db.connection('membersql', 'memberUpdate', data);
    response.send(result);
})

// 삭제
app.delete("/:member_code", async(request, response) => {
    let data = request.params.member_code;
    let result = await db.connection('membersql', 'memberDelete', data);
    response.send(result);
})

module.exports = app;