<template>
  <div>
    <div class="container-xxl flex-grow-1 container-p-y">
            <div class="card">
                <h3>리뷰관리</h3>
            </div>
        </div>
    <ReviewListComp type="admin"/>
  </div>
</template>
<script>
import ReviewListComp from "../../components/ReviewListComp.vue";
export default {
  components: {
    ReviewListComp
  },
  data() {
    return {

    }
  }
};
</script>
