const express = require('express');
const app = express();
const db = require('../db.js');
const sql = require('../db/sql.js');

// 일일 매출
app.get('/salesdaily', async (request, response) => {
    let result = await db.connection('adminsql', 'salesDaily')
                         .catch(err => console.log(err));
    response.send(result);
  });

// 월간 매출
app.get('/salesmonthly', async (request, response) => {
    let result = await db.connection('adminsql', 'salesMonthly')
                         .catch(err => console.log(err));
    response.send(result);
  });

// 미답변 문의 
app.get('/inquirynotanswered', async (request, response) => {
    let result = await db.connection('adminsql', 'inquiryNotAnswered')
                         .catch(err => console.log(err));
    response.send(result);
  });

module.exports = app;