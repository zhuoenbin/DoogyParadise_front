<template>
  <div>
    <h2>預約訂房管理</h2>
    <div class="mb-3 row">
      <span>訂房Id: {{ reservation.reservationId }}</span>
      <span>
        訂房時段: {{ formatDate(reservation.startTime) }} -
        {{ formatDate(reservation.endTime) }}
      </span>
      <span
        >房間Id: {{ reservation.room ? reservation.room.roomId : "N/A" }}</span
      >
      <span
        >寵物名稱: {{ reservation.dog ? reservation.dog.dogName : "N/A" }}</span
      >
      <span>費用: {{ reservation.totalPrice }}</span>
    </div>
  </div>
  <div class="flex" v-if="str === 'update'">
    <span>請選擇住宿的日期:</span>
    <VueDatePicker
      class="date-picker"
      v-model="selectedDates"
      range
      :options="datepickerOptions"
      :enable-time-picker="false"
      :min-date="new Date()"
    />
  </div>
  <button
    class="btn btn-primary"
    @click="bookRoom(reservation.room)"
    v-if="str === 'update'"
  >
    修改時段
  </button>
  <div v-if="str === 'cancel'">
    <select v-model="direction">
      <option>選錯房間</option>
      <option>行程取消</option>
      <option>找到其他家更便宜的旅館</option>
    </select>
    <button class="btn btn-primary" @click="cancel()">取消訂單</button>
  </div>
</template>

<script setup>
import { ref, onMounted } from "vue";
import VueDatePicker from "@vuepic/vue-datepicker";
import axios from "axios";
import { useRoute, useRouter } from "vue-router";

const selectedDates = ref([]); // 用於存儲所選日期的範圍
const route = useRoute();
const router = useRouter();
const reservationId = route.params.reservationId;
const str = route.params.str;
// findByReservationId 傳過來的物件
const reservation = ref([]);
// findAllReservation 傳過來的物件 List
const reservations = ref([]);
// 取消原因
const direction = ref(null);

onMounted(() => {
  axios
    .get(
      `http://localhost:8080/room/showUpdateRoom?roomReservationId=${reservationId}`
    )
    .then((response) => {
      reservation.value = response.data;
    });
  axios.get("http://localhost:8080/room/reservation").then((response) => {
    reservations.value = response.data;
  });
});
console.log(reservation);

const formatDate = (dateString) => {
  const date = new Date(dateString);
  const year = date.getFullYear();
  const month = (date.getMonth() + 1).toString().padStart(2, "0");
  const day = date.getDate().toString().padStart(2, "0");
  return `${year}/${month}/${day}`;
};

// datepicker 設定
const en = {
  days: [
    "Sunday",
    "Monday",
    "Tuesday",
    "Wednesday",
    "Thursday",
    "Friday",
    "Saturday",
  ],
  daysShort: ["Sun", "Mon", "Tue", "Wed", "Thu", "Fri", "Sat"],
  daysMin: ["Su", "Mo", "Tu", "We", "Th", "Fr", "Sa"],
  months: [
    "January",
    "February",
    "March",
    "April",
    "May",
    "June",
    "July",
    "August",
    "September",
    "October",
    "November",
    "December",
  ],
  monthsShort: [
    "Jan",
    "Feb",
    "Mar",
    "Apr",
    "May",
    "Jun",
    "Jul",
    "Aug",
    "Sep",
    "Oct",
    "Nov",
    "Dec",
  ],
  today: "Today",
  clear: "Clear",
  dateFormat: "MM/dd/yyyy",
  timeFormat: "hh:mm aa",
  firstDay: 0,
};

// datepicker 設定
const datepickerOptions = {
  locale: en,
  range: true,
  multipleDateSeparator: " - ",
};

// 點擊訂房
const bookRoom = (room) => {
  const formattedDates = selectedDates.value.map((date) => {
    const d = new Date(date);
    const year = d.getFullYear();
    const month = ("0" + (d.getMonth() + 1)).slice(-2);
    const day = ("0" + d.getDate()).slice(-2);
    return `${year}-${month}-${day}`;
  });

  const dateRange = calculateDateRange(formattedDates[0], formattedDates[1]);
  console.log(`訂房日期範圍: ${dateRange}`); // 訂房日期範圍

  let conflict = false;
  let arr = [];
  let addedDates = {}; // 使用物件來追蹤已經添加的日期

  for (let i = 0; i < reservations.value.length; i++) {
    if (room.roomId == reservations.value[i][0]) {
      for (let date of dateRange) {
        for (let j = 1; j < reservations.value[i].length; j++) {
          if (date == reservations.value[i][j] && !addedDates[date]) {
            conflict = true;
            arr.push(date);
            addedDates[date] = true; // 將已經添加的日期標記為 true
          }
        }
      }
    }
  }

  // 修改訂房明細1111
  const GOregister = () => {
    axios.post(
      `http://localhost:8080/room/updateRoom?roomReservationId=${reservationId}`,
      {
        startTime: formattedDates[0],
        endTime: formattedDates[1],
        totalPrice: (dateRange.length - 1) * room.roomPrice,
      }
    );
  };
  if (
    !conflict &&
    formattedDates[1] != "1970-01-01" &&
    formattedDates.length != 0
  ) {
    alert(
      `修改成功！訂房Id: ${reservationId}, 訂房時間 ${formattedDates.join(
        " - "
      )}`
    );
    GOregister();
    // 成功的話頁面跳轉到 o_page
    router.push({
      name: "o_page",
    });
  } else if (formattedDates.length == 0) {
    alert("請選擇時間");
  } else if (formattedDates[1] == "1970-01-01") {
    alert("請選擇結束時間");
  } else {
    alert(`房號: ${room.roomId} 在 ${arr} 已被預訂`);
  }
};

// 拿到目前訂單的日期 Array
const calculateDateRange = (startDate, endDate) => {
  const dates = [];
  const currentDate = new Date(startDate);
  const endDateObj = new Date(endDate);
  while (currentDate <= endDateObj) {
    const year = currentDate.getFullYear();
    const month = ("0" + (currentDate.getMonth() + 1)).slice(-2);
    const day = ("0" + currentDate.getDate()).slice(-2);
    dates.push(`${year}-${month}-${day}`);
    currentDate.setDate(currentDate.getDate() + 1);
  }
  return dates;
};

// 取消訂單
const cancel = () => {
  axios.post(
    `http://localhost:8080/room/cancel?roomReservationId=${reservationId}&cancelDirection=${direction.value}`
  );
  router.push({
    name: "o_page",
  });
};
</script>

<style scoped>
h2 {
  margin-bottom: 2rem;
}

.flex {
  display: flex;
  margin: 1.5rem 0;
}

.date-picker {
  width: 25%;
  margin-left: 1rem;
}

button {
  width: 10%;
  margin: 1rem 0;
}

select {
  width: 24%;
  margin-right: 1rem;
}
</style>
