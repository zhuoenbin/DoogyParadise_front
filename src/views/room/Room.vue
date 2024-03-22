<template>
  <div id="app" class="main">
    <div class="left">
      <select v-model="selectedDog" @change="RoomsDate" class="select-dog">
        <option disabled>請選擇要住宿的寵物</option>
        <option v-for="(dog, dogId) in dogs" :key="dogId" :value="dog">
          {{ dog.dogName }}
        </option>
      </select>

      <div
        class="room-container"
        v-for="(room, roomId) in filteredRooms"
        :key="roomId"
      >
        <span>
          {{ room.roomImgPath }}
          <!-- <img :src="room.roomImgPath" alt="Room Image" /> -->
        </span>
        <span>
          <div class="room-details">
            <p>
              <strong>房間Id: </strong> <span>{{ room.roomId }}</span>
            </p>
            <p>
              <strong>房間名稱: </strong> <span>{{ room.roomName }}</span>
            </p>
            <p>
              <strong>房間適用於: </strong>
              <span>{{ roomSizeText(room.roomSize) }}</span>
            </p>
            <p>
              <strong>房間價格(一天): </strong>
              <span>{{ room.roomPrice }}</span>
            </p>
            <button @click="bookRoom(room)">訂房</button>
          </div>
        </span>
        <br />
      </div>
    </div>
    <div class="right">
      <VueDatePicker
        v-model="selectedDates"
        range
        :options="datepickerOptions"
        :enable-time-picker="false"
        :min-date="new Date()"
      />
    </div>
  </div>
</template>

<script setup>
import { ref, onMounted, computed } from "vue";
import axios from "axios";
import VueDatePicker from "@vuepic/vue-datepicker";

const rooms = ref([]);
const dogs = ref([]);
const reservations = ref([]);
const selectedDog = ref(null);
const selectedDates = ref([]); // 用於存儲所選日期的範圍

onMounted(() => {
  axios.get("http://localhost:8080/room").then((response) => {
    rooms.value = response.data;
  });
  axios.get("http://localhost:8080/dog").then((response) => {
    dogs.value = response.data;
  });
  axios.get("http://localhost:8080/room/reservation").then((response) => {
    reservations.value = response.data;
  });
});

// 判斷那幾間房型符合 dog 的體型
const filteredRooms = computed(() => {
  if (!selectedDog.value) return rooms.value;
  return rooms.value.filter((room) => {
    if (selectedDog.value.dogWeight <= 10 && room.roomSize === 1) {
      return true;
    } else if (
      selectedDog.value.dogWeight > 10 &&
      selectedDog.value.dogWeight <= 25 &&
      room.roomSize === 2
    ) {
      return true;
    } else if (selectedDog.value.dogWeight > 25 && room.roomSize === 3) {
      return true;
    } else {
      return false;
    }
  });
});

const roomSizeText = (size) => {
  if (size === 1) return "小型犬";
  else if (size === 2) return "中型犬";
  else return "大型犬";
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

// 點擊訂房
const bookRoom = (room) => {
  if (selectedDog.value && selectedDates.value.length > 0) {
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
        console.log(`1. ${reservations.value[i][0]}`);
        for (let date of dateRange) {
          console.log(`2. ${date}`);
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

    // 新增訂房明細
    const GOregister = () => {
      axios.post(
        `http://localhost:8080/roomReservation?roomId=${room.roomId}`,
        {
          dogId: selectedDog.value.dogId,
          startTime: formattedDates[0],
          endTime: formattedDates[1],
          totalPrice: (dateRange.length - 1) * room.roomPrice,
          reservationTime: "",
          cancelTime: "",
          cancelDirection: "",
          paymentMethod: "credit card",
          paymentStatus: "paid",
        }
      );
    };
    console.log(`formattedDates.length: ${formattedDates[1]}`);

    if (!conflict && formattedDates[1] != "1970-01-01") {
      alert(
        `訂房成功！ 寵物Name: ${selectedDog.value.dogName}, 房間Id: ${
          room.roomId
        }, 訂房時間 ${formattedDates.join(" - ")}`
      );
      GOregister();
    } else if (formattedDates[1] == "1970-01-01") {
      alert("請選擇結束時間");
    } else {
      alert(`房號: ${room.roomId} 在 ${arr} 已被預訂`);
    }
  } else {
    alert(selectedDates.value.length === 0 ? "請選擇日期" : "請選擇寵物");
  }
};

// 預訂房間的日期
const RoomsDate = () => {
  filteredRooms.value.forEach((room) => {
    reservations.value.forEach((reservation) => {
      // if (reservation[0] == room.roomId) {
      //   console.log(reservation);
      // }
    });
  });
};
</script>

<style>
.main {
  display: flex;
  justify-content: space-around; /* 將左右兩側分開 */
  padding: 0 100px; /* 一次性設置 padding */
  min-height: 90vh;
}

.left {
  width: 60%;
}

.left select {
  width: 40%; /* 使選擇框填滿父容器 */
  padding: 10px; /* 添加內邊距 */
  font-size: 16px;
  border-radius: 4px;
  outline: none;
}

.left .room-container {
  margin-top: 20px; /* 房間容器之間的間距 */
}

.left .room-container img {
  max-width: 100px; /* 設置圖片最大寬度 */
  height: auto; /* 自適應高度 */
  border-radius: 4px; /* 圓角 */
}

.left .room-container .room-details {
  margin-left: 10px;
}

.left .room-container .room-details p {
  margin: 5px 0;
}

.left .room-container .room-details button {
  padding: 8px 16px;
  font-size: 14px;
  border-radius: 4px;
  background-color: #007bff;
  color: #fff;
  border: none;
  cursor: pointer;
  outline: none;
  transition: all 0.5s; /* 將所有屬性的變化都進行動畫過渡 */
}

.left .room-container .room-details button:hover {
  background-color: #6bb2fe;
}
</style>
