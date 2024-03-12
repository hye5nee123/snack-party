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
                            <div class="carousel-item rounded">
                                <img src="img/hero-img-3.jpg" class="img-fluid rounded heroImg" alt="Third slide">
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
        height: 600px;
        width: 600px;
    }
</style>