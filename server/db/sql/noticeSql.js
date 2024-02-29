const noticeList = 
`SELECT notice_code
        , notice_title
        , notice_content
        , notice_date
FROM    notice
ORDER BY 1`;

const noticeInfo = 
`SELECT notice_code
        , notice_title
        , notice_content
        , notice_date
FROM    notice
WHERE   notice_code = ?`;

const noticeInsert =
`INSERT INTO notice
SET ? `;

const noticeDelete = 
`DELETE FROM notice
WHERE notice_code = ?`


module.exports = {
  noticeList,
  noticeInfo,
  noticeInsert,
  noticeDelete
}