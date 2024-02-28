const express = require('express');
const app = express();
const db = require('../db.js');
const sql = require('../db/sql.js');

// 전체조회
app.get('/productlist', async (req, res) => {
    let result = db.connection(sql.productsql.productList).then(result => {
        res.send(result);
    }).catch(err => {
        console.log(err);
    });
});

//단건조회
app.get('/productinfo/:product_code', async (req, res) => {
    let data = req.params.product_code;
    let result = db.connection(sql.productsql.productInfo, data).then(result => {
        res.send(result);
    }).catch(err => {
        console.log(err);
    });
});

module.exports = app;