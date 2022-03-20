<template>

<div class="card" style="width: 30rem;">
  <div class="card-body" id="echart" :style="{ width: '30rem', height: '400px' }">
    <!-- <h5 class="card-title">Card title</h5>
    <h6 class="card-subtitle mb-2 text-muted">Card subtitle</h6>
    <p class="card-text">Some quick example text to build on the card title and make up the bulk of the card's content.</p>
    <a href="#" class="card-link">Card link</a>
    <a href="#" class="card-link">Another link</a> -->
  </div>
</div>

</template>


<script>
import * as echarts from 'echarts'
import { onMounted, onUnmounted, reactive, toRefs } from '@vue/runtime-core';
import axios from 'axios';

export default {
  name: "echartsBox",
  setup() {

    /// 声明定义一下echart
    let echart = echarts;

    // onMounted(() => {
    //   initChart();
    //   run();
    // });

    // onUnmounted(() => {
    //   echart.dispose;
    // });

    function initChart(option) {
      let chart = echart.init(document.getElementById("echart"), "light");
      console.log("CC")
      console.log(option)
      // 把配置和数据放这里

      // var option = {
      //   title: {
      //     text: "年度支出表"
      //   },
      //   tooltip: {
      //     trigger: "axis"
      //   },
      //   legend: {
      //     data: ["收入金额"]
      //   },
      //   xAxis: {
      //     type: "category",
      //     data: x
      //   },
      //   yAxis: {
      //     type: "value"
      //   },
      //   series: [
      //     {
      //       name: "收入金额",
      //       data: y,
      //       type: "bar",
      //       smooth: true
      //     },
      //     {
      //       name: "支出金额",
      //       data: ["-123", '-1000'],
      //       type: "bar"
      //     }
      //   ]
      // }

      chart.setOption(option)
      
      window.onresize = function() {
        //自适应大小
        chart.resize();
      };
    }


    let url = "http://localhost:5000/count/date"

    const request_fleld = reactive({
      param: {
        end_day: "2022-03-31",
        start_day: "2022-03-01",
        step_size: "day",
        profit_or_loss: "profit"
      },
    });

    const response_field = reactive({
      data:{},
      date: [],
      amount: []
    })

    const show_field = reactive({
      option: {
        title: { text: "年度支出表" },
        tooltip: { trigger: "axis" },
        legend: { data: ["收入", "支出"] },
        xAxis: {
          type: "category",
          data: []
        },
        yAxis: { type: "value" },
        series: [
          {
            name: "收入",
            data: [],
            type: "bar",
            smooth: true
          },
          {
            name: "支出",
            data: [],
            type: "bar"
          }
        ]
        
      }
    })
    const public_request = function(payload, sub, is_run=false) {
      axios.post(url, payload).then (function (res) {
        response_field.data = res.data
      
        for (var i=0; i<response_field.data.data.length; i++) {
          // show_field.option.xAxis.data[i] = response_field.data.data[i]['date'];
          show_field.option.series[sub].data[i] = response_field.data.data[i]['amount']
        };
        
        if (is_run === true) {
          initChart(show_field.option)
        }
      });
    }
    
    request_fleld.param.profit_or_loss = 'profit'
    public_request(request_fleld.param, 0)
    request_fleld.param.profit_or_loss = 'loss'
    public_request(request_fleld.param, 1, true) 
    
    return { 
      ...toRefs(response_field),

      ...toRefs(request_fleld),
      ...toRefs(show_field),
      // run
      };
  }
};
</script>