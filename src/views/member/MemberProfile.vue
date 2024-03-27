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

            </div>
        </div>

        <main class="container mt-5">
            <div class="row featurette">
                <div class="col-md-3">
                    <img :src="memberImgPath" class="w-100" />
                </div>
                <div class="col-md-9">
                    <div class="row mt-3 align-items-center">
                        <div class="col-3 text-end">姓名</div>
                        <span v-if="!editing" class="col">{{ memberName }}</span>
                        <input v-else v-model="memberName" type="text" class="form-control" style="width: 40%;" />
                    </div>

                    <div class="row mt-3 align-items-center">
                        <div class="col-3 text-end">Email</div>
                        <span class="col">{{ memberEmail }}</span>
                    </div>

                    <div class="row mt-3 align-items-center">
                        <div class="col-3 text-end">性別</div>
                        <span v-if="!editing" class="col">{{ memberGender }}</span>
                        <span v-else class="col">
                            <label> <input type="radio" name="gender" v-model="memberGender" value="男">男性</label>
                            <label> <input type="radio" name="gender" v-model="memberGender" value="女" />女性</label>
                            <label> <input type="radio" name="gender" v-model="memberGender" value="其他" />其他</label>
                        </span>
                    </div>

                    <div class="row mt-3 align-items-center">
                        <div class="col-3 text-end">生日</div>
                        <span v-if="!editing" class="col">{{ memberBirthday ? memberBirthday.substring(0, 10) : ''
                            }}</span>
                        <span v-else class="col">
                            <input v-model="tmpmemberBirthday" type="date" />
                        </span>
                    </div>

                    <div class="row mt-3">
                        <div class="col-3 text-end">違規次數</div>
                        <div class="col">{{ memberViolationCount }}</div>
                    </div>

                </div>


                <div class="col">
                    <button v-if="editing" @click="" class="btn btn-primary">修改密碼</button>
                    <hr>
                    <button v-if="!editing" @click="toggleEdit" class="btn btn-primary">编辑個人資訊</button>
                    <div v-else>
                        <button @click="saveChanges" class="btn btn-success me-2">保存</button>
                        <button @click="refreshPage" class="btn btn-success">放棄修改</button>
                    </div>

                </div>



            </div>
        </main>
    </div>
</template>
<script>
import axios from 'axios';
import { useMemberStore } from '@/stores/memberStore';

export default {
    data() {
        return {
            memberId: "",
            memberName: "",
            memberId: "",
            memberEmail: "",
            memberImgPath: "",
            memberViolationCount: "",
            memberGender: "",
            memberBirthday: "",
            tmpmemberBirthday: "",

            editing: false,
        }
    },
    mounted() {
        const memberStore = useMemberStore();
        this.memberId = memberStore.memberId

        axios.get(`${this.API_URL}/getUserDetail`).then(re => {
            console.log(re.data);
            const tmp = re.data;
            this.memberName = tmp.lastName;
            this.memberEmail = tmp.userEmail;
            this.memberImgPath = tmp.userImgPath;
            this.memberViolationCount = tmp.userViolationCount;
            this.memberGender = tmp.userGender
            this.memberBirthday = tmp.birthDate

        })
    },
    methods: {
        toggleEdit() {
            this.editing = !this.editing;
            this.tmpmemberBirthday = this.memberBirthday.substring(0, 10);

        },
        saveChanges() {
            this.editing = false;
            axios.post(`${this.API_URL}/account/update`, {
                userId: this.memberId,
                userEmail: this.memberEmail,
                lastName: this.memberName,
                userGender: this.memberGender,
                birthDate: this.memberBirthday
            }, {
                Headers: {
                    'Content-Type': 'application/json'
                }
            }).then(response => {
                if (response.status === 200) {
                    console.log('regiest success');
                    this.tmpmemberBirthday = this.memberBirthday;
                    // this.$router.push("/")
                } else {
                    console.error('regiest failed');
                }
            })
        },
        refreshPage() {
            this.$router.go(0)
        }
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