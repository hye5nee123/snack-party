//1:1 //

//문의사항 전체 조회(회원).

//문의사항 단건 조회(회원).
// const inquirymem :`SELECT i.title, m.member_name, i.inquiry_date, i.answer_status
// FROM inquiry i
// JOIN member m ON i.member_code = m.member_code
// WHERE `;
//문의사항 입력.
const inquiryInsert = `insert into inquiry set ?`;

//상품문의 //

//상세 페이지에서 상품 조회
const inquirylist = `SELECT 
    p.product_code,
    i.title AS inquiry_title,
    i.content AS inquiry_content,
    i.inquiry_date,
    i.answer_status,
    m.member_name 
FROM 
    product p 
LEFT JOIN 
    inquiry i ON p.product_code = i.product_code 
LEFT JOIN 
    member m ON i.member_code = m.member_code 
WHERE 
    p.product_code  = ?`;

//상품문의 insert.
const pInquiryInsert = `INSERT INTO inpuiry
SET inquiry_code = snack.nextval('INQ')
, ?`;

module.exports = {
  inquiryInsert,
  inquirylist,
};
