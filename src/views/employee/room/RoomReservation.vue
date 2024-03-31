<template>
  <h2>訂房管理</h2>

  <p>
    <button
      class="btn btn-primary"
      @click="toggleCollapse('uncompleted')"
      :aria-expanded="currentCollapse === 'uncompleted'"
    >
      未結束
    </button>
    <button
      class="btn btn-primary"
      @click="toggleCollapse('completed')"
      :aria-expanded="currentCollapse === 'completed'"
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
      :class="{
        show:
          currentCollapse === 'uncompleted' &&
          isEndDateAfterToday(reservation.endTime),
      }"
    >
      <div class="card card-body">
        <span> 訂房Id: {{ reservation.reservationId }} </span>
        <span>訂房者: {{ reservation.user.lastName }}</span>
        <span> 房號: {{ reservation.room.roomName }} </span>
        <span> 寵物名: {{ reservation.dog.dogName }} </span>
        <span>
          訂房時間: {{ formatDate(reservation.startTime) }} -
          {{ formatDate(reservation.endTime) }}
        </span>
      </div>
    </div>
  </div>
  <div
    class="room-container"
    v-for="(reservation, reservationId) in reversedData"
    :key="reservationId"
  >
    <div
      class="collapse"
      :class="{
        show:
          currentCollapse === 'completed' &&
          !isEndDateAfterToday(reservation.endTime),
      }"
    >
      <div class="card card-body">
        <span> 訂房Id: {{ reservation.reservationId }} </span>
        <span>訂房者: {{ reservation.user.lastName }}</span>
        <span> 房號: {{ reservation.room.roomName }} </span>
        <span> 寵物名: {{ reservation.dog.dogName }} </span>
        <span>
          訂房時間: {{ formatDate(reservation.startTime) }} -
          {{ formatDate(reservation.endTime) }}
        </span>
      </div>
    </div>
  </div>
</template>

<script setup>
import { ref, onMounted } from "vue";
import axios from "axios";

let reversedData = ref([]);
let reservations = ref([]);
let currentCollapse = ref(null);

onMounted(() => {
  axios
    .get("http://localhost:8080/employee/roomReservation")
    .then((response) => {
      reversedData = response.data;
      reservations.value = reversedData.slice().reverse();
    });
});

const formatDate = (dateString) => {
  const date = new Date(dateString);
  const year = date.getFullYear();
  const month = (date.getMonth() + 1).toString().padStart(2, "0");
  const day = date.getDate().toString().padStart(2, "0");
  return `${year}/${month}/${day}`;
};

const toggleCollapse = (collapseName) => {
  currentCollapse.value =
    currentCollapse.value === collapseName ? null : collapseName;
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
  width: 80%;
}

p button {
  margin: 2rem 1rem 0 0;
}

.card.card-body {
  margin-top: 2rem;
}
</style>
