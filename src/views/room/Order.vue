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
        <span> 寵物名稱: {{ reservation.dog.dogName }} </span>
        <span> 費用: {{ reservation.totalPrice }} </span>
        <div v-if="formatDate(reservation.cancelTime) != '1970/01/01'">
          <div>取消時間: {{ formatDate(reservation.cancelTime) }}</div>
          <div>取消原因: {{ reservation.cancelDirection }}</div>
        </div>
        <div
          class="flex"
          v-if="
            !isStartDateWithinThreeDays(reservation.startTime) &&
            formatDate(reservation.cancelTime) == '1970/01/01'
          "
        >
          <button
            class="btn btn-primary"
            @click="
              handleModifyReservation(reservation.reservationId, 'update')
            "
          >
            修改時段
          </button>
          <button
            class="btn btn-primary"
            @click="
              handleModifyReservation(reservation.reservationId, 'cancel')
            "
          >
            取消訂房
          </button>
        </div>
      </div>
    </div>
  </div>
</template>

<script setup>
import { ref, onMounted } from "vue";
import axios from "axios";
import { useRouter } from "vue-router";

const router = useRouter();

const reservations = ref([]);

onMounted(() => {
  axios
    .get("http://localhost:8080/room/allRoomReservationByUser")
    .then((response) => {
      const reversedData = response.data.reverse();
      reservations.value = reversedData;
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

const isStartDateWithinThreeDays = (startDate) => {
  const today = new Date();
  const start = new Date(startDate);
  const differenceInTime = start.getTime() - today.getTime();
  const differenceInDays = differenceInTime / (1000 * 3600 * 24);
  return differenceInDays <= 3;
};

const handleModifyReservation = (reservationId, str) => {
  router.push({
    name: "u_page",
    params: { reservationId: reservationId, str: str },
  });
};
</script>

<style scoped>
.card.card-body {
  width: 40%;
  margin: 2rem;
  margin-left: 0;
  padding: 1.5rem;
}

button {
  margin: 0.5rem;
  margin-left: 0;
}

.flex {
  display: flex;
}
</style>
