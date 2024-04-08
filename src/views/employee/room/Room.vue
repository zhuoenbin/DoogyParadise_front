<template>
  <div class="main-container">
    <!-- sideBar -->
    <div class="sidebar">
      <div class="sidebar-header">
        <h2>訂房管理</h2>
      </div>
      <div class="sidebar-buttons">
        <router-link to="/employee/room/u_page">
          <button class="sidebar-button custom-router-link">房間管理</button>
        </router-link>
        <button
          class="sidebar-button custom-router-link"
          data-bs-toggle="collapse"
          href="#collapseExample"
          role="button"
          aria-expanded="false"
          aria-controls="collapseExample"
        >
          訂單管理
        </button>
        <div
          class="collapse"
          id="collapseExample"
          aria-expanded="false"
          aria-controls="collapseExample"
        >
          <div class="card">
            <button
              class="sidebar-button custom-router-link"
              @click="navigateToConductPage('conduct_page')"
            >
              進行中
            </button>
            <button
              class="sidebar-button custom-router-link"
              @click="navigateToConductPage('unstarted_page')"
            >
              未開始
            </button>
            <button
              class="sidebar-button custom-router-link"
              @click="navigateToConductPage('over_page')"
            >
              已結束
            </button>
            <button
              class="sidebar-button custom-router-link"
              @click="navigateToConductPage('cancel_page')"
            >
              取消
            </button>
          </div>
        </div>
        <router-link to="/employee/room/roomChart_page">
          <button class="sidebar-button custom-router-link">房間圖表</button>
        </router-link>
        <router-link to="/employee">
          <button class="sidebar-button custom-router-link">後臺管理</button>
        </router-link>
        <!-- 其他按鈕 -->
      </div>
    </div>

    <!-- 本體 -->
    <div class="main">
      <router-view></router-view>
    </div>
  </div>
</template>

<script setup>
import { useRouter } from "vue-router";

const router = useRouter();

const navigateToConductPage = (page) => {
  router.push(`/employee/room/${page}`);
};
</script>

<style scoped>
.main {
  flex: 1;
  padding: 40px;
}

.main-container {
  display: flex;
}

.card {
  background-color: #f0f0f0;
  border: none;
}

.sidebar {
  background-color: #f0f0f0;
  padding: 20px;
  max-width: 15%;
  min-height: 82vh;
}

.sidebar-header h2 {
  margin: 20px 0 40px;
}

.sidebar-buttons {
  display: flex;
  flex-direction: column;
}

.sidebar-button {
  margin-bottom: 20px;
  padding: 10px;
  background-color: #fff;
  border: 1px solid #ddd;
  border-radius: 5px;
  cursor: pointer;
  transition: all 0.5s;
}

.sidebar-button:hover {
  background-color: #999898;
  color: #fff;
}

/* sideBar 按鈕的寬度 */
.custom-router-link {
  width: 100%;
}
</style>
