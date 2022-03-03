<template>
<div class="divstyle" id="">
  <form>
    
    <div class="form-group">
      <label for="exampleInputName">用户名</label>
      <input
        type="username"
        class="form-control"
        id="exampleInputPhone"
        v-model="username"
      />
    </div>
    <div class="form-group">
      <label for="exampleInputEmail1">电子邮箱</label>
      <input
        type="email"
        class="form-control"
        id="exampleInputEmail1"
        aria-describedby="emailHelp"
        v-model="email"
      />
      <small id="emailHelp" class="form-text text-muted"
        >我们永远不会与其他人分享您的电子邮件。</small
      >
    </div>
    <div class="form-group">
      <label for="exampleInputPassword1">密码</label>
      <input
        type="password"
        class="form-control"
        id="exampleInputPassword1"
        v-model="password"
      />
    </div>
    <button type="submit" class="btn btn-primary" @click="register">注册</button>
  </form>
  </div>
</template>

<script>

export default {
  name: 'register',

  data(){
    return{
      username:'',
      email:'',
      password:''

    }
  },
  methods:{
    register () {
      const axios = require('axios');
      const data = { 
            email: this.email,
            username: this.username,
            password: this.password
            }

      //自定义默认值
      const instance = axios.create({
        baseURL: 'http://localhost:5000',
        timeout: 1000,
        headers: {
          "Content-Type": "application/json",
          "Access-Control-Allow-Origin": "*",
        }
      })
      // const options ={
      //   method: 'POST',
      //   headers: {
      //     "Content-Type": "application/json",
      //     "Access-Control-Allow-Origin": "*",
      //     "Access-Control-Allow-Headers":"Origin, X-Requested-With, Content-Type, Accept, X-ID, X-TOKEN, X-ANY-YOUR-CUSTOM-HEADER",
      //     "Access-Control-Allow-Methods": "POST, PUT, GET, OPTIONS, DELETE"
      //     },
      //   data: data,
      //   url:'http://localhost:5000/auth/register'
      // }
      instance.post("/auth/register", data) 
          .then(function (res) {
              console.log(res)
              msg.value = res.data.msg
          })
          .catch(function (error) {
              console.log(error);
          })
          .then(function () {

          });
    }
  },
}

</script>
<style scoped>
.divstyle{
  
  display: flex;
  justify-content: center;
  align-content: center;

}
</style>
