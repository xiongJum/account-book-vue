<template>

<div class="card" style="width: 50rem;">
  <!-- Example single danger button -->
  <div class="btn-group">
    <button type="button" class="btn btn-danger dropdown-toggle" data-bs-toggle="dropdown" aria-expanded="false">
      Action
    </button>
    <ul class="dropdown-menu" style="float:right">
      <li><a class="dropdown-item" href="#">Action</a></li>
      <li><a class="dropdown-item" href="#">Another action</a></li>
      <li><a class="dropdown-item" href="#">Something else here</a></li>
      <li><hr class="dropdown-divider"></li>
      <li><a class="dropdown-item" href="#">Separated link</a></li>
    </ul>
  </div>

  <div class="card-body" id="echart" :style="{ width: '50rem', height: '400px' }">
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

    function initChart(option) {
      let chart = echart.init(document.getElementById("echart"), "light");
      console.log(option)
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
        tooltip: {},
        // 设置图例样式
        legend: { data: ["收入", "支出"] },
        // 设置x 轴坐标样式
        xAxis: {
          type: "category",
          data: []
        },
        // y 轴坐标样式
        yAxis: { type: "value" },
        
        // 配置柱图
        series: [
          {
            name: "收入",
            data: [],
            type: "bar",
            smooth: true,
            // 柱图样式
            itemStyle:{
              color: "#89B0AE",
              /**
               * 描边样式
               */
              borderWidth: "2", // 宽度
              borderColor: "#D4ECE8", // 颜色
              borderType: "solid", // 样式
              // barCategoryGap: "1%", // 柱间距离
              barBorderRadius: 5, // 圆角半径
            },
            barWidth: "20%", // 宽度
            barGap: "-100%", // 不同系列的柱间距离，-100时重叠，且只对 bar 生效
          },
          {
            name: "支出",
            data: [],
            type: "bar",
            itemStyle:{
              color: "#e03616",
              barBorderRadius: 8, // 圆角半径
            },
            barWidth: "20%",
          }
        ]
        
      }
    })
    const public_request = function(payload, sub, is_run=false) {
      axios.post(url, payload).then (function (res) {
        response_field.data = res.data
      
        for (var i=0; i<response_field.data.data.length; i++) {
          show_field.option.xAxis.data[i] = response_field.data.data[i]['date'];
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