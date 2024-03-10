<template>
  
  <!-- Menu -->

  <div id="layout-menu" class="menu-vertical menu bg-menu-theme">
    <div>
      <router-link to="/admin" class="app-brand-link">
        <img src="../assets/img/과자파티_투명배경_흰색.png" width="250px" />
      </router-link>

      <a href="javascript:void(0);" class="layout-menu-toggle menu-link text-large ms-auto d-block d-xl-none">
        <i class="bx bx-chevron-left bx-sm align-middle"></i>
      </a>
    </div>

    <div class="menu-inner-shadow"></div>

    <ul class="menu-inner py-1">
  
      <!-- 상품 관리 start -->
      <li class="menu-header small text-uppercase">
        <span class="menu-header-text">상품 관리</span>
      </li>
      <li class="menu-item">
        <router-link to="/admin/product" class="menu-link menu-toggle">
          <i class="menu-icon tf-icons bx bx-dock-top"></i>
          <span>상품 조회/수정</span>
        </router-link>
        <router-link to="/admin/product/productform" class="menu-link menu-toggle">
          <i class="menu-icon tf-icons bx bx-dock-top"></i>
          <span>상품 등록</span>
        </router-link>
        <router-link to="/admin/product/productwarehousing" class="menu-link menu-toggle">
          <i class="menu-icon tf-icons bx bx-dock-top"></i>
          <span>상품 입고</span>
        </router-link>
      </li>
      <!-- 게시판 관리 end -->

      <!-- 게시판 관리 start -->
      <li class="menu-header small text-uppercase">
        <span class="menu-header-text">게시판 관리</span>
      </li>
      <li class="menu-item">
        <router-link to="/admin/notice" class="menu-link menu-toggle">
          <i class="menu-icon tf-icons bx bx-dock-top"></i>
          <span>공지 관리</span>
        </router-link>
        <router-link to="/admin/review" class="menu-link menu-toggle">
          <i class="menu-icon tf-icons bx bx-dock-top"></i>
          <span>리뷰 관리</span>
        </router-link>
        <router-link to="/admin/proinquiry" class="menu-link menu-toggle">
          <i class="menu-icon tf-icons bx bx-dock-top"></i>
          <span>상품문의 관리</span>
        </router-link>
        <router-link to="#" class="menu-link menu-toggle">
          <i class="menu-icon tf-icons bx bx-dock-top"></i>
          <span>1:1 문의 관리</span>
        </router-link>
      </li>
      <!-- 게시판 관리 end -->

      <!-- 주문관리 start -->
      <li class="menu-header small text-uppercase"><span class="menu-header-text">주문관리</span></li>
      <!-- Cards -->
      <li class="menu-item">
        <router-link to="/admin/order" class="menu-link menu-toggle">
          <i class="menu-icon tf-icons bx bx-collection"></i>
          <span>주문조회</span>
        </router-link>
      </li>
      <!-- 주문관리 end -->

      <!-- Layouts -->
    </ul>
  </div>
  
  <!-- / Menu -->
</template>

<script>
export default {
  name: "AdminSidebar",
}
</script>

<style>
#layout-menu {
  background-color: #333333 !important;
}
span {
  font-size: 1.1rem !important;
}
</style>
