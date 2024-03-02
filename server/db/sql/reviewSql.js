const reviewList = `SELECT
review_code,
detail_code,
review_title,
review_content,
stars,
review_date,
member_code
FROM review
WHERE detail_code = ?
  `;
//리뷰 insert.
const reviewInsert = `INSERT INTO review
  SET ?`;

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
