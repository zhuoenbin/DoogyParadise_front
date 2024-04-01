<template>
  <div class="container">
    <h2 class="text-center">訂房管理</h2>

    <table class="table mx-auto">
      <thead>
        <tr>
          <th>訂房Id</th>
          <th>訂房者</th>
          <th>房號</th>
          <th>寵物名</th>
          <th>訂房時間</th>
          <th>總金額</th>
        </tr>
      </thead>
      <tbody>
        <tr
          v-for="(reservation, reservationId) in filteredReservations"
          :key="reservationId"
        >
          <td>{{ reservation.reservationId }}</td>
          <td>{{ reservation.user.lastName }}</td>
          <td>{{ reservation.room.roomName }}</td>
          <td>{{ reservation.dog.dogName }}</td>
          <td>
            {{ formatDate(reservation.startTime) }} -
            {{ formatDate(reservation.endTime) }}
          </td>
          <td>{{ reservation.totalPrice }}</td>
        </tr>
      </tbody>
    </table>
  </div>
</template>

<script setup>
import { ref, onMounted, computed } from "vue";
import axios from "axios";

let reversedData = ref([]);
let reservations = ref([]);

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

const filteredReservations = computed(() => {
  return reservations.value.filter(
    (reservation) => !isEndDateAfterToday(reservation.endTime)
  );
});

// 定義檢查結束日期是否大於當前日期的方法
const isEndDateAfterToday = (endDate) => {
  const today = new Date();
  const end = new Date(endDate);
  return end > today;
};
</script>

<style scoped>
.container {
  width: 100%;
  max-width: 800px;
  margin: 0 auto;
}

.table {
  width: 100%;
}
</style>
