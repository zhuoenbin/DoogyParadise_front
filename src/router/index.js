import { createRouter, createWebHistory } from "vue-router";

const router = createRouter({
  history: createWebHistory(import.meta.env.BASE_URL),
  routes: [
    {
      path: "/",
      component: () => import("@/views/HomePage.vue"),
    },
    {
      path: "/login",
      name: "login",
      component: () => import("@/views/account/LoginPage.vue"),
    },
    {
      path: "/register",
      component: () => import("@/views/account/Register.vue"),
    },
    {
      path: "/forgetPassword",
      component: () => import("@/views/account/ForgetPassword.vue"),
    },
    {
      path: "/profile",
      component: () => import("@/views/member/MemberProfile.vue"),
    },
    
    {
      path: "/tweetPage",
      component: () => import("@/views/tweet/TweetMainPage.vue"),
      children:[
        {
          path:"tweetsWallPage",
          component:()=>import("@/views/tweet/TweetsWall.vue")
        },{
          path:"tweetsMyWallPage",
          component:()=>import("@/views/tweet/TweetMyWall.vue")
        },{
          path:"tweetsOthersWallPage",
          component:()=>import("@/views/tweet/TweetOthersWall.vue")
        }
      ]
    },
    {
      path: "/room",
      component: () => import("@/views/room/Room.vue"),
      children: [
        {
          path: "b_page",
          component: () => import("@/views/room/Booking.vue")
        },
        {
          path: "o_page",
          component: () => import("@/views/room/Order.vue")
        },
        {
          path: "h_page",
          component: () => import("@/views/room/History.vue")
        }
      ]
    },
    {
      path: "/activity",
      component: () => import("@/views/activity/ActivityMainPage.vue"),
      children: [
        {
          path: "create",
          component: () => import("@/views/activity/CreateActivity.vue"),
        },
        {
          path: "all",
          component: () => import("@/views/activity/ActivityWall.vue"),
        },
        {
          path: "venuesIntro",
          component: () => import("@/views/activity/VenuesIntro.vue"),
        },
        {
          path: "myVenuesRental",
          component: () => import("@/views/activity/MyVenueRental.vue"),
        },
        {
          path: "venueRental",
          component: () => import("@/views/activity/VenueRental.vue"),
        },
      ],
    },
    {
      path: "/employee",
      component: () => import("@/views/employee/Employee.vue"),
      children: [
        {
          path: "r_page",
          component: () => import("@/views/employee/RoomReservation.vue")
        }
      ]
    },
    {
      path: "/:pathMatch(.*)*",
      component: () => import("@/views/NotFound.vue"),
    },
    {
      path: "/shop",
      component: () => import("@/views/shop/ShopSidebar.vue"),
      children: [
        {
          path: "shopPage",
          component: () => import("@/views/shop/ShopPage.vue")
        },
        {
          path: "category",
          component: () => import("@/views/shop/ShopCategory.vue")
        },
        // :productId動態綁定參數道路由上傳遞
        {
          path: "productPage/:productId",
          name: "product",
          component: () => import("@/views/shop/ProductPage.vue")
        }
      ]
    },

    {
    path: "/cart",
    component: () => import("@/views/shop/ShoppingCart.vue"),
    },
  ],
});

export default router;
