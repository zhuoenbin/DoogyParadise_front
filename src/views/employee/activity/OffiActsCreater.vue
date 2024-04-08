<template>
  <div id="app">
    <div id="title">
      <h4>
        <b>創建活動區</b
        ><img
          src="https://res.cloudinary.com/dxz9qtntt/image/upload/v1712297980/activityFolder/r19hqhsblnnlqffgimpr.png"
          alt="🐶"
          id="managerPic"
        /><router-link to="/employee/activity/act_Creater/FormStyle">
          <button class="btn btn-outline-secondary">點擊切換編輯模式</button>
        </router-link>
      </h4>
    </div>
    <div class="col-lg-10 mx-auto col-lg-3">
      <form class="p-4 p-md-7 border rounded-3 bg-light">
        <div>
          <h6 style="text-align: left"><b>活動必要資訊</b></h6>
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
                  :min="new Date()"
                  v-model.lazy="activityDate"
                  required
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
                  max="22:00"
                  required
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
                  :min="activityStart"
                  max="18:00"
                  v-model="activityEnd"
                  required
                /><label>結束時間:</label>
              </div>
            </div>
          </div>

          <div class="form-floating mb-3">
            <input
              type="text"
              class="form-control"
              v-model.lazy="activityTitle"
              required
            />
            <label>活動主題</label>
          </div>
          <div class="input-group mb-3">
            <input
              type="file"
              class="form-control"
              id="mainImgUpload"
              ref="mainImgUpload"
              accept="image/*"
              required
            />
            <label class="input-group-text" for="inputGroupFile02"
              >主題圖片上傳</label
            >
          </div>

          <div class="row g-3">
            <div class="col-md-2">
              <div class="form-floating mb-3">
                <input
                  type="number"
                  min="0"
                  class="form-control"
                  value="0"
                  v-model.lazy="activityCost"
                />
                <label>參加費用</label>
              </div>
            </div>
            <div class="col-md">
              <div class="form-floating mb-3">
                <select
                  class="form-select"
                  id="floatingSelect"
                  name="activityDogNumber"
                  aria-label="Floating label select example"
                  v-model="dogNumber"
                  required
                >
                  <option v-for="n in dogOptions" :key="n" :value="n">
                    {{ n }}
                  </option>
                </select>
                <label for="floatingSelect">預計狗數</label>
              </div>
            </div>
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
          </div>
          <div class="input-group mb-3">
            <input
              type="file"
              class="form-control"
              id="normalImage"
              ref="normalImage"
              accept="image/*"
              multiple
            />
            <label class="input-group-text" for="inputGroupFile02"
              >其他說明圖片上傳</label
            >
          </div>
        </div>
        <div>
          <h6 style="text-align: left"><b>聯絡人資訊</b></h6>
          <div class="row g-3">
            <div class="col-md">
              <div class="form-floating mb-3">
                <input type="text" class="form-control" v-model="contactInfo" />
                <label>聯絡人稱呼</label>
              </div>
            </div>
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
        </div>
        <br />
        <div>
          <h6 style="text-align: center; color: brown"><b>活動內頁編輯</b></h6>
          <ckeditor
            :editor="editor"
            v-model="editorData"
            :config="editorConfig"
            @blur="textOuputer"
          ></ckeditor>
        </div>
        <hr />
        <button class="w-100 btn btn-lg btn-primary" @click.prevent="create">
          創建活動
        </button>

        <div class="text-danger text-center mt-3">{{ message }}</div>
      </form>
    </div>
  </div>
</template>
<script>
import axios from "axios";
import { useMemberStore } from "@/stores/memberStore";
import { useActivityStore } from "@/stores/activityStore";
import Editor from "@ckeditor/ckeditor5-custom-build/build/ckeditor";
export default {
  name: "app",
  data() {
    return {
      editor: Editor,
      editorData: "",
      editorConfig: {
        // The configuration of the editor.
      },
      myEmpPass: [],
      types: [],
      venues: [],
      activityTypeId: null,
      venueId: null,
      activityDate: "",
      activityStart: "",
      activityEnd: "",
      activityTitle: "",
      activityCost: null,
      activityClosingDate: "",
      contactInfo: "",
      contactMail: "",
      contactPhone: "",
      message: "",
      dogNumber: "",
    };
  },
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
        // let venues = JSON.parse(JSON.stringify(venueObj));
        console.log(this.venues);
      });

    const memberStore = useMemberStore();
    if (memberStore.memberRole.startsWith("ROLE")) {
      this.contactPhone = "06 253 3131";
      axios
        .get(
          `${this.API_URL}/activity/api/official/employeePass/${memberStore.memberId}`
        )
        .then((rs) => {
          const myPassObj = Object.values(rs.data);
          this.myEmpPass = JSON.parse(JSON.stringify(myPassObj));
          console.log(this.myEmpPass);
          this.contactInfo = `${this.myEmpPass[1]}`;
          this.contactMail = `${this.myEmpPass[3]}`;
        })
        .catch((error) => {
          console.error("Emp eroor:", error);
        });
    }
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
    textOuputer() {
      console.log(this.editorData);
    },
    mainImgUpload() {
      const activityStore = useActivityStore();
      if (activityStore.activityId != null) {
        if (this.$refs.mainImgUpload.files.length > 0) {
          const fd = new FormData();
          fd.append("activityId", activityStore.activityId);
          fd.append("mainImg", this.$refs.mainImgUpload.files[0]);
          axios
            .post(`${this.API_URL}/activity/api/official/addMainImg`, fd)
            .then((response) => {
              console.log("主題圖片新增成功!", response.data);
            })
            .catch((error) => {
              console.error("主題圖片新增失敗", error);
            });
        } else {
          console.log("沒有選擇任何圖片");
        }
      }
    },
    normalImgUpload() {
      const activityStore = useActivityStore();
      if (activityStore.activityId != null) {
      }
      if (this.$refs.normalImage.files.length > 0) {
        const fd = new FormData();
        fd.append("activityId", activityStore.activityId);
        // fd.append("normalImages", this.$refs.normalImage.files);
        Array.from(this.$refs.normalImage.files).forEach((file) => {
          fd.append("normalImages", file);
        });
        axios
          .post(`${this.API_URL}/activity/api/official/addNormalImg`, fd)
          .then((response) => {
            console.log("說明圖片新增成功!", response.data);
          })
          .catch((error) => {
            console.error("說明圖片新增失敗", error);
          });
      } else {
        console.log("沒有選擇任何圖片");
      }
    },
    create() {
      const memberStore = useMemberStore();
      console.log("是員工嗎?", memberStore.memberRole);
      if (memberStore.memberRole.startsWith("ROLE")) {
        console.log(new Date(this.activityClosingDate));
        console.log(new Date(this.activityDate));
        console.log(new Date(`${this.activityDate}T${this.activityStart}`));
        axios
          .post(`${this.API_URL}/activity/api/official/createActivity`, {
            activityTypeId: this.activityTypeId,
            venueId: this.venueId,
            employeeId: memberStore.memberId,
            activityTitle: this.activityTitle,
            activityDate: new Date(this.activityDate),
            activityStart: new Date(
              `${this.activityDate}T${this.activityStart}`
            ),
            activityEnd: new Date(`${this.activityDate}T${this.activityEnd}`),
            activityDescription: this.editorData,
            // activityProcess: this.activityProcess,
            // activityNotice: this.activityNotice,
            activityClosingDate: new Date(this.activityClosingDate),
            activityDogNumber: this.dogNumber,
            activityCost: this.activityCost,
            // activityCostDescription: this.activityCostDescription,
            contactInfo: this.contactInfo,
            contactMail: this.contactMail,
            contactPhone: this.contactPhone,
          })
          .then((rs) => {
            this.message = "";
            const activityStore = useActivityStore();
            activityStore.createSuccess(rs.data);
            console.log(rs.data);
            console.log(activityStore.activityTitle);
            console.log(activityStore.activityId);
          })
          .then((rs) => {
            this.mainImgUpload();
            if (this.$refs.normalImage.files.length > 0) {
              this.normalImgUpload();
            }
          })
          .then((rs) => {
            this.$router.push("/employee/activity/act_HoldingManager");
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
};
</script>
<style scoped>
#title {
  color: #3f427f;
  margin: auto 20px;
  padding: 20px 20px;
  text-align: center;
}
#managerPic {
  height: 60px;
}
</style>
