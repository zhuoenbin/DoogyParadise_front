<template>
    <div class="main-container">

        <!-- sideBar -->
        <div class="sidebar">
            <div class="sidebar-header">
                <h2>狀態欄</h2>
            </div>
            <div class="sidebar-buttons">
                <router-link to="/tweetPage/tweetsWallPage"><button
                        class="sidebar-button custom-router-link">首頁</button></router-link>
                <button class="sidebar-button" @click="showModal">發文</button>
                <router-link to="/tweetPage/tweetsMyWallPage"><button
                        class="sidebar-button custom-router-link">我的發文</button></router-link>
                <button class="sidebar-button">訊息</button>
                <button class="sidebar-button">通知</button>

            </div>
        </div>


        <router-view></router-view>

    </div>

    <!-- 發文的彈出式視窗 -->
    <div ref="myModal" class="modal fade" tabindex="-1" aria-labelledby="exampleModalLabel" aria-hidden="true">
        <div class="modal-dialog">
            <div class="modal-content">
                <div class="modal-header">
                    <h5 class="modal-title" id="exampleModalLabel">發個動態~</h5>
                    <button type="button" class="btn-close" data-bs-dismiss="modal" aria-label="Close"></button>
                </div>
                <div class="modal-body">
                    <div class="mb-3">
                        <textarea v-model="postTweetContent" class="form-control" id="tweetContent"
                            placeholder="What's happening?" rows="3"></textarea>
                    </div>
                    <!-- 其他仿推特功能 -->
                    <div class="mb-3">
                        <label for="imageUpload" class="form-label">Upload Image:</label>
                        <input type="file" class="form-control" id="imageUpload" ref="imageUpload">
                    </div>
                    <div class="mb-3">
                        <label for="tagFriends" class="form-label">Tag Friends:</label>
                        <input type="text" class="form-control" id="tagFriends" placeholder="Tag friends...">
                    </div>

                </div>
                <div class="modal-footer">
                    <button type="button" class="btn btn-secondary" data-bs-dismiss="modal">
                        Close
                    </button>
                    <button type="button" class="btn btn-primary" @click="postTweet"
                        data-bs-dismiss="modal">Post</button>
                </div>
            </div>
        </div>
    </div>

</template>
<script>
import axios from 'axios';
import { useMemberStore } from '@/stores/memberStore';

export default {
    components: {
        // TweetItem,
        // Sidebar
    },
    data() {
        return {
            postTweetContent: "",
            isModalOpen: false,
        }
    },
    mounted() {

    },
    methods: {
        showModal() {
            // https://bootstrap5.hexschool.com/docs/5.1/components/modal/#via-javascript
            const myModal = new bootstrap.Modal(this.$refs.myModal);
            myModal.show()
        },
        reloadPage() {
            // 调用 window.location.reload() 方法重新加载页面
            window.location.reload();
        },
        postTweet() {
            const memberStore = useMemberStore();

            const formData = new FormData();
            formData.append('memberId', memberStore.memberId);
            formData.append('tweetContent', this.postTweetContent);
            if (this.$refs.imageUpload.files.length > 0) {
                formData.append('image', this.$refs.imageUpload.files[0]);
                axios.post(`${this.API_URL}/tweet/postTweetWithPhoto`, formData, {
                    headers: {
                        'Content-Type': 'multipart/form-data'
                    }
                })
                    .then(response => {
                        console.log("發文成功:", response.data);
                        // 清空推文内容
                        this.postTweetContent = "";
                        this.$refs.imageUpload.value = "";
                        this.$router.go(0)
                    })
                    .catch(error => {
                        console.error("發文失败:", error);
                    })
            } else {
                axios.post(`${this.API_URL}/tweet/postTweetOnlyText`, formData, {
                    headers: {
                        'Content-Type': 'multipart/form-data'
                    }
                })
                    .then(response => {
                        console.log("發文成功:", response.data);
                        // 清空推文内容
                        this.postTweetContent = "";
                        this.$router.go(0)
                    })
                    .catch(error => {
                        console.error("發文失败:", error);
                    })
            }


        }
    }

}
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