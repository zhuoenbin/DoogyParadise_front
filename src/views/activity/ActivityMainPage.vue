<template>
  <div>
    <Sidebar></Sidebar>
    <router-view></router-view>
  </div>
</template>
<script>
import axios from "axios";
import Sidebar from "@/views/activity/ActivitySideBar.vue";
export default {
  components: {
    Sidebar,
  },
};
</script>
<style></style>
