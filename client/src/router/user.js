import UserMain from "../views/UserMain.vue";
import Main from "../views/ShopMain.vue";
import Store from "../store/index";

export default {
  path: "/",
  name: "home",
  component: UserMain,
  redirect: "/main",
  children: [
    {
      path: "main",
      name: "Main",
      component: Main,
    },
    {
      path: "productlist",
      name: "ProductListAll",
      component: import(/* webpackChunkName: "ProductListAll", webpackPrefetch: false */ "../views/product/ProductList.vue"),
    },
    {
      path: "productlist/:category",
      name: "ProductListCategory",
      component: import(/* webpackChunkName: "ProductListCategory", webpackPrefetch: false */ "../views/product/ProductList.vue"),
    },
    {
      path: "productinfo",
      name: "ProductInfo",
      component: import(/* webpackChunkName: "ProductInfo", webpackPrefetch: false */ "../views/product/ProductInfo.vue"),
    },
    {
      path: "signup",
      name: "SignUp",
      component: import(/* webpackChunkName: "SignUp", webpackPrefetch: false */ "../views/member/SignUp.vue"),
    },
    {
      path: "login",
      name: "LoginView",
      component: import(/* webpackChunkName: "LoginView", webpackPrefetch: false */ "../views/member/LoginView.vue"),
    },
    {
      path: "sociallogin",
      name: "SocialLogin",
      component: import(/* webpackChunkName: "sociallogin", webpackPrefetch: false */ "../views/member/SocialLogin.vue"),
    },
    {
      path: "searchid",
      name: "SearchID",
      component: import(/* webpackChunkName: "searchid", webpackPrefetch: false */ "../views/member/SearchID.vue"),
    },
    {
      path: "searchpw",
      name: "SearchPW",
      component: import(/* webpackChunkName: "searchpw", webpackPrefetch: false */ "../views/member/SearchPW.vue"),
    },
    {
      path: "withdraw",
      name: "WithdrawView",
      component: import(/* webpackChunkName: "withdraw", webpackPrefetch: false */ "../views/member/WithdrawView.vue"),
    },
    {
      path: "cart",
      name: "Cart",
      component: import(/* webpackChunkName: "Cart", webpackPrefetch: false */ "../views/order/CartView.vue"),
      
      beforeEnter: (to, from, next) => {
        let loginStatus =  Store.state.memberStore.loginStatus;
        console.log('loginStatus : ', loginStatus);
        if(!loginStatus ){
          alert('로그인 후 접근 가능한 페이지입니다.'),
          next('/main');
        }
        else {
          next();
        }
      },
    },
    {
      path: "checkout",
      name: "CheckOut",
      component: import(/* webpackChunkName: "CheckOut", webpackPrefetch: false */ "../views/order/CheckOutView.vue"),
    
      beforeEnter: (to, from, next) => {
        let loginStatus =  Store.state.memberStore.loginStatus;
        console.log('loginStatus : ', loginStatus);
        if(!loginStatus ){
          alert('로그인 후 접근 가능한 페이지입니다.'),
          next('/main');
        }
        else {
          next();
        }
      },
    },
    {
      path: "ordcompleted",
      name: "OrdCompleted",
      component: import(/* webpackChunkName: "OrdCompleted", webpackPrefetch: false */ "../views/order/OrdCompletedView.vue"),
    },
    {
      path: "myorderlist",
      name: "MyOrderList",
      component: import(/* webpackChunkName: "myorderlist", webpackPrefetch: false */ "../views/order/MyOrdListView.vue"),
    
      beforeEnter: (to, from, next) => {
        let loginStatus =  Store.state.memberStore.loginStatus;
        console.log('loginStatus : ', loginStatus);
        if(!loginStatus ){
          alert('로그인 후 접근 가능한 페이지입니다.'),
          next('/main');
        }
        else {
          next();
        }
      },
    },
    {
      path: "myorderdetail",
      name: "MyOrderDetail",
      component: import(/* webpackChunkName: "myorderdetail", webpackPrefetch: false */ "../views/order/MyOrdDetailView.vue"),
    
      beforeEnter: (to, from, next) => {
        let loginStatus =  Store.state.memberStore.loginStatus;
        console.log('loginStatus : ', loginStatus);
        if(!loginStatus ){
          alert('로그인 후 접근 가능한 페이지입니다.'),
          next('/main');
        }
        else {
          next();
        }
      },
    },
    
    {
      path: "reviewlist",
      name: "ReviewList",
      component: import(/* webpackChunkName: "ReviewList", webpackPrefetch: false */ "../views/review/ReviewList.vue"),
    },
    {
      path: "reviewinsert",
      name: "ReviewInsert",
      component: import(/* webpackChunkName: "ReviewInsert", webpackPrefetch: false */ "../views/review/ReviewInsert.vue"),
    },
    {
      path: "pinquiryinsert",
      name: "PInquiryInsert",
      component: import(/* webpackChunkName: "PInquiryInsert", webpackPrefetch: false */ "../views/inquiry/PInquiryInsert.vue")
    },
    {
      path: "pinquirylist",
      name: "PInquiryList",
      component: import(/* webpackChunkName: "PInquiryList", webpackPrefetch: false */ "../views/inquiry/PInquiryList.vue"),
    },
    {
      path: 'reviewinfo',
      name: 'ReviewInfo',
      component: import(/* webpackChunkName: "ReviewInfo", webpackPrefetch: false */ "../views/review/ReviewInfo.vue")
    },
    {
      path: 'inquirylist',
      name: 'InquiryList',
      component: import(/* webpackChunkName: "InquiryList", webpackPrefetch: false */ "../views/inquiry/InquiryList.vue")
    },
    {
      path: 'inquiryinsert',
      name: 'InquiryInsert',
      component: import(/* webpackChunkName: "InquiryInsert", webpackPrefetch: false */ "../views/inquiry/InquiryInsert.vue")
    },
  ],
};
