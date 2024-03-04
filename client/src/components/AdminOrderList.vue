<template>

  <div class="content-wrapper">
    <div class="container-xxl flex-grow-1 container-p-y">
      <div class="card">
      <div class="table-responsive text-nowrap">
        <table class="table table-hover">
          <thead>
            <tr>
              <th>주문코드</th>
              <th>회원코드</th>
              <th>주문일자</th>
            </tr>
          </thead>
          <tbody class="table-border-bottom-0">          
            <tr :key="i" v-for="(order, i) in orderList">
              <td>{{ order.order_code }}</td>
              <td>{{ order.member_code }}</td>
              <td>{{ order.order_date }}</td>
            </tr>
            
          </tbody>
        </table>
        </div>
      </div>
    </div>
  </div>
</template>
<script>
import axios from 'axios';

export default{ 
  name:'AdminNoticeList',
  components:{},
  data(){
    return{
      orderList : []
    };
  },
  created(){
    this.getOrderList();
  },
  methods:{
    async getOrderList() {
        let result = await axios.get('/api/order')
                                .catch(err => console.log(err));
        console.log('result : ', result);
        let list = result.data;
        this.orderList = list;
      }
  }
}
</script>