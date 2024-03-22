<template>
  <div class="tweet-container">
    <TweetItem v-for="tweet in tweets" :key="tweet.tweetId" :tweet="tweet" />
  </div>
</template>
<script>
import axios from "axios";
import TweetItem from "@/components/tweet/TweetCard.vue";

export default {
  components: {
    TweetItem,
    // Sidebar
  },
  data() {
    return {
      tweets: [],
    };
  },
  mounted() {
    axios.get(`${this.API_URL}/tweet/getAllTweet`).then((re) => {
      this.tweets = re.data;
    });
  },
};
</script>
<style></style>
