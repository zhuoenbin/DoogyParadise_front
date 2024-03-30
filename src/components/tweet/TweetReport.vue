<template>
    <div class="accordion" id="accordionExample">
        <div class="accordion-item">
            <h2 class="accordion-header" :id="'headingOne' + report.reportsId">
                <button class="accordion-button" type="button" data-bs-toggle="collapse"
                    :data-bs-target="'#collapseOne' + report.reportsId" aria-expanded="false"
                    :aria-controls="'collapseOne' + report.reportsId">
                    <strong>檢舉編號 : {{ report.reportsId }}</strong>&nbsp;&nbsp;&nbsp;&nbsp;<code>處理狀態 :</code>
                    <span v-if="report.reportStatus == 0">未處理</span>
                    <span v-else>已處理</span>
                </button>
            </h2>
            <div :id="'collapseOne' + report.reportsId" class="accordion-collapse collapse"
                :aria-labelledby="'headingOne' + report.reportsId" data-bs-parent="#accordionExample">
                <div class="accordion-body">
                    <hr>
                    <div>推文內容 :{{ tweet.tweetContent }}</div>
                    <div v-if="tweet.tweetGalleries && tweet.tweetGalleries.length > 0" class="tweet-galleries">
                        <div class="d-flex justify-content-center">
                            <div v-for="(gallery, index) in tweet.tweetGalleries" :key="index" class="gallery-item">
                                <img :src="getImageUrl(gallery.imgPath)" alt="Gallery Image" class="gallery-image">
                            </div>
                        </div>
                    </div>
                    <hr>
                    <div>檢舉型態 : {{ report.reportReason }}</div>
                    <div>其他意見 : {{ report.reportDescription }}</div>

                    <code>.accordion-body</code>
                </div>
            </div>
        </div>
    </div>
</template>

<script>
import axios from 'axios';



export default {
    props: {
        report: {
            type: Object,
            required: true
        }
    },
    data() {
        return {
            reports: [],
            tweet: "",
            user: "",
        }
    },
    mounted() {
        axios.get(`${this.API_URL}/tweet/getTweetByReportId/${this.report.reportsId}`).then(re => {
            this.tweet = re.data;
        })
        axios.get(`${this.API_URL}/tweet/getUserByReportId/${this.report.reportsId}`).then(re => {
            this.user = re.data;
        })
    },
    methods: {
        getImageUrl(imgPath) {
            return `${this.API_URL}/tweet/getImage/${imgPath}`;
        },
    }

}
</script>


<style scoped>
.accordion-item {
    width: 800px;
}
</style>