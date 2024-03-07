<template>
  <!-- Menu -->

  <aside id="layout-menu" class="menu-vertical menu bg-menu-theme">
    <div>
      <router-link to="/admin" class="app-brand-link">
        <img src="../assets/img/과자파티_투명배경.png" width="250px" />
      </router-link>

      <a href="javascript:void(0);" class="layout-menu-toggle menu-link text-large ms-auto d-block d-xl-none">
        <i class="bx bx-chevron-left bx-sm align-middle"></i>
      </a>
    </div>

    <div class="menu-inner-shadow"></div>

    <ul class="menu-inner py-1">
      <!-- 관리자 페이지 start-->
      <li class="menu-item active">
        <router-link to="/admin" class="menu-link">
          <i class="menu-icon tf-icons bx bx-home-circle"></i>
          <div data-i18n="Analytics">관리자 페이지</div>
        </router-link>
      </li>
      <!-- 관리자 페이지 end -->

      <!-- 쇼핑몰 페이지 start -->
      <li class="menu-item">
        <router-link to="/main" class="menu-link menu-toggle">
          <i class="menu-icon tf-icons bx bx-layout"></i>
          <div data-i18n="Layouts">쇼핑몰 페이지</div>
        </router-link>
      </li>
      <!-- 쇼핑몰 페이지 end -->

      <!-- 상품 관리 start -->
      <li class="menu-header small text-uppercase">
        <span class="menu-header-text">상품 관리</span>
      </li>
      <li class="menu-item">
        <router-link to="/admin/product" class="menu-link menu-toggle">
          <i class="menu-icon tf-icons bx bx-dock-top"></i>
          <div data-i18n="Account Settings">상품 조회/수정</div>
        </router-link>
        <router-link to="#" class="menu-link menu-toggle">
          <i class="menu-icon tf-icons bx bx-dock-top"></i>
          <div data-i18n="Account Settings">상품 등록</div>
        </router-link>
        <router-link to="#" class="menu-link menu-toggle">
          <i class="menu-icon tf-icons bx bx-dock-top"></i>
          <div data-i18n="Account Settings">상품 입고</div>
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
          <div data-i18n="Account Settings">공지 관리</div>
        </router-link>
        <router-link to="#" class="menu-link menu-toggle">
          <i class="menu-icon tf-icons bx bx-dock-top"></i>
          <div data-i18n="Account Settings">리뷰 관리</div>
        </router-link>
        <router-link to="#" class="menu-link menu-toggle">
          <i class="menu-icon tf-icons bx bx-dock-top"></i>
          <div data-i18n="Account Settings">상품문의 관리</div>
        </router-link>
        <router-link to="#" class="menu-link menu-toggle">
          <i class="menu-icon tf-icons bx bx-dock-top"></i>
          <div data-i18n="Account Settings">1:1 문의 관리</div>
        </router-link>
      </li>
      <!-- 게시판 관리 end -->

      <!-- 주문관리 start -->
      <li class="menu-header small text-uppercase"><span class="menu-header-text">주문관리</span></li>
      <!-- Cards -->
      <li class="menu-item">
        <router-link to="/admin/order" class="menu-link menu-toggle">
          <i class="menu-icon tf-icons bx bx-collection"></i>
          <div data-i18n="Basic">주문조회</div>
        </router-link>
      </li>
      <!-- 주문관리 end -->
    </ul>
  </aside>

  <!-- / Menu -->

</template>

<script>
export default {
  name: "sidebar_part",
}
</script>
