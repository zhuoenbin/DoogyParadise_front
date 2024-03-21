<template>
    <div class="main-container">
        <Sidebar></Sidebar>
        <div class="tweet-container">
            <TweetItem v-for="tweet in tweets" :key="tweet.tweetId" :tweet="tweet" />
        </div>
    </div>
</template>
<script>
import axios from 'axios';
import TweetItem from '@/components/tweet/TweetCard.vue';
import Sidebar from '@/components/tweet/TweetSidebar.vue';

export default {
    components: {
        TweetItem,
        Sidebar
    },
    data() {
        return {
            tweets: []
        }
    },
    mounted() {
        axios.get(`${this.API_URL}/tweet/getAllTweet`).then(re => {

            this.tweets = re.data;
        })
    },

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

/* 可以在這裡添加樣式以自定義 Sidebar 的外觀和佈局 */
</style>