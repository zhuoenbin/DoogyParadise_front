<template>
  <h2>訂房管理</h2>
  <p>
    <button
      class="btn btn-primary"
      data-bs-toggle="collapse"
      href="#collapseExample"
      role="button"
      aria-expanded="false"
      aria-controls="collapseExample"
    >
      未結束
    </button>
    <button
      class="btn btn-primary"
      type="button"
      data-bs-toggle="collapse"
      data-bs-target="#collapseExample1"
      aria-expanded="false"
      aria-controls="collapseExample1"
    >
      已結束
    </button>
  </p>
  <div
    class="room-container"
    v-for="(reservation, reservationId) in reservations"
    :key="reservationId"
  >
    <div
      class="collapse"
      id="collapseExample"
      v-if="isEndDateAfterToday(reservation.endTime)"
    >
      <div class="card card-body">
        <span> 訂房Id: {{ reservation.reservationId }} </span>
        <span> 房間Id: {{ reservation.room.roomId }} </span>
        <span> DogId: {{ reservation.dog.dogId }} </span>
        <span> DogName: {{ reservation.dog.dogName }} </span>
        <span> 開始時間: {{ formatDate(reservation.startTime) }} </span>
        <span> 結束時間: {{ formatDate(reservation.endTime) }} </span>
      </div>
    </div>

    <div
      class="collapse"
      id="collapseExample1"
      v-if="!isEndDateAfterToday(reservation.endTime)"
    >
      <div class="card card-body">
        <span> 訂房Id: {{ reservation.reservationId }} </span>
        <span> 房間Id: {{ reservation.room.roomId }} </span>
        <span> DogId: {{ reservation.dog.dogId }} </span>
        <span> DogName: {{ reservation.dog.dogName }} </span>
        <span> 開始時間: {{ formatDate(reservation.startTime) }} </span>
        <span> 結束時間: {{ formatDate(reservation.endTime) }} </span>
      </div>
    </div>
  </div>
</template>
<script setup>
import { ref, onMounted, computed } from "vue";
import axios from "axios";

const reservations = ref([]);

onMounted(() => {
  axios.get("http://localhost:8080/employee/room").then((response) => {
    reservations.value = response.data;
    console.log(reservations.value);
  });
});

const formatDate = (dateString) => {
  const date = new Date(dateString);
  const year = date.getFullYear();
  const month = (date.getMonth() + 1).toString().padStart(2, "0");
  const day = date.getDate().toString().padStart(2, "0");
  return `${year}/${month}/${day}`;
};

// 定義檢查結束日期是否大於當前日期的方法
const isEndDateAfterToday = (endDate) => {
  const today = new Date();
  const end = new Date(endDate);
  return end > today;
};
</script>
<style scoped>
.room-container {
  width: 140%;
}

p button {
  margin: 2rem 1rem 0 0;
}

.card.card-body {
  margin-top: 2rem;
}
</style>
