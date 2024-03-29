<template>
  <div class="dog-card">
    <img :src="dog.dogImgPathCloud" class="dog-image" />
    <!-- <img
      src="https://res.cloudinary.com/dxz9qtntt/image/upload/v1711549113/accountFolder/yxq2tfhvpw8jtj1o8ifi.jpg"
      class="dog-image"
    /> -->
    <div class="dog-info">
      <div class="dog-name">狗狗名字：{{ dog.dogName }}</div>
      <div class="dog-detail">出生日期：{{ formatDate(dog.dogBirthDate) }}</div>
      <div class="dog-detail">品種：{{ dog.dogBreed }}</div>
      <div class="dog-detail">性別：{{ dog.dogGender }}</div>
      <div class="dog-introduction">狗狗介紹：{{ dog.dogIntroduce }}</div>
      <div class="dog-detail">體重：{{ dog.dogWeight }}</div>
      <button
        class="btn btn-primary"
        data-bs-toggle="modal"
        data-bs-target="#exampleModal"
      >
        修改狗狗資訊
      </button>
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
          <h5 class="modal-title" id="exampleModalLabel">修改狗狗資訊</h5>
        </div>
        <div class="modal-body">
          <div class="mb-3">
            <label for="dogName" class="form-label">{{ dog.dogName }}</label>
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
            <select
              id="dogGender"
              class="form-select"
              v-model="dogGender"
              required
            >
              <option value="Male">公</option>
              <option value="Female">母</option>
            </select>
          </div>
          <div class="mb-3">
            <label for="dogBirthDate" class="form-label" required
              >狗狗生日</label
            >
            <input
              type="date"
              id="dogBirthDate"
              class="form-control"
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
        </div>
        <div class="modal-footer">
          <button type="button" class="btn btn-primary" @click="">修改</button>
        </div>
      </div>
    </div>
  </div>
</template>

<script>
export default {
  props: {
    dog: {
      type: Object,
      required: true,
    },
  },
  data() {
    return {};
  },
  methods: {
    formatDate(dateString) {
      const date = new Date(dateString);
      const year = date.getFullYear();
      const month = (date.getMonth() + 1).toString().padStart(2, "0");
      const day = date.getDate().toString().padStart(2, "0");
      return `${year}/${month}/${day}`;
    },
  },
};
</script>

<style scoped>
.dog-card {
  display: flex;
  /* border: 1px solid #ccc; */
  width: 800px;
  border-radius: 10px;
  padding: 20px;
  margin: 20px;
  box-shadow: 0 4px 8px rgba(0, 0, 0, 0.1);
  background-color: #fff;
}

.dog-image {
  max-width: 200px;
  height: auto; /* 讓高度自動調整以保持圖像比例 */
  border-radius: 10px;
  margin-bottom: 10px;
}

.dog-info {
  font-family: Arial, sans-serif;
  margin: 2rem;
}

.dog-name {
  font-size: 1.2em;
  font-weight: bold;
  margin-bottom: 5px;
}

.dog-detail {
  margin-bottom: 5px;
}

.dog-introduction {
  margin-bottom: 10px;
}
</style>
