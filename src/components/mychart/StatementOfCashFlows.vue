<template>
  <div class="card" style="width: 150%; position: relative">
    <div class="card-body" id="现金流量表" :style="{ width: '100%', height: '400px' }"></div>
  </div>
</template>

<script>
// 现金流量表

import { onMounted, reactive, toRefs } from '@vue/runtime-core';
import { MyEcharts } from "../../js/MyEcharts";
import axios from "axios";

export default {
  name: "现金流量表",
  setup() {

    onMounted(() => { // 挂载函数，当实例挂载完成后被调用
      run ()
    })

    const show_field = reactive({
        option: {
            xAxis: {
                data: ['A', 'B', 'C', 'D', 'E']
            },
            yAxis: {},
            series: [
                {
                data: [10, 22, 28, 23, 19],
                type: 'line',
                areaStyle: {},
                smooth: true
                },
                {
                data: [25, 14, 23, 35, 10],
                type: 'line',
                areaStyle: {
                    color: '#89B0AE',
                    opacity: 1
                },
                smooth: true
                }
            ]
            },
        tmp: {}
    });

    // const response_field = reactive({
    //   tmp: {}
    // })

    var Assets = new MyEcharts(show_field.option, '现金流量表')

    function run () {
        Assets.initChart()
    }



    // axios.get('http://localhost:5000/config')
    //   .then(function (response) {
    //     for (let i=0; i<response.data.data.length; i++) {
    //       let data = response.data.data[i]

    //       if (data['conf_type'] === 1) {

    //         show_field.tmp['name'] = data['heading']
    //         show_field.tmp['value'] = Number(data['amount'])
    //         show_field.option.series[0].data[i] = show_field.tmp
    //         show_field.tmp = {}

    //         Assets.initChart()
    //       }
    //     }
    //   })


  return {
    //   ...toRefs(show_field),
      // ...toRefs(response_field),
      run
  }

  },
};
</script>
