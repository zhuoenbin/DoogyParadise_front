<template>
  <div class="product-details-container">
    <h1>Product Details</h1>
    <hr />
    <div v-if="productpage.length">
      <div class="product-info">
        <div class="product-image">
          <img :src="productpage[0].imgPath[0]" class="product-img" />
        </div>
        <div class="product-details">
          <!-- 輪播 -->
          <div class="carousel-container">
            <div
              id="carouselExampleSlidesOnly"
              class="carousel slide fixed-carousel-size"
              data-bs-ride="carousel"
            >
              <div class="carousel-inner">
                <div class="carousel-item active">
                  <img
                    src="https://cdn2.ettoday.net/images/5550/5550904.jpg"
                    class="d-block w-100 fixed-size-image"
                    alt="First slide"
                  />
                </div>
                <div class="carousel-item">
                  <img
                    src="https://cdn2.ettoday.net/images/5465/5465162.jpg"
                    class="d-block w-100 fixed-size-image"
                    alt="Second slide"
                  />
                </div>
              </div>
            </div>
          </div>
          <!-- 輪播 -->
          <div class="product-name-container">
            <!-- 愛心 -->
            <svg
              width="24"
              height="20"
              class="vgMiJB"
              viewBox="0 0 24 20"
              @click="isHeartFilled ? deleteToCollect() : addToCollect()"
            >
              <!-- 當isHeartFilled為true調用deleteToCollect，為false調用addToCollect -->
              <path
                :fill="isHeartFilled ? '#FF424F' : 'none'"
                stroke="#FF424F"
                stroke-width="1.5"
                d="M19.469 1.262c-5.284-1.53-7.47 4.142-7.47 4.142S9.815-.269 4.532 1.262C-1.937 3.138.44 13.832 12 19.333c11.559-5.501 13.938-16.195 7.469-18.07z"
                fill-rule="evenodd"
                stroke-linejoin="round"
              ></path>
            </svg>
            <!-- 愛心 -->
            <p class="product-name">{{ productpage[0].productName }}</p>
          </div>
          <p class="product-price">價格：{{ productpage[0].unitPrice }}</p>
          <!-- 數量鍵開始 -->
          <div class="quantity-input-section d-flex align-items-center">
            <button
              class="btn btn-link px-2"
              onclick="this.parentNode.querySelector('input[type=number]').stepDown()"
              @click="decrementQuantity"
            >
              <i class="fas fa-minus"></i>
            </button>

            <input
              min="0"
              name="quantity"
              :value="quantity"
              type="number"
              class="form-control form-control-sm quantity-input text-center"
              @input="updateQuantity"
            />

            <button
              class="btn btn-link px-2"
              onclick="this.parentNode.querySelector('input[type=number]').stepUp()"
              @click="incrementQuantity"
            >
              <i class="fas fa-plus"></i>
            </button>
          </div>
          <!-- 结束數量鍵 -->
          <button
            class="add-to-cart-button"
            data-bs-toggle="modal"
            data-bs-target="#exampleModal"
          >
            加入購物車
          </button>
        </div>
      </div>
    </div>
  </div>
  <!-- 彈出視窗 -->
  <div
    class="modal fade"
    id="exampleModal"
    tabindex="-1"
    aria-labelledby="exampleModalLabel"
    aria-hidden="true"
    v-if="productpage.length"
  >
    <div class="modal-dialog modal-dialog-centered">
      <div class="modal-content">
        <div class="modal-header">
          <h5 class="modal-title" id="exampleModalLabel">購物車</h5>
          <button
            type="button"
            class="btn-close"
            data-bs-dismiss="modal"
            aria-label="Close"
          ></button>
        </div>
        <div class="modal-body">
          <h5>商品:{{ productpage[0].productName }}</h5>
          <p>價格:{{ productpage[0].unitPrice }}</p>
        </div>
        <div class="modal-footer">
          <button
            type="button"
            class="btn btn-secondary"
            data-bs-dismiss="modal"
          >
            取消
          </button>
          <button
            type="button"
            class="btn btn-primary"
            data-bs-dismiss="modal"
            @click="pageAddToCart()"
          >
            加入
          </button>
        </div>
      </div>
    </div>
  </div>
</template>
<script>
import axios from "axios";

export default {
  data() {
    return {
      productpage: [],
      productId: "",
      quantity: 1,
      isHeartFilled: false,
      collection: "",
    };
  },
  mounted() {
    const productId = this.$route.params.productId;
    axios.get(`${this.API_URL}/productPage/${productId}`).then((response) => {
      // console.log(response.data);
      this.productpage = response.data;
      this.productId = productId;
      this.$nextTick(() => {
        this.initCarousel();
      });
    });
    //檢查愛心
    axios.get(`${this.API_URL}/checkCollect/${productId}`).then((response) => {
      console.log(response.data);
      this.collection = response.data;
      //當isHeartFilled為true的時候是填滿的
      this.isHeartFilled = this.collection === 1;
    });
  },
  methods: {
    //加入購物車
    pageAddToCart() {
      console.log(this.quantity);
      axios
        .post(
          `http://localhost:8080/totalAddToCart/add/${this.productId}?quantity=${this.quantity}`
        )
        .then((response) => {
          console.log("已成功加入購物車！");
        })
        .catch((error) => {
          window.location.href = "http://localhost:5173/login";
        });
    },
    //數字鍵
    decrementQuantity() {
      if (this.quantity > 0) {
        this.quantity -= 1;
      }
    },
    //數字鍵
    incrementQuantity() {
      this.quantity += 1;
    },
    //數字鍵
    updateQuantity(event) {
      // 更新 quantity 的值
      this.quantity = parseInt(event.target.value);
    },
    //加入愛心
    addToCollect() {
      axios
        .post(`http://localhost:8080/addCollect/${this.productId}`)
        .then((response) => {
          if (response.data.collect === 1) {
            console.log("已成功加入收藏！");
            this.isHeartFilled = !this.isHeartFilled;
          }
          if (response.data.collect === 2) {
            //這個其實不用(上面有條件判斷式)
            console.error("加入收藏時發生錯誤：返回值為2"); // 處理空返回值為2的情況
          }
        })
        .catch((error) => {
          console.error("未登入", error); // 處理錯誤
          window.location.href = "http://localhost:5173/login";
        });
    },
    deleteToCollect() {
      axios
        .post(`http://localhost:8080/deleteCollect/${this.productId}`)
        .then((response) => {
          console.log("已成功刪除收藏！"); // 處理後端回應
          this.isHeartFilled = !this.isHeartFilled;
        })
        .catch((error) => {
          console.error("刪除收藏時發生錯誤：", error); // 處理錯誤
          const errorMessage = error.response.data.message;
          if (errorMessage === "未登入錯誤") {
            window.location.href = "http://localhost:5173/login";
          }
          //下面這個其實不用(上面有條件判斷式)
          if (errorMessage === "沒有可刪除的收藏") {
            console.log(errorMessage);
          }
        });
    },
    // 啟動輪播
    // initCarousel() {
    //   const carousel = new bootstrap.Carousel(
    //     document.getElementById("carouselExampleSlidesOnly"),
    //     {
    //       interval: 2000, // 輪播間隔時間，以毫秒為單位，這裡設置為2秒
    //       wrap: true, // 是否循環輪播
    //     }
    //   );
    // },
  },
};
</script>

<style>
/* 設置愛心 */
.filled-heart {
  fill: red;
}
/* 设置輪播的高度 */
.carousel-inner {
  width: 100%;
  height: 200px;
}
/* 设置輪播照片 */
.carousel-item img {
  max-width: 100%; /* 最大寬度為100% */
  max-height: 210px;
  object-fit: contain;
}
/* 標題的CSS */
.product-details-container {
  padding: 20px;
}

.product-info {
  display: flex;
}

.product-img {
  width: 100%; /* 設置圖片的寬度為其父元素的寬度 */
  height: 100%; /* 設置圖片的高度為其父元素的高度 */
  object-fit: cover; /* 讓圖片填滿整個容器 */
}

.product-image {
  width: 60%; /* 設置圖片區域寬度為頁面的一半 */
  height: 100%;
  overflow: hidden;
}

.product-details {
  padding-left: 50px;
}

.product-name {
  font-size: 50px;
  font-weight: bold;
  /* margin-bottom: 10px; */
  margin-top: 20px;
}

.product-price {
  font-size: 50px;
  /* margin-bottom: 10px; */
}
/* 數量鍵的CSS */
.quantity-input {
  width: 30%; /* 设置输入框的宽度 */
  height: 45px; /* 设置输入框的高度 */
}
/* 數量鍵的CSS */
/* .quantity-input-section {
  margin-top: 5%;
  margin-bottom: 5%;
} */
/* 購物車按鈕CSS */
.add-to-cart-button {
  padding: 10px 60px;
  background-color: #007bff;
  color: #fff;
  border: none;
  border-radius: 5px;
  margin-top: 5%;
}
/* 彈出視窗 */
.modal-body {
  text-align: center;
}
</style>
