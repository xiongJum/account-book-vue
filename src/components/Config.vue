<template>
  <table class="table table-hover">
    <thead>
      <tr><th scope="col" v-for="thead in theads" :key="thead.id">{{ thead }}</th></tr>
    </thead>
    <tbody>
      <tr v-for="tbody in list.data" :key="tbody.id">
        <td>{{ tbody.heading }}</td>
        <td>{{ tbody.conf_type }}</td>
        <td>{{ tbody.del_flag }}</td>
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
    const theads = ["配置名称", "配置类型", "状态", "操作"]
    const table = reactive({
      list: [], // 表格内容
    });
    const axios = require("axios");
    axios.get("http://localhost:5000/configs").then(function (response) {
      // console.log(response)
      table.list = response.data;
      for (let i in table.list.data) {
        switch (table.list.data[i].conf_type) {
          case 0:
            table.list.data[i].conf_type = '账本';
            // console.log(0)
          case 1:
            table.list.data[i].conf_type = '账户';
          case 2:
            table.list.data[i].conf_type = '分类';
        };
        
        if (table.list.data[i].del_flag === true) {
          table.list.data[i].del_flag = '正常';
        } else {
          table.list.data[i].del_flag = '冻结';
        };
      };

    });

    function delBill(event, id) {
      axios.delete("http://localhost:5000/config/" + id)
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