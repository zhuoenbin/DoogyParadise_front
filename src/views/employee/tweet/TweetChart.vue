<script setup>
import Chart from 'chart.js/auto';
import { onMounted, ref } from 'vue';
import axios from 'axios';

// 使用 ref 創建可响应式的 labels 和 datasets
const labels = ref([]);
const datasets = ref([]);

onMounted(() => {
    axios.get(`http://localhost:8080/employee/getTweetData`).then(response => {
        const data = response.data.words;
        // 獲取鍵和值的數組
        labels.value = Object.keys(data);
        datasets.value = Object.values(data);
        // 初始化圖表
        const ctx = document.getElementById('heroChart');
        let chart = new Chart(ctx, {
            type: 'bar',
            data: {
                labels: labels.value,
                datasets: [
                    {
                        label: '詞彙熱度',
                        data: datasets.value,
                    },
                ],
            },
            options: {
                responsive: true,
                maintainAspectRatio: false,
                plugins: {
                    legend: {
                        position: 'top',
                    },
                    title: {
                        display: true,
                        text: '近期熱門詞彙',
                    },
                },
            },
        });
    });
});
</script>

<template>
    <div class="card-content-image">
        <canvas id="heroChart" width="100%" height="380"></canvas>
    </div>
</template>

<style scoped>
.card-content-image {
    margin: 50px;
    width: 600px;
    height: 400px;
    border: 1px solid blue;
}

@media (max-width: 992px) {
    .card-content-image {
        width: 300px;
        height: 200px;
        border: 1px solid red;
    }
}
</style>
