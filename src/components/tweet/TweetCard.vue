<template>
    <div class="tweet-item">
        <div>tweetID: {{ tweet.tweetId }}</div>
        <div>tweetName: {{ tweet.userName }}</div>
        <div>tweetContent: {{ tweet.tweetContent }}</div>
    </div>
</template>

<script>
export default {
    props: {
        tweet: {
            type: Object,
            required: true
        }
    }
};
</script>

<style scoped>
.tweet-item {
    margin-bottom: 10px;
    padding: 10px;
    border: 1px solid #ccc;
    border-radius: 5px;
    width: 80%;
    max-width: 600px;
    background-color: #f9f9f9;
    box-shadow: 0 2px 4px rgba(0, 0, 0, 0.1);
}
</style>