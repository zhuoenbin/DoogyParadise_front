<template>
  <div class="main-container">
    <!-- sideBar -->
    <div class="sidebar">
      <div class="sidebar-header">
        <h2>後臺管理系統</h2>
      </div>
      <div class="sidebar-buttons">
        <router-link to="/"
          ><button class="sidebar-button custom-router-link">
            商城首頁
          </button></router-link
        >
        <button class="sidebar-button">檢舉管理</button>
        <button class="sidebar-button">商品管理</button>
        <button class="sidebar-button">訂房管理</button>
        <button class="sidebar-button">退貨處理</button>
        <!-- 其他按鈕 -->
      </div>
    </div>

    <!-- 本體 -->
    <router-view></router-view>
  </div>
</template>
<script setup>
import axios from "axios";
import TweetItem from "@/components/tweet/TweetCard.vue";
// import Sidebar from '@/components/tweet/TweetSidebar.vue';
</script>
<style scoped>
* {
  margin: 0;
  padding: 0;
}
.main-container {
  display: flex;
}

.tweet-container {
  flex: 1;
  /* 將 tweet-container 擴展以填滿剩餘空間 */
  padding: 20px;
}

/* Sidebar 的外觀和佈局 */
.sidebar {
  background-color: #f0f0f0;
  padding: 20px;
}

.sidebar-header h2 {
  margin-bottom: 10px;
}

.sidebar-buttons {
  display: flex;
  flex-direction: column;
}

.sidebar-button {
  margin-bottom: 10px;
  padding: 10px;
  background-color: #fff;
  border: 1px solid #ddd;
  border-radius: 5px;
  cursor: pointer;
}

.sidebar-button:hover {
  background-color: #e0e0e0;
}

/* sideBar 按鈕的寬度 */
.custom-router-link {
  width: 100%;
  /* 設置寬度為父元素的 100% */
}
</style>
