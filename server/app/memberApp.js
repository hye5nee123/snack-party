const express = require('express');
const app = express();
const db = require('../db.js');
const sql = require('../db/sql.js');

// 전체조회
app.get("/", async(request, response) => {
    let result = await db.connection('membersql', 'memberList');
    response.send(result);
});

// 단건조회(회원적립금)
app.get("/:mcode", async(request, response) => {
    let data = [request.params.mcode, request.params.mcode, request.params.mcode];
    let result = (await db.connection('membersql', 'memberInfo', data))[0];
    response.send(result);
})

// 등록
app.post("/", async(request, response) => {
    let data = request.body.param;
    let result = await db.connection('membersql', 'memberInsert', data);
    response.send(result);
})

// 수정
app.put("/:member_id", async(request, response) => {
    let data = [request.body.param, request.params.member_id];
    let result = await db.connection('membersql', 'memberUpdate', data);
    response.send(result);
})

// 삭제
app.delete("/:member_code", async(request, response) => {
    let data = request.params.member_code;
    let result = await db.connection('membersql', 'memberDelete', data);
    response.send(result);
})

// 단건조회
app.get("/info/:member_id", async(request, response) => {
    let data = [request.params.member_id, ''];
    let result = (await db.connection('membersql', 'memberLogin', data))[0];
    response.send(result);
})

// 로그인
app.post("/login", async(request, response) => {
    // let member_id = request.body.member_id;
    let data = [request.body.member_id, ''];
    let pw = request.body.pw;
    let result = {};
    // let member = (await db.connection('membersql', 'memberLogin', member_id))[0];
    let member = (await db.connection('membersql', 'memberLogin', data))[0];
    if(member){
        if(member.member_status == 'c02') {
            result.loginStatus = 4;  // 탈퇴회원
        }
        else if(pw == member.pw) {
            result.loginStatus = 1;  // 정상로그인
            result.member = member
        } else {
            result.loginStatus = 2; // 비밀번호 불일치
        }

    } else {
        result.loginStatus = 3; // 아이디 불일치
    }
    response.send(result);
})

// 아이디, 비밀번호 찾기
// app.post("/search", async(request, response) => {
//     let data = ['', this.request.body.member_name];

// })

module.exports = app;