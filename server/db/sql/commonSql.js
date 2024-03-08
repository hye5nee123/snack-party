const categoryList = 
`SELECT sub_codename
      , sub_code
   FROM sub
  WHERE common_code = ?`;

//생성된 code 값 읽어오기
const currval =
`select CONCAT(?, lpad(currval,5,'0')) as 'seq'
from sequences 
where name = ? limit 1`

module.exports = {
    categoryList,
    currval
}