import { createRouter, createWebHistory } from "vue-router";
<<<<<<< HEAD
import Room from '@/views/room/Room.vue';
import Employee from '@/views/employee/Employee.vue';
=======
import Room from "@/views/room/Room.vue";
>>>>>>> origin/Taemi

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
<<<<<<< HEAD
      component: () => import("@/views/MemberProfile.vue"),
=======
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
          path:"a_page",
          component:()=>import("@/views/tweet/TweetTest.vue")
        }
      ]
>>>>>>> origin/Taemi
    },{
      path:'/RoomP',
      name: 'RoomP',
      component: Room
<<<<<<< HEAD
    },{
      path:'/EmployeeP',
      name: 'EmployeeP',
      component: Employee
    },
    {
      path: "/:pathMatch(.*)*",
      component: () => import("@/views/NotFound.vue"),
    }
=======
  },
    {
      path: "/activity",
      component: () => import("@/views/activity/ActivityMainPage.vue"),
    },
>>>>>>> origin/Taemi
  ],
});

export default router;
