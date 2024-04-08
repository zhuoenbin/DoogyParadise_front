<template>
  <div>
    <div id="title">
      <h4>
        <b>過去參加活動紀錄</b
        ><img src="../../assets/pastManager.png" alt="🐶" id="managerPic" />
      </h4>
    </div>

    <!-- 主要內容 -->
    <div class="py-1 bg-light">
      <div class="container">
        <table class="table table-striped">
          <thead>
            <tr>
              <th scope="col">管理</th>
              <!-- <th scope="col">報名狀態</th> -->
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
              <th scope="col">參加的狗狗</th>
            </tr>
          </thead>
          <tbody
            v-if="myJoinedList.length > 0"
            v-for="a of myJoinedList"
            :key="a.userJoinedId"
          >
            <tr v-if="a.activityStatus === '活動已結束'">
              <th scope="row">
                <button
                  class="btn btn-outline-success me-md-2"
                  type="button"
                  data-bs-toggle="modal"
                  data-bs-target="#exampleModal"
                  :id="a.activityId"
                  @click="updatePrepare(a.activityId, a.activityTitle)"
                >
                  評論
                </button>
              </th>
              <!-- <td>{{ a.joinedStatus }}</td> -->
              <td>
                {{ a.activityDate }} {{ this.timeFormat(a.activityStart) }} ~
                {{ this.timeFormat(a.activityEnd) }}
              </td>
              <td>{{ a.activityTitle }}</td>
              <td>{{ a.activityStatus }}</td>
              <td>
                <span v-for="d of a.dogList">{{ d }}&nbsp;</span>
              </td>
            </tr>
          </tbody>
        </table>
      </div>
    </div>
    <!-- 互動視窗 -->
    <div
      class="modal fade"
      id="exampleModal"
      tabindex="-1"
      aria-labelledby="exampleModalLabel"
      aria-hidden="true"
    >
      <div class="modal-dialog">
        <div class="modal-content">
          <div class="modal-header">
            <h5 class="modal-title" id="exampleModalLabel">來寫寫評論吧!🐶</h5>

            <button
              type="button"
              class="btn-close"
              data-bs-dismiss="modal"
              aria-label="Close"
            ></button>
          </div>
          <!-- 表單內容 -->
          <div class="modal-body">
            <form>
              <div class="mb-3">
                <label for="recipient-name" class="col-form-label"
                  >所參加的活動</label
                >
                <input
                  type="text"
                  class="form-control"
                  id="recipient-name"
                  :value="chooseActTitle"
                  readonly
                />
              </div>

              <div>
                <label for="" class="col-form-label">
                  參與的狗狗 ฅ՞•ﻌ•՞ฅ~
                </label>
                <div>
                  <span
                    v-for="d in myDogJoinedList"
                    :key="d.dogId"
                    class="mb-2"
                  >
                    <label class="doggy">
                      <img
                        :src="d.dogImgPathCloud"
                        class="dogProfile"
                        alt="🐶"
                      />
                      <p class="checkbox__textwrapper">{{ d.dogName }}</p>
                    </label>
                  </span>
                </div>
              </div>
              <!-- 改成評論? -->
              <div class="mb-2">
                <label for="message-text" class="col-form-label"
                  >想要寫點心得嗎~(這個功能之後補上)</label
                >
                <textarea
                  class="form-control"
                  id="message-text"
                  @change.lazy="checkComplete"
                  v-model="comment"
                ></textarea>
              </div>
            </form>
          </div>
          <div class="modal-footer">
            <button
              type="button"
              class="btn btn-secondary"
              data-bs-dismiss="modal"
            >
              Close
            </button>
            <button
              v-if="checkComplete"
              type="button"
              class="btn btn-primary"
              data-bs-dismiss="modal"
              id="liveToastBtn"
              @click="doComment"
            >
              送出評論
            </button>
          </div>
        </div>
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
      userId: null,
      myJoinedList: [],
      chooseAct: "",
      chooseActTitle: "",
      activityDogNumber: null,
      currentDogNumber: null,
      comment: "",
      message: "",
      myDogJoinedList: [],
    };
  },
  mounted() {
    const memberStore = useMemberStore();
    if (memberStore.memberRole.startsWith("Act")) {
      this.userId = memberStore.memberId;
      axios
        .get(`${this.API_URL}/activity/api/activityManager/${this.userId}`)
        .then((rs) => {
          const myActivitiesObj = Object.values(rs.data);
          this.myJoinedList = JSON.parse(JSON.stringify(myActivitiesObj));
          console.log(this.myJoinedList);
        })
        .catch((error) => {
          console.error("Activities eroor:", error);
        });
    }
  },
  methods: {
    updatePrepare(activityId, activityTitle) {
      const memberStore = useMemberStore();
      console.log(memberStore.memberRole);
      this.chooseAct = activityId;
      this.chooseActTitle = activityTitle;
      console.log("所選擇的活動id: ", this.chooseAct);
      if (memberStore.memberRole.startsWith("Act")) {
        axios
          .get(
            `${this.API_URL}/activity/api/activityManager/${this.userId}/findDogListIn/${this.chooseAct}`
          )
          .then((rs) => {
            const myActivitiesObj = Object.values(rs.data);
            this.myDogJoinedList = JSON.parse(JSON.stringify(myActivitiesObj));
            console.log(this.myDogJoinedList);
          })
          .then((rs) => {
            this.checkComplete();
          })
          .catch((error) => {
            console.error("Activities eroor:", error);
          });
      }
    },
    checkComplete() {
      console.log("要不要評論");
    },
    timeFormat(time) {
      time = time.substring(0, time.length - 3);
      return time;
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
</style>
