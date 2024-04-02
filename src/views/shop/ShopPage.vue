<template>
  <!-- <div class="app-container"> -->
  <main>
    <div class="container mb-3">
      <div class="row align-items-center text-center">
        <div class="col-1">
          <label for="inputPassword6" class="col-form-label">商品名稱</label>
        </div>
        <div class="col-4">
          <input
            type="text"
            class="form-control"
            v-model="name"
            @keydown.enter="findProducts"
          />
          <!-- @keydown.enter="fetchProducts"按Enter也行 -->
        </div>
        <div class="col-1">
          <button class="btn btn-primary" @click="findProducts()">查詢</button>
        </div>
        <div class="col-3">
          <select
            v-model="sortBy"
            @change="sortCart"
            id="sortSelect"
            class="form-select"
          >
            <option value="價格低至高">價格低至高</option>
            <option value="價格高至低">價格高至低</option>
          </select>
        </div>
      </div>
    </div>
    <hr />
    <div class="py-1 custom-bg-color">
      <!-- 上面這個是一個加顏色的區塊 -->
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
              <router-link
                :to="{ name: 'product', params: { productId: p.productId } }"
              >
                <img :src="p.imgPath[0]" class="w-100 fixed-size-img" />
              </router-link>
              <!--圖片處理-->
              <p class="card-text mt-2 px-3 text-truncate">
                {{ p.productName }}
              </p>
              <div class="d-flex justify-content-between align-items-center">
                <div class="m-3">價格:{{ p.unitPrice }}</div>
                <!-- 彈出視窗 -->
                <!-- :id="'exampleModal_' + p.productId"將模態的 id 設置為基於商品的 productId -->
                <div
                  class="modal fade"
                  :id="'exampleModal_' + p.productId"
                  tabindex="-1"
                  aria-labelledby="exampleModalLabel"
                  aria-hidden="true"
                >
                  <div class="modal-dialog modal-dialog-centered">
                    <div class="modal-content">
                      <div class="modal-header">
                        <h5 class="modal-title" id="exampleModalLabel">
                          購物車
                        </h5>
                        <button
                          type="button"
                          class="btn-close"
                          data-bs-dismiss="modal"
                          aria-label="Close"
                        ></button>
                      </div>
                      <div class="modal-body">
                        <h5>商品:{{ p.productName }}</h5>
                        <p>價格:{{ p.unitPrice }}</p>
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
                          @click="addToCart(p.productId)"
                          data-bs-dismiss="modal"
                        >
                          加入
                        </button>
                      </div>
                    </div>
                  </div>
                </div>
                <!-- 彈出視窗 -->
                <!-- 購物車按鈕 -->
                <div class="m-3">
                  <button
                    type="button"
                    class="btn btn-sm btn-outline-secondary m-2"
                    data-bs-toggle="modal"
                    :data-bs-target="'#exampleModal_' + p.productId"
                  >
                    <!-- :data-bs-target="'#exampleModal_' + p.productId"設置目標模態的 id 為基於商品的 productId -->
                    <i class="fa-solid fa-cart-plus"></i>
                  </button>
                </div>
                <!-- 購物車按鈕 -->
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  </main>
  <!-- </div> -->
</template>
<script>
import axios from "axios";

export default {
  data() {
    return {
      name: "", //關鍵字搜尋
      sortBy: "價格低至高", // 添加 sortBy 變量來存儲排序方式
      currentPage: 0,
      totalPage: 0,
      products: [],
    };
  },
  mounted() {
    this.findProducts();
  },
  computed: {
    showPageBar() {
      const tp = this.totalPage;
      let arr = [];

      for (let i = 1; i <= tp; i++) {
        arr.push(i);
      }
      return arr;
    },
  },
  methods: {
    //綁定頁碼點擊事件
    goToPage(p) {
      if (p == "...") {
        return;
      }
      this.currentPage = p - 1;
    },
    addToCart(productId) {
      axios
        .post(`http://localhost:8080/totalAddToCart/add/${productId}`)
        .then((response) => {
          console.log("已成功加入購物車！"); // 處理後端回應
        })
        .catch((error) => {
          console.error("加入購物車時發生錯誤：", error); // 處理錯誤
        });
    },
    //商品陳列(有加搜尋功能的)
    findProducts() {
      axios
        .get(
          `${this.API_URL}/products-keyword/${this.currentPage}?keyword=${this.name}`
        )
        .then((rs) => {
          // console.log(this.name);
          // console.log(rs.data); // 打印確認資料有傳送到
          this.currentPage = rs.data.number;
          this.totalPage = rs.data.totalPages;
          this.products = rs.data.content;
        });
    },
    // 排序
    sortCart() {
      if (this.sortBy === "價格低至高") {
        this.products.sort((a, b) => a.unitPrice - b.unitPrice);
      } else if (this.sortBy === "價格高至低") {
        this.products.sort((a, b) => b.unitPrice - a.unitPrice);
      }
    },
  },
  watch: {
    currentPage(newVal, oldVal) {
      axios
        .get(`${this.API_URL}/products-keyword/${newVal}?keyword=${this.name}`)
        .then((rs) => {
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
/* 商品名稱的樣式 */
.modal-body h5 {
  font-size: 24px;
  margin-top: 0;
}
/* 商品價格的樣式 */
.modal-body p {
  font-size: 18px;
  color: #888;
  margin-bottom: 20px;
}
/* 頁面底色 */
/* #app {
  background-color: #fff8d7; 
} */
.card.shadow-sm {
  background-color: #ffd1a4; /* 设置卡片的背景颜色 */
}
/* 橫線下面的區塊(對應class="py-1 custom-bg-color") */
.custom-bg-color {
  background-color: #fff8d7;
}
/* 將活動頁面按鈕的顏色設置為與非活動按鈕相同 */
.page-item.active .page-link {
  background-color: #fcfcfc; /* 將背景色設置為透明(這個重要) */
  border-color: #dee2e6; /* 設置與非活動按鈕相同的邊框顏色 */
  color: #212529; /* 設置與非活動按鈕相同的文字顏色 */
}
.page-link {
  font-size: 18px; /* 調整字體大小 */
  color: #333; /* 調整字體顏色 */
}
</style>
