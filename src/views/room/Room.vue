<template>
  <div class="main-container">
    <!-- sideBar -->
    <div class="sidebar">
      <div class="sidebar-header">
        <h2>寵物旅館</h2>
      </div>
      <div class="sidebar-buttons">
        <router-link to="/room/b_page"
          ><button class="sidebar-button custom-router-link">
            訂房
          </button></router-link
        >
        <router-link to="/room/h_page"
          ><button class="sidebar-button custom-router-link">
            預約訂房管理
          </button></router-link
        >
        <router-link to="/room/o_page"
          ><button class="sidebar-button custom-router-link">
            歷史訂房紀錄
          </button></router-link
        >
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
  width: 80%;
  padding: 40px 0 0 80px;
}

.main-container {
  display: flex;
}

.tweet-container {
  flex: 1;
  padding: 20px;
}

.sidebar {
  background-color: #f0f0f0;
  padding: 20px;
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
  /* 設置寬度為父元素的 100% */
}
</style>
