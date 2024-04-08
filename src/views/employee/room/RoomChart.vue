<template>
  <div class="flex">
    <RoomChart class="chart-canvas" />
    <RoomStarChart class="chart-canvas" />
  </div>
</template>

<script>
import RoomChart from "@/components/room/RoomChart.vue";
import RoomStarChart from "@/components/room/RoomStarChart.vue";

export default {
  components: {
    RoomChart,
    RoomStarChart,
  },
};
</script>
<style scoped>
template {
  height: 100%;
}

.chart-canvas {
  width: 48%;
  height: 350px;
  margin: auto;
  padding: 20px;
  border: 1px solid rgb(216, 215, 215);
  border-radius: 10px;
  /* box-shadow: -10px 10px 2px rgba(183, 183, 183, 0.5); */
}

.flex {
  display: flex;
  width: 100%;
  height: 100%;
  justify-content: space-between; /* 左右对齐 */
}
</style>
