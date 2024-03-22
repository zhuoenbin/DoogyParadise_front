import { createRouter, createWebHistory } from "vue-router";
import Room from '@/views/room/Room.vue';
import Employee from '@/views/employee/Employee.vue';

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
      component: () => import("@/views/MemberProfile.vue"),
    },{
      path:'/RoomP',
      name: 'RoomP',
      component: Room
    },{
      path:'/EmployeeP',
      name: 'EmployeeP',
      component: Employee
    },
    {
      path: "/:pathMatch(.*)*",
      component: () => import("@/views/NotFound.vue"),
    }
  ],
});

export default router;