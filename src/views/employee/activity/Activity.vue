<template>
  <div class="main-container">
    <!-- sideBar -->
    <div class="sidebar">
      <div class="sidebar-header">
        <h2>活動管理</h2>
      </div>
      <div class="sidebar-buttons">
        <router-link to="/employee/activity/act_HoldingManager">
          <button class="sidebar-button custom-router-link">現行活動區</button>
        </router-link>
        <router-link to="/employee/activity/act_PastManager">
          <button class="sidebar-button custom-router-link">過去活動區</button>
        </router-link>
        <button
          class="sidebar-button custom-router-link"
          data-bs-toggle="collapse"
          data-bs-target="#collapseExample"
        >
          訂單管理
        </button>
        <div class="collapse" id="collapseExample">
          <router-link to="/employee/room/conduct_page">
            <button class="sidebar-button custom-router-link">進行中</button>
          </router-link>
          <router-link to="/employee/room/unstarted_page">
            <button class="sidebar-button custom-router-link">未開始</button>
          </router-link>
          <router-link to="/employee/room/over_page">
            <button class="sidebar-button custom-router-link">已結束</button>
          </router-link>
        </div>
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

<script setup></script>

<style scoped>
.main {
  flex: 1;
  padding: 40px;
}

.main-container {
  display: flex;
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
