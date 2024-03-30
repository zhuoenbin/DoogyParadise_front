<template>

    <ReportItem v-for="r in reports" :report="r" :key="r.reportsId"></ReportItem>

</template>
<script>
import axios from 'axios';
import ReportItem from '@/components/tweet/TweetReport.vue';

export default {
    components: {
        ReportItem,
    },
    data() {
        return {
            reports: [],
        }
    },
    mounted() {
        axios.get(`${this.API_URL}/tweet/getTweetsReports`).then(re => {
            console.log(re.data);
            this.reports = re.data;
        })
    }
}
</script>


<style scoped>
.accordion-item {
    width: 800px;
}
</style>