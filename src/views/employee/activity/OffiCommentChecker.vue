<template>
  <div>
    <div class="title">{{ chooseTitle }}</div>
    <div class="graphZone"></div>
    <div class="commentZone">
      <div class="tablecontainer">
        <ul class="responsive-table">
          <li class="table-header">
            <div class="col col-1">User Id</div>
            <div class="col col-2">Name</div>
            <div class="col col-3">Score</div>
            <div class="col col-4">Comment</div>
            <div class="col col-5">Sort</div>
          </li>
          <li
            class="table-row"
            v-for="a in commentList"
            :key="commentList.userId"
          >
            <div class="col col-1" data-label="Id">{{ a.userId }}</div>
            <div class="col col-2" data-label="Name">{{ a.firstName }}</div>
            <div class="col col-3" data-label="score">{{ a.score }}</div>
            <div class="col col-4" data-label="comment">
              {{ a.commentText }}
            </div>
            <div
              class="col col-5"
              data-label="sort"
              style="color: green; font-weight: 700"
              v-if="a.checkResult.startsWith('正面')"
            >
              {{ a.checkResult }}
            </div>
            <div
              class="col col-5"
              data-label="sort"
              style="color: red; font-weight: 700"
              v-if="a.checkResult.startsWith('負面')"
            >
              {{ a.checkResult }}
            </div>
            <div
              class="col col-5"
              data-label="sort"
              style="color: blue; font-weight: 700"
              v-if="
                a.checkResult.startsWith('無') ||
                a.checkResult.startsWith('其他')
              "
            >
              {{ a.checkResult }}
            </div>
          </li>
        </ul>
      </div>
    </div>
  </div>
</template>
<script>
import axios from "axios";
import { useMemberStore } from "@/stores/memberStore";
export default {
  data() {
    return {
      activityId: null,
      commentList: [],
      chooseTitle: "",
    };
  },
  mounted() {
    // 使用 $route.params.activityId 取值
    this.activityId = this.$route.params.activityId;
    axios
      .get(
        `${this.API_URL}/activity/api/official/activityManager/past/commentList/${this.activityId}`
      )
      .then((rs) => {
        this.commentList = rs.data;
        console.log(this.commentList);
        this.chooseTitle = this.commentList[0].activityTitle;
      })
      .catch((error) => {
        console.error(error);
      });
  },
  methods: {},
};
</script>
<style scoped>
.title {
  text-align: center;
  margin-top: 30px;
  margin-bottom: 20px;
  font-weight: 700;
  font-size: larger;
}
.tablecontainer {
  max-width: 90%;
  margin-left: auto;
  margin-right: auto;
  padding-left: 10px;
  padding-right: 10px;
}

.responsive-table li {
  border-radius: 3px;
  padding: 25px 30px;
  display: flex;
  justify-content: space-between;
  margin-bottom: 25px;
}
.responsive-table .table-header {
  background-color: #95a5a6;
  font-size: 14px;
  text-transform: uppercase;
  letter-spacing: 0.03em;
}
.responsive-table .table-row {
  background-color: #ffffff;
  box-shadow: 0px 0px 9px 0px rgba(0, 0, 0, 0.1);
}
.responsive-table .col-1 {
  flex-basis: 10%;
}
.responsive-table .col-2 {
  flex-basis: 10%;
}
.responsive-table .col-3 {
  flex-basis: 10%;
}
.responsive-table .col-4 {
  flex-basis: 60%;
}
.responsive-table .col-5 {
  flex-basis: 10%;
}
@media all and (max-width: 767px) {
  .responsive-table .table-header {
    display: none;
  }
  .responsive-table li {
    display: block;
  }
  .responsive-table .col {
    flex-basis: 100%;
  }
  .responsive-table .col {
    display: flex;
    padding: 10px 0;
  }
  .responsive-table .col:before {
    color: #6c7a89;
    padding-right: 10px;
    content: attr(data-label);
    flex-basis: 50%;
    text-align: right;
  }
}
</style>
