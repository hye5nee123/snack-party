import UserMain from "../views/UserMain.vue";
import Main from "../views/ShopMain.vue";

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
      component: import(/* webpackChunkName: "productlist", webpackPrefetch: false */ "../views/product/ProductList.vue"),
    },
    {
      path: "productlist/:category",
      name: "ProductListCategory",
      component: import(/* webpackChunkName: "productlist", webpackPrefetch: false */ "../views/product/ProductList.vue"),
    },
    {
      path: "productinfo",
      name: "ProductInfo",
      component: import(/* webpackChunkName: "productlist", webpackPrefetch: false */ "../views/product/ProductInfo.vue"),
    },
    {
      path: "signup",
      name: "SignUp",
      component: import(/* webpackChunkName: "signup", webpackPrefetch: false */ "../views/member/SignUp.vue"),
    },
    {
      path: "login",
      name: "LoginView",
      component: import(/* webpackChunkName: "loginview", webpackPrefetch: false */ "../views/member/LoginView.vue"),
    },
    {

      path: "sociallogin",
      name: "SocialLogin",
      component: import(/* webpackChunkName: "loginview", webpackPrefetch: false */ "../views/member/SocialLogin.vue"),
    },
    {
      path: "cart",
      name: "Cart",
      component: import(/* webpackChunkName: "cart", webpackPrefetch: false */ "../views/order/CartView.vue"),
    },
    {
      path: "checkout",
      name: "CheckOut",
      component: import(/* webpackChunkName: "checkout", webpackPrefetch: false */ "../views/order/CheckOutView.vue"),
    },
    {
      path: "ordcompleted",
      name: "OrdCompleted",
      component: import(/* webpackChunkName: "ordcompleted", webpackPrefetch: false */ "../views/order/OrdCompletedView.vue"),
    },
    {
      path: "reviewlist",
      name: "ReviewList",
      component: import(/* webpackChunkName: "reviewlist", webpackPrefetch: false */ "../views/review/ReviewList.vue"),
    },
    {
      path: "reviewinsert",
      name: "ReviewInsert",
      component: import(/* webpackChunkName: "reviewinsert", webpackPrefetch: false */ "../views/review/ReviewInsert.vue"),
    },
    {
      path: "pinquiryinsert",
      name: "PInquiryInsert",
      component: import(/* webpackChunkName: "pinquiryinsert", webpackPrefetch: false */ "../views/inquiry/PInquiryInsert.vue")
    },
    {
      path: "pinquirylist",
      name: "PInquiryList",
      component: import(/* webpackChunkName: "pinquirylist", webpackPrefetch: false */ "../views/inquiry/PInquiryList.vue"),
    },
    {
      path : 'checkouttest',
      name : 'CheckOutTest',
      component : import(/* webpackChunkName: "checkouttest", webpackPrefetch: false */ "../views/order/CheckOutTestView.vue")
    }
  ],
};
