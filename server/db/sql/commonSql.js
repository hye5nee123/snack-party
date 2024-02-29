const categoryList = 
`SELECT sub_codename
      , sub_code
   FROM sub
  WHERE common_code = ?`;

module.exports = {
    categoryList
}