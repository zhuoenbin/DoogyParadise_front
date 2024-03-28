<template>
    <div>
        <DogItem v-for="dog in dogs" :key="dog.dogId" :dog="dog" />
    </div>
</template>
<script>
import { useMemberStore } from '@/stores/memberStore';
import DogItem from '@/components/dog/DogCard.vue';
import axios from 'axios';

export default {
    components: {
        DogItem
    },
    data() {
        return {
            memberId: "",
            dogs: [],
        }
    },
    mounted() {
        const memberStore = useMemberStore();
        this.memberId = memberStore.memberId

        axios.get(`${this.API_URL}/dog/getDogs/${this.memberId}`)
            .then(re => {
                this.dogs = re.data;
                console.log(re.data);
            })
    },
}
</script>
<style></style>