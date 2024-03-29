<template>

    <div class="tweet-item">

        <!-- <div v-if="tweet.preNode != 0" @click="goPreNodeTweetPage" class="reply-message" >此則為回覆{{ preNodeUserName }}的留言
        </div> -->
        <button v-if="tweet.preNode != 0" class="reply-message" @click="goPreNodeTweetPage">此則為回覆{{ preNodeUserName
            }}的留言
        </button>










        <h4 @click="goOthersPage(tweet.userName, tweet.tweetId)" class="tweet-name like-count">{{ tweet.userName }} :
        </h4>
        <span v-if="userDogs.length > 0">我的狗勾們 :&nbsp;</span>
        <span v-for="(dog, index) in userDogs" :key="dog.dogId">
            {{ dog.dogName }}
            <template v-if="index < userDogs.length - 1">、</template>
        </span>
        <hr v-if="tweet.preNode == 0">


        <div class="content-wrapper">
            <div class="tweet-content">{{ tweet.tweetContent }}</div>
        </div>

        <br>
        <div v-if="tweet.tweetGalleries && tweet.tweetGalleries.length > 0" class="tweet-galleries">
            <!-- <div>Tweet Galleries:</div> -->
            <div v-for="(gallery, index) in tweet.tweetGalleries" :key="index" class="gallery-item">
                <img :src="getImageUrl(gallery.imgPath)" alt="Gallery Image" class="gallery-image">
            </div>
        </div>

        <br>
        <!-- 讚功能 -->
        <span v-if="tweetLikeNum !== 0" @click="showLikeList" class="like-count">
            {{ tweetLikeNum }} 個讚
        </span>
        <span v-if="tweet.preNode == 0"> <!-- 按讚按钮 -->
            <button v-if="!this.liked" @click="likeTweet" class="btn btn-primary">按讚</button>
            <button v-else @click="unlikeTweet" class="btn btn-secondary">取消讚</button>
            發文時間: {{ formatPostDate(tweet.postDate) }}</span>

        <hr v-if="tweet.preNode == 0">

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
                    <!-- <div class="modal-footer">
                        <button type="button" class="btn btn-secondary" data-bs-dismiss="modal" @click="hideLikeList">
                            Close
                        </button>
                    </div> -->
                </div>
            </div>
        </div>



        <!-- 顯示留言數 -->
        <span v-if="this.numOfComment > 0" class="comment-count" style="margin-right: 10px;">
            <button @click="getCommentsLink(tweet.tweetId)" class="btn btn-info">有{{ this.numOfComment }}則留言</button>

        </span>

        <!-- 子留言，內容 -->
        <div v-if="showComments" class="comment-section">

            <div v-for="comment in tweetComments" :key="comment.id" class="comment-item">{{ comment.userName
                }} : {{ comment.tweetContent }}</div>
            <div>{{ currentReply }}</div>
        </div>
        <span v-if="tweet.preNode == 0">
            <input type="text" v-model="replyContent" placeholder="在此輸入回覆內容"
                style="height: 0px; padding-top: 16px; padding-bottom: 18px;">
            <span>
                <button @click="postReply" class="btn btn-success">回覆</button>
            </span>
        </span>
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
            currentReply: '',//當下留言立即出現
            preNodeUserName: '',//如果是回文的話，主文的推主是誰
            preNodeUserId: '',//如果是回文的話，主文的推主id
            preNodeTweet: '',////如果是回文的話，主文的推主tweet

            userDogs: [],

        }
    },
    props: {
        tweet: {
            type: Object,
            required: true
        }
    },
    created() {
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

        //載入使用者的狗狗們
        axios.get(`${this.API_URL}/tweet/getTweetDogTags/${this.tweet.tweetId}`).then(re => {
            if (re.data !== null && re.data !== undefined && re.data !== '') {
                this.userDogs = re.data;

            }
        })
    },
    mounted() {
        if (this.tweet.preNode != 0) {
            axios.get(`${this.API_URL}/tweet/getUserByTweetId/${this.tweet.preNode}`).then(re => {
                this.preNodeUserName = re.data.lastName;
            })
        }
        if (this.tweet.preNode == 0) {
            axios.get(`${this.API_URL}/tweet/getUserByTweetId/${this.tweet.tweetId}`).then(re => {
                this.preNodeUserId = re.data.userId;
            })
        }
    },
    methods: {
        getImageUrl(imgPath) {
            return `${this.API_URL}/tweet/getImage/${imgPath}`;
        },
        getCommentsLink() {
            if (this.showComments == false) {
                this.tweetComments = [];
                axios.get(`${this.API_URL}/tweet/getComments/${this.tweet.tweetId}`)
                    .then(response => {
                        this.tweetComments = response.data
                    })
                    .catch(error => {
                        console.error('Error fetching number of comments:', error);
                    });
                this.showComments = !this.showComments
            } else {
                this.currentReply = "";
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
            const memberStore = useMemberStore();
            this.liked = !this.liked;
            this.tweetLikeNum += 1;

            const fd = new FormData();
            fd.append("tweetId", this.tweet.tweetId);
            fd.append("userId", this.userId);

            axios.post(`${this.API_URL}/tweet/getLikeLink`, fd)
                .then(response => {
                    console.log("/tweet/getLikeLink" + response);
                })
                .catch(error => {
                    console.error(error);
                });

            if (this.userId != this.preNodeUserId) {
                const params = {
                    hisUserId: this.preNodeUserId,
                    hisTweetId: this.tweet.tweetId,
                    myName: memberStore.memberName
                };
                axios.get(`${this.API_URL}/tweet/sendLikeNotify`, { params })
                    .then(response => {
                        console.log(response.data);
                    })
                    .catch(error => {
                        console.error('Error:', error);
                    });
            }

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
        // showReply() {
        //     const myReplyModal = new bootstrap.Modal(this.$refs.myReplyModal);
        //     myReplyModal.show()
        // },
        postReply() {
            if (!this.replyContent.trim()) {
                return;
            }
            this.RepolyErrorMsg = '';
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
                    this.currentReply = memberStore.memberName + " : " + this.replyContent;
                    this.replyContent = "";
                    this.numOfComment += 1;
                    if (this.showComments == false) {
                        this.currentReply = "";
                    }
                })
                .catch(error => {
                    console.error("發文失败:", error);
                })

            if (this.userId != this.preNodeUserId) {

                const params = {
                    hisUserId: this.preNodeUserId,
                    hisTweetId: this.tweet.tweetId,
                    myName: memberStore.memberName
                };
                console.log("hisUserId" + this.preNodeUserId)
                console.log("hisTweetId" + this.tweet.tweetId)
                console.log("myName" + memberStore.memberName)
                axios.get(`${this.API_URL}/tweet/sendReplyNotify`, { params })
                    .then(response => {
                        console.log(response.data);
                    })
                    .catch(error => {
                        console.error('Error:', error);
                    });
            }
        },
        goPreNodeTweetPage() {
            this.preNodeTweet = '';
            const tweetStore = useTweetStore();
            tweetStore.clearMsg();
            axios.get(`${this.API_URL}/tweet/getTweetById/${this.tweet.preNode}`).then(re => {

                this.preNodeTweet = re.data;

                tweetStore.setUserName(this.preNodeUserName)


                tweetStore.writeIn(re.data)

                this.$router.push("/tweetPage/tweetsSingleTweetPage")
            })

        },
        formatPostDate(dateString) {
            const date = new Date(dateString);
            const year = date.getFullYear();
            const month = date.getMonth() + 1;
            const day = date.getDate();
            const hours = date.getHours();
            const minutes = date.getMinutes();
            return `${year}年${month}月${day}號 ${hours}點${minutes}分`;
        }
    }
};
</script>

<!-- <style scoped>
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
</style> -->
<style scoped>
.tweet-item {
    max-width: 500px;
    margin-bottom: 20px;
    padding: 20px;
    border: 1px solid #ccc;
    border-radius: 10px;
    background-color: #f9f9f9;
}

.reply-message {
    cursor: pointer;
    font-weight: bold;
    color: blue;
    margin-bottom: 10px;
}

.tweet-id,
.post-date,
.tweet-name,
.tweet-content {
    margin-bottom: 10px;
}

.tweet-galleries {
    margin-bottom: 10px;
}

.gallery-item {
    display: inline-block;
    margin-right: 10px;
}

.gallery-image {
    max-width: 100%;
    max-height: 100%;
}


.like-count {
    cursor: pointer;
    padding: 5px;
}

.hovered {
    background-color: #aa2929;
    /* 浅灰色背景 */
}

.comment-section {
    margin-top: 10px;
}

.comment-item {
    margin-bottom: 5px;
}

.comment-username {
    font-weight: bold;
}

.comment-content {
    margin-left: 5px;
}

.current-reply {
    margin-top: 10px;
    font-style: italic;
}

.content-wrapper {
    border: 1px solid #ccc;
    /* 边框样式 */
    border-radius: 5px;
    /* 边框圆角 */
    background-color: #f9f9f9;
    /* 背景颜色 */
    padding: 10px;
    /* 内边距 */
}
</style>