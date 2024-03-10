<template>
  <div class="container-xxl flex-grow-1 container-p-y">
    <div class="row">

      <!-- Earnings (Monthly) Card Example -->
      <div class="col-xl-3 col-md-6 mb-4">
        <div class="card border-left-primary shadow h-100 py-2">
          <div class="card-body">
            <div class="row no-gutters align-items-center">
              <div class="col mr-2">
                <div class="text-xs font-weight-bold text-primary text-uppercase mb-1">
                  일일 매출<br>({{ this.today }})</div>
                <div class="h5 mb-0 font-weight-bold text-gray-800">{{ this.$currencyFormat(this.salesToday) }}원</div>
              </div>
              <div class="col-auto">
                <i class="fas fa-calendar fa-2x text-gray-300"></i>
              </div>
            </div>
          </div>
        </div>
      </div>

      <!-- Earnings (Monthly) Card Example -->
      <div class="col-xl-3 col-md-6 mb-4">
        <div class="card border-left-success shadow h-100 py-2">
          <div class="card-body">
            <div class="row no-gutters align-items-center">
              <div class="col mr-2">
                <div class="text-xs font-weight-bold text-success text-uppercase mb-1">
                  월간 매출<br>({{ this.today.slice(0, 9) }})</div>
                <div class="h5 mb-0 font-weight-bold text-gray-800">{{ this.$currencyFormat(this.salesMonthly) }}원</div>
              </div>
              <div class="col-auto">
                <i class="fas fa-dollar-sign fa-2x text-gray-300"></i>
              </div>
            </div>
          </div>
        </div>
      </div>

      <!-- Earnings (Monthly) Card Example -->
      <!-- <div class="col-xl-3 col-md-6 mb-4">
        <div class="card border-left-info shadow h-100 py-2">
          <div class="card-body">
            <div class="row no-gutters align-items-center">
              <div class="col mr-2">
                <div class="text-xs font-weight-bold text-info text-uppercase mb-1">Tasks
                </div>
                <div class="row no-gutters align-items-center">
                  <div class="col-auto">
                    <div class="h5 mb-0 mr-3 font-weight-bold text-gray-800">50%</div>
                  </div>
                  <div class="col">
                    <div class="progress progress-sm mr-2">
                      <div class="progress-bar bg-info" role="progressbar" style="width: 50%" aria-valuenow="50"
                        aria-valuemin="0" aria-valuemax="100"></div>
                    </div>
                  </div>
                </div>
              </div>
              <div class="col-auto">
                <i class="fas fa-clipboard-list fa-2x text-gray-300"></i>
              </div>
            </div>
          </div>
        </div>
      </div> -->

      <!-- Pending Requests Card Example -->
      <div class="col-xl-3 col-md-6 mb-4">
        <div class="card border-left-warning shadow h-100 py-2">
          <div class="card-body">
            <div class="row no-gutters align-items-center">
              <div class="col mr-2">
                <div class="text-xs font-weight-bold text-danger text-uppercase mb-1">
                  답변 대기 문의</div>
                <div class="h5 mb-0 font-weight-bold text-gray-800">{{ this.inquiryCnt }}</div>
              </div>
              <div class="col-auto">
                <i class="fas fa-comments fa-2x text-gray-300"></i>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  </div>
  
  
</template>
<script>
import axios from 'axios';

export default {
  name: 'AdminHome',
  data() {
    return {
      today : this.$formatDateToday(2),
      salesDaily : 0,
      salesMonthly : 0,
      inquiryCnt : 0
    }
  },
  created() {
    this.getSalesDaily();
    this.getSalesMonthly();
    this.getInquiryNotAnswered();
  },
  methods: {
    // 일일 매출
    async getSalesDaily() {
      let result = await axios.get(`/api/admin/salesdaily`)
        .catch(err => console.log(err));
      console.log('result : ', result)
      this.salesToday = result.data[0].daily;
    },

    // 월간 매출
    async getSalesMonthly() {
      let result = await axios.get(`/api/admin/salesmonthly`)
        .catch(err => console.log(err));
      console.log('result : ', result)
      this.salesMonthly = result.data[0].monthly;
    },

    // 미답변 문의 inquirynotanswered
    async getInquiryNotAnswered() {
      let result = await axios.get(`/api/admin/inquirynotanswered`)
        .catch(err => console.log(err));
      console.log('result : ', result)
      this.inquiryCnt = result.data[0].count;
    },
  }
}
</script>