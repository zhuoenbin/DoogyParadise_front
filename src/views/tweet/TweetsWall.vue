<!-- <template>
    <div class="tweet-container">
        <TweetItem v-for="tweet in tweets" :key="tweet.tweetId" :tweet="tweet" />
    </div>
</template>
<script>
import axios from 'axios';
import TweetItem from '@/components/tweet/TweetCard.vue';

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
        axios.get(`${this.API_URL}/tweet/getAllTweet`).then(re => {
            this.tweets = re.data;
        })
    },

}
</script>
<style></style> -->


<template>

    <div class="tweet-container">
        <TweetItem v-for="tweet in tweets" :key="tweet.tweetId" :tweet="tweet" />
    </div>

    <!-- <button id="loadMoreBtn" @click="loadMoreTweets">Load More</button> -->

</template>

<script>
import TweetItem from '@/components/tweet/TweetCard.vue';
import axios from 'axios';

export default {
    components: {
        TweetItem,
    },
    data() {
        return {
            tweets: [],
            page: 1,
            isLoading: false
        };
    },
    mounted() {
        this.loadTweets();
        window.addEventListener('scroll', this.handleScroll);
    },
    methods: {
        loadTweets() {
            if (!this.isLoading) {
                this.isLoading = true;
                axios.get(`${this.API_URL}/tweet/getAllTweet`, {
                    params: {
                        page: this.page,
                        limit: 6
                    }
                })
                    .then(response => {
                        if (response.data.length > 0) {
                            this.tweets = this.tweets.concat(response.data);
                            this.page++;
                        }
                        this.isLoading = false;
                    })
                    .catch(error => {
                        console.error('Error loading tweets:', error);
                        this.isLoading = false;
                    });
            }
        },

        handleScroll() {
            if (
                window.innerHeight + window.scrollY >= document.body.offsetHeight - 100
            ) {
                this.loadTweets();
            }
        }
    }
};
</script>

<style>
#tweetList {
    list-style-type: none;
    padding: 0;
}

.tweet {
    border: 1px solid #ccc;
    margin-bottom: 10px;
    padding: 10px;
}

#loadMoreBtn {
    display: block;
    margin: 20px auto;
    padding: 10px 20px;
    background-color: #007bff;
    color: #fff;
    border: none;
    cursor: pointer;
}
</style>