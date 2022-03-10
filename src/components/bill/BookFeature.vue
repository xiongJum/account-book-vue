<template>

<!-- <table class="table table-hover">
  <thead >
    <tr>
        <th class="bg-primary" scope="col" v-for="thead in theads" :key="thead.id">{{ thead }}</th>
    </tr>
  </thead>
  <tbody>
    <tr v-for="tbody in list.data" :key="tbody.id">
      <td>{{ tbody.happen_time }}</td>
      <td>{{ tbody.account }}</td>
      <td>{{ tbody.title }}</td>
      <td>{{ tbody.amount }}</td>
      <td>{{ tbody.category }}</td>
      <td>{{ tbody.label }}</td>
      <td>{{ tbody.remark }}</td>
    </tr>
  </tbody>
</table> -->
<div>
  hed
</div>
</template>

<script>
// import { reactive, toRefs} from 'vue';
// import { router } from '@/router';


// export default {
//   name: "Book",
//   setup() {
//     const tbodys = reactive({
//       list: []
//     })
//     const axios = require("axios")
//     axios.get('http://localhost:5000/item/id')
//       .then(function (response) {
//         // console.log(response)
//         tbodys.list = response.data
//       });

//     return { 
//         // theads: [ "发生日期", "标题", "账户", "金额", "分类", "标签", "备注", "操作"],
//         // ...toRefs()将state里面得对象解构
//         ...toRefs(tbodys),
//     }
//   }

// }

</script>