<template>
    <header class="p-3 text-bg-dark mb-3">
        <div class="container">
            <div class="d-flex flex-wrap align-items-center justify-content-center justify-content-lg-start">
                <ul class="nav col-12 col-lg-auto me-lg-auto mb-2 justify-content-center mb-md-0">
                    <li>
                        <router-link to="/" class="nav-link px-2 text-secondary">首頁</router-link>
                    </li>
                    <li>
                        <router-link to="/shop" class="nav-link px-2 text-white">商城</router-link>
                    </li>
                    <li>
                        <router-link to="" class="nav-link px-2 text-white">論壇</router-link>
                    </li>
                    <li>
                        <router-link to="" class="nav-link px-2 text-white">動態牆</router-link>
                    </li>
                    <li>
                        <router-link to="" class="nav-link px-2 text-white">活動</router-link>
                    </li>
                    <li>
                        <router-link to="" class="nav-link px-2 text-white">寵物旅館</router-link>
                    </li>
                </ul>

                <div class="text-end">
                    <router-link v-if="!isloggedIn" to="/login" class="text-decoration-none">
                        <button type="button" class="btn btn-outline-light me-2">
                            登入
                        </button>
                    </router-link>

                    <template v-if="isloggedIn">
                        <router-link to="/profile" class="text-decoration-none">
                            <button type="button" class="btn btn-warning">
                                {{ name }}
                            </button></router-link>
                        <img :src="photo" width="8%" class="mx-2" />

                        <button @click="logout" type="button" class="btn btn-outline-light">登出</button>
                    </template>

                </div>
            </div>
        </div>
    </header>
</template>
<script>
import { useMemberStore } from '@/stores/memberStore';
import axios from 'axios';

export default {
    methods: {
        logout() {
            axios.get(`${this.API_URL}/logout`).then((re) => {
                const memberStore = useMemberStore();
                memberStore.logout();
                this.$router.push("/");
            }).catch((error) => {
                console.log("failed", error)
            })
        }
    },
    computed: {
        id() {
            const memberStore = useMemberStore();
            return memberStore.memberId
        },
        name() {
            const memberStore = useMemberStore();
            return memberStore.memberName
        },
        photo() {
            return useMemberStore().memberPhoto;
        },
        isloggedIn() {
            return useMemberStore().isLoggedIn;
        }
    }

}
</script>
<style></style>