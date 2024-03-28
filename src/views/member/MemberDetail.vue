<template>

    <div class="main-container">

        <main class="container mt-5">
            <div class="row featurette">
                <div class="col-md-3">
                    <img :src="memberImgPath" class="w-100" />
                    <div v-if="editing" class="input-group mb-3">
                        <input type="file" class="form-control" id="mainImgUpload" ref="mainImgUpload" accept="image/*"
                            placeholder="自定義文字" />
                    </div>
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
                            <input v-model="memberBirthday" type="date" />
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
            editing: false,
        }
    },
    mounted() {
        const memberStore = useMemberStore();
        this.memberId = memberStore.memberId

        if (memberStore.memberRole == "ROLE_M1") {
            console.log("emp")
            this.$router.push("/");
        }
        if (this.memberId == "") {
            this.$router.push("/login");
        }

        axios.get(`${this.API_URL}/getUserDetail`).then(re => {
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
                    console.log('change success');
                } else {
                    console.error('change failed');
                }
            })
            this.mainImgUpload();

        },
        refreshPage() {
            this.editing = !this.editing;
        },
        mainImgUpload() {
            if (this.memberId != null) {
                if (this.$refs.mainImgUpload.files.length > 0) {
                    const fd = new FormData();
                    fd.append("userId", this.memberId);
                    fd.append("mainImg", this.$refs.mainImgUpload.files[0]);
                    axios
                        .post(`${this.API_URL}/account/addMainImg`, fd)
                        .then((response) => {
                            const memberStore = useMemberStore();
                            memberStore.memberPhoto = response.data;
                            this.memberImgPath = response.data;
                            this.getUserDetail();
                        })
                        .catch((error) => {
                            console.error("主題圖片新增失敗", error);
                        });
                } else {
                    console.log("沒有選擇任何圖片");
                }
            }
        },
        getUserDetail() {
            axios.get(`${this.API_URL}/getUserPassport`).then(re => {
                sessionStorage.setItem("loggedInMenber", JSON.stringify(re.data));
            })
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