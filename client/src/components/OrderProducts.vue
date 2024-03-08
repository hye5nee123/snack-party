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
        </tr>
      </tbody>
    </table>
  </div>
</template>

<script>
export default {
  // props: ['checkOutList'],
  props: {
    checkOutList: Array,
  },
  methods : {
    getImgUrl(path) {
      return new URL(this.url + '/common/download?path=' + path);
    },
  }
}
</script>


