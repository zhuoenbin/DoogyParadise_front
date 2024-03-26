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
  mounted() {
    fetch(`${this.API_URL}/activity/api/types`)
      .then((rs) => rs.json())
      .then((typeObj) => {
        this.types = typeObj;
      });
  },
  data() {
    return {
      types: [],
    };
  },
};
</script>
<style></style>
