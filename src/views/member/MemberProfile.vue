<template>

    <div class="main-container">
        <!-- sideBar -->
        <div class="sidebar">
            <div class="sidebar-header">
                <h2>會員頁</h2>
            </div>
            <div class="sidebar-buttons">
                <router-link to=""><button class="sidebar-button custom-router-link">個人</button></router-link>
                <router-link to=""><button class="sidebar-button custom-router-link">賣場訂單</button></router-link>
                <router-link to=""><button class="sidebar-button custom-router-link">好友</button></router-link>
                <router-link to=""><button class="sidebar-button custom-router-link">我的文章</button></router-link>
                <router-link to=""><button class="sidebar-button custom-router-link">我的動態</button></router-link>
            </div>
        </div>

        <main class="container mt-5">

            <div class="row featurette">

                <div class="col-md-3">
                    <img :src="memberImgPath" class="w-100" />
                </div>
                <div class="col-md-9">
                    <div class="row mt-3">
                        <div class="col-3 text-end">姓名</div>
                        <div class="col">{{ memberName }}</div>
                    </div>
                    <div class="row mt-3">
                        <div class="col-3 text-end">Email</div>
                        <div class="col">{{ memberEmail }}</div>
                    </div>
                    <div class="row mt-3">
                        <div class="col-3 text-end">性別</div>
                        <div class="col">
                            <label> <input type="radio" name="gender" />男性</label>
                            <label> <input type="radio" name="gender" checked />女性</label>
                            <label> <input type="radio" name="gender" />其他</label>
                        </div>
                    </div>
                    <div class="row mt-3">
                        <div class="col-3 text-end">生日</div>
                        <div class="col">
                            <input type="date" value="1996-01-01" />
                        </div>
                    </div>
                    <div class="row mt-3">
                        <div class="col-3 text-end">違規次數</div>
                        <div class="col">{{ memberViolationCount }}</div>
                    </div>
                </div>
            </div>
        </main>
    </div>
</template>
<script>
import axios from 'axios';

export default {
    data() {
        return {
            memberName: "",
            memberId: "",
            memberEmail: "",
            memberImgPath: "",
            memberViolationCount: ""
        }
    },
    mounted() {
        axios.get(`${this.API_URL}/getUserDetail`).then(re => {
            console.log(re.data);
            const tmp = re.data;
            this.memberName = tmp.lastName;
            this.memberEmail = tmp.userEmail;
            this.memberImgPath = tmp.userImgPath;
            this.memberViolationCount = tmp.userViolationCount;
        })
    }

}
</script>
<style>
/* Sidebar 的外觀和佈局 */
.main-container {
    display: flex;
}

.sidebar {
    background-color: #f0f0f0;
    padding: 20px;
}

.sidebar-header h2 {
    margin-bottom: 10px;
}

.sidebar-header {
    width: 130%;
    /* 讓 .sidebar-header 佔據整個父元素的寬度 */
}


.sidebar-buttons {
    display: flex;
    flex-direction: column;
}

.sidebar-button {
    margin-bottom: 10px;
    padding: 10px;
    background-color: #fff;
    border: 1px solid #ddd;
    border-radius: 5px;
    cursor: pointer;
}

.sidebar-button:hover {
    background-color: #e0e0e0;
}

/* sideBar 按鈕的寬度 */
.custom-router-link {
    width: 100%;
    /* 設置寬度為父元素的 100% */
}
</style>