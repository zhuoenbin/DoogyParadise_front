<template>
  <div class="">
    <div id="title">
      <h4>
        <b>過去活動區</b
        ><img src="../../assets/pastManager.png" alt="🐶" id="managerPic" />
      </h4>
    </div>

    <div class="py-1 bg-light">
      <div class="container">
        <table class="table" v-if="empId != null">
          <thead>
            <tr>
              <th scope="col">管理</th>
              <th scope="col">活動日期</th>
              <th scope="col">活動名稱</th>
              <th scope="col">
                活動狀態
                <span id="loading">
                  <div class="spinner-border spinner-border-sm" role="status">
                    <span class="visually-hidden">Loading...</span>
                  </div>
                  <div
                    class="spinner-grow spinner-grow-sm text-danger"
                    role="status"
                  >
                    <span class="visually-hidden">Loading...</span>
                  </div>
                </span>
              </th>
              <th scope="col">報名狀況</th>
            </tr>
          </thead>
          <tbody
            class="smallText"
            v-if="OfficialActList.length > 0"
            v-for="a of OfficialActList"
            :key="a.activityId"
          >
            <tr>
              <th scope="row">
                <button
                  class="btn btn-outline-success me-md-1"
                  type="button"
                  data-bs-toggle="modal"
                  data-bs-target="#exampleModal"
                  :id="a.activityId"
                  @click="updatePrepare(a.activityId, a.activityTitle)"
                >
                  修改
                </button>
              </th>
              <td>
                {{ a.activityDate }} {{ this.timeFormat(a.activityStart) }} -
                {{ this.timeFormat(a.activityEnd) }}
              </td>
              <td>{{ a.activityTitle }}</td>
              <td>{{ a.activityStatus }}</td>
              <td>
                <div
                  class="accordion accordion-flush"
                  id="accordionFlushExample"
                >
                  <div class="accordion-item">
                    <div
                      class="accordion-header"
                      :id="'heading' + a.activityId"
                    >
                      <button
                        class="accordion-button collapsed"
                        type="button"
                        @click="toggleAccordion(a.activityId)"
                        :aria-expanded="
                          isActiveAccordion === a.activityId ? 'true' : 'false'
                        "
                        :aria-controls="'collapse' + a.activityId"
                      >
                        🐶<span class="dogNum">{{ a.currentDogNumber }}</span
                        >/{{ a.activityDogNumber }}&nbsp;👤{{
                          a.currentUserNumber
                        }}
                      </button>
                    </div>
                    <div
                      :id="'collapse' + a.activityId"
                      class="accordion-collapse collapse"
                      :class="{ show: isActiveAccordion === a.activityId }"
                      :aria-labelledby="'heading' + a.activityId"
                      data-bs-parent="#accordionFlushExample"
                    >
                      <div class="accordion-body">
                        <!-- 展開後的內容 -->
                        <div v-for="(p, index) in attendeeList" :key="index">
                          <button
                            class="btn btn-sm"
                            type="button"
                            @click="toggleCollapse(index)"
                            aria-expanded="activeIndex === index ? 'true' : 'false'"
                            :aria-controls="'collapse_' + index"
                          >
                            {{ p.firstName }}
                          </button>
                          <div
                            class="collapse"
                            :class="{ show: activeIndex === index }"
                            :id="'collapse_' + index"
                          >
                            <div class="card card-body">
                              <div v-for="dog in p.dogNameList" :key="dog">
                                {{ dog }}
                              </div>
                            </div>
                          </div>
                        </div>
                      </div>
                    </div>
                  </div>
                </div>
              </td>
            </tr>
          </tbody>
        </table>
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
      empId: null,
      OfficialActList: [],
      chooseAct: "",
      attendeeList: [],
      //人名摺疊
      isActiveAccordion: null,
      // 狗名摺疊
      activeIndex: null,

      chooseActTitle: "",
      activityDogNumber: null,
      currentDogNumber: null,
      message: "",
      myDogJoinedList: [],
    };
  },
  mounted() {
    const memberStore = useMemberStore();
    if (memberStore.memberRole.startsWith("R")) {
      this.empId = memberStore.memberId;
      axios
        .get(`${this.API_URL}/activity/api/official/activityManager/past`)
        .then((rs) => {
          const OffiActivitiesObj = Object.values(rs.data);
          this.OfficialActList = JSON.parse(JSON.stringify(OffiActivitiesObj));
          console.log(this.OfficialActList);
        })
        .catch((error) => {
          console.error("Activities eroor:", error);
        });
    }
  },
  methods: {
    timeFormat(time) {
      time = time.substring(0, time.length - 3);
      return time;
    },
    toggleAccordion(activityId) {
      if (this.isActiveAccordion === activityId) {
        this.isActiveAccordion = null;
      } else {
        this.isActiveAccordion = activityId;
        this.chooseAct = activityId;
        //拿attendee
        axios
          .get(
            `${this.API_URL}/activity/api/official/activityManager/${this.chooseAct}/attendeeList`
          )
          .then((rs) => {
            const activityJoinListObj = Object.values(rs.data);
            this.attendeeList = JSON.parse(JSON.stringify(activityJoinListObj));
            console.log(this.attendeeList);
          })
          .catch((error) => {
            console.error("attendeeList eroor:", error);
          });
      }
    },
    toggleCollapse(index) {
      if (this.activeIndex === index) {
        this.activeIndex = null; //展開
      } else {
        this.activeIndex = index;
      }
    },
  },
};
</script>
<style>
#title {
  color: #874a33;
  margin: auto 20px;
  padding: 20px 20px;
  text-align: center;
}
#managerPic {
  height: 60px;
}
.doggy {
  margin: 10px 10px;
  text-align: center;
}
.dogProfile {
  height: 65px;
}
/* loading icon */
#loading {
  display: none;
}
th,
td {
  /* text-align: center; 水平居中 */
  vertical-align: middle; /* 垂直居中 */
}
.smallText {
  font-size: 15px;
}
.dogNum {
  color: cadetblue;
}
</style>
