<template>
  <div class="container">
    <button type="button" class="btn btn-primary">{{ msg }}</button>
  </div>
</template>

<script>
import { ref } from '@vue/reactivity';

export default {
  name: 'Ping',
  setup(){
    const msg = ref()
    const axios = require('axios');
    axios.get('http://localhost:5000/items')
        .then(function (res) {
            console.log(res)
            msg.value = res.data.msg
        })
        .catch(function (error) {
            console.log(error);
        })
        .then(function () {

        });
    return {
        msg
    };
  },
};

</script>