<template>
  <div class="flex">
    <form>
      <div class="mb-3">
        <label for="dogName" class="form-label">狗狗名稱</label>
        <input
          type="text"
          class="form-control"
          id="dogName"
          v-model="dogName"
          placeholder="輸入狗狗名稱"
          required
        />
      </div>
      <div class="mb-3">
        <label for="dogGender" class="form-label">狗狗性別</label>
        <select id="dogGender" class="form-select" v-model="dogGender" required>
          <option value="Male">公</option>
          <option value="Female">母</option>
        </select>
      </div>
      <div class="mb-3">
        <label for="dogBirthDate" class="form-label" required>狗狗生日</label>
        <input
          type="date"
          id="dogBirthDate"
          class="form-control"
          :max="getCurrentDate()"
          v-model="dogBirthDate"
        />
      </div>
      <div class="mb-3">
        <label for="dogBreed" class="form-label" required>狗狗品種</label>
        <input
          type="text"
          class="form-control"
          id="dogBreed"
          placeholder="輸入狗狗品種"
          v-model="dogBreed"
        />
      </div>
      <div class="mb-3">
        <label for="dogWeight" class="form-label" required>狗狗體重</label>
        <input
          type="text"
          class="form-control"
          id="dogWeight"
          placeholder="輸入狗狗體重"
          v-model="dogWeight"
        />
      </div>
      <!-- 還沒綁定 -->
      <div class="mb-3">
        <label for="dogImgPathCloud" class="form-label">狗狗照片</label>
        <input
          type="file"
          class="form-control"
          id="dogImgPathCloud"
          ref="dogImgPathCloud"
        />
      </div>
      <div class="mb-3">
        <label for="dogIntroduce" class="form-label">狗狗介紹</label>
        <textarea
          class="form-control"
          id="dogIntroduce"
          placeholder="簡短介紹狗狗"
          rows="3"
          v-model="dogIntroduce"
        ></textarea>
      </div>
    </form>
    <button class="btn btn-primary" @click="addDog()">新增狗狗</button>
  </div>
</template>

<script>
// import { useMemberStore } from "@/stores/memberStore";
import DogItem from "@/components/dog/DogCard.vue";
import axios from "axios";
import { useRouter } from "vue-router";

export default {
  components: {
    DogItem,
  },
  data() {
    return {
      // memberId: "",
      dogName: "",
      dogGender: "",
      dogBirthDate: "",
      dogBreed: "",
      dogWeight: "",
      dogImgPathCloud: "",
      dogIntroduce: "",
    };
  },
  mounted() {
    // const memberStore = useMemberStore();
    // this.memberId = memberStore.memberId;
  },
  methods: {
    // 鎖定今天以後的日期不能選取
    getCurrentDate() {
      const today = new Date();
      const year = today.getFullYear();
      let month = today.getMonth() + 1;
      let day = today.getDate();

      month = month < 10 ? "0" + month : month;
      day = day < 10 ? "0" + day : day;

      return `${year}-${month}-${day}`;
    },

    addDog() {
      axios
        .post(
          `http://localhost:8080/dog/addUserDog`,
          {
            dogName: this.dogName,
            dogGender: this.dogGender,
            dogBirthDate: this.dogBirthDate,
            dogIntroduce: this.dogIntroduce,
            dogWeight: parseFloat(this.dogWeight),
            dogBreed: this.dogBreed,
          },
          {
            headers: {
              "Content-Type": "application/json",
            },
          }
        )
        .then((response) => {
          this.dogImg(response.data);
        });
    },
    dogImg(data) {
      if (this.memberId != null) {
        if (this.$refs.dogImgPathCloud.files.length > 0) {
          const fd = new FormData();
          fd.append("dogId", data);
          fd.append("dogImgPathCloud", this.$refs.dogImgPathCloud.files[0]);
          axios
            .post(`${this.API_URL}/dog/addDogImg`, fd, {
              headers: {
                "Content-Type": "multipart/form-data",
              },
            })
            .then((response) => {
              this.$router.push({
                name: "mydog", // 使用路由名稱
              });
            })
            .catch((error) => {
              console.error("圖片新增失敗", error);
            });
        } else {
          console.log("沒有選擇任何圖片");
        }
      }
    },
  },
};
</script>
<style scoped>
.flex {
  margin: 0 auto; /* 將彈性容器水平置中 */
  display: flex;
  flex-direction: column;
  align-items: center; /* 將內部元素水平置中 */
}

form {
  margin: 20px;
  padding: 20px;
  width: 100%;
  border: 1px solid #ccc;
  border-radius: 10px;
  background-color: #f9f9f9; /* 添加背景色 */
}

/* 標籤樣式 */
.form-label {
  font-weight: bold;
}

/* 輸入框樣式 */
.form-control {
  width: 100%;
  padding: 10px;
  margin-bottom: 15px;
  border: 1px solid #ccc;
  border-radius: 5px;
  box-sizing: border-box;
}

/* 文本區樣式 */
textarea.form-control {
  resize: vertical;
}

/* 選擇框樣式 */
select.form-control {
  width: 100%;
  padding: 10px;
  margin-bottom: 15px;
  border: 1px solid #ccc;
  border-radius: 5px;
  appearance: none;
}

/* 文件上傳樣式 */
input[type="file"].form-control {
  width: 100%;
  padding: 10px;
  margin-bottom: 15px;
  border: 1px solid #ccc;
  border-radius: 5px;
}

/* 按鈕樣式 */
.btn-primary {
  padding: 10px 20px;
  background-color: #007bff;
  color: #fff;
  border: none;
  border-radius: 5px;
  cursor: pointer;
  width: 100%;
  margin: 20px 300px; /* 增加上邊距以與其他元素保持間距 */
}

.btn-primary:hover {
  background-color: #0056b3;
}

/* 按鈕聚焦時樣式 */
.btn-primary:focus {
  outline: none;
  box-shadow: 0 0 0 2px rgba(0, 123, 255, 0.25);
}
</style>
