<template>
  <div class="main-container">
    <!-- sideBar -->
    <div class="sidebar">
      <div class="sidebar-header">
        <h2>狗狗商城</h2>
      </div>
      <div class="sidebar-buttons">
        <router-link to="/shop/shopPage"
          ><button class="sidebar-button custom-router-link">
            全部商品
          </button></router-link
        >
        <router-link to="/shop/category"
          ><button class="sidebar-button custom-router-link">
            狗狗零食
          </button></router-link
        >
        <router-link to="/shop/categoryTwo"
          ><button class="sidebar-button custom-router-link">
            狗狗罐頭
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
/* background-color(sidebar底色) */
.sidebar {
  background-color: #ffe66f;
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
  background-color: #bbffbb;
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
/* 添加每一個page的背景颜色 */
.main-container {
  background-color: #fff8d7;
}
/* display: flex; */
</style>
