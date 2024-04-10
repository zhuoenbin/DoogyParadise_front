<template>
  <div class="main-container">
    <!-- sideBar -->
    <div class="sidebar">
      <div class="sidebar-header">
        <h2>後臺管理</h2>
      </div>
      <div class="sidebar-buttons">
        <router-link to="/"
          ><button class="sidebar-button custom-router-link">
            商城首頁
          </button></router-link
        >
        <router-link to="/"
          ><button class="sidebar-button custom-router-link">
            檢舉管理
          </button></router-link
        >
        <router-link to="/employee/room/u_page"
          ><button class="sidebar-button custom-router-link">
            訂房管理
          </button></router-link
        >
        <router-link to="/"
          ><button class="sidebar-button custom-router-link">
            商品管理
          </button></router-link
        ><router-link to="/"
          ><button class="sidebar-button custom-router-link">
            退貨處理
          </button></router-link
        >
        <router-link to="/employee/activity/act_HoldingManager"
          ><button class="sidebar-button custom-router-link">
            活動管理
          </button></router-link
        >
        <router-link to="/employee/t_page"
          ><button class="sidebar-button custom-router-link">
            推文管理
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
