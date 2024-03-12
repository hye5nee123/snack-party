<template>
  <!-- Single Page Header start -->
  <div class="container-fluid page-header py-5">
    <h3 class="text-center text-white">보유적립금</h3>
    <ol class="breadcrumb justify-content-center mb-0">
      <li class="breadcrumb-item"><a href="/myorderlist">Myorder</a></li>
      <!-- <li class="breadcrumb-item"><a href="#">Pages</a></li> -->
      <li class="breadcrumb-item active text-white">MyPoint</li>
    </ol>
  </div>
  <!-- Single Page Header End -->

  <div class="container-fluid py-5">
    <div class="container py-5">
      <br>

      <div class="container" style="border: 1px solid #ccc; padding: 15px; padding-left: 25px; border-radius: 20px; margin-bottom: 40px; text-align: center;">
        <br>
        <h4>보유 적립금:  {{ total_point}}원</h4>
        <br>
        <p><span style="color: red; font-weight: bold;">* </span>상품 구매 후 배송완료 시 결제금액의 1%가 적립됩니다.</p>
      </div>
      <br>
      <br>
      <div class="table-responsive" style="text-align: center;">
        <table class="table">
          <thead>
            <tr>
              <th scope="col">상세내용</th>
              <th scope="col">등록일</th>
              <th scope="col">구분</th>
              <th scope="col">금액</th>
            </tr>
          </thead>
          <tbody>
            <tr v-for="(list, i) in myPointList" :key="i">
              <td>{{ pointDetails(list.point_status) }}</td>
              <td>{{ list.point_date }}</td>
              <td>{{ pointStatus(list.point_status) }}</td>
              <td>{{ $currencyFormat(list.point_value) }}p</td>
            </tr>
          </tbody>
        </table>
        <!-- 페이징 -->
        <PaginationComp :ITEM_PER_PAGE="ITEM_PER_PAGE" :PAGE_PER_SECTION="PAGE_PER_SECTION" :TOTAL_ARITCLES="TOTAL_ARITCLES"
            @change-page="onChangePage" style="margin-bottom: 50px;" />
      </div>
    </div>
  </div>

</template>

<script>
import axios from 'axios';
import PaginationComp from "../../components/PaginationComp.vue";

export default {
  data() {
    return {
      myPointList: [],
      total_point: 0,
      memCode: this.$store.state.memberStore.memberInfo.member_code,

      //페이징컴포넌트
      ITEM_PER_PAGE: 10,     // 한 페이지에 출력할 데이터 수
      PAGE_PER_SECTION: 5,  // 한번에 보여줄 페이지 버튼 수
      TOTAL_ARITCLES: 0,     // 전체 데이터 갯수

      curPage: 1,       // 현재 페이지
      pageData: 0,      // offset에 전달할 페이징 데이터
    }
  },
  created() {
    this.getMyPointList();
    this.getListCount();
  },
  components: {
    PaginationComp
  },
  computed: {
    pageStartIdx() {
      return (this.curPage - 1) * this.ITEM_PER_PAGE;
    }
  },
  methods: {
    async getMyPointList() {
      let result = await axios.get(`/apimember/points/${this.memCode}/${this.ITEM_PER_PAGE}/${this.pageData}`).catch(err => console.log(err));
      console.log('result : ', result)
      this.myPointList = result.data;
      this.total_point = result.data[0].total_point;
    },

    pointStatus(status) {
      if(status == 'd01') {
        return '적립+'
      } else if(status == 'd02') {
        return '차감-'
      }
    },
    pointDetails(status) {
      if(status == 'd01' && this.myPointList.review_code == null) {
        return '구매적립';
      } else if(status == 'd02' && this.myPointList.review_code == null) {
        return '구매사용';
      }
    },
    // 페이지네이션 컴포넌트에서 전달되는 emit event
    onChangePage(data) {
      this.curPage = data;
      this.pageData = (this.curPage - 1) * this.ITEM_PER_PAGE;
      this.getMyPointList();
    },
    // 전체 데이터 갯수
    async getListCount() {
      let result = await axios.get(`/apimember/points/count/${this.memCode}`).catch(err => console.log(err));
      console.log('count : ', result.data[0].count)
      this.TOTAL_ARITCLES = result.data[0].count;
    },
  },
}
</script>
<style>
  
</style>