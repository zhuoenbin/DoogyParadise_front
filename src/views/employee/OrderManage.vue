<template>
  <main class="container">
    <table class="table table-striped table-hover">
      <thead>
        <tr>
          <th scope="col">案件編號</th>
          <th scope="col">訂單ID</th>
          <th scope="col">退貨日期</th>
          <th scope="col">狀態</th>
          <th scope="col">總金額</th>
          <th scope="col">付款方式</th>
          <th scope="col"></th>
        </tr>
      </thead>
      <tbody>
        <tr>
          <td></td>
          <td></td>
          <td></td>
          <td></td>
          <td></td>
          <td></td>
          <td></td>
        </tr>
      </tbody>
    </table>
  </main>
</template>
<script>
import axios from "axios";
export default {
  data() {
    return {
      case: [],
    };
  },
  mounted() {
    axios.get(`${this.API_URL}/employee/showOrderCase`).then((re) => {
      this.case = re.data;
      console.log(re.data);
    });
  },
};
</script>
<style></style>
