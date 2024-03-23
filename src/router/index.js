import { createRouter, createWebHistory } from "vue-router";
import Room from "@/views/room/Room.vue";

const router = createRouter({
  history: createWebHistory(import.meta.env.BASE_URL),
  routes: [
    {
      path: "/",
      component: () => import("@/views/HomePage.vue"),
    },
    {
      path: "/login",
      name:"login",
      component: () => import("@/views/account/LoginPage.vue"),
    },
    {
      path: "/register",
      component: () => import("@/views/account/Register.vue"),
    },{
      path: "/forgetPassword",
      component: () => import("@/views/account/ForgetPassword.vue"),
    },
    {
      path: "/profile",
      component: () => import("@/views/member/MemberProfile.vue"),
    },
    {
      path: "/:pathMatch(.*)*",
      component: () => import("@/views/NotFound.vue"),
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
    },{
      path:'/RoomP',
      name: 'RoomP',
      component: Room
  },
    {
      path: "/activity",
      component: () => import("@/views/activity/ActivityMainPage.vue"),
    },
  ],
});

export default router;
