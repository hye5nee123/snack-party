<template>
  <table>
 <h1>상품 문의하기</h1>
 <tr>
  <td>{{ img }}</td>
  <td>{{ 상품이름 }}</td>
 </tr>
 <tr>
            <td class="title"><p>제목</p></td>
            <td>
            <input
                v-model="reviewInfo.review_title"
                type="text"
                id="title"
                name="title"
                required
            />
            </td>
        </tr>
 <tr>
    <td>내용</td>
 </tr>

  
</table>
</template>
<script>
import axios from 'axios';

export default {
    data() {
        return {
           
        };
    },
    created() {
        this.getReviewList();
    },
    methods: {
        async getReviewList() {
            let result = await axios.get('/api/product/category')
                .catch(err => console.log(err));
            this.categoryList = result.data;
        },
        getCategoryProductList(category) {
            this.$router.push({ path: '/productlist', query: { 'category': category } });
        }
    }
}
</script>

