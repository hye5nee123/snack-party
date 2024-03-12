<template>
    <!-- Navbar start -->
    <div class="container-fluid fixed-top">
        <div class="container topbar bg-primary d-none d-lg-block">
            <div class="d-flex justify-content-between">
                <div class="top-info ps-2">
                    
                </div>
                <div class="top-link pe-2">

                    <router-link to="/" v-if="this.$store.state.memberStore.loginStatus" class="text-white"><small class="text-header mx-2">{{ this.$store.state.memberStore.memberInfo.member_name }}님</small>/</router-link>
                    <router-link to="/login" v-else class="text-white"><small class="text-white mx-2">로그인</small>/</router-link>
                    <router-link to="/" v-if="this.$store.state.memberStore.loginStatus" class="text-white" @click.prevent="memberLogout()"><small class="text-header mx-2">로그아웃</small>/</router-link>
                    <router-link to="/signup" v-else class="text-white"><small class="text-white mx-2">회원가입</small></router-link>
                    <router-link to="/mypoint"  v-if="$store.state.memberStore.memberInfo.member_id" class="text-white"><small class="text-header ms-2">보유적립금 </small>/</router-link>
                    <router-link to="/myorderlist" v-if="$store.state.memberStore.memberInfo.member_id" class="text-white"><small class="text-header ms-2">주문내역 </small>/</router-link>
                    <router-link to="/inquirylist" v-if="$store.state.memberStore.memberInfo.member_id" class="text-white"><small class="text-header ms-2">1:1문의</small></router-link>
                    <router-link to="/admin" v-if="this.$store.state.memberStore.memberInfo.member_type == 'b03'" class="text-white">/<small class="text-header mx-2">관리자 페이지</small></router-link>
                </div>
            </div>
        </div>
        <div class="container px-0">
            <nav class="navbar navbar-light bg-white navbar-expand-xl">
                <router-link to="/main" class="navbar-brand">
                    <img src="../assets/img/과자파티_투명배경.png" />
                </router-link>
                <button class="navbar-toggler py-2 px-3" type="button" data-bs-toggle="collapse"
                    data-bs-target="#navbarCollapse">
                    <span class="fa fa-bars text-primary"></span>
                </button>
                <div class="collapse navbar-collapse bg-white" id="navbarCollapse">
                    <div class="navbar-nav mx-auto">
                        <router-link to="/main" class="nav-item nav-link active">메인화면</router-link>
                        <router-link to="/productlist" class="nav-item nav-link">전체상품</router-link>
                        <div class="nav-item dropdown">
                            <a href="#" class="nav-link dropdown-toggle" data-bs-toggle="dropdown">카테고리별 상품</a>
                            <div class="dropdown-menu m-0 bg-secondary rounded-0">
                                <router-link to="/productlist/e01" class="nav-item nav-link">과자</router-link>
                                <router-link to="/productlist/e02" class="nav-item nav-link">비스킷/크래커</router-link>
                                <router-link to="/productlist/e03" class="nav-item nav-link">쿠키/파이</router-link>
                                <router-link to="/productlist/e04" class="nav-item nav-link">유기농/전통과자</router-link>
                                <router-link to="/productlist/e05" class="nav-item nav-link">초콜릿</router-link>
                                <router-link to="/productlist/e06" class="nav-item nav-link">젤리/캐러멜</router-link>
                            </div>
                        </div>
                        <router-link to="/noticelist" class="nav-item nav-link">공지사항</router-link>
                    </div>
                    <div class="d-flex m-3 me-0">
                        <!-- <button class="btn-search btn border border-secondary btn-md-square rounded-circle bg-white me-4" data-bs-toggle="modal" data-bs-target="#searchModal">
                            <i class="fas fa-search text-primary"></i>
                        </button> -->

                        <!-- 찜 -->
                        <router-link to="/likes" v-if="$store.state.memberStore.memberInfo.member_id" class="position-relative me-4 my-auto icon">
                            <svg xmlns="http://www.w3.org/2000/svg" width="45" height="25" fill="currentColor" class="bi bi-heart-fill" viewBox="0 0 16 16">
                                <path fill-rule="evenodd" d="M8 1.314C12.438-3.248 23.534 4.735 8 15-7.534 4.736 3.562-3.248 8 1.314"/>
                            </svg>
                        </router-link>

                        <!-- 장바구니 -->
                        <router-link to="/cart" v-if="$store.state.memberStore.memberInfo.member_id" class="position-relative me-4 my-auto icon">
                            <i class="fa fa-shopping-bag fa-2x"></i>
                            <!-- 장바구니개수 -->
                            <!-- <span
                                class="position-absolute bg-secondary rounded-circle d-flex align-items-center justify-content-center text-dark px-1"
                                style="top: -5px; left: 15px; height: 20px; min-width: 20px;">3
                            </span> -->
                        </router-link>

                        

                        <a href="#" class="my-auto icon" @click="memberInfo()">
                            <i class="fas fa-user fa-2x"></i>
                        </a>
                    </div>
                </div>
            </nav>
        </div>
    </div>
    <!-- Navbar End -->
</template>

<script>
export default {
    name: "header_part",
    data() {
        return {
            memId: this.$store.state.memberStore.memberInfo.member_id,
        }
    },
    created(){
        console.log(this.memId);
    },
    methods : {
        async memberLogout() {
            if(this.$store.state.memberStore.kakaoInfo.id > 0) {
                window.Kakao.Auth.logout(() => {
                    console.log('카카오 로그아웃');
                    }
                )
            }
            this.$store.commit('clearStore');
            alert('로그아웃 되었습니다.');
            this.$router.push({path : '/'});
        },
        async memberInfo() {
            if(this.$store.state.memberStore.loginStatus) {
                this.$router.push({path : '/signup'});
            } else {
                alert('로그인을 해주세요.');
                this.$router.push({path : '/login'});
            }
        }
    },
    computed: {
        user() {
        return this.$store.state.loginStore.user;
    }
  }

}
</script>

<style>
.icon {
    color: #646b6b
}
.nav-item{
    margin-right: 30px;
    font-weight: bold;
}
.text-header {
    font-weight: bold;
    font-size: 14px;
}
.topbar {
    padding: 25px;
}
</style>