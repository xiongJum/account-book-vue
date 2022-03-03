<template>
<div>
    你好
</div>
<table class="table">
  <thead>
    <tr id="thead" v-for="thead in theads" :key="thead">
        <th scope="col">
            {{ thead }}
        </th>
    </tr>
  </thead>
  <tbody>
    <tr>
      <th scope="row">1</th>
      <td>Mark</td>
      <td>Otto</td>
      <td>@mdo</td>
    </tr>
    <tr>
      <th scope="row">2</th>
      <td>Jacob</td>
      <td>Thornton</td>
      <td>@fat</td>
    </tr>
    <tr>
      <th scope="row">3</th>
      <td>Larry</td>
      <td>the Bird</td>
      <td>@twitter</td>
    </tr>
  </tbody>
</table>
</template>

<script>
import axios from 'axios'
import { createApp } from 'vue';


export default {
  data () {
    return {
        accountItems: '',
        heads:[
            {text: "标题"},
            {text: "金额"},
            {text: "账本"}]
    }
  },
  methods: {
    accounts () {
        this.accountItems = this.getAccountItems()
    },
    getAccountItems () {
        const path = 'http://localhost:5000/items';
        axios.get(path)
        .then(res => {
            this.accountItems = res.data.date
            console.log(this.accountItems)
        })
        .catch(error => {
            console.log(error)
        })
    },
    // created () {
    //     this.getList()
    // },
    // getList () {
    //     a().then(function (res) {
    //         this.list = res
    //     })
    // }
  }
}
</script>