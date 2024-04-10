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
          <th>訂房時間</th>
          <th>
            修改時段
            <span id="update"></span>
          </th>
          <th>取消訂房</th>
        </tr>
      </thead>
      <tbody>
        <tr v-for="(reservation, reservationId) in filteredReservations" :key="reservationId">
          <td>
            <span class="icon" v-if="
              new Date(reservation.startTime) <= new Date() &&
              new Date(reservation.endTime) > new Date()
            "><i class="fa-solid fa-bookmark"></i></span>
            {{ formatDate(reservation.startTime) }} -
            {{ formatDate(reservation.endTime) }}
          </td>
          <td>{{ reservation.reservationId }}</td>
          <td>{{ reservation.room.roomId }}</td>
          <td>{{ reservation.dog.dogName }}</td>
          <td>{{ reservation.totalPrice }}</td>
          <td>{{ formatDate(reservation.reservationTime) }}</td>
          <!-- <td v-if="formatDate(reservation.cancelTime) != '1970/01/01'">
            {{ formatDate(reservation.cancelTime) }}
          </td>
          <td v-else></td>
          <td v-if="formatDate(reservation.cancelTime) != '1970/01/01'">
            {{ reservation.cancelDirection }}
          </td>
          <td v-else></td> -->
          <td>
            <button v-if="
              !isStartDateWithinThreeDays(reservation.startTime) &&
              formatDate(reservation.cancelTime) == '1970/01/01'
            " class="btn btn-update" @click="
              handleModifyReservation(reservation.reservationId, 'update')
              ">
              修改時段
            </button>
          </td>
          <td>
            <button v-if="
              !isStartDateWithinThreeDays(reservation.startTime) &&
              formatDate(reservation.cancelTime) == '1970/01/01'
            " class="btn btn-cancel" @click="
              handleModifyReservation(reservation.reservationId, 'cancel')
              ">
              取消訂房
            </button>
          </td>
        </tr>
      </tbody>
    </table>
  </div>
</template>

<script setup>
import { ref, computed, onMounted } from "vue";
import axios from "axios";
import { useRouter } from "vue-router";

const router = useRouter();

const reservations = ref([]);

onMounted(() => {
  axios
    .get("http://localhost:8080/room/allRoomReservationByUser")
    .then((response) => {
      // 日期排列順序反過來
      reservations.value = response.data.reverse();
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
  return reservations.value.filter((reservation) => {
    if (reservation.cancelTime == null) {
      return isEndDateAfterToday(reservation.endTime);
    }
  });
});

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
  document.getElementById("update").classList.add("loader");
  setTimeout(() => {
    router.push({
      name: "u_page",
      params: { reservationId, str },
    });
  }, 1000); // 添加延遲，確保頁面跳轉完成後再刷新;
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

.btn-update {
  background-color: #49c936;
  color: #fff;
}

.btn-update:hover {
  background-color: #63dc50;
}

.btn-cancel {
  background-color: #dc362a;
  color: #fff;
}

.btn-cancel:hover {
  background-color: #e55c4a;
}

.icon {
  margin-right: 0.5rem;
  color: rgb(241, 189, 101);
}

.loader {
  border: 16px solid #f3f3f3; /* Light grey */
  border-top: 16px solid #3498db; /* Blue */
  border-radius: 50%;
  width: 120px;
  height: 120px;
  animation: spin 2s linear infinite;
}

@keyframes spin {
  0% {
    transform: rotate(0deg);
  }
  100% {
    transform: rotate(360deg);
  }
}
</style>
