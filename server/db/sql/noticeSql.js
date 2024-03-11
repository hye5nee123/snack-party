const noticeListCount = 
`SELECT COUNT(*) count
FROM notice`

const noticeList = 
`SELECT notice_code
        , notice_title
        , notice_content
        , notice_date
FROM    notice
ORDER BY 1 DESC`;

const noticeListPage = 
`SELECT notice_code
        , notice_title
        , notice_content
        , notice_date
FROM    notice
ORDER BY 1 DESC
LIMIT ? OFFSET ?`;

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
  noticeListPage,
  noticeInfo,
  noticeInsert,
  noticeDelete,
  noticeListCount
}