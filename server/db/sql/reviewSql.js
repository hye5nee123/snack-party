const reviewList = `
  SELECT
    r.review_code,
    r.detail_code,
    r.review_title,
    r.review_content,
    r.stars,
    r.review_date,
    r.member_code
  FROM review
`;

const reviewInsert = `INSERT INTO review SET ?`;

module.exports = {
  reviewList,
  reviewInsert,
};
