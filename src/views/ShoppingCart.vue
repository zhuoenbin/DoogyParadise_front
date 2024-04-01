<template>
  <main class="h-100" style="background-color: #eee">
    <div class="container h-100 py-5">
      <div class="row d-flex justify-content-center align-items-center h-100">
        <div class="col-10">
          <div class="d-flex justify-content-between align-items-center mb-4">
            <h3 class="fw-normal mb-0 text-black">Shopping Cart</h3>
            <div>
              排序：<select v-model="sortBy" @change="sortCart">
                <option>價格低至高</option>
                <option>價格高至低</option>
              </select>
            </div>
          </div>
          <!-- 列頭 -->
          <div class="card rounded-3 mb-2">
            <div class="card-body p-4">
              <div
                class="row d-flex justify-content-between align-items-center"
              >
                <!-- 商品 -->
                <div class="col-md-2 col-lg-2 col-xl-2">
                  <h5 class="mb-0 text-center">商品</h5>
                </div>
                <!-- 數量與總計 -->
                <div class="col-md-8 col-lg-8 col-xl-8">
                  <div class="row d-flex justify-content-between">
                    <div class="col-md-4 col-lg-4 col-xl-4 offset-md-1">
                      <h5 class="mb-0 text-center">數量</h5>
                    </div>
                    <div class="col-md-4 col-lg-4 col-xl-4">
                      <h5 class="mb-0 text-center">總計</h5>
                    </div>
                    <div class="col-md-3 col-lg-3 col-xl-2 text-end">
                      <h5 class="mb-0 text-center">操作</h5>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </div>
          <!-- 列頭 -->
          <div class="card rounded-3 mb-4">
            <!-- v-for綁定 -->
            <div class="card-body p-4" v-for="c in carts" :key="c.productId">
              <div
                class="row d-flex justify-content-between align-items-center"
              >
                <div class="col-md-2 col-lg-2 col-xl-2">
                  <!--圖片處理-->
                  <img :src="c.imgPath[0]" class="w-100" />
                </div>
                <div class="col-md-3 col-lg-3 col-xl-3">
                  <p class="lead fw-normal mb-2 fs-5">
                    {{ c.productName }}
                  </p>
                </div>
                <!-- 加減 -->
                <div class="col-md-3 col-lg-3 col-xl-2">
                  <div class="d-flex">
                    <button
                      class="btn btn-link px-2"
                      onclick="this.parentNode.querySelector('input[type=number]').stepDown()"
                      @click="decrementQuantity(c)"
                    >
                      <i class="fas fa-minus"></i>
                    </button>

                    <input
                      min="0"
                      name="quantity"
                      :value="c.quantity"
                      type="number"
                      class="form-control form-control-sm"
                    />

                    <button
                      class="btn btn-link px-2"
                      onclick="this.parentNode.querySelector('input[type=number]').stepUp()"
                      @click="incrementQuantity(c)"
                    >
                      <i class="fas fa-plus"></i>
                    </button>
                  </div>
                </div>
                <!-- 加減 -->
                <div class="col-md-3 col-lg-2 col-xl-2 offset-lg-1">
                  <h5 class="mb-0">{{ totalPrice(c) }}</h5>
                </div>
                <!-- 刪除按鈕 -->
                <div class="col-md-1 col-lg-1 col-xl-1">
                  <div class="text-start">
                    <a
                      href="#!"
                      class="text-danger"
                      @click="deleteToCart(c.productId)"
                    >
                      <i class="fas fa-trash fa-lg"></i>
                    </a>
                  </div>
                </div>
                <!-- 刪除按鈕 -->
              </div>
            </div>
          </div>
          <!-- 結帳按鈕 -->
          <div class="card">
            <div class="card-body text-center">
              <div class="checkout-container">
                <div class="total-price">總金額: ${{ totalCartPrice }}</div>
                <button
                  type="button"
                  class="btn btn-warning btn-block btn-lg"
                  @click="linePay()"
                >
                  結帳
                </button>
              </div>
              <!-- 結帳按鈕 -->
            </div>
          </div>
        </div>
      </div>
    </div>
  </main>
</template>
<script>
import axios from "axios";

export default {
  data() {
    return {
      carts: [],
      sortBy: "價格低至高", // 添加 sortBy 變量來存儲排序方式
    };
  },
  mounted() {
    axios.get(`${this.API_URL}/cart`).then((rs) => {
      //console.log(rs.data); //打印確認資料有傳送到
      //console.log(rs.data[0].productName); //打印確認資料有傳送到
      this.carts = rs.data;
    });
  },
  methods: {
    //排序
    sortCart() {
      if (this.sortBy === "價格低至高") {
        this.carts.sort((a, b) => a.unitPrice - b.unitPrice);
      } else if (this.sortBy === "價格高至低") {
        this.carts.sort((a, b) => b.unitPrice - a.unitPrice);
      }
    },
    decrementQuantity(product) {
      if (product.quantity > 0) {
        product.quantity--;
      }
    },
    incrementQuantity(product) {
      product.quantity++;
    },
    //購物車刪除事件
    deleteToCart(productId) {
      axios
        .post(`http://localhost:8080/product/delete/${productId}`)
        .then((response) => {
          console.log("已成功刪除購物車商品！"); // 處理後端回應
          // 從 carts 數組中移除該商品
          this.carts = this.carts.filter(
            (product) => product.productId !== productId
          );
        })
        .catch((error) => {
          console.error("刪除購物車時發生錯誤：", error); // 處理錯誤
        });
    },
    //LinePay
    // linePay() {
    //   axios
    //     .post(`http://localhost:8080/linepay`)
    //     .then((response) => {
    //       console.log("已成功呼叫linepay！"); // 處理後端回應
    //     })
    //     .catch((error) => {
    //       console.error("呼叫linepay時發生錯誤：", error); // 處理錯誤
    //     });
    // },
    linePay() {
      // 向後端發送 POST 請求
      axios
        .post(`http://localhost:8080/linepay`)
        .then((response) => {
          // 處理後端回應，如果後端回傳一個網址，則進行頁面跳轉
          const redirectUrl = response.data;
          console.log(redirectUrl);
          window.location.href = redirectUrl; // 在前端進行頁面跳轉
        })
        .catch((error) => {
          console.error("結帳時發生錯誤：", error); // 處理錯誤
        });
    },
  },
  computed: {
    totalPrice() {
      return (product) => product.unitPrice * product.quantity;
    },
    //計算購物車總金額
    totalCartPrice() {
      return this.carts
        .reduce((total, product) => {
          return total + product.unitPrice * product.quantity;
        }, 0)
        .toFixed(0); // 四捨五入到兩位小數
    },
  },
};
</script>
<style>
/* 結帳按鈕效果 */
.checkout-container {
  display: flex;
  justify-content: flex-end; /* 將內容靠右排列 */
  align-items: center; /* 垂直居中 */
}

.total-price {
  font-size: 1.5rem; /* 調整字體大小 */
  color: #ff6b6b; /* 調整顏色 */
  font-weight: bold; /* 加粗字體 */
  margin-right: 20px; /* 距離結帳按鈕的間距 */
}
</style>
