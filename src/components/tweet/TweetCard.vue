<template>
    <div class="tweet-item">
        <div v-if="tweet.preNode != 0">此則為留言</div>
        <div>tweetID: {{ tweet.tweetId }}</div>
        <div @click="goOthersPage(tweet.userName, tweet.tweetId)">tweetName: {{ tweet.userName }}</div>
        <div>tweetContent: {{ tweet.tweetContent }}</div>

        <div v-if="tweet.tweetGalleries && tweet.tweetGalleries.length > 0">
            <div>Tweet Galleries:</div>
            <div v-for="(gallery, index) in tweet.tweetGalleries" :key="index">
                <img :src="getImageUrl(gallery.imgPath)" alt="Gallery Image" class="gallery-image">
            </div>
        </div>

        <!-- 顯示留言數 -->
        <div v-if="this.numOfComment > 0">
            <button @click="getCommentsLink(tweet.tweetId)">有{{ this.numOfComment }}則留言</button>
        </div>

        <!-- 子留言，內容 -->
        <div v-if="showComments">

            <div v-for="comment in tweetComments" :key="comment.id">{{ comment.userName
                }}的留言: {{ comment.tweetContent }}</div>
        </div>
    </div>
</template>

<script>
import axios from 'axios';
import { useMemberStore } from '@/stores/memberStore';
import { useTweetStore } from '@/stores/tweetStore';


export default {
    data() {
        return {
            numOfComment: 0,
            numOfLike: 0,
            showComments: false,
            tweetComments: [],
        }
    },
    props: {
        tweet: {
            type: Object,
            required: true
        }
    },
    mounted() {
        axios.get(`${this.API_URL}/tweet/getNumOfComment/${this.tweet.tweetId}`)
            .then(response => {
                // console.log("tweetId: " + this.tweet.tweetId + "有" + response.data + "則回覆")
                this.numOfComment = response.data;
            })
            .catch(error => {
                console.error('Error fetching number of comments:', error);
            });
    },
    methods: {
        getImageUrl(imgPath) {
            return `${this.API_URL}/tweet/getImage/${imgPath}`;
        },
        getCommentsLink(tweetId) {
            if (this.showComments == false) {
                this.tweetComments = [];

                console.log(tweetId)
                axios.get(`${this.API_URL}/tweet/getComments/${this.tweet.tweetId}`)
                    .then(response => {
                        console.log(response.data)
                        this.tweetComments = response.data
                    })
                    .catch(error => {
                        console.error('Error fetching number of comments:', error);
                    });



                this.showComments = !this.showComments
            } else {
                this.showComments = !this.showComments
            }
        },
        goOthersPage(name, id) {
            const memberStore = useMemberStore();
            const tweetStore = useTweetStore();
            if (memberStore.memberName != name) {
                axios.get(`${this.API_URL}/tweet/getUserTweetsByTweetId/${id}`).then(re => {
                    tweetStore.writeIn(re.data)
                    tweetStore.setUserName(tweetStore.tweets[0].userName)
                    this.$router.push("/tweetPage/tweetsOthersWallPage")
                })
            } else {
                console.log("do else")
                this.$router.push("/tweetPage/tweetsMyWallPage")
            }
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

.gallery-image {
    max-width: 100%;
    max-height: 100%;
}
</style>