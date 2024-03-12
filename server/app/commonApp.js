const express = require('express');
const app = express();
const db = require('../db.js');
const sql = require('../db/sql.js');
const file = process.env.FILE_PATH;
const fs = require('fs');
const url = require('url');

app.get('/download', (req, res) => {
    var queryData = url.parse(req.url, true).query;
    console.log(file)
    let path = queryData.path;
    console.log(file + '/' + path);
    let check = fs.existsSync(file + '/' + path)
    if (check) {
        fs.createReadStream(file + '/' + path).pipe(res);
    }
    else {
        res.sendStatus(404);
    }
})

module.exports = app;