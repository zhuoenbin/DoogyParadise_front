<template>
  <main>
    <div class="container mb-3">
      <div class="row align-items-center text-center">
        <div class="col-1">
          <label for="inputPassword6" class="col-form-label">名稱</label>
        </div>
        <div class="col-4">
          <input type="text" class="form-control" />
        </div>

        <div class="col-1">
          <label for="inputPassword6" class="col-form-label">價格</label>
        </div>
        <div class="col-2">
          <input
            type="number"
            class="form-control"
            placeholder="最小值"
            min="0"
          />
        </div>
        <div class="col-2">
          <input
            type="number"
            class="form-control"
            placeholder="最大值"
            min="0"
          />
        </div>
        <div class="col-2">
          <button class="btn btn-primary">查詢</button>
        </div>
      </div>
    </div>
    <hr />
    <div class="py-1 bg-light">
      <div class="container">
        <div class="row">
          <div class="col">
            <ul class="pagination justify-content-center">
              <li class="page-item">
                <button class="page-link">
                  <span>&laquo;</span>
                </button>
              </li>
              <!--分頁處理-->
              <!--@click="gotoPage(P)"綁定頁碼事件-->
              <li
                class="page-item"
                v-for="p of showPageBar"
                @click="goToPage(p)"
                :class="{ active: p == currentPage }"
              >
                <button class="page-link">{{ p }}</button>
              </li>
              <!--分頁處理-->
              <!--@click="gotoPage(P)"綁定頁碼事件-->
              <li class="page-item">
                <button class="page-link">
                  <span>&raquo;</span>
                </button>
              </li>
            </ul>
          </div>
        </div>
        <div class="row row-cols-1 row-cols-sm-2 row-cols-md-3 g-3 text-center">
          <!-- v-for渲染 -->
          <div class="col" v-for="p in products" :key="p.productId">
            <div class="card shadow-sm">
              <!--圖片處理-->
              <!-- src="https://pets-zakka.com/wp-content/uploads/2022/05/deal-with-hot.jpg" -->
              <img :src="p.imgPath[0]" class="w-100 fixed-size-img" />
              <!--圖片處理-->
              <p class="card-text mt-2 px-3 text-truncate">
                {{ p.productName }}
              </p>
              <div class="d-flex justify-content-between align-items-center">
                <div class="m-3">價格:{{ p.unitPrice }}</div>
                <div class="m-3">
                  <!-- 購物車按鈕 -->
                  <button
                    type="button"
                    class="btn btn-sm btn-outline-secondary m-2"
                    @click="addToCart(p.productId)"
                  >
                    <i class="fa-solid fa-cart-plus"></i>
                  </button>
                  <!-- 購物車按鈕 -->
                </div>
              </div>
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
      currentPage: 0,
      totalPage: 0,
      products: [],
    };
  },
  mounted() {
    axios.get(`${this.API_URL}/products/${this.currentPage}`).then((rs) => {
      console.log(rs.data); //打印確認資料有傳送到
      this.currentPage = rs.data.number;
      this.totalPage = rs.data.totalPages;
      this.products = rs.data.content;
    });
  },
  computed: {
    //分頁處理showPageBar
    showPageBar() {
      const cp = this.currentPage;
      const tp = this.totalPage - 1;

      let arr = [1];

      if (cp > 4) {
        arr.push("...");
      }

      for (let i = cp - 2; i <= cp + 2; i++) {
        if (i > 1 && i < tp) {
          arr.push(i);
        }
      }

      if (cp < tp - 3) {
        arr.push("...");
      }

      arr.push(tp);
      return arr;
    },
  },
  methods: {
    //綁定頁碼點擊事件
    goToPage(p) {
      if (p == "...") {
        return;
      }
      this.currentPage = p;
    },
    //購物車點擊事件
    addToCart(productId) {
      axios
        .post(`http://localhost:8080/product/add/${productId}`)
        .then((response) => {
          console.log("已成功加入購物車！"); // 處理後端回應
        })
        .catch((error) => {
          console.error("加入購物車時發生錯誤：", error); // 處理錯誤
        });
    },
  },
  watch: {
    //綁定頁碼與商品頁面
    currentPage(newVal, oldVal) {
      axios.get(`${this.API_URL}/products/${newVal}`).then((rs) => {
        this.totalPage = rs.data.totalPages;
        this.products = rs.data.content;
      });
    },
  },
};
</script>
<style>
.fixed-size-img {
  height: 250px; /* 固定上下高度 */
}
</style>
