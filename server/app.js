require("dotenv").config({ path: "./db/db.env" });
const express = require("express");
const app = express();
const cors = require('cors'); //결제api초기설정

const adminRouter = require('./app/adminApp.js');
const inquiryRouter = require('./app/inquiryApp.js');
const memberRouter = require('./app/memberApp.js');
const noticeRouter = require('./app/noticeApp.js');
const orderRouter = require('./app/orderApp.js');
const productRouter = require('./app/productApp.js');
const reviewRouter = require('./app/reviewApp.js');
const commonRouter = require('./app/commonApp.js');

app.use(
  express.json({
    limit: "50mb",
  })
);

app.use(express.urlencoded({ extended: false }));


//CORS 허용
app.use(cors({ 
  origin(origin, callback) {
    callback(null, true)
  },
  credentials : true 
}));



app.listen(3000, () => {
  console.log("Server started. port 3000.");
});

app.use('/admin', adminRouter);
app.use('/inquiry', inquiryRouter);
app.use('/member', memberRouter);
app.use('/product', productRouter);
app.use('/notice', noticeRouter);
app.use('/order', orderRouter);
app.use('/review', reviewRouter);
app.use('/common', commonRouter);
