//1:1 //

//문의 전체 조회(test or admin)

const InquiryAll = `
                SELECT 
                    inquiry_code, 
                    p_inquiry_type, 
                    title, 
                    content, 
                    inquiry_date,                    
                    inquiry_display, 
                    answer, 
                    answer_status, 
                    answer_date
                FROM inquiry`;

//문의 insert를 위한 쿼리...

const InquiryInfo = `
                SELECT 
                    inquiry_code,
                    p_inquiry_type,
                    title,
                    content,
                    inquiry_date,
                    inquiry_display
                    product_code,
                    member_code
                FROM inquiry`;
//문의사항 자기 거 전체 조회(회원).

const sinquiryList = `SELECT 
            inquiry_code,
            p_inquiry_type,
            title,
            answer_status,
            inquiry_date
FROM        inquiry
WHERE       member_code = ?`;

//문의사항 단건 조회(회원).
// const inquirymem :`SELECT i.title, m.member_name, i.inquiry_date, i.answer_status
// FROM inquiry i
// JOIN member m ON i.member_code = m.member_code
// WHERE `;
//문의사항 입력.

//문의 insert(공통).

const inquiryInsert = `INSERT INTO inquiry
SET inquiry_code = snack.nextval('INQ')
, ?`;


/*상품*/

//상품 상세에서 insert를 위한 쿼리...&게시글 상세조회

const pInquiryInfo = `
                SELECT 
                    inquiry_code,
                    title,
                    content,
                    product_code,
                    member_code
                FROM inquiry 
               
                WHERE inquiry_code= ?`;

//상세 페이지에서 상품 조회

const inquirylist = `SELECT 
    p.product_name,
    p.product_code,
    i.title AS inquiry_title,
    i.content AS inquiry_content,
    i.inquiry_date,
    i.answer_status,
    i.inquiry_code,
    m.member_name 
FROM 
    product p 
LEFT JOIN 
    inquiry i ON p.product_code = i.product_code 
LEFT JOIN 
    member m ON i.member_code = m.member_code 
WHERE 
    p.product_code  = ?`;

//관리자 회원 상품문의 전체 조회.
const proinquirylist = ``

//문의 delete.
const inquiryDelete = `DELETE FROM inquiry WHERE inquiry_code = ?`;

module.exports = {
    inquiryInsert,
    inquirylist,
    pInquiryInfo,
    sinquiryList,
    InquiryInfo,
    InquiryAll
};
