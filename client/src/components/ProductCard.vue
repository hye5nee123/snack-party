<template>
  <div class="col-md-6 col-lg-6 col-xl-4">
    <div class="rounded position-relative fruite-item">
      <div class="fruite-img">
        <img
          src="../assets/apple.jpg"
          class="img-fluid w-100 rounded-top"
          alt=""
        />
      </div>
      <div
        class="text-white bg-secondary px-3 py-1 rounded position-absolute"
        style="top: 10px; left: 10px"
      >
        Fruits
      </div>
      <div class="p-4 border border-secondary border-top-0 rounded-bottom">
        <h4>Apple</h4>
        <p class="text-dark fs-5 fw-bold mb-0">1000원</p>
        <br>
        <!--  -->
        <div class="d-flex justify-content-between flex-lg-wrap">
          <!-- heart -->
          <p>
              <svg @click="likes()" v-bind:class="{active: isActive}" xmlns="http://www.w3.org/2000/svg" width="16" height="16" fill="currentColor" class="bi bi-heart" viewBox="0 0 16 16">
              <path d="m8 2.748-.717-.737C5.6.281 2.514.878 1.4 3.053c-.523 1.023-.641 2.5.314 4.385.92 1.815 2.834 3.989 6.286 6.357 3.452-2.368 5.365-4.542 6.286-6.357.955-1.886.838-3.362.314-4.385C13.486.878 10.4.28 8.717 2.01zM8 15C-7.333 4.868 3.279-3.04 7.824 1.143q.09.083.176.171a3 3 0 0 1 .176-.17C12.72-3.042 23.333 4.867 8 15"/>
              </svg>
          </p>
          
          <a
            href="#"
            class="btn border border-secondary rounded-pill px-3 text-primary"
            ><i class="fa fa-shopping-bag me-2 text-primary"></i> Add to cart</a
          >
        </div>
      </div>
    </div>
  </div>
</template>

<script>


export default {
  data() {
    return {
      pressLike: false,
      isActive: false,
    };
  },
  methods: {
    likes() {
      if(this.pressLike == false) {
        this.isActive = true;
        this.pressLike = true;
      }else {
        this.isActive = false;
        this.pressLike = false;
      }
    }
  }
};
</script>

<style>
@import '../assets/css/fruitstyle.css';

.active {
  color: red;
}
</style>
