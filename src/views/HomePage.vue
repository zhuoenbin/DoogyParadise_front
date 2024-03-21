<template>
    <main>
        <div class="position-relative overflow-hidden p-3 p-md-5 m-md-3 text-center bg-light">
            <div class="col-md-5 p-lg-5 mx-auto my-5">
                <h2 class="display-4 fw-normal">Doggy Paradise</h2>
                <p class="lead fw-normal">
                    您寵寵物，我們寵你!<br/>提供您各式狗狗用品、寵平台社交、預訂寵物旅館、参加精彩活動，一站式滿足您與寵物的所有需求，一切由您的指尖玩轉，享受樂園般的寵生活體驗！
                </p>
                <a class="btn btn-outline-secondary" href="#">Check now</a>
            </div>
        </div>

        <div class="carousel slide" data-bs-ride="carousel">
            <div class="carousel-indicators">
                <button type="button" data-bs-target="#carouselExampleIndicators" data-bs-slide-to="0" class="active"
                    aria-current="true" aria-label="Slide 1"></button>
                <button type="button" data-bs-target="#carouselExampleIndicators" data-bs-slide-to="1"
                    aria-label="Slide 2"></button>
                <button type="button" data-bs-target="#carouselExampleIndicators" data-bs-slide-to="2"
                    aria-label="Slide 3"></button>
            </div>
            <div class="carousel-inner">
                <div class="carousel-item active">
                    <img src="/1.webp" class="d-block w-100" />
                </div>
                <div class="carousel-item">
                    <img src="/2.webp" class="d-block w-100" />
                </div>
                <div class="carousel-item">
                    <img src="/3.webp" class="d-block w-100" />
                </div>
            </div>
            <button class="carousel-control-prev" type="button" data-bs-target="#carouselExampleIndicators"
                data-bs-slide="prev">
                <span class="carousel-control-prev-icon" aria-hidden="true"></span>
                <span class="visually-hidden">Previous</span>
            </button>
            <button class="carousel-control-next" type="button" data-bs-target="#carouselExampleIndicators"
                data-bs-slide="next">
                <span class="carousel-control-next-icon" aria-hidden="true"></span>
                <span class="visually-hidden">Next</span>
            </button>
        </div>
    </main>
</template>
<script>
import axios from 'axios';
import { useMemberStore } from '@/stores/memberStore';

export default {
    mounted() {
        axios.get(`${this.API_URL}/api/users/map`).then(re => {
            const memberStore = useMemberStore(); //pinia
            memberStore.loginSuccess(re.data); //pinia
            this.message = "";
            sessionStorage.setItem("loggedInMenber", JSON.stringify(re.data));
        })
    }

}
</script>
<style></style>