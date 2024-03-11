const express = require('express');
const app = express();
const db = require('../db.js');
const url = require('url');

// 인기상품 조회
app.get('/popular', async (req, res) => {
    let result = await db.connection('mainsql', 'productListPopular').catch(err => { console.log(err) });
    res.send(result);
});

// 신상품 조회
app.get('/new', async (req, res) => {
    let result = await db.connection('mainsql', 'productListNew').catch(err => { console.log(err) });
    res.send(result);
});


module.exports = app;