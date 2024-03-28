<template>
    <div class="tweet-container">
        <div style="display: flex; align-items: center;">
            <h3 style="margin-right: 10px;">{{ name }}的主頁</h3>
            <button v-if="!isFollwer" @click="followUser" class="btn btn-primary">追蹤</button>
            <button v-else @click="unfollowUser" class="btn btn-primary">取消追蹤</button>
        </div>
        <hr>
        <TweetItem v-for="tweet in tweets" :key="tweet.tweetId" :tweet="tweet" />
    </div>
</template>
<script>
import axios from 'axios';
import TweetItem from '@/components/tweet/TweetCard.vue';
import { useTweetStore } from '@/stores/tweetStore';
import { useMemberStore } from '@/stores/memberStore';

export default {
    components: {
        TweetItem,
    },
    data() {
        return {
            tweets: [],
            name: "",
            isFollwer: false,
            myUserId: '',
            otherUserId: '',
        }
    },
    mounted() {
        const tweetStore = useTweetStore();
        this.tweets = tweetStore.tweets;
        this.name = tweetStore.user;

        if (this.name.length === 0) {
            this.$router.push("/tweetPage/tweetsWallPage");
        } else {
            const memberStore = useMemberStore();
            console.log("我的ID" + memberStore.memberId);
            this.myUserId = memberStore.memberId;
            console.log("他的名字" + this.tweets[0].userName
            )

            axios.post(`${this.API_URL}/tweet/checkFollerRelationship`, {
                myId: memberStore.memberId,
                tweetUserName: this.tweets[0].userName
            })
                .then(response => {
                    // this.isFollwer = response.data
                    console.log("isFollowing: " + response.data.isFollowing);
                    console.log("userId: " + response.data.userId);
                    this.isFollwer = response.data.isFollowing;
                    this.otherUserId = response.data.userId
                    window.scrollTo(0, 0);
                })
                .catch(error => {
                    console.error(error);
                });
        }
    },
    methods: {
        followUser() {
            axios.post(`${this.API_URL}/tweet/getFollerRelationship`, {
                myId: this.myUserId,
                otherId: this.otherUserId
            }).then(re => {
                if (re.data == true) {
                    this.isFollwer = !this.isFollwer;
                };
            })
        },
        unfollowUser() {
            axios.post(`${this.API_URL}/tweet/removeFollerRelationship`, {
                myId: this.myUserId,
                otherId: this.otherUserId
            }).then(re => {
                if (re.data == true) {
                    this.isFollwer = !this.isFollwer;
                };
            })
        },
    },


}
</script>
<style></style>