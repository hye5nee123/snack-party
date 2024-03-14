const express = require('express');
const app = express();
const db = require('../db.js');
const sql = require('../db/sql.js');

// 전체조회
app.get("/", async(request, response) => {
    let result = await db.connection('membersql', 'memberList');
    response.send(result);
});

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
    if(member) {
        if(member.member_status == 'c02') {
            result.loginStatus = 4;  // 탈퇴회원
        }
        else if(member.pw == pw) {
            result.loginStatus = 1;  // 정상로그인
            result.member = member;
        } else {
            result.loginStatus = 2; // 비밀번호 불일치
        }

    } else {
        result.loginStatus = 3; // 아이디 불일치
    }
    response.send(result);
})

// 아이디, 비밀번호 찾기
app.post("/search", async(request, response) => {
    let data = ['', request.body.member_name];
    let phone = request.body.member_phone;
    let id = request.body.member_id;
    let result = {};
    let memberList = (await db.connection('membersql', 'memberLogin', data));
    for(let member of memberList) {
        if(member.member_id == id && member.member_phone == phone) {
            result.memberInfo = 2;  // 비밀번호 찾기
            result.member = member;
        } else if(member.member_phone == phone) {
            result.memberInfo = 1;  // 아이디 찾기
            result.member = member;
        } else {
            result.memberInfo = 3;  // 일치하는 회원 없음
        }
    }
    response.send(result);
})


// 회원정보 조회(총 적립금 포함 -> 주문 시 변동 계산)
app.get("/:mcode", async(request, response) => {
    let data = [request.params.mcode, request.params.mcode, request.params.mcode];
    let result = (await db.connection('membersql', 'memberInfo', data))[0];
    response.send(result);
})

//회원 적립금 보유내역
//*페이징
app.get("/points/:mcode/:limit/:offset", async(request, response) => {
    let mcode = request.params.mcode;
    let limit = Number(request.params.limit);
    let offset = Number(request.params.offset);
  
    let data = [mcode, mcode, mcode, limit, offset];
    let result = await db.connection('membersql', 'memPointList', data).catch((error) => {
        console.log(error);
    });
    response.send(result);
});

// 게시물 수 조회 (페이징처리)
app.get('/points/count/:mcode', async (request, response) => {
    let mcode = request.params.mcode;
    let result = await db.connection('membersql', 'pointListCount', mcode).catch((err) => console.log(err));
    response.send(result);
  });



module.exports = app;