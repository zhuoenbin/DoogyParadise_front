<template>
  <main class="h-100 gradient-custom">
    <div class="container py-5 h-100">
      <div class="row d-flex justify-content-center align-items-center h-100">
        <div class="col-lg-10 col-xl-8">
          <div class="card" style="border-radius: 10px">
            <div class="card-header px-4 py-5">
              <h5 class="text-muted mb-0">
                Thanks for your Order,
                <span style="color: #a8729a">{{ memberName }}</span>
              </h5>
            </div>
            <div class="card-body p-4">
              <div
                class="d-flex justify-content-between align-items-center mb-4"
              >
                <p class="lead fw-normal mb-0" style="color: #a8729a">
                  商品細項
                </p>
                <p class="small text-muted mb-0">訂單編號 : 001</p>
                <!--order o | o.orderId-->
              </div>
              <div class="card shadow-0 border mb-4" v-for="p in products">
                <div class="card-body">
                  <div class="row">
                    <div class="col-md-2">
                      <img
                        :src="p.mainImgPath"
                        class="img-fluid"
                        alt="Phone"
                      />
                      <!--:src="{{ productImgUrl }}"-->
                    </div>
                    <div
                      class="col-md-6 text-center d-flex justify-content-center align-items-center"
                    >
                      <p class="text-muted mb-0">
                        {{ p.productName }}
                      </p>
                      <!--{{ productName }}-->
                    </div>

                    <div
                      class="col-md-2 text-center d-flex justify-content-center align-items-center"
                    >
                      <p class="text-muted mb-0 small">數量: 1</p>
                      <!--product.stock-->
                    </div>
                    <div
                      class="col-md-2 text-center d-flex justify-content-center align-items-center"
                    >
                      <p class="text-muted mb-0 small">${{ p.unitPrice }}</p>
                      <!--product.unitPrice-->
                    </div>
                  </div>
                </div>
              </div>
            </div>
            <div
              class="card-footer border-0 px-4 py-4"
              style="
                background-color: #a8729a;
                border-bottom-left-radius: 10px;
                border-bottom-right-radius: 10px;
              "
            >
              <h5
                class="d-flex align-items-center justify-content-end text-white text-uppercase mb-0"
              >
                總計: <span class="h2 mb-0 ms-2">$25000</span>
                <!--total(){}-->
              </h5>
            </div>
          </div>
        </div>
      </div>
    </div>
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
      productIds: [],
      products: [],
      productName: "",
      mainImgPath: "",
      stock: "",
      unitPrice: "",
    };
  },
  mounted() {
    const memberStore = useMemberStore();
    this.memberId = memberStore.memberId;
    this.memberName = memberStore.memberName;

    axios
      .get(`${this.API_URL}/order/orderDetails`)
      .then((re) => {
        this.productIds = re.data.map((od) => od.productId);
        console.log(this.productIds);
        console.log("111111111");
        console.log(re.data);
        return axios.post(`${this.API_URL}/order/getProducts`, this.productIds);
      })
      .then((postRes) => {
        console.log(postRes.data[1]);
        this.products = postRes.data;
        console.log(this.productIds);
        console.log("============");
        console.log(postRes.data);
      });
  },
  methods: {},
};
</script>
<style></style>
