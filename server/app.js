require("dotenv").config({ path: "./db/db.env" });
const express = require("express");
const app = express();

// const adminRouter = require('./app/adminApp.js');
// const inquiryRouter = require('./app/inquiryApp.js');
// const memberRouter = require('./app/memberApp.js');
// const noticeRouter = require('./app/noticeApp.js');
// const orderRouter = require('./app/orderApp.js');
const productRouter = require('./app/productApp.js');
// const reviewRouter = require('./app/reviewApp.js');

app.use(
    express.json({
      limit: "50mb",
    })
);

app.use(express.urlencoded({ extended: false }));

app.listen(3000, () => {
    console.log("Server started. port 3000.");
});

const db = require("./db.js");

// app.use('/admin', adminRouter);
// app.use('/inquiry', inquiryRouter);
// app.use('/member', memberRouter);
app.use('/product', productRouter);
// app.use('/notice', noticeRouter);
// app.use('/order', orderRouter);
// app.use('/review', reviewRouter);
