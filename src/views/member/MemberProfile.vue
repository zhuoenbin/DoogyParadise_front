<template>
  <div class="main-container">
    <!-- sideBar -->
    <div class="sidebar">
      <div class="sidebar-header">
        <h2>會員頁</h2>
      </div>
      <div class="sidebar-buttons">
        <router-link to="/profile/detail">
          <button class="sidebar-button custom-router-link">個人資訊</button>
        </router-link>

        <router-link to="/profile/orderdetails">
          <button class="sidebar-button custom-router-link">我的訂單</button>
        </router-link>

        <router-link to="/profile/mydog">
          <button class="sidebar-button custom-router-link">我的狗勾</button>
        </router-link>
      </div>
    </div>

    <router-view></router-view>
  </div>
</template>
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

<!-- <script>
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
</script> -->
