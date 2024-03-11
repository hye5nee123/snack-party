<template>
  <div class="rounded position-relative fruite-item border border-secondary">
    <div class="fruite-img">
      <div style="filter: brightness(0.5);" v-if="productInfo.stock_cnt == 0">
        <img :src="getImgUrl(productInfo.path)" class="img-fluid rounded imghw" alt=""
          @click="gotodetail(productInfo.product_code)" />
      </div>
      <div v-else>
        <img :src="getImgUrl(productInfo.path)" class="img-fluid rounded imghw" alt=""
          @click="gotodetail(productInfo.product_code)" />
      </div>
    </div>
    <div class="p-4 border-top-0 rounded-bottom">
      <div @click="gotodetail(productInfo.product_code)">
        <h4 class="sheight">{{ productInfo.product_name }}
          <!-- 품절 배지 -->
          <span class="badge bg-danger" v-if="productInfo.stock_cnt == 0">품절</span>
        </h4>
      </div>
      <p class="text-dark fs-5 fw-bold mb-0">{{ getCurrencyFormat(productInfo.product_price) }}원</p>
      <br>
      <!--  -->
      <div class="d-flex justify-content-between flex-lg-wrap">
        <!-- heart -->
        <!-- <a href="#" class="btn border border-secondary rounded-pill px-3 text-primary" @click="likes()"> -->
        <button class="btn border border-secondary rounded-pill px-3 text-primary" @click="addTolikes()">
          <i :class="{ nondisplay: isActive, display:true }" class="fa-regular fa-heart"></i>
          <i :class="{ red: isActive, nondisplay: !isActive, display:true }" class="fa-solid fa-heart"></i> 관심상품
        </button>
        <div v-if="item">
          <button class="btn border border-secondary rounded-pill px-3 text-primary" @click="addToCart()">
            <i class="fa fa-shopping-bag me-2 text-primary"></i>장바구니</button>
        </div>
        <div v-else>
          <button type="button" class="btn border rounded-pill px-3 text-primary">품절</button>
        </div>

      </div>
    </div>
  </div>
</template>

<script>
import axios from 'axios'

export default {
  props: {
    productInfo: {
      type: Object
    }
  },
  data() {
    return {
      // pressLike: false, //기본값으로 넣어놔
      isActive: false,
      item: true,
      stockCnt: this.productInfo.stock_cnt,
      loginStatus: this.$store.state.memberStore.loginStatus,
      memberCode: this.$store.state.memberStore.memberInfo.member_code
      
    };
  },
  watch: {
    "productInfo.product_code"(){ //객체 안의 필드 사용시 "" 따옴표로 감싸기
      this.getLikeList(this.memberCode);
    }
  },
  created() {
    if(this.stockCnt == 0) {this.item = false}
    this.getLikeList(this.memberCode);
  },
  methods: {
    async addTolikes() {
      //로그인 check
      if(!this.loginStatus) {
        alert('로그인 후 이용가능합니다.');
        return;
      }

      let data = {
        "param": {
          product_code: this.productInfo.product_code,
          member_code: this.memberCode
        }
      }

      //찜 여부 확인 (있으면 클릭 시 삭제)
      if (this.isActive == true){
        this.isActive = false;
        // this.pressLike = false;

        //단건삭제
        let del = await axios.delete(`/apiorder/likes/${this.productInfo.product_code}`)
        .catch((err) => console.log(err));
        console.log('찜 삭제', del);
          alert('찜 상품이 삭제되었습니다.');

      } else{
          this.isActive = true;
          // this.pressLike = true;

          let add = await axios.post("/apiorder/likes", data).catch(err => console.log(err));
          console.log('찜 등록' + add);
          alert('찜 상품으로 추가되었습니다.');
      }
    },
    async getLikeList(memberCode) {
      if(memberCode == '') {
        return;
      } else {
        let result = await axios
          .get('/apiorder/likes/' + memberCode +'/'+ this.productInfo.product_code)
          .catch((err) => console.log(err));
        // console.log('result : ', result);
        let list = result.data;
        console.log('찜목록?',list);
            if(list) {
              this.isActive = true;
              // this.pressLike = true;
            } else {
              this.isActive = false;
              // this.pressLike = false;
            }
      }
    },
    getImgUrl(path) {
      return new URL(this.url + '/common/download?path=' + path);
    },
    getCurrencyFormat(value) {
      return this.$currencyFormat(value);
    },
    gotodetail(pcode) {
      this.$router.push({ name: 'ProductInfo', query: { 'product_code': pcode } });
    },

    //장바구니 추가
    async addToCart() { 
      let data = {
        "param": {
          cart_cnt: 1,
          member_code: this.memberCode,
          product_code: this.productInfo.product_code
        }
      }
      
      let mcode = this.memberCode;
      let pcode = this.productInfo.product_code;
      let cartCheck = await axios.get(`/apiorder/carts/${mcode}/${pcode}`).catch((err) => console.log(err));

      if(!this.loginStatus) {
        alert('로그인 후 이용가능합니다.');
      }else if(cartCheck.data.length != 0){
        alert('이미 담긴 상품입니다. 장바구니를 확인해 주세요');
      } else {
        let add = await axios.post("/apiorder/carts", data).catch(err => console.log(err));
        console.log('장바구니등록' + add);
        alert('장바구니에 추가되었습니다.');
      }
    }
  }
    
};
</script>

<style>
.red {
  color: red;
}

.nondisplay {
  display: none;
}

.display {
  line-height: inherit;
  margin: auto 0;
}

.sheight{
  height: 57.59px;
}
</style>
