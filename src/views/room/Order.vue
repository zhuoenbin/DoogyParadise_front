<template>
  <h2 class="page-title">預約訂房管理</h2>
  <div class="table-container">
    <table class="room-table">
      <thead>
        <tr>
          <th>訂房時段</th>
          <th>訂房Id</th>
          <th>房間Id</th>
          <th>寵物名</th>
          <th>費用</th>
          <th>取消時間</th>
          <th>取消原因</th>
          <th>修改時段</th>
          <th>取消訂房</th>
        </tr>
      </thead>
      <tbody>
        <tr
          v-for="(reservation, reservationId) in reservations"
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
          <td v-if="formatDate(reservation.cancelTime) != '1970/01/01'">
            {{ formatDate(reservation.cancelTime) }}
          </td>
          <td v-else></td>
          <td v-if="formatDate(reservation.cancelTime) != '1970/01/01'">
            {{ reservation.cancelDirection }}
          </td>
          <td v-else></td>
          <td>
            <button
              v-if="
                !isStartDateWithinThreeDays(reservation.startTime) &&
                formatDate(reservation.cancelTime) == '1970/01/01'
              "
              class="btn btn-update"
              @click="
                handleModifyReservation(reservation.reservationId, 'update')
              "
            >
              修改時段
            </button>
          </td>
          <td>
            <button
              v-if="
                !isStartDateWithinThreeDays(reservation.startTime) &&
                formatDate(reservation.cancelTime) == '1970/01/01'
              "
              class="btn btn-cancel"
              @click="
                handleModifyReservation(reservation.reservationId, 'cancel')
              "
            >
              取消訂房
            </button>
          </td>
        </tr>
      </tbody>
    </table>
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
      // 日期排列順序反過來
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
  background-color: rgb(197, 195, 195);
}

.room-table tr:nth-child(even) {
  background-color: #e3e1e1;
}

.btn {
  padding: 8px 16px;
  border: none;
  border-radius: 4px;
  cursor: pointer;
  transition: background-color 0.3s;
}

.btn-update {
  background-color: #249527;
  color: #fff;
}

.btn-update:hover {
  background-color: #145e18;
}

.btn-cancel {
  background-color: #c72519;
  color: #fff;
}

.btn-cancel:hover {
  background-color: #d6331d;
}
</style>
