const reviewList = `SELECT
        r.review_code,
        r.detail_code,
        r.review_title,
        r.review_content,
        r.stars,
        r.review_date,
        member_code

        FROM review
         `;

module.exports = {
  reviewList,
};
