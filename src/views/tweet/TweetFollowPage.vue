<template>
    <div class="tweet-container">
        <h3>我的追蹤</h3>
        <TweetItem v-for="tweet in tweets" :key="tweet.tweetId" :tweet="tweet" />
    </div>
    <!-- 追蹤名單 -->
    <div class="follow-list">
        <h4>追蹤名單</h4>
        <div class="modal-body" v-for="n in this.users" :key="n.userId" @click="goOthersPage(n.lastName)">
            {{ n.lastName }}
            <hr>
        </div>
    </div>

</template>
<script>
import axios from 'axios';
import TweetItem from '@/components/tweet/TweetCard.vue';
import { useMemberStore } from '@/stores/memberStore';
import { useTweetStore } from '@/stores/tweetStore';
import 'bootstrap/dist/js/bootstrap.bundle.min.js';

export default {
    components: {
        TweetItem,
    },
    data() {
        return {
            tweets: [],
            users: [],
        }
    },
    mounted() {
        const memberStore = useMemberStore();
        axios.get(`${this.API_URL}/tweet/getMyFollowTweets?userId=${memberStore.memberId}`)
            .then(response => {
                this.tweets = response.data;
            })
            .catch(error => {
                console.error(error);
            });
        axios.get(`${this.API_URL}/tweet/getMyFollowUsers?userId=${memberStore.memberId}`)
            .then(response => {
                this.users = response.data;
            })
            .catch(error => {
                console.error(error);
            });
    },
    methods: {
        goOthersPage(name) {
            const tweetStore = useTweetStore();
            axios.get(`${this.API_URL}/tweet/getTweetsByUserName/${name}`).then(re => {
                tweetStore.writeIn(re.data)
                tweetStore.setUserName(name)
                this.$router.push("/tweetPage/tweetsOthersWallPage")
            })

        },

    }

}
</script>
<style scoped>
.follow-list {
    margin-top: 39px;
    /* 设置顶部外边距 */
    border: 2px solid #ccc;
    /* 添加边框 */
    padding: 20px;
    /* 添加内边距 */
    border-radius: 6px;
    /* 设置圆角 */
}

.follow-list h4 {
    color: #333;
    /* 设置标题颜色 */
    font-size: 1.5em;
    /* 设置标题字体大小 */
    margin-bottom: 20px;
    /* 设置底部外边距 */
}

.modal-body {
    cursor: pointer;
    /* 鼠标指针样式为手型 */
}

.modal-body:hover {
    background-color: #f0f0f0;
    /* 鼠标悬停时背景颜色变化 */
}
</style>