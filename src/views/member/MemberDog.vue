<template>
  <div class="flex">
    <router-link :to="{ name: 'addDog' }" class="btn btn-primary"
      >新增狗狗</router-link
    >
    <div class="dogcard">
      <DogItem v-for="dog in dogs" :key="dog.dogId" :dog="dog" />
    </div>
  </div>
</template>
<script>
import { useMemberStore } from "@/stores/memberStore";
import DogItem from "@/components/dog/DogCard.vue";
import axios from "axios";
import { useRouter } from "vue-router";
const router = useRouter();
export default {
  components: {
    DogItem,
  },
  data() {
    return {
      memberId: "",
      dogs: [],
    };
  },
  mounted() {
    const memberStore = useMemberStore();
    this.memberId = memberStore.memberId;

    axios.get(`${this.API_URL}/dog/getDogs/${this.memberId}`).then((re) => {
      this.dogs = re.data;
      console.log(re.data);
    });
  },
  methods: {},
};
</script>
<style scoped>
.flex {
  display: flex;
}

/* .dogcard {
  display: flex;
  flex-wrap: wrap;
} */

.btn {
  max-height: 40px;
}
</style>
