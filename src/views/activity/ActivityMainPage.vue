<template>
  <div class="main-container">
    <!-- sideBar -->
    <div class="sidebar">
      <div class="sidebar-header">
        <h2>活動</h2>
      </div>
      <button
        class="sidebar-button custom-router-link"
        data-bs-toggle="collapse"
        data-bs-target="#collapse1"
      >
        Activity
      </button>
      <div class="collapse" id="collapse1">
        <router-link to="/activity/holdingActs">
          <button class="sidebar-button custom-router-link">現行活動</button>
        </router-link>
        <router-link to="/activity/pastActs">
          <button class="sidebar-button custom-router-link">過去活動</button>
        </router-link>
        <router-link to="/activity/all">
          <button class="sidebar-button custom-router-link">所有活動</button>
        </router-link>
      </div>
      <button
        class="sidebar-button custom-router-link"
        data-bs-toggle="collapse"
        data-bs-target="#collapse2"
      >
        Venue
      </button>
      <div class="collapse" id="collapse2">
        <router-link to="/activity/venuesIntro">
          <button class="sidebar-button custom-router-link">場地介紹</button>
        </router-link>
        <router-link to="/activity/venueRental">
          <button class="sidebar-button custom-router-link">客戶租借</button>
        </router-link>
        <!-- <router-link to="/employee/activity/act_PastManager">
          <button class="sidebar-button custom-router-link">##</button>
        </router-link> -->
      </div>

      <button
        class="sidebar-button custom-router-link"
        data-bs-toggle="collapse"
        data-bs-target="#collapse3"
      >
        My
      </button>
      <div class="collapse" id="collapse3">
        <router-link to="/activity/myJoinedManager">
          <button class="sidebar-button custom-router-link">報名中</button>
        </router-link>
        <router-link to="/activity/myPastJoinedManager">
          <button class="sidebar-button custom-router-link">過去參加</button>
        </router-link>
        <router-link to="/activity/myFavoriteManager">
          <button class="sidebar-button custom-router-link">我的收藏</button>
        </router-link>
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
  padding: 20px;
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
  text-align: center;
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
