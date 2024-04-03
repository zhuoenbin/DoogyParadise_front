<template>
  <div class="col-lg-10 mx-auto col-lg-3">
    <div id="title">
      <h5>
        <b>Activity Info 🐾</b>
      </h5>
    </div>
    <main id="products">
      <div class="container">
        <div class="producat_wrapper">
          <div class="producat_image">
            <div class="img_thumbnail">
              <img
                :src="activityInfo.activityImgList[0].galleryImgUrl"
                alt=""
              />
            </div>
          </div>
          <div class="producat_content">
            <p class="company_txt">
              {{ activityInfo.activityTypeName }} / {{ activityInfo.venueName }}
            </p>
            <h2>{{ activityInfo.activityTitle }}</h2>
            <p class="producat_des">
              <b>活動日期:&nbsp;</b>{{ activityInfo.activityDate }}
              {{ this.timeFormat(activityInfo.activityStart) }} ~
              {{ this.timeFormat(activityInfo.activityEnd) }}
              <br />
              <b>報名截止:&nbsp;</b>
              {{ this.dateFormat(activityInfo.activityClosingDate) }}
            </p>
            <div class="price">
              <div class="dicscount_price">
                <p class="normal_price">
                  剩下🐶
                  {{
                    activityInfo.activityDogNumber -
                    activityInfo.currentDogNumber
                  }}
                  名🔥🔥🔥
                </p>
                <p><span class="discount">50%</span></p>
              </div>
              <p
                v-if="
                  activityInfo.activityDogNumber -
                    activityInfo.currentDogNumber >
                  0
                "
                class="total_price"
              >
                dddddd
              </p>
            </div>
            <div class="qty">
              <div class="cont">
                <div class="button-container">
                  <div class="dog">
                    <div class="tail"></div>
                    <div class="body"></div>
                    <div class="head">
                      <div class="eyes">
                        <div class="left"></div>
                        <div class="right"></div>
                      </div>
                      <div class="nuzzle">
                        <div class="mouth">
                          <div class="tongue"></div>
                        </div>
                        <div class="nose">
                          <div class="nostrils"></div>
                          <div class="highlight"></div>
                        </div>
                      </div>
                    </div>
                    <div class="ears">
                      <div class="left"></div>
                      <div class="right"></div>
                    </div>
                  </div>
                  <button>Join!</button>
                  <div class="paw"></div>
                  <div class="paw top"></div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </main>
  </div>
</template>
<script>
import axios from "axios";
import { useMemberStore } from "@/stores/memberStore";

export default {
  data() {
    return {
      activityInfo: [],
      activityId: "",
      isCustomer: true,
      isJoinButtonVisible: true,
      isJoinButtonDisabled: false,
    };
  },
  mounted() {
    const memberStore = useMemberStore();
    console.log(memberStore.memberRole);
    if (!memberStore.memberRole.startsWith("Act")) {
      this.isCustomer = false;
      this.isJoinButtonVisible = false;
      this.isJoinButtonDisabled = true;
    }
    this.activityId = this.$route.params.activityId;
    axios
      .get(
        `${this.API_URL}/activity/api/official/activityInfo/${this.activityId}`
      )
      .then((rs) => {
        console.log(rs.data);
        this.activityInfo = rs.data;
      });
  },
  methods: {
    timeFormat(time) {
      if (time && time.length >= 3) {
        time = time.substring(0, time.length - 3);
      }
      return time;
    },
    dateFormat(dateString) {
      const weekdays = ["Sun.", "Mon.", "Tue.", "Wed.", "Thu.", "Fri.", "Sat."];
      const date = new Date(dateString);

      // 分別年月日和星期
      const year = date.getFullYear();
      const month = date.getMonth() + 1;
      const day = date.getDate();
      const weekday = weekdays[date.getDay()];

      // 拼接格式化后的日期字串
      const formattedDate = `${year}-${month}-${day} ${weekday}`;

      return formattedDate;
    },
  },
};
</script>

<style>
@import url("https://fonts.googleapis.com/css2?family=Poppins&display=swap");
#title {
  margin-top: 2rem;
}
#products {
  margin-top: 2rem;
  position: relative;
  width: 100%;
}

.producat_wrapper {
  display: flex;
  justify-content: space-between;
  align-items: center;
  gap: 4rem;
  width: 100%;
}
.producat_image img {
  display: block;
  object-fit: cover;
  width: 90%;
  border-radius: 10px;
  cursor: pointer;
  margin-left: 0;
  margin-right: 0;
  padding: 0;
}
.company_txt {
  color: #563667;
  text-transform: uppercase;
  font-weight: 600;
  letter-spacing: 2px;
  font-size: 1rem;
}
.producat_content {
  width: 150%;
  margin: 0 auto;
}
.producat_content h2 {
  font-size: 1.6rem;
  margin: 0.8rem 0;
  font-weight: 800;
  width: 100%;
}
.producat_des {
  margin: 1.5rem 0;
  width: 90%;
  font-size: 1rem;
  line-height: 1.56;
  color: #6374b7;
}
.dicscount_price {
  display: flex;
  align-items: center;
}
.normal_price {
  font-size: 1.5rem;
  font-weight: 700;
  color: #e34244;
}
.dicscount_price span {
  font-weight: normal;
  font-size: 1.5rem;
  background-color: #ffeee2;
  padding: 0 0.5rem;
  color: var(--Orange);
  font-weight: 700;
  margin-left: 1rem;
}
.total_price {
  /* text-decoration: line-through; */
  color: palevioletred;
  margin: 0.5rem 0;
}

.cont {
  width: 100%;
  height: 100%;
  position: relative;
  display: flex;
  /* align-items: center; */
  /* justify-content: center; */
  /* background-color: #f9fafb; */
}

.button-container {
  position: relative;
}
.button-container button {
  color: #111827;
  padding: 10px 20px;
  font-family: "Poppins", sans-serif;
  font-size: 28px;
  background-color: #fff;
  border: 5px solid #374151;
  border-radius: 20px;
  cursor: pointer;
  position: relative;
  box-sizing: border-box;
}
.button-container:hover .dog {
  transform: translate(20px, -55px) rotate(15deg);
  transition-delay: 0.6s;
}
.button-container:hover .paw {
  transition-delay: 0.3s;
  right: -5px;
}
.button-container:hover .paw::after {
  transition-delay: 0s;
  left: 0;
}
.button-container:hover .paw.top {
  transition-delay: 0.4s;
  right: 40px;
  top: -8px;
}
.button-container:hover .tail {
  opacity: 1;
  transition-delay: 0.6s;
}

.dog {
  position: absolute;
  width: 65px;
  height: 65px;
  top: -10px;
  right: 1px;
  transform: translate(0, 0) rotate(0);
  transition: 0.3s transform cubic-bezier(0.33, 1, 0.68, 1);
}
.dog div {
  position: absolute;
}
.dog .tail {
  width: 10%;
  height: 35%;
  left: -50%;
  bottom: -34%;
  transform: rotate(-25deg);
  transition: 0.1s opacity;
  transition-delay: 0s;
  opacity: 0;
}
.dog .tail::after {
  content: "";
  position: absolute;
  transform-origin: bottom center;
  top: 0;
  left: 0;
  width: 100%;
  height: 100%;
  border-radius: 50% 50% 0 0;
  background-color: #e1a46e;
  animation: infinite alternate tailSkew 0.3s cubic-bezier(0.65, 0, 0.35, 1);
}
@keyframes tailSkew {
  from {
    transform: skewX(15deg);
  }
  to {
    transform: skewX(-15deg);
  }
}
.dog .body {
  width: 70%;
  height: 50%;
  bottom: -20%;
  left: 50%;
  transform: translateX(-50%);
  background-color: #9f6a43;
  border-radius: 50% 50% 0 0;
}
.dog .head {
  width: 65%;
  height: 70%;
  bottom: 5%;
  left: 50%;
  transform: translateX(-50%);
  border-radius: 80% 80% 60% 60%;
  background-color: #e1a46e;
}
.dog .nuzzle {
  width: 70%;
  height: 40%;
  bottom: 0%;
  left: 50%;
  transform: translateX(-50%);
}
.dog .nuzzle::before,
.dog .nuzzle::after {
  content: "";
  width: 50%;
  height: 100%;
  display: inline-block;
  position: absolute;
  top: 0;
  left: 0;
  background-color: #c28e5f;
  border-radius: 70% 30% 50% 20%;
  z-index: 1;
}
.dog .nuzzle::after {
  left: auto;
  right: 0;
  transform: scaleX(-1);
}
.dog .mouth {
  width: 50%;
  height: 90%;
  border-radius: 100%;
  background-color: #111827;
  left: 50%;
  bottom: -20%;
  transform: translateX(-50%);
}
.dog .tongue {
  width: 50%;
  height: 50%;
  background-color: #ef4444;
  left: 50%;
  transform: translateX(-50%);
  bottom: 5%;
  border-radius: 50%;
  animation: 0.3s alternate tongueBounce infinite cubic-bezier(0.45, 0, 0.55, 1);
}
@keyframes tongueBounce {
  from {
    bottom: 20%;
  }
  to {
    bottom: 15%;
  }
}
.dog .nose {
  width: 30%;
  height: 20%;
  left: 50%;
  top: 0;
  transform: translateX(-50%);
  z-index: 10;
}
.dog .nose::before {
  content: "";
  width: 100%;
  height: 60%;
  top: -50%;
  left: 0;
  position: absolute;
  display: inline-block;
  background-color: #1f2937;
  border-radius: 1000px 1000px 0 0;
}
.dog .nose::after {
  content: "";
  width: 100%;
  height: 100%;
  top: 10%;
  left: 0;
  position: absolute;
  display: inline-block;
  background-color: #1f2937;
  border-radius: 0 0 1000px 1000px;
}
.dog .nose .nostrils {
  width: 90%;
  height: 100%;
  top: 0;
  z-index: 1;
  left: 50%;
  transform: translateX(-50%);
}
.dog .nose .nostrils::before {
  content: "";
  display: inline-block;
  width: 30%;
  left: 10%;
  height: 100%;
  position: absolute;
  background-color: #000;
  border-radius: 100%;
}
.dog .nose .nostrils::after {
  content: "";
  display: inline-block;
  width: 30%;
  right: 10%;
  height: 100%;
  position: absolute;
  background-color: #000;
  border-radius: 100%;
}
.dog .nose .highlight {
  top: -50%;
  left: 50%;
  width: 80%;
  height: 30%;
  transform: translateX(-50%);
  background-color: #fff;
  border-radius: 1000px 1000px 0 0;
  background: linear-gradient(#fff, rgba(255, 255, 255, 0));
  opacity: 0.3;
}
.dog .eyes {
  width: 80%;
  height: 35%;
  top: 25%;
  transform: translateX(-50%);
  left: 50%;
}
.dog .eyes .left,
.dog .eyes .right {
  border-radius: 1000px;
  background-color: #111;
  width: 25%;
  height: 52%;
  top: 50%;
  transform: translateY(-50%);
}
.dog .eyes .left::after,
.dog .eyes .right::after {
  content: "";
  display: inline-block;
  position: absolute;
  width: 30%;
  height: 30%;
  background-color: #fff;
  opacity: 0.7;
  border-radius: 1000px;
  left: 15%;
  top: 15%;
}
.dog .eyes .left {
  left: 15%;
}
.dog .eyes .right {
  right: 15%;
}
.dog .ears {
  width: 90%;
  height: 90%;
  top: 70%;
  left: 50%;
  transform: translate(-50%, -50%);
}
.dog .ears div {
  width: 30%;
  height: 50%;
  left: 0;
  top: 0;
  background-color: #9f6a43;
  transform: rotate(15deg);
  border-radius: 60% 20% 80% 10%;
  z-index: 1;
}
.dog .ears div.right {
  transform: rotate(-15deg) scaleX(-1);
  left: auto;
  right: 0;
}

.paw {
  position: absolute;
  right: -20px;
  top: 15px;
  overflow: hidden;
  width: 20px;
  height: 20px;
  transition: 0.3s right cubic-bezier(0.33, 1, 0.68, 1);
}
.paw::after {
  content: "";
  position: absolute;
  left: -100%;
  top: 0;
  width: 100%;
  height: 100%;
  border-radius: 50%;
  background-color: #e1a46e;
  transition: 0.3s left cubic-bezier(0.33, 1, 0.68, 1);
  transition-delay: 0.3s;
}
.paw.top {
  transform: rotate(-90deg);
  top: -20px;
  right: 40px;
  transition: 0.3s top cubic-bezier(0.33, 1, 0.68, 1);
}
</style>
