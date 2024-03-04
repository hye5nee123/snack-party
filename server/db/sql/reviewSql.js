//전체조회 >사실상 테스트용 or 관리자에서 기능 구현.
const reviewList = `SELECT
  review_code,
  detail_code,
  review_title,
  review_content,
  stars,
  review_date,
  member_code
  FROM review `;

//단건 조회
const reviewInfo = `SELECT 
review_code,
review_title,
review_content,
stars,
member_code
FROM review
WHERE member_code = ?`;

//리뷰 insert.
const reviewInsert = `INSERT INTO review
SET review_code = snack.nextval('REV')
, ?`;

//리뷰 delete.
const reviewDelete = `DELETE FROM review WHERE review_code = ?`;

//이미지.
reviewImgInsert: `insert into file set board_code = ?`,
  (module.exports = {
    reviewList,
    reviewInsert,
    // reviewDelete,
    // reviewImgInsert,
  });
