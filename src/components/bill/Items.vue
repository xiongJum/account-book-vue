<template>
  <table class="table table-hover">
    <thead>
      <tr><th scope="col" v-for="thead in theads" :key="thead.id">{{ thead }}</th></tr>
    </thead>
    <tbody>
      <tr v-for="tbody in list.data" :key="tbody.id">
        <td>{{ tbody.happen_time }}</td>
        <td>{{ tbody.serial_num }}</td>
        <td>{{ tbody.title }}</td>
        <td>{{ tbody.account }}</td>
        <td>{{ tbody.amount }}</td>
        <td>{{ tbody.category }}</td>
        <td>{{ tbody.label }}</td>
        <td>{{ tbody.remark }}</td>
        <td>
          <button
            type="button"
            class="btn btn-link"
            @click="delBill($event, tbody.id)"
          >
            删除
          </button>
        </td>
      </tr>
    </tbody>
  </table>
</template>

<script>
import { reactive, toRefs } from "vue";

export default {
  setup() {
    // 表头字段
    const theads = ["流水号","发生日期", "标题", "账户", "金额", "分类", "标签", "备注","操作"]
    const table = reactive({
      list: [], // 表格内容
    });

    // 获取账本数据
    const axios = require("axios");
    axios.get("http://localhost:5000/accountbook").then(function (response) {
      // console.log(response)
      table.list = response.data;

      /**
       * 字段映射
       */
      axios.get("http://localhost:5000/config").then(function (response) {
        var configs = response.data.data
      
        for (let i in configs) {
          for (let x in table.list.data) {
            
            if (configs[i].id == table.list.data[x].account)
              table.list.data[x].account = configs[i].heading;
            else if (configs[i].id == table.list.data[x].category)
              table.list.data[x].category = configs[i].heading;
          }
        }
      })
    });

    // 单条删除账单明细
    function delBill(event, id) {
      axios.delete("http://localhost:5000/account?id=" + id)
        .then(function (response) {
          // console.log(response);
        })
        .catch(function (error) {
          console.log(error);
        });
    }
    return {
      theads,
      // ...toRefs()将state里面得对象解构
      ...toRefs(table),
      delBill,
    };
  },
};
</script>