<template>
  <div>
    <h2 class="page-title">取消訂房紀錄</h2>
    <table class="room-table">
      <thead>
        <tr>
          <th>訂房時段</th>
          <th>訂房Id</th>
          <th>房間Id</th>
          <th>Dog名稱</th>
          <th>費用</th>
          <th>訂房時間</th>
          <th>取消時間</th>
          <th>取消原因</th>
        </tr>
      </thead>
      <tbody>
        <tr
          v-for="(reservation, reservationId) in filteredReservations"
          :key="reservationId"
        >
          <td>
            {{ formatDate(reservation.startTime) }} -
            {{ formatDate(reservation.endTime) }}
          </td>
          <td>{{ reservation.reservationId }}</td>
          <td>{{ reservation.room.roomId }}</td>
          <td>{{ reservation.dog.dogName }}</td>
          <td>{{ reservation.totalPrice }}</td>
          <td>{{ formatDate(reservation.reservationTime) }}</td>
          <td>{{ formatDate(reservation.cancelTime) }}</td>
          <td>{{ reservation.cancelDirection }}</td>
        </tr>
      </tbody>
    </table>
  </div>
</template>

<script setup>
import { ref, onMounted, computed } from "vue";
import axios from "axios";
import { useRouter } from "vue-router";

const router = useRouter();
const reservations = ref([]);

onMounted(() => {
  axios
    .get("http://localhost:8080/room/allRoomReservationByUser")
    .then((response) => {
      reservations.value = response.data;
    });
});

const filteredReservations = computed(() => {
  return reservations.value.filter((reservation) => {
    if (reservation.cancelTime != null) {
      return true;
    }
  });
});

const formatDate = (dateString) => {
  const date = new Date(dateString);
  const year = date.getFullYear();
  const month = (date.getMonth() + 1).toString().padStart(2, "0");
  const day = date.getDate().toString().padStart(2, "0");
  return `${year}/${month}/${day}`;
};

const handleModifyReservation = (reservationId, str) => {
  router.push({
    name: "u_page",
    params: { reservationId: reservationId, str: str },
  });
};
</script>

<style scoped>
.page-title {
  font-size: 24px;
  margin-bottom: 20px;
}

.room-table {
  width: 95%;
  border-collapse: collapse;
  border-spacing: 0;
  margin-bottom: 2rem;
}

.room-table th,
.room-table td {
  /* border: 1px solid #c2bdbd; */
  padding: 12px;
  text-align: center;
}

.room-table th {
  background-color: rgb(254, 241, 222);
}

.room-table tr:nth-child(even) {
  background-color: rgb(255, 243, 223);
}

.btn {
  padding: 8px 16px;
  border: none;
  border-radius: 4px;
  cursor: pointer;
  transition: background-color 0.3s;
}
</style>
