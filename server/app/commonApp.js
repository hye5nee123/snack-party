const express = require('express');
const app = express();
const db = require('../db.js');
const sql = require('../db/sql.js');
const file = process.env.FILE_PATH;
const fs = require('fs');
const url = require('url');

app.get('/download', (req, res) => {
    var queryData = url.parse(req.url, true).query;
    let path = queryData.path;
    fs.createReadStream(file+'/'+path).pipe(res);
})

module.exports = app;