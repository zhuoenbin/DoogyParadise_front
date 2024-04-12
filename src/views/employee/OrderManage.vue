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
        <tr v-for="(c, index) in case" :key="index">
          <td>{{ c.caseId }}</td>
          <td>{{ c.orders.orderId }}</td>
          {{
            dateFormat(c.orders.orderDate)
          }}
          <td>{{ date }}</td>
          {{
            paymentStatus(c.orders.paymentStatus)
          }}
          <td>{{ payStatus }}</td>
          <td>{{ c.orders.totalPrice }}</td>
          {{
            paymentStatus(c.orders.paymentStatus)
          }}
          <td>{{ payStatus }}</td>
          <td>
            <button
              type="button"
              class="btn btn-primary"
              data-bs-toggle="modal"
              data-bs-target="#staticBackdrop"
            >
              取消訂單
            </button>
          </td>
        </tr>
      </tbody>
    </table>
    <div
      class="modal fade"
      id="staticBackdrop"
      data-bs-backdrop="static"
      data-bs-keyboard="false"
      tabindex="-1"
      aria-labelledby="staticBackdropLabel"
      aria-hidden="true"
    >
      <div class="modal-dialog">
        <div class="modal-content">
          <div class="modal-header">
            <h5 class="modal-title" id="staticBackdropLabel">系統訊息</h5>
            <button
              type="button"
              class="btn-close"
              data-bs-dismiss="modal"
              aria-label="Close"
            ></button>
          </div>
          <div class="modal-body">確認取消該筆訂單？</div>
          <div class="modal-footer">
            <button
              type="button"
              class="btn btn-secondary"
              data-bs-dismiss="modal"
            >
              否
            </button>
            <button
              type="button"
              class="btn btn-primary"
              data-bs-dismiss="modal"
              @click=""
            >
              確定
            </button>
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
      case: [],
      date: "",
      payMethod: "",
      payStatus: "",
    };
  },
  mounted() {
    axios.get(`${this.API_URL}/employee/showOrderCase`).then((re) => {
      this.case = re.data;
      console.log(re.data);
    });
  },
  methods: {
    dateFormat(date) {
      let dateObj = new Date(date);
      this.date = dateObj.toLocaleString("zh-TW", {
        year: "numeric",
        month: "2-digit",
        day: "2-digit",
        hour: "2-digit",
        minute: "2-digit",
        second: "2-digit",
      });
    },
    paymentMethod(value) {
      switch (true) {
        case value === 0:
          this.payMethod = "LinePay";
          break;
        case value === 1:
          this.payMethod = "貨到付款";
          break;
      }
    },
    paymentStatus(value) {
      switch (true) {
        case value === 0:
          this.payStatus = "未付款";
          break;
        case value === 1:
          this.payStatus = "已付款";
          break;
        case value === 2:
          this.payStatus = "已取消，未退";
          break;
        case value === 3:
          this.payStatus = "完成退款";
          break;
        case value === 4:
          this.payStatus = "已取消，不須退款";
          break;
      }
    },
  },
};
</script>
<style></style>
