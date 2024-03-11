<template>
  <div class="col-12 col-lg-8">
    <div class="card mb-4">
      <div class="card-header">
        <h5 class="card-tile mb-0">상세정보</h5>
      </div>
      <div class="mb-3">
        <label class="form-label">상품코드</label>
        <p>{{ productInfo[0].product_code }}</p>
      </div>
      <div class="mb-3">
        <label class="form-label" for="category">카테고리</label>
        <p>{{ productInfo[0].category }}</p>
      </div>
      <div class="mb-3">
        <label class="form-label" for="product_name">상품명</label>
        <p>{{ productInfo[0].product_name }}</p>
      </div>
      <div class="mb-3">
        <label class="form-label" for="product_price">가격</label>
        <p>{{ productInfo[0].product_price }} 원</p>
      </div>
      <div class="mb-3">
        <label class="form-label" for="product_cnt">수량</label>
        <p>{{ productInfo[0].stock_cnt }} 개</p>
      </div>
      <div class="mb-3">
        <label class="form-label" for="company">제조사</label>
        <p>{{ productInfo[0].company }}</p>
      </div>
      <div class="mb-3">
        <label class="form-label">대표사진</label>
        <!-- <img /> -->
      </div>
      <div class="mb-3">
        <label class="form-label">상세사진</label>
        <!-- <img /> -->
      </div>
      <div class="mb-3">
        <label class="form-label" for="expire_date">유통기한</label>
        <p>{{ productInfo[0].expire_date }}</p>
      </div>
      <div class="mb-3">
        <label class="form-label">공개유무</label><br>
        <p>{{ productInfo[0].product_display }}</p>
      </div>

      <!-- 필수 정보가 아닌 것들은 아코디언으로 펼쳐서 입력 가눙 -->
      <div class="accordion" id="accordionExample">
        <div class="accordion-item">
          <h2 class="accordion-header" id="headingTwo">
            <button class="accordion-button collapsed" type="button" data-bs-toggle="collapse"
              data-bs-target="#collapseTwo" aria-expanded="false" aria-controls="collapseTwo">
              추가정보
            </button>
          </h2>
          <div id="collapseTwo" class="accordion-collapse collapse" aria-labelledby="headingTwo"
            data-bs-parent="#accordionExample">
            <div class="accordion-body">
              <div class="mb-3">
                <label class="form-label">중량</label>
                <p>{{ productInfo[0].weight }}</p>
              </div>
              <div class="mb-3">
                <label class="form-label">제공단위</label>
                <p>{{ productInfo[0].unit }}</p>
              </div>
              <div class="mb-3">
                <label class="form-label">알레르기</label>
                <p>{{ productInfo[0].allergy }}</p>
              </div>
              <div class="mb-3">
                <label class="form-label">칼로리</label>
                <span>{{ productInfo[0].calorie }} kcal</span>
              </div>
              <div class="mb-3">
                <label class="form-label">나트륨</label>
                <span>{{ productInfo[0].na }} mg</span>
              </div>
              <div class="mb-3">
                <label class="form-label">탄수화물</label>
                <span>{{ productInfo[0].carbo }} g</span>
              </div>
              <div class="mb-3">
                <label class="form-label">당류</label>
                <span>{{ productInfo[0].sugar }} g</span>
              </div>
              <div class="mb-3">
                <label class="form-label">포화지방</label>
                <span>{{ productInfo[0].sfat }}g</span>
              </div>
              <div class="mb-3">
                <label class="form-label">단백질</label>
                <span>{{ productInfo[0].protein }} g</span>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
    <div class="d-grid gap-2 d-md-flex justify-content-md-center m-4">
      <button type="button" class="btn btn-outline-danger" @click="backToProductList">취소</button>
      <button type="button" class="btn btn-outline-warning"
        @click="goToUpdateForm(productInfo[0].product_code)">수정</button>
    </div>
  </div>
</template>

<script>
import axios from 'axios';


export default {
  data() {
    return {
      productInfo: [{
        product_code: '',
        category: '',
        product_name: '',
        product_price: 1500,
        stock_cnt: 0,
        product_display: 'f02',
        thumbnail: '',
        path: '',
        info_code: '',
        company: '',
        weight: 0,
        unit: '',
        allergy: '',
        calorie: 0,
        na: 0,
        carbo: 0,
        sugar: 0,
        sfat: 0,
        protein: 0,
        expire_date: '',
      },
      {
        product_code: '',
        category: '',
        product_name: '',
        product_price: 1500,
        stock_cnt: 0,
        product_display: 'f02',
        thumbnail: '',
        path: '',
        info_code: '',
        company: '',
        weight: 0,
        unit: '',
        allergy: '',
        calorie: 0,
        na: 0,
        carbo: 0,
        sugar: 0,
        sfat: 0,
        protein: 0,
        expire_date: '',
      },
      ]
    };
  },
  created() {
    let procode = this.$route.query.product_code;
    this.getProductInfo(procode);
  },
  methods: {
    async getProductInfo(pcode) {
      let result = await axios.get(`/api/product/info/${pcode}`)
        .catch(err => console.log(err));
      this.productInfo = result.data;
    },
    goToUpdateForm(pcode) {
      this.$router.push({ path: '/admin/product/productForm', query: { 'product_code': pcode } });
    },
    backToProductList() {
      this.$router.push({ path: '/admin/product' });
    },
  }
}
</script>