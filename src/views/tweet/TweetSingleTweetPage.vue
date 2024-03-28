<template>
    <h3>{{ name }}</h3>
    <div v-if="tweets.tweetId != null" class="tweet-container">
        <TweetItem :key="tweets.tweetId" :tweet="tweets" />
    </div>

    <router-link to="/tweetPage/tweetsMyWallPage"><button class="sidebar-button custom-router-link">
            回到我的發文
        </button></router-link>

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
        console.log("this.tweets" + this.tweets)
        this.name = tweetStore.user;

        if (this.name.length === 0) {
            this.$router.push("/tweetPage/tweetsMyWallPage");

        }

    }


}
</script>
<style></style>