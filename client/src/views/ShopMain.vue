<template>
    <!-- 상단 배너 Start -->
    <div class="container-fluid py-5 mb-5 hero-header">
        <div class="container py-5">
            <div class="row g-5 align-items-center">
                <div class="col-md-12 col-lg-6 mb-4">
                    <h4 class="mb-4 text">SNACK PARTY</h4>
                    <h1 class="mb-4 display-3 text">맛있는 건 다 있는<br>과자파티</h1>
                    <h4 class="mb-4 text">다양한 종류의 과자들을 만나보세요</h4>
                    <div class="mb-4 position-relative mx-auto">
                        <button type="button" class="btn btn-primary border-2 border-secondary py-3 px-4 position-absolute rounded-pill text-white"
                        @click="$router.push('productlist')">과자 쇼핑하기</button>
                    </div>
                </div>
                <div class="col-md-12 col-lg-6">
                    <div id="carouselId" class="carousel slide position-relative  " data-bs-ride="carousel">
                        <div class="carousel-inner" role="listbox">
                            <div class="carousel-item active rounded">
                                <img src="img/hero-img-1.jpg" class="img-fluid rounded heroImg"
                                    alt="First slide">
                            </div>
                            <div class="carousel-item rounded">
                                <img src="img/hero-img-2.jpg" class="img-fluid rounded heroImg" alt="Second slide">
                            </div>
                        </div>
                        <button class="carousel-control-prev carousel-control" type="button" data-bs-target="#carouselId" data-bs-slide="prev">
                            <span class="carousel-control-prev-icon" aria-hidden="true"></span>
                            <span class="visually-hidden">Previous</span>
                        </button> 
                        <button class="carousel-control-next carousel-control" type="button" data-bs-target="#carouselId" data-bs-slide="next">
                            <span class="carousel-control-next-icon" aria-hidden="true"></span>
                            <span class="visually-hidden">Next</span>
                        </button>
                    </div>
                </div>
            </div>
        </div>
    </div>
    <!-- 상단 배너 End -->


    <!-- 인기상품 Start -->
    <div class="container-fluid fruite py-5">
        <div class="container py-5">
            <div class="tab-class text-center">
                <div class="tab-content">
                    <div id="tab-1" class="tab-pane fade show p-0 active">
                        <div class="row g-4">
                            <div class="col-lg-4 text-start">
                                <h1>인기 상품</h1>
                            </div>
                            <MainProductList :sort="popular" />
                        </div>
                    </div>
                </div>
            </div>
        </div>
    </div>
    <!-- 인기상품 End-->


    <!-- 신상품 Start -->
    <div class="container-fluid fruite py-5">
        <div class="container py-5">
            <div class="tab-class text-center">
                <div class="tab-content">
                    <div id="tab-1" class="tab-pane fade show p-0 active">
                        <div class="row g-4">
                            <div class="col-lg-4 text-start">
                                <h1>신상품</h1>
                            </div>
                            <MainProductList :sort="newArrival" />
                        </div>
                    </div>
                </div>
            </div>
        </div>
    </div>
    <!-- 신상품 End-->


    <!-- Banner Section Start-->
    <div class="container-fluid banner bg-secondary my-5">
        <div class="container py-5">
            <div class="row g-4 align-items-center">
                <div class="col-lg-6">
                    <div class="py-4">
                        <h1 class="display-3 text-white">Fresh Exotic Fruits</h1>
                        <p class="fw-normal display-3 text-dark mb-4">in Our Store</p>
                        <p class="mb-4 text-dark">The generated Lorem Ipsum is therefore always free from repetition
                            injected humour, or non-characteristic words etc.</p>
                        <a href="#"
                            class="banner-btn btn border-2 border-white rounded-pill text-dark py-3 px-5">BUY</a>
                    </div>
                </div>
                <div class="col-lg-6">
                    <div class="position-relative">
                        <img src="img/baner-1.png" class="img-fluid w-100 rounded" alt="">
                        <div class="d-flex align-items-center justify-content-center bg-white rounded-circle position-absolute"
                            style="width: 140px; height: 140px; top: 0; left: 0;">
                            <h1 style="font-size: 100px;">1</h1>
                            <div class="d-flex flex-column">
                                <span class="h2 mb-0">50$</span>
                                <span class="h4 text-muted mb-0">kg</span>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    </div>
    <!-- Banner Section End -->


</template>

<script>
// import axios from 'axios';
import MainProductList from '../components/MainProductList.vue';

export default {
    name: 'ShopMain',
    components: {
        MainProductList
    },
    data() {
        return {
            popular: 'popular',
            newArrival : 'newArrival',
        }
    }
}
</script>
<style>
    .img-fluid {
        /* height: 80% !important; */
        
    }
    .carousel-control {
        top: 50% !important;
        
    }
    .carousel {
        /* height: 100px !important; */
    }
    .heroImg {
        height: 400px;
        width: 400px;
    }
</style>