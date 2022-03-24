<template>
  <div class="card" style="width: 150%; position: relative">
    <div class="card-body" id="assets" :style="{ width: '100%', height: '400px' }"></div>
  </div>
</template>

<script>

import { onMounted, reactive, toRefs } from '@vue/runtime-core';
import { MyEcharts } from "../../js/MyEcharts";
import axios from "axios";

export default {
  name: "assets",
  setup() {

    onMounted(() => { // 挂载函数，当实例挂载完成后被调用
      run ()
    })

    const show_field = reactive({
      option: {
        title: { text: "账户余额" },

        // 配置柱图
        series: [
          {
            data: [
                {
                    value: 335,
                    name: "支付宝"
                },

                {
                    value: 400,
                    name: "微信支付"
                },

                {
                    value: 40,
                    name: "花呗"
                },
                {
                    value: 300,
                    name: "信用卡"
                },
                {
                    value: 300,
                    name: "信用卡1"
                },
                {
                    value: 1000,
                    name: "信用卡2"
                },
                {
                    value: 300,
                    name: "信用卡3"
                },
            ],
            type: "pie",
            // roseType: 'radius',
            label: {
              show: true,
              formatter: '{b}-{c}'
            }
          },
        ],
      },
      tmp: {}
    });

    // const response_field = reactive({
    //   tmp: {}
    // })

    var Assets = new MyEcharts(show_field.option, 'assets')
    
    function run () {
        Assets.initChart()
    }



    axios.get('http://localhost:5000/config')
      .then(function (response) {
        for (let i=0; i<response.data.data.length; i++) {
          let data = response.data.data[i]

          if (data['conf_type'] === 1) {

            show_field.tmp['name'] = data['heading']
            show_field.tmp['value'] = Number(data['amount'])
            show_field.option.series[0].data[i] = show_field.tmp
            show_field.tmp = {}

            Assets.initChart()
          }
        }
      })
    
  
  return {
      ...toRefs(show_field),
      // ...toRefs(response_field),
      run
  }
  
  },
};
</script>
