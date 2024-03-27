<template>
    <div class="dog-card">
        <!-- <img :src="dog.dogImgPathCloud" class="dog-image" /> -->
        <img src="https://res.cloudinary.com/dxz9qtntt/image/upload/v1711549113/accountFolder/yxq2tfhvpw8jtj1o8ifi.jpg"
            class="dog-image" />
        <div class="dog-info">
            <div class="dog-name">狗狗名字：{{ dog.dogName }}</div>
            <div class="dog-detail">出生日期：{{ dog.dogBirthDate }}</div>
            <div class="dog-detail">品種：{{ dog.dogBreed }}</div>
            <div class="dog-detail">性別：{{ dog.dogGender }}</div>
            <div class="dog-introduction">狗狗介紹：{{ dog.dogIntroduce }}</div>
            <div class="dog-detail">體重：{{ dog.dogWeight }}</div>
        </div>
    </div>
</template>

<script>
export default {
    props: {
        dog: {
            type: Object,
            required: true
        }
    },
    data() {
        return {

        }
    },
    methods: {

    }
}
</script>

<style scoped>
.dog-card {
    border: 1px solid #ccc;
    border-radius: 10px;
    padding: 20px;
    margin: 20px;
    box-shadow: 0 4px 8px rgba(0, 0, 0, 0.1);
    background-color: #fff;
}

.dog-image {
    width: 100%;
    border-radius: 10px;
    margin-bottom: 10px;
}

.dog-info {
    font-family: Arial, sans-serif;
}

.dog-name {
    font-size: 1.2em;
    font-weight: bold;
    margin-bottom: 5px;
}

.dog-detail {
    margin-bottom: 5px;
}

.dog-introduction {
    margin-bottom: 10px;
}
</style>
