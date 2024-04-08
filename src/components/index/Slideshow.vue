<template>
  <div id="slideshow-container" class="slideshow">
    <div class="slide" style="display: inline-block">
      <a
        href="https://zh.wikipedia.org/zh-tw/V_(%E9%98%B2%E5%BD%88%E5%B0%91%E5%B9%B4%E5%9C%98)"
      >
        <img src="./jpg/0001.jpg" alt="Image 1" />
      </a>
    </div>
    <div class="slide" style="display: none">
      <a href="https://zh.wikipedia.org/zh-tw/%E6%9D%8E%E6%A3%9F%E6%97%AD">
        <img src="./jpg/0002.jpg" alt="Image 2" />
      </a>
    </div>
    <div class="slide" style="display: none">
      <a href="https://zh.wikipedia.org/zh-tw/%E6%9D%8E%E6%95%8F%E9%8E%AC">
        <img src="./jpg/0003.jpg" alt="Image 3" />
      </a>
    </div>
    <div class="slide" style="display: none">
      <a href="https://zh.wikipedia.org/zh-tw/%E6%9D%8E%E9%90%98%E5%A5%AD">
        <img src="./jpg/0004.jpg" alt="Image 4" />
      </a>
    </div>
    <div class="slide" style="display: none">
      <a href="https://zh.wikipedia.org/zh-tw/IU_(%E6%AD%8C%E6%89%8B)">
        <img src="./jpg/0005.jpg" alt="Image 5" />
      </a>
    </div>
  </div>
</template>
<script>
export default {
  mounted() {
    axios.get(`${this.API_URL}/activity/api/venues`).then((rs) => {
      console.log(rs.data);
    });
  },
};
</script>
<style></style>
