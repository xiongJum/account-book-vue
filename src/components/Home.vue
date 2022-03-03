<template>

<div>
  <p>Home page</p>
  <p>Random number from backend: {{ accountItems }}</p>
  <button @click="accounts">New random number</button>
</div>
</template>

<script>
import axios from 'axios'

export default {
  data () {
    return {
      accountItems: ''
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
    }
//     getRandomInt (min, max) {
//       max = Math.floor(max)
//       return Math.floor(Math.random() * (max - min + 1)) + min
//     },
//     getRandom () {
//     this.randomNumber = this.getRandomInt(1, 100)
//     }
//   },
//   created () {
//     this.getRandom()
  }
}
</script>