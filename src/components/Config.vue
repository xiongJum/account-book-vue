<template>
  <table class="table table-hover">
    <thead>
      <tr>
        <th style="width:4%"><button type="button" class="btn btn-primary" data-bs-toggle="modal" data-bs-target="#exampleModal" v-on:click="is_edit=false">新增</button></th>
        <th scope="col" v-for="thead in theads" :key="thead.id">{{ thead }}</th>
        </tr>
    </thead>
    <tbody>
      <tr v-for="tbody in list.data" :key="tbody.id">
        <td></td>
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
          <button
            type="button"
            class="btn btn-link"
            data-bs-toggle="modal" 
            data-bs-target="#exampleModal"
            v-on:click="is_edit=tbody.id"
          >
            编辑
          </button>
        </td>
      </tr>
    </tbody>
  </table>

<!-- 新增配置项 -->
<div class="modal fade" id="exampleModal" tabindex="-1" aria-labelledby="exampleModalLabel" aria-hidden="true">
  <div class="modal-dialog">
    <div class="modal-content">
      <div class="modal-header">
        <h5 class="modal-title" id="exampleModalLabel">添加配置项</h5>
        <button type="button" class="btn-close" data-bs-dismiss="modal" aria-label="Close"></button>
      </div>
      <div class="modal-body mb-3">
        <dl class="row">
          <dt class="col-sm-3">配置名称</dt>
          <dd class="col-sm-9">
            <input type="text" class="form-control" id="recipient-name" v-model="payload.heading">
          </dd>

          <dt class="col-sm-3">配置类型</dt>
          <dd class="col-sm-9">
            <select class="form-select form-select-sm" aria-label=".form-select-sm example" v-model="payload.conf_type">
              <option value="0">账本</option>
              <option value="1">账户</option>
              <option value="2">分类</option>
            </select>  
          </dd>

          <dt class="col-sm-3">状态</dt>
          <dd class="col-sm-9">
            <div class="form-check form-switch">
              <input class="form-check-input" type="checkbox" role="switch" id="flexSwitchCheckDefault" v-model="payload.del_flag">
              <label class="form-check-label" for="flexSwitchCheckDefault">开启代表冻结此配置项</label>
            </div>
          </dd>

        </dl>
      </div>
      <div class="modal-footer">
        <button type="button" class="btn btn-secondary" data-bs-dismiss="modal">关闭</button>
        <button type="button" class="btn btn-primary" data-bs-dismiss="modal" @click="edit_config(event, is_edit)">保存</button>
      </div>
    </div>
  </div>
</div>
</template>

<script>
import { reactive, toRefs } from "vue";

export default {
  setup() {

    // 响应字段
    const theads = ["配置名称", "配置类型", "状态", "操作"]
    const table = reactive({
      list: [], // 表格内容
      payload: { // 添加配置项的请求字段
        del_flag: false 
      }, 
      is_edit: false // 编辑或者新增配置
    });
    const axios = require("axios");

    /**
     * 字段映射
     */
    axios.get("http://localhost:5000/configs").then(function (response) {
      // console.log(response)
      table.list = response.data;
      for (let i in table.list.data) {
        switch (table.list.data[i].conf_type) {
          case 0:
            table.list.data[i].conf_type = '账本';
            break;
            // console.log(0)
          case 1:
            table.list.data[i].conf_type = '账户';
            break;
          case 2:
            table.list.data[i].conf_type = '分类';
            break;
        };
        
        if (table.list.data[i].del_flag) {
          table.list.data[i].del_flag = '冻结';
        } else {
          table.list.data[i].del_flag = '使用';
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

    /**
     * 编辑或者新增配置项
     */
    function edit_config(event, id=false) {
      
      if (id) { // 编辑配置项
        axios.put('http://127.0.0.1:5000/config/' + id, table.payload).then( function (response) {
          location.reload(); // 刷新页面
        })
      } else { // 新增配置项
        axios.post("http://127.0.0.1:5000/configs", table.payload).then( function (response) {
          location.reload(); // 刷新页面
        })
      }
    }

    return {
      theads,
      // ...toRefs()将state里面得对象解构
      ...toRefs(table),
      delBill,
      edit_config,
    };
  },
};
</script>