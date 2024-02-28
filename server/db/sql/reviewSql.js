const reviewList = `SELECT
review_code,
detail_code,
review_title,
review_content,
stars,
review_date,
member_code
FROM review
  `;

const reviewInsert = `INSERT INTO review
  SET ?`;

module.exports = {
  reviewList,
  reviewInsert,
};
