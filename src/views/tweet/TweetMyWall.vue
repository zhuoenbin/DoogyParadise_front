<template>
    <h3>我的推文</h3>
    <div class="tweet-container">
        <TweetItem v-for="tweet in tweets" :key="tweet.tweetId" :tweet="tweet" />
    </div>
</template>
<script>

import axios from 'axios';
import TweetItem from '@/components/tweet/TweetCard.vue';
import { useMemberStore } from '@/stores/memberStore';

export default {
    components: {
        TweetItem,
    },
    data() {
        return {
            tweets: [],
        }
    },
    mounted() {
        const memberStore = useMemberStore();
        axios.get(`${this.API_URL}/tweet/getTweetsByUserId/${memberStore.memberId}`).then(re => {
            this.tweets = re.data;
        })
    },

}
</script>
<style></style>