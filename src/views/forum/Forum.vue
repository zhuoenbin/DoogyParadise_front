<template>
  <main>
    <div class="container mb-3">
      <div class="row align-items-center text-center">
        <div class="col-1">
          <label for="inputPassword6" class="col-form-label">文章名稱：</label>
        </div>
        <div class="col-4">
          <input type="text" class="form-control" />
        </div>

        <div class="col-1">
          <label for="inputPassword6" class="col-form-label">文章種類：</label>
        </div>
        <div class="col-2">
          <select>
            <option selected="selected" value="1">綜合討論</option>
            <option value="2">飼養心得</option>
            <option value="3">疑難雜症</option>
          </select>
        </div>
        <div class="col-2">
          <button @click="loadArticles" class="btn btn-primary">查詢</button>
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
    <div class="row row-cols-1 row-cols-sm-2 row-cols-md-3 g-3 text-center">
      <div class="col" v-for="a in articles" :key="a.articleId">
        <div class="card shadow-sm">
          <p class="card-text mt-2 px-3 text-truncate">
            {{ a.articleTitle }}
          </p>
          <p>{{ a.userName }}</p>
          <div class="d-flex justify-content-between align-items-center">
            <div class="m-3">
              <button
                type="button"
                class="btn btn-sm btn-outline-secondary m-2"
              >
                <i class="fa-solid fa-cart-plus"></i>
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
import { useMemberStore } from "@/stores/memberStore";
export default {
  data() {
    return {
      currentPage: 1,
      totalPage: 0,
      articles: [],
      category: [],
    };
  },
  methods: {
    goToPage(p) {
      if (p != "...") {
        this.currentPage = p;
        console.log(this.currentPage);
      }
    },
    loadArticles() {
      axios.get(`${this.API_URL}/forum/${this.currentPage}`).then((re) => {
        this.totalPage = re.data.totalPages;
        this.articles = re.data.content;
      });
    },
    loadCategory() {
      axios.get(`${this.API_URL}/forum/category`).then((re) => {
        this.category = re.data.categoryName;
      });
    },
  },
  mounted() {
    axios.get(`${this.API_URL}/forum/${this.currentPage}`).then((re) => {
      this.currentPage = re.data.number;
      this.totalPage = re.data.totalPages;
      this.articles = re.data.content;
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
      this.loadArticles();
    },
  },
};
</script>
<style></style>
