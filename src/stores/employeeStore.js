import { defineStore } from "pinia";

export const useemployeeStore = defineStore("employeeStore", {
  state() {
    return {
      employeeId: "",
      employeeName: "",
      employeeRole: "",
      employeePhoto: "",
      isLoggedIn: false,
    };
  },

  actions: {
    loginSuccess(employee) {
      this.employeeId = employee.userId;
      this.employeeName = employee.username;
      this.employeeRole = employee.role;
      this.employeePhoto = employee.photoUrl;
      this.isLoggedIn = true;
    },
    logout() {
      this.employeeId = "";
      this.employeeName = "";
      this.employeeRole = "";
      this.employeePhoto = "";
      this.isLoggedIn = false;
    },
  },

  getters: {},
});
