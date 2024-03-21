<template>
  <div id="app" class="main">
    <div class="left">
      <select v-model="selectedDog">
        <option>請選擇要住宿的寵物</option>
        <option v-for="(dog, dogId) in dogs" :key="dogId" :value="dog">
          {{ dog.dogName }}
        </option>
      </select>

      <div v-for="(room, roomId) in filteredRooms" :key="roomId">
        <span>
          <img src="" />
        </span>
        <span>
          <div>
            房間Id <span>{{ room.roomId }}</span>
            <br />
            房間名稱 <span>{{ room.roomName }}</span>
            <br />
            房間適用於:
            <span>{{
              room.roomSize === 1
                ? "小型犬"
                : room.roomSize === 2
                ? "中型犬"
                : "大型犬"
            }}</span>
            <br />
            房間價格(一天) <span>{{ room.roomPrice }}</span>
            <br />
            <button @click="bookRoom(room)">訂房</button>
          </div>
        </span>
        <br />
      </div>
    </div>
    <div class="right">
      <!-- 將日曆放在這裡 -->
      <!-- 關閉時分秒選項 enable-time-picker -->
      <VueDatePicker
        v-model="selectedDates"
        range
        :options="datepickerOptions"
        :enable-time-picker="false"
        :min-date="new Date()"
      />
      <br /><br />
      <button @click="printSelectedDates">在控制台印出所選日期</button>
    </div>
  </div>
</template>

<script setup>
import { ref, onMounted, computed } from "vue";
import axios from "axios";
import VueDatePicker from "@vuepic/vue-datepicker";

const rooms = ref([]);
const dogs = ref([]);
const selectedDog = ref(null);
const selectedDates = ref([]); // 用於存儲所選日期的範圍

onMounted(() => {
  axios.get("http://localhost:8080/room").then((response) => {
    rooms.value = response.data;
  });
  axios.get("http://localhost:8080/dog").then((response) => {
    dogs.value = response.data;
  });
});
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
  dateFormat: "MM/dd/yyyy", // 設置日期格式為只顯示年月日
  timeFormat: "hh:mm aa",
  firstDay: 0,
};

// VueDatePicker 的選項
const datepickerOptions = {
  locale: en,
  range: true, // 啟用日期範圍選擇
  multipleDateSeparator: " - ",
};

// 印出所選日期的函數
const printSelectedDates = () => {
  console.log(selectedDates.value); // 印出所選日期範圍
};

// 訂房函數
const bookRoom = (room) => {
  if (selectedDog.value) {
    console.log(
      `訂房成功！寵物Id: ${selectedDog.value.dogId}, 寵物Name: ${selectedDog.value.dogName}, 房間Id: ${room.roomId}`
    );
    // 這裡可以添加訂房的相應邏輯
  } else {
    alert("請選擇寵物");
  }
};
</script>

<style>
.main {
  display: flex;
  margin-left: 20px;
}
.right {
  margin-left: 20px;
}
</style>
