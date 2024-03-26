<template>
  <main class="container col-xl-10 col-xxl-8 px-4 py-5">
    <div class="row align-items-center g-lg-7 py-7">
      <!-- <div class="col-lg-5 text-center text-lg-start">
        <h1 @click="check" class="display-4 fw-bold lh-1 mb-3">辦活動!</h1>
        <p class="col-lg-10 fs-4">由我開始的Doggy Paradise!</p>
      </div> -->
      <!-- 表單 -->
      <div class="col-lg-10 mx-auto col-lg-3">
        <form class="p-4 p-md-7 border rounded-3 bg-light">
          <div class="row g-2">
            <div class="col-md">
              <div class="form-floating mb-3">
                <select
                  class="form-select"
                  id="floatingSelect"
                  name="activityTypeId"
                  v-model="activityTypeId"
                  aria-label="Floating label select example"
                  required
                >
                  <option
                    v-for="t in types"
                    :key="t.activityTypeId"
                    :value="t.activityTypeId"
                  >
                    {{ t.activityTypeName }}
                  </option>
                </select>
                <label for="floatingSelect">活動類型</label>
              </div>
            </div>
            <div class="col-md">
              <div class="form-floating mb-3">
                <select
                  class="form-select"
                  id="floatingSelect"
                  name="venueId"
                  v-model="venueId"
                  required
                  aria-label="Floating label select example"
                >
                  <option
                    v-for="v in venues"
                    :key="v.venueId"
                    :value="v.venueId"
                  >
                    {{ v.venueName }}
                  </option>
                </select>
                <label for="floatingSelect">場地選擇</label>
              </div>
            </div>
          </div>

          <div class="row g-2">
            <div class="col-md">
              <div class="form-floating mb-3">
                <input
                  class="form-control"
                  type="date"
                  name="activityDate"
                  value="2024-04-26"
                  min="2024-03-25"
                  max="2026-04-26"
                  v-model.lazy="activityDate"
                />
                <label>活動日期:</label>
              </div>
            </div>
            <div class="col-md">
              <div class="form-floating mb-3">
                <input
                  class="form-control"
                  type="time"
                  name="activityStart"
                  value="13:00"
                  min="10:00"
                  max="18:00"
                  v-model.lazy="activityStart"
                /><label>開始時間:</label>
              </div>
            </div>
            <div class="col-md">
              <div class="form-floating mb-3">
                <input
                  class="form-control"
                  type="time"
                  name="activityEnd"
                  value="13:00"
                  min="10:00"
                  max="18:00"
                  v-model="activityEnd"
                /><label>結束時間:</label>
              </div>
            </div>
          </div>

          <div class="form-floating mb-3">
            <input
              type="text"
              class="form-control"
              v-model.lazy="activityTitle"
            />
            <label>活動主題</label>
          </div>

          <div class="form-floating mb-3">
            <textarea
              type="text"
              class="form-control"
              v-model.lazy="activityDescription"
            ></textarea>
            <label>活動簡介</label>
          </div>
          <div class="form-floating mb-3">
            <textarea
              type="text"
              class="form-control"
              v-model="activityProcess"
            ></textarea>
            <label>活動流程</label>
          </div>
          <div class="form-floating mb-3">
            <textarea
              type="text"
              class="form-control"
              v-model="activityNotice"
            ></textarea>
            <label>注意事項</label>
          </div>

          <div class="row g-2">
            <div class="col-md-2">
              <div class="form-floating mb-3">
                <input
                  type="number"
                  min="0"
                  class="form-control"
                  v-model.lazy="activityCost"
                />
                <label>參加費用</label>
              </div>
            </div>
            <div class="col-md">
              <div class="form-floating mb-3">
                <input
                  type="text"
                  class="form-control"
                  v-model.lazy="activityCostDescription"
                />
                <label>費用敘述</label>
              </div>
            </div>
          </div>

          <div class="row g-3">
            <div class="col-md">
              <div class="form-floating mb-3">
                <input
                  class="form-control"
                  id="party"
                  type="datetime-local"
                  name="activityClosingDate"
                  min="2024-03-01T00:00"
                  max="2026-04-30T00:00"
                  v-model="activityClosingDate"
                  required
                /><label>報名截止時間:</label>
              </div>
            </div>
            <div class="col-md">
              <div class="form-floating mb-3">
                <input type="text" class="form-control" v-model="contactInfo" />
                <label>聯絡人稱呼</label>
              </div>
            </div>
            <div class="col-md">
              <div class="form-floating mb-3">
                <select
                  class="form-select"
                  id="floatingSelect"
                  name="activityDogNumber"
                  aria-label="Floating label select example"
                  v-model="activityDogNumber"
                >
                  <option v-for="n in 10" :key="n" :value="n">
                    {{ n }}
                  </option>
                </select>
                <label for="floatingSelect">預計狗數</label>
              </div>
            </div>
          </div>
          <div class="row g-2">
            <div class="col-md">
              <div class="form-floating mb-3">
                <input type="text" class="form-control" v-model="contactMail" />
                <label>連絡信箱</label>
              </div>
            </div>
            <div class="col-md">
              <div class="form-floating mb-3">
                <input
                  type="text"
                  class="form-control"
                  v-model="contactPhone"
                />
                <label>連絡電話</label>
              </div>
            </div>
          </div>

          <button class="w-100 btn btn-lg btn-primary" @click.prevent="create">
            創建活動
          </button>

          <div class="text-danger text-center mt-3">{{ message }}</div>
        </form>
      </div>
    </div>
  </main>
</template>
<script>
import axios from "axios";
import { useMemberStore } from "@/stores/memberStore";

export default {
  mounted() {
    fetch(`${this.API_URL}/activity/api/types`)
      .then((rs) => rs.json())
      .then((typeObj) => {
        this.types = typeObj;
      });

    fetch(`${this.API_URL}/activity/api/venues`)
      .then((rs) => rs.json())
      .then((venueObj) => {
        this.venues = Object.values(venueObj);
        let venues = JSON.parse(JSON.stringify(venueObj));
      });
  },
  data() {
    return {
      types: [],
      venues: [],
      activityTypeId: null,
      venueId: null,
      activityDate: "",
      activityStart: "",
      activityEnd: "",
      activityTitle: "",
      activityDescription: "",
      activityProcess: "",
      activityNotice: "",
      activityCostDescription: "",
      activityCost: "",
      activityClosingDate: "",
      contactInfo: "",
      contactMail: "",
      contactPhone: "",
      message: "",
      activityDogNumber: "",
    };
  },
  computed: {
    dogOptions() {
      if (!this.venueId) return [];
      const selectedVenue = this.venues.find(
        (venue) => venue.venueId === this.venueId
      );
      if (!selectedVenue) return [];
      return Array.from(
        { length: selectedVenue.venueCapacityDog },
        (_, index) => index + 1
      );
    },
  },
  methods: {
    create() {
      const fd = new FormData();
      fd.append("activityTypeId", this.activityTypeId);
      fd.append("venueId", this.venueId);
      fd.append("activityDate", new Date(this.activityDate));
      fd.append(
        "activityStart",
        new Date(`${this.activityDate}T${this.activityStart}`)
      );
      fd.append(
        "activityEnd",
        new Date(`${this.activityDate}T${this.activityEnd}`)
      );
      fd.append("activityTitle", this.activityTitle);
      fd.append("activityDescription", this.activityDescription);
      fd.append("activityProcess", this.activityProcess);
      fd.append("activityNotice", this.activityNotice);
      fd.append("activityCost", this.activityCost);
      fd.append("activityCostDescription", this.activityCostDescription);
      fd.append("activityClosingDate", new Date(this.activityClosingDate));
      fd.append("contactInfo", this.contactInfo);
      fd.append("contactPhone", this.contactPhone);
      fd.append("contactMail", this.contactMail);
      fd.append("activityDogNumber", this.activityDogNumber);
      console.log(this.venueId);

      const memberStore = useMemberStore();
      console.log("是員工嗎?", memberStore.memberRole);
      console.log(fd);
      if (memberStore.memberRole.startsWith("ROLE")) {
        fd.append("employeeId", memberStore.memberId);
        console.log(memberStore.memberId);
        axios
          .post(`${this.API_URL}/activity/api/official/add`, fd, {
            headers: {
              "Content-Type": "application/json",
            },
          })
          .then((rs) => {
            this.message = "";
            this.$router.push("/");
          })
          .catch((error) => {
            this.message = "創建失敗";
            console.error("发生错误:", error.message);
          });
      } else {
        this.message = "你沒有資格";
      }
    },
  },
  watch: {
    activityTypeId: function (newValue, oldValue) {
      console.log("您选择的活动类型的值是:", newValue);
    },
    venueId: function (newValue, oldValue) {
      console.log("您选择的場地的值是:", newValue);
    },
    activityDate: function (newValue, oldValue) {
      console.log("您选择活動日期是:", newValue);
    },
    activityStart: function (newValue, oldValue) {
      console.log("活動開始時間是:", newValue);
    },
    activityEnd: function (newValue, oldValue) {
      console.log("活動結束時間是:", newValue);
    },
    activityTitle: function (newValue, oldValue) {
      console.log("活動主題:", newValue);
    },
  },
};
</script>
<style></style>
