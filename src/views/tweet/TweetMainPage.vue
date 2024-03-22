<template>
  <div class="main-container">
    <!-- sideBar -->
    <div class="sidebar">
      <div class="sidebar-header">
        <h2>狀態欄</h2>
      </div>
      <div class="sidebar-buttons">
        <router-link to="/tweetPage/a_page"
          ><button class="sidebar-button custom-router-link">
            首頁
          </button></router-link
        >
        <button class="sidebar-button" @click="showModal">發文</button>
        <!-- <PostModal v-if="isModalOpen" @close="closeModal" /> -->
        <button class="sidebar-button">訊息</button>
        <button class="sidebar-button">通知</button>
        <!-- 其他按鈕 -->
      </div>
    </div>

    <!-- 本體 -->
    <router-view></router-view>
    <!-- <div class="tweet-container">
            <TweetItem v-for="tweet in tweets" :key="tweet.tweetId" :tweet="tweet" />
        </div> -->
  </div>

  <!-- 發文的彈出式視窗 -->
  <div
    ref="myModal"
    class="modal fade"
    tabindex="-1"
    aria-labelledby="exampleModalLabel"
    aria-hidden="true"
  >
    <div class="modal-dialog">
      <div class="modal-content">
        <div class="modal-header">
          <h5 class="modal-title" id="exampleModalLabel">互動視窗</h5>
          <button
            type="button"
            class="btn-close"
            data-bs-dismiss="modal"
            aria-label="Close"
          ></button>
        </div>
        <div class="modal-body">...</div>
        <div class="modal-footer">
          <button
            type="button"
            class="btn btn-secondary"
            data-bs-dismiss="modal"
          >
            Close
          </button>
          <button type="button" class="btn btn-primary">Save changes</button>
        </div>
      </div>
    </div>
  </div>
</template>
<script>
import axios from "axios";
import TweetItem from "@/components/tweet/TweetCard.vue";
// import Sidebar from '@/components/tweet/TweetSidebar.vue';

export default {
  components: {
    TweetItem,
    // Sidebar
  },
  data() {
    return {
      tweets: [],
      isModalOpen: false,
    };
  },
  mounted() {},
  methods: {
    showModal() {
      // https://bootstrap5.hexschool.com/docs/5.1/components/modal/#via-javascript
      const myModal = new bootstrap.Modal(this.$refs.myModal);
      myModal.show();
    },
  },
};
</script>
<style scoped>
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
