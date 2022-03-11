<template>
<div class="main">
<form >
  <div class="mb-3">
    <label for="exampleInputPassword1" class="form-label">账本</label>
    <select class="form-select" v-model="param.ledger">
      <option v-for="(value, key) in ledger" :key="value" :value="key">{{ value }}</option>
    </select>  
  </div>
  <div class="mb-3">
    <label for="exampleInputEmail1" class="form-label">发生日期</label>
    <input type="date" class="form-control" v-model="param.happen_time" aria-describedby="emailHelp">
  </div>
  <div class="mb-3">
    <label for="exampleInputPassword1" class="form-label">标题</label>
    <input type="text" class="form-control" v-model="param.title">
  </div>
  <div class="mb-3">
    <label for="exampleInputPassword1" class="form-label">账户</label>
    <select class="form-select" v-model="param.account">
      <option v-for="(value, key) in account" :key="value" :value="key">{{ value }}</option>
    </select>  
  </div>
  <div class="mb-3">
    <label for="exampleInputPassword1" class="form-label">金额</label>
    <input type="number" class="form-control" v-model="param.amount">
  </div>
  <div class="mb-3">
    <label for="exampleInputPassword1" class="form-label">分类</label>
    <select class="form-select" v-model="param.category">
      <option v-for="(value, key) in category" :key="value" :value="key">{{ value }}</option>
    </select> 
  </div>
  <div class="mb-3">
    <label for="exampleInputPassword1" class="form-label">标签</label>
    <input type="text" class="form-control" v-model="param.label">
  </div>
  <div class="mb-3">
    <label for="exampleInputPassword1" class="form-label">备注</label>
    <input type="text" class="form-control" v-model="param.remark">
  </div>
</form>
</div>
<button type="submit" class="btn btn-primary" @click="keeping">记账</button>
</template>

<script>

import { reactive, toRefs } from "vue";

export default {
  setup() {
    const select = reactive({
      account: {}, // 账户
      category: {}, // 分类
      ledger: {}, //账本
      param: {
        happen_time: Date,
      }
      });

    const axios = require("axios");

    /**
     * 请求配置接口， 映射配置项
     */
    axios.get("http://localhost:5000/configs").then(function (response) {
        let configs = response.data.data
        for (let i in configs) {
          let id = configs[i].id; 
          let heading = configs[i].heading; 

          // 当del_flag 为 false 时， 不显示在选择框中
          if (!configs[i].del_flag) {

            switch (configs[i].conf_type) {
              case 0:
                select.ledger[id] = heading;
                break;
              case 1:
                select.account[id] = heading;
                break;
              case 2:
                select.category[id] = heading;
                break;
              default:
                console.log("请检查服务端是否配置了新类型");
                break;
            }

          }
        }
      });

    // 提交记账
    function keeping (){
      axios.post("http://localhost:5000/items", select.param).then( function (response) {
        location.reload(); // 刷新页面
        alert("记账成功") // 弹窗提示，后续优化
      })
    }

    // 返回
    return {
      ...toRefs(select),
      keeping
    }

  },
}
</script>


<style>
.main {
  font-family: Avenir, Helvetica, Arial, sans-serif;
  text-align: left;
  color: #2c3e50;
  width: 45%;
  margin-top: 60px;
  margin-left: 10%;
}
</style>