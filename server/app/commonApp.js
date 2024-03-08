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

    let check = fs.existsSync(file+'/'+path)
    if(check){
        fs.createReadStream(file+'/'+path).pipe(res);
    }
    else {
        res.sendStatus(404);
    }

})

module.exports = app;