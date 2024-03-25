<template>
    <div class="tweet-item">
        <div v-if="tweet.preNode != 0">此則為留言</div>
        <div>tweetID: {{ tweet.tweetId }}</div>
        <div>發文時間 : {{ tweet.postDate }}</div>
        <div @click="goOthersPage(tweet.userName, tweet.tweetId)">tweetName: {{ tweet.userName }}</div>

        <div>tweetContent: {{ tweet.tweetContent }}</div>

        <div v-if="tweet.tweetGalleries && tweet.tweetGalleries.length > 0">
            <!-- <div>Tweet Galleries:</div> -->
            <div v-for="(gallery, index) in tweet.tweetGalleries" :key="index">
                <img :src="getImageUrl(gallery.imgPath)" alt="Gallery Image" class="gallery-image">
            </div>
        </div>


        <!-- 讚功能 -->
        <div v-if="this.tweetLikeNum != 0" @click="showLikeList">
            {{ tweetLikeNum }} 個讚
        </div>

        <!--按讚名單的彈出式視窗 -->
        <div ref="myModal" class="modal fade" tabindex="-1" aria-labelledby="exampleModalLabel" aria-hidden="true">
            <div class="modal-dialog">
                <div class="modal-content">
                    <div class="modal-header">
                        <h5 class="modal-title" id="exampleModalLabel">按讚的人~</h5>
                        <button type="button" class="btn-close" data-bs-dismiss="modal" aria-label="Close"></button>
                    </div>

                    <div class="modal-body" v-for="n in userLikeList">
                        {{ n.lastName }}
                    </div>
                    <div class="modal-footer">
                        <button type="button" class="btn btn-secondary" data-bs-dismiss="modal" @click="hideLikeList">
                            Close
                        </button>
                    </div>
                </div>
            </div>
        </div>


        <!-- 按讚按钮 -->
        <div>
            <button v-if="!this.liked" @click="likeTweet">按讚</button>
            <button v-else @click="unlikeTweet">取消讚</button>
        </div>
        <!-- 顯示留言數 -->
        <div v-if="this.numOfComment > 0">
            <button @click="getCommentsLink(tweet.tweetId)">有{{ this.numOfComment }}則留言</button>
        </div>


        <!-- 回覆推文的文字框 -->
        <button @click="showReply">回覆</button>
        <!--回覆推文的彈出式視窗 -->
        <div ref="myReplyModal" class="modal fade" tabindex="-1" aria-labelledby="exampleModalLabel" aria-hidden="true">
            <!-- Modal content -->
            <div class="modal-dialog">
                <div class="modal-content">
                    <div class="modal-header">
                        <h5 class="modal-title" id="exampleModalLabel">回覆推文</h5>
                        <button type="button" class="btn-close" data-bs-dismiss="modal" aria-label="Close"></button>
                    </div>
                    <div class="modal-body">
                        <textarea v-model="replyContent" placeholder="在此輸入回覆內容"></textarea>
                    </div>
                    <div class="modal-footer">
                        <button type="button" class="btn btn-secondary" data-bs-dismiss="modal">取消</button>
                        <button type="button" class="btn btn-primary" @click="postReply"
                            data-bs-dismiss="modal">發布回覆</button>
                    </div>
                </div>
            </div>
        </div>

        <!-- 子留言，內容 -->
        <div v-if="showComments">

            <div v-for="comment in tweetComments" :key="comment.id">{{ comment.userName
                }}的留言: {{ comment.tweetContent }}</div>
        </div>
    </div>

</template>

<script>
import 'bootstrap/dist/js/bootstrap.bundle.min.js';
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
            tweetLikeNum: 0,
            liked: false,
            userId: useMemberStore().memberId,
            userLikeList: [],
            replyContent: '',
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
                this.numOfComment = response.data;
            })
            .catch(error => {
                console.error('Error fetching number of comments:', error);
            });

        axios.get(`${this.API_URL}/tweet/getTweetLikesNum`, {
            params: {
                tweetId: this.tweet.tweetId,
                userId: this.userId
            }
        }).then(re => {
            this.tweetLikeNum = re.data.tweetLikesNum;
            //確認使用者是否已經按讚
            if (re.data.isUserLiked == 1) {
                this.liked = true
            }
        })


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
                this.$router.push("/tweetPage/tweetsMyWallPage")
            }
        },
        likeTweet() {
            this.liked = !this.liked;
            this.tweetLikeNum += 1;

            const fd = new FormData();
            fd.append("tweetId", this.tweet.tweetId);
            fd.append("userId", this.userId);

            axios.post(`${this.API_URL}/tweet/getLikeLink`, fd)
                .then(response => {
                    console.log(response);
                })
                .catch(error => {
                    console.error(error);
                });
        },
        unlikeTweet() {
            this.liked = !this.liked;
            this.tweetLikeNum -= 1;

            const fd = new FormData();
            fd.append("tweetId", this.tweet.tweetId);
            fd.append("userId", this.userId);

            axios.post(`${this.API_URL}/tweet/removeLikeLink`, fd)
                .then(response => {
                    console.log(response);
                })
                .catch(error => {
                    console.error(error);
                });
        },
        showLikeList() {
            const myModal = new bootstrap.Modal(this.$refs.myModal);
            myModal.show()
            axios.get(`${this.API_URL}/tweet/getTweetLikesUser`, {
                params: {
                    tweetId: this.tweet.tweetId,
                }
            }).then(re => {
                console.log("getTweetLikesUser" + re.data)
                this.userLikeList = re.data
            })
        },
        hideLikeList() {
            this.userLikeList = [];
        },
        showReply() {
            const myReplyModal = new bootstrap.Modal(this.$refs.myReplyModal);
            myReplyModal.show()
        },
        postReply() {
            const memberStore = useMemberStore();

            const formData = new FormData();
            formData.append('memberId', memberStore.memberId);
            formData.append('tweetId', this.tweet.tweetId);
            formData.append('tweetContent', this.replyContent);
            axios.post(`${this.API_URL}/tweet/replyTweet`, formData, {
                headers: {
                    'Content-Type': 'multipart/form-data'
                }
            })
                .then(response => {
                    console.log("回文成功:", response.data);
                    // 清空推文内容
                    this.replyContent = "";
                    this.numOfComment += 1;
                    // this.$router.go(0)
                })
                .catch(error => {
                    console.error("發文失败:", error);
                })

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