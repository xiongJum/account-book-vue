<template>

<div class="card" style="width: 50rem; position: relative">

<div class="btn-group" role="group" aria-label="Basic mixed styles example" 
      style="width: 10rem; left: 304px; position: absolute; top:16px; z-index:3">
  <span type='button' class="badge rounded-pill bg-primary" @click="changeDate(new_date.year - 1, 'month')">{{new_date.year - 1}}</span>
  <span type='button' class="badge rounded-pill bg-secondary" @click="changeDate(new_date.year, 'month')">{{new_date.year}}</span>
  <span type='button' class="badge rounded-pill bg-success" @click="changeDate(new_date.month, 'day')">{{new_date.month}} mon</span>
</div>

<!-- Example single danger button -->
<div class="btn-group" style="width: 10rem; right: -32px; position: absolute; top:16px; z-index:3">
  <span type="button" class="badge rounded-pill bg-danger" data-bs-toggle="dropdown" aria-expanded="false">
    <b>. . . </b>
  </span>
  <ul class="dropdown-menu">
    <li><a class="dropdown-item" @click="changeStyle('line')">曲线</a></li>
    <li><a class="dropdown-item" @click="changeStyle('bar')">柱状图</a></li>
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
import { onMounted, reactive, toRefs } from '@vue/runtime-core';
import axios from 'axios';
import { getNowFormatDateList, getNowFormatDate } from '../../js/GetDateList'

export default {
  name: "echartsBox",
  setup() {

    /// 声明定义一下echart
    let echart = echarts;

    onMounted(() => { // 挂载函数，当实例挂载完成后被调用
      run ()
    })

    function initChart(option) {
      let chart = echart.getInstanceByDom(document.getElementById("echart")); // 如果存在，则获取 DOM 节点
      if (chart == null) { // 如果不存在就初始化
        chart = echart.init(document.getElementById("echart"), "light");
      }
      chart.showLoading() // 启用加载动画
      chart.setOption(option)
      chart.hideLoading() // 关闭加载动画
      window.onresize = function() {
        //自适应大小
        chart.resize();
      };
    } 

    // 执行， 获取数据并生成图表
    function run () {
      console.log("SS")
      request_fleld.param.profit_or_loss = 'profit'
      public_request(request_fleld.param, 0)
      request_fleld.param.profit_or_loss = 'loss'
      public_request(request_fleld.param, 1, true)
      // initChart(show_field.option)
    }

    let url = "http://localhost:5000/count/date"

    var new_date = new Date ()

    const request_fleld = reactive({
      param: {
        end_day: getNowFormatDate('last'),
        start_day: getNowFormatDate(),
        step_size: "day",
        profit_or_loss: "profit"
      },
    });

    const response_field = reactive({
      tmp: {},
      new_date: {
        date: new_date,
        year: new_date.getFullYear(),
        month: new_date.getMonth() + 1,
        day: new_date.getDate()
      }
    })

    const show_field = reactive({
      option: {
        title: { text: "年度支出表" },
        tooltip: {},
        // 设置图例样式
        legend: { 
          data: ["收入", "支出"],
          orient: 'vertical',
          // right: 10,
          top: 'bottom',
          left: 'left'
          },
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
              // borderWidth: "2", // 宽度
              borderColor: "#D4ECE8", // 颜色
              borderType: "solid", // 样式
              // barCategoryGap: "1%", // 柱间距离
              borderRadius: 5, // 圆角半径
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
              borderRadius: 8, // 圆角半径
            },
            barWidth: "20%",
          }
        ]
        
      }
    })
    
    const public_request = function(payload, sub, is_run=false) {

      // 生成查询日期列表
      response_field.date = getNowFormatDateList (request_fleld.param.start_day, request_fleld.param.end_day, request_fleld.param.step_size)
      
      axios.post(url, payload).then (function (res) {

        if (res.data) { 
          // 如果存在数据，则将amount 和 date 组成字典，key 为 date
          for (let i=0; i<res.data.data.length; i++) {
            response_field.tmp[res.data.data[i]['date']] = res.data.data[i]['amount']
          }
        }

        // 遍历日期列表，设置 x 和 y 轴 的值
        for (let i=0; i<response_field.date.length; i++) {
          show_field.option.xAxis.data[i] = response_field.date[i]
          if (response_field.tmp[response_field.date[i]]) {
            show_field.option.series[sub].data[i] = response_field.tmp[response_field.date[i]]
          } else {
            show_field.option.series[sub].data[i] = 0
          }
        }
        // 清空临时字典， 防止下一次使用时混用数据
        response_field.tmp = {} 
        
        if (is_run === true) {
          initChart(show_field.option)
        }
      });
    }

    function changeStyle (style) {

      show_field.option.series[0]['type'] = style
      show_field.option.series[1]['type'] = style
      initChart(show_field.option)
    }

    function changeDate(date, date_type) {
      /**
       * 改变 echarts 的显示数据， 并重新调用
       */
      // 清空上一个视图的数据
      show_field.option.xAxis.data = [];
      show_field.option.series[0].data = [];
      show_field.option.series[1].data = [];

      // 改变数据
      if (date_type === 'month') {
        request_fleld.param.step_size = 'month'
        request_fleld.param.start_day = `${date}-01-01`
        request_fleld.param.end_day = `${date}-12-31` 
      } else {
        request_fleld.param.step_size = 'day';
        request_fleld.param.end_day = getNowFormatDate('last');
        request_fleld.param.start_day = getNowFormatDate();
      }

      run ()
    }
    
    return { 
      ...toRefs(response_field),
      ...toRefs(request_fleld),
      ...toRefs(show_field),
      changeStyle,
      changeDate,
      run
      };
  }
};
</script>