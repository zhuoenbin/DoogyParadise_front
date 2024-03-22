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
              <li
                class="page-item"
                v-for="p of showPageBar"
                @click="goToPage(p)"
                :class="{ active: p == currentPage }"
              >
                <button class="page-link">{{ p }}</button>
              </li>

              <li class="page-item">
                <button class="page-link">
                  <span>&raquo;</span>
                </button>
              </li>
            </ul>
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
      currentPage: 1,
      totalPage: 0,
      products: [],
    };
  },
  methods: {
    goToPage(p) {
      if (p != "...") {
        this.currentPage = p;
        console.log(this.currentPage);
      }
    },
    loadProducts() {
      axios.get(`${this.API_URL}/forum/${this.currentPage}`).then((re) => {
        this.totalPage = re.data.totalPages;
        this.products = re.data.content;
      });
    },
  },
  mounted() {
    axios.get(`${this.API_URL}/products/${this.currentPage}`).then((re) => {
      this.currentPage = re.data.number;
      this.totalPage = re.data.totalPages;
      this.products = re.data.content;
    });
  },
  computed: {
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

      if (tp - cp > 3) {
        arr.push("...");
      }

      arr.push(tp);
      return arr;
    },
  },
  watch: {
    currentPage(newValue, oldValue) {
      this.loadProducts();
    },
  },
};
</script>
<style></style>
