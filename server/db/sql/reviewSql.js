/*관리자*/

const reviewList = `SELECT 
  r.review_code,
  r.detail_code,
  r.review_title,
  r.review_content,
  r.stars,
  r.review_date,
  r.member_code
  m.member_id
  FROM review r
  JOIN member m ON r.member_code = m.member_code;`

//멤버별 조회.
const reviewInfo = `SELECT 
review_code,
review_title,
review_content,
stars,
member_code
FROM review
WHERE member_code = ?`;

/*회원*/

//상품 상세에서 조회
const detailReview = `SELECT 
  r.review_code,
  r.detail_code,
  r.review_title,
  r.review_content,
  r.stars,
  r.review_date,
  r.member_code,
  m.member_id,
  d.product_code
  FROM review r
  JOIN member m ON r.member_code = m.member_code
  JOIN detail d ON r.detail_code = d.detail_code
  WHERE d.product_code = ?`;


//마이페이지에서 볼 때.
const uReview = `  SELECT review_title,review_date
  FROM review
  WHERE member_code = ?;`
//list에서 클릭시 상세조회 기능.
// const reviewDetail =
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
    detailReview
    // reviewDelete,
    // reviewImgInsert,
  });
