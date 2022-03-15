<template>
  <table class="table table-hover">
    <thead>
      <tr>
        <th style="width:4%">
          <button 
            type="button" 
            class="btn btn-primary" 
            data-bs-toggle="modal" 
            data-bs-target="#exampleModal" 
            @click="new_or_edit_flag=false, fillup(flag=new_or_edit_flag)"
            >新增</button></th>
        <th scope="col" v-for="thead in theads" :key="thead.id">{{ thead }}</th>
        </tr>
    </thead>
    <tbody>
      <tr v-for="tbody in list.data" :key="tbody.id">
        <td></td>
        <td>{{ tbody.heading }}</td>
        <td>{{ map_field.conf_type[tbody.conf_type] }}</td>
        <td>{{ map_field.del_flag[tbody.del_flag] }}</td>
        <td>
          <button
            type="button"
            class="btn btn-link"
            @click="operate_config($event, tbody.id, true)"
          >
            删除
          </button>
          <button
            type="button"
            class="btn btn-link"
            data-bs-toggle="modal" 
            data-bs-target="#exampleModal"
            @click="new_or_edit_flag=tbody.id, fillup(tbody, new_or_edit_flag)"
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
              <option v-for="(value, key) in map_field.conf_type" :key="value" :value="key">{{value}}</option>
            </select>  
          </dd>

          <dt class="col-sm-3">状态</dt>
          <dd class="col-sm-9">
            <div class="form-check form-switch">
              <input 
                class="form-check-input" type="checkbox" role="switch" id="flexSwitchCheckDefault" 
                v-model="payload.del_flag"  :checked="payload.del_flag">
              <label class="form-check-label" for="flexSwitchCheckDefault">开启代表冻结此配置项</label>
            </div>
          </dd>

        </dl>
      </div>
      <div class="modal-footer">
        <button type="button" class="btn btn-secondary" data-bs-dismiss="modal">关闭</button>
        <button type="button" class="btn btn-primary" data-bs-dismiss="modal" @click="operate_config(event, is_edit)">保存</button>
      </div>
    </div>
  </div>
</div>
</template>

<script>
import { reactive, toRefs } from "vue";
import { computed } from '@vue/reactivity';

export default {
  setup() {

    const axios = require("axios");
    /**
     * 配置表的表格内容填充
     * @returns list 接收接口配置列表返回的内容
     * @returns map_field 映射字段， 将标识翻译为中文
     * @returns payload 新增或者编辑时的请求参数
     */
    const table = reactive({
      theads: ["配置名称", "配置类型", "状态", "操作"],
      list: [], // 表格内容
      map_field: { // 映射字段，配置类型和当前状态
        conf_type: {
          0: "账本",
          1: "账户",
          2: "分类"
        },
        del_flag: {
          true: "冻结",
          false: "使用",
        },
      },
      payload: {}, 
    });

    /**
     * 配置标识
     * @returns new_or_edit_flag 新增或者编辑标识， false 时为新增， 默认为 false
     */
    const config_flag = reactive({
      new_or_edit_flag : false
    })

    /**
     * 获取数据
     */
    axios.get("http://localhost:5000/config").then(function (response) {
      // console.log(response)
      table.list = response.data;
    });


    // function delBill(event, id) {
    //   axios.delete("http://localhost:5000/config/" + id)
    //     .then(function (response) {
    //       // console.log(response);
    //     })
    //     .catch(function (error) {
    //       console.log(error);
    //     });
    // }

    /**
     * 操作配置项的方法
     * @param id 如果不为 false 则删除或编辑配置； 为 true 时新增配置
     * @param del_flag 为 true 时删除或冻结配置， 为 false 时编辑配置
     * @return None
     */
    function operate_config(event, id=false, del_flag) {
      
      if (id) { // 编辑配置项

        if (del_flag) {
          axios.delete("http://localhost:5000/config?id=" + id).then ( function (response) {
            location.reload();
          })
          .catch ( function (error) {
            alert(error.response.data.msg);
          })
        }else {
          axios.put('http://localhost:5000/config', table.payload).then( function (response) {
            location.reload(); // 刷新页面
          })
        }
      } else {
        axios.post("http://localhost:5000/config", table.payload).then( function (response) {
          location.reload(); // 刷新页面
        })
      }
    }

    /**
     * 编辑时初始化配置
     * @param newPayload 已存在的参数内容
     * @param flag 判断新增或者编辑
     */
    function fillup(newPayload, flag) {
      if (flag) {
        table.payload.del_flag = newPayload.del_flag;
        table.payload.heading = newPayload.heading;
        table.payload.conf_type = newPayload.conf_type;
      } else {
        table.payload.del_flag = false;
        table.payload.heading = '';
        table.payload.conf_type = 0;
      }
    }

    return {
      // ...toRefs()将state里面得对象解构
      ...toRefs(table),
      ...toRefs(config_flag),
      operate_config,
      fillup,
    };
  },
};
</script>