<template>
  <div class="main">
    <form @submit.prevent="keeping">
      <div class="mb-3">
        <label for="exampleInputPassword1" class="form-label">账本</label>
        <select class="form-select" v-model="param.ledger" required="required">
          <option v-for="(value, key) in ledger" :key="value" :value="key">
            {{ value }}
          </option>
        </select>
      </div>
      <div class="mb-3">
        <label for="exampleInputEmail1" class="form-label">发生日期</label>
        <input
          type="date"
          class="form-control"
          v-model="param.happen_time"
          aria-describedby="emailHelp"
          required="required"
        />
      </div>
      <div class="mb-3">
        <label for="exampleInputPassword1" class="form-label">标题</label>
        <input
          type="text"
          class="form-control"
          v-model="param.title"
          required="required"
        />
      </div>
      <div class="mb-3">
        <label for="exampleInputPassword1" class="form-label">账户</label>
        <select class="form-select" v-model="param.account" required="required">
          <option v-for="(value, key) in account" :key="value" :value="key">
            {{ value }}
          </option>
        </select>
      </div>
      <div class="mb-3">
        <label for="exampleInputPassword1" class="form-label">金额</label>
        <input
          type="number"
          class="form-control"
          v-model="param.amount"
          required="required"
        />
      </div>
      <div class="mb-3">
        <label for="exampleInputPassword1" class="form-label">分类</label>
        <select
          class="form-select"
          required="required"
          v-model="param.category"
        >
          <option v-for="(value, key) in category" :key="value" :value="key">
            {{ value }}
          </option>
        </select>
      </div>
      <div class="mb-3">
        <label
          for="exampleInputPassword1"
          class="form-label"
          style="margin-right: 10px"
          >标签:</label
        >
        <span
          :id="index"
          class="float-none"
          style="margin-right: 3px"
          :class="snap.colour[index]"
          v-for="(label, index) in param.label"
          :key="label"
          >{{ label }}
          <a @click="del_lable(index)" :class="snap.colour[index]">x</a></span
        >
        <input
          type="tag"
          class="float-none form-left"
          size="5"
          @keyup.space="get_label"
          v-model="snap.label"
        />
      </div>
      <div class="mb-3">
        <label for="exampleInputPassword1" class="form-label">备注</label>
        <input type="text" class="form-control" v-model="param.remark" />
      </div>
      <input type="submit" value="提交" class="btn btn-primary" />
    </form>
  </div>
</template>

<script>
import { reactive, toRefs } from "vue";

export default {
  setup() {
    /**
     * 获取当前日期， 格式为 YYYY-mm-dd
     */
    function new_date() {
      // 获取当前时间
      let nd = new Date();

      // 获取当前月份和日
      let M = nd.getMonth();
      let D = nd.getDate();
      // 由于月份为 0~11 ，所以需要+1，如果小于8或9 则在前方加0
      M = M > 8 ? M + 1 : "0" + (M + 1);
      D = D > 9 ? D : "0" + D;

      return `${nd.getFullYear()}-${M}-${D}`;
    }

    // 获取当前时间，但是时间为
    // const new_date = new Date().toLocaleDateString().replace(/\//g,'-')

    const select = reactive({
      account: {}, // 账户
      category: {}, // 分类
      ledger: {}, //账本
      param: {
        // 请求参数
        happen_time: new_date(),
        label: [],
      },
      snap: {
        colour: [],
      }, //临时属性
    });

    const axios = require("axios");

    /**
     * 请求配置接口， 映射配置项
     */
    axios.get("http://localhost:5000/config").then(function (response) {
      let configs = response.data.data;
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
    function keeping() {
      axios
        .post("http://localhost:5000/accountbook", select.param)
        .then(function (response) {
          location.reload(); // 刷新页面
          alert("记账成功"); // 弹窗提示，后续优化
        });
    }

    // 显示标签，获取标签的请求参数
    function get_label() {
      let colour = [
        "primary",
        "secondary",
        "success",
        "danger",
        "warning",
        "info",
        "dark",
      ];
      let color_style =
        "badge rounded-pill bg-" +
        colour[Math.floor(Math.random() * colour.length)];

      let label = select.snap.label.replace(/(\s*$)/g, "");

      if (select.snap.label !== " ") {
        if (select.param.label.indexOf(label)) {
          // 样式和值的数量是一致的
          select.snap.colour.push(color_style); // 储存样式的历史记录
          select.param.label.push(label);
        } else {
          alert("已有相同的标签");
        }
      }
      select.snap.label = "";
    }

    function del_lable(index) {

      var my_box = document.getElementById(`${index}`)
      // child_box[0].remove()
      
      if (my_box) {
        my_box.remove();
        // my_box.style.display = 'none'
        select.snap.colour.splice(index, index)
        select.param.ledger.splice(index, index)
        // delete select.snap.colour[index];
        // delete select.param.label[index];
      }
    }

    // 返回
    return {
      ...toRefs(select),
      keeping,
      get_label,
      del_lable,
    };
  },
};
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
input[type="tag"] {
  border: 0;
  outline: 0;
  background: transparent;
  border-bottom: 2px solid black;
  width: 10%;
}
</style>