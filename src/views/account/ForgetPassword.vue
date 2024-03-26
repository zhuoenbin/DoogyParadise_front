<template>
    <div>
        <h3>忘記密碼頁</h3>
        <div v-if="!emailSent && !resetPassword">
            <div>請輸入Email，送出後將寄驗證碼郵件至該信箱</div>
            <input type="email" v-model="email" placeholder="請輸入郵箱" required>
            <button @click="sendEmail">送出</button>
        </div>
        <div v-else-if="emailSent && !resetPassword">
            <div>已發送驗證碼至Email</div>
            <input type="text" v-model="verificationCode" placeholder="請輸入驗證碼" required>
            <div v-if="verificationCodeMismatch" style="color: red;">驗證碼錯誤</div>
            <button @click="verifyCode">驗證</button>
        </div>
        <div v-else-if="resetPassword && !backFormLog">
            <input type="password" v-model="newPassword" placeholder="請輸入新密碼" required>
            <input type="password" v-model="confirmPassword" placeholder="請再次輸入新密碼" required>
            <div v-if="showPassWordMismatch" style="color: red;">密碼不一致</div>
            <button @click="goResetPassword" :disabled="passwordHasValAndSame">重設密碼</button>
        </div>
        <div v-else-if="backFormLog">
            <h4>兩秒後返回登入頁</h4>
        </div>
    </div>
</template>

<script>
import axios from 'axios';
import { useRouter } from 'vue-router'

export default {
    data() {
        return {
            email: '',
            verificationCode: '',
            newPassword: '',
            confirmPassword: '',
            emailSent: false,
            verificationCodeMismatch: false,
            resetPassword: false,
            showPassWordMismatch: false,
            backFormLog: false,
            router: useRouter()

        };
    },
    methods: {
        sendEmail() {
            //發送驗證碼
            axios.get(`${this.API_URL}/forgetPassword/sendCode/${this.email}`)
                .then(response => {
                    if (response.status == 200) {
                        console.log('email send success');
                        this.emailSent = true;
                    } else {
                        console.error('email send failed');
                    }
                })
                .catch(
                    error => {
                        console.error('ERROR:', error);
                    });
        },
        verifyCode() {
            // 驗證碼驗證
            axios.post(`${this.API_URL}/forgetPassword/verifyCode`, {
                verifyCode: this.verificationCode,
                email: this.email
            }
            ).then(response => {
                if (response.status === 200) {
                    this.resetPassword = true;
                    console.log('verify Code pass');
                } else {
                    console.error('verify Code failed');
                }
            }).catch(error => {
                this.verificationCodeMismatch = true;
                console.error('ERROR:', error);
            });
        },
        goResetPassword() {
            //重設密碼
            axios.post(`${this.API_URL}/forgetPassword/resetPassword`, {
                verifyCode: this.verificationCode,
                email: this.email,
                newPassword: this.newPassword
            }).then(response => {
                if (response.status === 200) {
                    console.log('resetPassword success');
                    this.backFormLog = true;
                    setTimeout(() => {
                        this.router.push({ name: 'login' });
                    }, 2000);
                } else {
                    console.error('resetPassword failed');
                }
            }).catch(error => {
                console.error('ERROR:', error);
            });
        }
    },
    watch: {
        confirmPassword(newVal, oldVal) {
            this.showPassWordMismatch = this.newPassword != this.confirmPassword
        }
    },
    computed: {
        passwordHasValAndSame() {
            return !this.newPassword || !this.confirmPassword || this.newPassword !== this.confirmPassword;
        }
    }
};
</script>