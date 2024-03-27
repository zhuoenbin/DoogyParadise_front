<template>
  <div class="col-lg-10 mx-auto col-lg-3">
    <!-- 活動卡 -->
    <div class="py-1 bg-light">
      <div class="container">
        <div class="row row-cols-1 row-cols-md-2 g-4">
          <!-- v-for -->
          <div class="col" v-for="a in activities" :key="a.activityId">
            <div class="card">
              <img :src="`${a.galleryImgUrl}`" class="card-img-top" alt="..." />

              <div class="card-body">
                <h5 class="card-title">
                  <b>{{ a.activityTitle }}</b>
                </h5>
                <p class="card-text">
                  <b>活動日期:&nbsp;</b>{{ a.activityDate }}
                  {{ this.timeFormat(a.activityStart) }} ~
                  {{ this.timeFormat(a.activityEnd) }}
                  <br />
                  <b>活動場地:&nbsp;</b>{{ a.venueName }}
                </p>
              </div>
              <div class="card-footer">
                <div class="row">
                  <div class="col-md-5">
                    <small class="text-body-secondary a"
                      ><b>報名截止:&nbsp;</b>
                      {{ this.dateFormat(a.activityClosingDate) }}</small
                    >
                  </div>
                  <div class="col-md-4 ms-auto">
                    <!-- // -->
                    <a
                      class="btn btn-outline-warning me-md-2"
                      href="/html/image-img-tag.html"
                      role="button"
                    >
                      立即報名🔜
                    </a>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  </div>
</template>
<script>
import axios from "axios";

export default {
  components: {},
  data() {
    return {
      activities: [],
      currentPage: 1,
      totalPage: 0,
    };
  },
  mounted() {
    axios.get(`${this.API_URL}/activity/api/all/1`).then((rs) => {
      console.log(rs.data);
      this.activities = rs.data.content;
      this.totalPage = rs.data.totalPages;
      this.currentPage = rs.data.number;
    });
  },
  methods: {
    loadActivities() {},
    timeFormat(time) {
      time = time.substring(0, time.length - 3);
      return time;
    },
    dateFormat(dateString) {
      const weekdays = ["Sun.", "Mon.", "Tue.", "Wed.", "Thu.", "Fri.", "Sat."];
      const date = new Date(dateString);

      // 获取年月日和星期
      const year = date.getFullYear();
      const month = date.getMonth();
      const day = date.getDate();
      const weekday = weekdays[date.getDay()];

      // 拼接格式化后的日期字符串
      const formattedDate = `${year}-${month}-${day} ${weekday}`;

      return formattedDate;
    },
  },
};
</script>
<style></style>
