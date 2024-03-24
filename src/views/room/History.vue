<template>
  <h2>預約訂房管理</h2>
  <div
    class="room-container"
    v-for="(reservation, reservationId) in reservations"
    :key="reservationId"
  >
    <div v-if="isEndDateAfterToday(reservation.endTime)">
      <div class="card card-body">
        <span>
          訂房時段: {{ formatDate(reservation.startTime) }} -
          {{ formatDate(reservation.endTime) }}
        </span>
        <span> 訂房Id: {{ reservation.reservationId }} </span>
        <span> 房間Id: {{ reservation.room.roomId }} </span>
        <span> DogId: {{ reservation.dog.dogId }} </span>
        <span> DogName: {{ reservation.dog.dogName }} </span>
        <button>取消預約</button>
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
  width: 40%;
}

p button {
  margin: 2rem 1rem 0 0;
}

.card.card-body {
  margin-top: 2rem;
}

button {
  width: 20%;
  margin: 1rem 0;
}
</style>
