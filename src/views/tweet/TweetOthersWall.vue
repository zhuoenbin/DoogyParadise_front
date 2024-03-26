<template>
    <h3>{{ name }}</h3>
    <div class="tweet-container">
        <TweetItem v-for="tweet in tweets" :key="tweet.tweetId" :tweet="tweet" />
    </div>
</template>
<script>
import TweetItem from '@/components/tweet/TweetCard.vue';
import { useTweetStore } from '@/stores/tweetStore';

export default {
    components: {
        TweetItem,
    },
    data() {
        return {
            tweets: [],
            name: ""
        }
    },
    mounted() {
        const tweetStore = useTweetStore();
        this.tweets = tweetStore.tweets;
        this.name = tweetStore.user;

        tweetStore.clearMsg();
    }


}
</script>
<style></style>