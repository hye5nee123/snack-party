const noticeList = 
`SELECT notice_code
        , notice_title
        , notice_content
        , notice_date
FROM    notice
ORDER BY 1`;

module.exports = {
  noticeList
}