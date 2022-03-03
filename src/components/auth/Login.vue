<template>

<div class="alert alert-primary" role="alert" :style="{display: emotionShowStatus || 'none'}">
  {{ message.password }}
</div>

<form>
  <div class="form-group">
    <label for="exampleInputEmail1">用户名</label>
    <input type="email" class="form-control" id="exampleInputEmail1" aria-describedby="emailHelp" v-model="username"/>
  </div>
  <div class="form-group">
    <label for="exampleInputPassword1">密码</label>
    <input type="password" class="form-control" id="exampleInputPassword1" v-model="password" autocomplete="off"/>
  </div>
  <div class="form-group form-check">
    <input type="checkbox" class="form-check-input" id="exampleCheck1" v-model="re"/>
    <label class="form-check-label" for="exampleCheck1">记住我</label>
  </div>
</form>

<button type="submit" class="btn btn-primary" @click="login">登录</button>

</template>


<script>
import axios from "axios";
import { router } from '@/router';

export default {
  data() {
    return { username: "", remember_me: "", password: "", message: "",};
  },
  methods: {
    resLogin(payload) {
      const path = "http://localhost:5000/auth/login";
      axios.defaults.headers.common["Content-Type"] =
        "application/x-www-form-urlencoded";
      const _this = this;
  
      axios.post(path, payload)
        .catch(function (error) {
          if (error.response) {
            // console.log(error.response.data);
            // console.log(error.response.status);
            // console.log(error.response.headers);
            _this.emotionShowStatus = "block";
            _this.message = error.response.data.message;
          } else if (error.request) {
            console.log(error.request);
          } else {
            console.log("Error", error.message);
          }
        })
        .then(function (response) {
          console.log(response)
          if (response.data.msg === "success"){
            router.push({ name: "Items", query: { redirect: location.hostname } })
          }
        });
      // let hostName = this.$route.query.redirect; // 获取域名
      
      if (this.$route.query.redirect === this.$url()) { // 判断域名是否相同
        this.$route.go(-1); // 登录成功后，返回上次进入的页面
      } else {
        window.open(this.$url() + '/', '_self'); // 若不是网站内部跳转过来，登录成功后跳转至网站首页
      }

    },

    initForm() {
      this.username = "";
      this.password = "";
      this.re = false;
      this.message = "";
    },

    login() {
      const data = {
        username: this.username,
        remember_me: this.re,
        password: this.password,
      };

      this.resLogin(data);
      this.initForm();
    },
  },
};
</script>


