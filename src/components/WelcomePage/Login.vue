<template>
  <div style="width: 23rem;">
    <div class="login p-4">
      <div style="overflow:hidden;display: flex;">
        <h1 class="login-title">Login</h1>
        <div class="title-skew"></div>
      </div>
      <div class="login-card-body p-0" @keypress.enter="checkUser">
        <p class="login-input-label p-0 mb-0 mt-1 float-left">Email</p>
        <b-form-input
          id="name-formatter"
          type="text"
          v-model="email"
          autocomplete="none"
          class="login-user-input"
        ></b-form-input>
        <p class="required-alert my-1">{{ errors.first("email") }}</p>
        <p class="login-input-label p-0 mb-0 mt-1 float-left">Password</p>
        <b-form-input
          id="password-formatter"
          type="password"
          v-model="password"
          autocomplete="new-password"
          class="login-user-input"
        ></b-form-input>
        <p class="required-alert my-1">{{ errors.first("password") }}</p>
        <div class="row mt-4">
          <mdb-btn
            type="submit"
            size="sm"
            class="m-auto login-button"
            @keypress="checkUser"
            @click="checkUser"
            color="info"
          >Login</mdb-btn>
          <mdb-btn
            type="button"
            size="sm"
            class="m-auto login-button"
            color="info"
            @click="clearForm"
          >cancel</mdb-btn>
        </div>
      </div>
    </div>
  </div>
</template>

<script>
import { mdbBtn } from "mdbvue";
import { UserDetails } from "../../service/userdetail.js";
import Alert from "../../widget/Alert.vue";

const userDetail = new UserDetails();
export default {
  components: {
    "mdb-btn": mdbBtn
  },
  data() {
    return {
      email: "",
      password: "",
      alertMessage: "",
      alertType: "",
      switch: true,
      alert: false
    };
  },
  methods: {
    checkUser() {
      let data = {
        email: this.email,
        password: this.password
      };
      console.log(data);
      if (this.email.length > 0 && this.password.length > 0) {
        this.$emit("checkUser",data)
      } else {
        this.alertMessage = {
          alertMsg: "Please enter your email and password",
          alertType: "alert"
        };
        this.$emit("alertMsg", this.alertMessage);
      }
    },
    clearForm() {
      (this.first_name = ""),
        (this.last_name = ""),
        (this.password = ""),
        (this.email = ""),
        (this.phone = "");
    }
  }
};
</script>

<style scoped>
.login {
  border: none !important;
  /* border: 1px solid black; */
  /* border-right: 1px solid black; */
  border-top-left-radius: 5%;
  border-bottom-right-radius: 5%;
  width: 22rem;
  background-color: #fff;
  transition: 0.5s;
}
.login:hover {
  box-shadow: 7px 6px 10px -1px rgba(0, 0, 0, 0.54);
}
.login div h1 {
  margin-top: 5px;
}
.title-skew {
  background-color: #17a2b8;
  transform: skew(30deg, 0deg);
  margin-left: 5%;
  height: 40px;
  width: 100%;
  padding-left: 15rem;
  /* margin-bottom: 1rem; */
  border-radius: 3%;
  /* border-bottom-right-radius: 100%; */
}
.login-title {
  font-weight: 700;
  margin-bottom: 1rem !important;
  color: #17a2b8;
}
.login-card-body {
  padding: 0;
  color: #17a2b8;
}
.login-input-label {
  font-weight: 400;
  font-size: 20px;
}
.login-user-input::placeholder {
  background-color: transparent;
}
.login-user-input {
  width: 100%;
  border: 0px !important;
  border-bottom: 1px solid #17a2b8 !important;
  padding-left: 0.5rem;
  border-radius: 0px;
  border-top-left-radius: 5px;
  border-top-right-radius: 5px;
}
.login-user-input:focus {
  box-shadow: none !important;
  outline: none !important;
}
.login-button {
  width: 8rem;
  font-size: 15px;
}
.required-alert {
  font-size: 15px;
  color: red;
}
@media screen and (max-width: 1200px) {
  .login-card-body {
    padding: 0;
    width: 14rem;
  }
  .login {
    width: 18rem;
  }
  .login-button {
    width: 5rem;
  }
}
</style>
