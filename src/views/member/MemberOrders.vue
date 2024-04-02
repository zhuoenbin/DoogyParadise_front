<template>
  <main class="container">
    <table class="table table-striped table-hover">
      <thead>
        <tr>
          <th scope="col">訂單ID</th>
          <th scope="col">訂購日期</th>
          <th scope="col">狀態</th>
          <th scope="col">總金額</th>
          <th scope="col">地址</th>
          <th scope="col">付款方式</th>
          <th scope="col"></th>
        </tr>
      </thead>
      <tbody>
        <tr v-for="(o, index) in orders" :key="index">
          <td>{{ o.orderId }}</td>
          <td>{{ o.orderDate }}</td>
          {{
            paymentMethod(o.paymentMethod)
          }}
          <td>{{ payMethod }}</td>

          <td>{{ o.totalPrice }}</td>
          <td>{{ o.city + o.district + o.address }}</td>
          {{
            paymentStatus(o.paymentStatus)
          }}
          <td>{{ payStatus }}</td>
          <td>
            <router-link :to="'/profile/order/' + o.orderId + '/orderdetails'"
              >查看詳細</router-link
            >
          </td>
        </tr>
      </tbody>
    </table>
  </main>
</template>
<script>
import { useMemberStore } from "@/stores/memberStore";
import axios from "axios";
export default {
  data() {
    return {
      memberId: "",
      memberName: "",
      orders: [],
      payMethod: "",
      payStatus: "",
    };
  },
  mounted() {
    const memberStore = useMemberStore();
    this.memberId = memberStore.memberId;
    this.memberName = memberStore.memberName;

    axios.get(`${this.API_URL}/order`).then((re) => {
      this.orders = re.data;
      console.log(this.orders);
    });
  },
  methods: {
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
<style>
router-link {
  display: table-row;
  text-decoration: none;
  /* 添加其他必要的样式 */
}
</style>
