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
                    <button
                      class="btn btn-outline-warning me-md-2"
                      type="button"
                      data-bs-toggle="modal"
                      data-bs-target="#exampleModal"
                      @click="joinPrepare(a.activityId, a.activityTitle)"
                    >
                      立即報名🔜
                    </button>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  </div>
  <!-- Modal -->
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
          <h5 class="modal-title" id="exampleModalLabel">
            請選擇要參加的狗狗!🐶
          </h5>

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
                >您所選擇的活動</label
              >
              <input
                type="text"
                class="form-control"
                id="recipient-name"
                :value="chooseActTitle"
                readonly
              />
            </div>
            <!-- 檢查用 -->
            <!-- <div>Checked names: {{ chooseDogs }}</div> -->
            <div>
              <label for="" class="col-form-label"> 要參與的狗狗~ </label>
              <div v-for="d in myDogs" :key="d.dogId" class="mb-2">
                <div class="checkbox-wrapper-33">
                  <label class="checkbox">
                    <input
                      class="checkbox__trigger visuallyhidden"
                      type="checkbox"
                      :value="d.dogId"
                      @change="checkComplete"
                      v-model="chooseDogs"
                    />
                    <span class="checkbox__symbol">
                      <svg
                        aria-hidden="true"
                        class="icon-checkbox"
                        width="28px"
                        height="28px"
                        viewBox="0 0 28 28"
                        version="1"
                        xmlns="http://www.w3.org/2000/svg"
                      >
                        <path d="M4 14l8 7L24 7"></path>
                      </svg>
                    </span>
                    <p class="checkbox__textwrapper">{{ d.dogName }}</p>
                  </label>
                </div>
              </div>
              <br />
            </div>
            <div class="mb-2">
              <label for="message-text" class="col-form-label"
                >有甚麼想備註的嗎~</label
              >
              <textarea
                class="form-control"
                id="message-text"
                v-model="note"
              ></textarea>
            </div>
          </form>
        </div>
        <div class="modal-footer">
          <div class="text-danger text-center mt-3">{{ message }}</div>
          <button
            type="button"
            class="btn btn-secondary"
            data-bs-dismiss="modal"
          >
            Close
          </button>
          <button
            type="button"
            class="btn btn-primary"
            data-bs-dismiss="modal"
            id="liveToastBtn"
            @click="joinActivity"
          >
            快速報名
          </button>
        </div>
      </div>
    </div>
  </div>
</template>
<script>
import axios from "axios";
import { useMemberStore } from "@/stores/memberStore";
import { useActivityStore } from "@/stores/activityStore";

export default {
  components: {},
  data() {
    return {
      activities: [],
      myDogs: [],
      userId: "",
      chooseAct: "",
      chooseActTitle: "",
      chooseDogs: [],
      note: "",
      isUser: false,
      joinSuccess: false,
      currentPage: 1,
      totalPage: 0,
      message: "",
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
  computed: {},
  methods: {
    checkComplete() {
      if (this.chooseDogs.length == 0) {
        let submitButton = document.getElementById("liveToastBtn");
        submitButton.disabled = true;
        this.message = "請選擇要參與的狗狗!";
      } else {
        let submitButton = document.getElementById("liveToastBtn");
        submitButton.disabled = false;
        this.message = "";
      }
    },
    showSuccess() {
      window.alert("報名成功!!");
    },

    timeFormat(time) {
      time = time.substring(0, time.length - 3);
      return time;
    },
    dateFormat(dateString) {
      const weekdays = ["Sun.", "Mon.", "Tue.", "Wed.", "Thu.", "Fri.", "Sat."];
      const date = new Date(dateString);

      // 分別年月日和星期
      const year = date.getFullYear();
      const month = date.getMonth();
      const day = date.getDate();
      const weekday = weekdays[date.getDay()];

      // 拼接格式化后的日期字串
      const formattedDate = `${year}-${month}-${day} ${weekday}`;

      return formattedDate;
    },
    joinPrepare(activityId, activityName) {
      const memberStore = useMemberStore();
      console.log(memberStore.memberRole);

      this.chooseAct = activityId;
      this.chooseActTitle = activityName;
      console.log("所選擇的活動id: ", this.chooseAct);
      if (memberStore.memberRole.startsWith("Act")) {
        this.isUser = true;
        this.userId = memberStore.memberId;
        console.log(this.userId);
        axios
          .get(`${this.API_URL}/activity/api/searchUsersDog/${this.userId}`)
          .then((response) => {
            const dogObj = Object.values(response.data);
            this.myDogs = JSON.parse(JSON.stringify(dogObj));
            console.log(this.myDogs);
            console.log(this.myDogs.length);
            console.log(this.myDogs[0]);
            console.log(this.myDogs[0].dogName);
            this.checkComplete();
          })
          .catch((error) => {
            console.error("Error dogs:", error);
          });
      }
    },
    joinActivity() {
      console.log(this.userId);
      console.log(this.chooseDogs);
      console.log(this.chooseAct);
      console.log(this.note);
      const memberStore = useMemberStore();
      if (memberStore.memberRole.startsWith("Act")) {
        if (this.chooseDogs.length > 0) {
          const fd = new FormData();
          fd.append("userId", memberStore.memberId);
          fd.append("note", this.note);
          fd.append("dogIdList", this.chooseDogs);
          fd.append("activityId", this.chooseAct);

          axios
            .post(`${this.API_URL}/activity/api/JoinActivity`, fd)
            .then((response) => {
              console.log("報名成功", response.data);
              this.chooseDogs = [];
              this.chooseAct = "";
              this.chooseActTitle = "";
              // this.showSuccess();
              // this.joinSuccess = true;
              // this.$router.push("/activity/all");
            })
            .catch((error) => {
              console.error("報名失敗", error);
              this.message = "報名失敗";
            });
        } else {
          this.message = "請選擇要參與的狗狗!";
        }
      } else {
        this.message = "你應該看不到才對?";
      }
    },
    showToast() {
      const toastTrigger = document.getElementById("liveToastBtn");
      const toastLiveExample = document.getElementById("liveToast");

      if (toastTrigger && joinSuccess) {
        const toastBootstrap =
          bootstrap.Toast.getOrCreateInstance(toastLiveExample);
        toastTrigger.addEventListener("click", () => {
          toastBootstrap.show();
        });
      }
    },
  },
};
//bug 報名完後應該要不能再報
//活動過期要換掉
//現在的狗數?
</script>

<style>
.checkbox-wrapper-33 {
  --s-xsmall: 0.625em;
  --s-small: 1.2em;
  --border-width: 1px;
  --c-primary: #5f11e8;
  --c-primary-20-percent-opacity: rgb(95 17 232 / 20%);
  --c-primary-10-percent-opacity: rgb(95 17 232 / 10%);
  --t-base: 0.4s;
  --t-fast: 0.2s;
  --e-in: ease-in;
  --e-out: cubic-bezier(0.11, 0.29, 0.18, 0.98);
}

.checkbox-wrapper-33 .visuallyhidden {
  border: 0;
  clip: rect(0 0 0 0);
  height: 1px;
  margin: -1px;
  overflow: hidden;
  padding: 0;
  position: absolute;
  width: 1px;
}

.checkbox-wrapper-33 .checkbox {
  display: flex;
  align-items: center;
  justify-content: flex-start;
}
.checkbox-wrapper-33 .checkbox + .checkbox {
  margin-top: var(--s-small);
}
.checkbox-wrapper-33 .checkbox__symbol {
  display: inline-block;
  display: flex;
  margin-right: calc(var(--s-small) * 0.7);
  border: var(--border-width) solid var(--c-primary);
  position: relative;
  border-radius: 0.1em;
  width: 1.5em;
  height: 1.5em;
  transition: box-shadow var(--t-base) var(--e-out),
    background-color var(--t-base);
  box-shadow: 0 0 0 0 var(--c-primary-10-percent-opacity);
}
.checkbox-wrapper-33 .checkbox__symbol:after {
  content: "";
  position: absolute;
  top: 0.5em;
  left: 0.5em;
  width: 0.25em;
  height: 0.25em;
  background-color: var(--c-primary-20-percent-opacity);
  opacity: 0;
  border-radius: 3em;
  transform: scale(1);
  transform-origin: 50% 50%;
}
.checkbox-wrapper-33 .checkbox .icon-checkbox {
  width: 1em;
  height: 1em;
  margin: auto;
  fill: none;
  stroke-width: 3;
  stroke: currentColor;
  stroke-linecap: round;
  stroke-linejoin: round;
  stroke-miterlimit: 10;
  color: var(--c-primary);
  display: inline-block;
}
.checkbox-wrapper-33 .checkbox .icon-checkbox path {
  transition: stroke-dashoffset var(--t-fast) var(--e-in);
  stroke-dasharray: 30px, 31px;
  stroke-dashoffset: 31px;
}
.checkbox-wrapper-33 .checkbox__textwrapper {
  margin: 0;
}
.checkbox-wrapper-33 .checkbox__trigger:checked + .checkbox__symbol:after {
  -webkit-animation: ripple-33 1.5s var(--e-out);
  animation: ripple-33 1.5s var(--e-out);
}
.checkbox-wrapper-33
  .checkbox__trigger:checked
  + .checkbox__symbol
  .icon-checkbox
  path {
  transition: stroke-dashoffset var(--t-base) var(--e-out);
  stroke-dashoffset: 0px;
}
.checkbox-wrapper-33 .checkbox__trigger:focus + .checkbox__symbol {
  box-shadow: 0 0 0 0.25em var(--c-primary-20-percent-opacity);
}

@-webkit-keyframes ripple-33 {
  from {
    transform: scale(0);
    opacity: 1;
  }
  to {
    opacity: 0;
    transform: scale(20);
  }
}

@keyframes ripple-33 {
  from {
    transform: scale(0);
    opacity: 1;
  }
  to {
    opacity: 0;
    transform: scale(20);
  }
}
.col-form-label {
  font-weight: bold;
  color: #36472aff;
}
h5 {
  font-weight: bolder;
  color: #874a33ff;
}
</style>
