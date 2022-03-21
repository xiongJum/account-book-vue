<template>

<div class="card" style="width: 50rem; position: relative">

<!-- Example single danger button -->
<div class="btn-group" style="width: 10rem; right: -32px; position: absolute; top:16px; z-index:3">
  <span type="button" class="badge rounded-pill bg-danger" data-bs-toggle="dropdown" aria-expanded="false">
    <b>. . . </b>
  </span>
  <ul class="dropdown-menu">
    <li><a class="dropdown-item" @click="changeStyle('line')">曲线</a></li>
    <li><a class="dropdown-item" @click="changeStyle('bar')">柱状图</a></li>
    <li><a class="dropdown-item" @click="years(2020)">今年</a></li>
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

    function getNowFormatDate (step_size='month') { // 获取当月
      var date = new Date ();
      if (step_size === 'month') {
        var month = date.getMonth() + 1
        var month_tmp = month > 9 ? month : "0" + month;
        var dayDict = {
          31: ["1", "3", "5", "7", "8", "10", "12"],
          30: ["4", "6", "9", "11"]
        }
        var yearMonth = date.getFullYear() + '-' + month_tmp + '-'
        var interval_date = {start_day: yearMonth + '01'}
        if (month in dayDict[31]) {
          interval_date['end_day'] = yearMonth + '31'
          return interval_date
        } else if (month in dayDict[30]) {
          interval_date['end_day'] = yearMonth + '30'
          return interval_date
        } else if (month === '2') {
          if (date.getFullYear() % 4 ===0 && date.getFullYear() % 100 === 0) {
            interval_date['end_day'] = yearMonth + '29'
          } else {
            interval_date['end_day'] = yearMonth + '28'

          }
        }
      } else {
        return {start_day: date.getFullYear() + '-01-01', end_day: date.getFullYear() + '12-31'}
      }
    }

    const new_date = getNowFormatDate () 

    let url = "http://localhost:5000/count/date"

    const request_fleld = reactive({
      param: {
        end_day: new_date['end_day'],
        start_day: new_date['start_day'],
        step_size: "day",
        profit_or_loss: "profit"
      },
    });

    const response_field = reactive({
      data:{},
      tmp: {
        
      },
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
            // barWidth: "10%", // 宽度
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

    function getDate(datestr) { // 将字符串转换为当前时间
      var temp = datestr.split("-");
      var date = new Date(temp[0], temp[1]-1, temp[2]);
      console.log(date);
      return date
    }

    function getDateList () { // 获取时间列表
      let i = 0;
      var startTime = getDate(request_fleld.param.start_day)
      var endTime = getDate(request_fleld.param.end_day)
      while((endTime.getTime()-startTime.getTime())>=0){
            var year = startTime.getFullYear();
            var month = (startTime.getMonth()+1).toString().length==1?"0"+(startTime.getMonth()+1).toString():(startTime.getMonth()+1).toString();
            var day = startTime.getDate().toString().length==1?"0"+startTime.getDate():startTime.getDate();
            response_field.date[i]=year+"-"+month+"-"+day;
            startTime.setDate(startTime.getDate()+1);
            i+=1;
      }
    }
    
    const public_request = function(payload, sub, is_run=false) {
      axios.post(url, payload).then (function (res) {

        if (res.data) { 
          // 如果存在数据，则将amount 和 date 组成字典，key 为 date
          for (let i=0; i<res.data.data.length; i++) {
            response_field.tmp[res.data.data[i]['date']] = res.data.data[i]['amount']
          }
        }

        getDateList() // 生成查询日期列表

        for (let i=0; i<response_field.date.length; i++) {
          show_field.option.xAxis.data[i] = response_field.date[i] // 生成 x 轴坐标，时间
          if (response_field.tmp[response_field.date[i]]) { // 如果不行
            show_field.option.series[sub].data[i] = response_field.tmp[response_field.date[i]]
          } else {
            show_field.option.series[sub].data[i] = 0
          }
        }
        response_field.tmp = {} // 清空临时字典
        
        if (is_run === true) {
          initChart(show_field.option)
        }
      });
    }
    
    request_fleld.param.profit_or_loss = 'profit'
    public_request(request_fleld.param, 0)
    request_fleld.param.profit_or_loss = 'loss'
    public_request(request_fleld.param, 1, true)

    function changeStyle (style) {

      show_field.option.series[0]['type'] = style
      show_field.option.series[1]['type'] = style
      initChart(show_field.option)
    }
    
    return { 
      ...toRefs(response_field),
      ...toRefs(request_fleld),
      ...toRefs(show_field),
      changeStyle
      // run
      };
  }
};
</script>