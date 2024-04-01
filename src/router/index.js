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
      path: "/forgetPassword",
      component: () => import("@/views/account/ForgetPassword.vue"),
    },
    {
      path: "/register",
      component: () => import("@/views/account/Register.vue"),
    },
    {
      path: "/profile",
      component: () => import("@/views/member/MemberProfile.vue"),
      children: [
        {
          path: "detail",
          component: () => import("@/views/member/MemberDetail.vue"),
        },
        {
          path: "mydog",
          name: "mydog",
          component: () => import("@/views/member/MemberDog.vue"),
        },
        {
          path: "addDog",
          name: "addDog",
          component: () => import("@/views/member/MemberAddDog.vue"),
        },
      ],
    },
    {
      path: "/tweetPage",
      component: () => import("@/views/tweet/TweetMainPage.vue"),
      children: [
        {
          path: "tweetsWallPage",
          component: () => import("@/views/tweet/TweetsWall.vue"),
        },
        {
          path: "tweetsMyWallPage",
          component: () => import("@/views/tweet/TweetMyWall.vue"),
        },
        {
          path: "tweetsOthersWallPage",
          component: () => import("@/views/tweet/TweetOthersWall.vue"),
        },
        {
          path: "tweetsSingleTweetPage",
          component: () => import("@/views/tweet/TweetSingleTweetPage.vue"),
        },
        {
          path: "tweetsMyFollowPage",
          component: () => import("@/views/tweet/TweetFollowPage.vue"),
        },
        {
          path: "tweetsMyNotificationPath",
          component: () => import("@/views/tweet/TweetNotification.vue"),
        },
      ],
    },
    {
      path: "/room",
      component: () => import("@/views/room/Room.vue"),
      children: [
        {
          path: "b_page",
          component: () => import("@/views/room/Booking.vue"),
        },
        {
          path: "o_page",
          name: "o_page",
          component: () => import("@/views/room/Order.vue"),
        },
        {
          path: "h_page",
          name: "h_page",
          component: () => import("@/views/room/History.vue"),
        },
        {
          path: "u_page/:reservationId/:str",
          name: "u_page",
          component: () => import("@/views/room/UpdateFrom.vue"),
        },
      ],
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
          path: "pastActs",
          component: () => import("@/views/activity/PastActivityWall.vue"),
        },
        {
          path: "pastActs/care",
          component: () => import("@/views/activity/PastActivityCareWall.vue"),
        },
        {
          path: "pastActs/eat",
          component: () => import("@/views/activity/PastActivityEatWall.vue"),
        },
        {
          path: "pastActs/play",
          component: () => import("@/views/activity/PastActivityPlayWall.vue"),
        },
        {
          path: "holdingActs",
          component: () => import("@/views/activity/HoldingActivityWall.vue"),
        },
        {
          path: "holdingActs/care",
          component: () =>
            import("@/views/activity/HoldingActivityCareWall.vue"),
        },
        {
          path: "holdingActs/eat",
          component: () =>
            import("@/views/activity/HoldingActivityEatWall.vue"),
        },
        {
          path: "holdingActs/play",
          component: () =>
            import("@/views/activity/HoldingActivityPlayWall.vue"),
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
        {
          path: "myJoinedManager",
          component: () => import("@/views/activity/MyActivitiesManager.vue"),
        },
        {
          path: "myPastJoinedManager",
          component: () =>
            import("@/views/activity/MyPastActivitiesManager.vue"),
        },
      ],
    },
    {
      path: "/employee",
      component: () => import("@/views/employee/Employee.vue"),
      children: [
        {
          path: "t_page",
          component: () => import("@/views/employee/TweetManage.vue"),
        },
        {
          path: "act_page",
          component: () => import("@/views/employee/ActivityManager.vue"),
        },
      ],
    },
    {
      path: "/employee/room",
      component: () => import("@/views/employee/room/Room.vue"),
      children: [
        {
          path: "r_page",
          component: () => import("@/views/employee/room/RoomReservation.vue"),
        },
        {
          path: "u_page",
          component: () => import("@/views/employee/room/RoomUpdate.vue"),
        },
        {
          path: "s_page",
          component: () => import("@/views/employee/room/Schedule.vue"),
        },
      ],
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
          component: () => import("@/views/shop/ShopPage.vue"),
        },
        {
          path: "category",
          component: () => import("@/views/shop/ShopCategory.vue"),
        },
        // :productId動態綁定參數道路由上傳遞
        {
          path: "productPage/:productId",
          name: "product",
          component: () => import("@/views/shop/ProductPage.vue"),
        },
      ],
    },
    {
      path: "/cart",
      component: () => import("@/views/shop/ShoppingCart.vue"),
    },
  ],
});

export default router;
