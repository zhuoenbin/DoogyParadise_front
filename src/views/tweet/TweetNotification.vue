<template>
    <div>

    </div>
</template>
<script>
import axios from "axios";
import { useMemberStore } from "@/stores/memberStore";

export default {
    data() {
        return {
            memberId: "",
        };
    },
    mounted() {
        const memberStore = useMemberStore();
        this.memberId = memberStore.memberId;

        axios.get(`${this.API_URL}/tweet/getMyNotify/${this.memberId}`)
            .then(re => {
                console.log(re.data);

            })
    },
    methods: {

    }
}
</script>
<style></style>