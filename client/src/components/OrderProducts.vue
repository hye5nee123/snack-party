<template>
  <div class="table-responsive">
    <table class="table">
      <thead>
        <tr>
          <th scope="col">이미지</th>
          <th scope="col">상품명</th>
          <th scope="col">상품가격</th>
          <th scope="col">수량</th>
          <th scope="col">총 가격</th>
          <th v-if="review_show == 'show'" scope="col">리뷰</th>
        </tr>
      </thead>
      <tbody>
        <tr v-for="(checkout, i) in checkOutList" :key="i">
          <th scope="row">
            <div class="d-flex align-items-center mt-2">
              <!-- <img
                src="img/vegetable-item-2.jpg"
                class="img-fluid rounded-circle"
                style="width: 90px; height: 90px"
                alt=""
              /> -->
              <img :src="getImgUrl(checkOutList[i].path)" width="100px" class="img-fluid rounded-top" alt="" />
            </div>
          </th>
          <td class="py-5">{{ checkout.product_name}}</td>
          <td class="py-5">{{ $currencyFormat(checkout.product_price)}}원</td>
          <td class="py-5">{{ checkout.cart_cnt}}개</td>
          <td class="py-5">{{ $currencyFormat(checkout.product_price * checkout.cart_cnt)}}원</td>
          <!--리뷰 상세 버튼을 누를 시 작성 버튼이 보임 -->
          <td class="py-5" v-if="review_show == 'show'">
            <button class="button" type="button" v-if="checkReview(checkout.detail_code) == 0" v-on:click="goToReviewInsert(checkout.detail_code)">리뷰작성</button>
            <button class="button" type="button" v-else>리뷰보기</button>
          </td>
        </tr>
      </tbody>
    </table>
  </div>
  <!-- {{ checkReview('DET00002') }} -->
</template>

<script>
import axios from 'axios';
export default {
  // props: ['checkOutList'],
  props: {
    checkOutList: Array,
    review_show : String,
    order_code: String 
  },
  methods : {
    getImgUrl(path) {
      return new URL(this.url + '/common/download?path=' + path);
    },
    goToReviewInsert(detail_code){
       this.$router.push({ path: '/reviewInsert', query: { 'detail_code': detail_code } });
    },
    async checkReview(detail_code){
      let result = await axios
        .get('/api/review/checkreview/' + detail_code)
        .catch((err) => console.log(err));
        return Number(result.data[0].count);
      }
    }
  }
</script>


