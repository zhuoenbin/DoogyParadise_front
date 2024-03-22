<template>
    <div class="tweet-item">
        <div>tweetID: {{ tweet.tweetId }}</div>
        <div>tweetName: {{ tweet.userName }}</div>
        <div>tweetContent: {{ tweet.tweetContent }}</div>

        <div v-if="tweet.tweetGalleries && tweet.tweetGalleries.length > 0">
            <div>Tweet Galleries:</div>
            <div v-for="(gallery, index) in tweet.tweetGalleries" :key="index">

                <img :src="getImageUrl(gallery.imgPath)" alt="Gallery Image">
            </div>
        </div>
    </div>
</template>

<script>


export default {

    props: {
        tweet: {
            type: Object,
            required: true
        }
    },
    methods: {
        getImageUrl(imgPath) {
            return `${this.API_URL}/tweet/getImage/${imgPath}`;
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