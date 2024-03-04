<template>

  <div class="content-wrapper">
    <div class="container-xxl flex-grow-1 container-p-y">
      <div class="card">
      <div class="table-responsive text-nowrap">
        <table class="table table-hover">
          <thead>
            <tr>
              <th>공지코드</th>
              <th>제목</th>
              <th>작성일</th>
            </tr>
          </thead>
          <tbody class="table-border-bottom-0">          
            <tr :key="i" v-for="(notice, i) in noticeList">
              <td>{{ notice.notice_code }}</td>
              <td>{{ notice.notice_title }}</td>
              <td>{{ notice.notice_date }}</td>
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
      noticeList : []
    };
  },
  created(){
    this.getNoticeList();
  },
  methods:{
    async getNoticeList() {
        let result = await axios.get('/api/notice')
                                .catch(err => console.log(err));
        console.log('result : ', result);
        let list = result.data;
        this.noticeList = list;
      }
  }
}
</script>