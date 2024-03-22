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
      component: () => import("@/views/account/LoginPage.vue"),
    },
    {
      path: "/register",
      component: () => import("@/views/account/Register.vue"),
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
      children: [
        {
          path: "a_page",
          component: () => import("@/views/tweet/TweetTest.vue"),
        },
      ],
    },
    {
      path: "/RoomP",
      name: "RoomP",
      component: Room,
    },
    {
      path: "/activity",
      component: () => import("@/views/activity/ActivityMainPage.vue"),
      children: [
        {
          path: "create",
          component: () => import("@/views/activity/CreateActivity.vue"),
        },
      ],
    },
  ],
});

export default router;
