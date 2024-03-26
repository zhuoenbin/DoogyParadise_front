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
      component: () => import("@/views/account/LoginPage.vue"),
    },{
      path: "/register",
      component: () => import("@/views/account/Register.vue"),
    },
    {
      path: "/profile",
      component: () => import("@/views/member/MemberProfile.vue"),
    },{
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
    },{
      path: "/room",
      component: () => import("@/views/room/Room.vue"),
      children:[
        {
          path:"b_page",
          component:()=>import("@/views/room/Booking.vue")
        },{
          path:"o_page",
          name:"o_page",
          component:()=>import("@/views/room/Order.vue")
        },{
          path:"h_page",
          component:()=>import("@/views/room/History.vue")
        },{
          path:"u_page/:reservationId/:str",
          name:"u_page",
          component:()=>import("@/views/room/UpdateFrom.vue")
        }
      ]
    },{
      path: "/activity",
      component: () => import("@/views/activity/ActivityMainPage.vue"),
    },{
      path: "/employee",
      component: () => import("@/views/employee/Employee.vue"),
      children:[
        {
          path:"r_page",
          component:()=>import("@/views/employee/RoomReservation.vue")
        }
      ]
    },
    {
      path: "/:pathMatch(.*)*",
      component: () => import("@/views/NotFound.vue"),
    }
  ],
});

export default router;