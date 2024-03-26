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
                <div class="col-md-3 col-lg-3 col-xl-2 d-flex">
                  <!-- 加減 -->
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
                  <!-- 加減 -->
                </div>
                <div class="col-md-3 col-lg-2 col-xl-2 offset-lg-1">
                  <h5 class="mb-0">{{ totalPrice(c) }}</h5>
                </div>
                <!-- 刪除按鈕 -->
                <div class="col-md-1 col-lg-1 col-xl-1 text-end">
                  <a
                    href="#!"
                    class="text-danger"
                    @click="deleteToCart(c.productId)"
                    ><i class="fas fa-trash fa-lg"></i
                  ></a>
                </div>
                <!-- 刪除按鈕 -->
              </div>
            </div>
          </div>

          <div class="card">
            <div class="card-body text-center">
              <button type="button" class="btn btn-warning btn-block btn-lg">
                結帳
              </button>
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
  },
  computed: {
    totalPrice() {
      return (product) => product.unitPrice * product.quantity;
    },
  },
};
</script>
<style></style>
