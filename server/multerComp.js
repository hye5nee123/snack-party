// multer 미들웨어
const multer = require('multer');
const express = require('express');
const app = express();


const storage = multer.diskStorage({
    // destination: 저장하는 경로
    destination : function(req, file, cb) {
        cb(null, 'C:/fileupload/test');     // cb: callback
    }, 
    filename : function(req, file, cb) {
        let rename = (new Date()).getMilliseconds() + file.originalname;
        cb(null, rename);   // 콜백 실행하는 이유 : 단계단계 불러야 해서
    }
});

const upload = multer({storage : storage});
// const staticUrl = '/images';
// app.use(staticUrl, express.static('files'));

// app.post('/profile', upload.single('avatar'), (req, res) => {
//     // <img src=""> -> src 속성이 가져야 하는 경로 반환
//     let imgUrl = `${staticUrl}\/${req.file.filename}`;
//     res.send(imgUrl);
// });

// app.post('/photos', upload.array('list'), (req, res) => {
//     // <img src=""> -> src 속성이 가져야 하는 경로 반환
//     let imgUrlList = [];
//     for(let file of req.files){
//         let imgUrl = `${staticUrl}\/${file.filename}`;
//         imgUrlList.push(imgUrl);
//     }
//     res.send(imgUrlList);
// });

// app.listen(4000, ()=>{
//     console.log('Server Start : multer');
// });

module.exports = upload