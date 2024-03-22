<template>
  <main class="container col-xl-10 col-xxl-8 px-4 py-5">
    <div class="row align-items-center g-lg-7 py-7">
      <div class="col-lg-5 text-center text-lg-start">
        <h1 @click="check" class="display-4 fw-bold lh-1 mb-3">辦活動!</h1>
        <p class="col-lg-10 fs-4">
          由指尖開始探索Doggy Paradise!<br />您寵寵物，我們寵你!提供您各式狗狗用品、寵平台社交，預訂寵物旅館，参加精彩活動，一站式滿足您與寵物的所有需求，一切由您的指尖玩轉，享受樂園般的寵生活體驗！
        </p>
      </div>
      <div class="col-lg-7 mx-auto col-lg-5">
        <form class="p-4 p-md-7 border rounded-3 bg-light">
          <div class="form-floating mb-3 col-md-2">
            <select
              class="form-select"
              id="floatingSelect"
              aria-label="Floating label select example"
            >
              <option selected>Open this select menu</option>
              <option value="1">寵</option>
              <option value="2">Two</option>
              <option value="3">Three</option>
            </select>
            <label for="floatingSelect">活動類型</label>
          </div>
          <div class="form-floating mb-3 col-md-5">
            <select
              class="form-select"
              id="floatingSelect"
              aria-label="Floating label select example"
            >
              <option selected>Open this select menu</option>
              <option value="1">室外陽光跑跳活動場</option>
              <option value="2">室內體能活動場</option>
            </select>
            <label for="floatingSelect">場地選擇</label>
          </div>
          <div class="form-floating mb-3">
            <input
              type="text"
              class="form-control"
              placeholder="name@example.com"
              v-model="email"
            />
            <label>活動主題</label>
          </div>
          <h3>缺時間</h3>
          <div class="form-floating mb-3">
            <input
              type="text"
              class="form-control"
              placeholder="Password"
              v-model="password"
            />
            <label>活動簡介</label>
          </div>
          <div class="form-floating mb-3">
            <input
              type="text"
              class="form-control"
              placeholder="Password"
              v-model="password"
            />
            <label>活動流程</label>
          </div>
          <div class="form-floating mb-3">
            <input
              type="text"
              class="form-control"
              placeholder="Password"
              v-model="password"
            />
            <label>注意事項</label>
          </div>
          <h3>活動截止日期</h3>
          <div class="form-floating mb-3">
            <input
              type="text"
              class="form-control"
              placeholder="Password"
              v-model="password"
            />
            <label>活動限制狗數</label>
          </div>
          <div class="form-floating mb-3">
            <input
              type="text"
              class="form-control"
              placeholder="Password"
              v-model="password"
            />
            <label>參加費用</label>
          </div>
          <div class="form-floating mb-3">
            <input
              type="text"
              class="form-control"
              placeholder="Password"
              v-model="password"
            />
            <label>費用敘述</label>
          </div>
          <div class="form-floating mb-3">
            <input
              type="text"
              class="form-control"
              placeholder="Password"
              v-model="password"
            />
            <label>聯絡人稱呼</label>
          </div>
          <div class="form-floating mb-3">
            <input
              type="text"
              class="form-control"
              placeholder="name@example.com"
              v-model="email"
            />
            <label>聯絡Email</label>
          </div>
          <div class="form-floating mb-3">
            <input
              type="text"
              class="form-control"
              placeholder="name@example.com"
              v-model="email"
            />
            <label>連絡電話</label>
          </div>
          <div class="checkbox mb-3">
            <label>
              <input type="checkbox" value="remember-me" /> Remember me
            </label>
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
  data() {
    return {
      email: "amy@mail.com",
      password: "1234",
      message: "",
    };
  },
  methods: {
    login() {
      const fd = new FormData();
      fd.append("email", this.email);
      fd.append("password", this.password);

      axios
        .post(`${this.API_URL}/formLogin`, fd)
        .then((rs) => {
          const memberStore = useMemberStore(); //pinia
          memberStore.loginSuccess(rs.data); //pinia
          console.log(memberStore.memberName);
          this.message = "";
          console.log(rs.data);

          sessionStorage.setItem("loggedInMenber", JSON.stringify(rs.data));

          this.$router.push("/");
        })
        .catch(() => {
          this.message = "登入失敗";
        });
    },
    check() {
      axios.get(`${this.API_URL}/check`).then((re) => console.log(re.data));
    },
    redirectToRegisterPage() {
      this.$router.push("/register");
    },
    gotoGoogleLoginPage() {
      window.location.href = "http://localhost:8080/google-login";
    },
  },
};
</script>
<style></style>
